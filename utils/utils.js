const fs = require("fs");
const { constants } = require('../constants');

class Utils {
	constructor(params) {
		
	}

	console(msg) {
		console.log("[CREDITSBOT] " + msg);
	}
}

exports.Utils = Utils;