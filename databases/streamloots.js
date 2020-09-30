const { constants } = require('../constants');


/**
 * DB Queries
 */
class StreamLootsQueries {
	constructor(params) {
		this.cryptr = params.cryptr;
		this.dataDir = params.dataDir;
		this.utils = params.utils;
		this.path = params.path;

		const { StreamLootsDBAdapter } = require("../adapters/streamloots");
		this.db = new StreamLootsDBAdapter({ cryptr: this.cryptr, dataDir: this.dataDir, path: this.path }).get();
	}

	/**
	 * returns array of json
	 */
	getAll() {
		let db = this.db;

		return new Promise(function (resolve, reject) {
			resolve(db.get(constants.DATABASE_NAMES.STREAMLOOTS).value());
		});
	}

	/**
	 * returns empty string
	 */
	addUser(user, amount, expectedParams) {
		let db = this.db;
		let card = expectedParams.card||false;

		return new Promise(function (resolve, reject) {
			if (!card) {
				resolve("");
			} else {
				if (db.get(constants.DATABASE_NAMES.STREAMLOOTS).find({ name: user, card: card }).has("name").value()) {
					let newAmount = (db.get(constants.DATABASE_NAMES.STREAMLOOTS).find({ name: user }).value().amount * 1) + 1;
					db.get(constants.DATABASE_NAMES.STREAMLOOTS).find({ name: user, card: card }).assign({ name: user, card: card , amount: newAmount }).write();
				} else {
					db.get(constants.DATABASE_NAMES.STREAMLOOTS).push({ name: user, card: card , amount: amount }).write();
				}

				resolve("");
			}
			
		});
	}

	/**
	 * returns empty string
	 */
	removeUser(user) {
		let db = this.db;

		return new Promise(function (resolve, reject) {
			db.get(constants.DATABASE_NAMES.STREAMLOOTS).remove({ name: user }).write();

			resolve("");
		});
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

	/**
	 * returns string of user:amount,...
	 * or array
	 */
	getTop10(asArray = false, expectedParams) {
		let db = this.db;
		let utils = this.utils;
		let card = expectedParams.card || false;

		return new Promise(function (resolve, reject) {
			let list = db.get(constants.DATABASE_NAMES.STREAMLOOTS).value();
			
			resolve(utils.getTopCards(list, 10));
		});
	}

	/**
	 * returns string of user:amount,...
	 * or array
	 */
	getTop5(asArray = false, expectedParams) {
		let db = this.db;
		let utils = this.utils;
		let card = expectedParams.card || false;

		return new Promise(function (resolve, reject) {
			let list = db.get(constants.DATABASE_NAMES.STREAMLOOTS).value();
			
			resolve(utils.getTopCards(list, 5));
		});
	}

	/**
	 * returns string user: amount
	 */
	getUser(user) {
		let db = this.db;

		return new Promise(function (resolve, reject) {
			let data = db.get(constants.DATABASE_NAMES.STREAMLOOTS).find({ name: user }).value();

			if(data) {
				resolve(data.amount);
			} else {
				resolve("0");
			}			
		});
	}
}

exports.StreamLootsQueries = StreamLootsQueries;