const { constants } = require('../constants');

class ExportData {
	constructor(params) {
		this.fs = params.fs;
		this.path = params.path;
		this.utils = params.utils;
		this.dataDir = params.dataDir;
		this.userArgs = params.userArgs;
		this.db = params.db;
		this.exportPath = "";
	}

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

	runExports() {
		let db = this.db;
		let pArr = [];
		let names = constants.DATABASE_NAMES;

		Object.entries(names).forEach(([k, v]) => {
			pArr.push(db.databases[v].getState());
		});

		return Promise.all(pArr);
	}

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