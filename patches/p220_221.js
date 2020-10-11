const { constants } = require('../constants');

/**
 * Update anything that needs altered between versions for users data/files
 * 
 */
class PatchFile {
	/**
	 * 
	 * @param {object}	utils		Utils
	 * @param {string}	dataDir		Data storage dir
	 * @param {object}	userArgs	Merged settings from CLI opts into config file
	 * @param {package}	fs			FS/FS-Extra
	 * @param {package}	path		Path
	 * @param {package} db			db adapter - may be null at init
	 */
	constructor(params) {
		this.utils = params.utils;
		this.dataDir = params.dataDir;
		this.userArgs = params.userArgs;
		this.fs = params.fs;
		this.path = params.path;
		this.db = params.db;
	}

	/**
	 * Handle and pre tasks
	 */
	pre() {
		let utils = this.utils;
		let userArgs = this.userArgs;

		return new Promise((resolve, reject)=>{	
			userArgs.DEBUG && utils.console("No pre-patches");
			resolve();			
		});
	}

	/**
	 * Handle any post tasks
	 */
	post(db) {
		this.db = db;
		let utils = this.utils;
		let userArgs = this.userArgs;

		return new Promise((resolve, reject)=>{
			userArgs.DEBUG && utils.console("No Post Patches");
			resolve();			
		});
	}
}

exports.PatchFile = PatchFile;