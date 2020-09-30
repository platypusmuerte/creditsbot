const { constants } = require('../constants');

class ModsQueries {
	constructor(params) {
		this.cryptr = params.cryptr;
		this.dataDir = params.dataDir;
		this.utils = params.utils;
		this.path = params.path;
		this.lodash = params.lodash;

		const { ModsDBAdapter } = require("../adapters/mods");
		this.db = new ModsDBAdapter({ cryptr: this.cryptr, dataDir: this.dataDir, path: this.path }).get();
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

	getAll() {
		let db = this.db;

		return new Promise(function (resolve, reject) {
			resolve(db.get(constants.DATABASE_NAMES.MODS).value());
		});
	}

	/**
	 * returns empty string
	 */
	addUser(user, amount) {
		let db = this.db;

		return new Promise(function (resolve, reject) {
			if (db.get(constants.DATABASE_NAMES.MODS).filter({ name: user }).size().value() * 1 < 1) {
				db.get(constants.DATABASE_NAMES.MODS).push({ name: user, amount: 1 }).write();
			}

			resolve("");
		});
	}

	/**
	 * returns empty string
	 */
	removeUser(user) {
		let db = this.db;

		return new Promise(function (resolve, reject) {
			db.get(constants.DATABASE_NAMES.MODS).remove({ name: user }).write();

			resolve("");
		});
	}

	/**
	 * returns string
	 */
	getTop10(asArray = false) {
		return new Promise(function (resolve, reject) {
			resolve("");
		});
	}

	/**
	 * returns string
	 */
	getTop5(asArray = false) {
		return new Promise(function (resolve, reject) {
			resolve("");
		});
	}

	/**
	 * returns string
	 */
	getUser(user) {
		return new Promise(function (resolve, reject) {
			resolve("");
		});
	}
}

exports.ModsQueries = ModsQueries;