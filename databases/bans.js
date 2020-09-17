const { constants } = require('../constants');

class BansQueries {
	constructor(params) {
		this.cryptr = params.cryptr;
		this.dataDir = params.dataDir;
		this.utils = params.utils;

		const { BansDBAdapter } = require("../adapters/bans");
		this.db = new BansDBAdapter({ cryptr: this.cryptr, dataDir: this.dataDir }).get();
	}

	/**
	 * returns array of json
	 */
	getAll() {
		let db = this.db;

		return new Promise(function (resolve, reject) {
			resolve(db.get(constants.DATABASE_NAMES.BANS).value());
		});
	}

	/**
	 * returns empty string
	 */
	addUser(user, amount) {
		let db = this.db;

		return new Promise(function (resolve, reject) {
			if (db.get(constants.DATABASE_NAMES.BANS).filter({ name: user }).size().value() * 1 < 1) {
				db.get(constants.DATABASE_NAMES.BANS).push({ name: user, amount: 1 }).write();
			}
			
			resolve("");
		});
	}

	removeUser() {
		let db = this.db;

		return new Promise(function (resolve, reject) {
			db.get(constants.DATABASE_NAMES.BANS).remove({ name: user }).write();

			resolve("");
		});
	}

	getTop10() {
		return new Promise(function (resolve, reject) {
			resolve("");
		});
	}

	getTop5() {
		return new Promise(function (resolve, reject) {
			resolve("");
		});
	}

	getUser() {
		return new Promise(function (resolve, reject) {
			resolve("");
		});
	}
}

exports.BansQueries = BansQueries;