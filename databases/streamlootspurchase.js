const { constants } = require('../constants');

/**
 * Template Queries
 *
 * Queries for streamloots purchases
 *
 * Exports StreamLootsPurchaseQueries{}
 */

/**
 * DB Queries
 */
class StreamLootsPurchaseQueries {
	/**
	 *
	 * @param {package}	cryptr		cryptr
	 * @param {string}	dataDir		Data storage dir
	 * @param {class}	utils		Utils
	 *
	 * @property {class}		StreamLootsPurchaseDBAdapter
	 * @property {object}		db			database adapter
	 */
	constructor(params) {
		this.cryptr = params.cryptr;
		this.dataDir = params.dataDir;
		this.utils = params.utils;
		this.path = params.path;
		this.DBNAME = constants.DATABASE_NAMES.STREAMLOOTSPURCHASE;

		const { StreamLootsPurchaseDBAdapter } = require("../adapters/streamlootspurchase");
		this.db = new StreamLootsPurchaseDBAdapter({ cryptr: this.cryptr, dataDir: this.dataDir, path: this.path }).get();
	}

	/**
	 * returns array of json
	 */
	getAll() {
		let db = this.db;
		let DBNAME = this.DBNAME;

		return new Promise((resolve, reject)=>{
			resolve(db.get(DBNAME).value());
		});
	}

	/**
	 * returns empty string
	 */
	addUser(user, amount, expectedParams) {
		let db = this.db;
		let DBNAME = this.DBNAME;

		return new Promise((resolve, reject)=>{
			if (db.get(DBNAME).find({ name: user }).has("name").value()) {
				let newAmount = (db.get(DBNAME).find({ name: user }).value().amount * 1) + 1;
				db.get(DBNAME).find({ name: user }).assign({ name: user, amount: newAmount }).write();
			} else {
				db.get(DBNAME).push({ name: user, amount: amount }).write();
			}

			resolve("");			
		});
	}

	/**
	 * returns empty string
	 */
	removeUser(user) {
		let db = this.db;
		let DBNAME = this.DBNAME;

		return new Promise((resolve, reject)=>{
			db.get(DBNAME).remove({ name: user }).write();

			resolve("");
		});
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
	 * returns string of user:amount,...
	 * or array
	 */
	getTop10(asArray = false, expectedParams) {
		let db = this.db;
		let DBNAME = this.DBNAME;
		let utils = this.utils;

		return new Promise((resolve, reject)=>{
			let list = db.get(DBNAME).value();
			
			resolve(utils.getTopUsers(list, "amount", "desc", 10, asArray));
		});
	}

	/**
	 * returns string of user:amount,...
	 * or array
	 */
	getTop5(asArray = false, expectedParams) {
		let db = this.db;
		let DBNAME = this.DBNAME;
		let utils = this.utils;

		return new Promise((resolve, reject)=>{
			let list = db.get(DBNAME).value();
			
			resolve(utils.getTopUsers(list, "amount", "desc", 5, asArray));
		});
	}

	/**
	 * returns string user: amount
	 */
	getUser(user) {
		let db = this.db;
		let DBNAME = this.DBNAME;

		return new Promise((resolve, reject)=>{
			let data = db.get(DBNAME).find({ name: user }).value();

			if(data) {
				resolve(data.amount);
			} else {
				resolve("0");
			}			
		});
	}
}

exports.StreamLootsPurchaseQueries = StreamLootsPurchaseQueries;