const { constants } = require('../constants');
let { PostProcessor } = require("./postprocessor");

/**
 * Handle post requests
 */
class PostHandler {
	/**
	 *
	 * @param {string}	dataDir			path to user data dir
	 * @param {object} 	utils 			Utils class
	 * @param {object} 	path
	 * @param {objecet} db 				db adapter
	 * @param {object} 	userArgs 		merged user settings
	 * @param {object} 	exp 			express
	 * @param {object} 	backup 			Backup class
	 * @param {object} 	exportdata 		Export class
	 * @param {object} 	gui 			GUI class
	 *
	 * @property {object}	processor	PostProcessor class
	 */
	constructor(params) {
		this.dataDir = params.dataDir;
		this.utils = params.utils;
		this.path = params.path;
		this.db = params.db;
		this.userArgs = params.userArgs;
		this.exp = params.exp;
		this.backup = params.backup;
		this.exportdata = params.exportdata;
		this.gui = params.gui;

		this.processor = new PostProcessor({ utils: this.utils, db: this.db, dataDir: this.dataDir, userArgs: this.userArgs, gui: this.gui, backup: this.backup, exportdata: this.exportdata });
	}

	/**
	 * Pass request off to processor
	 */
	uiSetData() {
		let path = constants.PATHS.UI_SET_DATA;
		let processor = this.processor;

		this.exp.post(path, (req, res) => {
			processor.uiSetData(req, res);
		});

		this.userArgs.DEBUG && this.utils.console("Added POST " + path);
	}
}

exports.PostHandler = PostHandler;