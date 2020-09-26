const { constants } = require('../constants');
let { PostProcessor } = require("./postprocessor");

class PostHandler {
	constructor(params) {
		this.dataDir = params.dataDir;
		this.utils = params.utils;
		this.db = params.db;
		this.userArgs = params.userArgs;
		this.exp = params.exp;
		this.backup = params.backup;
		this.exportdata = params.exportdata;
		this.gui = params.gui;

		this.processor = new PostProcessor({ utils: this.utils, db: this.db, dataDir: this.dataDir, userArgs: this.userArgs, gui: this.gui, backup: this.backup, exportdata: this.exportdata });
	}

	uiSetData() {
		let path = constants.PATHS.UI_SET_DATA;
		let processor = this.processor;

		this.exp.post(path, (req, res) => {
			processor.uiSetData(req, res);
		});

		this.userArgs.DEBUG && this.utils.console("Added GET " + path);
	}
}

exports.PostHandler = PostHandler;