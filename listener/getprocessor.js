const { constants } = require('../constants');

/**
 * Process get requests
 */
class GetProcessor {
	/**
	 * 
	 * @param {string} dataDir				path to user data dir 
	 * @param {object} utils				Utils class
	 * @param {object} path				
	 * @param {object} db					db adapter
	 * @param {object} userArgs				merged user settings
	 * @param {object} testData				TestData class
	 * @param {object} gui					GUI class
	 * @param {object} versioncheck			VersionChecker class
	 * @param {object} overlayPage			overlay web page
	 * @param {object} transitionsPage		transitionsPage
	 * @param {object} transitionManager	transitionManager
	 * @param {object} timerbarManager		timerbarManager
	 */
	constructor(params) {
		this.dataDir = params.dataDir;
		this.utils = params.utils;
		this.path = params.path;
		this.db = params.db;
		this.userArgs = params.userArgs;
		this.testData = params.testData;
		this.gui = params.gui;
		this.versioncheck = params.versioncheck;
		this.overlayPage = params.overlayPage;
		this.transitionsPage = params.transitionsPage;
		this.transitionManager = params.transitionManager;
		this.timerbarManager = params.timerbarManager;
	}

	/**
	 * Call a databases addto method
	 * 
	 * @param {object} req express request object
	 * @param {object} res express response object
	 * @param {string} key which database
	 * @param {string} user the username
	 * @param {number} amount the number for this event
	 */
	addToUser(req, res, key, user, amount) {
		let expectedQueryParams = this.utils.getExpectedQueryParams(req.query);

		this.db.databases[key].addUser(user, amount, expectedQueryParams).then((r) => {
			this.userArgs.DEBUG && this.utils.console("Add to user: " + key + " " + user + " " + amount);
			res.send(r.toString());
		}).then(() => {
			this.historyManager(key, user, amount, expectedQueryParams);
		});
	}

	/**
	 * Call the appropriate history add for this event
	 * 
	 * @param {string} key which database
	 * @param {string} user which user
	 * @param {number} amount value to add to history
	 * @param {object} expectedQueryParams slightly paranoid expected query params object
	 */
	historyManager(key, user, amount, expectedQueryParams) {
		switch (key) {
			case constants.DATABASE_NAMES.BITS:
				this.addToUserHistory(key, user, amount, expectedQueryParams);
				break;
			case constants.DATABASE_NAMES.CHANNELPOINTS:
				this.addToUserHistory(key, user, amount, expectedQueryParams);
				break;
			case constants.DATABASE_NAMES.GIFTSUBS:
				this.addToUserHistory(key, user, amount, expectedQueryParams);
				break;
			case constants.DATABASE_NAMES.HOSTS:
				this.addToUserHistory(key, user, amount, expectedQueryParams);
				break;
			case constants.DATABASE_NAMES.RAIDS:
				this.addToUserHistory(key, user, amount, expectedQueryParams);
				break;
			case constants.DATABASE_NAMES.SUBS:
				this.addToUserHistory(key, user, amount, expectedQueryParams);
				break;
			case constants.DATABASE_NAMES.DONOS:
				this.addToUserHistory(key, user, amount, expectedQueryParams);
				break;
			case constants.DATABASE_NAMES.STREAMLOOTS:
				this.addToUserHistory(key, user, amount, expectedQueryParams);
				break;
			case constants.DATABASE_NAMES.STREAMLOOTSPURCHASE:
				this.addToUserHistory(key, user, amount, expectedQueryParams);
				break;
			case constants.DATABASE_NAMES.STREAMTWEETS:
				this.addToUserHistory(key, user, amount, expectedQueryParams);
				break;
		}
	}

	/**
	 * Add to the h database for this event
	 * @param {string} key the database key
	 * @param {string} user the user
	 * @param {number} amount the amount
	 * @param {object} expectedQueryParams object of expected query params
	 */
	addToUserHistory(key, user, amount, expectedQueryParams) {
		this.db.databases["h" + key].addUser(user, amount, expectedQueryParams).then((r) => {
			this.userArgs.DEBUG && this.utils.console("Add to user history: " + key + " " + user + " " + amount);
		});
	}

	/**
	 * Get all for a databse
	 * @param {objecet} req express request object
	 * @param {object} res express response object
	 * @param {string} key which database key
	 */
	getAllOf(req, res, key) {
		this.db.databases[key].getAll().then((r) => {
			this.userArgs.DEBUG && this.utils.console("Get all users: " + key + " " + JSON.stringify(r));
			res.send(JSON.stringify(r));
		});
	}

	/**
	 * Get top 5 for current database call
	 * @param {objecet} req express request object
	 * @param {object} res express response object
	 * @param {string} key which database key
	 */
	getTop5(req, res, key) {
		this.db.databases[key].getTop5(false, this.utils.getExpectedQueryParams(req.query)).then((r) => {
			this.userArgs.DEBUG && this.utils.console("Get top 5: " + key + " " + JSON.stringify(r));
			res.send(r);
		});
	}

	/**
	 * Get top 10 for current databse call
	 * @param {objecet} req express request object
	 * @param {object} res express response object
	 * @param {string} key which database key
	 */
	getTop10(req, res, key) {
		this.db.databases[key].getTop10(false, this.utils.getExpectedQueryParams(req.query)).then((r) => {
			this.userArgs.DEBUG && this.utils.console("Get top 10: " + key + " " + JSON.stringify(r));
			res.send(r);
		});
	}

