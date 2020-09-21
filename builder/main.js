const { constants } = require('../constants');
let { mainTemplateFile } = require("./main_template");
let { mainCSS } = require("./main_css");
let { mainBody } = require("./main_body");
const path = require('path');
const fs = require('fs');
const Mustache = require("mustache");

class Builder {
	constructor(params) {
		this.utils = params.utils;
		this.userArgs = params.userArgs;
		this.db;
		this.finalHTML;
		this.bodyContentForTemplate = ``;

		this.templates = [
			{ file: "_name", name: "mods", user: '<div class="name">{{name}}</div>', wrapper: '<div class="modsWrapper">{{{group}}}</div>' },
			{ file: "_name", name: "vips", user: '<div class="name">{{name}}</div>', wrapper: '<div class="vipsWrapper">{{{group}}}</div>' },
			{ file: "_name", name: "follows", user: '<div class="name">{{name}}</div>', wrapper: '<div class="followsWrapper">{{{group}}}</div>' },
			{ file: "_name", name: "subs", user: '<div class="name">{{name}}</div>', wrapper: '<div class="subsWrapper">{{{group}}}</div>' },
			{ file: "_name", name: "giftsubs", user: '<div class="name">{{name}}</div>', wrapper: '<div class="giftsubsWrapper">{{{group}}}</div>' },
			{ file: "_name", name: "patreons", user: '<div class="name">{{name}}</div>', wrapper: '<div class="patreonsWrapper">{{{group}}}</div>' },
			{ file: "_name", name: "donos", user: '<div class="name">{{name}}</div>', wrapper: '<div class="donosWrapper">{{{group}}}</div>' },
			{ file: "_name", name: "hosts", user: '<div class="name">{{name}}</div>', wrapper: '<div class="hostsWrapper">{{{group}}}</div>' },
			{ file: "_name", name: "raids", user: '<div class="name">{{name}}</div>', wrapper: '<div class="raidsWrapper">{{{group}}}</div>' },
			{ file: "_name", name: "bans", user: '<div class="name">{{name}}</div>', wrapper: '<div class="bansWrapper">{{{group}}}</div>' },
			{ file: "_name", name: "bits", user: '<div class="name">{{name}}</div>', wrapper: '<div class="bitsWrapper">{{{group}}}</div>' },
			{ file: "_name", name: "channelpoints", user: '<div class="name">{{name}}</div>', wrapper: '<div class="channelpointsWrapper">{{{group}}}</div>' },
			{ file: "_name", name: "chatters", user: '<div class="name">{{name}}</div>', wrapper: '<div class="chattersWrapper">{{{group}}}</div>' },
			/*{ file: "_name", name: "streamloots", user: '<div class="name">{{name}}</div>', wrapper: '<div class="streamlootsWrapper">{{{group}}}</div>' },*/
			
			{ file: "_top5", name: "giftsubs", user: '<div class="nameTop5"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>', wrapper: '<div class="giftsubsTop5Wrapper">{{{group}}}</div>' },
			{ file: "_top5", name: "bits", user: '<div class="nameTop5"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>', wrapper: '<div class="bitsTop5Wrapper">{{{group}}}</div>' },
			{ file: "_top5", name: "donos", user: '<div class="nameTop5"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>', wrapper: '<div class="donosTop5Wrapper">{{{group}}}</div>' },
			{ file: "_top5", name: "channelpoints", user: '<div class="nameTop5"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>', wrapper: '<div class="channelpointsTop5Wrapper">{{{group}}}</div>' },
			{ file: "_top5", name: "chatters", user: '<div class="nameTop5"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>', wrapper: '<div class="chattersTop5Wrapper">{{{group}}}</div>' },
			/*{ file: "_top5", name: "streamloots", user: '<div class="nameTop5"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>', wrapper: '<div class="streamlootsTop5Wrapper">{{{group}}}</div>' },*/
			
			{ file: "_top5_cards", name: "streamloots", user: '<div class="nameTop5Cards"><div class="name"></div><div class="card"><img src="{{card}}" /><div class="amount">{{amount}}</div></div></div>', wrapper: '<div class="streamlootsTop5CardsWrapper">{{{group}}}</div>' },
			{ file: "_top10_cards", name: "streamloots", user: '<div class="nameTop5Cards"><div class="name"></div><div class="card"><img src="{{card}}" /><div class="amount">{{amount}}</div></div></div>', wrapper: '<div class="streamlootsTop10CardsWrapper">{{{group}}}</div>' },
			{ file: "_top5H_cards", name: "hstreamloots", user: '<div class="nameTop5Cards"><div class="name"></div><div class="card"><img src="{{card}}" /><div class="amount">{{amount}}</div></div></div>', wrapper: '<div class="hstreamlootsTop5CardsWrapper">{{{group}}}</div>' },
			{ file: "_top10H_cards", name: "hstreamloots", user: '<div class="nameTop5Cards"><div class="name"></div><div class="card"><img src="{{card}}" /><div class="amount">{{amount}}</div></div></div>', wrapper: '<div class="hstreamlootsTop5CardsWrapper">{{{group}}}</div>' },

			{ file: "_name_amount", name: "giftsubs", user: '<div class="nameAmount"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>', wrapper: '<div class="giftsubsAmountWrapper">{{{group}}}</div>' },
			{ file: "_name_amount", name: "bits", user: '<div class="nameAmount"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>', wrapper: '<div class="bitsAmountWrapper">{{{group}}}</div>' },
			{ file: "_name_amount", name: "donos", user: '<div class="nameAmount"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>', wrapper: '<div class="donosAmountWrapper">{{{group}}}</div>' },
			{ file: "_name_amount", name: "channelpoints", user: '<div class="nameAmount"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>', wrapper: '<div class="channelpointsAmountWrapper">{{{group}}}</div>' },
			{ file: "_name_amount", name: "chatters", user: '<div class="nameAmount"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>', wrapper: '<div class="chattersAmountWrapper">{{{group}}}</div>' },
			/*{ file: "_name_amount", name: "streamloots", user: '<div class="nameAmount"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>', wrapper: '<div class="streamlootsAmountWrapper">{{{group}}}</div>' },*/

			{ file: "_name_total", name: "giftsubs", user: '<div class="nameTotal"><div class="name">{{name}}</div><div class="total">{{total}}</div></div>', wrapper: '<div class="giftsubsTotalWrapper">{{{group}}}</div>' },
			{ file: "_name_total", name: "subs", user: '<div class="nameTotal"><div class="name">{{name}}</div><div class="total">{{total}}</div></div>', wrapper: '<div class="subsTotalWrapper">{{{group}}}</div>' },
			{ file: "_name_total", name: "bits", user: '<div class="nameTotal"><div class="name">{{name}}</div><div class="total">{{total}}</div></div>', wrapper: '<div class="bitsTotalWrapper">{{{group}}}</div>' },
			{ file: "_name_total", name: "donos", user: '<div class="nameTotal"><div class="name">{{name}}</div><div class="total">{{total}}</div></div>', wrapper: '<div class="donosTotalWrapper">{{{group}}}</div>' },
			{ file: "_name_total", name: "channelpoints", user: '<div class="nameTotal"><div class="name">{{name}}</div><div class="total">{{total}}</div></div>', wrapper: '<div class="channelpointsTotalWrapper">{{{group}}}</div>' },
			{ file: "_name_total", name: "hosts", user: '<div class="nameTotal"><div class="name">{{name}}</div><div class="total">{{total}}</div></div>', wrapper: '<div class="hostsTotalWrapper">{{{group}}}</div>' },
			{ file: "_name_total", name: "raids", user: '<div class="nameTotal"><div class="name">{{name}}</div><div class="total">{{total}}</div></div>', wrapper: '<div class="raidsTotalWrapper">{{{group}}}</div>' },
			/*{ file: "_name_total", name: "streamloots", user: '<div class="nameTotal"><div class="name">{{name}}</div><div class="total">{{total}}</div></div>', wrapper: '<div class="streamlootsTotalWrapper">{{{group}}}</div>' },*/

			{ file: "_name_amount_total", name: "bits", user: '<div class="nameAmountTotal"><div class="name">{{name}}</div><div class="amount">{{amount}}</div><div class="total">{{total}}</div></div>', wrapper: '<div class="bitsAmountTotalWrapper">{{{group}}}</div>' },
			{ file: "_name_amount_total", name: "donos", user: '<div class="nameAmountTotal"><div class="name">{{name}}</div><div class="amount">{{amount}}</div><div class="total">{{total}}</div></div>', wrapper: '<div class="donosAmountTotalWrapper">{{{group}}}</div>' },
			{ file: "_name_amount_total", name: "giftsubs", user: '<div class="nameAmountTotal"><div class="name">{{name}}</div><div class="amount">{{amount}}</div><div class="total">{{total}}</div></div>', wrapper: '<div class="giftsubsAmountTotalWrapper">{{{group}}}</div>' },
			{ file: "_name_amount_total", name: "channelpoints", user: '<div class="nameAmountTotal"><div class="name">{{name}}</div><div class="amount">{{amount}}</div><div class="total">{{total}}</div></div>', wrapper: '<div class="channelpointsAmountTotalWrapper">{{{group}}}</div>' },
			/*{ file: "_name_amount_total", name: "streamloots", user: '<div class="nameAmountTotal"><div class="name">{{name}}</div><div class="amount">{{amount}}</div><div class="total">{{total}}</div></div>', wrapper: '<div class="streamlootsAmountTotalWrapper">{{{group}}}</div>' },*/

			{ file: "_top10", name: "giftsubs", user: '<div class="nameTop10"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>', wrapper: '<div class="giftsubsTop10Wrapper">{{{group}}}</div>' },
			{ file: "_top10", name: "bits", user: '<div class="nameTop10"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>', wrapper: '<div class="bitsTop10Wrapper">{{{group}}}</div>' },
			{ file: "_top10", name: "donos", user: '<div class="nameTop10"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>', wrapper: '<div class="donosTop10Wrapper">{{{group}}}</div>' },
			{ file: "_top10", name: "channelpoints", user: '<div class="nameTop10"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>', wrapper: '<div class="channelpointsTop10Wrapper">{{{group}}}</div>' },
			{ file: "_top10", name: "chatters", user: '<div class="nameTop10"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>', wrapper: '<div class="chattersTop10Wrapper">{{{group}}}</div>' },
			/*{ file: "_top10", name: "streamloots", user: '<div class="nameTop10"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>', wrapper: '<div class="streamlootsTop10Wrapper">{{{group}}}</div>' },*/
			
			{ file: "_top10H", name: "hgiftsubs", user: '<div class="nameTop10"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>', wrapper: '<div class="hgiftsubsTop10Wrapper">{{{group}}}</div>' },
			{ file: "_top10H", name: "hbits", user: '<div class="nameTop10"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>', wrapper: '<div class="hbitsTop10Wrapper">{{{group}}}</div>' },
			{ file: "_top10H", name: "hdonos", user: '<div class="nameTop10"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>', wrapper: '<div class="hdonosTop10Wrapper">{{{group}}}</div>' },
			{ file: "_top10H", name: "hsubs", user: '<div class="nameTop10"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>', wrapper: '<div class="hsubsTop10Wrapper">{{{group}}}</div>' },
			{ file: "_top10H", name: "hhosts", user: '<div class="nameTop10"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>', wrapper: '<div class="hhostsTop10Wrapper">{{{group}}}</div>' },
			{ file: "_top10H", name: "hraids", user: '<div class="nameTop10"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>', wrapper: '<div class="hraidsTop10Wrapper">{{{group}}}</div>' },
			{ file: "_top10H", name: "hchannelpoints", user: '<div class="nameTop10"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>', wrapper: '<div class="hchannelpointsTop10Wrapper">{{{group}}}</div>' },
			/*{ file: "_top10H", name: "hstreamloots", user: '<div class="nameTop10"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>', wrapper: '<div class="hstreamlootsTop10Wrapper">{{{group}}}</div>' },*/

			{ file: "_top5H", name: "hgiftsubs", user: '<div class="nameTop5"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>', wrapper: '<div class="hgiftsubsTop5Wrapper">{{{group}}}</div>' },
			{ file: "_top5H", name: "hbits", user: '<div class="nameTop5"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>', wrapper: '<div class="hbitsTop5Wrapper">{{{group}}}</div>' },
			{ file: "_top5H", name: "hdonos", user: '<div class="nameTop5"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>', wrapper: '<div class="hdonosTop5Wrapper">{{{group}}}</div>' },
			{ file: "_top5H", name: "hsubs", user: '<div class="nameTop5"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>', wrapper: '<div class="hsubsTop5Wrapper">{{{group}}}</div>' },
			{ file: "_top5H", name: "hhosts", user: '<div class="nameTop5"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>', wrapper: '<div class="hhostsTop5Wrapper">{{{group}}}</div>' },
			{ file: "_top5H", name: "hraids", user: '<div class="nameTop5"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>', wrapper: '<div class="hraidsTop5Wrapper">{{{group}}}</div>' },
			{ file: "_top5H", name: "hchannelpoints", user: '<div class="nameTop5"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>', wrapper: '<div class="hchannelpointsTop5Wrapper">{{{group}}}</div>' },
			/*{ file: "_top5H", name: "hstreamloots", user: '<div class="nameTop5"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>', wrapper: '<div class="hstreamlootsTop5Wrapper">{{{group}}}</div>' }*/
		];

		this.prep();
		this.checkTemplates();
		this.final();
	}

