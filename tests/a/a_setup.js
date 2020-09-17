let assert = require('assert');
const superagent = require('superagent');

function callRemUser(u) {
	describe('Remove testuser' + u, function () {
		it('Should return ""', (done) => {
			superagent.get("http://localhost:3011/remove/testuser" + u).end((e, r) => {
				if (e) done(e);
				assert.equal("", r.text);
				done();
			});
		});
	});
}

describe('App Running', function () {
	describe('Is the app running', function () {
		it('Ping should return pong', function () {
			superagent.get("http://localhost:3011/ping").then((r) => {
				assert.equal("pong", r.text);
			});
		});
	});
});

describe('Clean Test Data', function () {
	for (let u = 1; u <= 15; ++u) {
		callRemUser(u);
	}
});