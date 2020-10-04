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

		this.versionFile = constants.PATCHES.VERSION_FILE;
		this.db = false;
		this.fromVersion = this.getFromVersion();
		this.toVersion = this.versionNumber(constants.APP.VERSION);
		this.requiredMinVersion = 0;

		let { PatchFile } = require("./patch");
		this.patchFile = new PatchFile({ utils: this.utils, dataDir: this.dataDir, userArgs: this.userArgs, fs: this.fs, path: this.path, db: this.db });
	}

	/**
	 * Get list of patches ready
	 */
	prep() {
		let fromVersion = this.fromVersion;
		let requiredMinVersion = this.requiredMinVersion;
		let utils = this.utils;
		let userArgs = this.userArgs;
		let toVersion = this.toVersion;

		return new Promise((resolve, reject)=>{
			// if cant patch from - to, bail now
			if(fromVersion < requiredMinVersion) {
				userArgs.DEBUG && utils.notice("================================================================");
				userArgs.DEBUG && utils.notice("	CANNOT PATCH FROM " + fromVersion + " TO " + toVersion);
				userArgs.DEBUG && utils.notice("	TRY LOWER VERSION FIRST, THEN RUN THIS VERSION AGAIN");
				userArgs.DEBUG && utils.notice("================================================================");
				reject();
			} else {
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

		return new Promise((resolve, reject)=>{	
			patchFile.post(db).then(()=>{
				resolve();
			});			
		});
	}

	/**
	 * Read the version file, so we know what version we're coming from
	 */
	getFromVersion() {
		if (this.fs.existsSync(this.versionFile)) {
			this.fromVersion = this.versionNumber(this.fs.readFileSync(this.versionFile, 'utf8'));
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
}

exports.Patches = Patches;