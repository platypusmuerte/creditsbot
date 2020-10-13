const { template } = require('lodash');
const { constants } = require('../constants');
const { transitions } = require("../defaults/transitions");

/**
 * DB Queries
 */
class TransitionsQueries {
	/**
	 *
	 * @param {package}	cryptr		cryptr
	 * @param {string}	dataDir		Data storage dir
	 * @param {class}	utils		Utils
	 *
	 * @property {class}		TransitionsDBAdapter
	 * @property {object}		db			database adapter
	 */
	constructor(params) {
		this.cryptr = params.cryptr;
		this.dataDir = params.dataDir;
		this.utils = params.utils;
		this.path = params.path;

		const { TransitionsDBAdapter } = require("../adapters/transitions");
		this.db = new TransitionsDBAdapter({ cryptr: this.cryptr, dataDir: this.dataDir, path: this.path }).get();
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
			let all = db.value();
			let resp = [];

			all.forEach((t)=>{
				resp.push({value: t.id, label: t.name});
			});

			resolve(db.value());
		});		
	}

	/**
	 * Add new template (usually via patching)
	 */
	addNew(template) {
		let db = this.db;

		return new Promise((resolve, reject)=>{
			if (db.find({ id: template.id }).has("id").value()) {
				resolve(false);
			} else {
				db.push(template).write();
				resolve(true);
			}
		});
	}

	/**
	 * Get a template by its ID
	 * @param {string} id template id
	 */
	getTemplateByID(id) {
		let db = this.db;

		return new Promise((resolve, reject)=>{
			let resObj = db.find({ id: id }).value();
			let newObj = Object.assign({},resObj,{defaults: transitions.filter(td => td.id === id)[0]});
			
			resolve(newObj);
		});
	}

	/**
	 * Update a template, add new (from patches), add custom template
	 * @param {object} data		template object 
	 */
	setTemplateByID(data) {
		let db = this.db;

		return new Promise((resolve, reject)=>{
			db.find({ id: data.id }).assign(data).write();		
			
			resolve(true);
		});
	}
	
	/**
	 * Remove a template from database
	 * @param {object} data contains template id to remove
	 */
	removeTemplateByID(data) {
		let db = this.db;

		return new Promise((resolve, reject)=>{
			db.remove({ id: data.id }).write();

			resolve(true);
		});
	}
}

exports.TransitionsQueries = TransitionsQueries;


