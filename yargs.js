const { constants } = require('./constants');
const { config } = require('./config');
const { Utils } = require("./utils/utils");
let utils = new Utils();

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

let userArgs = {};

if (argv.port && Number.isInteger(argv.port) && (argv.port >= 0) && (argv.port <=65535)) {
	config.DEBUG && utils.console("Starting with custom port: " + argv.port);
	userArgs.PORT = argv.port;
}

if (argv.dirty) {
	config.DEBUG && utils.console("Not cleaning session data this run");
	userArgs.CLEAN_ON_STARTUP = false;
}

exports.userArgs = Object.assign({}, config, userArgs);