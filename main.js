let { userArgs } = require("./yargs");
let express = require("express");
let exp = express();
exp.use(express.json());
const path = require('path');
const fs = require('fs-extra');
const { constants } = require('./constants');
const { header } = require("./header");
const { cleanup } = require("./cleanup");
const { Utils } = require("./utils/utils");
const { Database } = require('./db');
const { Builder } = require("./builder/main");
let { Listener } = require("./listener/main");
let { TestData } = require("./utils/testdata");
let { Backup } = require("./utils/backup");
let { ExportData } = require("./utils/exportdata");
let { GUI } = require("./gui/main");
let { VersionCheck } = require("./utils/versioncheck");
let utils, listener, db, builder, testData, gui;
utils = new Utils();

if (!fs.existsSync("./data")) {
	fs.mkdirSync("./data");
	userArgs.DEBUG && utils.console("Created ./data");
} else {
	userArgs.DEBUG && utils.console("Data folder exists OK to start");
}

userArgs.DEBUG && utils.console(" ");
userArgs.DEBUG && utils.console(" ");

const dataDir = path.join("./", "/data");
const Cryptr = require('cryptr');
const cryptr = new Cryptr('platyscreditsbot');

header(utils, constants).then(()=>{
	builder = new Builder({utils, userArgs});
}).then(()=>{
	cleanup(userArgs, path, fs, utils, dataDir).then(() => {
		userArgs.DEBUG && utils.console(" ");
		userArgs.DEBUG && utils.console("Starting...");
		userArgs.DEBUG && utils.console(" ");

		db = new Database({ cryptr, dataDir, utils });
		let versioncheck = new VersionCheck({ utils, userArgs });

		versioncheck.run();

		testData = new TestData({ userArgs, utils });
		gui = new GUI({ db, utils, dataDir, userArgs });
		backup = new Backup({ fs, path, utils, dataDir, userArgs });
		exportdata = new ExportData({ db, fs, path, utils, dataDir, userArgs });
		listener = new Listener({ db, utils, exp, dataDir, userArgs, builder, testData, express, gui, backup, exportdata, versioncheck: versioncheck });
		listener.start();
	});
});




