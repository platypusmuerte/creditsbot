const { constants } = require('../constants');

class PostHandler {
	constructor(params) {
		this.dataDir = params.dataDir;
		this.utils = params.utils;
		this.db = params.db;
		this.userArgs = params.userArgs;
	}
}

exports.PostHandler = PostHandler;