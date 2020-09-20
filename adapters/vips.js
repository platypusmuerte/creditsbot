const { constants } = require('../constants');

class VipsDBAdapter {
	constructor(params) {
		const path = require('path');
		this.cryptr = params.cryptr;
		this.dataDir = params.dataDir;

		this.low = require('lowdb');
		this.FileSync = require('lowdb/adapters/FileSync');

		this.dataFile = path.join(this.dataDir, constants.DATABASE_NAMES.VIPS + constants.DATA_FILE_EXT);
	}

	getDefaults() {
		let obj = {};
		obj[constants.DATABASE_NAMES.VIPS] = [];

		return obj;
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

exports.VipsDBAdapter = VipsDBAdapter;