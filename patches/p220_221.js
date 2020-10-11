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
						newTemplate = pageTemplate.page.replace('let creditsPlusWrapper = creditsHeight','let creditsPlusWrapper = (REPLAY) ? creditsHeight + 1800:creditsHeight');
						newTemplate = newTemplate.replace('let scrollDistance = creditsPlusWrapper + wrapperHeight','let scrollDistance = creditsHeight');
						newTemplate = newTemplate.replace('setTimeout(credits, 3000)','setTimeout(credits, 1000)');

						db.themes[theme.id].templatepage.setData({page: newTemplate}).then(()=>{
							userArgs.DEBUG && utils.console("		template page in theme " + theme.name + " updated");
							resolve();
						});	
					});
				});

			});
		});
	}

	/**
	 * Update default css template
	 * 		SPACING OF CONTENT HERE IS DELIBERATE
	 */
	updateDefaultCSS() {
		let db = this.db;
		let utils = this.utils;
		let userArgs = this.userArgs;
		let exists = false;
		let newTemplate;

		return new Promise((resolve, reject)=>{
			db.databases.templatetheme.getAll().then((themes)=>{
				themes.forEach((theme)=>{
					db.themes[theme.id].templatedefaultcss.getAll().then((cssTemplate)=>{
						exists = (cssTemplate.css.indexOf(`.footerWrapper {
	display: block;
	width: 80%;
	height: 1px;
	margin: 0 auto;
	text-align: center;
	position: relative;
}
.footer {
	display: block;
	position: absolute;
	width: 100%;
	height: 100vh;
}`) > -1);

						if(exists) {
							newTemplate = cssTemplate.css.replace(`.footerWrapper {
	display: block;
	width: 80%;
	height: 1px;
	margin: 0 auto;
	text-align: center;
	position: relative;
}
.footer {
	display: block;
	position: absolute;
	width: 100%;
	height: 100vh;
}`,`.footerWrapper {
	display: block;
	width: 80%;
	margin: 0 auto;
	text-align: center;
	position: relative;
}
.footer {
	display: block;
	width: 100%;
	height: 100vh;
}`);
						} else {
							newTemplate = cssTemplate.css + `.footerWrapper {
	display: block;
	width: 80%;
	margin: 0 auto;
	text-align: center;
	position: relative;
}
.footer {
	display: block;
	width: 100%;
	height: 100vh;
}`;
						}

						let action = (exists) ? ' updated':' added footer css';

						db.themes[theme.id].templatedefaultcss.setData({css: newTemplate}).then(()=>{
							userArgs.DEBUG && utils.console("		template defaultcss in theme " + theme.name + action);
							resolve();
						});						
					});
				});

			});
		});
	}
}

exports.PatchFile = PatchFile;