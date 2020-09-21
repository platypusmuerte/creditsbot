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

	getExpectedQueryParams(q) {
		let expectedParams = {};

		constants.QUERY_PARAMS.forEach((qp)=>{
			if(q[qp]) {
				expectedParams[qp] = q[qp];
			}
		});

		return expectedParams;
	}

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