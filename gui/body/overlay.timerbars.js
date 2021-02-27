const { constants } = require('../../constants');
const { BodyBase } = require("./body.base");
const { codemirrorincludes } = require("../libs/codemirror/includes");

/**
 * Custom css page
 */
class OverlayTimerBars extends BodyBase {
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

		let allOpts = `<option value="---">Choose Timer</option><option value="addnew">New Timer</option>`;

		this.data.timerbars.forEach((t)=>{
			allOpts += `<option value="${t.value}">${t.label}</option>`;
		});

		return `
		${codemirrorincludes}
		<script>${this.js()}</script>
		<div class="jumbotron homeBanner">
			<h1 class="display-4">Timer Bar Overlays</h1>
			<p class="lead">Customizable timer bars</p>
			<hr class="my-4">
			<p>Edit, create and delete customizable timer bars for things like StreamLoots cards.</p>
			<p>Transitions are available at
			<ul>
				<li>View: http://localhost:${this.userArgs.PORT}${constants.PATHS.OVERLAY}</li>
				<li>Trigger: http://localhost:${this.userArgs.PORT}/trigger/timerbars/KEY (replace KEY with your timer bar key)</li>
			</ul></p>
			
			${this.tabsHeader()}
			<div class="tab-content guiTabBody" id="nav-tabContent">
				${this.tab_basic(allOpts)}
				${this.tab_adv()}
			</div>

			
		</div>
		
		`;
	}

	tabsHeader() {
		return `
		<nav>
			<div class="nav nav-tabs pageTabs" id="nav-tab" role="tablist">
				<a class="nav-link active" id="nav-basic-tab" data-toggle="tab" href="#nav-basic" role="tab" aria-controls="nav-basic" aria-selected="true">Timer Bars</a>
				<a class="nav-link" id="nav-adv-tab" data-toggle="tab" href="#nav-adv" role="tab" aria-controls="nav-adv" aria-selected="false">Custom CSS</a>
			</div>
		</nav>
		`;
	}

	tab_basic(allOpts) {
		return `<div class="tab-pane fade show active" id="nav-basic" role="tabpanel" aria-labelledby="nav-basic-tab">
		<label class="formLabel">Select Timer</label>

		<div class="row justify-content-start queryRow">
			<div class="col-2">
				<select class="form-control templateDD" id="timerDD">${allOpts}</select>
			</div>
			<div class="col-5">
				<button id="testOverlay" type="button" class="btn btn-primary btn-sm" disabled>Send Test</button>
			</div>
		</div>

		<div class="row justify-content-start queryRow">
			<div class="col-2">
				<label class="formLabel" for="timerbarName">Label: </label>
				<input type="text" class="form-control timerbarInput" id="timerbarName" value="" placeholder="Label text" disabled>
			</div>
			<div class="col-2">
				<label class="formLabel" for="timerbarKey">Key: </label>
				<input type="text" class="form-control timerbarInput" id="timerbarKey" value="" placeholder="alphanumeric, no spaces" disabled>
			</div>
			<div class="col-2">
				<label class="formLabel" for="timerbarTime">Duration: </label>
				<input type="text" class="form-control timerbarInput" id="timerbarTime" value="" placeholder="number of seconds" disabled>
			</div>
		</div>

		<div class="row justify-content-start queryRow">
			<div class="col-auto">
				<label class="colorPickerLabel">Text</label>
				<input type="text" class="form-control colorPickerInput" value="#ffffff" data-setting="color"><p class="colorValueLabel">#ffffff</p>
			</div>

			<div class="col-auto">
				<label class="colorPickerLabel">Background</label>
				<input type="text" class="form-control colorPickerInput" value="#ff9900" data-setting="background"><p class="colorValueLabel">#ff9900</p>
			</div>	

			<div class="col-auto">
				<label class="colorPickerLabel">Fill</label>
				<input type="text" class="form-control colorPickerInput" value="#297bd6" data-setting="fill"><p class="colorValueLabel">#297bd6</p>
			</div>
		</div>

		<button id="formsub" type="button" class="btn btn-primary" disabled>Submit</button>
		<button id="delete" type="button" class="btn btn-danger" disabled>Delete Timer Bar</button>
		<span id="subsuccess" class="badge badge-success formSuccess invisible">Success</span>
		</div>`;
	}

	tab_adv() {
		return `<div class="tab-pane fade show" id="nav-adv" role="tabpanel" aria-labelledby="nav-adv-tab">
			<div class="row justify-content-start queryRow">
				<div class="col-10 cmEditorSM">
					<textarea class="form-control" id="cssContent" rows="8">${this.data.customcss}</textarea>
				</div>
			</div>

			<button id="advformsub" type="button" class="btn btn-primary">Submit</button>
			<span id="advsubsuccess" class="badge badge-success formSuccess invisible">Success</span>
		</div>`;
	}

	/**
	* Page js
	* 		updates custom css db
	*/
	js() {
		return `
		function init_overlay_timerbars() {
			let cssTA = initCodeMirror({textarea: $("#cssContent")[0], mode: "css", refresh: true});
			initColorPickers();

			$("#timerDD").on("change",()=>{
				if($("#timerDD").val() === "addnew") {
					$(".timerbarInput").prop("disabled",false);
					$("#testOverlay,#formsub,#delete").prop("disabled",true);
					$("#timerbarTime").val(300);
					$("#timerbarName,#timerbarKey").val("");
				} else if($("#timerDD").val() !== "---") {
					$.ajax({
						type: "GET",
						url: "${constants.PATHS.UI_BASE_API_GET}gettimerbars",
						data: {timerbarkey:$("#timerDD").val()},
						contentType: "application/json",
						dataType: "json"
					}).done((data)=>{
						$(".timerbarInput,#testOverlay,#formsub,#delete").prop("disabled",false);
						$("#timerbarName").val(data.label);
						$("#timerbarKey").val($("#timerDD").val());
						$("#timerbarTime").val(data.time);

						$($(".colorPickerInput")[0]).val(data.color);
						$($(".colorPickerInput")[1]).val(data.background);
						$($(".colorPickerInput")[2]).val(data.fill);

						$($(".colorValueLabel")[0]).html(data.color);
						$($(".colorValueLabel")[1]).html(data.background);
						$($(".colorValueLabel")[2]).html(data.fill);

						initColorPickers()
					});
				}
			});

			$(".timerbarInput").on("keyup paste",()=>{
				let err = false;

				$.find(".timerbarInput").forEach((field)=>{
					if($(field).val().length < 1) {
						err = true;
					}
				});

				$("#formsub").prop("disabled",err);
			});

			$("#formsub").on("click",(e)=>{
				if($("#timerDD").val() !== "---") {
					let payload = {
						label: $("#timerbarName").val(),
						key: ($("#timerDD").val() === "addnew") ? $("#timerbarKey").val():$("#timerDD").val(),
						time: $("#timerbarTime").val()
					};

					$(".colorPickerInput").each((i,el)=>{
						payload[$(el).attr("data-setting")] = $(el).val();
					});

					if($("#timerDD").val() === "addnew") {
						post(payload, "newtimerbar");
					} else {
						post(payload, "settimerbarbykey");
					}
				}
			});

			$("#delete").on("click",(e)=>{
				if($("#timerDD").val() !== "---" && $("#timerDD").val() !== "addnew") {
					deleteTimerbar();
				}
			});

			$("#testOverlay").on("click",()=>{
				if($("#timerDD").val() !== "---" && $("#timerDD").val() !== "addnew") {
					$.ajax({
						type: "POST",
						url: "${constants.PATHS.UI_BASE_API}testtimerbar",
						data: JSON.stringify({"target":$("#timerDD").val()}),
						contentType: "application/json",
						dataType: "json"
					}).done((data)=>{
						
					});
				}
			});
			
			$("#advformsub").on("click",(e)=>{
				let payload = {
					customcss: $("#cssContent").val()
				};

				post(payload, "timerbarcustcss", true);
			});
		}

		function initColorPickers() {
			$(".colorPickerInput").each((i,el)=>{
				makeSpectrum(el);
			});
		}

		function makeSpectrum(el) {
			$(el).spectrum({
				type: "color",
				showPalette: false,
				showInput: true,
				showAlpha: true,
				showButtons: false,
				allowEmpty: false,
				preferredFormat: "hex8",
				move: (color)=>{
					$(el).siblings(".colorValueLabel").html(color.toHex8String());
				},
				change: colorChanged
			  });
		}

		function colorChanged() {

		}

		function post(payload, url, adv) {
			$.ajax({
				type: "POST",
				url: "${constants.PATHS.UI_BASE_API}" + url,
				data: JSON.stringify(payload),
				contentType: "application/json",
				dataType: "json"
			}).done((data)=>{
				let prefix = (adv) ? "adv":"";
				$("#"+prefix+"subsuccess").removeClass("invisible").addClass("visible");
				setTimeout(()=>{
					$("#"+prefix+"subsuccess").removeClass("visible").addClass("invisible");
				},3000);
				
				if(!adv && $("#timerDD").val() === "addnew") {
					location.href = "/ui/overlay/timerbars";
				}
			});
		}

		function deleteTimerbar() {
			$.ajax({
				type: "POST",
				url: "${constants.PATHS.UI_BASE_API}deletetimerbar",
				data: JSON.stringify({key: $("#timerDD").val()}),
				contentType: "application/json",
				dataType: "json"
			}).done((data)=>{
				$("#subsuccess").removeClass("invisible").addClass("visible");
				setTimeout(()=>{
					$("#subsuccess").removeClass("visible").addClass("invisible");
				},3000);
				
				location.href = "/ui/overlay/timerbars";
			});
		}

		$(document).ready(() => {
			init_overlay_timerbars();
		});
		`;
	}

}

exports.OverlayTimerBars = OverlayTimerBars;