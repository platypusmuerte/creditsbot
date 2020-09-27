const { constants } = require('../constants');

class CreditTemplatesQueries {
	constructor(params) {
		this.cryptr = params.cryptr;
		this.dataDir = params.dataDir;
		this.utils = params.utils;
		this.DBNAME = constants.SETTINGS_DATABASE_NAMES.TEMPLATE_CREDITS;
		this.DBKEY = "credittemplates";

		const { CreditTemplatesDBAdapter } = require("../adapters/credittemplates");
		this.db = new CreditTemplatesDBAdapter({ cryptr: this.cryptr, dataDir: this.dataDir }).get();
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
	 * returns array of json
	 */
	getAll() {
		let db = this.db;

		return new Promise(function (resolve, reject) {
			resolve(db.value());
		});		
	}

	getIDsByType() {
		let db = this.db;

		return new Promise(function (resolve, reject) {
			let data = db.sortBy("id").value();

			let filtered = data.map((ct)=>{
				return {id: ct.id, type: ct.type, enabled: ct.enabled};
			});

			resolve(filtered);
		});
	}

	getTemplateDataForSorting(sortArr) {
		let db = this.db;
		let sortedTemplateData = {};

		return new Promise(function (resolve, reject) {
			sortArr.forEach((sort)=>{
				let t = db.find({ id: sort }).value();
				if(t) {
					sortedTemplateData[sort] = t;
				}				
			});

			resolve(sortedTemplateData);
		});
	}

	getTemplateByID(id) {
		let db = this.db;

		return new Promise(function (resolve, reject) {
			resolve(db.find({ id: id }).value());
		});
	}

	setTemplateByID(data) {
		let db = this.db;
		let dbID = false;

		if (data.id === "addnew") {
			let count = db.filter({ type: "custom" }).size().value();
			dbID = "custom_" + (count + 1);
		}

		return new Promise(function (resolve, reject) {
			if (data.id !== "addnew") {
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
	
	removeTemplateByID(data) {
		let db = this.db;

		return new Promise(function (resolve, reject) {
			db.remove({ id: data.id }).write();

			resolve("");
		});
	}
}

exports.CreditTemplatesQueries = CreditTemplatesQueries;


