const { constants } = require('../constants');
const superagent = require('superagent');

/**
 * TimerBarManager class - manage timer bars in overlay / events
 */
class TimerBarManager {
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
	}

	/**
	 * Nothing to init yet
	 */
	init() {
		
	}

	/**
	 * Process event data
	 * 	- send to overlay
	 * @param {object} timerbar timer bar obj
	 * @param {string} customCSS timer bar str
	 */
	processData(timerbar,customCSS, remove) {
		this.userArgs.DEBUG && this.utils.console("Processing timer bar: " + timerbar.key);

		this.buildAlertForOverlay(timerbar,customCSS, remove);
	}

	buildAlertForOverlay(timerbar,customcss, remove) {
		let timerBarEvent = [Object.assign({},{event: "timerbar",customcss: customcss, removebykey: remove},timerbar)];
		
		this.overlayWebsocket.sendMessage(JSON.stringify(timerBarEvent),"overlay");
	}
}

exports.TimerBarManager = TimerBarManager;