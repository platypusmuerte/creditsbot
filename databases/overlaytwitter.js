const { constants } = require('../constants');


/**
 * DB Queries
 */
class OverlayTwitterQueries {
	constructor(params) {
		this.cryptr = params.cryptr;
		this.dataDir = params.dataDir;
		this.utils = params.utils;
		this.path = params.path;
		this.DBNAME = constants.SETTINGS_DATABASE_NAMES.OVERLAY_TWITTER;

		const { OverlayTwitterDBAdapter } = require("../adapters/overlaytwitter");
		this.db = new OverlayTwitterDBAdapter({ cryptr: this.cryptr, dataDir: this.dataDir, path: this.path }).get();
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
	 * returns json
	 */
	getAll() {
		let db = this.db;

		return new Promise((resolve, reject)=>{
			resolve(db.value());
		});		
	}

	/**
	 * Write settings
	 * @param {object} data object to write
	 */
	setData(data) {
		let db = this.db;

		return new Promise((resolve, reject)=>{
			db.assign({
				hashtag: data.hashtag,
				api_key: data.api_key,
				api_secret: data.api_secret,
				access_key: data.access_key,
				access_secret: data.access_secret,
				bearer: data.bearer,
				enabled: data.enabled,
				template: data.template,
				css: data.css
			}).write();

			resolve("");
		});		
	}

	/**
	 * Write settings
	 * @param {object} data object to write
	 */
	setRuleID(ruleid) {
		let db = this.db;

		return new Promise((resolve, reject)=>{
			db.assign({
				ruleid: ruleid
			}).write();

			resolve("");
		});		
	}

	/**
	 * Get setting
	 * @param	{string}	setting		setting to get
	 */
	getSetting(setting) {
		return new Promise((resolve, reject)=>{
			resolve(db.get(setting).value());
		});	
	}
}

exports.OverlayTwitterQueries = OverlayTwitterQueries;