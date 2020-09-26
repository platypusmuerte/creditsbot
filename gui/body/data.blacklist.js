const { constants } = require('../../constants');
const { BodyBase } = require("./body.base");

class DataBlacklist extends BodyBase {
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

		return `
		<script>${this.js()}</script>
		<div class="jumbotron homeBanner">
			<h1 class="display-4">Blacklist Names From System Data</h1>
			<p class="lead">Blacklist a name, to prevent it from being added to the databases.</p>
			<hr class="my-4">
			<p>This does not remove an existing name, simply prevents new ones from being added.</p>
			<form>
				<div class="form-group">
					<label class="formLabel" for="blacklist">Blacklisted Names</label>
					<textarea class="form-control tabbable" id="blacklist" rows="8">${this.toEachLine(this.data.blacklist)}</textarea>
				</div>
				<button id="formsub" type="button" class="btn btn-primary">Submit</button><span id="subsuccess" class="badge badge-success formSuccess invisible">Updated</span>
			</form>
		</div>
		`;
	}

	toEachLine(data) {
		return (data.length) ? data.join('\r\n') : '';
	}

	js() {
		return `
		function init_template_blacklist() {
			$("#formsub").on("click",(e)=>{
				let blacklistRaw = $("#blacklist").val();
				let blacklistVal = (blacklistRaw.length) ? blacklistRaw.split('\\n'):[];

				$.ajax({
					type: "POST",
					url: "${constants.PATHS.UI_BASE_API}setblacklist",
					data: JSON.stringify({blacklist: blacklistVal}),
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
			init_template_blacklist();
		});
		`;
	}

}

exports.DataBlacklist = DataBlacklist;