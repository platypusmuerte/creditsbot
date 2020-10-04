/**
 * Remove database files on startup (if allowed)
 * 		DOES NOT DELETE HISTORY DATABASE FILES OR SETTINGS (hdb, sdb)
 * @param {object} userArgs 
 * @param {object} path 
 * @param {object} fs 
 * @param {object} utils 
 * @param {string} dataDir 
 * @param {string} defaultThemeDir
 */
exports.cleanup = (userArgs, path, fs, utils, dataDir, themeDir, defaultThemeDir)=>{
	return new Promise((resolve, reject)=>{
		if (userArgs.CLEAN_ON_STARTUP) {
			let dir = path.join(dataDir, "");

			fs.readdir(dir, (err, files) => {
				if (err) throw err;


				for (const file of files) {
					let ext = path.extname(file);

					if (!fs.lstatSync(path.join(dir, file)).isDirectory() && (ext !== ".hdb") && (ext !== ".sdb")) {
						(userArgs.CLEAN_ON_STARTUP && userArgs.DEBUG) && utils.console("Cleaning " + file);
						fs.unlink(path.join(dir, file), err => {
							//if (err) throw err;
						});
					}
				}

				resolve();
			});
		} else {
			resolve();
		}
	});
};