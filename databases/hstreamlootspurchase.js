const { constants } = require('../constants');


/**
 * DB Queries
 */
class HStreamLootsPurchaseQueries {
	constructor(params) {
		this.cryptr = params.cryptr;
		this.dataDir = params.dataDir;
		this.utils = params.utils;
		this.path = params.path;
		this.DBNAME = constants.DATABASE_NAMES.HISTORIC_STREAMLOOTSPURCHASE;

		const { HStreamLootsPurchaseDBAdapter } = require("../adapters/hstreamlootspurchase");
		this.db = new HStreamLootsPurchaseDBAdapter({ cryptr: this.cryptr, dataDir: this.dataDir, path: this.path }).get();
	}

	/**
	 * returns array of json
	 */
	getAll() {
		let db = this.db;
		let dbName = this.DBNAME;

		return new Promise((resolve, reject)=>{
			resolve(db.get(dbName).value());
		});
	}

	/**
	 * returns empty string
	 */
	addUser(user, amount, expectedParams) {
		let db = this.db;
		let dbName = this.DBNAME;

		return new Promise((resolve, reject)=>{
			if (db.get(dbName).find({ name: user }).has("name").value()) {
				let newAmount = (db.get(dbName).find({ name: user }).value().amount * 1) + 1;
				db.get(dbName).find({ name: user }).assign({ name: user, amount: newAmount }).write();
			} else {
				db.get(dbName).push({ name: user, amount: amount }).write();
			}

			resolve("");			
		});
	}

	/**
	 * returns empty string
	 */
	removeUser(user) {
		let db = this.db;
		let dbName = this.DBNAME;

		return new Promise((resolve, reject)=>{
			db.get(dbName).remove({ name: user }).write();

			resolve("");
		});
	}

	/**
	 * get full state of DB
	 */
	getState() {
		let db = this.db;
		let dbName = this.DBNAME;

		return new Promise((resolve, reject)=>{
			resolve(db.value());
		});
	}

	/**
	 * returns string of user:amount,...
	 * or array
	 */
	getTop10(asArray = false, expectedParams) {
		let db = this.db;
		let dbName = this.DBNAME;
		let utils = this.utils;

		return new Promise((resolve, reject)=>{
			let list = db.get(dbName).value();
			
			resolve(utils.getTopUsers(list, "amount", "desc", 10, asArray));
		});
	}

	/**
	 * returns string of user:amount,...
	 * or array
	 */
	getTop5(asArray = false, expectedParams) {
		let db = this.db;
		let dbName = this.DBNAME;
		let utils = this.utils;

		return new Promise((resolve, reject)=>{
			let list = db.get(dbName).value();
			
			resolve(utils.getTopUsers(list, "amount", "desc", 5, asArray));
		});
	}

	/**
	 * returns string user: amount
	 */
	getUser(user) {
		let db = this.db;
		let dbName = this.DBNAME;

		return new Promise((resolve, reject)=>{
			let data = db.get(dbName).find({ name: user }).value();

			if(data) {
				resolve(data.amount);
			} else {
				resolve("0");
			}			
		});
	}
}

exports.HStreamLootsPurchaseQueries = HStreamLootsPurchaseQueries;