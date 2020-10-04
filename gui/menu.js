const { constants } = require('../constants');

/**
 * Build the html menu section
 */
class PageMenu {
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
	 * HTML for the left menu
	 * 		- menu highlights and open/close logic is driven by the page/subpage vars matching current page
	 */
	render() {
		return `
		<nav class="nav flex-column">
			<a class="nav-link ` + this.isActive("home") + `" href="${constants.GUI_DIRS.BASE_WEB_PATH}home">Home</a>
		</nav>

		<div class="accordion" id="accordionExample">
			<nav class="nav flex-column">

				<a class="nav-link ` + this.isActive("data") + `" href="#" data-toggle="collapse" data-target="#menuThree" aria-expanded="true" aria-controls="menuThree">Data</a>

				<div id="menuThree" class="collapse${this.isOpenMenu("data")}" aria-labelledby="headingOne" data-parent="#accordionExample">
      				<div class="card-body">
        				<nav class="nav flex-column subMenu">
							<a class="nav-link ` + this.isActive("data", "backup") + `" href="${constants.GUI_DIRS.BASE_WEB_PATH}data/backup">Backup</a>
							<a class="nav-link ` + this.isActive("data", "blacklist") + `" href="${constants.GUI_DIRS.BASE_WEB_PATH}data/blacklist">Blacklist</a>
							<a class="nav-link ` + this.isActive("data", "export") + `" href="${constants.GUI_DIRS.BASE_WEB_PATH}data/export">Export</a>
							<a class="nav-link ` + this.isActive("data", "manual") + `" href="${constants.GUI_DIRS.BASE_WEB_PATH}data/manual">Manual</a>
							<a class="nav-link ` + this.isActive("data", "test") + `" href="${constants.GUI_DIRS.BASE_WEB_PATH}data/test">Test Data</a>
						</nav>
      				</div>
				</div>

				<a class="nav-link ` + this.isActive("template") + `" href="#" data-toggle="collapse" data-target="#menuOne" aria-expanded="true" aria-controls="menuOne">Template</a>

				<div id="menuOne" class="collapse${this.isOpenMenu("template")}" aria-labelledby="headingOne" data-parent="#accordionExample">
      				<div class="card-body">
        				<nav class="nav flex-column subMenu">
							<a class="nav-link ` + this.isActive("template", "colors") + `" href="${constants.GUI_DIRS.BASE_WEB_PATH}template/colors">Colors</a>
							<a class="nav-link ` + this.isActive("template", "customcss") + `" href="${constants.GUI_DIRS.BASE_WEB_PATH}template/customcss">Custom CSS</a>
							<a class="nav-link ` + this.isActive("template", "defaultcss") + `" href="${constants.GUI_DIRS.BASE_WEB_PATH}template/defaultcss">Default CSS</a>
							<a class="nav-link ` + this.isActive("template", "includes") + `" href="${constants.GUI_DIRS.BASE_WEB_PATH}template/includes">Includes</a>
							<a class="nav-link ` + this.isActive("template", "page") + `" href="${constants.GUI_DIRS.BASE_WEB_PATH}template/page">Page</a>
							<a class="nav-link ` + this.isActive("template", "edit") + `" href="${constants.GUI_DIRS.BASE_WEB_PATH}template/edit">Sections</a>
							<a class="nav-link ` + this.isActive("template", "settings") + `" href="${constants.GUI_DIRS.BASE_WEB_PATH}template/settings">Settings</a>
							<a class="nav-link ` + this.isActive("template", "sort") + `" href="${constants.GUI_DIRS.BASE_WEB_PATH}template/sort">Sort</a>
							<a class="nav-link ` + this.isActive("template", "theme") + `" href="${constants.GUI_DIRS.BASE_WEB_PATH}template/theme">Theme</a>
						</nav>
      				</div>
				</div>
			</nav>
		</div>`;
	}

	/**
	 * Determine which sections are highlighted
	 * 
	 * @param {string} page the main page/folder of the menu item
	 * @param {string} subPage the sub page/folder of the menu item
	 */
	isActive(page, subPage) {
		if(subPage) {
			return ((this.page === page) && (this.subPage === subPage)) ? 'active activeMenu' : '';
		} else {
			return (this.page === page) ? 'active activeMenu' : '';
		}		
	}

	/**
	 * Determine which section is open or closed
	 * 
	 * @param {string} page the page to compare with
	 */
	isOpenMenu(page) {
		return (this.page === page) ? ' show' : '';
	}
}

exports.PageMenu = PageMenu;