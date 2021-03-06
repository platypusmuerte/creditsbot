const { constants } = require('../constants');

/**
 * DB Queries
 */
class BansQueries {
	constructor(params) {
		this.cryptr = params.cryptr;
		this.dataDir = params.dataDir;
		this.utils = params.utils;
		this.path = params.path;

		const { BansDBAdapter } = require("../adapters/bans");
		this.db = new BansDBAdapter({ cryptr: this.cryptr, dataDir: this.dataDir, path: this.path }).get();
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
			resolve(db.get(constants.DATABASE_NAMES.BANS).value());
		});
	}

	/**
	 * returns empty string
	 */
	addUser(user, amount) {
		let db = this.db;

		return new Promise((resolve, reject)=>{
			if (db.get(constants.DATABASE_NAMES.BANS).filter({ name: user }).size().value() * 1 < 1) {
				db.get(constants.DATABASE_NAMES.BANS).push({ name: user, amount: 1 }).write();
			}
			
			resolve("");
		});
	}

	removeUser(user) {
		let db = this.db;

		return new Promise((resolve, reject)=>{
			db.get(constants.DATABASE_NAMES.BANS).remove({ name: user }).write();

			resolve("");
		});
	}

	getTop10() {
		return new Promise((resolve, reject)=>{
			resolve("");
		});
	}

	getTop5() {
		return new Promise((resolve, reject)=>{
			resolve("");
		});
	}

	getUser() {
		return new Promise((resolve, reject)=>{
			resolve("");
		});
	}
}

exports.BansQueries = BansQueries;