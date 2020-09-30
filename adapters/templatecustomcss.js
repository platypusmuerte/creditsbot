const { constants } = require('../constants');
const { templatecustomcss } = require("../defaults/templatecustomcss");

/**
 * DB Adapter
 */
class TemplateCustomCSSDBAdapter {
	/**
	 *
	 * @param {package}	path		path
	 * @param {package}	cryptr		cryptr
	 * @param {string}	dataDir		User data directory
	 *
	 * @property {package}		low			lowdb
	 * @property {package}		FileSync	lowdb
	 * @property {database}		dataFile	the lowdb database
	 */
	constructor(params) {
		this.path = params.path;
		this.cryptr = params.cryptr;
		this.dataDir = params.dataDir;

		this.low = require('lowdb');
		this.FileSync = require('lowdb/adapters/FileSync');

		this.dataFile = this.path.join(this.dataDir, constants.SETTINGS_DATABASE_NAMES.TEMPLATE_CUSTOMCSS + constants.DATA_FILE_SETTINGS);
	}

	getDefaults() {
		return templatecustomcss;
	}

	deserialize(str) {
		let decrypted = this.cryptr.decrypt(str);
		let obj = JSON.parse(decrypted);
		return obj;
	}

	serialize(obj) {
		let str = JSON.stringify(obj);
		let encrypted = this.cryptr.encrypt(str);
		return encrypted;
	}

	get() {
		const adapter = new this.FileSync(this.dataFile, {
			defaultValue: this.getDefaults(),
			deserialize: this.deserialize.bind(this),
			serialize: this.serialize.bind(this)
		});

		return this.low(adapter);
	}
}

exports.TemplateCustomCSSDBAdapter = TemplateCustomCSSDBAdapter;