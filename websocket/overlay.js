const { constants } = require('../constants');
const { oc_twitter } = require("./twitter");
const { overlaycss } = require("./css");
const { twitter } = require("../defaults/twitter");

/**
 * run a websocket to broadcast events for overlay html content
 */
class OverlayPage {
	/**
	 * 
	 * @param {object} utils 	Utils class
	 * @param {object} userArgs	Merged user settings
	 */
	constructor(params) {
		this.utils = params.utils;
		this.userArgs = params.userArgs;

		let template = twitter.template;
		let templateStr = template.replace('{{{tweeter}}}', "PlatypusMuerte");
			
		this.testData = {
			event: "twitter",
			entrance: "bounceInLeft",
			visible: "headShake",
			exit: "bounceOutLeft",
			duration: 5,
			screenpos: twitter.screenpos,
			css: `<style>` + twitter.css + `</style>`,
			volume: twitter.volume,
			soundfile: "tweet.mp3",
			template: templateStr
		};
	}

	loadPage(req) {
		let getPage = this.getPage.bind(this);

		return new Promise((resolve, reject)=>{
			resolve(getPage());
		});
	}
	
	getPage() {
		return `
		<!doctype html>
		<html lang="en">
			<head>
				<link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/smoothness/jquery-ui.css">
				<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>

				<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>				
				<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
				<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
				<script src="https://code.iconify.design/1/1.0.7/iconify.min.js"></script>
				<script src="https://cdnjs.cloudflare.com/ajax/libs/howler/2.2.0/howler.min.js" integrity="sha512-ALoawPS0JxHQ+8dGL7htZIlVNRaE/SN9gHD4G8pJJTi9H4BQ/3PjdvhggSGR34g00mvTPFkxQuveQUsJA5664Q==" crossorigin="anonymous"></script>
				<script>${oc_twitter}</script>

				${this.getRWS()}
				
				${this.getMainJS()}

				${overlaycss}
				
			</head>
			<body>
			</body>
		</html>
		`;
	}

	getMainJS() {
		return `
		<script>
		class OverlayWS {
			constructor(params) {
				this.websocket;
				this.alerts = [];
				this.twitter = new Twitter();
			}

			test(data) {
				this.alerts = [...data];

				this.processAlerts();
			}
		
			run() {
				this.websocket = new ReconnectingWebSocket("ws://localhost:3023", null, {
					reconnectInterval: 5000,
					automaticOpen: true
				});
		
				this.websocket.onopen = () => {
					this.websocket.send(JSON.stringify({"conn":"overlay"}));
				};
		
				this.websocket.onmessage = (e)=> {
					let eventData = JSON.parse(e.data);
					
					if(eventData.initiate) {
						console.log(eventData);
					} else {
						let running = (this.alerts.length);

						this.alerts = [...eventData];

						if(!running) {
							this.processAlerts();
						}
					}					
				};
			}

			processAlerts() {
				if(this.alerts.length) {
					let alert = this.alerts.shift();
					let processor = false;

					switch(alert.event) {
						case "twitter":
							processor = this.twitter;
						break;
					}

					if(processor) {
						processor.newAlert(alert).then(()=>{
							this.processAlerts();
						});
					}					
				}
			}
		}

		$(document).ready(function () {
			let ows = new OverlayWS();
			ows.run();

			/*setTimeout(()=>{
				ows.test([${JSON.stringify(this.testData)}]);
			},1000);*/
		});
		</script>
		`;
	}

