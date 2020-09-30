const { constants } = require('../constants');

class TemplateDefaultCSSQueries {
	constructor(params) {
		this.cryptr = params.cryptr;
		this.dataDir = params.dataDir;
		this.utils = params.utils;
		this.DBNAME = constants.SETTINGS_DATABASE_NAMES.TEMPLATE_DEFAULTCSS;
		this.DBKEY = "templatedefaultcss";

		const { TemplateDefaultCSSDBAdapter } = require("../adapters/templatedefaultcss");
		this.db = new TemplateDefaultCSSDBAdapter({ cryptr: this.cryptr, dataDir: this.dataDir }).get();
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
				css: data.css
			}).write();

			resolve("");
		});		
	}
}

exports.TemplateDefaultCSSQueries = TemplateDefaultCSSQueries;