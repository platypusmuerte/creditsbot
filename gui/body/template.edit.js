const { constants } = require('../../constants');
const { BodyBase } = require("./body.base");
const { codemirrorincludes } = require("../libs/codemirror/includes");
const { modal_editor_triple_md_sm_sm } = require("../modals/editor.triple.md.sm.sm");

/**
 * Edit templates page
 */
class TemplateEdit extends BodyBase {
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
		this.query = params.query;
		this.data;
	}

	/**
	* Create the page body
	* @param {mixed} qData db query data
	*/
	render(qData) {
		this.data = qData;
		let dynOpts = '';
		let contentOpts = '';
		let staticOpts = '';
		let customOpts = '';
		let dividerDyn = '<option class="disabledOpt" value="---" disabled>Dynamic Sections</option>';
		let dividerStatic = '<option class="disabledOpt" value="---" disabled>Static Sections</option>';
		let dividerContent = '<option class="disabledOpt" value="---" disabled>Content Sections</option>';
		let dividerCustom = '<option class="disabledOpt" value="---" disabled>Custom Sections</option>';
		
		this.data.forEach((ct)=>{
			let css = (ct.enabled) ? '':' class="templateDisabled"';

			if(ct.type === "dynamic") {
				dynOpts += '<option' + css + ' data-type="' + ct.type + '" value="' + ct.id + '">&nbsp;&nbsp;&nbsp;' + ct.id.replace(/_/g, " ") + '</option>';
			} else if(ct.type === "content") {
				contentOpts += '<option' + css + ' data-type="' + ct.type + '" value="' + ct.id + '">&nbsp;&nbsp;&nbsp;' + ct.id.replace(/_/g, " ") + '</option>';
			} else if(ct.type === "static") {
				staticOpts += '<option' + css + ' data-type="' + ct.type + '" value="' + ct.id + '">&nbsp;&nbsp;&nbsp;' + ct.id.replace(/_/g, " ") + '</option>';
			} else if (ct.type === "custom") {
				let optText = (ct.title.length) ? ct.title:ct.id.replace(/_/g, " ");
				customOpts += '<option' + css + ' data-type="' + ct.type + '" value="' + ct.id + '">&nbsp;&nbsp;&nbsp;' + optText + '</option>';
			}
		});

		let customOptStr = (customOpts.length) ? dividerCustom + customOpts:'';
		let allOpts = '<option value="---">Choose Template</option><option value="addnew">New Template</option>' + customOptStr + dividerStatic + staticOpts + dividerContent + contentOpts + dividerDyn + dynOpts;

		return `
		${codemirrorincludes}
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
				<div class="col-10 cmEditorVSM">
					<textarea class="form-control" id="mainTemplate" rows="8"></textarea>
				</div>
			</div>

			<label class="formLabel">Wrapper Template</label>

			<div class="row justify-content-start queryRow">
				<div class="col-10 cmEditorXSM">
					<textarea class="form-control" id="wrapperTemplate" rows="2"></textarea>
				</div>
			</div>

			<label class="formLabel">Inner Template</label>

			<div class="row justify-content-start queryRow">
				<div class="col-10 cmEditorXSM">
					<textarea class="form-control" id="innerTemplate" rows="5"></textarea>
				</div>
			</div>
			<button id="formsub" type="button" class="btn btn-primary">Submit Template</button>
			<button id="viewdefaults" type="button" class="btn btn-primary" data-toggle="modal" data-target="#modal_editor_triple_md_sm_sm">View Defaults</button>
			<button id="delete" type="button" class="btn btn-danger invisible">Delete Template</button><span id="subsuccess" class="badge badge-success formSuccess invisible">Updated</span>
		</div>
		${modal_editor_triple_md_sm_sm({input1: "", textarea1: "", textarea2: "", textarea3: ""})}
		`;
	}

	/**
	* Page js
	* 		adds a new template or updates an existing one
	*/
	js() {
		let loadEdit = (this.query.edit) ? `$("#templates").val("${this.query.edit}").change();` : false;

		return `
		// form data obj
		let fd;
		let notUsedStr = "Not used for this template type";

		function init_template_edit() {
			let cmMain = initCodeMirror({textarea: $("#mainTemplate")[0], mode: "htmlmixed"});
			let cmWrapper = initCodeMirror({textarea: $("#wrapperTemplate")[0], mode: "htmlmixed"});
			let cmInner = initCodeMirror({textarea: $("#innerTemplate")[0], mode: "htmlmixed"});

			let cmMaind = initCodeMirror({textarea: $("#modal_editor_single_lgTextArea1")[0], mode: "htmlmixed", refresh: true});
			let cmWrapperd = initCodeMirror({textarea: $("#modal_editor_single_lgTextArea2")[0], mode: "htmlmixed", refresh: true});
			let cmInnerd = initCodeMirror({textarea: $("#modal_editor_single_lgTextArea3")[0], mode: "htmlmixed", refresh: true});

			fd = {type: "custom"};

			$("#templates").on("change",()=>{
				$("#delete").removeClass("visible").addClass("invisible");
				$("#sectionTitleText").val("");
				$("#mainTemplate").val("");
				$("#wrapperTemplate").val("");
				$("#innerTemplate").val("");

				if($("#templates").val() !== "addnew") {
					// not adding new - fetch the tempalte data
					// enable/disable fields if they are used for this template type

					get({templateid:$("#templates").val()}, "gettemplatebyid", (res)=>{						
						let data = res.data;
						
						let noTitle = (data.type === "static" || data.type === "content");
						let singleTemplate = (data.type != "dynamic");

						if(data.type === "custom") {
							$("#delete").removeClass("invisible").addClass("visible");
						}

						// update obj w all data
						fd = data;

						$("#wrapperTemplate").prop("disabled",singleTemplate);
						cmWrapper.setOption("readOnly", singleTemplate);

						$("#innerTemplate").prop("disabled",singleTemplate);
						cmInner.setOption("readOnly", singleTemplate);

						$("#sectionTitleText").prop("disabled",noTitle);

						$("#sectionTitleText").val(data.title);
						$("#sectionEnabled").prop("checked",data.enabled);

						$("#mainTemplate").val(data.template);
						cmMain.setValue(data.template);

						$("#wrapperTemplate").val(data.wrapper);
						cmWrapper.setValue(data.wrapper);

						$("#innerTemplate").val(data.inner);
						cmInner.setValue(data.inner);

						if(noTitle) {							
							$("#sectionTitleText").val(notUsedStr);
						}

						if(singleTemplate) {
							$("#wrapperTemplate").val(notUsedStr);
							cmWrapper.setValue(notUsedStr);

							$("#innerTemplate").val(notUsedStr);
							cmInner.setValue(notUsedStr);
						}

						if(data.type !== "custom") {
							$("#viewdefaults").prop("disabled",false);
							$("#modal_input1").val(data.defaults.title);
							
							$("#modal_editor_single_lgTextArea1").val(data.defaults.template);
							cmMaind.setValue(data.defaults.template);

							$("#modal_editor_single_lgTextArea2").val(data.defaults.wrapper);
							cmWrapperd.setValue(data.defaults.wrapper);

							$("#modal_editor_single_lgTextArea3").val(data.defaults.inner);
							cmInnerd.setValue(data.defaults.inner);
						} else {							
							$("#viewdefaults").prop("disabled",true);
							cmMaind.setValue("");
							cmWrapperd.setValue("");
							cmInnerd.setValue("");
						}						
					});
				} else {
					$("#viewdefaults").prop("disabled",true);
					
					$("#wrapperTemplate").prop("disabled",true);
					$("#innerTemplate").prop("disabled",true);
					$("#sectionTitleText").prop("disabled",false);
					$("#wrapperTemplate").val(notUsedStr);
					$("#innerTemplate").val(notUsedStr);

					cmMain.setValue("");
					cmWrapper.setValue(notUsedStr);
					cmInner.setValue(notUsedStr);

					cmMaind.setValue("");
					cmWrapperd.setValue("");
					cmInnerd.setValue("");
				}

				
			});

			${loadEdit}

			$("#formsub").on("click",(e)=>{
				let noTitle = (fd.type === "static" || fd.type === "content");
				let singleTemplate = (fd.type != "dynamic");

				let payload = {
					enabled: $("#sectionEnabled").is(":checked"),
					id: $("#templates").val(),
					template: $("#mainTemplate").val(),
					wrapper: (singleTemplate) ? '':$("#wrapperTemplate").val(),
					inner: (singleTemplate) ? '':$("#innerTemplate").val()
				};

				if(!noTitle) {
					payload["title"] = $("#sectionTitleText").val();
				}

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
					
					if($("#templates").val() === "addnew") {
						location.href = "/ui/template/edit?edit=" + data.id;
					}
				});
			});

			$("#delete").on("click",(e)=>{
				$.ajax({
					type: "POST",
					url: "${constants.PATHS.UI_BASE_API}removeseectionbyid",
					data: JSON.stringify({id: $("#templates").val()}),
					contentType: "application/json",
					dataType: "json"
				}).done((data)=>{
					$("#subsuccess").removeClass("invisible").addClass("visible");
					setTimeout(()=>{
						$("#subsuccess").removeClass("visible").addClass("invisible");
					},3000);

					location.href = "/ui/template/edit";
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
			init_template_edit();
		});
		`;
	}
}

exports.TemplateEdit = TemplateEdit;