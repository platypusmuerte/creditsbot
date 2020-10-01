const { constants } = require('../../constants');
const { BodyBase } = require("./body.base");

/**
 * Home page
 */
class BodyHome extends BodyBase {
	/**
	 * @param {object} utils		Utils class
	 * @param {object} path
	 * @param {object} db			Db adapter
	 * @param {string} dataDir		path to user data dir
	 * @param {object} userArgs		merged user settings
	 * @param {string} page 		current main page/path/folder
	 * @param {string} subPage		current sub page/path/folder
	 * @param {object} query		express query string object
	 * 
	 * @property {mixed} data		data sent from the main body class data fetch (mostly db queries)
	 */
	constructor(params) {
		super();
		this.utils = params.utils;
		this.path = params.path;
		this.db = params.db;
		this.dataDir = params.dataDir;
		this.userArgs = params.userArgs;
		this.page = params.page;
		this.subPage = params.subpage;
		this.query = params.query;
		this.data;
	}

	/**
	 * Create the page body
	 * @param {mixed} qData db query data
	 */
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