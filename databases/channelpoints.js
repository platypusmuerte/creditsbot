const { constants } = require('../constants');

class ChannelPointsQueries {
	constructor(params) {
		this.cryptr = params.cryptr;
		this.dataDir = params.dataDir;
		this.utils = params.utils;

		const { ChannelPointsDBAdapter } = require("../adapters/channelpoints");
		this.db = new ChannelPointsDBAdapter({ cryptr: this.cryptr, dataDir: this.dataDir }).get();
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
				let newAmount = (this.db.get(constants.DATABASE_NAMES.CHANNELPOINTS).find({ name: user }).value().amount * 1) + amount * 1;
				this.db.get(constants.DATABASE_NAMES.CHANNELPOINTS).find({ name: user }).assign({ name: user, amount: newAmount }).write();
			} else {
				this.db.get(constants.DATABASE_NAMES.CHANNELPOINTS).push({ name: user, amount: amount }).write();
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
	getTop10() {
		let db = this.db;

		return new Promise(function (resolve, reject) {
			let list = db.get(constants.DATABASE_NAMES.CHANNELPOINTS).sortBy("value").take(10).value();
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
		return new Promise(function (resolve, reject) {
			let list = db.get(constants.DATABASE_NAMES.CHANNELPOINTS).sortBy("value").take(5).value();
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
		return new Promise(function (resolve, reject) {
			let data = db.get(constants.DATABASE_NAMES.CHANNELPOINTS).find({ name: user }).value();

			resolve(data.name + ": " + data.amount);
		});
	}
}

exports.ChannelPointsQueries = ChannelPointsQueries;