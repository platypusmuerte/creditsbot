const { constants } = require('../constants');

/**
 * Process post requests
 */
class PostProcessor {
	/**
	 *
	 * @param {string} dataDir			path to user data dir
	 * @param {object} utils			Utils class
	 * @param {object} path
	 * @param {object} db				db adapter
	 * @param {object} userArgs			merged user settings
	 * @param {object} backup			Backup class
	 * @param {object} exportdata		Export class
	 * @param {object} gui				GUI class
	 */
	constructor(params) {
		this.dataDir = params.dataDir;
		this.utils = params.utils;
		this.path = params.path;
		this.db = params.db;
		this.userArgs = params.userArgs;
		this.backup = params.backup;
		this.exportdata = params.exportdata;
		this.gui = params.gui;
	}

	/**
	 * Pass request off to method for each task
	 * @param {objecet} req express request object
	 * @param {object} res express response object
	 */
	uiSetData(req, res) {
		let task = req.params.task;

		this.userArgs.DEBUG && this.utils.console("Handling task " + task);

		switch (task) {
			case "settemplateincludes":
				this.uiSetTemplateIncludes(req, res);
				break;
			case "settemplatecolors":
				this.uiSetTemplateColors(req, res);
				break;
			case "settemplatesettings":
				this.uiSetTemplateSettings(req, res);
				break;
			case "settemplatecustomcss":
				this.uiSetTemplateCustomCSS(req, res);
				break;
			case "settemplatedefaultcss":
				this.uiSetTemplateDefaultCSS(req, res);
				break;
			case "backup":
				this.uiRunBackup(req, res);
				break;
			case "export":
				this.uiRunExport(req, res);
				break;
			case "setblacklist":
				this.uiSetBlacklist(req, res);
				break;
			case "settemplatebyid":
				this.uiSetTemplateByID(req, res);
				break;
			case "settemplatesort": 
				this.uiSetTemplateSort(req, res);
				break;
			case "setsectionsortorder": 
				this.uiSetTemplateSort(req, res);
				break;
			case "removeseectionbyid":
				this.uiRemoveTemplateByID(req, res);
				break;
			case "setmainpagetemplate":
				this.uiSetMainPageTemplate(req, res);
				break;
			default:
				res.json({ "success": false });
				break;
		}
	}

	/**
	 * Update template includes from UI
	 * @param {objecet} req express request object
	 * @param {object} res express response object
	 */
	uiSetTemplateIncludes(req, res) {
		if (req.body.css && req.body.js) {
			let data = {
				css: (Array.isArray(req.body.css)) ? req.body.css : [],
				js: (Array.isArray(req.body.js)) ? req.body.js : []
			};

			this.db.databases.templateincludes.setData(data).then(() => {
				res.json({ "success": true });
			});
		}
	}

	/**
	 * Set colors from UI
	 * @param {objecet} req express request object
	 * @param {object} res express response object
	 */
	uiSetTemplateColors(req, res) {
		let data = {
			title: req.body.title,
			subtitle: req.body.subtitle,
			background: req.body.background,
			sectiontitle: req.body.sectiontitle,
			textcolor: req.body.textcolor,
			amountcolor: req.body.amountcolor,
			totalcolor: req.body.totalcolor,
			sectionborder: req.body.sectionborder
		};

		this.db.databases.templatecolors.setData(data).then(() => {
			res.json({ "success": true });
		});
	}

	/**
	 * Update settings data for template from UI
	 * @param {objecet} req express request object
	 * @param {object} res express response object
	 */
	uiSetTemplateSettings(req, res) {
		let data = {
			looping: req.body.looping,
			speed: req.body.speed
		};

		this.db.databases.templatesettings.setData(data).then(() => {
			res.json({ "success": true });
		});
	}

	/**
	 * Update css for credits from UI
	 * @param {objecet} req express request object
	 * @param {object} res express response object
	 */
	uiSetTemplateCustomCSS(req, res) {
		let data = {
			css: req.body.css
		};

		this.db.databases.templatecustomcss.setData(data).then(() => {
			res.json({ "success": true });
		});
	}

	/**
	 * Update default css from UI
	 * @param {objecet} req express request object
	 * @param {object} res express response object
	 */
	uiSetTemplateDefaultCSS(req, res) {
		let data = {
			css: req.body.css
		};

		this.db.databases.templatedefaultcss.setData(data).then(() => {
			res.json({ "success": true });
		});
	}

	/**
	 * Update the blacklist
	 * @param {objecet} req express request object
	 * @param {object} res express response object
	 */
	uiSetBlacklist(req, res) {
		let data = {
			blacklist: req.body.blacklist
		};

		this.db.databases.blacklist.setData(data).then(() => {
			res.json({ "success": true });
		});
	}

	/**
	 * Start a backup
	 * @param {objecet} req express request object
	 * @param {object} res express response object
	 */
	uiRunBackup(req, res) {
		this.backup.create().then(() => {
			res.json({ "success": true });
		});
	}

	/**
	 * Start an export
	 * @param {objecet} req express request object
	 * @param {object} res express response object
	 */
	uiRunExport(req, res) {
		this.exportdata.create().then(() => {
			res.json({ "success": true });
		});
	}

	/**
	 * Set individual template data
	 * @param {objecet} req express request object
	 * @param {object} res express response object
	 */
	uiSetTemplateByID(req, res) {
		let data = req.body;
		let db = this.db;

		db.databases.credittemplates.setTemplateByID(data).then((dbid) => {
			if(data.id === "addnew") {
				db.databases.templatesort.addNew(dbid).then(() => {
					res.json({ "success": true, id: dbid});
				});
			} else {
				res.json({ "success": true, id: dbid });
			}			
		});
	}

	/**
	 * Update the sorting
	 * @param {objecet} req express request object
	 * @param {object} res express response object
	 */
	uiSetTemplateSort(req, res) {
		let data = req.body;

		this.db.databases.templatesort.setData(data).then(() => {
			res.json({ "success": true });
		});
	} 

	/**
	 * Remove a template by its id
	 * @param {objecet} req express request object
	 * @param {object} res express response object
	 */
	uiRemoveTemplateByID(req, res) {
		let data = req.body;

		this.db.databases.credittemplates.removeTemplateByID(data).then(() => {
			res.json({ "success": true });
		});
	}

	/**
	 * Update the main html page template
	 * @param {objecet} req express request object
	 * @param {object} res express response object
	 */
	uiSetMainPageTemplate(req, res) {
		let data = req.body;

		this.db.databases.templatepage.setData(data).then(() => {
			res.json({ "success": true });
		});
	}
}

exports.PostProcessor = PostProcessor;