	prep() {
		if (!fs.existsSync(constants.TEMPLATE_DIRS.BASE)) {
			fs.mkdirSync(constants.TEMPLATE_DIRS.BASE);
			this.userArgs.DEBUG && this.utils.console("Created template dir");
		} else {
			this.userArgs.DEBUG && this.utils.console("Found template dir");
		}

		if (!fs.existsSync(constants.TEMPLATE_DIRS.STATIC)) {
			fs.mkdirSync(constants.TEMPLATE_DIRS.STATIC);
			this.userArgs.DEBUG && this.utils.console("Created user content dir");
		} else {
			this.userArgs.DEBUG && this.utils.console("Found user content dir");
		}
	}

	final() {
		this.userArgs.DEBUG && this.utils.console(" ");
	}

	checkTemplates() {
		this.ensureDefaultFiles();
		//this.ensureMainCSS();
		//this.ensureUserCSS();

		this.templates.forEach((t)=>{
			this.ensureInnerTemplateFiles(t);
			this.ensureWrapperTemplateFiles(t);
		});
	}

	ensureBodyHTML() {
		let str = ``;

		this.templates.forEach((section)=>{
			let keyName = section.name + section.file;
			str += `
			<!-- ` + keyName + ` section -->
			<div id="section_` + keyName + `" class="creditSection">
				<div class="sectionTitleWrapper" >
					<div class="sectionTitle">` + this.userArgs["SECTION_" + keyName.toUpperCase()] + `</div>
				</div>
				{{{` + keyName + `}}}
				<div class="dividerWrapper">
					<div class="divider"></div>
				</div>
			</div>
			<!-- end ` + keyName + ` section -->
			`;
		});

		mainBody = str;

		this.userArgs.DEBUG && this.utils.console("  Created body template content");
	}

