const { constants } = require('../constants');

class RouteHandler {
	constructor(params) {
		this.utils = params.utils;
		this.path = params.path;
		this.db = params.db;
		this.dataDir = params.dataDir;
		this.userArgs = params.userArgs;
		this.exp = params.exp;
		this.builder = params.builder;
		this.testData = params.testData;
		this.gui = params.gui;
		this.backup = params.backup;
		this.exportdata = params.exportdata;
		this.versioncheck = params.versioncheck;

		const { GetHandler } = require("./gets");
		const { PostHandler } = require("./posts");

		this.routes = {
			gets: new GetHandler({ 
				dataDir: this.dataDir, 
				utils: this.utils, 
				db: this.db, 
				userArgs: this.userArgs, 
				exp: this.exp, 
				builder: this.builder, 
				testData: this.testData, 
				gui: this.gui,
				versioncheck: this.versioncheck
			}),
			posts: new PostHandler({ 
				dataDir: this.dataDir, 
				utils: this.utils, 
				db: this.db, 
				userArgs: this.userArgs, 
				exp: this.exp, 
				backup: this.backup, 
				exportdata: this.exportdata, 
				gui: this.gui 
			})
		};
	}
}

exports.RouteHandler = RouteHandler;