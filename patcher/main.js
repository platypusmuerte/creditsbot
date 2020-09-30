const { patch } = require('superagent');
const { constants } = require('../constants');

class Patcher {
	constructor(params) {
		this.utils = params.utils;
		this.exp = params.exp;
		this.db = params.db;
		this.dataDir = params.dataDir;
		this.userArgs = params.userArgs;

		this.patchOnNoVersion = true;
		this.versionFile = "../version.txt";
		
		this.patches = {
			"2.0.1": this.patch_201.bind(this)
		};
		this.patchMap = {
			"2.0.0":"2.0.1"
		};		
	}

	patch() {
		if(true) {
			
		} else {
			// noopsiedoopsie
		}
	}

	getVersionFile() {

	}

	writeVersionFile() {

	}

	patch_201() {

	}
}

exports.Patcher = Patcher;


/*
notes
	if version file
		if file val < current val
			run update for current val
	not
		run update for current val

*/