const { constants } = require('../constants');


/**
 * DB Queries
 */
class TemplateSortQueries {
	constructor(params) {
		this.cryptr = params.cryptr;
		this.dataDir = params.dataDir;
		this.utils = params.utils;
		this.path = params.path;
		this.DBNAME = constants.SETTINGS_DATABASE_NAMES.TEMPLATE_SORT;
		this.DBKEY = "templatesort";

		const { TemplateSortDBAdapter } = require("../adapters/templatesort");
		this.db = new TemplateSortDBAdapter({ cryptr: this.cryptr, dataDir: this.dataDir, path: this.path }).get();
	}

	/**
	 * get full state of DB
	 */
	getState() {
		let db = this.db;

		return new Promise((resolve, reject)=>{
			resolve(db.value());
		});
	}

	/**
	 * returns array of json
	 */
	getAll() {
		let db = this.db;

		return new Promise((resolve, reject)=>{
			resolve(db.value());
		});		
	}

	setData(data) {
		let db = this.db;

		return new Promise((resolve, reject)=>{
			db.assign(data).write();

			resolve("");
		});		
	}

	addNew(data) {
		let db = this.db;

		return new Promise((resolve, reject)=>{
			db.push(data).write();

			resolve("");
		});	
	}
}

exports.TemplateSortQueries = TemplateSortQueries;