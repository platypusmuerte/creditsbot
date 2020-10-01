const { constants } = require('../../constants');

/**
 * Main body class used to extend to all body classes, incase there is something they all need access to
 * likely get rid of this.....
 */
class BodyBase {
	constructor(params) {
		
	}

	render() {
		return ``;
	}

}

exports.BodyBase = BodyBase;