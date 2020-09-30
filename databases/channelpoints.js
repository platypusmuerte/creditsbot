const { constants } = require('../constants');

class ChannelPointsQueries {
	constructor(params) {
		this.cryptr = params.cryptr;
		this.dataDir = params.dataDir;
		this.utils = params.utils;
		this.path = params.path;

		const { ChannelPointsDBAdapter } = require("../adapters/channelpoints");
		this.db = new ChannelPointsDBAdapter({ cryptr: this.cryptr, dataDir: this.dataDir, path: this.path }).get();
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
			resolve(db.get(constants.DATABASE_NAMES.CHANNELPOINTS).value());
		});
	}

	/**
	 * returns empty string
	 */
	addUser(user, amount) {
		let db = this.db;

		return new Promise(function (resolve, reject) {
			if (db.get(constants.DATABASE_NAMES.CHANNELPOINTS).find({ name: user }).has("name").value()) {
				let newAmount = (db.get(constants.DATABASE_NAMES.CHANNELPOINTS).find({ name: user }).value().amount * 1) + amount * 1;
				db.get(constants.DATABASE_NAMES.CHANNELPOINTS).find({ name: user }).assign({ name: user, amount: newAmount }).write();
			} else {
				db.get(constants.DATABASE_NAMES.CHANNELPOINTS).push({ name: user, amount: amount }).write();
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
			db.get(constants.DATABASE_NAMES.CHANNELPOINTS).remove({ name: user }).write();

			resolve("");
		});
	}

	/**
	 * returns string of user:amount,...
	 */
	getTop10(asArray = false) {
		let db = this.db;
		let utils = this.utils;

		return new Promise(function (resolve, reject) {
			let list = db.get(constants.DATABASE_NAMES.CHANNELPOINTS).value();

			resolve(utils.getTopUsers(list, "amount", "desc", 10, asArray));
		});
	}

	/**
	 * returns string of user:amount,...
	 */
	getTop5(asArray = false) {
		let db = this.db;
		let utils = this.utils;

		return new Promise(function (resolve, reject) {
			let list = db.get(constants.DATABASE_NAMES.CHANNELPOINTS).value();

			resolve(utils.getTopUsers(list, "amount", "desc", 5, asArray));
		});
	}

	/**
	 * returns string user: amount
	 */
	getUser(user) {
		let db = this.db;

		return new Promise(function (resolve, reject) {
			let data = db.get(constants.DATABASE_NAMES.CHANNELPOINTS).find({ name: user }).value();

			if (data) {
				resolve(data.amount);
			} else {
				resolve("0");
			}
		});
	}
}

exports.ChannelPointsQueries = ChannelPointsQueries;