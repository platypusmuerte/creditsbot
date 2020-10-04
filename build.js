/**
 * creates an exe file, wrapped around the app
 * @TODO: stop adding version to file name
 */
const path = require('path');
const fs = require('fs-extra');
let async  = require("async");
const { exec } = require('child_process');
const { constants } = require('./constants');



async.series([
	(cb)=>{
		fs.removeSync("./data");
		console.log("data cleaned");
		cb();
	},
	(cb)=>{
		fs.removeSync("./dist");
		console.log("dist cleaned");
		cb();
	},
	(cb)=>{
		fs.removeSync("./templates");
		console.log("templates cleaned");
		cb();
	},
	(cb)=>{
		fs.removeSync("./usercontent");
		console.log("data cleaned");
		cb();
	},
	(cb)=>{
		fs.mkdirs("./dist");
		console.log("dist added");
		cb();
	},
	(cb)=>{
		exec('pkg -t host --output ./dist/' + constants.APP.EXENAME + '_' + constants.APP.VERSION + '.exe main.js')
		cb();
	}
]);