	ensureDefaultFiles() {
		let defaultHTMLName = constants.TEMPLATE_DIRS.BASE + "/" + constants.TEMPLATE_FILES.DEFAULT_HTML;
		let defaultCSSName = constants.TEMPLATE_DIRS.BASE + "/" + constants.TEMPLATE_FILES.DEFAULT_CSS;
		let userHTMLName = constants.TEMPLATE_DIRS.BASE + "/" + constants.TEMPLATE_FILES.USER_HTML;
		let userCSSName = constants.TEMPLATE_DIRS.BASE + "/" + constants.TEMPLATE_FILES.USER_CSS;
		let theBody;

		this.ensureBodyHTML();

		theBody = mainTemplateFile.replace('{{{body}}}', mainBody);

		// write our current defaults each time
		fs.writeFile(defaultHTMLName, theBody, () => {
			this.userArgs.DEBUG && this.utils.console("  Created " + constants.TEMPLATE_FILES.DEFAULT_HTML + " template");
		});

		fs.writeFile(defaultCSSName, mainCSS, () => {
			this.userArgs.DEBUG && this.utils.console("  Created " + constants.TEMPLATE_FILES.DEFAULT_CSS + " template");
		});

		// write users files if not exists
		if (!fs.existsSync(userHTMLName)) {
			fs.writeFile(userHTMLName, theBody, () => {
				this.userArgs.DEBUG && this.utils.console("  Created " + constants.TEMPLATE_FILES.USER_HTML + " template");
			});
		}

		if (!fs.existsSync(userCSSName)) {
			fs.writeFile(userCSSName, "/* Place custom CSS in this file to overwrite the _credits.css avoiding update issues */", () => {
				this.userArgs.DEBUG && this.utils.console("  Created " + constants.TEMPLATE_FILES.USER_CSS + " template");
			});
		}


		/*let mainHTML = constants.TEMPLATE_DIRS.BASE + "/_credits.html";
		let defaultHTML = constants.TEMPLATE_DIRS.BASE + "/_default.html";

		this.ensureBodyHTML();

		let theBody = mainTemplateFile.replace('{{{body}}}', mainBody);

		if (!fs.existsSync(mainHTML)) {
			fs.writeFile(mainHTML, theBody, () => {
				this.userArgs.DEBUG && this.utils.console("  Created _credits.html template");
			});
		}

		fs.writeFile(defaultHTML, theBody, () => {
			this.userArgs.DEBUG && this.utils.console("  Created _default.html template");
		});*/
	}

