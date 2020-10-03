const { constants } = require('../../constants');
const { BodyBase } = require("./body.base");
const { codemirrorincludes } = require("../libs/codemirror/includes");
const { modal_editor_single_lg } = require("../modals/editor.single.lg");

/**
 * Main page ... page lol
 */
class TemplatePage extends BodyBase {
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
		${codemirrorincludes}
		<script>${this.js()}</script>
		<div class="jumbotron homeBanner">
			<h1 class="display-4">Credits HTML Page</h1>
			<p class="lead">This is the main HTML page for the credits.</p>
			<hr class="my-4">
			<p>Be careful making changes here</p>
			<form>
				<div class="form-group cmEditorLG">
					<label class="formLabel" for="templatePage">Main HTML Page</label>
					<textarea class="form-control" id="templatePage" rows="25">${this.data.page}</textarea>
				</div>
				<button id="formsub" type="button" class="btn btn-primary">Submit</button>
				<button id="viewdefaults" type="button" class="btn btn-primary" data-toggle="modal" data-target="#modal_editor_single_lg">View Default</button>
				<span id="subsuccess" class="badge badge-success formSuccess invisible">Updated</span>
			</form>
		</div>
		${modal_editor_single_lg({textarea: this.data.page})}
		`;
	}

	/**
	* Page js
	* 		updates template
	*/
	js() {
		return `
		function init_template_page() {
			initCodeMirror({textarea: $("#templatePage")[0], mode: "htmlmixed"});
			initCodeMirror({textarea: $("#modal_editor_single_lgTextArea")[0], mode: "htmlmixed", refresh: true});

			$("#formsub").on("click",(e)=>{
				let payload = {
					page: $("#templatePage").val()
				};

				$.ajax({
					type: "POST",
					url: "${constants.PATHS.UI_BASE_API}setmainpagetemplate",
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

exports.TemplatePage = TemplatePage;