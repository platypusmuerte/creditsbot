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
	 * @param {object}	db			Database
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
	 * @property {object}		patches				map patch string to method
	 * @property {object}		patchMap			map prev version to next version for calling patches methods
	 */
	constructor(params) {
		this.utils = params.utils;
		this.db = params.db;
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
		
		this.patches = {
			"2.0.1": this.patch_201.bind(this)
		};
		this.patchMap = {
			"2.0.0":"2.0.1"
		};

		this.getVersionFile();
	}

	/**
	 * Run any patches in order if no version, or version is > previous version
	 */
	patch() {
		if (this.prevVersion < this.currentVersion) {
			this.userArgs.DEBUG && this.utils.console("Checking for any available patches");

			if (this.patchMap[this.prevVersionStr] && this.patchMap[this.prevVersionStr]) {
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
	 * Patch 2.0.0 to 2.0.1
	 */
	patch_201() {
		let db = this.db;
		// add new template to sorting, if not present

		// add amount color and total color to colors db
		const { templatecolors } = require("../defaults/templatecolors");

		db.databases.templatecolors.getAll().then((colors)=>{
			db.databases.templatecolors.setData({
				title: colors.title,
				subtitle: colors.subtitle,
				background: colors.background,
				sectiontitle: colors.sectiontitle,
				textcolor: colors.textcolor,
				amountcolor: templatecolors.amountcolor,
				totalcolor: templatecolors.totalcolor,
				sectionborder: colors.sectionborder
			});
		});

		// update templates with amountColor and totalColor
		db.databases.credittemplates.getAll().then((allTemplates)=>{
			allTemplates.forEach((t)=>{
				db.databases.credittemplates.getTemplateByID(t.id).then((thisTemplate)=>{
					let str = thisTemplate.inner;

					if(str.indexOf("amountColor") === -1) {
						str = thisTemplate.inner.replace('class="amount','class="amount amountColor');
					}

					if(str.indexOf("totalColor") === -1) {
						str = str.replace('class="total','class="total totalColor');
					}

					thisTemplate.inner = str;

					db.databases.credittemplates.setTemplateByID(thisTemplate);
				});
			});
		});

		this.checkAgain();
	}
}

exports.Patcher = Patcher;