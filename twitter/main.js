const { constants } = require('../constants');
const superagent = require('superagent');
const Twitter = require('twitter-v2');
const { twitter } = require("../defaults/twitter");

/**
 * TwitterManager class - use a dev account to listen for data on the Twitter stream using rules
 */
class TwitterManager {
	/**
	 * 
	 * @param {object} utils			Utils class
	 * @param {object} userArgs			merged user settings
	 * @param {object} db				db adapter
	 * @param {object} overlayWebsocket	overlayWebsocket class ref
	 * 
	 * @property {object} 	config 			Twitter config from ui
	 * @property {object}	client			twitter calls
	 * @property {object}	stream			the twitter stream
	 * @property {boolean}	newRule			the twitter stream
	 * @property {boolean}	running			are we listening already
	 */
	constructor(params) {
		this.utils = params.utils;
		this.userArgs = params.userArgs;
		this.db = params.db;
		this.overlayWebsocket = params.overlayWebsocket;

		this.client;
		this.stream;
		this.newRule = false;
		this.running = false;

		this.config;

		this.newConfig();
	}

	newConfig() {
		this.config = twitter;
	}

	/**
	 * Ready the Twitter engine, so it can add, remove, respond
	 * 	- grabs config from db, and sets as current
	 */
	init() {
		let setInitialConfig = this.setInitialConfig.bind(this);

		this.db.theme().overlaytwitter.getAll().then((data)=>{
			setInitialConfig(data);
		});
	}

	/**
	 * Set a config as active, or update a config
	 * @param {object} data twitter config to become current active config
	 */
	setInitialConfig(data) {
		this.config = data;
		this.updateConfig(data);
	}

	/**
	 * Update the config that is being used
	 * 	- if its a new rule, handle that
	 * 	- if set to enabled, call that
	 *  - or stop it if enabled false
	 * @param {object} data config details
	 */
	updateConfig(data) {
		this.newRule = (this.ensureHashTag(data.hashtag) !== this.ensureHashTag(this.config.hashtag.toString()));

		this.config = {
			api_key: data.api_key,
			api_secret: data.api_secret,
			access_key: data.access_key,
			access_secret: data.access_secret,
			bearer: data.bearer,
			enabled: data.enabled,
			hashtag: this.ensureHashTag(data.hashtag),
			duration: data.duration,
			template: data.template,
			css: data.css,
			ruleid: data.ruleid,
			entrance: data.entrance,
			visible: data.visible,
			exit: data.exit,
			screenpos: data.screenpos,
			volume: data.volume,
			soundfile: data.soundfile
		};

		if(this.newRule && this.config.api_key) {
			this.createNewRule();
		}

		if(this.config.enabled) {
			this.start();
		} else {
			this.stop();
		}
	}

	/**
	 * Start the Twitter logic if not already running
	 */
	start() {
		if(!this.running) {
			this.userArgs.DEBUG && this.utils.console("Twitter API waiting to connect for " + this.config.hashtag);

			setTimeout(()=>{
				this.client = new Twitter({
					consumer_key: this.config.api_key,
					consumer_secret: this.config.api_secret,
					bearer_token: this.config.bearer
				});

				this.stream = this.client.stream("tweets/search/stream", {
					"tweet.fields":"created_at",
					"expansions":"author_id",
					"user.fields":"created_at"
				});

				this.db.databases.templatetheme.getActiveTheme().then((theme)=>{
					this.waitForData(theme);
					this.running = true;
					this.userArgs.DEBUG && this.utils.console("Twitter API listening for " + this.config.hashtag);
				});	
			},5000);					
		}		
	}

	/**
	 * Stop the Twitter logic if its running
	 */
	stop() {
		if(this.running) {
			this.newConfig();

			this.stream.close();
			this.running = false;

			this.userArgs.DEBUG && this.utils.console("Twitter API stopped ");
		}		
	}

	/**
	 * wait for data, and do the things with it when it happens
	 * @param {object} theme theme object
	 */
	async waitForData(theme) {
		let processData = this.processData.bind(this);
		let data;
		try {
			for await (data of this.stream) {
				processData(data, theme);
			}
		} catch(e) {
			this.userArgs.DEBUG && this.utils.notice("Twitter API already connected, flushing connection, then restarting Twitter API....");
			
			this.stream.close();
			this.running = false;

			setTimeout(()=>{
				this.start();
			},5000);
		}
	}

	/**
	 * Process Twitter event data
	 * 	- send to credits dbs
	 * 	- send to overlay
	 * @param {object} data Twitter event data from rules
	 * @param {object} theme theme object
	 */
	processData(data, theme) {
		if(this.config.enabled && data.matching_rules && this.matchesCurrentThemeRule(data.matching_rules, theme)) {
			this.userArgs.DEBUG && this.utils.console("Twitter API matched rule for theme: " + theme.name);
			
			this.buildAlertForOverlay(data.includes.users);
			this.logEventToDB(data.includes.users);
		} else if(!this.config.enabled) {			
			this.stop();
		} else {
			// noopsie - its enabled, but didnt match any rules
		}
	}

	buildAlertForOverlay(eventUsers) {
		let alerts = [];

		eventUsers.forEach((user)=>{
			let template = this.config.template;
			let templateStr = template.replace('{{{tweeter}}}', user.username);
			
			alerts.push({
				event: "twitter",
				entrance: this.config.entrance,
				visible: this.config.visible,
				exit: this.config.exit,
				duration: this.config.duration,
				screenpos: this.config.screenpos,
				css: `<style>` + this.config.css + `</style>`,
				volume: this.config.volume,
				soundfile: this.config.soundfile,
				template: templateStr
			});
		});
		
		this.overlayWebsocket.sendMessage(JSON.stringify(alerts),"overlay");
	}

