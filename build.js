/**
 * creates an exe file, wrapped around the app
 * @TODO: stop adding version to file name
 */
let async  = require("async");
const { exec } = require('child_process');
const { constants } = require('./constants');

async.series([
	()=>exec('pkg -t host --output ./dist/' + constants.APP.EXENAME + '_' + constants.APP.VERSION + '.exe main.js')
]);