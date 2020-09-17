const { constants } = require('../constants');

class SubsQueries {
	constructor(params) {
		this.cryptr = params.cryptr;
		this.dataDir = params.dataDir;
		this.utils = params.utils;
		this.lodash = params.lodash;

		const { SubsDBAdapter } = require("../adapters/subs");
		this.db = new SubsDBAdapter({ cryptr: this.cryptr, dataDir: this.dataDir }).get();
	}

	/**
	 * returns json array
	 */
	getAll() {
		let db = this.db;

		return new Promise(function (resolve, reject) {
			resolve(db.get(constants.DATABASE_NAMES.SUBS).value());
		});
	}

	/**
	 * returns empty string
	 */
	addUser(user, amount) {
		let db = this.db;

		return new Promise(function (resolve, reject) {
			if (db.get(constants.DATABASE_NAMES.SUBS).find({ name: user }).has("name").value()) {
				let newAmount = (this.db.get(constants.DATABASE_NAMES.SUBS).find({ name: user }).value().amount * 1) + amount * 1;
				db.get(constants.DATABASE_NAMES.SUBS).find({ name: user }).assign({ name: user, amount: newAmount }).write();
			} else {
				db.get(constants.DATABASE_NAMES.SUBS).push({ name: user, amount: amount }).write();
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
			db.get(constants.DATABASE_NAMES.SUBS).remove({ name: user }).write();

			resolve("");
		});
	}

	/**
	 * returns string of user:amount,...
	 */
	getTop10() {
		return new Promise(function (resolve, reject) {
			resolve("");
		});
	}

	/**
	 * returns string of user:amount,...
	 */
	getTop5() {
		return new Promise(function (resolve, reject) {
			resolve("");
		});
	}

	/**
	 * returns string user: amount
	 */
	getUser(user) {
		return new Promise(function (resolve, reject) {
			resolve("");
		});
	}
}

exports.SubsQueries = SubsQueries;