	ensureMainCSS() {
		/*let cssContent = constants.TEMPLATE_DIRS.BASE + "/_credits.css";

		if (!fs.existsSync(cssContent)) {
			fs.writeFile(cssContent, mainCSS, () => {
				this.userArgs.DEBUG && this.utils.console("  Created _credits.css template");
			});
		}*/
	}

	ensureUserCSS() {
		let cssContent = constants.TEMPLATE_DIRS.BASE + "/_user.css";

		if (!fs.existsSync(cssContent)) {
			fs.writeFile(cssContent, "/* Place custom CSS in this file to overwrite the _credits.css avoiding update issues */", () => {
				this.userArgs.DEBUG && this.utils.console("  Created _user.css template");
			});
		}
	}

	ensureInnerTemplateFiles(t) {
		let fname = (t.name === t.file) ? t.name : t.name + t.file;
		let inner = constants.TEMPLATE_DIRS.BASE + "/" + fname + ".html";

		if (!fs.existsSync(inner)) {
			fs.writeFile(inner, t.user, () => { });

			this.userArgs.DEBUG && this.utils.console("  Created " + fname + " template");
		}
	}

	ensureWrapperTemplateFiles(t) {
		let fname = (t.name === t.file) ? t.name : t.name + t.file;
		let wrapper = constants.TEMPLATE_DIRS.BASE + "/" + fname + "_wrapper.html";

		if (!fs.existsSync(wrapper)) {
			fs.writeFile(wrapper, t.wrapper, () => { });

			this.userArgs.DEBUG && this.utils.console("  Created " + fname + "_wrapper template");
		}
	}

