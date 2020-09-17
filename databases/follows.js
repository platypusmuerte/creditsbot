const { constants } = require('../constants');

class FollowsQueries {
	constructor(params) {
		this.cryptr = params.cryptr;
		this.dataDir = params.dataDir;
		this.utils = params.utils;

		const { FollowsDBAdapter } = require("../adapters/follows");
		this.db = new FollowsDBAdapter({ cryptr: this.cryptr, dataDir: this.dataDir }).get();
	}

	/**
	* returns array of json
	*/
	getAll() {
		let db = this.db;

		return new Promise(function (resolve, reject) {
			resolve(db.get(constants.DATABASE_NAMES.FOLLOWS).value());
		});
	}

	/**
	 * returns empty string
	 */
	addUser(user, amount) {
		let db = this.db;

		return new Promise(function (resolve, reject) {
			let exists = db.get(constants.DATABASE_NAMES.FOLLOWS).has({ name: user }).value();

			if (db.get(constants.DATABASE_NAMES.FOLLOWS).filter({ name: user }).size().value()*1 < 1) {
				console.log("ADDED FOLLOWER " + user);
				db.get(constants.DATABASE_NAMES.FOLLOWS).push({ name: user, amount: 1 }).write();
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
			db.get(constants.DATABASE_NAMES.FOLLOWS).remove({ name: user }).write();

			resolve("");
		});
	}

	/**
	 * returns string
	 */
	getTop10() {
		return new Promise(function (resolve, reject) {
			resolve("");
		});
	}

	/**
	 * returns string
	 */
	getTop5() {
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

exports.FollowsQueries = FollowsQueries;