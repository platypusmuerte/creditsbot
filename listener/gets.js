const { constants } = require('../constants');
let { GetProcessor } = require("./getprocessor");

/**
 * Handle the gets only and pass off to the processor
 * 		NOTE addToUser is technically a post, I know, but since its coming from web requests of stream bots..... its a get
 */
class GetHandler {
	/**
	 *
	 * @param {string}	dataDir				path to user data dir
	 * @param {object} 	utils 				Utils class
	 * @param {object} 	path 			
	 * @param {objecet} db 					db adapter
	 * @param {object} 	userArgs 			merged user settings
	 * @param {object} 	exp 				express
	 * @param {objecet} builder 			credits builder class
	 * @param {object} 	blacklist 			the blacklist database 
	 * @param {object} 	testData 			TestData class
	 * @param {object} 	versioncheck 		VersionChecker class
	 * @param {object}	overlayPage			the overlay page class
	 * @param {object}	transitionsPage		transitionsPage
	 * @param {object}	transitionManager	transitionManager
	 * @param {object}	timerbarManager		timerbarManager
	 * @param {object}	customOverlayManager	customOverlayManager
	 * 
	 * @property {object}	processor		GetProcessor class
	 */
	constructor(params) {
		this.dataDir = params.dataDir;
		this.utils = params.utils;
		this.path = params.path;
		this.db = params.db;
		this.userArgs = params.userArgs;
		this.exp = params.exp;
		this.builder = params.builder;
		this.blackList = this.db.databases.blacklist;
		this.testData = params.testData;
		this.gui = params.gui;
		this.versioncheck = params.versioncheck;
		this.overlayPage = params.overlayPage;
		this.transitionsPage = params.transitionsPage;
		this.transitionManager = params.transitionManager;
		this.timerbarManager = params.timerbarManager;
		this.customOverlayManager = params.customOverlayManager;

		this.processor = new GetProcessor({ utils: this.utils, db: this.db, dataDir: this.dataDir, userArgs: this.userArgs, testData: this.testData, gui: this.gui, versioncheck: this.versioncheck, overlayPage: this.overlayPage, transitionsPage: this.transitionsPage, transitionManager: this.transitionManager, timerbarManager: this.timerbarManager, customOverlayManager: this.customOverlayManager });
	}

	/**
	 * Tell CLI that we didnt do anything, because blacklist
	 */
	blacklisted() {
		this.userArgs.DEBUG && this.utils.console(constants.MESSAGES.BLACKLISTED);
	}

	/**
	 * Handle the request, and if not a blacklisted name, call proper database add event
	 */
	addToUser() {
		let path = constants.PATHS.ADD_USER;
		let blackList = this.blackList;
		let processor = this.processor;
		let blacklisted = this.blacklisted.bind(this);

		this.exp.get(path, (req, res) => {
			let key = req.params.key || false;
			let user = req.params.user || false;
			let amount = req.params.amount * 1 || 0;

			blackList.getAll().then((bl) => {
				if (bl.includes(user)) {
					blacklisted();
					res.send("");
				} else if (key && user && amount) {
					processor.addToUser(req, res, key, user, amount);
				} else {
					res.send("");
				}
			});
		});

		this.userArgs.DEBUG && this.utils.console("Added GET " + path);
	}

	getAllOf() {
		let path = constants.PATHS.GET_ALL;
		let processor = this.processor;

		this.exp.get(path, (req, res) => {
			let key = req.params.key || false;

			if (key) {
				processor.getAllOf(req, res, key);
			} else {
				res.send("");
			}
		});

		this.userArgs.DEBUG && this.utils.console("Added GET " + path);
	}

	getTop5() {
		let path = constants.PATHS.GET_5;
		let processor = this.processor;

		this.exp.get(path, (req, res) => {
			let key = req.params.key || false;

			if (key) {
				processor.getTop5(req, res, key);
			} else {
				res.send("");
			}
		});

		this.userArgs.DEBUG && this.utils.console("Added GET " + path);
	}

	getTop10() {
		let path = constants.PATHS.GET_10;
		let processor = this.processor;

		this.exp.get(path, (req, res) => {
			let key = req.params.key || false;

			if (key) {
				processor.getTop10(req, res, key);
			} else {
				res.send("");
			}
		});

		this.userArgs.DEBUG && this.utils.console("Added GET " + path);
	}

	/**
	 * If not blacklisted, get a user
	 */
	getUser() {
		let path = constants.PATHS.GET_USER;
		let blackList = this.blackList;
		let processor = this.processor;
		let blacklisted = this.blacklisted.bind(this);

		this.exp.get(path, (req, res) => {
			let key = req.params.key || false;
			let user = req.params.user || false;

			blackList.getAll().then((bl) => {
				if (bl.includes(user)) {
					blacklisted();
					res.send("");
				} else if (key && user) {
					processor.getUser(req, res, key, user);
				} else {
					res.send("");
				}
			});
		});

		this.userArgs.DEBUG && this.utils.console("Added GET " + path);
	}

