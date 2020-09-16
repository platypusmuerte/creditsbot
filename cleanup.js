exports.cleanup = (config, path, fs, utils, dataDir)=>{
	return new Promise(function (resolve, reject) {
		if (config.CLEAN_ON_STARTUP) {
			let dir = path.join(dataDir, "");

			fs.readdir(dir, (err, files) => {
				if (err) throw err;


				for (const file of files) {
					if (!fs.lstatSync(path.join(dir, file)).isDirectory()) {
						(config.CLEAN_ON_STARTUP && config.DEBUG) && utils.console("Cleaning " + file);
						fs.unlink(path.join(dir, file), err => {
							//if (err) throw err;
						});
					}
				}

				resolve();
			});
		}
	});
};