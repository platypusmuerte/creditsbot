let assert = require("assert");
let expect = require("expect");
const superagent = require("superagent");
const { config } = require('../../config');
let userArr;
let key = "hosts";
let userKey = "testuser";

/**
 * 
 * follows only increments the user, the amount is discarded in the api
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
	// add to 15 users
	for (let u = 1; u <= 15; ++u) {
		callAddUser(u, 1);
	}

	// add to 15 users
	for (let u = 1; u <= 2; ++u) {
		callAddUser(u, 1);
	}

	// add to 15 users
	for (let u = 1; u <= 1; ++u) {
		callAddUser(u, 1);
	}

	// add to 15 users
	for (let u = 9; u <= 10; ++u) {
		callAddUser(u, 1);
	}

	// add to 15 users
	for (let u = 10; u <= 10; ++u) {
		callAddUser(u, 1);
	}

	describe("Get all " + key, function () {
		it("Should return count of 15", (done) => {
			superagent.get("http://localhost:" + config.PORT + "/getall/" + key).end((e, r) => {
				if (e) done(e);
				let follows = JSON.parse('{"users":' + r.text + '}');

				assert.equal(15, follows.users.length);
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

	describe("In top 10 " + key, function () {
		it("1st should be greater than 2nd result", (done) => {
			let val1 = userArr[0].split(": ")[1] * 1;
			let val2 = userArr[1].split(": ")[1] * 1;
			expect(val1).toBeGreaterThanOrEqual(val2);
			done();
		});
	});

	describe("In top 10 " + key, function () {
		it("9th should be greater than 10th result", (done) => {
			let val1 = userArr[8].split(": ")[1] * 1;
			let val2 = userArr[9].split(": ")[1] * 1;
			expect(val1).toBeGreaterThanOrEqual(val2);
			done();
		});
	});
});