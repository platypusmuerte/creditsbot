const { constants } = require('../constants');

class HGiftSubsQueries {
	constructor(params) {
		this.cryptr = params.cryptr;
		this.dataDir = params.dataDir;
		this.utils = params.utils;

		const { HGiftSubsDBAdapter } = require("../adapters/hgiftsubs");
		this.db = new HGiftSubsDBAdapter({ cryptr: this.cryptr, dataDir: this.dataDir }).get();
	}

	/**
	 * returns json array
	 */
	getAll() {
		let db = this.db;

		return new Promise(function (resolve, reject) {
			resolve(db.get(constants.DATABASE_NAMES.GIFTSUBS).value());
		});
	}

	/**
	 * returns empty string
	 */
	addUser(user, amount) {
		let db = this.db;

		return new Promise(function (resolve, reject) {
			if (db.get(constants.DATABASE_NAMES.GIFTSUBS).find({ name: user }).has("name").value()) {
				let newAmount = (this.db.get(constants.DATABASE_NAMES.GIFTSUBS).find({ name: user }).value().amount * 1) + amount * 1;
				db.get(constants.DATABASE_NAMES.GIFTSUBS).find({ name: user }).assign({ name: user, amount: newAmount }).write();
			} else {
				db.get(constants.DATABASE_NAMES.GIFTSUBS).push({ name: user, amount: amount }).write();
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
			db.get(constants.DATABASE_NAMES.GIFTSUBS).remove({ name: user }).write();

			resolve("");
		});
	}

	/**
	 * returns string of user:amount,...
	 */
	getTop10() {
		let db = this.db;

		return new Promise(function (resolve, reject) {
			let list = db.get(constants.DATABASE_NAMES.GIFTSUBS).sortBy("value").take(10).value();
			resp = [];

			list.forEach((d) => {
				resp.push(d.name + ": " + d.amount)
			});

			resolve(resp.join(", "));
		});
	}

	/**
	 * returns string of user:amount,...
	 */
	getTop5() {
		let db = this.db;

		return new Promise(function (resolve, reject) {
			let list = db.get(constants.DATABASE_NAMES.GIFTSUBS).sortBy("value").take(5).value();
			resp = [];

			list.forEach((d) => {
				resp.push(d.name + ": " + d.amount)
			});

			resolve(resp.join(", "));
		});
	}

	/**
	 * returns string user: amount
	 */
	getUser(user) {
		let db = this.db;

		return new Promise(function (resolve, reject) {
			let data = db.get(constants.DATABASE_NAMES.GIFTSUBS).find({ name: user }).value();

			resolve(data.name + ": " + data.amount);
		});
	}
}

exports.HGiftSubsQueries = HGiftSubsQueries;