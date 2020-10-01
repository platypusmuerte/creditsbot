const { constants } = require('../../constants');
const { BodyBase } = require("./body.base");

/**
 * Backup page
 */
class DataBackup extends BodyBase {
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
	 * @property {object} 	super		parent class ref
	 * @property {mixed} 	data		data sent from the main body class data fetch (mostly db queries)
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
		<script>${this.js()}</script>
		<div class="jumbotron homeBanner">
			<h1 class="display-4">Data Backup</h1>
			<p class="lead">Make a backup of the data and templates folders.</p>
			<hr class="my-4">
			<p>This just creates a copy of the templates and data directories, inside a new folder, inside the backups directory.</p>
			<a id="backup" class="btn btn-primary btn-lg" href="#" target="_creditbot" role="button">Backup Now</a><span id="subsuccess" class="badge badge-success formSuccess invisible">Backup Started</span>
		</div>
		`;
	}

	/**
	 * Any js for the page content
	 * 		- send data when submit button is pressed
	 */
	js() {
		return `
		function init_data_backup() {
			$("#backup").on("click",(e)=>{
				e.preventDefault();
				
				$.ajax({
					type: "POST",
					url: "${constants.PATHS.UI_BASE_API}backup",
					data: JSON.stringify({}),
					contentType: "application/json",
					dataType: "json"
				}).done((data)=>{
					$("#subsuccess").removeClass("invisible").addClass("visible");
					setTimeout(()=>{
						$("#subsuccess").removeClass("visible").addClass("invisible");
					},3000);
				});				
			});
		}

		$(document).ready(() => {
			init_data_backup();
		});
		`;
	}
}

exports.DataBackup = DataBackup;