	getCreditsHTML() {
		this.userArgs.DEBUG && this.utils.console(" ");
		this.userArgs.DEBUG && this.utils.console("Fetching credits output");
		this.userArgs.DEBUG && this.utils.console(" ");
		let mainTemplate, mainCSS, templateObj, bodyWithSectionTags, output, userCSS;

		mainTemplate = fs.readFileSync(constants.TEMPLATE_DIRS.BASE + "/" + constants.TEMPLATE_FILES.USER_HTML, 'utf8');
		mainCSS = fs.readFileSync(constants.TEMPLATE_DIRS.BASE + "/" + constants.TEMPLATE_FILES.DEFAULT_CSS, 'utf8');
		userCSS = fs.readFileSync(constants.TEMPLATE_DIRS.BASE + "/" + constants.TEMPLATE_FILES.USER_CSS, 'utf8');
		
		templateObj = {
			css: "<style>" + mainCSS + "</style>",
			usercss: "<style>" + userCSS + "</style>"
		};

		//bodyWithSectionTags = mainTemplate.replace('{{{body}}}', mainBody);

		this.finalHTML.forEach((s)=>{
			templateObj[s.key] = s.html;
		});

		output = Mustache.render(mainTemplate, templateObj);

		this.userArgs.DEBUG && this.utils.console(" ");
		this.userArgs.DEBUG && this.utils.console("Credits output sent");
		this.userArgs.DEBUG && this.utils.console(" ");

		return output;
	}

	assembleTemplates(db) {
		this.db = db;
		let getTemplateHTML = this.getTemplateHTML.bind(this);
		let setFinalHTML = this.setFinalHTML.bind(this);

		return new Promise(function (resolve, reject) {
			getTemplateHTML().then((r) => {
				setFinalHTML(r);
				resolve();
			});
		});
	}

	setFinalHTML(finalHTML) {
		this.finalHTML = finalHTML;
	}

