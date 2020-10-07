const { constants } = require('../constants');

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
				${this.getRWS()}
				
				${this.getMainJS()}
				<style>
				.alertWrapper {
					display: inline-block;
					position: absolute;
				}
				.tl, .tc, .tr, .cl, .cc, .cr, .bl, .bc, .br {
					
				}
				.tl {
					top: 0px;
					left: 0px;
				}
				.tc {
					top: 0px;
					left: 50%;
					transform: translateX(-50%);
				}
				.tr {
					top: 0px;
					right: 0px;
				}
				.cl {
					left: 0px;
					top: 50%;
					transform: translateY(-50%);
				}
				.cc {
					left: 50%;
					transform: translateX(-50%);
					top: 50%;
					transform: translateY(-50%);
				}
				.cr {
					right: 0px;
					top: 50%;
					transform: translateY(-50%);
				}
				.bl {
					bottom: 0px;
					left: 0px;
				}
				.bc {
					top: 0px;
					left: 50%;
					transform: translateX(-50%);
				}
				.br {
					bottom: 0px;
					right: 0px;
				}
				</style>
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
				this.duration = 5000;
				this.entrance = "none";
				this.visible = "none";
				this.exit = "none";
				this.css = '';
				this.screenpos = "tr";
			}
		
			run() {

				let websocket = new ReconnectingWebSocket("ws://localhost:3023", null, {
					reconnectInterval: 5000
				});
		
				websocket.onopen = () => {
					console.log("Connected to WS");

					websocket.send("Hello? Is it me your looking for?");
				};
		
				websocket.onmessage = (e)=> {
					let eventData = JSON.parse(e.data);

					if(eventData.alerts) {
						let isRunning = (this.alerts.length);
						this.alerts = [...eventData.alerts];
						
						this.duration = eventData.duration*1000;
						this.entrance = eventData.entrance;
						this.visible = eventData.visible;
						this.exit = eventData.exit;
						this.css = eventData.css;
						this.screenpos = eventData.screenpos;

						if(!isRunning) {
							this.processAlerts();
						}						
					} else {
						console.log(eventData);
					}
				};
			}

			processAlerts() {
				$("body").append(this.css).append($("<div>",{"id":"alertWrapper","class":"alertWrapper " + this.screenpos + " animate__animated"}));

				this.queueAlert();
			}

			queueAlert() {
				console.log(this.alerts);

				if(this.alerts.length) {
					let alert = this.alerts.shift();

					this.doNextAlert(alert).then(()=>{
						this.queueAlert();
					});
				}
			}

			doNextAlert(alert) {
				let showAlert = this.showAlert.bind(this);
				let removeAlert = this.removeAlert.bind(this);
				let visible = this.visible;
				let duration = this.duration;

				return new Promise((resolve, reject)=>{
					this.addAlertToScreen(alert).then(()=>{
						showAlert().then(()=>{
							// add visible animation if any
							if(visible !== "none") {
								$("#alertWrapper").addClass("animate__" + visible);
							}

							// leave it on screen for duration
							// remove animation
							setTimeout(()=>{
								$("#alertWrapper").removeClass("animate__" + visible);
								removeAlert().then(()=>{
									resolve();
								});								
							},duration);
						});
					});
				});
			}

			addAlertToScreen(alert) {
				return new Promise((resolve, reject)=>{
					$("#alertWrapper").append(
						alert
					);
					resolve();
				});				
			}

			showAlert() {
				let entrance = this.entrance;

				return new Promise((resolve, reject)=>{
					if(entrance === "none") {
						$("#alertWrapper").show();
						resolve();
					} else {
						$("#alertWrapper").addClass("animate__" + entrance);

						// give animation time to finish
						setTimeout(()=>{
							$("#alertWrapper").removeClass("animate__" + entrance);
							resolve();
						},2000);
					}
				});				
			}

			removeAlert() {
				let exit = this.exit;

				return new Promise((resolve, reject)=>{
					if(exit === "none") {
						$("#alertWrapper").remove();
						resolve();
					} else {
						$("#alertWrapper").addClass("animate__" + exit);

						// give animation time to finish
						setTimeout(()=>{
							$("#alertWrapper").remove();
							resolve();
						},2000);
					}				
				});				
			}
		}

		$(document).ready(function () {
			new OverlayWS().run();
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