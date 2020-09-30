const { constants } = require('../constants');

class TemplateColorsQueries {
	constructor(params) {
		this.cryptr = params.cryptr;
		this.dataDir = params.dataDir;
		this.utils = params.utils;
		this.path = params.path;
		this.DBNAME = constants.SETTINGS_DATABASE_NAMES.TEMPLATE_COLORS;
		this.DBKEY = "templatecolors";

		const { TemplateColorsDBAdapter } = require("../adapters/templatecolors");
		this.db = new TemplateColorsDBAdapter({ cryptr: this.cryptr, dataDir: this.dataDir, path: this.path }).get();
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
				title: data.title,
				subtitle: data.subtitle,
				background: data.background,
				sectiontitle: data.sectiontitle,
				textcolor: data.textcolor,
				sectionborder: data.sectionborder
			}).write();

			resolve("");
		});		
	}
}

exports.TemplateColorsQueries = TemplateColorsQueries;