const { constants } = require('../constants');

/**
 * Main class to build each page body
 */
class PageBody {
	/**
	 *
	 * @param {object} utils 		Utils class
	 * @param {object} path
	 * @param {object} db 			db adapter
	 * @param {string} dataDir		path to user data dir
	 * @param {object} userArgs 	merged user settings
	 * @param {string} page 		current main page/path/folder
	 * @param {string} subPage		current sub page/path/folder
	 * @param {object} query		express query string object
	 * 
	 * @property {string} 		defaultPage			page to fall back on - used to map to a class and highlight menus
	 * @property {bool|string} 	defaultSubPage		sub page to fall back to - used to map to a class and highlight menus
	 * @property {array}		errors				story any errors to walk through and draw alerts for
	 * @property {object}		body				map of paths to builder classes
	 */
	constructor(params) {
		this.utils = params.utils;
		this.path = params.path;
		this.db = params.db;
		this.dataDir = params.dataDir;
		this.userArgs = params.userArgs;
		this.page = params.page;
		this.subPage = params.subpage;
		this.query = params.query;


		this.defaultPage = "home";
		this.defaultSubPage = false;
		this.errors = {
			notfound: false
		};	

		const { BodyHome } = require("./body/body.home");
		const { TemplateIncludes } = require("./body/template.includes");
		const { TemplateColors } = require("./body/template.colors");
		const { TemplateSettings } = require("./body/template.settings"); 
		const { TemplateCustomCSS } = require("./body/template.customcss");
		const { DataTest } = require("./body/data.test");
		const { DataBlacklist } = require("./body/data.blacklist");
		const { DataExport} = require("./body/data.export");
		const { DataBackup } = require("./body/data.backup");
		const { DataManual } = require("./body/data.manual");
		const { TemplateEdit } = require("./body/template.edit");
		const { TemplateSort } = require("./body/template.sort");
		const { TemplatePage } = require("./body/template.page");
		const { TemplateDefaultCSS } = require("./body/template.defaultcss");
		const { TemplateTheme } = require("./body/template.theme");
		const { OverlayTimerBars } = require("./body/overlay.timerbars");
		const { OverlayTwitter } = require("./body/overlay.twitter");
		const { OverlayTransitions } = require("./body/overlay.transitions");

		this.body = {
			home: new BodyHome({ utils: this.utils, db: this.db, dataDir: this.dataDir, userArgs: this.userArgs, page: this.page, query: this.query }),
			template_includes: new TemplateIncludes({ utils: this.utils, db: this.db, dataDir: this.dataDir, userArgs: this.userArgs, page: this.page, query: this.query }),
			template_colors: new TemplateColors({ utils: this.utils, db: this.db, dataDir: this.dataDir, userArgs: this.userArgs, page: this.page, query: this.query }),
			template_settings: new TemplateSettings({ utils: this.utils, db: this.db, dataDir: this.dataDir, userArgs: this.userArgs, page: this.page, query: this.query }),
			template_customcss: new TemplateCustomCSS({ utils: this.utils, db: this.db, dataDir: this.dataDir, userArgs: this.userArgs, page: this.page, query: this.query }),
			data_test: new DataTest({ utils: this.utils, db: this.db, dataDir: this.dataDir, userArgs: this.userArgs, page: this.page, query: this.query }),
			data_export: new DataExport({ utils: this.utils, db: this.db, dataDir: this.dataDir, userArgs: this.userArgs, page: this.page, query: this.query }),
			data_backup: new DataBackup({ utils: this.utils, db: this.db, dataDir: this.dataDir, userArgs: this.userArgs, page: this.page, query: this.query }),
			data_blacklist: new DataBlacklist({ utils: this.utils, db: this.db, dataDir: this.dataDir, userArgs: this.userArgs, page: this.page, query: this.query }),
			data_manual: new DataManual({ utils: this.utils, db: this.db, dataDir: this.dataDir, userArgs: this.userArgs, page: this.page, query: this.query }),
			template_edit: new TemplateEdit({ utils: this.utils, db: this.db, dataDir: this.dataDir, userArgs: this.userArgs, page: this.page, query: this.query }),
			template_sort: new TemplateSort({ utils: this.utils, db: this.db, dataDir: this.dataDir, userArgs: this.userArgs, page: this.page, query: this.query }),
			template_page: new TemplatePage({ utils: this.utils, db: this.db, dataDir: this.dataDir, userArgs: this.userArgs, page: this.page, query: this.query }),
			template_defaultcss: new TemplateDefaultCSS({ utils: this.utils, db: this.db, dataDir: this.dataDir, userArgs: this.userArgs, page: this.page, query: this.query }),
			template_theme: new TemplateTheme({ utils: this.utils, db: this.db, dataDir: this.dataDir, userArgs: this.userArgs, page: this.page, query: this.query }),
			overlay_timerbars: new OverlayTimerBars({ utils: this.utils, db: this.db, dataDir: this.dataDir, userArgs: this.userArgs, page: this.page, query: this.query }),
			overlay_twitter: new OverlayTwitter({ utils: this.utils, db: this.db, dataDir: this.dataDir, userArgs: this.userArgs, page: this.page, query: this.query }),
			overlay_transitions: new OverlayTransitions({ utils: this.utils, db: this.db, dataDir: this.dataDir, userArgs: this.userArgs, page: this.page, query: this.query })
		};

		this.pageStr = this.page + ((this.subPage) ? "_" + this.subPage : "");

		// If cant map to a builder class then its a bad request, so add an error, and set paths to home
		// home page is loaded and used as the 404 page
		if (!this.body[this.pageStr]) {
			this.errors.notfound = this.page + "/" + this.subPage;
			this.page = this.defaultPage;
			this.subPage = this.defaultSubPage;
			this.pageStr = this.defaultPage;
		}
	}

