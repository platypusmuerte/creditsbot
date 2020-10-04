const { constants } = require('../constants');
const superagent = require('superagent');

/**
 * Read the github version file, notify user in cli and UI if theres an update
 */
class VersionCheck {
	/**
	 * 
	 * @param {object} utils 	Utils class
	 * @param {object} userArgs	Merged user settings
	 */
	constructor(params) {
		this.utils = params.utils;
		this.userArgs = params.userArgs;
		this.versionCheckFile = "https://raw.githubusercontent.com/platypusmuerte/creditsbot/master/version.txt";
	}

	/**
	 * Getter for the cli
	 */
	run() {
		let notifyCLI = this.notifyCLI.bind(this);
		let versionCheckFile = this.versionCheckFile;

		return new Promise((resolve, reject)=>{
			superagent.get(versionCheckFile).end((e, r) => {
				
				if (r.text.replace(/\./g, '') * 1 > constants.APP.VERSION.replace(/\./g, '')*1) {
					notifyCLI(r.text);
				}
				resolve(true);
			});
		});		
	}

	/**
	 * Getter for the UI
	 */
	get() {
		let versionCheckFile = this.versionCheckFile;

		return new Promise((resolve, reject)=>{
			superagent.get(versionCheckFile).end((e, r) => {
				let resp = {update: false};
				
				if (r.text.replace(/\./g, '') * 1 > constants.APP.VERSION.replace(/\./g, '') * 1) {
					resp.update = r.text;
				}

				resolve(resp);
			});
		});	
	}

	/**
	 * Output to cli
	 * @param {string} v the version
	 */
	notifyCLI(v) {
		this.userArgs.DEBUG && this.utils.notice("There is a new version available, ( " + v + " ). Your version is " + constants.APP.VERSION);
	}
}

exports.VersionCheck = VersionCheck;