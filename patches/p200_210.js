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
		let moveDbFile = this.moveDbFile.bind(this);

		return new Promise((resolve, reject)=>{	
			userArgs.DEBUG && utils.console("Running pre-patches");

			Promise.all([
				moveDbFile("credittemplates.sdb"),
				moveDbFile("templatecolors.sdb"),
				moveDbFile("templatecustomcss.sdb"),
				moveDbFile("templatedefaultcss.sdb"),
				moveDbFile("templateincludes.sdb"),
				moveDbFile("templatepage.sdb"),
				moveDbFile("templatesettings.sdb"),
				moveDbFile("templatesort.sdb")
			]).then(()=>{
				resolve();
			});		
		});
	}

	/**
	 * Move a file, and resolve when done moving it
	 * @param {string} f file name
	 */
	moveDbFile(f) {
		let path = this.path;
		let fs = this.fs;
		let utils = this.utils;
		let userArgs = this.userArgs;

		return new Promise((resolve, reject)=>{
			userArgs.DEBUG && utils.console("		moving file " + f);

			fs.pathExists(path.join("./data", f)).then((exists)=>{
				if(exists) {
					fs.move(path.join("./data", f),"./data/themes/default/" + f, err => {
						if (err) throw err;
						userArgs.DEBUG && utils.console("		moved file " + f);
						resolve();
					});
				} else {
					userArgs.DEBUG && utils.console("		failed to move: " + f);
					resolve();
				}
			});			
		});
	}

	/**
	 * Handle any post tasks
	 */
	post(db) {
		this.db = db;
		let utils = this.utils;
		let userArgs = this.userArgs;
		let updateColorDB = this.updateColorDB.bind(this);
		let updateExistingTemplates = this.updateExistingTemplates.bind(this);
		let addStreamLootsTemplates = this.addStreamLootsTemplates.bind(this);

		return new Promise((resolve, reject)=>{
			userArgs.DEBUG && utils.console("Running post-patches");

			Promise.all([
				updateColorDB(),
				updateExistingTemplates(),
				addStreamLootsTemplates()
			]).then(()=>{
				userArgs.DEBUG && utils.console("Patching complete");
				resolve();
			});
		});
	}

	/**
	 * Update colors DB
	 */
	updateColorDB() {
		let db = this.db;
		let utils = this.utils;
		let userArgs = this.userArgs;

		const { templatecolors } = require("../defaults/templatecolors");

		return new Promise((resolve, reject)=>{	
			db.theme().templatecolors.getAll().then((colors)=>{
				db.theme().templatecolors.setData({
					title: colors.title,
					subtitle: colors.subtitle,
					background: colors.background,
					sectiontitle: colors.sectiontitle,
					textcolor: colors.textcolor,
					amountcolor: templatecolors.amountcolor,
					totalcolor: templatecolors.totalcolor,
					sectionborder: colors.sectionborder
				}).then(()=>{
					userArgs.DEBUG && utils.console("		color db updated ");
					resolve();
				});				
			});			
		});
	}

	/**
	 * update templates with new classes for better style control
	 */
	updateExistingTemplates() {
		let db = this.db;
		let utils = this.utils;
		let userArgs = this.userArgs;
		let updateExistingTemplate = this.updateExistingTemplate.bind(this);
		let p = [];

		return new Promise((resolve, reject)=>{
			db.theme().credittemplates.getAll().then((allTemplates)=>{			

				allTemplates.forEach((t,i)=>{
					p.push(updateExistingTemplate(t));
				});

				Promise.all(p).then((pRes)=>{
					userArgs.DEBUG && utils.console("		templates updated ");
					resolve();
				});
			});
		});
	}

	/**
	 * Update existing template
	 */
	updateExistingTemplate(t) {
		let getTemplateByID = this.getTemplateByID.bind(this);
		let setTemplateByID = this.setTemplateByID.bind(this);

		return new Promise((resolve, reject)=>{
			getTemplateByID(t.id).then((thisTemplate)=>{
				let template = Object.assign({},thisTemplate);

				delete template["defaults"];
				
				let str = template.inner;

				if(str.indexOf("amountColor") === -1) {
					str = template.inner.replace('class="amount','class="amount amountColor');
				}

				if(str.indexOf("totalColor") === -1) {
					str = str.replace('class="total','class="total totalColor');
				}

				template.inner = str;
				

				setTemplateByID(template).then((dbID)=>{
					resolve("complete");
				});				
			});	
		});
	}

	/**
	 * get template by id for updating
	 */
	getTemplateByID(id) {
		let db = this.db;

		return new Promise((resolve, reject)=>{
			db.theme().credittemplates.getTemplateByID(id).then((thisTemplate)=>{
				resolve(thisTemplate);
			});
		});
	}

	/**
	 * set template by id for updating
	 */
	setTemplateByID(t) {		
		let db = this.db;
		
		return new Promise((resolve, reject)=>{
			db.theme().credittemplates.setTemplateByID(t).then((dbID)=>{
				resolve(dbID);
			});
		});
	}

	/**
	 * Add new templates for streamloots purchases
	 */
	addStreamLootsTemplates() {
		let addStreamLootsTemplate = this.addStreamLootsTemplate.bind(this);
		const { templatedata } = require("../defaults/templatedata");

		let templatesToAdd = [
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
					tPromises.push(addStreamLootsTemplate(t));
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
	addStreamLootsTemplate(t) {
		let db = this.db;
		let utils = this.utils;
		let userArgs = this.userArgs;
		let addedToDb = false;

		return new Promise((resolve, reject)=>{
			db.theme().credittemplates.addNew(t).then((added)=>{
				if(added) {
					userArgs.DEBUG && utils.console("		added template " + t.id);
					addedToDb = true;
				} else {
					userArgs.DEBUG && utils.console("		template " + t.id + " already exists");
				}				
			}).then(()=>{
				if(addedToDb) {
					db.theme().templatesort.addNew(t.id).then(()=>{
						userArgs.DEBUG && utils.console("		added to sort ");
						resolve();
					});
				} else {
					resolve();
				}
			});		
		});
	}
}

exports.PatchFile = PatchFile;