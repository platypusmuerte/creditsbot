const { constants } = require('../constants');
let { RouteHandler } = require("./routehandler");

class Listener {
	constructor(params) {
		this.utils = params.utils;
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

		this.routeHandler = new RouteHandler({ utils: this.utils, db: this.db, dataDir: this.dataDir, userArgs: this.userArgs, exp: this.exp, builder: this.builder, testData: this.testData, gui: this.gui, backup: this.backup, exportdata: this.exportdata });
	}

	start() {
		this.exp.listen(this.userArgs.PORT, () => {
			this.utils.console("Started listening at http://localhost:" + this.userArgs.PORT);
			this.utils.console(" ");
			this.setDefaultListeners();
		});
	}

	setDefaultListeners() {
		this.routeHandler.routes.gets.addToUser();
		this.routeHandler.routes.gets.getAllOf();
		this.routeHandler.routes.gets.getTop5();
		this.routeHandler.routes.gets.getTop10();
		this.routeHandler.routes.gets.getUser();
		this.routeHandler.routes.gets.removeUser();
		this.routeHandler.routes.gets.addTestData();
		this.routeHandler.routes.gets.removeTestData();
		this.routeHandler.routes.gets.getUI();

		this.routeHandler.routes.posts.uiSetData();

		this.exp.get(constants.PATHS.PING, (req, res) => { res.send("pong"); });
		this.exp.use('/usercontent', this.express.static(constants.TEMPLATE_DIRS.STATIC));

		this.utils.console(" ");
	}
}

exports.Listener = Listener;