const { constants } = require('../../constants');
const { BodyBase } = require("./body.base");

/**
 * Includes page
 */
class TemplateIncludes extends BodyBase {
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
			<h1 class="display-4">Template Includes</h1>
			<p class="lead">Include 3rd party files, like Google Fonts, CSS files, etc</p>
			<hr class="my-4">
			<p>The JS includes are loaded after the default JS content, <strong>JQuery is already included</strong></p>
			
			<form>
				<div class="form-group">
					<label class="formLabel" for="templateCSSIncludes">CSS Include URL (1 per line)</label>
					<textarea class="form-control" id="templateCSSIncludes" rows="3">${this.toEachLine(this.data.css)}</textarea>
				</div>
				<p>The CSS includes are loaded after the default CSS content. Place font includes here.</p>
				<div class="form-group">
					<label class="formLabel" for="templateJSIncludes">JS Include URL (1 per line)</label>
					<textarea class="form-control" id="templateJSIncludes" rows="3">${this.toEachLine(this.data.js)}</textarea>
				</div>
				<button id="formsub" type="button" class="btn btn-primary">Submit</button><span id="subsuccess" class="badge badge-success formSuccess invisible">Success</span>
			</form>
		</div>
		`;
	}

	toEachLine(data) {
		return (data.length) ? data.join('\r\n'):'';
	}

	/**
	* Page js
	* 		updates include file data
	*/
	js() {
		return `
		function init_template_includes() {
			$("#formsub").on("click",(e)=>{
				let cssRaw = $("#templateCSSIncludes").val();
				let jsRaw = $("#templateJSIncludes").val();
				let cssVal = (cssRaw.length) ? cssRaw.split('\\n'):[];
				let jsval = (jsRaw.length) ? jsRaw.split('\\n'):[];
				
				$.ajax({
					type: "POST",
					url: "${constants.PATHS.UI_BASE_API}settemplateincludes",
					data: JSON.stringify({css: cssVal ,js: jsval}),
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
			init_template_includes();
		});
		`;
	}

}

exports.TemplateIncludes = TemplateIncludes;