	getTemplateHTML() {
		return Promise.all([
			/* name */
			this.getNameAmount("bans","_name"), 
			this.getNameAmount("bits", "_name"),
			this.getNameAmount("channelpoints", "_name"),
			this.getNameAmount("chatters", "_name"),
			this.getNameAmount("follows", "_name"),
			this.getNameAmount("giftsubs", "_name"),
			this.getNameAmount("patreons", "_name"),
			this.getNameAmount("donos", "_name"),
			this.getNameAmount("hosts", "_name"),
			this.getNameAmount("mods", "_name"),
			this.getNameAmount("raids", "_name"),
			this.getNameAmount("subs", "_name"),
			this.getNameAmount("vips", "_name"),
			/*this.getNameAmount("streamloots", "_name"),*/
			/* name and amount */
			this.getNameAmount("bits", "_name_amount"),
			this.getNameAmount("channelpoints", "_name_amount"),
			this.getNameAmount("chatters", "_name_amount"),
			this.getNameAmount("donos", "_name_amount"),
			this.getNameAmount("giftsubs", "_name_amount"),
			/*this.getNameAmount("streamloots", "_name_amount"),*/
			/* name and total */
			this.getNameAmountHistory("bits", "_name_total"),
			this.getNameAmountHistory("channelpoints", "_name_total"),
			this.getNameAmountHistory("donos", "_name_total"),
			this.getNameAmountHistory("giftsubs", "_name_total"),
			this.getNameAmountHistory("hosts", "_name_total"),
			this.getNameAmountHistory("raids", "_name_total"),
			this.getNameAmountHistory("subs", "_name_total"),
			/*this.getNameAmountHistory("streamloots", "_name_total"),*/
			/* name and amount and total */
			this.getNameAmountHistory("bits", "_name_amount_total"),
			this.getNameAmountHistory("channelpoints", "_name_amount_total"),
			this.getNameAmountHistory("donos", "_name_amount_total"),
			this.getNameAmountHistory("giftsubs", "_name_amount_total"),
			/*this.getNameAmountHistory("streamloots", "_name_amount_total"),*/
			/* top 10s */
			this.getTop10("bits", "_top10"),
			this.getTop10("channelpoints", "_top10"),
			this.getTop10("chatters", "_top10"),
			this.getTop10("donos", "_top10"),
			this.getTop10("giftsubs", "_top10"),
			/*this.getTop10("streamloots", "_top10"),*/
			/* top 5s */
			this.getTop5("bits", "_top5"),
			this.getTop5("channelpoints", "_top5"),
			this.getTop5("donos", "_top5"),
			this.getTop5("chatters", "_top5"),
			this.getTop5("giftsubs", "_top5"),
			/*this.getTop5("streamloots", "_top5"),*/
			/* top 10Hs */
			this.getTop10("hbits", "_top10H"),
			this.getTop10("hchannelpoints", "_top10H"),
			this.getTop10("hdonos", "_top10H"),
			this.getTop10("hgiftsubs", "_top10H"),
			this.getTop10("hhosts", "_top10H"),
			this.getTop10("hraids", "_top10H"),
			this.getTop10("hsubs", "_top10H"),
			/*this.getTop10("hstreamloots", "_top10H"),*/
			/* top 5Hs */
			this.getTop5("hbits", "_top5H"),
			this.getTop5("hchannelpoints", "_top5H"),
			this.getTop5("hdonos", "_top5H"),
			this.getTop5("hgiftsubs", "_top5H"),
			this.getTop5("hhosts", "_top5H"),
			this.getTop5("hraids", "_top5H"),
			this.getTop5("hsubs", "_top5H"),
			/*this.getTop5("hstreamloots", "_top5H"),*/
			/* StreamLoots cards */
			this.getTop5Cards("streamloots", "_top5_cards"),
			this.getTop10Cards("streamloots", "_top10_cards"),
			this.getTop5Cards("hstreamloots", "_top5H_cards"),
			this.getTop10Cards("hstreamloots", "_top10H_cards")
		]);
	}

	getNameAmount(key,file) {
		let db = this.db;
		let fname = (key === file) ? key : key + file;
		let inner = fs.readFileSync(constants.TEMPLATE_DIRS.BASE + "/" + fname + ".html", 'utf8');
		let wrapper = fs.readFileSync(constants.TEMPLATE_DIRS.BASE + "/" + fname + "_wrapper.html", 'utf8');

		this.userArgs.DEBUG && this.utils.console("Adding data to template for " + fname);

		return new Promise(function (resolve, reject) {
			let users = '';

			db.databases[key].getAll().then((all) => {
				all.forEach((a) => {
					users += Mustache.render(inner, a);
				});

				resolve({ key: fname, html: Mustache.render(wrapper, { group: users }) });
			});
		});
	}

