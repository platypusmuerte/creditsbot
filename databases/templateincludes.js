const { constants } = require('../constants');

class TemplateIncludesQueries {
	constructor(params) {
		this.cryptr = params.cryptr;
		this.dataDir = params.dataDir;
		this.utils = params.utils;
		this.DBNAME = constants.SETTINGS_DATABASE_NAMES.TEMPLATE_INCLUDES;
		this.DBKEY = "templateincludes";

		const { TemplateIncludesDBAdapter } = require("../adapters/templateincludes");
		this.db = new TemplateIncludesDBAdapter({ cryptr: this.cryptr, dataDir: this.dataDir }).get();
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
			db.assign({ css: data.css, js: data.js }).write();

			resolve("");
		});		
	}

	/* Set port */
	/*setPort(port) {
		let db = this.db;

		return new Promise(function (resolve, reject) {
			db.assign({ port: port*1 }).write();

			resolve("");
		});		
	}*/
}

exports.TemplateIncludesQueries = TemplateIncludesQueries;