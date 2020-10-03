const { constants } = require('../constants');

/**
 * Run at startup to ensure files and folders that are needed, exist as early as possible
 */
class RequiredFiles {
	/**
	 * 
	 * @param {object} 	utils 		Utils class
	 * @param {object} 	userArgs	merged user settings
	 * @param {fs} 		fs			
	 */
	constructor(params) {
		this.utils = params.utils;
		this.userArgs = params.userArgs;
		this.fs = params.fs;

		this.dataDir();
		this.themeDir();
		this.defaultThemeDir();
	}

	/**
	 * Make sure the data dir exists
	 */
	dataDir() {
		if (!this.fs.existsSync("./data")) {
			this.fs.mkdirSync("./data");
			this.userArgs.DEBUG && this.utils.console("Created ./data");
		}
	}

	/**
	 * make sure the themes dir exists
	 */
	themeDir() {
		if (!this.fs.existsSync("./data/themes")) {
			this.fs.mkdirSync("./data/themes");
			this.userArgs.DEBUG && this.utils.console("Created ./data/themes");
		}
	}

	/**
	 * make sure the default theme dir exists
	 */
	defaultThemeDir() {
		if (!this.fs.existsSync("./data/themes/default")) {
			this.fs.mkdirSync("./data/themes/default");
			this.userArgs.DEBUG && this.utils.console("Created ./data/themes/default");
		}
	}
}

exports.RequiredFiles = RequiredFiles;