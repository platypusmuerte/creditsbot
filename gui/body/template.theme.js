const { constants } = require('../../constants');
const { BodyBase } = require("./body.base");

/**
 * theme page
 */
class TemplateTheme extends BodyBase {
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
		let opts = ``;

		this.data.forEach((theme)=>{
			let selected = (theme.active) ? ` selected="1"`:``;
			opts += `<option value="${theme.id}"${selected}>${theme.name}</option>`;
		});

		return `
		<script>${this.js()}</script>
		<div class="jumbotron homeBanner">
			<h1 class="display-4">Template Themes</h1>
			<p class="lead">Switch between themed credits</p>
			<hr class="my-4">
			<p>A theme contains all colors, templates, sorting, and CSS. Only the active theme is used for the credits.</p> 
			<label class="formLabel">Active Theme</label>

			<div class="row justify-content-start queryRow">
				<div class="col-2">
					<select class="form-control templateDD" id="themes">${opts}</select>
				</div>
				<div class="col-5">					
					<span id="changesuccess" class="badge badge-success formSuccess invisible">Changed</span>
					<span id="changefail" class="badge badge-warning formSuccess invisible">Failed</span>
				</div>
			</div>

			<label class="formLabel">Create A New Theme</label>

			<div class="row justify-content-start queryRow">
				<div class="col-2">
					<input type="text" class="form-control" id="newThemeName" placeholder="new theme name">
				</div>
				<div class="col-5">
					<button type="button" class="btn btn-primary mb-2" id="newThemeBtn">Create</button>
					<span id="newsuccess" class="badge badge-success formSuccess invisible">Created</span>
					<span id="newfail" class="badge badge-warning formSuccess invisible">Failed</span>
				</div>
			</div>

			<label class="formLabel">Duplicate A Theme</label>

			<div class="row justify-content-start queryRow">
				<div class="col-2">
					<select class="form-control templateDD" id="dupethemes">${opts}</select>
				</div>
				<div class="col-2">
					<input type="text" class="form-control" id="dupeThemeName" placeholder="new theme name">
				</div>
				<div class="col-5">
					<button type="button" class="btn btn-primary mb-2" id="dupeThemeBtn">Duplicate</button>
					<span id="dupesuccess" class="badge badge-success formSuccess invisible">Duplicated</span>
					<span id="dupefail" class="badge badge-warning formSuccess invisible">Failed</span>
				</div>
			</div>
		</div>
		`;
	}

	/**
	* Page js
	* 		
	*/
	js() {
		return `
		function init_data_test() {
			// add new theme
			$("#newThemeBtn").on("click",()=>{
				if($("#newThemeName").val().length) {
					post("addtheme", {name: $("#newThemeName").val()}, (data)=>{
						if(data.theme) {
							$("#newsuccess").removeClass("invisible").addClass("visible");
							setTimeout(()=>{
								$("#newsuccess").removeClass("visible").addClass("invisible");
							},3000);

							$("#newThemeName").val("");
							$("#themes").append($("<option>",{value: data.theme.id, text: data.theme.name}));
							$("#dupethemes").append($("<option>",{value: data.theme.id, text: data.theme.name}));
						} else {
							$("#newfail").removeClass("invisible").addClass("visible");
							setTimeout(()=>{
								$("#newfail").removeClass("visible").addClass("invisible");
							},3000);
						}						
					});
				}
			});

			// dupe a theme
			$("#dupeThemeBtn").on("click",()=>{
				if($("#dupeThemeName").val().length) {
					post("dupetheme", {name: $("#dupeThemeName").val(), of: $("#dupethemes").val()}, (data)=>{
						if(data.theme) {
							$("#dupesuccess").removeClass("invisible").addClass("visible");
							setTimeout(()=>{
								$("#dupesuccess").removeClass("visible").addClass("invisible");
							},3000);

							$("#dupeThemeName").val("");
							$("#themes").append($("<option>",{value: data.theme.id, text: data.theme.name}));
							$("#dupethemes").append($("<option>",{value: data.theme.id, text: data.theme.name}));
						} else {
							$("#dupefail").removeClass("invisible").addClass("visible");
							setTimeout(()=>{
								$("#dupefail").removeClass("visible").addClass("invisible");
							},3000);
						}						
					});
				}
			});

			// swap themes
			$("#themes").on("change",()=>{				
				post("changetheme", {id: $("#themes").val()}, (data)=>{					
					if(data.success) {
						$(".themeText").empty().append("Theme: " + $("#themes option:selected").text());
						$("#changesuccess").removeClass("invisible").addClass("visible");
						setTimeout(()=>{
							$("#changesuccess").removeClass("visible").addClass("invisible");							
						},3000);
					} else {
						$("#changefail").removeClass("invisible").addClass("visible");
						setTimeout(()=>{
							$("#changefail").removeClass("visible").addClass("invisible");
						},3000);
					}						
				});				
			});
		}

		function post(action, payload, cb) {
			$.ajax({
				type: "POST",
				url: "${constants.PATHS.UI_BASE_API}" + action,
				data: JSON.stringify(payload),
				contentType: "application/json",
				dataType: "json"
			}).done((data)=>{
				if(cb) {
					cb(data);
				}
			});
		}

		$(document).ready(() => {
			init_data_test();
		});
		`;
	}
}

exports.TemplateTheme = TemplateTheme;