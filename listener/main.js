const { constants } = require('../constants');

class Listener {
	constructor(params) {
		this.utils = params.utils;
		this.exp = params.exp;
		this.db = params.db;
		this.dataDir = params.dataDir;
		this.userArgs = params.userArgs;
		this.builder = params.builder;
		this.blacklist = this.userArgs.BLACKLIST;
		this.testData = params.testData;
		this.express = params.express;
		this.gui = params.gui;
	}

	start() {
		this.exp.listen(this.userArgs.PORT, () => {
			this.utils.console("Started listening at http://localhost:" + this.userArgs.PORT);
			this.utils.console(" ");
			this.setDefaultListeners();
		});
	}

	setDefaultListeners() {
		this.get_addToUser({ path: constants.PATHS.ADD_USER, callback: this.addToUser.bind(this) });
		this.get_allOf({ path: constants.PATHS.GET_ALL, callback: this.getAllUsers.bind(this) });
		this.get_10Of({ path: constants.PATHS.GET_10, callback: this.getTop10.bind(this) });
		this.get_5Of({ path: constants.PATHS.GET_5, callback: this.getTop5.bind(this) });
		this.get_userOf({ path: constants.PATHS.GET_USER, callback: this.getByUser.bind(this) });
		this.get_removeUser({ path: constants.PATHS.REMOVE_USER, callback: this.removeUser.bind(this) });
		this.get_credits({ path: constants.PATHS.CREDITS, callback: ()=>{} });

		this.get_addTestData({ path: constants.PATHS.TESTDATA_ADD, callback: this.addTestData.bind(this) });
		this.get_removeTestData({ path: constants.PATHS.TESTDATA_REMOVE, callback: this.removeTestData.bind(this) });

		//this.get_allUserSettings({ path: constants.PATHS.UI_GET_USER_SETTINGS, callback: this.getAllUserSettings.bind(this) });

		//this.get_userSettingsSetPort({ path: constants.PATHS.UI_SET_PORT, callback: this.userSettingsSetPort.bind(this) });
		//this.get_userSettingsGetPort({ path: constants.PATHS.UI_GET_PORT, callback: this.userSettingsGetPort.bind(this) });

		//this.get_userSettingsSetDebug({ path: constants.PATHS.UI_SET_DEBUG, callback: this.userSettingsSetDebug.bind(this) });
		//this.get_userSettingsGetDebug({ path: constants.PATHS.UI_GET_DEBUG, callback: this.userSettingsGetDebug.bind(this) });

		//this.get_userSettingsSetCleanStart({ path: constants.PATHS.UI_SET_START_CLEAN, callback: this.userSettingsSetCleanStart.bind(this) });
		//this.get_userSettingsGetCleanStart({ path: constants.PATHS.UI_GET_START_CLEAN, callback: this.userSettingsGetCleanStart.bind(this) });

		// UI handler
		this.get_ui({ path: constants.PATHS.UI_PAGE_HOME, callback: this.uiPage.bind(this) });
		this.post_ui({ path: constants.PATHS.UI_SET_DATA, callback: this.uiSetData.bind(this) });

		this.exp.get(constants.PATHS.PING, (req, res) => {res.send("pong");});

		this.exp.use('/usercontent', this.express.static(constants.TEMPLATE_DIRS.STATIC));
		//this.exp.use('/gui', this.express.static(constants.GUI_DIRS.BASE));

		this.utils.console(" ");
	}

	get_ui(data) {
		this.userArgs.DEBUG && this.utils.console("Added GET " + data.path);

		this.exp.get(data.path, (req, res) => {
			data.callback(req, res);
		});
	}

	post_ui(data) {
		//this.userArgs.DEBUG && this.utils.console("Added POST " + data.path);

		this.exp.post(data.path, (req, res) => {
			data.callback(req, res);
		});
	}

	/*get_allUserSettings(data) {
		this.userArgs.DEBUG && this.utils.console("Added GET " + data.path);

		this.exp.get(data.path, (req, res) => {
			data.callback(req, res);
		});
	}

	get_userSettingsSetPort(data) {
		this.userArgs.DEBUG && this.utils.console("Added GET " + data.path);

		this.exp.get(data.path, (req, res) => {
			let port = req.params.port || constants.APP.DEFAULTS.PORT;

			data.callback(req, res, port);
		});
	}

	get_userSettingsGetPort(data) {
		this.userArgs.DEBUG && this.utils.console("Added GET " + data.path);

		this.exp.get(data.path, (req, res) => {
			data.callback(req, res);
		});
	}

	get_userSettingsSetDebug(data) {
		this.userArgs.DEBUG && this.utils.console("Added GET " + data.path);

		this.exp.get(data.path, (req, res) => {
			let debug = (req.params.debug === "true");

			data.callback(req, res, debug);
		});
	}

	get_userSettingsGetDebug(data) {
		this.userArgs.DEBUG && this.utils.console("Added GET " + data.path);

		this.exp.get(data.path, (req, res) => {
			data.callback(req, res);
		});
	}

	get_userSettingsSetCleanStart(data) {
		this.userArgs.DEBUG && this.utils.console("Added GET " + data.path);

		this.exp.get(data.path, (req, res) => {
			let cleanstart = (req.params.cleanstart === "true");

			data.callback(req, res, cleanstart);
		});
	}

	get_userSettingsGetCleanStart(data) {
		this.userArgs.DEBUG && this.utils.console("Added GET " + data.path);

		this.exp.get(data.path, (req, res) => {
			data.callback(req, res);
		});
	}*/

