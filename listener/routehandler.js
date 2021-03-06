const { constants } = require('../constants');

/**
 * Pass handling the route off to a get or set processor
 */
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
		this.overlayPage = params.overlayPage;
		this.twitterManager = params.twitterManager;
		this.transitionsPage = params.transitionsPage;
		this.transitionManager = params.transitionManager;
		this.timerbarManager = params.timerbarManager;
		this.customOverlayManager = params.customOverlayManager;

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
				versioncheck: this.versioncheck,
				overlayPage: this.overlayPage,
				transitionsPage: this.transitionsPage,
				transitionManager: this.transitionManager,
				timerbarManager: this.timerbarManager,
				customOverlayManager: this.customOverlayManager
			}),
			posts: new PostHandler({ 
				dataDir: this.dataDir, 
				utils: this.utils, 
				db: this.db, 
				userArgs: this.userArgs, 
				exp: this.exp, 
				backup: this.backup, 
				exportdata: this.exportdata, 
				gui: this.gui,
				twitterManager: this.twitterManager,
				transitionManager: this.transitionManager,
				timerbarManager: this.timerbarManager
			})
		};
	}
}

exports.RouteHandler = RouteHandler;