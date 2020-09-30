const { constants } = require('../constants');

class TemplateThemeQueries {
	constructor(params) {
		this.cryptr = params.cryptr;
		this.dataDir = params.dataDir;
		this.utils = params.utils;
		this.path = params.path;
		this.DBNAME = constants.SETTINGS_DATABASE_NAMES.TEMPLATE_THEME;

		const { TemplateThemeDBAdapter } = require("../adapters/templatetheme");
		this.db = new TemplateThemeDBAdapter({ cryptr: this.cryptr, dataDir: this.dataDir, path: this.path }).get();
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

	/**
	 * Add new template.
	 * @param theme		object		{name: str, id: str}
	 */
	addNew(theme) {
		let db = this.db;
		let DBNAME = this.DBNAME;

		return new Promise(function (resolve, reject) {
			if (db.filter({ id: theme.id }).size().value() * 1 < 1) {
				db.push(theme).write();
			}

			resolve("");
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

exports.TemplateThemeQueries = TemplateThemeQueries;