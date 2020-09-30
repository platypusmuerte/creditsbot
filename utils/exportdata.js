const { constants } = require('../constants');
/**
 * Export all viewer data as single json file
 */
class ExportData {
	/**
	 * 
	 * @param {object} 	fs
	 * @param {object} 	path
	 * @param {object}	utils 		Utils class
	 * @param {string}	dataDir		User data folder
	 * @param {object}	userArgs	Merged user settings
	 * @param {object}	db			db adapter
	 * 
	 * @property {string} exportPath	Path where export is saved
	 */
	constructor(params) {
		this.fs = params.fs;
		this.path = params.path;
		this.utils = params.utils;
		this.dataDir = params.dataDir;
		this.userArgs = params.userArgs;
		this.db = params.db;
		this.exportPath = "";
	}

	/**
	 * Create the export
	 */
	create() {
		let ensureMainExportFolder = this.ensureMainExportFolder.bind(this);
		let createNewExportFolder = this.createNewExportFolder.bind(this);
		let runExports = this.runExports.bind(this);
		let writeExport = this.writeExport.bind(this);
		

		return new Promise(function (resolve, reject) {
			ensureMainExportFolder().then(() => {
				createNewExportFolder().then(() => {
					runExports().then((allData)=>{
						writeExport(allData).then(()=>{
							resolve();
						});											
					});
				});
			});
		});
	}

	/**
	 * Write the JSON object to a file
	 * @param {object} allData all of the view data in one object
	 */
	writeExport(allData) {
		let fs = this.fs;
		let userArgs = this.userArgs;
		let utils = this.utils;
		let exportPath = this.exportPath;

		return new Promise(function (resolve, reject) {
			fs.writeFile(exportPath + "/fullexport.json", JSON.stringify({ data: allData }), () => {
				userArgs.DEBUG && utils.console("Exports created");
				resolve();
			});	
		});
	}

	/**
	 * Loop through all db names, add to an array, the promise them all
	 */
	runExports() {
		let db = this.db;
		let pArr = [];
		let names = constants.DATABASE_NAMES;

		Object.entries(names).forEach(([k, v]) => {
			pArr.push(db.databases[v].getState());
		});

		return Promise.all(pArr);
	}

	/**
	 * Make sure export folder exists
	 */
	ensureMainExportFolder() {
		let fs = this.fs;
		let userArgs = this.userArgs;
		let utils = this.utils;

		return new Promise(function (resolve, reject) {
			if (!fs.existsSync("./exports")) {
				fs.mkdirSync("./exports");
				userArgs.DEBUG && utils.console("Created ./exports");
				resolve();
			} else {
				resolve();
			}
		});
	}

	/**
	 * Create new timestamped folder for this export
	 */
	createNewExportFolder() {
		let folder = Date.now();
		let fs = this.fs;
		let userArgs = this.userArgs;
		let utils = this.utils;
		this.exportPath = "./exports/" + folder;
		let exportPath = this.exportPath;

		return new Promise(function (resolve, reject) {
			if (!fs.existsSync(exportPath)) {
				fs.mkdirSync(exportPath);
				userArgs.DEBUG && utils.console("Created " + exportPath);
				resolve();
			} else {
				resolve();
			}
		});
	}
}

exports.ExportData = ExportData;