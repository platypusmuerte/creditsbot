const { constants } = require('../constants');
const superagent = require('superagent');
const Twitter = require('twitter-v2');
const { set } = require('lodash');

/**
 * TwitterManager class - use a dev account to listen for data on the Twitter stream using rules
 */
class TwitterManager {
	/**
	 * 
	 * @param {object} utils		Utils class
	 * @param {object} userArgs		merged user settings
	 * @param {object} db			db adapter
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

		this.client;
		this.stream;
		this.newRule = false;
		this.running = false;

		this.config = {
			api: false,
			apisecret: false,
			acess: false,
			accesssecret: false,
			bearer: false,
			enabled: false,
			hashtag: false,
			template: false,
			css: false,
			ruleid: false
		};
	}

	init() {
		let setInitialConfig = this.setInitialConfig.bind(this);

		this.db.theme().overlaytwitter.getAll().then((data)=>{
			setInitialConfig(data);
		});
	}

	setInitialConfig(data) {
		this.config = data;
		this.updateConfig(data);
	}

	updateConfig(data) {
		this.newRule = (this.ensureHashTag(data.hashtag) !== this.ensureHashTag(this.config.hashtag.toString()));

		this.config = {
			api: data.api_key,
			apisecret: data.api_secret,
			acess: data.access_key,
			accesssecret: data.access_secret,
			bearer: data.bearer,
			enabled: data.enabled,
			hashtag: this.ensureHashTag(data.hashtag),
			template: data.template,
			css: data.css,
			ruleid: data.ruleid
		};

		if(this.newRule && this.config.api) {
			this.createNewRule();
		}

		if(this.config.enabled) {
			this.start();
		} else {
			this.stop();
		}
	}

	start() {
		if(!this.running) {
			this.client = new Twitter({
				consumer_key: this.config.api,
				consumer_secret: this.config.apisecret,
				bearer_token: this.config.bearer
			});

			this.stream = this.client.stream("tweets/search/stream", {
				"tweet.fields":"created_at",
				"expansions":"author_id",
				"user.fields":"created_at"
			});

			this.running = true;

			this.userArgs.DEBUG && this.utils.console("Twitter API listening for " + this.config.hashtag);
		}		
	}

	stop() {
		if(this.running) {
			this.config = {
				api: false,
				apisecret: false,
				acess: false,
				accesssecret: false,
				bearer: false,
				enabled: false,
				hashtag: false,
				template: false,
				css: false,
				ruleid: false
			};

			this.stream.close();
			this.running = false;

			this.userArgs.DEBUG && this.utils.console("Twitter API stopped ");
		}		
	}

	async waitForData() {
		let processData = this.processData.bind(this);

		for await (data of this.stream) {
			processData(data);
		}
	}

	processData(data) {
		if(this.config.enabled) {
			console.log(data);
			console.log("=========================");
			console.log(data.includes.users);
		} else {			
			this.stop();
		}		
	}

	createNewRule() {
		this.db.databases.templatetheme.getActiveTheme().then((theme)=>{
			let ruleObj = {
				"add": [
					{"value": this.config.hashtag, "tag": "hashtagWatchRule " + theme.id}
				]
			};

			if(this.config.ruleid) {
				ruleObj["delete"] = {
					"ids": [this.config.ruleid + ""]
				};
			}

			superagent.post("https://api.twitter.com/2/tweets/search/stream/rules").send(
				ruleObj
			).set(
				'Authorization','Bearer ' + this.config.bearer
			).set(
				'Content-Type','application/json'
			).end((e,r) => {
				if(e) {
					this.userArgs.DEBUG && this.utils.notice("Twitter API ERROR - failed to add rule " + this.config.hashtag);
				} else {
					let respData = r.body;
					let newID = respData.data[0].id;

					this.db.theme().overlaytwitter.setRuleID(newID).then(()=>{
						this.db.databases.templatetheme.getActiveTheme().then((theme)=>{
							this.userArgs.DEBUG && this.utils.console("Twitter API: created new rule for theme  " + theme.name + "( " + this.config.hashtag + ")");
						});					
					});
				}				
			});
		});	


		
	}

	removePreviousRule() {
		// hmmmm ? use rule ID to delete it
		// @TODO: validate hashtags
	}

	ensureHashTag(str) {
		return '#' + str.replace('#','');
	}
}

exports.TwitterManager = TwitterManager;