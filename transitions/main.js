const { constants } = require('../constants');
const superagent = require('superagent');

/**
 * TransitionManager class - use a dev account to listen for data on the Twitter stream using rules
 */
class TransitionManager {
	/**
	 * 
	 * @param {object} utils			Utils class
	 * @param {object} userArgs			merged user settings
	 * @param {object} db				db adapter
	 * @param {object} overlayWebsocket	overlayWebsocket class ref
	 * 
	 * @property {object} 	transition 		a transition to run
	 */
	constructor(params) {
		this.utils = params.utils;
		this.userArgs = params.userArgs;
		this.db = params.db;
		this.overlayWebsocket = params.overlayWebsocket;

		this.transition = false;
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

	/**
	 * Send overlay event for testing
	 * @param {object} data twitter config for test
	 */
	sendTest(transitionID) {
		let db = this.db;
		let userArgs = this.userArgs;
		let utils = this.utils;
		let overlayWebsocket = this.overlayWebsocket;

		return new Promise((resolve, reject)=>{
			db.databases.transitions.getByID(transitionID).then((transition)=>{
				let payload = `<style>${transition.css}</style>${transition.body}<script>${transition.js}</script>`;

				overlayWebsocket.sendMessage(JSON.stringify({event: "transition",content: payload}));
				userArgs.DEBUG && utils.console("Sent test transition: " + transition.name);
				resolve();
			});
		});
	}

	/**
	 * Send overlay event for testing
	 * @param {object} data twitter config for test
	 */
	sendTransition(transitionID) {
		let db = this.db;
		let userArgs = this.userArgs;
		let utils = this.utils;
		let overlayWebsocket = this.overlayWebsocket;

		return new Promise((resolve, reject)=>{
			db.databases.transitions.getByID(transitionID).then((transition)=>{
				let payload = `<style>${transition.css}</style>${transition.body}<script>${transition.js}</script>`;

				overlayWebsocket.sendMessage(JSON.stringify({event: "transition",content: payload}));
				userArgs.DEBUG && utils.console("Sent transition: " + transition.name);
				resolve();
			});
		});
	}
}

exports.TransitionManager = TransitionManager;