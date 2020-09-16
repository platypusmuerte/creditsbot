const { constants } = require('../constants');
const { config } = require('../config');

let { EventManager } = require("../managers/events");

class Listener {
	constructor(params) {
		this.utils = params.utils;
		this.exp = params.exp;
		this.db = params.db;
		this.dataDir = params.dataDir;
		this.events = new EventManager({ utils: this.utils});
	}

	start() {
		this.exp.listen(constants.PORT, () => {
			this.utils.console("Started listening at http://localhost:" + constants.PORT);
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
		this.utils.console(" ");
	}

	get_addToUser(data) {
		config.DEBUG && this.utils.console("Added GET " + data.path);

		this.exp.get(data.path, (req, res) => {
			let key = req.params.key || false;
			let user = req.params.user || false;
			let amount = req.params.amount * 1 || 0;

			if(key && user && amount) {
				data.callback(req, res, key, user, amount);
			} else {
				res.send("");
			}
		});
	}

	get_allOf(data) {
		config.DEBUG && this.utils.console("Added GET " + data.path);

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
		config.DEBUG && this.utils.console("Added GET " + data.path);

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
		config.DEBUG && this.utils.console("Added GET " + data.path);

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
		config.DEBUG && this.utils.console("Added GET " + data.path);

		this.exp.get(data.path, (req, res) => {
			let key = req.params.key || false;
			let user = req.params.user || false;

			if (key && user) {
				data.callback(req, res, key, user);
			} else {
				res.send("");
			}
		});
	}

	get_removeUser(data) {
		config.DEBUG && this.utils.console("Added GET " + data.path);

		this.exp.get(data.path, (req, res) => {
			let user = req.params.user || false;

			if (user) {
				data.callback(req, res, user);
			} else {
				res.send("");
			}
		});
	}

	/**
	 * ROUTE HANDLERS 
	 */
	removeUser(req, res, user) {
		this.db.databases.bits.removeUser(user).then((r) => {
			config.DEBUG && this.utils.console("Remove user: " + JSON.stringify(r));
			res.send(JSON.stringify(r));
		});
		// todo - call removes for all here
	}

	// add to user of
	addToUser(req, res, key, user, amount) {
		this.db.databases[key].addUser(user, amount).then((r) => {
			config.DEBUG && this.utils.console("Add to user: " + JSON.stringify(r));
			res.send(JSON.stringify(r));
		}).then(()=>{
			console.log(key, user, amount);
			this.historyManager(key, user, amount);
		});
	}

	// get all users of
	getAllUsers(req, res, key) {
		this.db.databases[key].getAll().then((r) => {
			config.DEBUG && this.utils.console("Get all users: " + JSON.stringify(r));
			res.send(JSON.stringify(r));
		});
	}

	// get top 10 of
	getTop10(req, res, key) {
		this.db.databases[key].getTop10().then((r) => {
			config.DEBUG && this.utils.console("Get 10 users: " + JSON.stringify(r));
			res.send(JSON.stringify(r));
		});
	}

	// get top 5 of
	getTop5(req, res, key) {
		this.db.databases[key].getTop5().then((r) => {
			config.DEBUG && this.utils.console("Get 5 usesr: " + JSON.stringify(r));
			res.send(JSON.stringify(r));
		});
	}

	// get user of
	getByUser(req, res, key, user) {
		this.db.databases[key].getUser(user).then((r) => {
			config.DEBUG && this.utils.console("Get user: " + JSON.stringify(r));
			res.send(JSON.stringify(r));
		});
	}

	// history manager
	historyManager(key, user, amount) {
		switch(key) {
			case constants.DATABASE_NAMES.BITS:
				this.addToUserHistory(constants.DATABASE_NAMES.HISTORIC_BITS, user, amount);
			break;
		}

	}

	// bits history
	addToUserHistory(key, user, amount) {
		this.db.databases[key].addUser(user, amount).then((r) => {
			config.DEBUG && this.utils.console("Add to user history: " + JSON.stringify(r));
		});
	}
}

exports.Listener = Listener;