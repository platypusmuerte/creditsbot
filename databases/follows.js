const { constants } = require('../constants');


/**
 * DB Queries
 */
class FollowsQueries {
	constructor(params) {
		this.cryptr = params.cryptr;
		this.dataDir = params.dataDir;
		this.utils = params.utils;
		this.path = params.path;

		const { FollowsDBAdapter } = require("../adapters/follows");
		this.db = new FollowsDBAdapter({ cryptr: this.cryptr, dataDir: this.dataDir, path: this.path }).get();
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
			resolve(db.get(constants.DATABASE_NAMES.FOLLOWS).value());
		});
	}

	/**
	 * returns empty string
	 */
	addUser(user, amount) {
		let db = this.db;

		return new Promise((resolve, reject)=>{
			if (db.get(constants.DATABASE_NAMES.FOLLOWS).filter({ name: user }).size().value()*1 < 1) {
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

		return new Promise((resolve, reject)=>{
			db.get(constants.DATABASE_NAMES.FOLLOWS).remove({ name: user }).write();

			resolve("");
		});
	}

	/**
	 * returns string
	 */
	getTop10(asArray = false) {
		return new Promise((resolve, reject)=>{
			resolve("");
		});
	}

	/**
	 * returns string
	 */
	getTop5(asArray = false) {
		return new Promise((resolve, reject)=>{
			resolve("");
		});
	}

	/**
	 * returns string
	 */
	getUser(user) {
		return new Promise((resolve, reject)=>{
			resolve("");
		});
	}
}

exports.FollowsQueries = FollowsQueries;