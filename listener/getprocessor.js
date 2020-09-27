const { constants } = require('../constants');

class GetProcessor {
	constructor(params) {
		this.dataDir = params.dataDir;
		this.utils = params.utils;
		this.db = params.db;
		this.userArgs = params.userArgs;
		this.testData = params.testData;
		this.gui = params.gui;
	}

	addToUser(req, res, key, user, amount) {
		let expectedQueryParams = this.utils.getExpectedQueryParams(req.query);

		this.db.databases[key].addUser(user, amount, expectedQueryParams).then((r) => {
			this.userArgs.DEBUG && this.utils.console("Add to user: " + key + " " + user + " " + amount);
			res.send(r.toString());
		}).then(() => {
			this.historyManager(key, user, amount, expectedQueryParams);
		});
	}

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
		}
	}

	addToUserHistory(key, user, amount, expectedQueryParams) {
		this.db.databases["h" + key].addUser(user, amount, expectedQueryParams).then((r) => {
			this.userArgs.DEBUG && this.utils.console("Add to user history: " + key + " " + user + " " + amount);
		});
	}

	getAllOf(req, res, key) {
		this.db.databases[key].getAll().then((r) => {
			this.userArgs.DEBUG && this.utils.console("Get all users: " + key + " " + JSON.stringify(r));
			res.send(JSON.stringify(r));
		});
	}

	getTop5(req, res, key) {
		this.db.databases[key].getTop5(false, this.utils.getExpectedQueryParams(req.query)).then((r) => {
			this.userArgs.DEBUG && this.utils.console("Get top 5: " + key + " " + JSON.stringify(r));
			res.send(r);
		});
	}

	getTop10(req, res, key) {
		this.db.databases[key].getTop10(false, this.utils.getExpectedQueryParams(req.query)).then((r) => {
			this.userArgs.DEBUG && this.utils.console("Get top 10: " + key + " " + JSON.stringify(r));
			res.send(r);
		});
	}

	getUser(req, res, key, user) {
		this.db.databases[key].getUser(user).then((r) => {
			this.userArgs.DEBUG && this.utils.console("Get user: " + key + " " + user);
			res.send(r.toString());
		});
	}

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

	addTestData(req, res) {
		this.testData.add().then(() => {
			res.send("test data is being added, should only take a few seconds");
		});	
	}

	removeTestData(req, res) {
		this.testData.remove().then(() => {
			res.send("test data is being removed, should only take a few seconds");
		});	
	}

	getUI(req, res) {
		this.gui.loadPage(req).then((page) => {
			res.send(page);
		});
	}

	uiGetData(req, res) {
		let task = req.params.task;

		this.userArgs.DEBUG && this.utils.console("Handling task " + task);

		switch (task) {
			case "gettemplatebyid":
				this.uiGetTemplateByID(req, res);
				break;
			default:
				res.json({ "success": false });
				break;
		}
	}

	uiGetTemplateByID(req, res) {
		let expectedQueryParams = this.utils.getExpectedQueryParams(req.query);
		let templateid = expectedQueryParams.templateid||false;

		this.db.databases.credittemplates.getTemplateByID(templateid).then((data) => {
			res.json({ "success": true, "data": data });
		});
	}
}

exports.GetProcessor = GetProcessor;