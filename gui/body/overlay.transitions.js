const { constants } = require('../../constants');
const { BodyBase } = require("./body.base");
const { codemirrorincludes } = require("../libs/codemirror/includes");
const { modal_editor_single_lg } = require("../modals/editor.single.lg");

/**
 * Custom css page
 */
class OverlayTransitions extends BodyBase {
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

		let allOpts = `<option value="---">Choose Transition</option><option value="addnew">New Transition</option>`;

		this.data.forEach((t)=>{
			let defOptCSS = (t.isdefault) ? ` class="defTransitionOpt"`:``;
			allOpts += `<option value="${t.value}"${defOptCSS}>${t.label}</option>`;
		});

		return `
		${codemirrorincludes}
		<script>${this.js()}</script>
		<div class="jumbotron homeBanner">
			<h1 class="display-4">Scene Transition Overlays</h1>
			<p class="lead">Customizable scene transitions</p>
			<hr class="my-4">
			<p>Edit, create and delete customizable scene transitions</p>
			<p>Transitions are available at
			<ul>
				<li>View: http://localhost:${this.userArgs.PORT}${constants.PATHS.TRANSITIONS}</li>
				<li>Trigger: http://localhost:${this.userArgs.PORT}${constants.PATHS.TRANSITION_TRIGGER}</li>
			</ul></p>
			
			<label class="formLabel">Select Transition</label>

			<div class="row justify-content-start queryRow">
				<div class="col-2">
					<select class="form-control templateDD" id="transitionDD">${allOpts}</select>
				</div>
				<div class="col-5">
					&nbsp;
				</div>
			</div>

			<div class="row justify-content-start queryRow">
				<div class="col-2">
					<label class="formLabel" for="transitionName">Name: </label>
					<input type="text" class="form-control" id="transitionName" value="" placeholder="friendly name" disabled>
				</div>
				<div class="col-2">
					<label class="formLabel" for="transitionKey">Key: </label>
					<input type="text" class="form-control" id="transitionKey" value="" placeholder="alphanumeric, no spaces" disabled>
				</div>
			</div>

			${this.tabsHeader()}
			<div class="tab-content guiTabBody" id="nav-tabContent">
				${this.tab_body()}
				${this.tab_css()}
				${this.tab_js()}
			</div>

			<button id="formsub" type="button" class="btn btn-primary" disabled>Submit</button>
			<button id="viewdefaults" type="button" class="btn btn-primary" data-toggle="modal" data-target="#modal_editor_single_lg" disabled>View Default</button>
			<button id="delete" type="button" class="btn btn-danger" disabled>Delete Transition</button>
			<span id="subsuccess" class="badge badge-success formSuccess invisible">Success</span>
		</div>
		${modal_editor_single_lg({textarea: ""})}
		`;
	}

	tabsHeader() {
		return `
		<nav>
			<div class="nav nav-tabs pageTabs" id="nav-tab" role="tablist">
				<a class="nav-link active" id="nav-body-tab" data-toggle="tab" href="#nav-body" role="tab" aria-controls="nav-body" aria-selected="true">Body</a>
				<a class="nav-link" id="nav-styles-tab" data-toggle="tab" href="#nav-styles" role="tab" aria-controls="nav-styles" aria-selected="false">CSS</a>
				<a class="nav-link" id="nav-scripts-tab" data-toggle="tab" href="#nav-scripts" role="tab" aria-controls="nav-scripts" aria-selected="false">JS</a>
				<div class="twitterTestBtnWrapper"><button id="testOverlay" type="button" class="btn btn-primary btn-sm">Send Test</button></div>
			</div>
		</nav>
		`;
	}

	tab_body() {
		return `<div class="tab-pane fade show active" id="nav-body" role="tabpanel" aria-labelledby="nav-body-tab">
			<div class="row justify-content-start queryRow">
				<div class="col-10 cmEditorMD">
					<textarea class="form-control" id="bodyContent" rows="8"></textarea>
				</div>
			</div>
		</div>`;
	}

	tab_css() {
		return `<div class="tab-pane fade" id="nav-styles" role="tabpanel" aria-labelledby="nav-styles-tab">
			<div class="row justify-content-start queryRow">
				<div class="col-10 cmEditorMD">
					<textarea class="form-control" id="cssContent" rows="8"></textarea>
				</div>
			</div>
		</div>`;
	}

	tab_js() {
		return `<div class="tab-pane fade" id="nav-scripts" role="tabpanel" aria-labelledby="nav-scripts-tab">
			<div class="row justify-content-start queryRow">
				<div class="col-10 cmEditorMD">
					<textarea class="form-control" id="jsContent" rows="8"></textarea>
				</div>
			</div>
		</div>`;
	}

	/**
	* Page js
	* 		updates custom css db
	*/
	js() {
		return `
		let bodyTA, cssTA, jsTA, defTA, currentTransition;

		function init_overlay_transitions() {
			bodyTA = initCodeMirror({textarea: $("#bodyContent")[0], mode: "htmlmixed", refresh: true});
			cssTA = initCodeMirror({textarea: $("#cssContent")[0], mode: "css", refresh: true});
			jsTA = initCodeMirror({textarea: $("#jsContent")[0], mode: "javascript", refresh: true});
			defTA = initCodeMirror({textarea: $("#modal_editor_single_lgTextArea")[0], mode: "htmlmixed", refresh: true});

			bodyTA.setOption("readOnly", true);
			cssTA.setOption("readOnly", true);
			jsTA.setOption("readOnly", true);
			defTA.setOption("readOnly", true);

			$("#transitionDD").on("change",()=>{
				if($("#transitionDD").val() === "addnew") {
					$("#transitionName").val("");
					$("#transitionKey").val("");

					bodyTA.setValue("");
					cssTA.setValue("");
					jsTA.setValue("");

					bodyTA.setOption("readOnly", false);
					cssTA.setOption("readOnly", false);
					jsTA.setOption("readOnly", false);

					$("#transitionName").prop("disabled",false);
					$("#transitionKey").prop("disabled",false);
					$("#formsub").prop("disabled",false);
					$("#delete").prop("disabled",true);
					$("#viewdefaults").prop("disabled", true);
				} else {
					$.ajax({
						type: "GET",
						url: "${constants.PATHS.UI_BASE_API_GET}gettransition",
						data: {transitionid:$("#transitionDD").val()},
						contentType: "application/json",
						dataType: "json"
					}).done((data)=>{
						currentTransition = data;

						$("#transitionName").val(currentTransition.name);
						$("#transitionKey").val(currentTransition.id);
						
						bodyTA.setValue(currentTransition.body);
						cssTA.setValue(currentTransition.css);
						jsTA.setValue(currentTransition.js);

						bodyTA.setOption("readOnly", false);
						cssTA.setOption("readOnly", false);
						jsTA.setOption("readOnly", false);

						let defBody = currentTransition.defaults ? currentTransition.defaults.body:"";

						swapTextAreaContent(defBody, "htmlmixed");

						$("#transitionName").prop("disabled",!!currentTransition.isdefault);
						$("#transitionKey").prop("disabled",!!currentTransition.isdefault);
						$("#formsub").prop("disabled",false);
						$("#delete").prop("disabled",!!currentTransition.isdefault);
						$("#viewdefaults").prop("disabled", !!!currentTransition.isdefault);
					});
				}				
			});

			$(".pageTabs a").on("click",(e)=>{
				if($("#transitionDD").val() !== "---" && $("#transitionDD").val() !== "addnew") {
					let defContent;

					switch($(e.target).attr("href").split("-")[1]) {
						case "body":
							defContent = currentTransition.defaults ? currentTransition.defaults.body:"";
							swapTextAreaContent(defContent, "htmlmixed");
						break;
						case "styles":
							defContent = currentTransition.defaults ? currentTransition.defaults.css:"";
							swapTextAreaContent(defContent, "css");
						break;
						case "scripts":
							defContent = currentTransition.defaults ? currentTransition.defaults.js:"";
							swapTextAreaContent(defContent, "javascript");
						break;
					}
				}
			});

			$("#testOverlay").on("click",()=>{
				if($("#transitionDD").val() !== "---" && $("#transitionDD").val() !== "addnew") {
					$.ajax({
						type: "POST",
						url: "${constants.PATHS.UI_BASE_API}testtransition",
						data: JSON.stringify({"target":$("#transitionDD").val()}),
						contentType: "application/json",
						dataType: "json"
					}).done((data)=>{
						
					});
				}
			});

			$("#formsub").on("click",(e)=>{
				let payload = {
					name: $("#transitionName").val(),
					id: $("#transitionKey").val(),
					body: $("#bodyContent").val(),
					css: $("#cssContent").val(),
					js: $("#jsContent").val()
				};

				if($("#transitionDD").val() === "addnew") {
					post(payload, "newtransition");
				} else {
					post(payload, "settransitionbyid");
				}
			});

			$("#delete").on("click",(e)=>{
				if($("#transitionDD").val() !== "---" && $("#transitionDD").val() !== "addnew" && !$($("#transitionDD").find("option:selected")[0]).hasClass("defTransitionOpt")) {
					deleteTransition();
				}
			});
		}

		function swapTextAreaContent(data, mode) {
			defTA.toTextArea();
			defTA = initCodeMirror({textarea: $("#modal_editor_single_lgTextArea")[0], mode: mode, refresh: true});
			defTA.setValue(data);
			defTA.setOption("readOnly", true);			
		}

		function post(payload, url) {
			$.ajax({
				type: "POST",
				url: "${constants.PATHS.UI_BASE_API}" + url,
				data: JSON.stringify(payload),
				contentType: "application/json",
				dataType: "json"
			}).done((data)=>{
				$("#subsuccess").removeClass("invisible").addClass("visible");
				setTimeout(()=>{
					$("#subsuccess").removeClass("visible").addClass("invisible");
				},3000);
				
				if($("#transitionDD").val() === "addnew") {
					location.href = "/ui/overlay/transitions";
				}
			});
		}

		function deleteTransition() {
			$.ajax({
				type: "POST",
				url: "${constants.PATHS.UI_BASE_API}deletetransition",
				data: JSON.stringify({id: $("#transitionDD").val()}),
				contentType: "application/json",
				dataType: "json"
			}).done((data)=>{
				$("#subsuccess").removeClass("invisible").addClass("visible");
				setTimeout(()=>{
					$("#subsuccess").removeClass("visible").addClass("invisible");
				},3000);
				
				location.href = "/ui/overlay/transitions";
			});
		}

		$(document).ready(() => {
			init_overlay_transitions();
		});
		`;
	}

}

exports.OverlayTransitions = OverlayTransitions;