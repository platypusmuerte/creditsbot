const { constants } = require('../../constants');
const { BodyBase } = require("./body.base");

class TemplateColors extends BodyBase {
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
			<h1 class="display-4">Template Colors</h1>
			<p class="lead">Colors for text, headings, dividers, etc</p>
			<hr class="my-4">
			<p>These can be overridden in the custom CSS section</p>
			<form>
				<div class="form-group">
					<label class="formLabel" for="titleColor">Title</label>
					<input type="color" class="form-control colorPicker" id="titleColor" value="${this.data.title}">
				</div>
				<div class="form-group">
					<label class="formLabel" for="subTitleColor">Sub Title</label>
					<input type="color" class="form-control colorPicker" id="subTitleColor" value="${this.data.subtitle}">
				</div>
				<div class="form-group">
					<label class="formLabel" for="pageBG">Page Background</label>
					<input type="color" class="form-control colorPicker" id="pageBG" value="${this.data.background}">
				</div>
				<div class="form-group">
					<label class="formLabel" for="sectionTitle">Section Titles</label>
					<input type="color" class="form-control colorPicker" id="sectionTitle" value="${this.data.sectiontitle}">
				</div>
				<div class="form-group">
					<label class="formLabel" for="sectionBorderColor">Section Border Color</label>
					<input type="color" class="form-control colorPicker" id="sectionBorderColor" value="${this.data.sectionborder}">
				</div>
				<div class="form-group">
					<label class="formLabel" for="textColor">Text Color</label>
					<input type="color" class="form-control colorPicker" id="textColor" value="${this.data.textcolor}">
				</div>
				<button id="formsub" type="button" class="btn btn-primary">Submit</button><span id="subsuccess" class="badge badge-success formSuccess invisible">Success</span>
			</form>
		</div>
		`;
	}

	js() {
		return `
		function init_template_colors() {
			$("#formsub").on("click",(e)=>{
				let payload = {
					title: $("#titleColor").val(),
					subtitle: $("#subTitleColor").val(),
					background: $("#pageBG").val(),
					sectiontitle: $("#sectionTitle").val(),
					textcolor: $("#textColor").val(),
					sectionborder: $("#sectionBorderColor").val()
				};
				
				$.ajax({
					type: "POST",
					url: "${constants.PATHS.UI_BASE_API}settemplatecolors",
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
			init_template_colors();
		});
		`;
	}
}

exports.TemplateColors = TemplateColors;