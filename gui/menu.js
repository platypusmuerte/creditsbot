const { constants } = require('../constants');

class PageMenu {
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
		<nav class="nav flex-column">
			<a class="nav-link ` + this.isActive("home") + `" href="${constants.GUI_DIRS.BASE_WEB_PATH}home">Home</a>
		</nav>

		<div class="accordion" id="accordionExample">
			<nav class="nav flex-column">
				<a class="nav-link ` + this.isActive("template") + `" href="#" data-toggle="collapse" data-target="#menuOne" aria-expanded="true" aria-controls="menuOne">Template</a>

				<div id="menuOne" class="collapse${this.isOpenMenu("template")}" aria-labelledby="headingOne" data-parent="#accordionExample">
      				<div class="card-body">
        				<nav class="nav flex-column subMenu">
							<a class="nav-link ` + this.isActive("template","includes") + `" href="${constants.GUI_DIRS.BASE_WEB_PATH}template/includes">Includes</a>
							<a class="nav-link ` + this.isActive("template", "colors") + `" href="${constants.GUI_DIRS.BASE_WEB_PATH}template/colors">Colors</a>
							<a class="nav-link ` + this.isActive("template", "settings") + `" href="${constants.GUI_DIRS.BASE_WEB_PATH}template/settings">Settings</a>
							<a class="nav-link ` + this.isActive("template", "customcss") + `" href="${constants.GUI_DIRS.BASE_WEB_PATH}template/customcss">Custom CSS</a>
						</nav>
      				</div>
				</div>

				<a class="nav-link ` + this.isActive("sections") + `" href="#" data-toggle="collapse" data-target="#menuTwo" aria-expanded="true" aria-controls="menuTwo">Sections</a>

				<div id="menuTwo" class="collapse${this.isOpenMenu("sections")}" aria-labelledby="headingOne" data-parent="#accordionExample">
      				<div class="card-body">
        				<nav class="nav flex-column subMenu">
							<a class="nav-link ` + this.isActive("sections", "dynamic") + `" href="${constants.GUI_DIRS.BASE_WEB_PATH}sections/dynamic">Dynamic</a>
							<a class="nav-link ` + this.isActive("sections", "static") + `" href="${constants.GUI_DIRS.BASE_WEB_PATH}sections/static">Static</a>
						</nav>
      				</div>
				</div>

				<a class="nav-link ` + this.isActive("data") + `" href="#" data-toggle="collapse" data-target="#menuThree" aria-expanded="true" aria-controls="menuThree">Data</a>

				<div id="menuThree" class="collapse${this.isOpenMenu("data")}" aria-labelledby="headingOne" data-parent="#accordionExample">
      				<div class="card-body">
        				<nav class="nav flex-column subMenu">
							<a class="nav-link ` + this.isActive("data", "test") + `" href="${constants.GUI_DIRS.BASE_WEB_PATH}data/test">Test Data</a>
							<a class="nav-link ` + this.isActive("data", "blacklist") + `" href="${constants.GUI_DIRS.BASE_WEB_PATH}data/blacklist">Blacklist</a>
							<a class="nav-link ` + this.isActive("data", "manual") + `" href="${constants.GUI_DIRS.BASE_WEB_PATH}data/manual">Manual</a>
							<a class="nav-link ` + this.isActive("data", "export") + `" href="${constants.GUI_DIRS.BASE_WEB_PATH}data/export">Export</a>
							<a class="nav-link ` + this.isActive("data", "backup") + `" href="${constants.GUI_DIRS.BASE_WEB_PATH}data/backup">Backup</a>
						</nav>
      				</div>
				</div>
			</nav>
		</div>`;
	}

	isActive(page, subPage) {
		if(subPage) {
			return ((this.page === page) && (this.subPage === subPage)) ? 'active activeMenu' : '';
		} else {
			return (this.page === page) ? 'active activeMenu' : '';
		}		
	}

	isOpenMenu(page) {
		return (this.page === page) ? ' show' : '';
	}
}

exports.PageMenu = PageMenu;