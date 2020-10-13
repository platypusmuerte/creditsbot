const { constants } = require('../constants');
let { RouteHandler } = require("./routehandler");

/**
 * The expressjs listener. Sets what paths are listened to/for
 * The router handler then calls the proper get/set which calls its processor
 */
class Listener {
	/**
	 * 
	 * @param {object} utils				Utils class
	 * @param {object} path			
	 * @param {object} fs
	 * @param {object} exp					express class
	 * @param {object} db					db adapter
	 * @param {string} dataDir				path to users data dir
	 * @param {object} userArgs				merged user settings
	 * @param {object} builder				credits builder class
	 * @param {object} testData				TestData class
	 * @param {object} express				express method reference (not same as exp)
	 * @param {object} gui					GUI class
	 * @param {object} backup				Backup class
	 * @param {object} exportdata			Export class
	 * @param {object} versioncheck			Version checker class
	 * @param {object} overlayPage			overlayPage class
	 * @param {object} twitterManager		twitterManager
	 * @param {object} transitionManager	transitionManager
	 * 
	 * @property {object} routeHandler 		RouteHandler class
	 */
	constructor(params) {
		this.utils = params.utils;
		this.path = params.path;
		this.exp = params.exp;
		this.db = params.db;
		this.dataDir = params.dataDir;
		this.userArgs = params.userArgs;
		this.builder = params.builder;
		this.testData = params.testData;
		this.express = params.express;
		this.gui = params.gui;
		this.backup = params.backup;
		this.exportdata = params.exportdata;
		this.versioncheck = params.versioncheck;
		this.fs = params.fs;
		this.overlayPage = params.overlayPage;
		this.twitterManager = params.twitterManager;
		this.transitionsPage = params.transitionsPage;
		this.transitionManager = params.transitionManager;

		this.routeHandler = new RouteHandler({ 
			utils: this.utils, 
			db: this.db, 
			dataDir: this.dataDir, 
			userArgs: this.userArgs, 
			exp: this.exp, 
			builder: this.builder, 
			testData: this.testData, 
			gui: this.gui, 
			backup: this.backup, 
			exportdata: this.exportdata,
			versioncheck: this.versioncheck,
			overlayPage: this.overlayPage,
			twitterManager: this.twitterManager,
			transitionsPage: this.transitionsPage,
			transitionManager: this.transitionManager
		});
	}

	/**
	 * Tell express to listen on localhost, set the listeners and hand them their processors
	 */
	start() {
		let exp = this.exp;
		let utils = this.utils;
		let userArgs = this.userArgs;
		let setDefaultListeners = this.setDefaultListeners.bind(this);

		return new Promise((resolve, reject)=>{
			exp.listen(userArgs.PORT, () => {
				utils.console("Started listening at http://localhost:" + userArgs.PORT);
				utils.console(" ");
				setDefaultListeners();
				resolve();
			});
		});		
	}

	setDefaultListeners() {
		this.ensureUserContentDirExists();

		this.routeHandler.routes.gets.addToUser();
		this.routeHandler.routes.gets.getAllOf();
		this.routeHandler.routes.gets.getTop5();
		this.routeHandler.routes.gets.getTop10();
		this.routeHandler.routes.gets.getUser();
		this.routeHandler.routes.gets.removeUser();
		this.routeHandler.routes.gets.addTestData();
		this.routeHandler.routes.gets.removeTestData();
		this.routeHandler.routes.gets.getUI();
		this.routeHandler.routes.gets.getCredits();
		this.routeHandler.routes.gets.uiGetData();
		this.routeHandler.routes.gets.getOverlay();
		this.routeHandler.routes.gets.getTransitions();
		this.routeHandler.routes.gets.fireTransitions();

		this.routeHandler.routes.posts.uiSetData();

		this.exp.get(constants.PATHS.PING, (req, res) => { res.send("pong"); });
		// Files in here can be referenced in users templates
		this.exp.use('/usercontent', this.express.static(constants.TEMPLATE_DIRS.STATIC));

		this.utils.console(" ");
	}

	ensureUserContentDirExists() {
		// make sure the data dir always exists
		if (!this.fs.existsSync(constants.TEMPLATE_DIRS.STATIC)) {
			this.fs.mkdirSync(constants.TEMPLATE_DIRS.STATIC);
			this.userArgs.DEBUG && this.utils.console("Created " + constants.TEMPLATE_DIRS.STATIC);
		}
	}
}

exports.Listener = Listener;