	/**
	 * Fetch any data that the current page will need before building itself, and pass it along
	 */
	fetchData() {
		let page = this.page;
		let subPage = this.subPage;
		let db = this.db;

		return new Promise((resolve, reject)=>{
			switch (page + "_" + subPage) {
				case "template_includes":
					db.theme().templateincludes.getAll().then((dbr)=>{
						resolve(dbr);
					});	
					break;
				case "template_colors":
					db.theme().templatecolors.getAll().then((dbr) => {
						resolve(dbr);
					});
					break;
				case "template_settings":
					db.theme().templatesettings.getAll().then((dbr) => {
						resolve(dbr);
					});
					break;
				case "template_customcss":
					db.theme().templatecustomcss.getAll().then((dbr) => {
						resolve(dbr);
					});
					break;
				case "template_defaultcss":
					db.theme().templatedefaultcss.getAll().then((dbr) => {
						resolve(dbr);
					});
					break;
				case "data_blacklist":
					db.databases.blacklist.getAll().then((dbr) => {
						resolve(dbr);
					});
					break;
				case "template_edit":
					db.theme().credittemplates.getIDsByType().then((dbr) => {
						resolve(dbr);
					});
					break;
				case "template_sort":
					db.theme().templatesort.getAll().then((sortArr) => {
						db.theme().credittemplates.getTemplateDataForSorting(sortArr).then((templates)=>{
							resolve({sort: sortArr, templates: templates});
						});						
					});
					break;
				case "template_page":
					db.theme().templatepage.getAll().then((page) => {
						resolve(page);
					});
					break;
				case "template_theme":
					db.databases.templatetheme.getAll().then((themes) => {
						resolve(themes);
					});
					break;
				case "overlay_twitter":
					db.theme().overlaytwitter.getAll().then((themes) => {
						resolve(themes);
					});
					break;				
				case "overlay_transitions":
					db.databases.transitions.getForDropdown().then((transitions) => {
						resolve(transitions);
					});
					break;			
				case "overlay_timerbars":
					db.theme().timerbarscustcss.getAll().then((timerbarscustcss) => {
						let customCSS = (timerbarscustcss.length > 0) ? timerbarscustcss[0].customcss:'';
						db.theme().timerbars.getForDropdown().then((timerbars) => {
							resolve({timerbars: timerbars, customcss: customCSS});
						});
					});
					
					break;
				default:
					resolve({});
			}
		});		
	}

	/**
	 * Render the html for a page after fetching any of its data
	 * 	- appends any errors or alerts to the html
	 */
	render() {
		let fetchData = this.fetchData.bind(this);
		let dismissableAlerts = this.getDismissableAlerts();
		let body = this.body;
		let pageStr = this.pageStr;

		return new Promise((resolve, reject)=>{
			fetchData().then((qData) => {
				resolve(dismissableAlerts + body[pageStr].render(qData));
			});
		});
	}

	/**
	 * Currently just a single alert, but will be an array, that returns any active alerts currently matching
	 */
	getDismissableAlerts() {
		return this.get404();
	}

	/**
	 * Return an alert html if true
	 */
	get404() {
		return (this.errors.notfound) ? `
			<div class="alert alert-warning alert-dismissible fade show alertBanner" role="alert">
				<strong>404! - ${this.errors.notfound}</strong> does not exist. If it happens again, report it please.
				<button type="button" class="close" data-dismiss="alert" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
		`:``;
	}

}

exports.PageBody = PageBody;