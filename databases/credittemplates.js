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

	getTemplateByID(id) {
		let db = this.db;

		return new Promise(function (resolve, reject) {
			resolve(db.find({ id: id }).value());
		});
	}

	setTemplateByID(data) {
		let db = this.db;

		console.log(data);

		return new Promise(function (resolve, reject) {

			console.log(db.find({ id: data.id }).value());

			db.find({ id: data.id }).assign(data).write();
			resolve("");
		});
	}
}

exports.CreditTemplatesQueries = CreditTemplatesQueries;