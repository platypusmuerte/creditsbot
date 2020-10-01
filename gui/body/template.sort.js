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
	* Create the page body
	* @param {mixed} qData db query data
	*/
	render(qData) {
		this.data = qData;
		let list = '';
		
		Object.entries(this.data.templates).forEach(([k,t])=>{
			let title = t.title;//(t.type === "dynamic") ? t.title : t.id.replace(/_/g, " ");
			let enabled = (t.enabled) ? '<span class="sectionEnabledLabel">Enabled</span>' :'<span class="sectionDisabledLabel">Disabled</span>';
			let db = (t.key) ? '<span class="sectionDBLabel">Database: ' + t.key + '</span>':'';
			let sectionKey = '<span class="sectionKey">Template: ' + t.id.replace(/_/g, " ") + '</span>';
			let editLink = `<span class="sectionDragEdit"><a href="${constants.GUI_DIRS.BASE_WEB_PATH}template/edit?edit=${t.id}">edit</a></span>`;

			list += `<li class="list-group-item sectionDraggable" data-sectionkey="${t.id}">
				<div class="dragSectionIcon"><span class="ui-icon ui-icon-arrowthick-2-n-s"></span></div>
				<div class="dragSectionBody">
					<h5 class="dragSectionTitle">${title}</h5>
					<h6 class="card-subtitle mb-2 text-muted">${enabled}${sectionKey}${db}${editLink}</h6>
				</div>
			</li>`;
		});

		return `
		<script>${this.js()}</script>
		<div class="jumbotron homeBanner">
			<h1 class="display-4">Manage Credits Section Order</h1>
			<p class="lead">Drag to change the sort order of your credits sections.</p>
			<hr class="my-4">
			
			<div class="row justify-content-start queryRow">
				<div class="col-7">
					<ul class="list-group" id="sortList">
						${list}
					</ul>
				</div>
				<div class="col-2">
					
				</div>
			</div>
		</div>
		`;
	}

	/**
	* Page js
	* 		creates a sortable and sends an array of the full sort when sort completes
	*/
	js() {
		return `
		let fd;
		function init_template_sort() {
			$("#sortList").sortable({
				axis: "y",
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
						

						/*$("#subsuccess").removeClass("invisible").addClass("visible");
						setTimeout(()=>{
							$("#subsuccess").removeClass("visible").addClass("invisible");
						},3000);*/
					});
				}
			});
    		$("#sortList").disableSelection();
		}

		function post(payload) {
			
		}

		$(document).ready(() => {
			init_template_sort();
		});
		`;
	}
}

exports.TemplateSort = TemplateSort;