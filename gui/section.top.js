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
		return `
		<div class="container-fluid topSectionContainer">
			<div class="row">
				<div class="col titleText">
					${constants.APP.NAME}
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

}

exports.PageTopSection = PageTopSection;