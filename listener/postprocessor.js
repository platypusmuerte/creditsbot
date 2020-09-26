const { constants } = require('../constants');

class PostProcessor {
	constructor(params) {
		this.dataDir = params.dataDir;
		this.utils = params.utils;
		this.db = params.db;
		this.userArgs = params.userArgs;
		this.backup = params.backup;
		this.exportdata = params.exportdata;
		this.gui = params.gui;
	}

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
			case "backup":
				this.uiRunBackup(req, res);
				break;
			case "export":
				this.uiRunExport(req, res);
				break;
			case "setblacklist":
				this.uiSetBlacklist(req, res);
				break;
			case "gettemplatebyid":
				this.uiGetTemplateByID(req, res);
				break;
			default:
				res.json({ "success": false });
				break;
		}
	}

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

	uiSetTemplateColors(req, res) {
		let data = {
			title: req.body.title,
			subtitle: req.body.subtitle,
			background: req.body.background,
			sectiontitle: req.body.sectiontitle,
			textcolor: req.body.textcolor,
			sectionborder: req.body.sectionborder
		};

		this.db.databases.templatecolors.setData(data).then(() => {
			res.json({ "success": true });
		});
	}

	uiSetTemplateSettings(req, res) {
		let data = {
			looping: req.body.looping,
			speed: req.body.speed
		};

		this.db.databases.templatesettings.setData(data).then(() => {
			res.json({ "success": true });
		});
	}

	uiSetTemplateCustomCSS(req, res) {
		let data = {
			css: req.body.css
		};

		this.db.databases.templatecustomcss.setData(data).then(() => {
			res.json({ "success": true });
		});
	}

	uiSetBlacklist(req, res) {
		let data = {
			blacklist: req.body.blacklist
		};

		this.db.databases.blacklist.setData(data).then(() => {
			res.json({ "success": true });
		});
	}

	uiRunBackup(req, res) {
		this.backup.create().then(() => {
			res.json({ "success": true });
		});
	}

	uiRunExport(req, res) {
		this.exportdata.create().then(() => {
			res.json({ "success": true });
		});
	}

	uiGetTemplateByID(req, res) {
		let id = req.body.id;

		this.db.databases.credittemplates.getTemplateByID(id).then((data) => {
			res.json({ "success": true, "data": data });
		});
	}
}

exports.PostProcessor = PostProcessor;