const { constants } = require('../constants');

class TemplateSettingsQueries {
	constructor(params) {
		this.cryptr = params.cryptr;
		this.dataDir = params.dataDir;
		this.utils = params.utils;
		this.DBNAME = constants.SETTINGS_DATABASE_NAMES.TEMPLATE_SETTINGS;
		this.DBKEY = "templatesettings";

		const { TemplateSettingsDBAdapter } = require("../adapters/templatesettings");
		this.db = new TemplateSettingsDBAdapter({ cryptr: this.cryptr, dataDir: this.dataDir }).get();
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
				looping: data.looping,
				speed: data.speed
			}).write();

			resolve("");
		});		
	}
}

exports.TemplateSettingsQueries = TemplateSettingsQueries;