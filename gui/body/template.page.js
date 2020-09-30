const { constants } = require('../../constants');
const { BodyBase } = require("./body.base");

class TemplatePage extends BodyBase {
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
			<h1 class="display-4">Credits HTML Page</h1>
			<p class="lead">This is the main HTML page for the credits.</p>
			<hr class="my-4">
			<p>Changes made to this content <strong>may be overwritten</strong> in updates. It is mainly for reference purposes, or a total customization.</p>
			<p>Any breaking changes will be outlined in patch notes, especially if it is not a minor change to this file.</p>
			<form>
				<div class="form-group">
					<label class="formLabel" for="templatePage">Main HTML Page</label>
					<textarea class="form-control tabbable" id="templatePage" rows="25">${this.data.page}</textarea>
				</div>
				<button id="formsub" type="button" class="btn btn-primary">Submit</button><span id="subsuccess" class="badge badge-success formSuccess invisible">Updated</span>
			</form>
		</div>
		`;
	}

	js() {
		return `
		function init_template_page() {
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