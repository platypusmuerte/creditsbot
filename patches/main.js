const expectExport = require('expect');
const { constants } = require('../constants');

/**
 * Update anything that needs altered between versions for users data/files
 * 
 */
class Patches {
	/**
	 * 
	 * @param {object}	utils		Utils
	 * @param {string}	dataDir		Data storage dir
	 * @param {object}	userArgs	Merged settings from CLI opts into config file
	 * @param {package}	fs			FS/FS-Extra
	 * @param {package}	path		Path
	 * 
	 * @property {string}		versionFile			path to text file containing a version
	 * @property {object}		db					db adapter
	 * @property {number}		fromVersion			version prior to patch
	 * @property {number}		toVersion			version of the app running now (may be several ahead of local version file)
	 * @property {number}		requiredMinVersion	the min version this patcher can handle - might be cases of v2.0.0 to -> v3.0.0 that cant be made in 1 jump
	 * @property {object}		patchFile			PatchFile class ref
	 */
	constructor(params) {
		this.utils = params.utils;
		this.dataDir = params.dataDir;
		this.userArgs = params.userArgs;
		this.fs = params.fs;
		this.path = params.path;

		this.updateTarget = 0;
		this.versionFile = constants.PATCHES.VERSION_FILE;
		this.db = false;
		this.fromVersion = this.getFromVersion();
		this.toVersion = this.versionNumber(constants.APP.VERSION);
		this.requiredMinVersion = 0;
		this.requireRestart = false;
		this.newInstall = false;
		this.versionToWrite = constants.APP.VERSION;
		this.updateMsg = "PARTIALLY UPDATED - THERE ARE MORE UPDATES TO RUN";

		this.checkForExistingDB();

		this.patchFile = {
			pre: ()=>{return new Promise((resolve, reject)=>{resolve();});},
			post: ()=>{return new Promise((resolve, reject)=>{resolve();});}
		};
	}

	/**
	 * Get list of patches ready
	 */
	prep() {
		let utils = this.utils;
		let userArgs = this.userArgs;
		let fromVersion = this.fromVersion;
		let setRequireRestart = this.setRequireRestart.bind(this);
		let newInstall = this.newInstall;
		let setVersionToWrite = this.setVersionToWrite.bind(this);
		let setUpdateMessage = this.setUpdateMessage.bind(this);

		return new Promise((resolve, reject)=>{
			if(newInstall) {
				// nothing to patch
				resolve();
			} else if(fromVersion < 210) {
				// they are updating TO 2.0.0
				setRequireRestart(true);

				let { PatchFile } = require("./p200_210");
				this.patchFile = new PatchFile({ utils: this.utils, dataDir: this.dataDir, userArgs: this.userArgs, fs: this.fs, path: this.path, db: this.db });

				setVersionToWrite("2.1.0");
				resolve();
			} else if(fromVersion < 220) {
				// updating TO 2.2.0
				setRequireRestart(true);

				let { PatchFile } = require("./p210_220");
				this.patchFile = new PatchFile({ utils: this.utils, dataDir: this.dataDir, userArgs: this.userArgs, fs: this.fs, path: this.path, db: this.db });

				setVersionToWrite("2.2.0");
				resolve();
			} else if(fromVersion < 221) {
				// updating TO 2.2.1
				setRequireRestart(false);
				setUpdateMessage("");

				let { PatchFile } = require("./p220_221");
				this.patchFile = new PatchFile({ utils: this.utils, dataDir: this.dataDir, userArgs: this.userArgs, fs: this.fs, path: this.path, db: this.db });
				resolve();
			} else {
				// current/up to date - do nothing
				resolve();
			}							
		});
	}

	/**
	 * Run any patches that need to run early
	 */
	prePatches() {
		let patchFile = this.patchFile;

		return new Promise((resolve, reject)=>{
			patchFile.pre().then(()=>{
				resolve();
			});			
		});
	}

	/**
	 * Run any patches that need to happen after ready
	 */
	postPatches(db) {
		let patchFile = this.patchFile;
		let writeVersion = this.writeVersion.bind(this);
		let requireRestart = this.requireRestart;
		let restarting = this.restarting.bind(this);

		return new Promise((resolve, reject)=>{	
			patchFile.post(db).then(()=>{
				writeVersion();

				if(requireRestart) {
					console.log("requires restart");
					setTimeout(restarting,1000);
				}

				resolve();
			});
		});
	}

	/**
	 * Read the version file, so we know what version we're coming from
	 */
	getFromVersion() {
		if (this.fs.existsSync(this.versionFile)) {
			return this.versionNumber(this.fs.readFileSync(this.versionFile, 'utf8'));
		} else {
			return 0;
		}
	}

	/**
	 * Turn version into a number
	 * @param {string} v version value from file
	 */
	versionNumber(v) {
		return v.replace(/\./g, '') * 1;
	}

	/**
	 * update or write the version file for next run
	 */
	writeVersion() {
		let fs = this.fs;
		let utils = this.utils;
		let userArgs = this.userArgs;
		let versionFile = this.versionFile;
		let versionToWrite = this.versionToWrite;

		return new Promise((resolve, reject)=>{
			fs.writeFile(versionFile, versionToWrite, () => {
				resolve();
			});	
		});
	}

	/**
	 * Set require restart flag
	 */
	setRequireRestart(bool) {
		this.requireRestart = bool;
	}

	/**
	 * Set version file contents
	 */
	setVersionToWrite(vStr) {
		this.versionToWrite = vStr;
	}

	/**
	 * Set update message
	 */
	setUpdateMessage(str) {
		this.updateMsg = str;
	}

	/**
	 * check for existing db files, if none, its a new install
	 */
	checkForExistingDB() {
		if (!this.fs.existsSync("./data/bits.db")) {
			this.newInstall = true;
		}
	}

	/**
	 * Restart messaging
	 */
	restarting() {
		this.userArgs.DEBUG && this.utils.notice("================================================================");
		this.userArgs.DEBUG && this.utils.notice("	PATCH COMPLETE ");
		this.userArgs.DEBUG && this.utils.notice("	YOU MUST RESTART THE APP TO FINISH UPDATING");
		this.userArgs.DEBUG && this.utils.notice("	APP WILL EXIT SHORTLY, PLEASE RESTART IT");
		this.userArgs.DEBUG && this.utils.notice("	THIS MAY HAPPEN A FEW TIMES TO GET YOU FULLY UPDATED");
		this.userArgs.DEBUG && this.utils.notice("================================================================");

		let i = 0;

		setTimeout(()=>{
			process.exit();
		},8000);
	}
}

exports.Patches = Patches;