	blacklisted() {
		this.userArgs.DEBUG && this.utils.console(constants.MESSAGES.BLACKLISTED);
	}

	get_addTestData(data) {
		this.userArgs.DEBUG && this.utils.console("Added GET " + data.path);

		this.exp.get(data.path, (req, res) => {
			data.callback(req, res);
		});
	}

	get_removeTestData(data) {
		this.userArgs.DEBUG && this.utils.console("Added GET " + data.path);

		this.exp.get(data.path, (req, res) => {
			data.callback(req, res);
		});
	}

	get_addToUser(data) {
		let blacklisted = this.blacklisted.bind(this);
		this.userArgs.DEBUG && this.utils.console("Added GET " + data.path);

		this.exp.get(data.path, (req, res) => {
			let key = req.params.key || false;
			let user = req.params.user || false;
			let amount = req.params.amount * 1 || 0;

			if (this.blacklist.includes(user)) {
				blacklisted();
				res.send("");
			} else if (key && user && amount) {
				data.callback(req, res, key, user, amount);
			} else {
				res.send("");
			}
		});
	}

	get_allOf(data) {
		this.userArgs.DEBUG && this.utils.console("Added GET " + data.path);

		this.exp.get(data.path, (req, res) => {
			let key = req.params.key || false;

			if (key) {
				data.callback(req, res, key);
			} else {
				res.send("");
			}
		});
	}

	get_10Of(data) {
		this.userArgs.DEBUG && this.utils.console("Added GET " + data.path);

		this.exp.get(data.path, (req, res) => {
			let key = req.params.key || false;

			if (key) {
				data.callback(req, res, key);
			} else {
				res.send("");
			}
		});
	}

	get_5Of(data) {
		this.userArgs.DEBUG && this.utils.console("Added GET " + data.path);

		this.exp.get(data.path, (req, res) => {
			let key = req.params.key || false;

			if (key) {
				data.callback(req, res, key);
			} else {
				res.send("");
			}
		});
	}

	get_userOf(data) {
		let blacklisted = this.blacklisted.bind(this);
		this.userArgs.DEBUG && this.utils.console("Added GET " + data.path);

		this.exp.get(data.path, (req, res) => {
			let key = req.params.key || false;
			let user = req.params.user || false;

			if (this.blacklist.includes(user)) {
				blacklisted();
				res.send("");
			} else if (key && user) {
				data.callback(req, res, key, user);
			} else {
				res.send("");
			}
		});
	}

	get_removeUser(data) {
		this.userArgs.DEBUG && this.utils.console("Added GET " + data.path);

		this.exp.get(data.path, (req, res) => {
			let user = req.params.user || false;

			if (user) {
				data.callback(req, res, user);
			} else {
				res.send("");
			}
		});
	}

	get_credits(data) {
		this.userArgs.DEBUG && this.utils.console("Added GET " + data.path);

		this.exp.get(data.path, (req, res) => {
			this.builder.assembleTemplates(this.db).then(()=>{
				res.set('Content-Type', 'text/html')
				res.send(this.builder.getCreditsHTML());
			});
			
		});
	}

	/**
	 * ROUTE HANDLERS 
	 */
	uiPage(req, res) {
		this.gui.loadPage(req).then((page)=>{
			res.send(page);
		});		
	}

	uiSetData(req, res) {
		let task = req.params.task;

		console.log(task);

		switch (task) {
			case "settemplateincludes":
				this.uiSetTemplateIncludes(req, res);
				break;
			case "settemplatecolors":
				this.uiSetTemplateColors(req, res);
				break;
			case "settemplatesettings":
				this.uiSetTemplateSettings(req, res);
				break;
			case "settemplatecustomcss":
				this.uiSetTemplateCustomCSS(req, res);
				break;
			default:
				res.json({ "success": false });
				break;
		}
	}

	uiSetTemplateIncludes(req, res) {
		if (req.body.css && req.body.js) {
			let data = {
				css: (Array.isArray(req.body.css)) ? req.body.css : [],
				js: (Array.isArray(req.body.js)) ? req.body.js : []
			};

			this.db.databases.templateincludes.setData(data).then(() => {
				res.json({ "success": true });
			});
		}		
	}

	uiSetTemplateColors(req, res) {
		let data = {
			title: req.body.title,
			subtitle: req.body.subtitle,
			background: req.body.background,
			sectiontitle: req.body.sectiontitle,
			textcolor: req.body.textcolor,
			sectionborder: req.body.sectionborder
		};

		this.db.databases.templatecolors.setData(data).then(() => {
			res.json({ "success": true });
		});
	}

