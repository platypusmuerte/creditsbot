const { constants } = require('../constants');


/**
 * DB Queries
 */
class ChattersQueries {
	constructor(params) {
		this.cryptr = params.cryptr;
		this.dataDir = params.dataDir;
		this.utils = params.utils;
		this.path = params.path;

		const { ChattersDBAdapter } = require("../adapters/chatters");
		this.db = new ChattersDBAdapter({ cryptr: this.cryptr, dataDir: this.dataDir, path: this.path }).get();
	}

	/**
	 * get full state of DB
	 */
	getState() {
		let db = this.db;

		return new Promise((resolve, reject)=>{
			resolve(db.value());
		});
	}

	/**
	 * returns array of json
	 */
	getAll() {
		let db = this.db;

		return new Promise((resolve, reject)=>{
			resolve(db.get(constants.DATABASE_NAMES.CHATTERS).value());
		});
	}

	/**
	 * returns empty string
	 */
	addUser(user, amount) {
		let db = this.db;

		return new Promise((resolve, reject)=>{
			if (db.get(constants.DATABASE_NAMES.CHATTERS).find({ name: user }).has("name").value()) {
				let newAmount = (db.get(constants.DATABASE_NAMES.CHATTERS).find({ name: user }).value().amount * 1) + 1;
				db.get(constants.DATABASE_NAMES.CHATTERS).find({ name: user }).assign({ name: user, amount: newAmount }).write();
			} else {
				db.get(constants.DATABASE_NAMES.CHATTERS).push({ name: user, amount: 1 }).write();
			}

			resolve("");
		});
	}

	/**
	 * returns empty string
	 */
	removeUser(user) {
		let db = this.db;

		return new Promise((resolve, reject)=>{
			db.get(constants.DATABASE_NAMES.CHATTERS).remove({ name: user }).write();

			resolve("");
		});
	}

	/**
	 * returns string of user:amount,...
	 */
	getTop10(asArray = false) {
		let db = this.db;
		let utils = this.utils;

		return new Promise((resolve, reject)=>{
			let list = db.get(constants.DATABASE_NAMES.CHATTERS).value();

			resolve(utils.getTopUsers(list, "amount", "desc", 10, asArray));
		});
	}

	/**
	 * returns string of user:amount,...
	 */
	getTop5(asArray = false) {
		let db = this.db;
		let utils = this.utils;

		return new Promise((resolve, reject)=>{
			let list = db.get(constants.DATABASE_NAMES.CHATTERS).value();

			resolve(utils.getTopUsers(list, "amount", "desc", 5, asArray));
		});
	}

	/**
	 * returns string user: amount
	 */
	getUser(user) {
		let db = this.db;

		return new Promise((resolve, reject)=>{
			let data = db.get(constants.DATABASE_NAMES.CHATTERS).find({ name: user }).value();

			if (data) {
				resolve(data.amount);
			} else {
				resolve("0");
			}
		});
	}
}

exports.ChattersQueries = ChattersQueries;