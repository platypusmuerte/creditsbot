const { constants } = require('../constants');

/**
 * Create backups of data dir
 */
class Backup {
	/**
	 * 
	 * @param {object}	fs
	 * @param {object}	path
	 * @param {objecet}	utils		Utils class
	 * @param {string}	userArgs 	combined user settings
	 * 
	 * @property {string}	backupPath	built when called, time stamped directory path
	 */
	constructor(params) {
		this.fs = params.fs;
		this.path = params.path;
		this.utils = params.utils;
		this.dataDir = params.dataDir;
		this.userArgs = params.userArgs;
		this.backupPath = "";
	}

	/**
	 * Create a backup
	 */
	create() {
		let ensureMainBackupFolder = this.ensureMainBackupFolder.bind(this);
		let createNewBackupFolder = this.createNewBackupFolder.bind(this);
		let backupData = this.backupData.bind(this);

		return new Promise(function (resolve, reject) {
			ensureMainBackupFolder().then(()=>{
				createNewBackupFolder().then(()=>{
					backupData();
				});
			});
		});
	}

	/**
	 * Make sure backups folder exists
	 */
	ensureMainBackupFolder() {
		let fs = this.fs;
		let userArgs = this.userArgs;
		let utils = this.utils;

		return new Promise(function (resolve, reject) {
			if (!fs.existsSync("./backups")) {
				fs.mkdirSync("./backups");
				userArgs.DEBUG && utils.console("Created ./backups");
				resolve();
			} else {
				resolve();
			}
		});
	}

	/**
	 * Create a new folder for this backup. Folder name is timestamp
	 */
	createNewBackupFolder() {
		let folder = Date.now();
		let fs = this.fs;
		let userArgs = this.userArgs;
		let utils = this.utils;
		this.backupPath = "./backups/" + folder;
		let backupPath = this.backupPath;

		return new Promise(function (resolve, reject) {
			if (!fs.existsSync(backupPath)) {
				fs.mkdirSync(backupPath);
				userArgs.DEBUG && utils.console("Created " + backupPath);
				resolve();
			} else {
				resolve();
			}
		});
	}

	/**
	 * Copy the data dir to the new folder just created
	 */
	backupData() {
		let fs = this.fs;
		let userArgs = this.userArgs;
		let utils = this.utils;
		let backupPath = this.backupPath;

		return new Promise(function (resolve, reject) {
			fs.copy("./data", backupPath + "/data").then(() => {
				userArgs.DEBUG && utils.console("./data backed up");
				resolve();
			});
		});
	}
}

exports.Backup = Backup;