let assert = require('assert');
const superagent = require('superagent');

describe('Bits', function () {
	describe('Get testuser bits', function () {
		it('Should return "testuser not found"', (done)=>{
			superagent.get("http://localhost:3011/get/bits/testuser").end((e,r)=>{
				if (e) done(e);
				assert.equal("testuser not found", r.text);
				done();
			});
		});
	});

	describe('Add 100 bits to testuser', function () {
		it('Should return ""', (done)=>{
			superagent.get("http://localhost:3011/add/bits/testuser/100").end((e, r) => {
				if (e) done(e);
				assert.equal("", r.text);
				done();
			});
		});
	});

	describe('Get testuser bits', function () {
		it('Should return 100', (done) => {
			superagent.get("http://localhost:3011/get/bits/testuser").end((e, r) => {
				if (e) done(e);
				assert.equal("100", r.text);
				done();
			});
		});
	});
});