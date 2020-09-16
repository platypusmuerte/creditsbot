const { constants } = require('../constants');

class HBitsQueries {
	constructor(params) {
		this.cryptr = params.cryptr;
		this.dataDir = params.dataDir;
		this.utils = params.utils;

		const { HBitsDBAdapter } = require("../adapters/hbits");
		this.db = new HBitsDBAdapter({ cryptr: this.cryptr, dataDir: this.dataDir }).get();
	}

	/**
	 * returns array of json
	 */
	getAll() {
		let db = this.db;

		return new Promise(function (resolve, reject) {
			resolve(db.get(constants.DATABASE_NAMES.BITS).value());
		});
	}

	/**
	 * returns empty string
	 */
	addUser(user, amount) {
		let db = this.db;

		return new Promise(function (resolve, reject) {
			if (db.get(constants.DATABASE_NAMES.BITS).find({ name: user }).has("name").value()) {
				let newAmount = (this.db.get(constants.DATABASE_NAMES.BITS).find({ name: user }).value().amount * 1) + amount * 1;
				db.get(constants.DATABASE_NAMES.BITS).find({ name: user }).assign({ name: user, amount: newAmount }).write();
			} else {
				db.get(constants.DATABASE_NAMES.BITS).push({ name: user, amount: amount }).write();
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
			db.get(constants.DATABASE_NAMES.BITS).remove({ name: user }).write();

			resolve("");
		});
	}

	/**
	 * returns string of user:amount,...
	 */
	getTop10() {
		let db = this.db;

		return new Promise(function (resolve, reject) {
			let list = db.get(constants.DATABASE_NAMES.BITS).sortBy("value").take(10).value();
			let resp = [];

			list.forEach((d)=>{
				resp.push(d.name + ": " + d.amount)
			});

			if (resp.length) {
				resolve(resp.join(", "));
			} else {
				resolve("No users");
			}
		});
	}

	/**
	 * returns string of user:amount,...
	 */
	getTop5() {
		let db = this.db;

		return new Promise(function (resolve, reject) {
			let list = db.get(constants.DATABASE_NAMES.BITS).sortBy("value").take(5).value();
			let resp = [];

			list.forEach((d) => {
				resp.push(d.name + ": " + d.amount)
			});

			if (resp.length) {
				resolve(resp.join(", "));
			} else {
				resolve("No users");
			}
		});
	}

	/**
	 * returns string user: amount
	 */
	getUser(user) {
		let db = this.db;

		return new Promise(function (resolve, reject) {
			let data = db.get(constants.DATABASE_NAMES.BITS).find({ name: user }).value();

			if (data) {
				resolve(data.name + ": " + data.amount);
			} else {
				resolve(user + " not found");
			}
		});
	}
}

exports.HBitsQueries = HBitsQueries;