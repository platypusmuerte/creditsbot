const { constants } = require('../../constants');
const { BodyBase } = require("./body.base");
const { twitter } = require("../../defaults/twitter");
const { codemirrorincludes } = require("../libs/codemirror/includes");
const { modal_editor_double_sm_sm } = require("../modals/editor.double.sm.sm");

/**
 * Manage tweet alerts
 */
class OverlayTwitter extends BodyBase {
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

		let cbChecked = (this.data.enabled) ? ' checked="1"':'';

		return `
		${codemirrorincludes}
		<script>${this.js()}</script>
		<div class="jumbotron homeBanner">
			<h1 class="display-4">Overlay Twitter Alerts</h1>
			<p class="lead">Show retweet events in an overlay</p>
			<hr class="my-4">
			<p>Tweet Alerts Settings</p>
			<form>
				<label class="formLabel">Enable Tweet Alerts Overlay</label>

				<div class="row justify-content-start">
					<div class="col-3">
						<div class="form-group form-check">
							<input type="checkbox" class="form-check-input" id="alertEnabled"${cbChecked}>
							<label class="form-check-label" for="alertEnabled">Enabled</label>
						</div>
					</div>
				</div>

				<label class="formLabel">Enable Tweet Alerts Overlay</label>

				<div class="row justify-content-start queryRow">
					<div class="col-3">
						<label class="colorPickerLabel" for="hashtag">Hash Tag:</label>
						<input type="text" class="form-control" id="hashtag" value="${this.data.hashtag}" placeholder="Enter #poundsign here">
					</div>
				</div>

				<label class="formLabel">Alert Template</label>

				<div class="row justify-content-start queryRow">
					<div class="col-10 cmEditorSM">
						<textarea class="form-control" id="alertTemplate" rows="8">${this.data.template}</textarea>
					</div>
				</div>

				<label class="formLabel">Alert Template CSS</label>

				<div class="row justify-content-start queryRow">
					<div class="col-10 cmEditorSM">
						<textarea class="form-control" id="alertCSS" rows="8">${this.data.css}</textarea>
					</div>
				</div>

				<label class="formLabel">Twitter Dev Account Keys</label>

				<div class="row justify-content-start queryRow">
					<div class="col-6">
						<label class="colorPickerLabel" for="apiKey">API Key:</label>
						<input type="text" class="form-control" id="apikey" value="${this.data.api_key}" placeholder="Enter api token here">
					</div>
				</div>
				
				<div class="row justify-content-start queryRow">
					<div class="col-6">
						<label class="colorPickerLabel" for="apisecret">API Secret:</label>
						<input type="password" class="form-control" id="apisecret" value="${this.data.api_secret}" placeholder="Enter api secret here">
					</div>
				</div>
				
				<div class="row justify-content-start queryRow">
					<div class="col-6">
						<label class="colorPickerLabel" for="accesskey">Access Key:</label>
						<input type="text" class="form-control" id="accesskey" value="${this.data.access_key}" placeholder="Enter access token here">
					</div>
				</div>
				
				<div class="row justify-content-start queryRow">
					<div class="col-6">
						<label class="colorPickerLabel" for="accesssecret">Access Secret:</label>
						<input type="password" class="form-control" id="accesssecret" value="${this.data.access_secret}" placeholder="Enter access secret here">
					</div>
				</div>
				
				<div class="row justify-content-start queryRow">
					<div class="col-6">
						<label class="colorPickerLabel" for="bearertoken">Bearer Token:</label>
						<input type="password" class="form-control" id="bearertoken" value="${this.data.bearer}" placeholder="Enter bearer token here">
					</div>
				</div>					

				<button id="formsub" type="button" class="btn btn-primary">Submit</button>
				<button id="viewdefaults" type="button" class="btn btn-primary" data-toggle="modal" data-target="#modal_editor_single_lg">View Default</button>
				<span id="subsuccess" class="badge badge-success formSuccess invisible">Updated</span>
			</form>
		</div>
		${modal_editor_double_sm_sm({textarea1: twitter.template, textarea2: twitter.css})}
		`;
	}

	/**
	* Page js
	* 		updates template
	*/
	js() {
		return `
		function init_template_page() {
			initCodeMirror({textarea: $("#alertTemplate")[0], mode: "htmlmixed"});
			initCodeMirror({textarea: $("#alertCSS")[0], mode: "htmlmixed"});
			initCodeMirror({textarea: $("#modal_editor_double_sm_smTextArea1")[0], mode: "htmlmixed", refresh: true});
			initCodeMirror({textarea: $("#modal_editor_double_sm_smTextArea2")[0], mode: "htmlmixed", refresh: true});

			$("#formsub").on("click",(e)=>{
				let payload = {
					enabled: $("#alertEnabled").is(":checked"),
					hashtag: $("#hashtag").val(),
					template: $("#alertTemplate").val(),
					css: $("#alertCSS").val(),
					api_key: $("#apikey").val(),
					api_secret: $("#apisecret").val(),
					access_key: $("#accesskey").val(),
					access_secret: $("#accesssecret").val(),
					bearer: $("#bearertoken").val()
				};

				$.ajax({
					type: "POST",
					url: "${constants.PATHS.UI_BASE_API}setoverlaytwitter",
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
			init_template_page();
		});
		`;
	}

}

exports.OverlayTwitter = OverlayTwitter;