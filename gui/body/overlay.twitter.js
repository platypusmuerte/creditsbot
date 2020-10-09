const { constants } = require('../../constants');
const { BodyBase } = require("./body.base");
const { twitter } = require("../../defaults/twitter");
const { codemirrorincludes } = require("../libs/codemirror/includes");
const { modal_editor_double_sm_sm } = require("../modals/editor.double.sm.sm");
const { animatecss } = require("../../defaults/animatecss");

/**
 * Manage tweet alerts
 */
class OverlayTwitter extends BodyBase {
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
	* @property {string}	opts		all options for animations
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
		this.opts;
	}

	/**
	* Create the page body
	* @param {mixed} qData db query data
	*/
	render(qData) {
		this.data = qData;

		return `
		${codemirrorincludes}
		<script>${this.js()}</script>
		<div class="jumbotron homeBanner">
			<h1 class="display-4">Overlay Twitter Alerts</h1>
			<p class="lead">Show retweet events in an overlay</p>
			<hr class="my-4">

			${this.tabsHeader()}
			<div class="tab-content guiTabBody" id="nav-tabContent">
				${this.tab_settings()}
				${this.tab_template()}
				${this.tab_apikeys()}
			</div>

			<form>
				<button id="formsub" type="button" class="btn btn-primary">Submit</button>
				<button id="viewdefaults" type="button" class="btn btn-primary" data-toggle="modal" data-target="#modal_editor_double_sm_sm">View Default</button>
				<span id="subsuccess" class="badge badge-success formSuccess invisible">Updated</span>
			</form>
		</div>
		${modal_editor_double_sm_sm({textarea1: twitter.template, textarea2: twitter.css})}
		`;
	}

	tabsHeader() {
		return `
		<nav>
			<div class="nav nav-tabs pageTabs" id="nav-tab" role="tablist">
				<a class="nav-link active" id="nav-settings-tab" data-toggle="tab" href="#nav-settings" role="tab" aria-controls="nav-settings" aria-selected="true">Settings</a>
				<a class="nav-link" id="nav-template-tab" data-toggle="tab" href="#nav-template" role="tab" aria-controls="nav-template" aria-selected="false">Template</a>
				<a class="nav-link" id="nav-apikeys-tab" data-toggle="tab" href="#nav-apikeys" role="tab" aria-controls="nav-apikeys" aria-selected="false">API Keys</a>
			</div>
		</nav>
		`;
	}

	tab_settings() {
		let cbChecked = (this.data.enabled) ? ' checked="1"':'';

		return `
		<div class="tab-pane fade show active" id="nav-settings" role="tabpanel" aria-labelledby="nav-settings-tab">
			<label class="formLabel">Enable Tweet Alerts Overlay</label>

			<div class="row justify-content-start">
				<div class="col-3">
					<div class="form-group form-check">
						<input type="checkbox" class="form-check-input" id="alertEnabled"${cbChecked}>
						<label class="form-check-label" for="alertEnabled">Enabled</label>
					</div>
				</div>
			</div>

			<label class="formLabel">Watch for HashTag</label>

			<div class="row justify-content-start queryRow">
				<div class="col-3">
					<label class="colorPickerLabel" for="hashtag">Hash Tag: (a-z, 0-9, _, -, no spaces)</label>
					<input type="text" class="form-control" id="hashtag" value="${this.data.hashtag}" placeholder="Enter #poundsign here">
				</div>
			</div>

			<label class="formLabel">Overlay Sound</label>

			<div class="row justify-content-start queryRow">
				<div class="col-3">
					<label class="colorPickerLabel" for="soundfile">Select Sound: </label>
					<input type="text" class="form-control" id="soundfile" value="${this.data.soundfile}" placeholder="sound from usercontent dir">
				</div>
				<div class="col-2">
					<label class="colorPickerLabel" for="volume">Volume: </label>
					<div class="guiSliderWrapper">
						<input type="range" class="form-control-range guiSlider" id="volume" min="0" max="100" step="1" value="${this.data.volume*100}">
					</div>
				</div>
			</div>
		</div>
		`;
	}

	tab_template() {
		let opts = ['<option value="none">None</option>'];
		
		Object.entries(animatecss).forEach(([k,v])=>{
			opts.push(`<option class="disabledOpt" value="---" disabled>${k}</option>`);

			v.forEach((cssStr)=>{
				opts.push(`<option value="${cssStr}">&nbsp;&nbsp;&nbsp;${cssStr}</option>`);
			});
		});

		return `
		<div class="tab-pane fade" id="nav-template" role="tabpanel" aria-labelledby="nav-template-tab">
			<label class="formLabel">Overlay Alert Settings</label>

			<div class="row justify-content-start queryRow">
				<div class="col-1">
					<label class="colorPickerLabel" for="duration">Seconds:</label>
					<input type="text" class="form-control numberInput" id="duration" value="${this.data.duration}" placeholder="Number in seconds">
				</div>
				<div class="col-2">
					<label class="colorPickerLabel" for="animationEntrance">Entrance Animation:</label>
					<select class="form-control templateDD" id="animationEntrance">${opts}</select>
				</div>
				<div class="col-2">
					<label class="colorPickerLabel" for="animationVisible">Visible Animation:</label>
					<select class="form-control templateDD" id="animationVisible">${opts}</select>
				</div>
				<div class="col-2">
					<label class="colorPickerLabel" for="animationExit">Exit Animation:</label>
					<select class="form-control templateDD" id="animationExit">${opts}</select>
				</div>
				<div class="col-2">
					<label class="colorPickerLabel" for="screenPos">Screen Position:</label>
					<select class="form-control templateDD" id="screenPos">
						<option value="tl">Top Left</option>
						<option value="tc">Top Center</option>
						<option value="tr">Top Right</option>
						<option value="cl">Center Left</option>
						<option value="cc">Center Center</option>
						<option value="cr">Center Right</option>
						<option value="bl">Bottom Left</option>
						<option value="bc">Bottom Center</option>
						<option value="br">Bottom Right</option>
					</select>
				</div>
			</div>

			<label class="formLabel">Alert Template</label>

			<div class="row justify-content-start queryRow">
				<div class="col-10 cmEditorSM">
					<textarea class="form-control" id="alertTemplate" rows="8">${this.data.template}</textarea>
				</div>
			</div>

			<label class="formLabel">Alert Template CSS</label>

			<div class="row justify-content-start queryRow">
				<div class="col-10 cmEditorSM">
					<textarea class="form-control" id="alertCSS" rows="8">${this.data.css}</textarea>
				</div>
			</div>
		</div>
		`;
	}

	tab_apikeys() {
		return `
		<div class="tab-pane fade" id="nav-apikeys" role="tabpanel" aria-labelledby="nav-apikeys-tab">
			<label class="formLabel">Twitter Dev Account Keys</label>

			<div class="row justify-content-start queryRow">
				<div class="col-6">
					<label class="colorPickerLabel" for="apiKey">API Key:</label>
					<input type="password" class="form-control" id="apikey" value="${this.data.api_key}" placeholder="Enter api token here">
				</div>
			</div>
			
			<div class="row justify-content-start queryRow">
				<div class="col-6">
					<label class="colorPickerLabel" for="apisecret">API Secret:</label>
					<input type="password" class="form-control" id="apisecret" value="${this.data.api_secret}" placeholder="Enter api secret here">
				</div>
			</div>
			
			<div class="row justify-content-start queryRow">
				<div class="col-6">
					<label class="colorPickerLabel" for="accesskey">Access Key:</label>
					<input type="password" class="form-control" id="accesskey" value="${this.data.access_key}" placeholder="Enter access token here">
				</div>
			</div>
			
			<div class="row justify-content-start queryRow">
				<div class="col-6">
					<label class="colorPickerLabel" for="accesssecret">Access Secret:</label>
					<input type="password" class="form-control" id="accesssecret" value="${this.data.access_secret}" placeholder="Enter access secret here">
				</div>
			</div>
			
			<div class="row justify-content-start queryRow">
				<div class="col-6">
					<label class="colorPickerLabel" for="bearertoken">Bearer Token:</label>
					<input type="password" class="form-control" id="bearertoken" value="${this.data.bearer}" placeholder="Enter bearer token here">
				</div>
			</div>	
		</div>
		`;
	}

	/**
	* Page js
	* 		updates template
	*/
	js() {
		return `
		function init_template_page() {
			initCodeMirror({textarea: $("#alertTemplate")[0], mode: "htmlmixed", refresh: true});
			initCodeMirror({textarea: $("#alertCSS")[0], mode: "css", refresh: true});
			initCodeMirror({textarea: $("#modal_editor_double_sm_smTextArea1")[0], mode: "htmlmixed", refresh: true});
			initCodeMirror({textarea: $("#modal_editor_double_sm_smTextArea2")[0], mode: "css", refresh: true});

			$("#animationEntrance").val("${this.data.entrance}");
			$("#animationVisible").val("${this.data.visible}");
			$("#animationExit").val("${this.data.exit}");
			$("#screenPos").val("${this.data.screenpos}");

			$("#formsub").on("click",(e)=>{
				e.preventDefault();

				let duration = $("#duration").val().replace(/[^0-9]/gi,'');
				let durationSecs = (duration.length < 1) ? 1:duration*1;

				let payload = {
					enabled: $("#alertEnabled").is(":checked"),
					hashtag: $("#hashtag").val().replace(/[^a-z0-9_-]/gi,''),
					duration: durationSecs,
					template: $("#alertTemplate").val(),
					css: $("#alertCSS").val(),
					api_key: $("#apikey").val(),
					api_secret: $("#apisecret").val(),
					access_key: $("#accesskey").val(),
					access_secret: $("#accesssecret").val(),
					bearer: $("#bearertoken").val(),
					entrance: $("#animationEntrance").val(),
					visible: $("#animationVisible").val(),
					exit: $("#animationExit").val(),
					screenpos: $("#screenPos").val(),
					soundfile: $("#soundfile").val(),
					volume: $("#volume").val()*1 / 100
				};
				
				$.ajax({
					type: "POST",
					url: "${constants.PATHS.UI_BASE_API}setoverlaytwitter",
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

exports.OverlayTwitter = OverlayTwitter;