const { constants } = require('../../constants');
const { BodyBase } = require("./body.base");

class TemplateCustomCSS extends BodyBase {
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
			<h1 class="display-4">Template Custom CSS</h1>
			<p class="lead">Add some custom CSS that is loaded after the default CSS</p>
			<hr class="my-4">
			<p>Use this to override any other styles. This is loaded last.</p>
			<form>
				<div class="form-group">
					<label class="formLabel" for="templateCustomCSS">Custom CSS Definitions</label>
					<textarea class="form-control tabbable" id="templateCustomCSS" rows="25">${this.data.css}</textarea>
				</div>
				<button id="formsub" type="button" class="btn btn-primary">Submit</button><span id="subsuccess" class="badge badge-success formSuccess invisible">Success</span>
			</form>
		</div>
		`;
	}

	js() {
		return `
		function init_template_customcss() {
			$("#formsub").on("click",(e)=>{
				let payload = {
					css: $("#templateCustomCSS").val()
				};
				
				$.ajax({
					type: "POST",
					url: "${constants.PATHS.UI_BASE_API}settemplatecustomcss",
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
			init_template_customcss();
		});
		`;
	}

}

exports.TemplateCustomCSS = TemplateCustomCSS;