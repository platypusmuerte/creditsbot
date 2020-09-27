const { constants } = require('../../constants');
const { BodyBase } = require("./body.base");

class SectionsEdit extends BodyBase {
	constructor(params) {
		super();
		this.utils = params.utils;
		this.db = params.db;
		this.dataDir = params.dataDir;
		this.userArgs = params.userArgs;
		this.page = params.page;
		this.subPage = params.subpage;
		this.data;
		this.query = params.query;
	}

	render(qData) {
		this.data = qData;
		let dynOpts = '';
		let contentOpts = '';
		let staticOpts = '';
		let dividerDyn = '<option value="---" disabled>Dynamic Sections</option>';
		let dividerStatic = '<option value="---" disabled>Static Sections</option>';
		let dividerContent = '<option value="---" disabled>Content Sections</option>';
		
		this.data.forEach((ct)=>{
			let css = (ct.enabled) ? '':' class="templateDisabled"';
			if(ct.type === "dynamic") {
				dynOpts += '<option' + css + ' data-type="' + ct.type + '" value="' + ct.id + '">&nbsp;&nbsp;&nbsp;' + ct.id.replace(/_/g, " ") + '</option>';
			} else if(ct.type === "content") {
				contentOpts += '<option' + css + ' data-type="' + ct.type + '" value="' + ct.id + '">&nbsp;&nbsp;&nbsp;' + ct.id.replace(/_/g, " ") + '</option>';
			} else if(ct.type === "static") {
				staticOpts += '<option' + css + ' data-type="' + ct.type + '" value="' + ct.id + '">&nbsp;&nbsp;&nbsp;' + ct.id.replace(/_/g, " ") + '</option>';
			}
		});

		let allOpts = '<option value="---">Choose Template</option>' + dividerStatic + staticOpts + dividerContent + contentOpts + dividerDyn + dynOpts;

		return `
		<script>${this.js()}</script>
		<div class="jumbotron homeBanner">
			<h1 class="display-4">Edit and Manage Sections</h1>
			<p class="lead">Edit the templates and their properties</p>
			<hr class="my-4">
			<label class="formLabel">Select Template</label>

			<div class="row justify-content-start queryRow">
				<div class="col-2">
					<select class="form-control templateDD" id="templates">${allOpts}</select>
				</div>
				<div class="col-5">
					&nbsp;
				</div>
			</div>

			<div class="row justify-content-start queryRow">
				<div class="col-5">
					<label class="formLabel" for="sectionTitleText">Section Title Text</label>
					<input type="text" class="form-control" id="sectionTitleText" value="">
				</div>
				<div class="col-5">
					<label class="formLabel">&nbsp;</label>
					<div class="form-group form-check">
						<input type="checkbox" class="form-check-input" id="sectionEnabled">
						<label class="form-check-label" for="sectionEnabled">Section Enabled</label>
					</div>
				</div>
			</div>

			<label class="formLabel">Main Template</label>

			<div class="row justify-content-start queryRow">
				<div class="col-10">
					<textarea class="form-control" id="mainTemplate" rows="8"></textarea>
				</div>
			</div>

			<label class="formLabel">Wrapper Template</label>

			<div class="row justify-content-start queryRow">
				<div class="col-10">
					<textarea class="form-control" id="wrapperTemplate" rows="2"></textarea>
				</div>
			</div>

			<label class="formLabel">Inner Template</label>

			<div class="row justify-content-start queryRow">
				<div class="col-10">
					<textarea class="form-control" id="innerTemplate" rows="5"></textarea>
				</div>
			</div>
			<button id="formsub" type="button" class="btn btn-primary">Update Template</button><span id="subsuccess" class="badge badge-success formSuccess invisible">Updated</span>
		</div>
		`;
	}

	js() {
		let loadEdit = (this.query.edit) ? `$("#templates").val("${this.query.edit}").change();` : false;

		return `
		let fd;
		function init_sections_edit() {
			$("#templates").on("change",()=>{
				get({templateid:$("#templates").val()}, "gettemplatebyid", (res)=>{
					console.log(res);
					let data = res.data;

					fd = data;

					switch(data.type) {
						case "content":

							break;
					}

					$("#wrapperTemplate").prop("disabled",(data.type != "dynamic"));
					$("#innerTemplate").prop("disabled",(data.type != "dynamic"));
					$("#sectionTitleText").prop("disabled",(data.type != "dynamic"));

					$("#sectionTitleText").val(data.title);
					$("#sectionEnabled").prop("checked",data.enabled);
					$("#mainTemplate").val(data.template);
					$("#wrapperTemplate").val(data.wrapper);
					$("#innerTemplate").val(data.inner);

					if(data.type !== "dynamic") {
						$("#wrapperTemplate").val("Not used for this template type");
						$("#innerTemplate").val("Not used for this template type");
						$("#sectionTitleText").val("Not used for this template type");
					}
				});
			});

			${loadEdit}

			$("#formsub").on("click",(e)=>{
				let payload = {
					enabled: $("#sectionEnabled").is(":checked"),
					id: $("#templates").val(),
					title: (fd.type !== "dynamic") ? '':$("#sectionTitleText").val(),
					template: $("#mainTemplate").val(),
					wrapper: (fd.type !== "dynamic") ? '':$("#wrapperTemplate").val(),
					inner: (fd.type !== "dynamic") ? '':$("#innerTemplate").val()
				};

				$.ajax({
					type: "POST",
					url: "${constants.PATHS.UI_BASE_API}settemplatebyid",
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

		function get(payload, url, cb) {
			$.ajax({
				type: "GET",
				url: "${constants.PATHS.UI_BASE_API_GET}" + url,
				data: payload,
				contentType: "application/json",
				dataType: "json"
			}).done((data)=>{
				cb(data);
			});
		}

		$(document).ready(() => {
			init_sections_edit();
		});
		`;
	}
}

exports.SectionsEdit = SectionsEdit;