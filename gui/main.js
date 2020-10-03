const { constants } = require('../constants');
const { css } = require("./css");
const { js } = require("./js");
//const { mytinycolor } = require("./libs/spectrum-colorpicker2/mytinycolor");

const { PageTopSection } = require("./section.top");
const { PageMenu } = require("./menu");
const { PageBody } = require("./body");

/**
 * Main GUI class to build the interface
 */
class GUI {
	/**
	 * 
	 * @param {object} utils		Utils class
	 * @param {object} path
	 * @param {object} fs
	 * @param {object} db			Db adapter
	 * @param {string} dataDir		path to user data dir
	 * @param {object} userArgs		merged user settings
	 * 
	 * @property {string} defaultPage			page to fall back on - used to map to a class and highlight menus
	 * @property {bool|string} defaultSubPage	sub page to fall back to - used to map to a class and highlight menus
	 * @property {string} page					the current page requested (path reference mapped to class ref)
	 * @property {string} subPage				the current sub page requested (path ref mapped to class ref)
	 */
	constructor(params) {
		this.utils = params.utils;
		this.path = params.path;
		this.fs = params.fs;
		this.db = params.db;
		this.dataDir = params.dataDir;
		this.userArgs = params.userArgs;

		this.defaultPage = "home";
		this.defaultSubPage = false;
		this.page = this.defaultPage;
		this.subPage = this.defaultSubPage;
	}

	/**
	 * Determine path vars, and query string, start building the page
	 * @param {object} req express request object
	 * 
	 * @returns {promise}	string of entire html page for browser
	 */
	loadPage(req) {
		let buildPage = this.buildPage.bind(this);
		let params = req.params[0].split("/");
		this.page = (params[0]) ? params[0] : this.defaultPage;
		this.subPage = (params[1]) ? params[1] : this.defaultSubPage;

		return new Promise(function (resolve, reject) {
			buildPage(req.query).then((pageContent) => {
				resolve(pageContent);
			});
		});;
	}

	/**
	 * Get the page headers, menu, body, footer
	 * @param {object} query express query string object
	 * 
	 * @returns {promise}	string of page sections for rendering
	 */
	buildPage(query) {
		let getBody = this.getBody.bind(this);
		let htmlPreStr = this.getHtmlOpen() + this.getHead() + this.getBodyOpen();
		let htmlPostStr = this.getFooterIncludes() + this.getBodyClose() + this.getHtmlClose()

		return new Promise(function (resolve, reject) {
			getBody(query).then((body) => {
				resolve(htmlPreStr + body + htmlPostStr);
			});
		});
	}

	getBodyOpen() {
		return `<body>`;
	}

	/**
	 * Take the path/page data and query string, and wrap it all with the main page template
	 * 		- hand of data to the sub classes to assemble parts based of page/path/query vars
	 * 		- dumps it all into an array, then joins as a string
	 * @param {object} query express query string object
	 * 
	 * @returns {promise} string of top, menu, and body content
	 */
	getBody(query) {
		let body = [];

		let topSection = new PageTopSection({ utils: this.utils, db: this.db, dataDir: this.dataDir, userArgs: this.userArgs, page: this.page, subpage: this.subPage });
		let pageMenu = new PageMenu({ utils: this.utils, db: this.db, dataDir: this.dataDir, userArgs: this.userArgs, page: this.page, subpage: this.subPage });
		let bodyContent = new PageBody({ utils: this.utils, db: this.db, dataDir: this.dataDir, userArgs: this.userArgs, page: this.page, subpage: this.subPage, query: query });

		body.push(topSection.render());		

		return new Promise(function (resolve, reject) {
			bodyContent.render().then((res) => {
				body.push(`<div class="container-fluid mainSectionContainer h-100">
					<div class="row">
						<div class="col col-1 menuContainer">
							${pageMenu.render()}
						</div>
						<div class="col bodyContainer">
							${res}
						</div>
					</div>
				</div>`);

				resolve(body.join(""));
			});
		});
	}

	getBodyClose() {
		return `</body>`;
	}

	/**
	 * Builds the head section for the GUI page and returns as a string
	 */
	getHead() {
		let myTinyColor = this.fs.readFileSync('./gui/libs/spectrum-colorpicker2/mytinycolor.js');

		return `<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
		<title>Platys Credits Bot UI</title>
		<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
		<link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/smoothness/jquery-ui.css">
		<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>
		<script src="https://cdn.jsdelivr.net/npm/spectrum-colorpicker2/dist/spectrum.min.js"></script>		
		<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/spectrum-colorpicker2/dist/spectrum.min.css">
		<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">		
		<script>` + js + `</script>
		<style>` + css + `</style>
		<script>` + myTinyColor + `</script>
		</head>`;
	}

	/**
	 * Builds footer includes and returns as a string
	 */
	getFooterIncludes() {
		return `
		<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossorigin="anonymous"></script>
		<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js" integrity="sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shuf57BaghqFfPlYxofvL8/KUEfYiJOMMV+rV" crossorigin="anonymous"></script>
		`;
	}

	getHtmlOpen() {
		return `<!doctype html><html lang="en">`;
	}

	getHtmlClose() {
		return `</html>`;
	}
}

exports.GUI = GUI;