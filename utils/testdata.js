const superagent = require("superagent");

class TestData {
	constructor(params) {
		this.userArgs = params.userArgs;
		this.utils = params.utils;
		this.testUserPrefix = "TestUserPablo"
		this.data = [];
		this.keys = ["bans","bits","channelpoints","chatters","donos","follows","giftsubs","hosts","mods","patreons","raids","subs","vips"];
		this.testCard = "https://cdn.streamloots.com/uploads/5c4f944fac3ab9002f1fa871/f636b164-6fa7-4cac-8ea5-953303258d24.jpg";		
	}

	add() {
		let data = this.data;
		let keys = this.keys;
		let userArgs = this.userArgs;
		let utils = this.utils;

		for (let u = 1; u <= 15; ++u) {
			data.push({ name: this.testUserPrefix + u, amount: Math.floor(Math.random(1) * Math.floor(100)), card: this.testCard });
		}

		return new Promise(function (resolve, reject) {
			data.forEach((d) => {
				keys.forEach((k) => {
					superagent.get("http://localhost:" + userArgs.PORT + "/add/" + k + "/" + d.name + "/" + d.amount + "/?card=" + d.card).end((e, r) => {
						if (e) done(e);
						userArgs.DEBUG && utils.console("Added test data for " + d.name);
					});
				});
			});

			resolve();
		});

		
	}

	remove() {
		let testUserPrefix = this.testUserPrefix;
		let userArgs = this.userArgs;
		let utils = this.utils;

		return new Promise(function (resolve, reject) {
			for (let u = 1; u <= 15; ++u) {
				superagent.get("http://localhost:" + userArgs.PORT + "/remove/" + testUserPrefix + u).end((e, r) => {
					if (e) done(e);
					userArgs.DEBUG && utils.console("Removed test data for " + testUserPrefix + u);
				});
			}

			resolve();
		});		
	}
}

exports.TestData = TestData;