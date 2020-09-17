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
let { Listener } = require("./listener/main");
let utils, listener, db;
utils = new Utils();

if (!fs.existsSync("./data")) {
	fs.mkdirSync("./data");
	config.DEBUG && utils.console("Created ./data");
} else {
	config.DEBUG && utils.console("data folder exists OK to start");
}

config.DEBUG && utils.console(" ");
config.DEBUG && utils.console(" ");

const dataDir = path.join("./", "/data");
const Cryptr = require('cryptr');
const cryptr = new Cryptr('platyscreditsbot');

header(utils, constants).then(()=>{
	cleanup(config, path, fs, utils, dataDir).then(() => {
		config.DEBUG && utils.console(" ");
		config.DEBUG && utils.console("Starting...");
		config.DEBUG && utils.console(" ");

		db = new Database({ cryptr, dataDir, utils });

		listener = new Listener({ db, utils, exp, dataDir });
		listener.start();
	});
});
