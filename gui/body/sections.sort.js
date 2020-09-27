const { constants } = require('../../constants');
const { BodyBase } = require("./body.base");

class SectionsSort extends BodyBase {
	constructor(params) {
		super();
		this.utils = params.utils;
		this.db = params.db;
		this.dataDir = params.dataDir;
		this.userArgs = params.userArgs;
		this.page = params.page;
		this.subPage = params.subpage;
		this.data;
	}

	render(qData) {
		this.data = qData;
		let list = '';
		
		Object.entries(this.data.templates).forEach(([k,t])=>{
			let title = t.title;//(t.type === "dynamic") ? t.title : t.id.replace(/_/g, " ");
			let enabled = (t.enabled) ? '<span class="sectionEnabledLabel">Enabled</span>' :'<span class="sectionDisabledLabel">Disabled</span>';
			let db = (t.key) ? '<span class="sectionDBLabel">Database: ' + t.key + '</span>':'';
			let sectionKey = '<span class="sectionKey">Template: ' + t.id.replace(/_/g, " ") + '</span>';
			let editLink = `<span class="sectionDragEdit"><a href="${constants.GUI_DIRS.BASE_WEB_PATH}sections/edit?edit=${t.id}">edit</a></span>`;

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

			<button id="formsub" type="button" class="btn btn-primary">Update Template</button><span id="subsuccess" class="badge badge-success formSuccess invisible">Updated</span>
		</div>
		`;
	}

	js() {
		return `
		let fd;
		function init_sections_sort() {
			$("#sortList").sortable({
				axis: "y"
			});
    		$("#sortList").disableSelection();

			$("#formsub").on("click",(e)=>{
				let sortOrder = [];
				$(".sectionDraggable").each((i,el)=>{
					sortOrder.push($(el).attr("data-sectionkey"));
				});

				post(sortOrder);
			});
		}

		function post(payload) {
			$.ajax({
					type: "POST",
					url: "${constants.PATHS.UI_BASE_API}setsectionsortorder",
					data: JSON.stringify(payload),
					contentType: "application/json",
					dataType: "json"
				}).done((data)=>{
					$("#subsuccess").removeClass("invisible").addClass("visible");
					setTimeout(()=>{
						$("#subsuccess").removeClass("visible").addClass("invisible");
					},3000);
				});
		}

		$(document).ready(() => {
			init_sections_sort();
		});
		`;
	}
}

exports.SectionsSort = SectionsSort;