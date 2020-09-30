const { constants } = require('../constants');
const chalk = require("chalk");
const lodash = require("lodash");

/**
 * Utilities
 */
class Utils {
	constructor(params) {
		
	}

	/**
	 * Send colored/formatted message to CLI
	 * @param {string} msg message to send to cli
	 */
	console(msg) {
		console.log(chalk.hex("#ff9900")("[CREDITSBOT] ") + chalk.hex("#297bd6")(msg));
	}

	/**
	 * Send different colored message to cli
	 * @param {string} msg message to send to cli
	 */
	notice(msg) {
		console.log(chalk.hex("#ff9900")("[CREDITSBOT] ") + chalk.hex("#ff0000")(msg));
	}

	/**
	 * Only return object of params were expecting
	 * @param {object} q express query string object
	 */
	getExpectedQueryParams(q) {
		let expectedParams = {};

		constants.QUERY_PARAMS.forEach((qp)=>{
			if(q[qp]) {
				expectedParams[qp] = q[qp];
			}
		});

		return expectedParams;
	}

	/**
	 * Get top N in a direction, by a key
	 * @param {array} list result from db query
	 * @param {string} key sort key
	 * @param {string} dir direction
	 * @param {number} count how many to return
	 * @param {boolean} asArray well, def not as a string.....
	 * @param {string} card URL of streamloots card
	 */
	getTopUsers(list, key, dir, count, asArray, card) {
		let sorted = lodash.orderBy(list, key, dir);

		let top = lodash.take(sorted, count);
		let resp = [];

		top.forEach((d) => {
			if(asArray) {
				let obj = { name: d.name, amount: d.amount };

				if(card) {
					obj["card"] = d.card;
				}

				resp.push(obj);
			} else if(card) {
				resp.push({ name: d.name, card: d.card, amount: d.amount });
			} else {
				resp.push(d.name + ": " + d.amount);
			}			
		});

		if (asArray || card) {
			return resp;
		} else if (resp.length) {
			return resp.join(", ");
		} else {
			return "None to show";
		}
	}

	/**
	 * Get card obects tops
	 * @param {array} list result from db query
	 * @param {number} count how many to return
	 */
	getTopCards(list, count) {
		let sorted, top, flatObj, flatList;
		flatObj = {};
		flatList = [];

		list.forEach((data)=>{
			if(flatObj[data.card]) {
				flatObj[data.card] += data.amount;
			} else {
				flatObj[data.card] = data.amount;
			}
		});

		Object.entries(flatObj).forEach(([k,v])=>{
			flatList.push({name: "someuser", amount: v, card: k});
		});

		sorted = lodash.orderBy(flatList, "amount", "desc");
		top = lodash.take(sorted, count);

		return top;
	}
}

exports.Utils = Utils;