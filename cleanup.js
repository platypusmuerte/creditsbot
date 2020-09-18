exports.cleanup = (userArgs, path, fs, utils, dataDir)=>{
	return new Promise(function (resolve, reject) {
		if (userArgs.CLEAN_ON_STARTUP) {
			let dir = path.join(dataDir, "");

			fs.readdir(dir, (err, files) => {
				if (err) throw err;


				for (const file of files) {
					let ext = path.extname(file);

					if (!fs.lstatSync(path.join(dir, file)).isDirectory() && (ext !== ".hdb")) {
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