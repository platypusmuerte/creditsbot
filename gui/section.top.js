const { constants } = require('../constants');

/**
 * Build the top header section of the GUI templatea
 */
class PageTopSection {
	/**
	 * 
	 * @param {object} utils 		Utils class
	 * @param {object} path 
	 * @param {object} db 			db adapter
	 * @param {string} dataDir		path to user data dir
	 * @param {object} userArgs 	merged user settings
	 * @param {string} page 		current main page/path/folder
	 * @param {string} subPage		current sub page/path/folder
	 * @param {string} theme		db theme
	 */
	constructor(params) {
		this.utils = params.utils;
		this.path = params.path;
		this.db = params.db;
		this.dataDir = params.dataDir;
		this.userArgs = params.userArgs;
		this.page = params.page;
		this.subPage = params.subpage;
		this.theme = params.theme;
	}

	/**
	 * Build the html for the top header section
	 * script section holds any js for managing the header areas
	 */
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

	/**
	 * Content for the script section
	 * 		- sets an interval to check for updates (minutes * (1 minute as millis))
	 * 		- If there is an update available, shows message in header
	 * 		- this polls utils/versioncheck.js, which polls github version.txt file
	 */
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