exports.header = (utils, constants) => {
	return new Promise(function (resolve, reject) {
		utils.console("==========================================");
		utils.console("    " + constants.APP.NAME);
		utils.console("    version: " + constants.APP.VERSION);
		utils.console("    https://github.com/platypusmuerte/creditsbot");
		utils.console("    License: https://opensource.org/licenses/ISC");
		utils.console("==========================================");
		utils.console(" ");
		resolve();
	});
};