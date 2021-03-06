const { constants } = require('../../constants');
const { BodyBase } = require("./body.base");

/**
 * Settings page
 */
class TemplateSettings extends BodyBase {
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

		let checked = (this.data.looping) ? ` checked`:``;

		return `
		<script>${this.js()}</script>
		<div class="jumbotron homeBanner">
			<h1 class="display-4">Template Settings</h1>
			<p class="lead">You can tweak how fast it moves, and whether or not it loops.</p>
			<hr class="my-4">
			<p>These can be overridden in the custom JS section</p>
			<form>
				<div class="form-group"><label class="formLabel">Looping Credits</label></div>
				<div class="form-group form-check">					
					<input type="checkbox" class="form-check-input" id="creditLoop" ${checked}>
					<label class="form-check-label" for="creditLoop">Enabled</label>
				</div>
				<div class="form-group">
					<label class="formLabel" for="speedAdjust">Speed Adjustment</label>
					<input type="number" class="form-control numberInput" id="speedAdjust" value="${this.data.speed*1}">
				</div>
				<button id="formsub" type="button" class="btn btn-primary">Submit</button><span id="subsuccess" class="badge badge-success formSuccess invisible">Success</span>
			</form>
		</div>
		`;
	}

	/**
	* Page js
	* 		sends data to db for settings on submit
	*/
	js() {
		return `
		function init_template_settings() {
			$("#formsub").on("click",(e)=>{
				let payload = {
					looping: $("#creditLoop").is(":checked"),
					speed: $("#speedAdjust").val()
				};
				
				$.ajax({
					type: "POST",
					url: "${constants.PATHS.UI_BASE_API}settemplatesettings",
					data: JSON.stringify(payload),
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
			init_template_settings();
		});
		`;
	}
}

exports.TemplateSettings = TemplateSettings;