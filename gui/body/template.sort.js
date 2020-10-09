const { constants } = require('../../constants');
const { BodyBase } = require("./body.base");

/**
 * Sorting page
 */
class TemplateSort extends BodyBase {
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
	 * Make 3 sortables 
	 */
	createSortables() {
		let templates = Object.entries(this.data.templates);
		let chunk = Math.ceil(templates.length / 3);

		let upper = this.createSectionList(templates.slice(0,chunk));
		let middle = this.createSectionList(templates.slice(chunk,chunk*2));
		let lower = this.createSectionList(templates.slice(chunk*2));

		return {upper: upper, middle: middle, lower: lower};
	}

	createSectionList(data) {
		let list = '';

		data.forEach(([k,t])=>{
			let title = t.title;
			let db = (t.key) ? '<span class="sectionDBLabel">' + t.key + ' - </span>':'';
			let sectionKey = '<span class="sectionKey">' + t.id.replace(/_/g, " ") + '</span>';
			let editLink = `<span class="sectionDragEdit"><a href="${constants.GUI_DIRS.BASE_WEB_PATH}template/edit?edit=${t.id}"><i class="material-icons">settings</i></a></span>`;

			let off = (t.enabled) ? ` style="display: none;"`:``;
			let on = (t.enabled) ? ``:` style="display: none;"`;

			let toggleLink = `<span class="sectionToggle sectionToggleIsOff"${off}><i class="material-icons">toggle_off</i></span><span class="sectionToggle sectionToggleIsOn"${on}><i class="material-icons">toggle_on</i></span>`;
			
			list += `<li class="list-group-item sectionDraggable" data-sectionkey="${t.id}">
				<div class="dragSectionIcon"><span class="material-icons">drag_indicator</span></div>
				<div class="dragSectionOnOff">${toggleLink}</div>
				<div class="dragSectionBody">
					<div class="dragSectionTitle">${title}</div>
					<div class="dragSectionDesc text-muted">${db}${sectionKey}</div>
				</div>
				<div class="dragSectionEditIcon"> ${editLink}</div>
			</li>`;
		});

		return list;
	}

	/**
	* Create the page body
	* @param {mixed} qData db query data
	*/
	render(qData) {
		this.data = qData;

		let newList = this.createSortables();		

		return `
		<script>${this.js()}</script>
		<div class="jumbotron homeBanner">
			<h1 class="display-4">Manage Credits Section Order</h1>
			<p class="lead">Drag to change the sort order of your credits sections.</p>
			<hr class="my-4">
			<p>Drag sections within and between groups. Groups are loaded in order from upper to middle, to lower.<p>

			<p>Disabled sections: 
				<span id="disabledHidden" class="material-icons allSectionToggleIsOff" style="display: none;">visibility</span>
				<span id="disabledVisible" class="material-icons allSectionToggleIsOn">visibility</span>
			</p>

			<div class="row justify-content-start queryRow">
				<div class="col-4">
					<label class="formLabel">Upper Group</label>
					<ul class="list-group" id="sortListUpper">
						${newList.upper}
					</ul>
				</div>
				<div class="col-4">
					<label class="formLabel">Middle Group</label>
					<ul class="list-group" id="sortListMiddle">
						${newList.middle}
					</ul>
				</div>
				<div class="col-4">
					<label class="formLabel">Lower Group</label>
					<ul class="list-group" id="sortListLower">
						${newList.lower}
					</ul>
				</div>
			</div>
		</div>
		`;
	}

	/**
	* Page js
	* 		- creates a sortable and sends an array of the full sort when sort completes
			- toggles enabled state
			- links to edit view
	*/
	js() {
		return `
		function sendSectionState(data) {
			$.ajax({
				type: "POST",
				url: "${constants.PATHS.UI_BASE_API}setsectionenabled",
				data: JSON.stringify(data),
				contentType: "application/json",
				dataType: "json"
			});
		}

		function init_template_sort() {
			$("#disabledHidden").on("click",()=>{
				$("#disabledHidden").hide();
				$("#disabledVisible").show();
				$(".sectionToggleIsOff").find(":hidden").parents("li").show();
			});
			
			$("#disabledVisible").on("click",()=>{
				$("#disabledVisible").hide();
				$("#disabledHidden").show();
				$(".sectionToggleIsOff").find(":visible").parents("li").hide();
			});

			$(".sectionToggle").on("click",(e)=>{
				let target = ($(e.target).hasClass("material-icons")) ? $(e.target).parent():$(e.target);
				let enabled = false;

				if(target.hasClass("sectionToggleIsOn")) {
					enabled = false;
					target.parents(".dragSectionOnOff").find(".sectionToggleIsOff").show();
					target.hide();
				} else {
					enabled = true;
					target.parents(".dragSectionOnOff").find(".sectionToggleIsOn").show();
					target.hide();
				}

				let sectionKey = target.parents("li").attr("data-sectionkey");

				sendSectionState({id: sectionKey, enabled: enabled});
			});

			$("#sortListUpper,#sortListMiddle,#sortListLower").sortable({
				connectWith: ".list-group",
				stop: (event, ui)=>{
					let sortOrder = [];
					$(".sectionDraggable").each((i,el)=>{
						sortOrder.push($(el).attr("data-sectionkey"));
					});

					$.ajax({
						type: "POST",
						url: "${constants.PATHS.UI_BASE_API}setsectionsortorder",
						data: JSON.stringify(sortOrder),
						contentType: "application/json",
						dataType: "json"
					}).done((data)=>{
						ui.item.css("backgroundColor","#0ddb44");
						setTimeout(()=>{
							ui.item.css("backgroundColor","#fff");
						},300);
					});
				}
			});

    		$("#sortListUpper,#sortListMiddle,#sortListLower").disableSelection();
		}

		$(document).ready(() => {
			init_template_sort();
		});
		`;
	}
}

exports.TemplateSort = TemplateSort;