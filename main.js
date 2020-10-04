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
let { Patches } = require("./patches/main");
let { RequiredFiles } = require("./utils/requiredfiles");

let utils, listener, db, builder, testData, gui, patches;
utils = new Utils();

// make sure folders and files exist as early as possible
new RequiredFiles({ fs, utils, userArgs });

userArgs.DEBUG && utils.console(" ");
userArgs.DEBUG && utils.console(" ");

const dataDir = path.join("./", "/data");
const themeDir = path.join(dataDir,"/themes");
const defaultThemeDir = path.join(themeDir,"/default");

const Cryptr = require('cryptr');
const cryptr = new Cryptr('platyscreditsbot');

// create the patches to run after listener is done
patches = new Patches({ fs, path, utils, dataDir, userArgs });

patches.prep().then((s,f)=>{
	patches.prePatches().then(()=>{
		header(utils, constants).then(()=>{
			// Just some output for the cli
			builder = new Builder({utils, userArgs});
		}).then(()=>{
			// handle cleaning up databases etc on startup
			cleanup(userArgs, path, fs, utils, dataDir, themeDir, defaultThemeDir).then(() => {
				userArgs.DEBUG && utils.console(" ");
				userArgs.DEBUG && utils.console("Starting...");
				userArgs.DEBUG && utils.console(" ");

				db = new Database({ fs, cryptr, dataDir, utils, path, defaultThemeDir, themeDir, userArgs });

				db.ready().then(()=>{
					let versioncheck = new VersionCheck({ utils, userArgs });

					// run checker now, for cli notification. GUI has its own calls
					versioncheck.run();

					testData = new TestData({ userArgs, utils });
					gui = new GUI({ db, utils, dataDir, userArgs, fs });
					backup = new Backup({ fs, path, utils, dataDir, userArgs });
					exportdata = new ExportData({ db, fs, path, utils, dataDir, userArgs });
					listener = new Listener({ db, utils, exp, dataDir, userArgs, builder, testData, express, gui, backup, exportdata, versioncheck: versioncheck, fs });
					
					// start listening to gets/posts and then run patch check
					listener.start().then(()=>{
						patches.postPatches(db).then(()=>{
							// done patching
							db.switchToActiveTheme();
						});
					});	
				});			
			});
		});
	});
}).catch((e)=>{
	// cant update
});






