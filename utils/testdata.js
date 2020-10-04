const superagent = require("superagent");
/**
 * Write a bunch of data for testing the credits layouts
 */
class TestData {
	constructor(params) {
		this.userArgs = params.userArgs;
		this.utils = params.utils;
		this.testUserPrefix = "TestUserPablo"
		this.data = [];
		this.keys = ["bans","bits","channelpoints","chatters","donos","streamloots","follows","giftsubs","hosts","mods","patreons","raids","subs","vips"];
		this.testCards = [
			"https://cdn.streamloots.com/uploads/5c4f944fac3ab9002f1fa871/f636b164-6fa7-4cac-8ea5-953303258d24.jpg",
			"https://cdn.streamloots.com/uploads/5c4f944fac3ab9002f1fa871/e602e01c-e4ea-4ca8-953a-4dfb465135d0.png",
			"https://static.streamloots.com/2ce7305c-4a55-4a46-926c-2b29bf116b2b/23c16f4b-52ae-486e-a4ca-b45ab3fcec1e.png",
			"https://res.cloudinary.com/streamloots/image/upload/f_auto,c_scale,w_150,q_90/static/2ce7305c-4a55-4a46-926c-2b29bf116b2b/106dbb06-8b0f-46a3-828a-36b80f6b1f25.png",
			"https://res.cloudinary.com/streamloots/image/upload/f_auto,c_scale,w_150,q_90/static/2ce7305c-4a55-4a46-926c-2b29bf116b2b/20f54476-b8bd-4b4a-a5c4-aea4c17ccacd.png",
			"https://res.cloudinary.com/streamloots/image/upload/f_auto,c_scale,w_150,q_90/static/2ce7305c-4a55-4a46-926c-2b29bf116b2b/8cedaad3-6fa4-4ac7-bd26-422ca74e1c1a.png",
			"https://res.cloudinary.com/streamloots/image/upload/f_auto,c_scale,w_150,q_90/static/2ce7305c-4a55-4a46-926c-2b29bf116b2b/c4a1a7d0-974e-4557-a239-e0e1a599c442.png",
			"https://res.cloudinary.com/streamloots/image/upload/f_auto,c_scale,w_150,q_90/static/2ce7305c-4a55-4a46-926c-2b29bf116b2b/b53039d6-af72-4021-9a09-a28a90a76106.png"
		];
	}

	/**
	 * Call the add for each database
	 * This uses the express app, so is used as a test also
	 */
	add() {
		let data = this.data;
		let keys = this.keys;
		let userArgs = this.userArgs;
		let utils = this.utils;

		for (let u = 1; u <= 15; ++u) {
			let card = Math.floor(Math.random() * Math.floor(this.testCards.length));
			
			data.push({ name: this.testUserPrefix + u, amount: Math.floor(Math.random(1) * Math.floor(100)), card: this.testCards[card] });
		}

		return new Promise((resolve, reject)=>{
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

	/**
	 * Cleanup the test data, only removing our test names
	 */
	remove() {
		let testUserPrefix = this.testUserPrefix;
		let userArgs = this.userArgs;
		let utils = this.utils;

		return new Promise((resolve, reject)=>{
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