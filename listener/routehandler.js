const { constants } = require('../constants');

class RouteHandler {
	constructor(params) {
		this.utils = params.utils;
		this.db = params.db;
		this.dataDir = params.dataDir;
		this.userArgs = params.userArgs;

		const { GetHandler } = require("./gets");
		const { PostHandler } = require("./posts");

		this.routes = {
			gets: new GetHandler({ dataDir: this.dataDir, utils: this.utils, db: this.db, userArgs: this.userArgs }),
			posts: new PostHandler({ dataDir: this.dataDir, utils: this.utils, db: this.db, userArgs: this.userArgs })
		};
	}
}

exports.RouteHandler = RouteHandler;