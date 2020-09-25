let assert = require("assert");
let expect = require("expect");
const superagent = require("superagent");
const { config } = require('../../config');
let userArr;
let key = "bans";
let userKey = "testuser";
const { constants } = require('../../constants');



/*
describe("=========== USER SETTINGS TESTS ===========", function () {
	describe("Get current port", function () {
		it("Should return " + constants.APP.DEFAULTS.PORT, (done) => {
			superagent.get("http://localhost:" + config.PORT + constants.PATHS.UI_GET_PORT).end((e, r) => {
				if (e) done(e);

				assert.equal(constants.APP.DEFAULTS.PORT, r.text*1);
				done();
			});
		});
	});
});*/