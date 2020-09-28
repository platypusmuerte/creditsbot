
/**
 * INI EXAMPLE
 * 
 * [CONFIG]
	PORT=3333
	DIRTY=true
 */


const { constants } = require('./constants');
const { config } = require('./config');
const { Utils } = require("./utils/utils");
const fs = require('fs');
const parser = require("ini-parser-encoder");
let utils = new Utils();
let userINI = {};
let userArgs = {};
let userCustoms = {
	port: false,
	dirty: false,
	blacklist: false
};

if (fs.existsSync("./user.ini")) {
	config.DEBUG && utils.console("Found user config");
	config.DEBUG && utils.console(" ");
	userINI = parser.parseFileSync("./user.ini");

	if (userINI.CONFIG.PORT) {
		userCustoms.port = true;
		userArgs.PORT = userINI.CONFIG.PORT;
	}

	if (userINI.CONFIG.DIRTY) {
		userCustoms.dirty = true;
		userArgs.CLEAN_ON_STARTUP = userINI.CONFIG.DIRTY;
	}

	if (userINI.CONFIG.BLACKLIST) {
		userCustoms.blacklist = true;
		userArgs.BLACKLIST = userINI.CONFIG.BLACKLIST.split(",");
	}
}

var argv = require("yargs").option(
	"port", {
		alias: "p",
		describe: "Set a custom port to use instead of " + config.PORT
	}
).option(
	"dirty", {
		alias: "d",
		describe: "Do not wipe previous session data on startup"
	}
).version(constants.APP.VERSION).help().argv;



if (argv.port && Number.isInteger(argv.port) && (argv.port >= 0) && (argv.port <=65535)) {
	userCustoms.port = true;
	userArgs.PORT = argv.port;
}

if (argv.dirty) {
	userCustoms.dirty = true;
	userArgs.CLEAN_ON_STARTUP = false;
}


if (userCustoms.port) {
	config.DEBUG && utils.console(" ");
	config.DEBUG && utils.console("Starting with custom port: " + userArgs.PORT);
}

if (userCustoms.dirty) {
	config.DEBUG && utils.console("Not cleaning session data this run");
}

if (userCustoms.blacklist) {
	config.DEBUG && utils.console("Found a black list. Will ignore requests with " + userINI.CONFIG.BLACKLIST);
}

config.DEBUG && utils.console(" ");


exports.userArgs = Object.assign({}, config, userArgs);