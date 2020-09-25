const { constants } = require('../constants');

class TemplateCustomCSSQueries {
	constructor(params) {
		this.cryptr = params.cryptr;
		this.dataDir = params.dataDir;
		this.utils = params.utils;
		this.DBNAME = constants.SETTINGS_DATABASE_NAMES.TEMPLATE_CUSTOMCSS;
		this.DBKEY = "templatecustomcss";

		const { TemplateCustomCSSDBAdapter } = require("../adapters/templatecustomcss");
		this.db = new TemplateCustomCSSDBAdapter({ cryptr: this.cryptr, dataDir: this.dataDir }).get();
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

exports.TemplateCustomCSSQueries = TemplateCustomCSSQueries;