	/**
	 * This results in user being removed from all databases
	 */
	removeUser() {
		let path = constants.PATHS.REMOVE_USER;
		let processor = this.processor;

		this.exp.get(path, (req, res) => {
			let user = req.params.user || false;

			if (user) {
				processor.removeUser(req, res, user);
			} else {
				res.send("");
			}
		});

		this.userArgs.DEBUG && this.utils.console("Added GET " + path);
	}

	/**
	 * Call the builder, and return full html page for browser
	 */
	getCredits() {
		let db = this.db;
		let path = constants.PATHS.CREDITS;
		let builder = this.builder;

		this.exp.get(path, (req, res) => {
			res.set('Content-Type', 'text/html')
			builder.getCreditsOutput(db).then((htmlpage)=>{
				res.send(htmlpage);
			});
		});

		this.userArgs.DEBUG && this.utils.console("Added GET " + path);
	}

	addTestData() {
		let path = constants.PATHS.TESTDATA_ADD;
		let processor = this.processor;

		this.exp.get(path, (req, res) => {
			processor.addTestData(req, res);
		});

		this.userArgs.DEBUG && this.utils.console("Added GET " + path);
	}

	removeTestData() {
		let path = constants.PATHS.TESTDATA_REMOVE;
		let processor = this.processor;

		this.exp.get(path, (req, res) => {
			processor.removeTestData(req, res);
		});

		this.userArgs.DEBUG && this.utils.console("Added GET " + path);
	}

	/**
	 * Get the UI, and return to browser
	 */
	getUI() {		
		let path = constants.PATHS.UI_PAGE_HOME;
		let processor = this.processor;

		this.exp.get(path, (req, res) => {
			processor.getUI(req, res);
		});

		this.userArgs.DEBUG && this.utils.console("Added GET " + path);
	}

	/**
	 * Handle gets for UI
	 */
	uiGetData() {
		let path = constants.PATHS.UI_GET_DATA;
		let processor = this.processor;

		this.exp.get(path, (req, res) => {
			processor.uiGetData(req, res);
		});

		this.userArgs.DEBUG && this.utils.console("Added GET " + path);
	}

	/**
	 * Get the overlay, and return to browser
	 */
	getOverlay() {		
		let path = constants.PATHS.OVERLAY;
		let processor = this.processor;

		this.exp.get(path, (req, res) => {
			processor.getOverlay(req, res);
		});

		this.userArgs.DEBUG && this.utils.console("Added GET " + path);
	}

	/**
	 * Get the overlay, and return to browser
	 */
	getTransitions() {		
		let path = constants.PATHS.TRANSITIONS;
		let processor = this.processor;

		this.exp.get(path, (req, res) => {
			processor.getTransitions(req, res);
		});

		this.userArgs.DEBUG && this.utils.console("Added GET " + path);
	}

	/**
	 * Fire transition
	 */
	fireTransitions() {
		let path = constants.PATHS.TRANSITION_TRIGGER;
		let processor = this.processor;

		this.exp.get(path, (req, res) => {
			let key = req.params.key || false;

			processor.fireTransitions(req, res, key);
		});

		this.userArgs.DEBUG && this.utils.console("Added GET " + path);
	}

	/**
	 * Fire Timerbar
	 */
	fireTimerBarEvent() {
		let path = constants.PATHS.TIMERBAR_TRIGGER;
		let processor = this.processor;

		this.exp.get(path, (req, res) => {
			let key = req.params.key || false;

			processor.fireTimerBarEvent(req, res, key);
		});

		this.userArgs.DEBUG && this.utils.console("Added GET " + path);
	}

	/**
	 * Remove Timerbar
	 */
	removeTimerBarByKey() {
		let path = constants.PATHS.TIMERBAR_TRIGGER_REMOVE;
		let processor = this.processor;

		this.exp.get(path, (req, res) => {
			let key = req.params.key || false;

			processor.removeTimerBarByKey(req, res, key);
		});

		this.userArgs.DEBUG && this.utils.console("Added GET " + path);
	}

	/**
	 * Process custom overlay calls
	 */
	processCustomOverlayCalls() {
		let path = constants.PATHS.CUSTOM_OVERLAY_TRIGGER;
		let processor = this.processor;

		this.exp.get(path, (req, res) => {
			let key = req.params.key || false;

			processor.processCustomOverlayCalls(req, res, key);
		});

		this.userArgs.DEBUG && this.utils.console("Added GET " + path);
	}
}

exports.GetHandler = GetHandler;