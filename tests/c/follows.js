let assert = require("assert");
let expect = require("expect");
const superagent = require("superagent");
const { config } = require('../../config');
let userArr;
let key = "follows";
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
	for (let u = 1; u <= 15; ++u) {
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
});