const { constants } = require('../../constants');
const { BodyBase } = require("./body.base");

class TemplatePage extends BodyBase {
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
			<h1 class="display-4">Credits HTML Page</h1>
			<p class="lead">This is the main HTML page for the credits.</p>
			<hr class="my-4">
			<p>Sometimes, just because you can, doesn't mean you should.</p>
			<form>
				<div class="form-group">
					<label class="formLabel" for="templatePage">Main HTML Page</label>
					<textarea class="form-control tabbable" id="templatePage" rows="25"></textarea>
				</div>
				<button id="formsub" type="button" class="btn btn-primary">Submit</button><span id="subsuccess" class="badge badge-success formSuccess invisible">Updated</span>
			</form>
		</div>
		`;
	}

	js() {
		return `
		function init_template_page() {
			$("#formsub").on("click",(e)=>{
				
			});
		}

		$(document).ready(() => {
			init_template_page();
		});
		`;
	}

}

exports.TemplatePage = TemplatePage;