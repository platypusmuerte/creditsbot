const { constants } = require('../constants');

class GetHandler {
	constructor(params) {
		this.dataDir = params.dataDir;
		this.utils = params.utils;
		this.db = params.db;
		this.userArgs = params.userArgs;
	}

	addToUser() {

	}
}

exports.GetHandler = GetHandler;