	getNameAmountHistory(key, file) {
		let db = this.db;
		let fname = (key === file) ? key : key + file;
		let inner = fs.readFileSync(constants.TEMPLATE_DIRS.BASE + "/" + fname + ".html", 'utf8');
		let wrapper = fs.readFileSync(constants.TEMPLATE_DIRS.BASE + "/" + fname + "_wrapper.html", 'utf8');

		this.userArgs.DEBUG && this.utils.console("Adding data to template for " + fname);


		return new Promise(function (resolve, reject) {
			db.databases[key].getAll().then((users) => {
				let p = users.map((u) => {
					return db.databases["h" + key].getUser(u.name).then((hamount) => {
						let userWithHist = Object.assign({}, u, { total: hamount });
						return Mustache.render(inner, userWithHist)

					});
				});

				Promise.all(p).then((pr) => {
					resolve({ key: fname, html: Mustache.render(wrapper, { group: pr.join('') }) });
				});
			});
		});
	}

	getTop10(key, file) {
		let db = this.db;
		let fname = (key === file) ? key : key + file;
		let inner = fs.readFileSync(constants.TEMPLATE_DIRS.BASE + "/" + fname + ".html", 'utf8');
		let wrapper = fs.readFileSync(constants.TEMPLATE_DIRS.BASE + "/" + fname + "_wrapper.html", 'utf8');

		this.userArgs.DEBUG && this.utils.console("Adding data to template for " + fname);


		return new Promise(function (resolve, reject) {
			let users = '';

			db.databases[key].getTop10(true, {}).then((all) => {
				all.forEach((a) => {
					users += Mustache.render(inner, a);
				});

				resolve({ key: fname, html: Mustache.render(wrapper, { group: users }) });
			});
		});
	}

	getTop10Cards(key, file) {
		let db = this.db;
		let fname = (key === file) ? key : key + file;
		let inner = fs.readFileSync(constants.TEMPLATE_DIRS.BASE + "/" + fname + ".html", 'utf8');
		let wrapper = fs.readFileSync(constants.TEMPLATE_DIRS.BASE + "/" + fname + "_wrapper.html", 'utf8');

		this.userArgs.DEBUG && this.utils.console("Adding data to template for " + fname);


		return new Promise(function (resolve, reject) {
			let users = '';

			db.databases[key].getTop10(true, { card: 1 }).then((all) => {
				all.forEach((a) => {
					users += Mustache.render(inner, a);
				});

				resolve({ key: fname, html: Mustache.render(wrapper, { group: users }) });
			});
		});
	}

	getTop5(key, file) {
		let db = this.db;
		let fname = (key === file) ? key : key + file;
		let inner = fs.readFileSync(constants.TEMPLATE_DIRS.BASE + "/" + fname + ".html", 'utf8');
		let wrapper = fs.readFileSync(constants.TEMPLATE_DIRS.BASE + "/" + fname + "_wrapper.html", 'utf8');

		this.userArgs.DEBUG && this.utils.console("Adding data to template for " + fname);


		return new Promise(function (resolve, reject) {
			let users = '';

			db.databases[key].getTop5(true, {}).then((all) => {
				all.forEach((a) => {
					users += Mustache.render(inner, a);
				});

				resolve({ key: fname, html: Mustache.render(wrapper, { group: users }) });
			});
		});
	}

	getTop5Cards(key, file) {
		let db = this.db;
		let fname = (key === file) ? key : key + file;
		let inner = fs.readFileSync(constants.TEMPLATE_DIRS.BASE + "/" + fname + ".html", 'utf8');
		let wrapper = fs.readFileSync(constants.TEMPLATE_DIRS.BASE + "/" + fname + "_wrapper.html", 'utf8');

		this.userArgs.DEBUG && this.utils.console("Adding data to template for " + fname);


		return new Promise(function (resolve, reject) {
			let users = '';

			db.databases[key].getTop5(true, { card: 1 }).then((all) => {
				all.forEach((a) => {
					users += Mustache.render(inner, a);
				});

				resolve({ key: fname, html: Mustache.render(wrapper, { group: users }) });
			});
		});
	}
}

exports.Builder = Builder;