	uiSetTemplateSettings(req, res) {
		let data = {
			looping: req.body.looping,
			speed: req.body.speed
		};

		this.db.databases.templatesettings.setData(data).then(() => {
			res.json({ "success": true });
		});
	}

	uiSetTemplateCustomCSS(req, res) {
		let data = {
			css: req.body.css
		};

		this.db.databases.templatecustomcss.setData(data).then(() => {
			res.json({ "success": true });
		});
	}

	removeUser(req, res, user) {
		let db = this.db;
		let utils = this.utils;
		let dbs = constants.DATABASE_NAMES;

		Object.entries(dbs).forEach(([k,v])=>{
			db.databases[v].removeUser(user).then((r) => {
				this.userArgs.DEBUG && utils.console("Remove user from : " + v + " " + user);
			});			
		});

		res.send("");
	}

	// add to user of
	addToUser(req, res, key, user, amount) {
		let expectedQueryParams = this.utils.getExpectedQueryParams(req.query);

		this.db.databases[key].addUser(user, amount, expectedQueryParams).then((r) => {
			this.userArgs.DEBUG && this.utils.console("Add to user: " + key + " " + user + " " + amount);
			res.send(r.toString());
		}).then(()=>{
			this.historyManager(key, user, amount, expectedQueryParams);
		});
	}

	// get all users of
	getAllUsers(req, res, key) {
		this.db.databases[key].getAll().then((r) => {
			this.userArgs.DEBUG && this.utils.console("Get all users: " + key + " " + JSON.stringify(r));
			res.send(JSON.stringify(r));
		});
	}

	// get top 10 of
	getTop10(req, res, key) {
		this.db.databases[key].getTop10(false, this.utils.getExpectedQueryParams(req.query)).then((r) => {
			this.userArgs.DEBUG && this.utils.console("Get top 10: " + key + " " + JSON.stringify(r));
			res.send(r.toString());
		});
	}

	// get top 5 of
	getTop5(req, res, key) {
		this.db.databases[key].getTop5(false, this.utils.getExpectedQueryParams(req.query)).then((r) => {
			this.userArgs.DEBUG && this.utils.console("Get top 5: " + key + " " + JSON.stringify(r));
			res.send(r);
		});
	}

	// get user of
	getByUser(req, res, key, user) {
		this.db.databases[key].getUser(user).then((r) => {
			this.userArgs.DEBUG && this.utils.console("Get user: " + key + " " + user);
			res.send(r.toString());
		});
	}

	// get all settings
	/*getAllUserSettings(req, res) {
		this.db.databases.usersettings.getAll().then((r) => {
			this.userArgs.DEBUG && this.utils.console("Get all settings");
			res.send(JSON.stringify(r));
		});
	}*/

	/* set port */
	/*userSettingsSetPort(req, res, port) {
		this.db.databases.usersettings.setPort(port).then((r) => {
			this.userArgs.DEBUG && this.utils.console("Set port");
			res.send(r.toString());
		});
	}*/

	/* get port */
	/*userSettingsGetPort(req, res) {
		this.db.databases.usersettings.getPort().then((r) => {
			this.userArgs.DEBUG && this.utils.console("Get port");
			res.send(r.toString());
		});
	}*/

	/* set debug */
	/*userSettingsSetDebug(req, res, debug) {
		this.db.databases.usersettings.setDebug(debug).then((r) => {
			this.userArgs.DEBUG && this.utils.console("Set debug");
			res.send(r.toString());
		});
	}*/

	/* get debug */
	/*userSettingsGetDebug(req, res) {
		this.db.databases.usersettings.getDebug().then((r) => {
			this.userArgs.DEBUG && this.utils.console("Get debug");
			res.send(r.toString());
		});
	}*/

	/* set cleanstart */
	/*userSettingsSetCleanStart(req, res, cleanstart) {
		this.db.databases.usersettings.setCleanStart(cleanstart).then((r) => {
			this.userArgs.DEBUG && this.utils.console("Set cleanstart");
			res.send(r.toString());
		});
	}*/

	/* get cleanstart */
	/*userSettingsGetCleanStart(req, res) {
		this.db.databases.usersettings.getCleanStart().then((r) => {
			this.userArgs.DEBUG && this.utils.console("Get cleanstart");
			res.send(r.toString());
		});
	}*/

	// add test data
	addTestData(req, res) {
		this.testData.add().then(()=>{
			res.send("test data is being added, should only take a few seconds");
		});		
	}

	// add test data
	removeTestData(req, res) {
		this.testData.remove().then(() => {
			res.send("test data is being removed, should only take a few seconds");
		});	
	}

	// history manager
	historyManager(key, user, amount, expectedQueryParams) {
		switch(key) {
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

	// bits history
	addToUserHistory(key, user, amount, expectedQueryParams) {
		this.db.databases["h" + key].addUser(user, amount, expectedQueryParams).then((r) => {
			this.userArgs.DEBUG && this.utils.console("Add to user history: " + key + " " + user + " " + amount);
		});
	}
}

exports.Listener = Listener;