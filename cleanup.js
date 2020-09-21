exports.cleanup = (userArgs, path, fs, utils, dataDir)=>{
	return new Promise(function (resolve, reject) {
		// 1.2.4->5 cleanup
		let v124 = false;

		if (fs.existsSync("./templates/_credits.html")) {
			fs.rename("./templates/_credits.html", "./templates/_DELETE_ME_credits.html",()=>{});
			v124 = true;
		}
		if (fs.existsSync("./templates/_credits.css")) {
			fs.rename("./templates/_credits.css", "./templates/_DELETE_ME_credits.css", () => { });
			v124 = true;
		}

		v124 && userArgs.DEBUG && utils.console("_DELETE_ME_credits.html and _DELETE_ME_credits.css are no longer used, and can be removed. These will be deleted automatically in next version. ");


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