	/**
	 * Send overlay event for testing
	 * @param {object} data twitter config for test
	 */
	testAlertToOverlay() {
		let alerts = [];

		let template = this.config.template;
		let templateStr = template.replace('{{{tweeter}}}', "TestEvent");
		
		alerts.push({
			event: "twitter",
			entrance: this.config.entrance,
			visible: this.config.visible,
			exit: this.config.exit,
			duration: this.config.duration,
			screenpos: this.config.screenpos,
			css: `<style>` + this.config.css + `</style>`,
			volume: this.config.volume,
			soundfile: this.config.soundfile,
			template: templateStr
		});

		this.overlayWebsocket.sendMessage(JSON.stringify(alerts),"overlay");
	}

	logEventToDB(eventUsers) {
		eventUsers.forEach((user)=>{
			this.db.databases.streamtweets.addUser(user.username, 1);
			this.db.databases.hstreamtweets.addUser(user.username, 1);
		});
	}

	/**
	 * Does event match current themes rule id
	 * @param {array} matchingRules 	list of matched rules for event
	 * @param {object} theme theme object
	 */
	matchesCurrentThemeRule(matchingRules, theme) {
		return (matchingRules.filter(r => r.tag === ("theme: " + theme.id)).length);
	}

	/**
	 * Get all rules and remove the ones with the current themes tag, then add new rule
	 */
	createNewRule() {
		let db = this.db;
		let getAllRules = this.getAllRules.bind(this);
		let removeRules = this.removeRules.bind(this);
		let addRule = this.addRule.bind(this);

		return new Promise((resolve, reject)=>{
			db.databases.templatetheme.getActiveTheme().then((theme)=>{
				getAllRules(theme).then((existingRules)=>{
					removeRules(existingRules).then(()=>{
						addRule(theme).then(()=>{
							resolve();
						});
					});
				});
			});
		});
	}

	/**
	 * Create a new rule
	 * @param {object} theme	current theme
	 */
	addRule(theme) {
		let db = this.db;
		let config = this.config;
		let userArgs = this.userArgs;
		let utils = this.utils;

		return new Promise((resolve, reject)=>{			
			superagent.post("https://api.twitter.com/2/tweets/search/stream/rules").send(
				{
					"add": [
						{"value": config.hashtag, "tag": "theme: " + theme.id}
					]
				}
			).set(
				'Authorization','Bearer ' + config.bearer
			).set(
				'Content-Type','application/json'
			).end((e,r) => {
				if(e) {
					userArgs.DEBUG && utils.notice("Twitter API ERROR - failed to add rule " + config.hashtag);

					userArgs.DEBUG && utils.notice("====== begin error message ======");
					userArgs.DEBUG && utils.notice(e);
					userArgs.DEBUG && utils.notice("====== end error message ========");
					resolve()
				} else {
					let respData = r.body;
					let newID = respData.data[0].id;

					db.theme().overlaytwitter.setRuleID(newID).then(()=>{
						db.databases.templatetheme.getActiveTheme().then((theme)=>{
							userArgs.DEBUG && utils.console("Twitter API: created new rule for theme  " + theme.name + "( " + config.hashtag + ")");
							resolve()
						});					
					});
				}				
			});				
		});
	}

	/**
	 * Remove pre-existing rules for current theme
	 * @param {array} rules array of rules to remove
	 */
	removeRules(rules) {
		let config = this.config;
		let userArgs = this.userArgs;
		let utils = this.utils;

		return new Promise((resolve, reject)=>{
			if(rules.length) {
				superagent.post("https://api.twitter.com/2/tweets/search/stream/rules").send(
					{
						"delete": {
							"ids": rules
						}
					}
				).set(
					'Authorization','Bearer ' + config.bearer
				).set(
					'Content-Type','application/json'
				).end((e,r) => {
					if(e) {
						userArgs.DEBUG && utils.notice("Twitter API ERROR - failed to delete rules ");

						userArgs.DEBUG && utils.notice("====== begin error message ======");
						userArgs.DEBUG && utils.notice(e);
						userArgs.DEBUG && utils.notice("====== end error message ========");
						resolve();
					} else {
						let respData = r.body;

						userArgs.DEBUG && utils.console("Twitter API: deleted old rules for current theme");
						resolve();
					}				
				});
			} else {
				resolve();
			}			
		});		
	}

	/**
	 * Get all rules for current theme
	 * @param {object} theme	current theme
	 */
	getAllRules(theme) {
		let config = this.config;
		let userArgs = this.userArgs;
		let utils = this.utils;

		return new Promise((resolve, reject)=>{
			superagent.get("https://api.twitter.com/2/tweets/search/stream/rules").set(
				'Authorization','Bearer ' + config.bearer
			).set(
				'Content-Type','application/json'
			).end((e,r) => {
				if(e) {
					userArgs.DEBUG && utils.notice("Twitter API ERROR - failed to fetch all rules");

					userArgs.DEBUG && utils.notice("====== begin error message ======");
					userArgs.DEBUG && utils.notice(e);
					userArgs.DEBUG && utils.notice("====== end error message ========");
					resolve([]);
				} else {
					let respData = r.body;
					let rules = [];

					if(respData.data) {
						respData.data.forEach((ruleData)=>{
							if(ruleData.tag === "theme: " + theme.id) {
								rules.push(ruleData.id+"");
							}							
						});
					}					

					resolve(rules);
				}				
			});
		});
	}

	ensureHashTag(str) {
		return '#' + str.replace('#','');
	}
}

exports.TwitterManager = TwitterManager;