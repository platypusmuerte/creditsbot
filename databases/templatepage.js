const { constants } = require('../constants');

class TemplatePageQueries {
	constructor(params) {
		this.cryptr = params.cryptr;
		this.dataDir = params.dataDir;
		this.utils = params.utils;
		this.DBNAME = constants.SETTINGS_DATABASE_NAMES.TEMPLATE_PAGE;
		this.DBKEY = "templatepage";

		const { TemplatePageDBAdapter } = require("../adapters/templatepage");
		this.db = new TemplatePageDBAdapter({ cryptr: this.cryptr, dataDir: this.dataDir }).get();
	}

	/**
	 * get full state of DB
	 */
	getState() {
		let db = this.db;

		return new Promise(function (resolve, reject) {
			resolve(db.value());
		});
	}

	/**
	 * returns array of json
	 */
	getAll() {
		let db = this.db;

		return new Promise(function (resolve, reject) {
			resolve(db.value());
		});		
	}

	setData(data) {
		let db = this.db;

		return new Promise(function (resolve, reject) {
			db.assign({
				page: data.page
			}).write();

			resolve("");
		});		
	}
}

exports.TemplatePageQueries = TemplatePageQueries;