let { userArgs } = require("./yargs");
let express = require("express");

let exp = express();
// set json handler for json responses
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
let { Patcher } = require("./patcher/main");

let utils, listener, db, builder, testData, gui, patcher;
utils = new Utils();

// make sure the data dir always exists
if (!fs.existsSync("./data")) {
	fs.mkdirSync("./data");
	userArgs.DEBUG && utils.console("Created ./data");
}

userArgs.DEBUG && utils.console(" ");
userArgs.DEBUG && utils.console(" ");

const dataDir = path.join("./", "/data");
const Cryptr = require('cryptr');
const cryptr = new Cryptr('platyscreditsbot');

header(utils, constants).then(()=>{
	// Just some output for the cli
	builder = new Builder({utils, userArgs});
}).then(()=>{
	// handle cleaning up databases etc on startup
	cleanup(userArgs, path, fs, utils, dataDir).then(() => {
		userArgs.DEBUG && utils.console(" ");
		userArgs.DEBUG && utils.console("Starting...");
		userArgs.DEBUG && utils.console(" ");

		db = new Database({ cryptr, dataDir, utils, path });
		let versioncheck = new VersionCheck({ utils, userArgs });

		// run checker now, for cli notification. GUI has its own calls
		versioncheck.run();

		// create the patcher to run after listener is done
		patcher = new Patcher({ fs, path, utils, dataDir, userArgs, db });

		testData = new TestData({ userArgs, utils });
		gui = new GUI({ db, utils, dataDir, userArgs });
		backup = new Backup({ fs, path, utils, dataDir, userArgs });
		exportdata = new ExportData({ db, fs, path, utils, dataDir, userArgs });
		listener = new Listener({ db, utils, exp, dataDir, userArgs, builder, testData, express, gui, backup, exportdata, versioncheck: versioncheck, fs });
		
		// start listening to gets/posts and then run patch check
		listener.start().then(()=>{
			patcher.patch();
		});		
	});
});




