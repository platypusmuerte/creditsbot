const fs = require("fs");
const { constants } = require('../constants');
const chalk = require("chalk");

class Utils {
	constructor(params) {
		
	}

	console(msg) {
		console.log(chalk.hex("#ff9900")("[CREDITSBOT] ") + chalk.hex("#297bd6")(msg));
	}
}

exports.Utils = Utils;