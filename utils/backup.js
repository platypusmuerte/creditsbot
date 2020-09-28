const { constants } = require('../constants');

class Backup {
	constructor(params) {
		this.fs = params.fs;
		this.path = params.path;
		this.utils = params.utils;
		this.dataDir = params.dataDir;
		this.userArgs = params.userArgs;
		this.backupPath = "";
	}

	create() {
		let ensureMainBackupFolder = this.ensureMainBackupFolder.bind(this);
		let createNewBackupFolder = this.createNewBackupFolder.bind(this);
		let backupData = this.backupData.bind(this);
		//let backupTemplates = this.backupTemplates.bind(this);

		return new Promise(function (resolve, reject) {
			ensureMainBackupFolder().then(()=>{
				createNewBackupFolder().then(()=>{
					backupData();
					//backupTemplates();
				});
			});
		});
	}

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

	/*backupTemplates() {
		let fs = this.fs;
		let userArgs = this.userArgs;
		let utils = this.utils;
		let backupPath = this.backupPath;

		return new Promise(function (resolve, reject) {
			fs.copy("./templates", backupPath + "/templates").then(() => {
				userArgs.DEBUG && utils.console("./templates backed up");
				resolve();
			});
		});
	}*/
}

exports.Backup = Backup;