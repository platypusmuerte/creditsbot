let assert = require("assert");
let expect = require("expect");
const superagent = require("superagent");
const { config } = require('../../config');
let userArr;
let amount = 99;
let key = "chatters";
let userKey = "testuser";

/**
 * 
 * chatters only increments the user, the amount is discarded in the api 
 */

function callAddUser(u, b) {
	describe("Add " + b + " " + key + " to " + userKey + u, function () {
		it("Should return empty string", (done) => {
			superagent.get("http://localhost:" + config.PORT + "/add/" + key + "/" + userKey + u + "/" + b).end((e, r) => {
				if (e) done(e);
				assert.equal("", r.text);
				done();
			});
		});
	});
}

describe("=========== " + key.toUpperCase() + " ===========", function () {
	describe("Get " + userKey + " " + key, function () {
		it("Should return '" + userKey + "1 not found'", (done) => {
			superagent.get("http://localhost:" + config.PORT + "/get/" + key + "/" + userKey + "1").end((e, r) => {
				if (e) done(e);
				assert.equal(userKey + "1 not found", r.text);
				done();
			});
		});
	});


	// add to 15 users
	for (let u = 1; u <= 15; ++u) {
		++amount;
		callAddUser(u, amount);
	}

	describe("Add " + key + " to " + userKey + "1", function () {
		it("Should return ''", (done) => {
			superagent.get("http://localhost:" + config.PORT + "/add/" + key + "/" + userKey + "1/1").end((e, r) => {
				if (e) done(e);
				assert.equal("", r.text);
				done();
			});
		});
	});

	describe("Get " + userKey + "1 " + key, function () {
		it("Should return 2", (done) => {
			superagent.get("http://localhost:" + config.PORT + "/get/" + key + "/" + userKey + "1").end((e, r) => {
				if (e) done(e);
				assert.equal("2", r.text);
				done();
			});
		});
	});

	describe("Get top 10 " + key, function () {
		it("Should return count of 10", (done) => {
			superagent.get("http://localhost:" + config.PORT + "/top10/" + key).end((e, r) => {
				if (e) done(e);

				let str = r.text;
				userArr = str.split(", ");

				expect(userArr).toHaveLength(10);
				done();
			});
		});
	});

	describe("Get top 5 " + key, function () {
		it("Should return count of 5", (done) => {
			superagent.get("http://localhost:" + config.PORT + "/top5/" + key).end((e, r) => {
				if (e) done(e);

				let str = r.text;
				userArr = str.split(", ");

				expect(userArr).toHaveLength(5);
				done();
			});
		});
	});
});