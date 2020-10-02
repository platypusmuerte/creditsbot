const { constants } = require('../../constants');
const { BodyBase } = require("./body.base");

/**
 * Colors page
 */
class TemplateColors extends BodyBase {
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

		return `
		<script>${this.js()}</script>
		<div class="jumbotron homeBanner">
			<h1 class="display-4">Template Colors</h1>
			<p class="lead">Colors for text, headings, dividers, etc</p>
			<hr class="my-4">
			<p>These can be overridden in the custom CSS section</p>

			<label class="formLabel">Text Colors</label>

			<div class="row justify-content-start queryRow">

				<div class="col-auto">
					<label class="colorPickerLabel">Title</label>
					<input type="text" class="form-control colorPickerInput" value="${this.data.title}" data-setting="title"><p class="colorValueLabel">${this.data.title}</p>
				</div>

				<div class="col-auto">
					<label class="colorPickerLabel">Sub Title</label>
					<input type="text" class="form-control colorPickerInput" value="${this.data.subtitle}" data-setting="subtitle"><p class="colorValueLabel">${this.data.subtitle}</p>
				</div>	

				<div class="col-auto">
					<label class="colorPickerLabel">Section Titles</label>
					<input type="text" class="form-control colorPickerInput" value="${this.data.sectiontitle}" data-setting="sectiontitle"><p class="colorValueLabel">${this.data.sectiontitle}</p>
				</div>			

				<div class="col-auto">
					<label class="colorPickerLabel">Text Color</label>
					<input type="text" class="form-control colorPickerInput" value="${this.data.textcolor}" data-setting="textcolor"><p class="colorValueLabel">${this.data.textcolor}</p>
				</div>			

				<div class="col-auto">
					<label class="colorPickerLabel">Amount Text Color</label>
					<input type="text" class="form-control colorPickerInput" value="${this.data.amountcolor}" data-setting="amountcolor"><p class="colorValueLabel">${this.data.amountcolor}</p>
				</div>			

				<div class="col-auto">
					<label class="colorPickerLabel">Total Text Color</label>
					<input type="text" class="form-control colorPickerInput" value="${this.data.totalcolor}" data-setting="totalcolor"><p class="colorValueLabel">${this.data.totalcolor}</p>
				</div>
			</div>

			<label class="formLabel">Border Colors</label>

			<div class="row justify-content-start queryRow">
				<div class="col-auto">
					<label class="colorPickerLabel">Section Border Color</label>
					<input type="text" class="form-control colorPickerInput" value="${this.data.sectionborder}" data-setting="sectionborder"><p class="colorValueLabel">${this.data.sectionborder}</p>
				</div>
			</div>

			<label class="formLabel">Background Colors</label>

			<div class="row justify-content-start queryRow">
				<div class="col-auto">
					<label class="colorPickerLabel">Page Background</label>
					<input type="text" class="form-control colorPickerInput" value="${this.data.background}" data-setting="background"><p class="colorValueLabel">${this.data.background}</p>
				</div>
			</div>	
		</div>
		`;
	}

	/**
	* Page js
	* 		send colors to update the db
	*/
	js() {
		return `
		function init_template_colors() {
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
				change: setColors
			  });
		}

		function setColors() {
			let payload = {};
			
			$(".colorPickerInput").each((i,el)=>{
				payload[$(el).attr("data-setting")] = $(el).val();
			});

			$.ajax({
				type: "POST",
				url: "${constants.PATHS.UI_BASE_API}settemplatecolors",
				data: JSON.stringify(payload),
				contentType: "application/json",
				dataType: "json"
			}).done((data)=>{
				
			});
		}

		$(document).ready(() => {
			init_template_colors();
		});
		`;
	}
}

exports.TemplateColors = TemplateColors;