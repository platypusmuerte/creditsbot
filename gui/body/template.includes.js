const { constants } = require('../../constants');
const { BodyBase } = require("./body.base");

class TemplateIncludes extends BodyBase {
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