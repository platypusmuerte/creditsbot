const { constants } = require('../../constants');
const { BodyBase } = require("./body.base");

/**
 * Test Data page
 */
class DataTest extends BodyBase {
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
			<h1 class="display-4">Test User Data</h1>
			<p class="lead">Load and unload a handful of test data to see how the credits look with data.</p>
			<hr class="my-4">
			<p>Don't forget to remove the test data when you're done. Unless TestPablo really is one of your biggest fans...</p>
			<a id="testadd" class="btn btn-primary btn-lg" href="#" target="_creditbot" role="button">Load Test Data</a>
			<a id="testremove" class="btn btn-primary btn-lg" href="#" target="_creditbot" role="button">Unload Test Data</a>
		</div>
		`;
	}

	/**
	* Page js
	* 		call the test data apis
	*/
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