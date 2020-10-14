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
		this.clients = {};
	}

	init() {
		this.wss = new WebSocket.Server({ port: constants.APP.DEFAULTS.WEBSOCKET_PORT });

		this.wss.on('open', this.onopen.bind(this));
		this.wss.on('connection', this.connection.bind(this));
		this.wss.on('close', this.onclose.bind(this));
		
		this.userArgs.DEBUG && this.utils.wsconsole("Initialized ");

		setTimeout(()=>{
			this.sendMessage('{"initiate":true}',"all");
		},8000);
	}

	onopen() {
		this.userArgs.DEBUG && this.utils.wsconsole("Opened ");
	}

	connection(ws) {
		this.ws = ws;
		
		this.ws.on("message",(message) => {
			let msg = JSON.parse(message);

			this.clients[msg.conn] = ws;
			
			this.userArgs.DEBUG && this.utils.wsconsole("Established connection with: " + msg.conn);

			/*setInterval(()=>{
				this.sendMessage('{"initiate":"polling"}',msg.conn);
			},5000);*/
		});
	}

	onclose() {
		this.userArgs.DEBUG && this.utils.wsconsole("Closed ");
	}

	sendMessage(data,client) {
		this.userArgs.DEBUG && this.utils.wsconsole("Sending message to " + client);

		if(this.ws) {
			if(client === "all") {
				this.wss.clients.forEach((client)=>{
					if(client.readyState === WebSocket.OPEN) {
						client.send(data);
					}
				});
			} else {
				if(this.clients[client]) {
					this.clients[client].send(data);
				} else {
					this.userArgs.DEBUG && this.utils.wsconsole("No client reference for  " + client);
				}				
			}			
		} else {
			this.userArgs.DEBUG && this.utils.wsconsole("No clients to send to ");
		}		
	}
}

exports.OverlayWebSocket = OverlayWebSocket;