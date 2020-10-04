const { constants } = require('../constants');


/**
 * DB Queries
 */
class HDonosQueries {
	constructor(params) {
		this.cryptr = params.cryptr;
		this.dataDir = params.dataDir;
		this.utils = params.utils;
		this.path = params.path;

		const { HDonosDBAdapter } = require("../adapters/hdonos");
		this.db = new HDonosDBAdapter({ cryptr: this.cryptr, dataDir: this.dataDir, path: this.path }).get();
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
			resolve(db.get(constants.DATABASE_NAMES.HISTORIC_DONOS).value());
		});
	}

	/**
	 * returns empty string
	 */
	addUser(user, amount) {
		let db = this.db;

		return new Promise((resolve, reject)=>{
			if (db.get(constants.DATABASE_NAMES.HISTORIC_DONOS).find({ name: user }).has("name").value()) {
				let newAmount = (db.get(constants.DATABASE_NAMES.HISTORIC_DONOS).find({ name: user }).value().amount * 1) + amount * 1;
				db.get(constants.DATABASE_NAMES.HISTORIC_DONOS).find({ name: user }).assign({ name: user, amount: newAmount }).write();
			} else {
				db.get(constants.DATABASE_NAMES.HISTORIC_DONOS).push({ name: user, amount: amount }).write();
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
			db.get(constants.DATABASE_NAMES.HISTORIC_DONOS).remove({ name: user }).write();

			resolve("");
		});
	}

	/**
	 * returns string of user:amount,...
	 * or array
	 */
	getTop10(asArray = false) {
		let db = this.db;
		let utils = this.utils;

		return new Promise((resolve, reject)=>{
			let list = db.get(constants.DATABASE_NAMES.HISTORIC_DONOS).value();

			resolve(utils.getTopUsers(list, "amount", "desc", 10, asArray));
		});
	}

	/**
	 * returns string of user:amount,...
	 * or array
	 */
	getTop5(asArray = false) {
		let db = this.db;
		let utils = this.utils;

		return new Promise((resolve, reject)=>{
			let list = db.get(constants.DATABASE_NAMES.HISTORIC_DONOS).value();
			
			resolve(utils.getTopUsers(list, "amount", "desc", 5, asArray));
		});
	}

	/**
	 * returns string user: amount
	 */
	getUser(user) {
		let db = this.db;

		return new Promise((resolve, reject)=>{
			let data = db.get(constants.DATABASE_NAMES.HISTORIC_DONOS).find({ name: user }).value();

			if(data) {
				resolve(data.amount);
			} else {
				resolve("0");
			}			
		});
	}
}

exports.HDonosQueries = HDonosQueries;