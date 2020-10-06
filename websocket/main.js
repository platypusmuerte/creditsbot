const { constants } = require('../constants');
const WebSocket = require('ws');

/**
 * run a websocket to broadcast events for overlay html content
 */
class OverlayWebSocket {
	/**
	 * 
	 * @param {object} utils 	Utils class
	 * @param {object} userArgs	Merged user settings
	 * 
	 * @property {object}	wss				web socket server
	 * @property {object}	ws				an active websocket
	 */
	constructor(params) {
		this.utils = params.utils;
		this.userArgs = params.userArgs;

		this.wss;
		this.ws;
	}

	init() {
		this.wss = new WebSocket.Server({ port: constants.APP.DEFAULTS.WEBSOCKET_PORT });

		this.wss.on('open', this.onopen.bind(this));
		this.wss.on('connection', this.connection.bind(this));
		this.wss.on('close', this.onclose.bind(this));
		
		this.userArgs.DEBUG && this.utils.wsconsole("Initialized ");

		setTimeout(()=>{
			this.sendMessage('{"test":"pass"}');
		},5000);
	}

	onopen() {
		this.userArgs.DEBUG && this.utils.wsconsole("Opened ");
	}

	connection(ws) {
		this.ws = ws;
		
		this.ws.on("message",(message) => {
			this.userArgs.DEBUG && this.utils.wsconsole("Received: " + message);
		});
	}

	onclose() {
		this.userArgs.DEBUG && this.utils.wsconsole("Closed ");
	}

	sendMessage(data) {
		this.userArgs.DEBUG && this.utils.wsconsole("Sending message ");

		if(this.ws) {
			this.ws.send(data);
		} else {
			this.userArgs.DEBUG && this.utils.wsconsole("No clients to send to ");
		}		
	}
}

exports.OverlayWebSocket = OverlayWebSocket;