const { constants } = require('../constants');
const superagent = require('superagent');
const Twitter = require('twitter-v2');

/**
 * Twitter class - use a dev account to listen for data on the Twitter stream using rules
 */
class Twitter {
	/**
	 * 
	 * @param {object} utils		Utils class
	 * @param {object} path			
	 * @param {object} fs
	 * @param {object} exp			express class
	 * @param {object} db			db adapter
	 * @param {string} dataDir		path to users data dir
	 * @param {object} userArgs		merged user settings
	 * 
	 * @property {object} 	devKeys 			Twitter dev keys/tokens
	 * @property {object}	rulesToAdd			add rules query data
	 * @property {string}	twitterAccount		the streamers twitter handle
	 * @property {string}	hashtag				the hastag to watch for
	 * @property {array}	rules				contains created rules
	 */
	constructor(params) {
		this.utils = params.utils;
		this.path = params.path;
		this.exp = params.exp;
		this.db = params.db;
		this.dataDir = params.dataDir;
		this.userArgs = params.userArgs;
		this.fs = params.fs;

		this.devKeys = {
			api: false,
			secret: false,
			bearer: false
		};

		this.rulesToAdd = {
			add: []
		};

		this.rules = [];

		this.twitterAccount = false;
		this.hashtag = false;
	}

	/**
	 * Set the dev keys for this session
	 * @param {object} keys dev keys to set for session: api, secret, bearer
	 */
	setDevKeys(keys) {
		if(keys.api && keys.secret && keys.bearer) {
			this.devKeys = keys;
			return true;
		} else {
			return false;
		}		
	}

	/**
	 * Set the twitter account
	 * @param {string} str the streamers twitter account handle, without an @
	 */
	setAccount(str) {
		if(str) {
			this.twitterAccount = str;
			return true;
		} else {
			return false;
		}		
	}

	/**
	 * Add rules after sending add call
	 * @param {array} rules rules to add to our list
	 */
	XXsetRulesFromCall(rules) {
		this.rules = [...rules];
	}

	/**
	 * Set the hashtag
	 * @param {string} str the hastag to watch for/use
	 */
	setHashtag(str) {
		if(str) {
			this.hashtag = str;
			return true;
		} else {
			return false;
		}		
	}

	/**
	 * Add rules
	 */
	addRules() {
		this.rules.add.push({value: "@" + this.twitterAccount, tag: this.twitterAccount + "Watch"});
	}

	/**
	 * Send the set rule call
	 */
	postAddRules() {
		let rulesToAdd = this.rulesToAdd;
		let devKeys = this.devKeys;

		return new Promise((resolve, reject)=>{
			superagent.post(constants.TWITTER.PATH_ADD_RULE).send(
				rulesToAdd
			).set(
				'Content-type','application/json'
			).set(
				'Authorization','Bearer ' + devKeys.bearer
			).end((e, r) => {
				if(e) {
					console.log(e);
					reject(e);
				} else {
					//r.text r.body
					console.log("rule add response");
					let respData = r.body;
					console.log(respData, r.text);

					// not always a bad thing, maybe rule exists?
					if(respData.meta.summary.not_created > 0) {
						console.log(respData.meta.summary.not_created + " rule not created");
					}

					// again, carry on, just notifying
					if(respData.meta.summary.invalid > 0) {
						console.log(respData.meta.summary.invalid + " rule was invalid");
					}

					resolve(true);
				}				
			});
		});		
	}

	connectToTwitterStream() {
		return new Promise((resolve, reject)=>{
			
		});		
	}
}

exports.Twitter = Twitter;