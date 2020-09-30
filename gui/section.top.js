const { constants } = require('../constants');

class PageTopSection {
	constructor(params) {
		this.utils = params.utils;
		this.db = params.db;
		this.dataDir = params.dataDir;
		this.userArgs = params.userArgs;
		this.page = params.page;
		this.subPage = params.subpage;
	}

	render() {
		let v = '';

		return `
		<script>${this.js()}</script>
		<div class="container-fluid topSectionContainer">
			<div class="row">
				<div class="col titleText">
					${constants.APP.NAME}					
				</div>
				<div class="col col-4">
					<div id="valert" class="alert alert-warning fade show alertBanner invisible" role="alert">
						<strong>New Version Available </strong> Version <span id="version"></span> is now <a target="_creditwiki" href="https://github.com/platypusmuerte/creditsbot/wiki">available</a>.
					</div>
				</div>
				<div class="col col-3 d-flex align-items-center">
					<div class="versionText">
						v${constants.APP.VERSION}
						<a class="btn btn-primary btn-sm" href="/credits" target="_credits" role="button">View Credits</a>
						<a class="btn btn-primary btn-sm" href="https://github.com/platypusmuerte/creditsbot/wiki" target="_creditwiki" role="button">View Wiki</a>
						<a class="btn btn-primary btn-sm" href="https://discord.gg/MJfvjXb" target="_creditbotdiscord" role="button">Discord</a>
					</div>
				</div>
			</div>
		</div>`;
	}

	js() {
		return `
		let minutes = 15 * 60000;
		function init_topsection() {
			setInterval(check,minutes);
		}

		function check() {
			$.ajax({
				type: "GET",
				url: "${constants.PATHS.UI_BASE_API_GET}getversioncheck",
				data: {},
				contentType: "application/json",
				dataType: "json"
			}).done((data)=>{
				if(data.update) {
					$("#valert").removeClass("invisible");
					$("#version").html(data.update);
				}
			});
		}

		$(document).ready(() => {
			init_topsection();
			check();
		});
		`;
	}

}

exports.PageTopSection = PageTopSection;