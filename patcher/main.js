const { promises } = require('fs-extra');
const { constants } = require('../constants');

/**
 * Patch script run at startup.
 * 
 * Update databases and things when running a newer version.
 * 
 * Exports Patcher{}
 */
class Patcher {
	/**
	 * 
	 * @param {object}	utils		Utils
	 * @param {string}	dataDir		Data storage dir
	 * @param {object}	userArgs	Merged settings from CLI opts into config file
	 * @param {package}	fs			FS/FS-Extra
	 * @param {package}	path		Path
	 * 
	 * @property {bool}			patchOnNoVersion	try to patch if no version file found
	 * @property {string}		versionFile			path to text file containing a version
	 * @property {number}		currentVersion		version as number, without .'s abc
	 * @property {string}		currentVersionStr	version string "a.b.c"
	 * @property {number}		prevVersion			value from version file, without .'s abc
	 * @property {string}		prevVersionStr		value from version file as is "a.b.c"
	 * @property {object}		prePatches			map patch string to method
	 * @property {object}		patches				map patch string to method
	 * @property {object}		patchMap			map prev version to next version for calling patches methods
	 * @property {object}		db					db adapter
	 */
	constructor(params) {
		this.utils = params.utils;
		this.dataDir = params.dataDir;
		this.userArgs = params.userArgs;
		this.fs = params.fs;
		this.path = params.path;

		this.patchOnNoVersion = true;
		this.versionFile = "./version.txt";
		this.currentVersionStr = constants.APP.VERSION;
		this.currentVersion = constants.APP.VERSION.replace(/\./g, '') * 1;
		this.prevVersion = 0;
		this.prevVersionStr = '';
		this.db;

		this.prePatches = {
			"2.0.1": this.prePatch_201.bind(this)
		};
		
		this.patches = {
			"2.0.1": this.patch_201.bind(this)
		};
		this.patchMap = {
			"2.0.0":"2.0.1"
		};

		this.getVersionFile();
	}

	/**
	 * patches that have to be run BEFORE database and things init
	 */
	prePatch() {
		let prePatches = this.prePatches;
		let patchMap = this.patchMap;
		let prevVersionStr = this.prevVersionStr;

		if (this.prevVersion < this.currentVersion) {
			this.userArgs.DEBUG && this.utils.console("Checking for any available pre patches");

			if (patchMap[prevVersionStr] && prePatches[patchMap[prevVersionStr]]) {
				this.userArgs.DEBUG && this.utils.console("    PRE Patching " + prevVersionStr + "->" + patchMap[prevVersionStr]);
				
				return new Promise(function (resolve, reject) {	
					prePatches[patchMap[prevVersionStr]]().then(()=>{
						resolve();
					});
				});
				
			}
		} else {
			// noopsiedoopsie
		}
	}

	/**
	 * Run any patches in order if no version, or version is > previous version
	 */
	patch(db) {
		this.db = db;

		if (this.prevVersion < this.currentVersion) {
			this.userArgs.DEBUG && this.utils.console("Checking for any available patches");

			if (this.patchMap[this.prevVersionStr] && this.patches[this.patchMap[this.prevVersionStr]]) {
				this.userArgs.DEBUG && this.utils.console("    Patching " + this.prevVersionStr + "->" + this.patchMap[this.prevVersionStr]);
				this.patches[this.patchMap[this.prevVersionStr]]();
			}
		} else {
			// noopsiedoopsie
		}
	}

	/**
	 * Read value from file
	 */
	getVersionFile() {
		if (this.fs.existsSync(this.versionFile)) {
			let v = this.fs.readFileSync(this.versionFile, 'utf8');
			this.prevVersionStr = v;
			this.prevVersion = v.replace(/\./g, '') * 1;
		}
	}

	/**
	 * Write value to file for next update
	 */
	writeVersionFile() {
		this.fs.writeFile(this.versionFile, constants.APP.VERSION, () => {
			this.userArgs.DEBUG && this.utils.console("Updated version file");
		});
	}

	/**
	 * Notify patching complete
	 */
	patchComplete() {
		this.userArgs.DEBUG && this.utils.console("    Patch completed");
	}

	/**
	 * See if theres another patch available. Called at the end of each patch
	 */
	checkAgain() {
		this.prevVersionStr = this.patchMap[this.prevVersionStr];
		this.prevVersion = this.prevVersionStr.replace(/\./g, '') * 1
		
		this.patch();
	}

	/**
	 * pre patch for 2.0.1
	 */
	prePatch_201() {
		let path = this.path;
		let fs = this.fs;
		let utils = this.utils;
		let userArgs = this.userArgs;

		return new Promise(function (resolve, reject) {	
			// move existing user settings to theme default dir (prep for themes)
			let dir = path.join("./data", "");
			let delay = 0;

			fs.readdir(dir, (err, files) => {
				if (err) throw err;

				for (const file of files) {
					let ext = path.extname(file);
					let name = path.parse(file).name;

					if (!fs.lstatSync(path.join(dir, file)).isDirectory() && (ext === ".sdb") && (name !== "templatetheme") && (name !== "blacklist")) {
						userArgs.DEBUG && utils.console("moving file " + name);
						delay = 2000;

						fs.move(path.join(dir, file),"./data/themes/default/" + file, err => {
							if (err) throw err;							
						});
					} else {
						//userArgs.DEBUG && utils.console("skipped file " + name);
					}
				}

				if(delay) {
					userArgs.DEBUG && utils.console("Prepatch done.... waiting " + delay/1000 + " seconds");
				}
				
				setTimeout(()=>{
					
					resolve();
				},delay);				
			});

			
		});
		
	}

	/**
	 * Patch 2.0.0 to 2.0.1	 * 		
	 * 		- need to add all tempaltes for streamloots purchases
	 * 		- migrate current templates to default template dir
	 * 		- update colors db in default
	 * 		- update templates with amountColor and totalColor in default db dir, then copy over top of default folder
	 * 		- 
	 */
	patch_201() {
		let db = this.db;
		let path = this.path;
		let fs = this.fs;

		// add amount color and total color to colors db
		const { templatecolors } = require("../defaults/templatecolors");

		db.theme().templatecolors.getAll().then((colors)=>{
			db.theme().templatecolors.setData({
				title: colors.title,
				subtitle: colors.subtitle,
				background: colors.background,
				sectiontitle: colors.sectiontitle,
				textcolor: colors.textcolor,
				amountcolor: templatecolors.amountcolor,
				totalcolor: templatecolors.totalcolor,
				sectionborder: colors.sectionborder
			});
		}).then(()=>{
			// update templates with amountColor and totalColor
			db.theme().credittemplates.getAll().then((allTemplates)=>{
				allTemplates.forEach((t)=>{
					db.theme().credittemplates.getTemplateByID(t.id).then((thisTemplate)=>{
						let str = thisTemplate.inner;

						if(str.indexOf("amountColor") === -1) {
							str = thisTemplate.inner.replace('class="amount','class="amount amountColor');
						}

						if(str.indexOf("totalColor") === -1) {
							str = str.replace('class="total','class="total totalColor');
						}

						thisTemplate.inner = str;

						db.theme().credittemplates.setTemplateByID(thisTemplate);
					});
				});
			}).then(()=>{
				

				this.checkAgain();
			});
		});		
	}
}

exports.Patcher = Patcher;