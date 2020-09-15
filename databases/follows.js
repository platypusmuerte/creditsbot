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
			let exists = db.get(constants.DATABASE_NAMES.FOLLOWS).includes(user).value();

			if (!exists) {
				db.get(constants.DATABASE_NAMES.FOLLOWS).push(user).write();
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
			db.get(constants.DATABASE_NAMES.FOLLOWS).remove(user).write();

			resolve("");
		});
	}

	/**
	 * returns string
	 */
	getTop10() {
		let db = this.db;

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