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
		let addStreamTweetsTemplates = this.addStreamTweetsTemplates.bind(this);
		let updateDefaultCSS = this.updateDefaultCSS.bind(this);

		return new Promise((resolve, reject)=>{
			userArgs.DEBUG && utils.console("Running post-patches");
			Promise.all([
				addStreamTweetsTemplates(),
				updateDefaultCSS()
			]).then(()=>{
				userArgs.DEBUG && utils.console("Patching complete");
				resolve();
			});			
		});
	}

	/**
	 * Add new templates for streamloots purchases
	 */
	addStreamTweetsTemplates() {
		let addStreamTweetsTemplate = this.addStreamTweetsTemplate.bind(this);
		const { templatedata } = require("../defaults/templatedata");

		let templatesToAdd = [
			"streamtweets_name",
			"streamtweets_name_total",
			"hstreamtweets_top10H",
			"hstreamtweets_top5H",
			/* catch missed templates to sort for new 2.1.0 users */
			"streamlootspurchase_name",
			"streamlootspurchase_top5",
			"streamlootspurchase_name_amount",
			"streamlootspurchase_name_total",
			"streamlootspurchase_name_amount_total",
			"streamlootspurchase_top10",
			"hstreamlootspurchase_top10H",
			"hstreamlootspurchase_top5H"
		];

		return new Promise((resolve, reject)=>{
			let tPromises = [];

			templatedata.forEach((t,i)=>{
				if(templatesToAdd.includes(t.id)) {
					tPromises.push(addStreamTweetsTemplate(t));
				}
			});

			Promise.all(tPromises).then(()=>{
				resolve();
			});
		});
	}

	/**
	 * add template as promise
	 */
	addStreamTweetsTemplate(t) {
		let db = this.db;
		let utils = this.utils;
		let userArgs = this.userArgs;
		let addedToDb = false;

		return new Promise((resolve, reject)=>{
			db.databases.templatetheme.getAll().then((themes)=>{
				themes.forEach((theme)=>{
					db.themes[theme.id].credittemplates.addNew(t).then((added)=>{
						if(added) {
							userArgs.DEBUG && utils.console("		added template " + t.id + " to theme " + theme.name);
							addedToDb = true;
						} else {
							userArgs.DEBUG && utils.console("		template " + t.id + " already exists in theme " + theme.name);
						}				
					}).then(()=>{
						db.themes[theme.id].templatesort.getAll().then((fullsortlist)=>{
							if(fullsortlist.includes(t.id)) {
								userArgs.DEBUG && utils.console("		sort " + t.id + " exists in theme " + theme.name);
								resolve();
							} else {
								db.themes[theme.id].templatesort.addNew(t.id).then(()=>{
									userArgs.DEBUG && utils.console("		added " + t.id + " to sort for theme " + theme.name);
									resolve();
								});								
							}
						});
					});	
				});
			});						
		});
	}

	/**
	 * Update default CSS values
	 */
	updateDefaultCSS() {
		let db = this.db;
		let utils = this.utils;
		let userArgs = this.userArgs;

		return new Promise((resolve, reject)=>{
			db.databases.templatetheme.getAll().then((themes)=>{
				themes.forEach((theme)=>{
					db.themes[theme.id].templatedefaultcss.getAll().then((defCSS)=>{
						
						if(defCSS.css.indexOf('.streamlootspurchaseWrapper, .streamtweetsWrapper') === -1) {
							let css = defCSS.css.replace('.streamLootsWrapper, .hstreamlootsWrapper','.streamLootsWrapper, .hstreamlootsWrapper, .streamlootspurchaseWrapper, .streamtweetsWrapper');
							let css2 = css.replace('.giftsubsAmountWrapper, .donosAmountWrapper','.giftsubsAmountWrapper, .donosAmountWrapper, .streamlootsAmountWrapper, .streamlootspurchaseAmountWrapper');
							let css3 = css2.replace('.donosTotalWrapper, .streamlootsTotalWrapper','.donosTotalWrapper, .streamlootsTotalWrapper, \r\n.streamlootspurchaseTotalWrapper, .streamtweetsTotalWrapper');
							let css4 = css3.replace('.donosAmountTotalWrapper, .streamlootsAmountTotalWrapper','.donosAmountTotalWrapper, .streamlootsAmountTotalWrapper, .streamlootspurchaseAmountTotalWrapper');
							let css5 = css4.replace('.streamlootsTop10CardsWrapper, .hstreamlootsTop10CardsWrapper','.streamlootsTop10CardsWrapper, .hstreamlootsTop10CardsWrapper, \r\n.streamlootspurchaseTop5Wrapper, .streamlootspurchaseTop10Wrapper, .hstreamlootspurchaseTop10Wrapper, .hstreamlootspurchaseTop5Wrapper, .hstreamtweetsTop10Wrapper, .hstreamtweetsTop5Wrapper');

							db.themes[theme.id].templatedefaultcss.setData({css: css5}).then(()=>{
								userArgs.DEBUG && utils.console("		updated defaultCSS for theme " + theme.name);
								resolve();
							});	
						} else {
							userArgs.DEBUG && utils.console("		skipped CSS updates for theme " + theme.name);
						}
					});
				});
			});			
		});
	}
}

exports.PatchFile = PatchFile;