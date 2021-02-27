const { template } = require('lodash');
const { constants } = require('../constants');
const { timerbars } = require("../defaults/timerbars");

/**
 * DB Queries
 */
class TimerBarsCustCSSQueries {
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

		const { TimerBarsCustCSSDBAdapter } = require("../adapters/timerbarscustcss");
		this.db = new TimerBarsCustCSSDBAdapter({ cryptr: this.cryptr, dataDir: this.dataDir, path: this.path }).get();
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
	 * Add new 
	 */
	addNew(data) {
		let db = this.db;
		let newData = Object.assign({},{key: "custcss"},data);

		return new Promise((resolve, reject)=>{
			if (db.find({ key: newData.key }).has("key").value()) {
				db.find({ key: newData.key }).assign(newData).write();		
				
				resolve(true);
			} else {
				db.push(newData).write();
				resolve(true);
			}
		});
	}
}

exports.TimerBarsCustCSSQueries = TimerBarsCustCSSQueries;