	getRWS() {
		return `<script>/**

		reconnecting-websocket
		https://github.com/joewalnes/reconnecting-websocket
		
		MIT License:
		
		Copyright (c) 2010-2012, Joe Walnes
		
		Permission is hereby granted, free of charge, to any person obtaining a copy
		of this software and associated documentation files (the "Software"), to deal
		in the Software without restriction, including without limitation the rights
		to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
		copies of the Software, and to permit persons to whom the Software is
		furnished to do so, subject to the following conditions:
		
		The above copyright notice and this permission notice shall be included in
		all copies or substantial portions of the Software.
		
		THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
		IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
		FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
		AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
		LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
		OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
		THE SOFTWARE.
		
		**/
		
		!function(a,b){"function"==typeof define&&define.amd?define([],b):"undefined"!=typeof module&&module.exports?module.exports=b():a.ReconnectingWebSocket=b()}(this,function(){function a(b,c,d){function l(a,b){var c=document.createEvent("CustomEvent");return c.initCustomEvent(a,!1,!1,b),c}var e={debug:!1,automaticOpen:!0,reconnectInterval:1e3,maxReconnectInterval:3e4,reconnectDecay:1.5,timeoutInterval:2e3};d||(d={});for(var f in e)this[f]="undefined"!=typeof d[f]?d[f]:e[f];this.url=b,this.reconnectAttempts=0,this.readyState=WebSocket.CONNECTING,this.protocol=null;var h,g=this,i=!1,j=!1,k=document.createElement("div");k.addEventListener("open",function(a){g.onopen(a)}),k.addEventListener("close",function(a){g.onclose(a)}),k.addEventListener("connecting",function(a){g.onconnecting(a)}),k.addEventListener("message",function(a){g.onmessage(a)}),k.addEventListener("error",function(a){g.onerror(a)}),this.addEventListener=k.addEventListener.bind(k),this.removeEventListener=k.removeEventListener.bind(k),this.dispatchEvent=k.dispatchEvent.bind(k),this.open=function(b){h=new WebSocket(g.url,c||[]),b||k.dispatchEvent(l("connecting")),(g.debug||a.debugAll)&&console.debug("ReconnectingWebSocket","attempt-connect",g.url);var d=h,e=setTimeout(function(){(g.debug||a.debugAll)&&console.debug("ReconnectingWebSocket","connection-timeout",g.url),j=!0,d.close(),j=!1},g.timeoutInterval);h.onopen=function(){clearTimeout(e),(g.debug||a.debugAll)&&console.debug("ReconnectingWebSocket","onopen",g.url),g.protocol=h.protocol,g.readyState=WebSocket.OPEN,g.reconnectAttempts=0;var d=l("open");d.isReconnect=b,b=!1,k.dispatchEvent(d)},h.onclose=function(c){if(clearTimeout(e),h=null,i)g.readyState=WebSocket.CLOSED,k.dispatchEvent(l("close"));else{g.readyState=WebSocket.CONNECTING;var d=l("connecting");d.code=c.code,d.reason=c.reason,d.wasClean=c.wasClean,k.dispatchEvent(d),b||j||((g.debug||a.debugAll)&&console.debug("ReconnectingWebSocket","onclose",g.url),k.dispatchEvent(l("close")));var e=g.reconnectInterval*Math.pow(g.reconnectDecay,g.reconnectAttempts);setTimeout(function(){g.reconnectAttempts++,g.open(!0)},e>g.maxReconnectInterval?g.maxReconnectInterval:e)}},h.onmessage=function(b){(g.debug||a.debugAll)&&console.debug("ReconnectingWebSocket","onmessage",g.url,b.data);var c=l("message");c.data=b.data,k.dispatchEvent(c)},h.onerror=function(b){(g.debug||a.debugAll)&&console.debug("ReconnectingWebSocket","onerror",g.url,b),k.dispatchEvent(l("error"))}},1==this.automaticOpen&&this.open(!1),this.send=function(b){if(h)return(g.debug||a.debugAll)&&console.debug("ReconnectingWebSocket","send",g.url,b),h.send(b);throw"INVALID_STATE_ERR : Pausing to reconnect websocket"},this.close=function(a,b){"undefined"==typeof a&&(a=1e3),i=!0,h&&h.close(a,b)},this.refresh=function(){h&&h.close()}}return a.prototype.onopen=function(){},a.prototype.onclose=function(){},a.prototype.onconnecting=function(){},a.prototype.onmessage=function(){},a.prototype.onerror=function(){},a.debugAll=!1,a.CONNECTING=WebSocket.CONNECTING,a.OPEN=WebSocket.OPEN,a.CLOSING=WebSocket.CLOSING,a.CLOSED=WebSocket.CLOSED,a});
		</script>`;
	}
}

exports.OverlayPage = OverlayPage;