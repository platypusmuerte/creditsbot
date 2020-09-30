const { constants } = require('../../constants');
const { BodyBase } = require("./body.base");

class BodyHome extends BodyBase {
	constructor(params) {
		super();
		this.utils = params.utils;
		this.path = params.path;
		this.db = params.db;
		this.dataDir = params.dataDir;
		this.userArgs = params.userArgs;
		this.page = params.page;
		this.subPage = params.subpage;
		this.data;
	}

	render(qData) {
		this.data = qData;

		return `
		<div class="jumbotron homeBanner">
			<h1 class="display-4">${constants.APP.NAME}</h1>
			<p class="lead">This is a little app I made to collect events from your stream bot, and present them in a credits roll at the end of your stream.</p>
			<hr class="my-4">
			<p>I hope you find this useful. You are free to download the source, and customize it as you see fit.</p>
			<a class="btn btn-primary btn-lg" href="https://github.com/platypusmuerte/creditsbot/wiki" target="_creditbot" role="button">Read the Wiki</a>
			<a class="btn btn-primary btn-lg" href="/credits" target="_creditbot" role="button">View Credits</a>
		</div>`;
	}

}

exports.BodyHome = BodyHome;