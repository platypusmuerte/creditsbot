const { constants } = require('../../constants');
const { BodyBase } = require("./body.base");

class TemplateDefaultCSS extends BodyBase {
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
			<h1 class="display-4">Template Default CSS</h1>
			<p class="lead">The default CSS</p>
			<hr class="my-4">
			<p>Please edit Custom CSS instead of this. The content on this page will be overwritten with updates. <strong>This is for reference only</strong></p>
			<form>
				<div class="form-group">
					<label class="formLabel" for="templateDefaultCSS">Custom CSS Definitions</label>
					<textarea class="form-control tabbable" id="templateDefaultCSS" rows="25">${this.data.css}</textarea>
				</div>
				<button id="formsub" type="button" class="btn btn-primary">Submit</button><span id="subsuccess" class="badge badge-success formSuccess invisible">Success</span>
			</form>
		</div>
		`;
	}

	js() {
		return `
		function init_template_defaultcss() {
			$("#formsub").on("click",(e)=>{
				let payload = {
					css: $("#templateDefaultCSS").val()
				};
				
				$.ajax({
					type: "POST",
					url: "${constants.PATHS.UI_BASE_API}settemplatedefaultcss",
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
			init_template_defaultcss();
		});
		`;
	}

}

exports.TemplateDefaultCSS = TemplateDefaultCSS;