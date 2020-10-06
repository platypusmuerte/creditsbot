const { constants } = require('../constants');
const superagent = require('superagent');
const Twitter = require('twitter-v2');
let async  = require("async");



const client = new Twitter({
	consumer_key: 'xxx',
	consumer_secret: 'xxxx',
	bearer_token: 'xxxx'
});

const stream = client.stream("tweets/search/stream", {
	"tweet.fields":"created_at",
	"expansions":"author_id",
	"user.fields":"created_at"
});

let data;

async function waiting() {
	for await (data of stream) {
		console.log(data);
		console.log("=========================");
		console.log(data.includes.users);
	}

	stream.close();
}


waiting();



