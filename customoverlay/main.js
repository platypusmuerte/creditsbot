const { constants } = require('../constants');
const superagent = require('superagent');

/**
 * CustomOverlayManager class - manage custom overlay events
 */
class CustomOverlayManager {
	/**
	 * 
	 * @param {object} utils			Utils class
	 * @param {object} userArgs			merged user settings
	 * @param {object} db				db adapter
	 * @param {object} overlayWebsocket	overlayWebsocket class ref
	 */
	constructor(params) {
		this.utils = params.utils;
		this.userArgs = params.userArgs;
		this.db = params.db;
		this.overlayWebsocket = params.overlayWebsocket;
		this.dataStore = {};

		this.init();
	}

	/**
	 * setup callback
	 */
	init() {
		
	}

	/**
	 * Process event data
	 * 	- send to overlay
	 * @param {object} timerbar timer bar obj
	 * @param {string} customCSS timer bar str
	 */
	processData(key, query) {
		this.userArgs.DEBUG && this.utils.console("Processing custom overlay event for: " + key);

		if(query.remove) {
			return this.clearData(key, query);
		} else if(query.fetch) {
			return this.fetchData(key, query);
		} else {
			let event = [Object.assign({},{event: "customoverlay", key: key, query: query})];

			if(!this.overlayWebsocket.messageCallbacks["customoverlay_" + key]) {
				this.userArgs.DEBUG && this.utils.console("Adding new custom overlay callback event for: " + key);

				this.overlayWebsocket.messageCallbacks["customoverlay_" + key] = this.wsCallback.bind(this);
			}

			this.overlayWebsocket.sendMessage(JSON.stringify(event),"overlay");

			return "";
		}		
	}

	/**
	 * Fetch data from store by key
	 */
	fetchData(key, query) {
		let subkey = (query.subkey) ? query.subkey:false;

		if(this.dataStore["customoverlay_" + key]) {
			let ds = this.dataStore["customoverlay_" + key];

			if(ds[subkey]) {
				return ds[subkey];
			} else {
				return {error: "no data (" + subkey + ")"};
			}
		}
	}

	/**
	 * Clear data store by key or subkey
	 */
	clearData(query) {
		let key = (query.key) ? query.key:false;
		let subkey = (query.subkey) ? query.subkey:false;
		let ds = this.dataStore;

		if(key && subkey) {
			if(ds["customoverlay_" + key] && ds["customoverlay_" + key][subkey]) {
				delete ds["customoverlay_" + key][subkey];
			}
		} else if(key) {
			delete ds["customoverlay_" + key];
		}

		this.dataStore = Object.assign({},ds);

		return "";
	}

	/**
	 * Update data store with callback data so bot can fetch later w more gets
	 */
	wsCallback(data, type, key) {
		let eventDataStore = this.dataStore[type + "_" + key]||{};
		let tmp = {};
		tmp[type + "_" + key] = Object.assign({},eventDataStore,data);

		this.dataStore = Object.assign({},this.dataStore,tmp);

		this.userArgs.DEBUG && this.utils.console("Updated callback data store: " + type + "_" + key);
	}
}

exports.CustomOverlayManager = CustomOverlayManager;