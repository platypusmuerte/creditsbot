let async  = require("async");
const { exec } = require('child_process');

async.series([
	()=>exec('pkg -t host --output ./dist/PlatysCreditsBot.exe main.js')
]);