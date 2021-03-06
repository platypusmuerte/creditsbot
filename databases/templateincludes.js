const { constants } = require('../constants');


/**
 * DB Queries
 */
class TemplateIncludesQueries {
	constructor(params) {
		this.cryptr = params.cryptr;
		this.dataDir = params.dataDir;
		this.utils = params.utils;
		this.path = params.path;
		this.DBNAME = constants.SETTINGS_DATABASE_NAMES.TEMPLATE_INCLUDES;
		this.DBKEY = "templateincludes";

		const { TemplateIncludesDBAdapter } = require("../adapters/templateincludes");
		this.db = new TemplateIncludesDBAdapter({ cryptr: this.cryptr, dataDir: this.dataDir, path: this.path }).get();
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
			db.assign({ css: data.css, js: data.js }).write();

			resolve("");
		});		
	}
}

exports.TemplateIncludesQueries = TemplateIncludesQueries;