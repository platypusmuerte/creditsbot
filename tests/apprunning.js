let assert = require('assert');
const superagent = require('superagent');

describe('App Running', function () {
	describe('Is the app running', function () {
		it('Ping should return pong', function () {
			superagent.get("http://localhost:3011/ping").then((r)=>{
				assert.equal("pong", r.text);
			});
		});
	});
});