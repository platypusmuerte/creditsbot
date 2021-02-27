const { template } = require('lodash');
const { constants } = require('../constants');
const { timerbars } = require("../defaults/timerbars");

/**
 * DB Queries
 */
class TimerBarsQueries {
	/**
	 *
	 * @param {package}	cryptr		cryptr
	 * @param {string}	dataDir		Data storage dir
	 * @param {class}	utils		Utils
	 *
	 * @property {class}		TimerBarsDBAdapter
	 * @property {object}		db			database adapter
	 */
	constructor(params) {
		this.cryptr = params.cryptr;
		this.dataDir = params.dataDir;
		this.utils = params.utils;
		this.path = params.path;

		const { TimerBarsDBAdapter } = require("../adapters/timerbars");
		this.db = new TimerBarsDBAdapter({ cryptr: this.cryptr, dataDir: this.dataDir, path: this.path }).get();
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
			resolve(db.value());
		});		
	}

	/**
	 * returns array of json
	 */
	getForDropdown() {
		let db = this.db;

		return new Promise((resolve, reject)=>{
			let all = db.sortBy("label").value();
			let resp = [];
			
			all.forEach((t)=>{
				resp.push({value: t.key, label: t.label});
			});

			resolve(resp);
		});		
	}

	/**
	 * Add new timerbar
	 */
	addNew(data) {
		let db = this.db;

		return new Promise((resolve, reject)=>{
			if (db.find({ key: data.key }).has("key").value()) {
				resolve(false);
			} else {
				db.push(data).write();
				resolve(true);
			}
		});
	}

	/**
	 * Get a timerbar by its key
	 * @param {string} key timerbar key
	 */
	getByKey(key) {
		let db = this.db;

		return new Promise((resolve, reject)=>{
			resolve(db.find({ key: key }).value());
		});
	}

	/**
	 * Update a timerbar, add new
	 * @param {object} data		template object 
	 */
	setByKey(data) {
		let db = this.db;

		return new Promise((resolve, reject)=>{
			db.find({ key: data.key }).assign(data).write();		
			
			resolve(true);
		});
	}
	
	/**
	 * Remove a timerbar from database
	 * @param {object} data contains timerbar key to remove
	 */
	removeByKey(data) {
		let db = this.db;

		return new Promise((resolve, reject)=>{
			db.remove({ key: data.key }).write();

			resolve(true);
		});
	}
}

exports.TimerBarsQueries = TimerBarsQueries;


