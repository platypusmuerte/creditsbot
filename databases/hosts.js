const { constants } = require('../constants');

class HostsQueries {
	constructor(params) {
		this.cryptr = params.cryptr;
		this.dataDir = params.dataDir;
		this.utils = params.utils;

		const { HostsDBAdapter } = require("../adapters/hosts");
		this.db = new HostsDBAdapter({ cryptr: this.cryptr, dataDir: this.dataDir }).get();
	}

	/**
	 * returns json array
	 */
	getAll() {
		let db = this.db;

		return new Promise(function (resolve, reject) {
			resolve(db.get(constants.DATABASE_NAMES.HOSTS).value());
		});
	}

	/**
	 * returns empty string
	 */
	addUser(user, amount) {
		let db = this.db;

		return new Promise(function (resolve, reject) {
			if (db.get(constants.DATABASE_NAMES.HOSTS).find({ name: user }).has("name").value()) {
				db.get(constants.DATABASE_NAMES.HOSTS).find({ name: user }).assign({ name: user, amount: amount }).write();
			} else {
				db.get(constants.DATABASE_NAMES.HOSTS).push({ name: user, amount: amount }).write();
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
			db.get(constants.DATABASE_NAMES.HOSTS).remove({ name: user }).write();

			resolve("");
		});
	}

	/**
	 * returns string of user:amount,...
	 */
	getTop10() {
		let db = this.db;
		let utils = this.utils;

		return new Promise(function (resolve, reject) {
			let list = db.get(constants.DATABASE_NAMES.HOSTS).value();

			resolve(utils.getTopUsers(list, "amount", "desc", 10));
		});
	}

	/**
	 * returns string of user:amount,...
	 */
	getTop5() {
		let db = this.db;
		let utils = this.utils;

		return new Promise(function (resolve, reject) {
			let list = db.get(constants.DATABASE_NAMES.HOSTS).value();

			resolve(utils.getTopUsers(list, "amount", "desc", 5));
		});
	}

	/**
	 * returns string user: amount
	 */
	getUser(user) {
		let db = this.db;

		return new Promise(function (resolve, reject) {
			let data = db.get(constants.DATABASE_NAMES.HOSTS).find({ name: user }).value();

			if (data) {
				resolve(data.amount);
			} else {
				resolve(user + " not found");
			}
		});
	}
}

exports.HostsQueries = HostsQueries;