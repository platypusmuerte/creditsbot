const { constants } = require('../constants');

class EventManager {
	constructor(params) {
		this.utils = params.utils;
	}

	bits_add(name) {
		this.utils.console(name)
	}
}

exports.EventManager = EventManager;