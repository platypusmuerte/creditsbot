const { constants } = require('../../constants');
const { BodyBase } = require("./body.base");

class DataBackup extends BodyBase {
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