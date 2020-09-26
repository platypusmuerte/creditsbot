const { constants } = require('../constants');

class BlacklistQueries {
	constructor(params) {
		this.cryptr = params.cryptr;
		this.dataDir = params.dataDir;
		this.utils = params.utils;
		this.DBNAME = constants.SETTINGS_DATABASE_NAMES.TEMPLATE_BLACKLIST;

		const { BlacklistDBAdapter } = require("../adapters/blacklist");
		this.db = new BlacklistDBAdapter({ cryptr: this.cryptr, dataDir: this.dataDir }).get();
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
	 * array of usernames
	 */
	getAll() {
		let db = this.db;

		return new Promise(function (resolve, reject) {
			resolve(db.get(constants.SETTINGS_DATABASE_NAMES.TEMPLATE_BLACKLIST).value());
		});		
	}

	setData(data) {
		let db = this.db;

		return new Promise(function (resolve, reject) {
			db.assign(data).write();

			resolve("");
		});		
	}
}

exports.BlacklistQueries = BlacklistQueries;