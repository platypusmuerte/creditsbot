let express = require("express");
let exp = express();

const path = require('path');
const fs = require('fs');
const { config } = require('./config');
const { constants } = require('./constants');
const { header } = require("./header");
const { cleanup } = require("./cleanup");
const { Utils } = require("./utils/utils");
const { Database } = require('./db');
const dataDir = path.join("./", "/data");

const Cryptr = require('cryptr');
const cryptr = new Cryptr('platyscreditsbot');

let utils, listener, db;
utils = new Utils();
let { Listener } = require("./listener/main");


header(utils, constants).then(()=>{
	cleanup(config, path, fs, utils, dataDir).then(() => {
		config.DEBUG && utils.console(" ");
		config.DEBUG && utils.console("Looking for ./data");

		if (!fs.existsSync("./data")) {
			fs.mkdirSync("./data");
			config.DEBUG && utils.console("Created ./data");
		} else {
			config.DEBUG && utils.console("./data exists");
		}
	}).then(() => {
		config.DEBUG && utils.console(" ");
		config.DEBUG && utils.console("Starting...");
		config.DEBUG && utils.console(" ");
		db = new Database({ cryptr, dataDir, utils });

		listener = new Listener({ db, utils, exp, dataDir });
		listener.start();
	});
});
