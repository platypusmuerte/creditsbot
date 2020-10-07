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

		return new Promise((resolve, reject)=>{
			userArgs.DEBUG && utils.console("Running post-patches");
			Promise.all([
				addStreamTweetsTemplates()
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
			"hstreamtweets_top5H"
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