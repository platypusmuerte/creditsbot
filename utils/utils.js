const fs = require("fs");
const { constants } = require('../constants');
const chalk = require("chalk");
const lodash = require("lodash");

class Utils {
	constructor(params) {
		
	}

	console(msg) {
		console.log(chalk.hex("#ff9900")("[CREDITSBOT] ") + chalk.hex("#297bd6")(msg));
	}

	getTopUsers(list, key, dir, count, asArray) {
		let sorted = lodash.orderBy(list, key, dir);

		let top = lodash.take(sorted, count);
		let resp = [];

		top.forEach((d) => {
			if(asArray) {
				resp.push({name: d.name, amount: d.amount});
			} else {
				resp.push(d.name + ": " + d.amount);
			}			
		});

		if (asArray) {
			return resp;
		} else if (resp.length) {
			return resp.join(", ");
		} else {
			return "None to show";
		}
	}
}

exports.Utils = Utils;