	/**
	 * Get individual record
	 * @param {objecet} req express request object
	 * @param {object} res express response object
	 * @param {string} key which database key
	 * @param {string} user user
	 */
	getUser(req, res, key, user) {
		this.db.databases[key].getUser(user).then((r) => {
			this.userArgs.DEBUG && this.utils.console("Get user: " + key + " " + user);
			res.send(r.toString());
		});
	}

	/**
	 * Remove from all current session and history databses
	 * @param {objecet} req express request object
	 * @param {object} res express response object
	 * @param {string} key which database key
	 */
	removeUser(req, res, user) {
		let db = this.db;
		let utils = this.utils;
		let dbs = constants.DATABASE_NAMES;

		Object.entries(dbs).forEach(([k, v]) => {
			db.databases[v].removeUser(user).then((r) => {
				this.userArgs.DEBUG && utils.console("Remove user from : " + v + " " + user);
			});
		});

		res.send("");
	}

	/**
	 * Call the TestData
	 * @param {objecet} req express request object
	 * @param {object} res express response object
	 */
	addTestData(req, res) {
		this.testData.add().then(() => {
			res.send("test data is being added, should only take a few seconds");
		});	
	}

	/**
	 * Call the TestData
	 * @param {objecet} req express request object
	 * @param {object} res express response object
	 */
	removeTestData(req, res) {
		this.testData.remove().then(() => {
			res.send("test data is being removed, should only take a few seconds");
		});	
	}

	/**
	 * Pass off request to the GUI handler
	 * @param {objecet} req express request object
	 * @param {object} res express response object
	 */
	getUI(req, res) {
		this.gui.loadPage(req).then((page) => {
			res.send(page);
		});
	}

	/**
	 * Pass off request to the overlay handler
	 * @param {objecet} req express request object
	 * @param {object} res express response object
	 */
	getOverlay(req, res) {
		this.overlayPage.loadPage(req).then((page) => {
			res.send(page);
		});
	}

	/**
	 * Pass off request to the overlay handler
	 * @param {objecet} req express request object
	 * @param {object} res express response object
	 */
	getTransitions(req, res) {
		this.transitionsPage.loadPage(req).then((page) => {
			res.send(page);
		});
	}

	/**
	 * Pass off request to the overlay handler
	 * @param {objecet} req express request object
	 * @param {object} res express response object
	 */
	fireTransitions(req, res, key) {
		this.transitionManager.sendTransition(key).then(() => {
			res.send("");
		});
	}

	/**
	 * Pass off request to the overlay handler
	 * @param {objecet} req express request object
	 * @param {object} res express response object
	 */
	fireTimerBarEvent(req, res, key) {
		this.db.theme().timerbars.getByKey(key).then((timerbar)=>{
			if(timerbar) {
				this.timerbarManager.processData(timerbar);
			} else {
				this.userArgs.DEBUG && this.utils.console("Timer bar task not found. Bad key?: " + key);
			}
			res.send("");
		});
	}

	/**
	 * Handle all get tasks from UI
	 * @param {objecet} req express request object
	 * @param {object} res express response object
	 */
	uiGetData(req, res) {
		let task = req.params.task;

		this.userArgs.DEBUG && this.utils.console("Handling task " + task);

		switch (task) {
			case "gettemplatebyid":
				this.uiGetTemplateByID(req, res);
				break;
			case "gettemplatesort":
				this.uiGetTemplateSort(req, res);
				break;
			case "getversioncheck":
				this.uiGetVersionCheck(req, res);
				break;			
			case "gettransition":
				this.uiGetTransitionByID(req, res);
				break;			
			case "gettimerbars":
				this.uiGetTimerbarsByKey(req, res);
				break;
			default:
				res.json({ "success": false });
				break;
		}
	}

	/**
	 * Get a template by ID for the UI
	 * @param {objecet} req express request object
	 * @param {object} res express response object
	 */
	uiGetTemplateByID(req, res) {
		let expectedQueryParams = this.utils.getExpectedQueryParams(req.query);
		let templateid = expectedQueryParams.templateid||false;

		this.db.theme().credittemplates.getTemplateByID(templateid).then((data) => {
			res.json({ "success": true, "data": data });
		});
	}

	/**
	 * Get the data for the page that lets the user sort the sections
	 * @param {objecet} req express request object
	 * @param {object} res express response object
	 */
	uiGetTemplateSort(req, res) {
		this.db.theme().templatesort.getAll().then((data) => {
			res.json({ "success": true, "data": data });
		});
	}

	/**
	 * Call the version checker, and send results back to UI
	 * @param {objecet} req express request object
	 * @param {object} res express response object
	 */
	uiGetVersionCheck(req, res) {
		this.versioncheck.get().then((vc)=>{
			res.json(vc);
		});
	}

	/**
	 * Call the version checker, and send results back to UI
	 * @param {objecet} req express request object
	 * @param {object} res express response object
	 */
	uiGetTransitionByID(req, res) {
		let expectedQueryParams = this.utils.getExpectedQueryParams(req.query);
		let transitionid = expectedQueryParams.transitionid||false;

		this.db.databases.transitions.getByID(transitionid).then((transition)=>{
			res.json(transition);
		});
	}

	/**
	 * Get the list of timer bars
	 * @param {objecet} req express request object
	 * @param {object} res express response object
	 */
	uiGetTimerbarsByKey(req, res) {
		let expectedQueryParams = this.utils.getExpectedQueryParams(req.query);
		let timerbarkey = expectedQueryParams.timerbarkey||false;

		this.db.theme().timerbars.getByKey(timerbarkey).then((timerbar)=>{
			res.json(timerbar);
		});
	}
}

exports.GetProcessor = GetProcessor;