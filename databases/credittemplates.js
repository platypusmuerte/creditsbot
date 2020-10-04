const { template } = require('lodash');
const { constants } = require('../constants');
const { templatedata } = require("../defaults/templatedata");

/**
 * Template Queries
 *
 * Queries for credit templates
 *
 * Exports CreditTemplatesQueries{}
 */

/**
 * DB Queries
 */
class CreditTemplatesQueries {
	/**
	 *
	 * @param {package}	cryptr		cryptr
	 * @param {string}	dataDir		Data storage dir
	 * @param {class}	utils		Utils
	 *
	 * @property {class}		CreditTemplatesDBAdapter
	 * @property {object}		db			database adapter
	 */
	constructor(params) {
		this.cryptr = params.cryptr;
		this.dataDir = params.dataDir;
		this.utils = params.utils;
		this.path = params.path;

		const { CreditTemplatesDBAdapter } = require("../adapters/credittemplates");
		this.db = new CreditTemplatesDBAdapter({ cryptr: this.cryptr, dataDir: this.dataDir, path: this.path }).get();
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
	 * returns templates as {id, type, enabled} sorted by id
	 */
	getIDsByType() {
		let db = this.db;

		return new Promise((resolve, reject)=>{
			let data = db.sortBy("id").value();

			let filtered = data.map((ct)=>{
				return {id: ct.id, type: ct.type, enabled: ct.enabled};
			});

			resolve(filtered);
		});
	}

	/**
	 * Returns array of templates, matching order from templatesort database
	 * @param {Array} sortArr	Array of sorted ids from templatesort database
	 */
	getTemplateDataForSorting(sortArr) {
		let db = this.db;
		let sortedTemplateData = {};

		return new Promise((resolve, reject)=>{
			sortArr.forEach((sort)=>{
				let t = db.find({ id: sort }).value();
				if(t) {
					sortedTemplateData[sort] = t;
				}				
			});

			resolve(sortedTemplateData);
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
			let newObj = Object.assign({},resObj,{defaults: templatedata.filter(td => td.id === id)[0]});
			
			resolve(newObj);
		});
	}

	/**
	 * Update a template, add new (from patches), add custom template
	 * @param {object} data		template object 
	 * @param {boolean} isNew	optional - used during patching
	 */
	setTemplateByID(data, isNew) {
		let db = this.db;
		let dbID = false;

		if (data.id === "addnew") {
			let count = db.filter({ type: "custom" }).size().value();
			dbID = "custom_" + (count + 1);
		}

		return new Promise((resolve, reject)=>{
			if(isNew) {
				db.push(data).write();
			} else if (data.id !== "addnew") {
				db.find({ id: data.id }).assign(data).write();
			} else {
				db.push({
					enabled: data.enabled,
					id: dbID,
					type: "custom",
					key: false,
					title: data.title,
					template: data.template,
					wrapper: ``,
					inner: ``
				}).write();				
			}		
			
			resolve(dbID);
		});
	}

	/**
	 * Enable or disable a section
	 * @param {boolean} 	enabled is section enabled 
	 * @param {number} 		id 		template id
	 */
	toggleSectionByID(enabled, id) {
		let db = this.db;
		
		return new Promise((resolve, reject)=>{
			db.find({ id: id }).assign({enabled: enabled}).write();
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

			resolve("");
		});
	}
}

exports.CreditTemplatesQueries = CreditTemplatesQueries;


