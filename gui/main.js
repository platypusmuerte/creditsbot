const { constants } = require('../constants');
const { css } = require("./css");
const { js } = require("./js");

const { PageTopSection } = require("./section.top");
const { PageMenu } = require("./menu");
const { PageBody } = require("./body");

class GUI {
	constructor(params) {
		this.utils = params.utils;
		this.db = params.db;
		this.dataDir = params.dataDir;
		this.userArgs = params.userArgs;

		this.defaultPage = "home";
		this.defaultSubPage = false;
		this.page = this.defaultPage;
		this.subPage = this.defaultSubPage;
	}

	loadPage(req) {
		let buildPage = this.buildPage.bind(this);
		let params = req.params[0].split("/");
		this.page = (params[0]) ? params[0] : this.defaultPage;
		this.subPage = (params[1]) ? params[1] : this.defaultSubPage;

		console.log(params, this.page, this.subPage);

		return new Promise(function (resolve, reject) {
			buildPage().then((pageContent) => {
				resolve(pageContent);
			});
		});;
	}

	buildPage() {
		let getBody = this.getBody.bind(this);
		let htmlPreStr = this.getHtmlOpen() + this.getHead() + this.getBodyOpen();
		let htmlPostStr = this.getFooterIncludes() + this.getBodyClose() + this.getHtmlClose()

		return new Promise(function (resolve, reject) {
			getBody().then((body) => {
				resolve(htmlPreStr + body + htmlPostStr);
			});
		});
	}

	getBodyOpen() {
		return `<body>`;
	}

	getBody() {
		let body = [];

		let topSection = new PageTopSection({ utils: this.utils, db: this.db, dataDir: this.dataDir, userArgs: this.userArgs, page: this.page, subpage: this.subPage });
		let pageMenu = new PageMenu({ utils: this.utils, db: this.db, dataDir: this.dataDir, userArgs: this.userArgs, page: this.page, subpage: this.subPage });
		let bodyContent = new PageBody({ utils: this.utils, db: this.db, dataDir: this.dataDir, userArgs: this.userArgs, page: this.page, subpage: this.subPage });

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

	getHead() {
		return `<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
		<title>Platys Credits Bot UI</title>
		<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
		<script>` + js + `</script>
		<style>` + css + `</style>
		</head>`;
	}

	//<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
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