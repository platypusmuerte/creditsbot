const { constants } = require('../constants');

class BlacklistDBAdapter {
	constructor(params) {
		const path = require('path');
		this.cryptr = params.cryptr;
		this.dataDir = params.dataDir;

		this.low = require('lowdb');
		this.FileSync = require('lowdb/adapters/FileSync');

		this.dataFile = path.join(this.dataDir, constants.SETTINGS_DATABASE_NAMES.TEMPLATE_BLACKLIST + constants.DATA_FILE_SETTINGS);
	}

	getDefaults() {
		let obj = {};
		obj[constants.SETTINGS_DATABASE_NAMES.TEMPLATE_BLACKLIST] = ["your_stream_bot_name_here"];

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

exports.BlacklistDBAdapter = BlacklistDBAdapter;