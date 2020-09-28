const { constants } = require('../constants');
const superagent = require('superagent');

class VersionCheck {
	constructor(params) {
		this.utils = params.utils;
		this.userArgs = params.userArgs;
		this.versionCheckFile = "https://github.com/platypusmuerte/creditsbot/blob/master/constants.js";
	}

	run() {
		let notifyCLI = this.notifyCLI.bind(this);

		return new Promise(function (resolve, reject) {
			superagent.get("http://platypusmuerte.com/platybot_version.txt").end((e, r) => {
				
				if (r.text.replace(/\./g, '') * 1 > constants.APP.VERSION.replace(/\./g, '')*1) {
					notifyCLI(r.text);
				}
				resolve(true);
			});
		});		
	}

	get() {
		return new Promise(function (resolve, reject) {
			superagent.get("http://platypusmuerte.com/platybot_version.txt").end((e, r) => {
				let resp = {update: false};
				
				if (r.text.replace(/\./g, '') * 1 > constants.APP.VERSION.replace(/\./g, '') * 1) {
					resp.update = r.text;
				}

				resolve(resp);
			});
		});	
	}

	notifyCLI(v) {
		this.userArgs.DEBUG && this.utils.notice("There is a new version available, ( " + v + " ). Your version is " + constants.APP.VERSION);
	}
}

exports.VersionCheck = VersionCheck;