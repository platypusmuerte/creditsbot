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
	 */
	constructor(params) {
		this.utils = params.utils;
		this.path = params.path;
		this.db = params.db;
		this.dataDir = params.dataDir;
		this.userArgs = params.userArgs;
		this.page = params.page;
		this.subPage = params.subpage;
	}

	getMenuDataContent(menuData) {
		let html = ``;

		menuData.forEach((menuItem)=>{
			html += this.buildMenuLink(menuItem);
		});

		return html;
	}

	buildMenuLink(data) {
		return `<a class="nav-link ` + this.isActive(data.grouping, data.page) + `" href="${constants.GUI_DIRS.BASE_WEB_PATH}${data.grouping}/${data.page}">${data.label}</a>`;
	}

	buildMenuContent_data() {
		let grouping = "data";

		return [
			{grouping: grouping, page: "backup", label: "Backup"},
			{grouping: grouping, page: "blacklist", label: "Blacklist"},
			{grouping: grouping, page: "export", label: "Export"},
			{grouping: grouping, page: "manual", label: "Manual"},
			{grouping: grouping, page: "test", label: "Test Data"}
		];
	}

	buildMenuContent_overlay() {
		let grouping = "overlay";

		return [
			{grouping: grouping, page: "timerbars", label: "Timer Bars"},
			{grouping: grouping, page: "transitions", label: "Transitions"},
			{grouping: grouping, page: "twitter", label: "Twitter"}
		];
	}

	buildMenuContent_template() {
		let grouping = "template";

		return [
			{grouping: grouping, page: "colors", label: "Colors"},
			{grouping: grouping, page: "customcss", label: "Custom CSS"},
			{grouping: grouping, page: "defaultcss", label: "Default CSS"},
			{grouping: grouping, page: "includes", label: "Includes"},
			{grouping: grouping, page: "page", label: "Page"},
			{grouping: grouping, page: "edit", label: "Sections"},
			{grouping: grouping, page: "settings", label: "Settings"},
			{grouping: grouping, page: "sort", label: "Sort"},
			{grouping: grouping, page: "theme", label: "Theme"}
		];
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

				<a class="nav-link ` + this.isActive("data") + `" href="#" data-toggle="collapse" data-target="#menuOne" aria-expanded="true" aria-controls="menuOne">Data</a>

				<div id="menuOne" class="collapse${this.isOpenMenu("data")}" aria-labelledby="headingOne" data-parent="#accordionExample">
      				<div class="card-body">
        				<nav class="nav flex-column subMenu">
							${this.getMenuDataContent(this.buildMenuContent_data())}
						</nav>
      				</div>
				</div>

				<a class="nav-link ` + this.isActive("overlay") + `" href="#" data-toggle="collapse" data-target="#menuThree" aria-expanded="true" aria-controls="menuThree">Overlays</a>

				<div id="menuThree" class="collapse${this.isOpenMenu("overlay")}" aria-labelledby="headingOne" data-parent="#accordionExample">
      				<div class="card-body">
						<nav class="nav flex-column subMenu">
							${this.getMenuDataContent(this.buildMenuContent_overlay())}
						</nav>
      				</div>
				</div>

				<a class="nav-link ` + this.isActive("template") + `" href="#" data-toggle="collapse" data-target="#menuTwo" aria-expanded="true" aria-controls="menuTwo">Template</a>

				<div id="menuTwo" class="collapse${this.isOpenMenu("template")}" aria-labelledby="headingOne" data-parent="#accordionExample">
      				<div class="card-body">
        				<nav class="nav flex-column subMenu">
							${this.getMenuDataContent(this.buildMenuContent_template())}
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