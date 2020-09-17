let assert = require("assert");
let expect = require("expect");
const superagent = require("superagent");
let userArr;
let amount = 99;
let key = "hchannelpoints";
let userKey = "testuser";

function callAddUser(u, b) {
	describe("Add " + b + " " + key + " to " + userKey + u, function () {
		it("Should return empty string", (done) => {
			superagent.get("http://localhost:3011/add/" + key + "/" + userKey + u + "/" + b).end((e, r) => {
				if (e) done(e);
				assert.equal("", r.text);
				done();
			});
		});
	});
}

describe("=========== " + key.toUpperCase() + " ===========", function () {
	describe("Get " + userKey + " " + key, function () {
		it("Should return '" + userKey + "1 not found'", (done)=>{
			superagent.get("http://localhost:3011/get/" + key + "/" + userKey + "1").end((e,r)=>{
				if (e) done(e);
				assert.equal(userKey + "1 not found", r.text);
				done();
			});
		});
	});

	
	// add to 15 users
	for(let u=1;u<=15;++u) {
		++amount;
		callAddUser(u, amount);		
	}

	describe("Add 100 " + key + " to " + userKey + "1", function () {
		it("Should return ''", (done) => {
			superagent.get("http://localhost:3011/add/" + key + "/" + userKey + "1/100").end((e, r) => {
				if (e) done(e);
				assert.equal("", r.text);
				done();
			});
		});
	});

	describe("Get " + userKey + "1 " + key, function () {
		it("Should return 200", (done) => {
			superagent.get("http://localhost:3011/get/" + key + "/" + userKey + "1").end((e, r) => {
				if (e) done(e);
				assert.equal("200", r.text);
				done();
			});
		});
	});

	describe("Get top 10 " + key, function () {
		it("Should return count of 10", (done) => {
			superagent.get("http://localhost:3011/top10/" + key).end((e, r) => {
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
			let val1 = userArr[0].split(": ")[1]*1;
			let val2 = userArr[1].split(": ")[1]*1;
			expect(val1).toBeGreaterThan(val2);
			done();
		});
	});

	describe("In top 10 " + key, function () {
		it("9th should be greater than 10th result", (done) => {
			let val1 = userArr[8].split(": ")[1] * 1;
			let val2 = userArr[9].split(": ")[1] * 1;
			expect(val1).toBeGreaterThan(val2);
			done();
		});
	});

	describe("Get top 5 " + key, function () {
		it("Should return count of 5", (done) => {
			superagent.get("http://localhost:3011/top5/" + key).end((e, r) => {
				if (e) done(e);

				let str = r.text;
				userArr = str.split(", ");

				expect(userArr).toHaveLength(5);
				done();
			});
		});
	});

	describe("In top 5 " + key, function () {
		it("1st should be greater than 2nd result", (done) => {
			let val1 = userArr[0].split(": ")[1] * 1;
			let val2 = userArr[1].split(": ")[1] * 1;
			expect(val1).toBeGreaterThan(val2);
			done();
		});
	});

	describe("In top 5 " + key, function () {
		it("4th should be greater than 5th result", (done) => {
			let val1 = userArr[3].split(": ")[1] * 1;
			let val2 = userArr[4].split(": ")[1] * 1;
			expect(val1).toBeGreaterThan(val2);
			done();
		});
	});
});