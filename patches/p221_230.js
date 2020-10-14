const { constants } = require('../constants');

/**
 * Update anything that needs altered between versions for users data/files
 * 
 */
class PatchFile {
	/**
	 * 
	 * @param {object}	utils		Utils
	 * @param {string}	dataDir		Data storage dir
	 * @param {object}	userArgs	Merged settings from CLI opts into config file
	 * @param {package}	fs			FS/FS-Extra
	 * @param {package}	path		Path
	 * @param {package} db			db adapter - may be null at init
	 */
	constructor(params) {
		this.utils = params.utils;
		this.dataDir = params.dataDir;
		this.userArgs = params.userArgs;
		this.fs = params.fs;
		this.path = params.path;
		this.db = params.db;
	}

	/**
	 * Handle and pre tasks
	 */
	pre() {
		let utils = this.utils;
		let userArgs = this.userArgs;

		return new Promise((resolve, reject)=>{	
			userArgs.DEBUG && utils.console("No pre-patches");
			resolve();			
		});
	}

	/**
	 * Handle any post tasks
	 */
	post(db) {
		this.db = db;
		let utils = this.utils;
		let userArgs = this.userArgs;
		let updateMainPageTemplate = this.updateMainPageTemplate.bind(this);
		let updateDefaultCSS = this.updateDefaultCSS.bind(this);

		return new Promise((resolve, reject)=>{
			userArgs.DEBUG && utils.console("Running post-patches");
			Promise.all([
				updateMainPageTemplate(),
				updateDefaultCSS()
			]).then(()=>{
				userArgs.DEBUG && utils.console("Patching complete");
				resolve();
			});			
		});
	}

	/**
	 * Update main page template
	 */
	updateMainPageTemplate() {
		let db = this.db;
		let utils = this.utils;
		let userArgs = this.userArgs;
		let newTemplate;

		return new Promise((resolve, reject)=>{
			db.databases.templatetheme.getAll().then((themes)=>{
				themes.forEach((theme)=>{
					db.themes[theme.id].templatepage.getAll().then((pageTemplate)=>{
						newTemplate = pageTemplate.page.replace(
`			$(".creditSection").each((i, s) => {
				if($(s).find("div.card").length) {
					if($(s).find("div.card").find("img").length) {
						$(s).find("div.card").find("img").each((i,el)=>{
							if($(el).width() < 5) {
								$(el).parent().parent().remove();
							}
						});
					}
				}
			});`,``);

						db.themes[theme.id].templatepage.setData({page: newTemplate}).then(()=>{
							userArgs.DEBUG && utils.console("		template page in theme " + theme.name + " updated");
							resolve();
						});	
					});
				});

			});
		});
	}

	updateDefaultCSS() {
		let db = this.db;
		let utils = this.utils;
		let userArgs = this.userArgs;
		let newTemplate;

		return new Promise((resolve, reject)=>{
			db.databases.templatetheme.getAll().then((themes)=>{
				themes.forEach((theme)=>{
					db.themes[theme.id].templatedefaultcss.getAll().then((template)=>{
						if(template.css.indexOf(`.streamtweetsWrapper .name`) === -1) {
							newTemplate = template.css.replace(`.hstreamlootsWrapper .name`,`.hstreamlootsWrapper .name, .streamtweetsWrapper .name`);

							db.themes[theme.id].templatedefaultcss.setData({css: newTemplate}).then(()=>{
								userArgs.DEBUG && utils.console("		default css in theme " + theme.name + " updated");
								resolve();
							});
						}
					});
				});
			});
		});
	}
}

exports.PatchFile = PatchFile;