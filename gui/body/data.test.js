const { constants } = require('../../constants');
const { BodyBase } = require("./body.base");

class DataTest extends BodyBase {
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
			<h1 class="display-4">Test User Data</h1>
			<p class="lead">Load and unload a handful of test data to see how the credits look with data.</p>
			<hr class="my-4">
			<p>Don't forget to remove the test data when you're done. Unless TestPablo really is one of your biggest fans...</p>
			<a id="testadd" class="btn btn-primary btn-lg" href="#" target="_creditbot" role="button">Load Test Data</a>
			<a id="testremove" class="btn btn-primary btn-lg" href="#" target="_creditbot" role="button">Unload Test Data</a>
		</div>
		`;
	}

	js() {
		return `
		function init_data_test() {
			$("#testadd").on("click",(e)=>{
				e.preventDefault();

				$("#testremove").addClass("disabled");
				$.ajax({
					type: "GET",
					url: "http://localhost:${this.userArgs.PORT}/testdata/add",
					data: {},
					contentType: "application/json",
					dataType: "json"
				});

				setTimeout(()=>{
					$("#testremove").removeClass("disabled");
				},3000);
			});

			$("#testremove").on("click",(e)=>{
				e.preventDefault();
				
				$("#testadd").addClass("disabled");
				$.ajax({
					type: "GET",
					url: "http://localhost:${this.userArgs.PORT}/testdata/remove",
					data: {},
					contentType: "application/json",
					dataType: "json"
				});

				setTimeout(()=>{
					$("#testadd").removeClass("disabled");
				},3000);
			});
		}

		$(document).ready(() => {
			init_data_test();
		});
		`;
	}
}

exports.DataTest = DataTest;