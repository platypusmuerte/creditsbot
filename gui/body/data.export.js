const { constants } = require('../../constants');
const { BodyBase } = require("./body.base");

class DataExport extends BodyBase {
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
			<h1 class="display-4">Data Export</h1>
			<p class="lead">Export all databases as JSON</p>
			<hr class="my-4">
			<p>This will create a new folder in the exports directory, and then export each database as a JSON file.</p>
			<a id="backup" class="btn btn-primary btn-lg" href="#" target="_creditbot" role="button">Export Now</a><span id="subsuccess" class="badge badge-success formSuccess invisible">Export Started</span>
		</div>
		`;
	}

	js() {
		return `
		function init_data_export() {
			$("#backup").on("click",(e)=>{
				e.preventDefault();
				
				$.ajax({
					type: "POST",
					url: "${constants.PATHS.UI_BASE_API}export",
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
			init_data_export();
		});
		`;
	}
}

exports.DataExport = DataExport;