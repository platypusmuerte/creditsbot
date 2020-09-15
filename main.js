let express = require("express");
let exp = express();

const path = require('path');
const fs = require('fs');
const { config } = require('./config');
const { constants } = require('./constants');
const { Utils } = require("./utils/utils");
const { Database } = require('./db');
const dataDir = path.join("./", "/data");

const Cryptr = require('cryptr');
const cryptr = new Cryptr('platyscreditsbot');

let utils, listener, db;
let { Listener } = require("./listener/main");

function init() {
	return new Promise(function (resolve, reject) {
		if (config.CLEAN_ON_STARTUP) {
			let dir = path.join(dataDir, "");

			fs.readdir(dir, (err, files) => {
				if (err) throw err;


				for (const file of files) {
					if (!fs.lstatSync(path.join(dir, file)).isDirectory()) {
						config.CLEAN_ON_STARTUP && console.log("[CREDITSBOT] cleaning " + file)
						fs.unlink(path.join(dir, file), err => {
							//if (err) throw err;
						});
					}
				}

				resolve();
			});
		}
	});
}

init().then(() => {
	utils = new Utils()
	db = new Database({ cryptr, dataDir, utils });

	listener = new Listener({ db, utils, exp, dataDir });
	listener.start();
});