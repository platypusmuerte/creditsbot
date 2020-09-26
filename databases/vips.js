const { constants } = require('../constants');

class VipsQueries {
	constructor(params) {
		this.cryptr = params.cryptr;
		this.dataDir = params.dataDir;
		this.utils = params.utils;

		const { VipsDBAdapter } = require("../adapters/vips");
		this.db = new VipsDBAdapter({ cryptr: this.cryptr, dataDir: this.dataDir }).get();
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
			resolve(db.get(constants.DATABASE_NAMES.VIPS).value());
		});
	}

	/**
	 * returns empty string
	 */
	addUser(user, amount) {
		let db = this.db;

		return new Promise(function (resolve, reject) {
			if (db.get(constants.DATABASE_NAMES.VIPS).filter({ name: user }).size().value()*1 < 1) {
				db.get(constants.DATABASE_NAMES.VIPS).push({ name: user, amount: 1 }).write();
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
			db.get(constants.DATABASE_NAMES.VIPS).remove({ name: user }).write();

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

exports.VipsQueries = VipsQueries;