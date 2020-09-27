const { constants } = require('../constants');

class PageBody {
	constructor(params) {
		this.utils = params.utils;
		this.db = params.db;
		this.dataDir = params.dataDir;
		this.userArgs = params.userArgs;
		this.defaultPage = "home";
		this.defaultSubPage = false;
		this.page = params.page;
		this.subPage = params.subpage;
		this.query = params.query;
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
		const { SectionsEdit } = require("./body/sections.edit");
		const { SectionsSort } = require("./body/sections.sort");

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
			sections_edit: new SectionsEdit({ utils: this.utils, db: this.db, dataDir: this.dataDir, userArgs: this.userArgs, page: this.page, query: this.query }),
			sections_sort: new SectionsSort({ utils: this.utils, db: this.db, dataDir: this.dataDir, userArgs: this.userArgs, page: this.page, query: this.query })
		};

		this.pageStr = this.page + ((this.subPage) ? "_" + this.subPage : "");

		if (!this.body[this.pageStr]) {
			this.errors.notfound = this.page + "/" + this.subPage;
			this.page = this.defaultPage;
			this.subPage = this.defaultSubPage;
			this.pageStr = this.defaultPage;
		}
	}

	fetchData() {
		let page = this.page;
		let subPage = this.subPage;
		let db = this.db;

		return new Promise(function (resolve, reject) {
			switch (page + "_" + subPage) {
				case "template_includes":
					db.databases.templateincludes.getAll().then((dbr)=>{
						resolve(dbr);
					});	
					break;
				case "template_colors":
					db.databases.templatecolors.getAll().then((dbr) => {
						resolve(dbr);
					});
					break;
				case "template_settings":
					db.databases.templatesettings.getAll().then((dbr) => {
						resolve(dbr);
					});
					break;
				case "template_customcss":
					db.databases.templatecustomcss.getAll().then((dbr) => {
						resolve(dbr);
					});
					break;
				case "data_blacklist":
					db.databases.blacklist.getAll().then((dbr) => {
						resolve(dbr);
					});
					break;
				case "sections_edit":
					db.databases.credittemplates.getIDsByType().then((dbr) => {
						resolve(dbr);
					});
					break;
				case "sections_sort":
					db.databases.templatesort.getAll().then((sortArr) => {
						db.databases.credittemplates.getTemplateDataForSorting(sortArr).then((templates)=>{
							resolve({sort: sortArr, templates: templates});
						});						
					});
					break;
				default:
					resolve({});
			}
		});		
	}

	render() {
		let fetchData = this.fetchData.bind(this);
		let dismissableAlerts = this.getDismissableAlerts();
		let body = this.body;
		let pageStr = this.pageStr;

		return new Promise(function (resolve, reject) {
			fetchData().then((qData) => {
				resolve(dismissableAlerts + body[pageStr].render(qData));
			});
		});
	}

	getDismissableAlerts() {
		return this.get404();
	}

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