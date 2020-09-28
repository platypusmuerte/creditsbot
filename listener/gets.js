const { constants } = require('../constants');
let { GetProcessor } = require("./getprocessor");

class GetHandler {
	constructor(params) {
		this.dataDir = params.dataDir;
		this.utils = params.utils;
		this.db = params.db;
		this.userArgs = params.userArgs;
		this.exp = params.exp;
		this.builder = params.builder;
		this.blackList = this.db.databases.blacklist;
		this.testData = params.testData;
		this.gui = params.gui;

		this.processor = new GetProcessor({ utils: this.utils, db: this.db, dataDir: this.dataDir, userArgs: this.userArgs, testData: this.testData, gui: this.gui });
	}

	blacklisted() {
		this.userArgs.DEBUG && this.utils.console(constants.MESSAGES.BLACKLISTED);
	}

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

	getCredits() {
		let db = this.db;
		let path = constants.PATHS.CREDITS;
		let builder = this.builder;

		this.exp.get(path, (req, res) => {
			//builder.assembleTemplates(db).then(() => {
				res.set('Content-Type', 'text/html')
				//res.send(builder.getCreditsHTML());
				builder.getCreditsOutput(db).then((htmlpage)=>{
					res.send(htmlpage);
				});
			//});
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

	getUI() {		
		let path = constants.PATHS.UI_PAGE_HOME;
		let processor = this.processor;

		this.exp.get(path, (req, res) => {
			processor.getUI(req, res);
		});

		this.userArgs.DEBUG && this.utils.console("Added GET " + path);
	}

	uiGetData() {
		let path = constants.PATHS.UI_GET_DATA;
		let processor = this.processor;

		this.exp.get(path, (req, res) => {
			processor.uiGetData(req, res);
		});

		this.userArgs.DEBUG && this.utils.console("Added GET " + path);
	}
}

exports.GetHandler = GetHandler;