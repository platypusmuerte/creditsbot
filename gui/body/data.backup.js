const { constants } = require('../../constants');
const { BodyBase } = require("./body.base");

class DataBackup extends BodyBase {
	constructor(params) {
		super();
		this.utils = params.utils;
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
		<script>${this.js()}</script>
		<div class="jumbotron homeBanner">
			<h1 class="display-4">Data Backup</h1>
			<p class="lead">Comming soon...</p>
			<hr class="my-4">
			<p>soon...</p>
		</div>
		`;
	}

	js() {
		return `
		
		`;
	}
}

exports.DataBackup = DataBackup;