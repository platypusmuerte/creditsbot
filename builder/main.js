const { constants } = require('../constants');
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
			{ file: "_name", name: "follows", user: '<div class="name">{{name}}</div>', wrapper: '<div class="followsWrapper">{{{group}}}</div>' },
			{ file: "_name", name: "subs", user: '<div class="name">{{name}}</div>', wrapper: '<div class="subsWrapper">{{{group}}}</div>' },
			{ file: "_name", name: "giftsubs", user: '<div class="name">{{name}}</div>', wrapper: '<div class="giftsubsWrapper">{{{group}}}</div>' },
			{ file: "_name", name: "hosts", user: '<div class="name">{{name}}</div>', wrapper: '<div class="hostsWrapper">{{{group}}}</div>' },
			{ file: "_name", name: "raids", user: '<div class="name">{{name}}</div>', wrapper: '<div class="raidsWrapper">{{{group}}}</div>' },
			{ file: "_name", name: "bans", user: '<div class="name">{{name}}</div>', wrapper: '<div class="bansWrapper">{{{group}}}</div>' },
			{ file: "_name", name: "bits", user: '<div class="name">{{name}}</div>', wrapper: '<div class="bitsWrapper">{{{group}}}</div>' },
			{ file: "_name", name: "channelpoints", user: '<div class="name">{{name}}</div>', wrapper: '<div class="channelpointsWrapper">{{{group}}}</div>' },
			{ file: "_name", name: "chatters", user: '<div class="name">{{name}}</div>', wrapper: '<div class="chattersWrapper">{{{group}}}</div>' },
			
			{ file: "_top5", name: "giftsubs", user: '<div class="nameTop5"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>', wrapper: '<div class="giftsubsTop5Wrapper">{{{group}}}</div>' },
			{ file: "_top5", name: "bits", user: '<div class="nameTop5"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>', wrapper: '<div class="bitsTop5Wrapper">{{{group}}}</div>' },
			{ file: "_top5", name: "channelpoints", user: '<div class="nameTop5"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>', wrapper: '<div class="channelpointsTop5Wrapper">{{{group}}}</div>' },
			{ file: "_top5", name: "chatters", user: '<div class="nameTop5"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>', wrapper: '<div class="chattersTop5Wrapper">{{{group}}}</div>' },

			{ file: "_name_amount", name: "giftsubs", user: '<div class="nameAmount"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>', wrapper: '<div class="giftsubsAmountWrapper">{{{group}}}</div>' },
			{ file: "_name_amount", name: "bits", user: '<div class="nameAmount"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>', wrapper: '<div class="bitsAmountWrapper">{{{group}}}</div>' },
			{ file: "_name_amount", name: "channelpoints", user: '<div class="nameAmount"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>', wrapper: '<div class="channelpointsAmountWrapper">{{{group}}}</div>' },
			{ file: "_name_amount", name: "chatters", user: '<div class="nameAmount"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>', wrapper: '<div class="chattersAmountWrapper">{{{group}}}</div>' },

			{ file: "_name_total", name: "giftsubs", user: '<div class="nameTotal"><div class="name">{{name}}</div><div class="total">{{total}}</div></div>', wrapper: '<div class="giftsubsTotalWrapper">{{{group}}}</div>' },
			{ file: "_name_total", name: "subs", user: '<div class="nameTotal"><div class="name">{{name}}</div><div class="total">{{total}}</div></div>', wrapper: '<div class="subsTotalWrapper">{{{group}}}</div>' },
			{ file: "_name_total", name: "bits", user: '<div class="nameTotal"><div class="name">{{name}}</div><div class="total">{{total}}</div></div>', wrapper: '<div class="bitsTotalWrapper">{{{group}}}</div>' },
			{ file: "_name_total", name: "channelpoints", user: '<div class="nameTotal"><div class="name">{{name}}</div><div class="total">{{total}}</div></div>', wrapper: '<div class="channelpointsTotalWrapper">{{{group}}}</div>' },
			{ file: "_name_total", name: "hosts", user: '<div class="nameTotal"><div class="name">{{name}}</div><div class="total">{{total}}</div></div>', wrapper: '<div class="hostsTotalWrapper">{{{group}}}</div>' },
			{ file: "_name_total", name: "raids", user: '<div class="nameTotal"><div class="name">{{name}}</div><div class="total">{{total}}</div></div>', wrapper: '<div class="raidsTotalWrapper">{{{group}}}</div>' },
			
			{ file: "_name_amount_total", name: "bits", user: '<div class="nameAmountTotal"><div class="name">{{name}}</div><div class="amount">{{amount}}</div><div class="total">{{total}}</div></div>', wrapper: '<div class="bitsAmountTotalWrapper">{{{group}}}</div>' },
			{ file: "_name_amount_total", name: "giftsubs", user: '<div class="nameAmountTotal"><div class="name">{{name}}</div><div class="amount">{{amount}}</div><div class="total">{{total}}</div></div>', wrapper: '<div class="giftsubsAmountTotalWrapper">{{{group}}}</div>' },
			{ file: "_name_amount_total", name: "channelpoints", user: '<div class="nameAmountTotal"><div class="name">{{name}}</div><div class="amount">{{amount}}</div><div class="total">{{total}}</div></div>', wrapper: '<div class="channelpointsAmountTotalWrapper">{{{group}}}</div>' },

			{ file: "_top10", name: "giftsubs", user: '<div class="nameTop10"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>', wrapper: '<div class="giftsubsTop10Wrapper">{{{group}}}</div>' },
			{ file: "_top10", name: "bits", user: '<div class="nameTop10"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>', wrapper: '<div class="bitsTop10Wrapper">{{{group}}}</div>' },
			{ file: "_top10", name: "channelpoints", user: '<div class="nameTop10"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>', wrapper: '<div class="channelpointsTop10Wrapper">{{{group}}}</div>' },
			{ file: "_top10", name: "chatters", user: '<div class="nameTop10"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>', wrapper: '<div class="chattersTop10Wrapper">{{{group}}}</div>' },
			
			{ file: "_top10H", name: "hgiftsubs", user: '<div class="nameTop10"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>', wrapper: '<div class="hgiftsubsTop10Wrapper">{{{group}}}</div>' },
			{ file: "_top10H", name: "hbits", user: '<div class="nameTop10"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>', wrapper: '<div class="hbitsTop10Wrapper">{{{group}}}</div>' },
			{ file: "_top10H", name: "hsubs", user: '<div class="nameTop10"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>', wrapper: '<div class="hsubsTop10Wrapper">{{{group}}}</div>' },
			{ file: "_top10H", name: "hhosts", user: '<div class="nameTop10"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>', wrapper: '<div class="hhostsTop10Wrapper">{{{group}}}</div>' },
			{ file: "_top10H", name: "hraids", user: '<div class="nameTop10"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>', wrapper: '<div class="hraidsTop10Wrapper">{{{group}}}</div>' },
			{ file: "_top10H", name: "hchannelpoints", user: '<div class="nameTop10"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>', wrapper: '<div class="hchannelpointsTop10Wrapper">{{{group}}}</div>' },
			
			{ file: "_top5H", name: "hgiftsubs", user: '<div class="nameTop5"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>', wrapper: '<div class="giftsubsTop5Wrapper">{{{group}}}</div>' },
			{ file: "_top5H", name: "hbits", user: '<div class="nameTop5"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>', wrapper: '<div class="bitsTop5Wrapper">{{{group}}}</div>' },
			{ file: "_top5H", name: "hsubs", user: '<div class="nameTop5"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>', wrapper: '<div class="hsubsTop5Wrapper">{{{group}}}</div>' },
			{ file: "_top5H", name: "hhosts", user: '<div class="nameTop5"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>', wrapper: '<div class="hhostsTop5Wrapper">{{{group}}}</div>' },
			{ file: "_top5H", name: "hraids", user: '<div class="nameTop5"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>', wrapper: '<div class="hraidsTop5Wrapper">{{{group}}}</div>' },
			{ file: "_top5H", name: "hchannelpoints", user: '<div class="nameTop5"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>', wrapper: '<div class="channelpointsTop5Wrapper">{{{group}}}</div>' }
		];

		this.prep();
		this.checkTemplates();
		this.final();
	}

	prep() {
		if (!fs.existsSync(constants.TEMPLATE_DIR)) {
			fs.mkdirSync(constants.TEMPLATE_DIR);
			this.userArgs.DEBUG && this.utils.console("Created template dir");
		} else {
			this.userArgs.DEBUG && this.utils.console("Found template dir");
		}
	}

	final() {
		this.userArgs.DEBUG && this.utils.console(" ");
	}

	checkTemplates() {
		this.ensureMainHTML();
		this.ensureMainCSS();

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

		fs.writeFile("./builder/main_body.html", str, () => {
			this.userArgs.DEBUG && this.utils.console("  Created body template content");
		});
	}

	ensureMainHTML() {
		let mainHTML = constants.TEMPLATE_DIR + "/_credits.html";

		if (!fs.existsSync(mainHTML)) {
			fs.copyFile('./builder/main_template.html', mainHTML, 0, () => {
				this.userArgs.DEBUG && this.utils.console("  Created _credits.html template");

				this.ensureBodyHTML();
			});
		}
	}

	ensureMainCSS() {
		let cssContent = constants.TEMPLATE_DIR + "/_credits.css";

		if (!fs.existsSync(cssContent)) {
			fs.copyFile('./builder/main_template.css', cssContent, 0, () => { })

			this.userArgs.DEBUG && this.utils.console("  Created _credits.css template");
		}
	}

	ensureInnerTemplateFiles(t) {
		let fname = (t.name === t.file) ? t.name : t.name + t.file;
		let inner = constants.TEMPLATE_DIR + "/" + fname + ".html";

		if (!fs.existsSync(inner)) {
			fs.writeFile(inner, t.user, () => { });

			this.userArgs.DEBUG && this.utils.console("  Created " + fname + " template");
		}
	}

	ensureWrapperTemplateFiles(t) {
		let fname = (t.name === t.file) ? t.name : t.name + t.file;
		let wrapper = constants.TEMPLATE_DIR + "/" + fname + "_wrapper.html";

		if (!fs.existsSync(wrapper)) {
			fs.writeFile(wrapper, t.wrapper, () => { });

			this.userArgs.DEBUG && this.utils.console("  Created " + fname + "_wrapper template");
		}
	}

	getCreditsHTML() {
		this.userArgs.DEBUG && this.utils.console(" ");
		this.userArgs.DEBUG && this.utils.console("Fetching credits output");
		this.userArgs.DEBUG && this.utils.console(" ");
		let bodyHTML, mainTemplate, mainCSS, templateObj, bodyWithSectionTags, output;

		bodyHTML = fs.readFileSync("./builder/main_body.html", 'utf8');
		mainTemplate = fs.readFileSync(constants.TEMPLATE_DIR + "/_credits.html", 'utf8');
		mainCSS = fs.readFileSync(constants.TEMPLATE_DIR + "/_credits.css", 'utf8');
		
		templateObj = {
			css: "<style>" + mainCSS + "</style>"
		};

		bodyWithSectionTags = mainTemplate.replace('{{{body}}}', bodyHTML);

		this.finalHTML.forEach((s)=>{
			templateObj[s.key] = s.html;
		});

		output = Mustache.render(bodyWithSectionTags, templateObj);

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
			this.getNameAmount("hosts", "_name"),
			this.getNameAmount("mods", "_name"),
			this.getNameAmount("raids", "_name"),
			this.getNameAmount("subs", "_name"),
			/* name and amount */
			this.getNameAmount("bits", "_name_amount"),
			this.getNameAmount("channelpoints", "_name_amount"),
			this.getNameAmount("chatters", "_name_amount"),
			this.getNameAmount("giftsubs", "_name_amount"),
			/* name and total */
			this.getNameAmountHistory("bits", "_name_total"),
			this.getNameAmountHistory("channelpoints", "_name_total"),
			this.getNameAmountHistory("giftsubs", "_name_total"),
			this.getNameAmountHistory("hosts", "_name_total"),
			this.getNameAmountHistory("raids", "_name_total"),
			this.getNameAmountHistory("subs", "_name_total"),
			/* name and amount and total */
			this.getNameAmountHistory("bits", "_name_amount_total"),
			this.getNameAmountHistory("channelpoints", "_name_amount_total"),
			this.getNameAmountHistory("giftsubs", "_name_amount_total"),
			/* top 10s */
			this.getTop10("bits", "_top10"),
			this.getTop10("channelpoints", "_top10"),
			this.getTop10("chatters", "_top10"),
			this.getTop10("giftsubs", "_top10"),
			/* top 5s */
			this.getTop5("bits", "_top5"),
			this.getTop5("channelpoints", "_top5"),
			this.getTop5("chatters", "_top5"),
			this.getTop5("giftsubs", "_top5"),
			/* top 10Hs */
			this.getTop10("hbits", "_top10H"),
			this.getTop10("hchannelpoints", "_top10H"),
			this.getTop10("hgiftsubs", "_top10H"),
			this.getTop10("hhosts", "_top10H"),
			this.getTop10("hraids", "_top10H"),
			this.getTop10("hsubs", "_top10H"),
			/* top 5Hs */
			this.getTop5("hbits", "_top5H"),
			this.getTop5("hchannelpoints", "_top5H"),
			this.getTop5("hgiftsubs", "_top5H"),
			this.getTop5("hhosts", "_top5H"),
			this.getTop5("hraids", "_top5H"),
			this.getTop5("hsubs", "_top5H")
		]);
	}

	getNameAmount(key,file) {
		let db = this.db;
		let fname = (key === file) ? key : key + file;
		let inner = fs.readFileSync(constants.TEMPLATE_DIR + "/" + fname + ".html", 'utf8');
		let wrapper = fs.readFileSync(constants.TEMPLATE_DIR + "/" + fname + "_wrapper.html", 'utf8');

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
		let inner = fs.readFileSync(constants.TEMPLATE_DIR + "/" + fname + ".html", 'utf8');
		let wrapper = fs.readFileSync(constants.TEMPLATE_DIR + "/" + fname + "_wrapper.html", 'utf8');

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
		let inner = fs.readFileSync(constants.TEMPLATE_DIR + "/" + fname + ".html", 'utf8');
		let wrapper = fs.readFileSync(constants.TEMPLATE_DIR + "/" + fname + "_wrapper.html", 'utf8');

		this.userArgs.DEBUG && this.utils.console("Adding data to template for " + fname);


		return new Promise(function (resolve, reject) {
			let users = '';

			db.databases[key].getTop10(true).then((all) => {
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
		let inner = fs.readFileSync(constants.TEMPLATE_DIR + "/" + fname + ".html", 'utf8');
		let wrapper = fs.readFileSync(constants.TEMPLATE_DIR + "/" + fname + "_wrapper.html", 'utf8');

		this.userArgs.DEBUG && this.utils.console("Adding data to template for " + fname);


		return new Promise(function (resolve, reject) {
			let users = '';

			db.databases[key].getTop5(true).then((all) => {
				all.forEach((a) => {
					users += Mustache.render(inner, a);
				});

				resolve({ key: fname, html: Mustache.render(wrapper, { group: users }) });
			});
		});
	}
}

exports.Builder = Builder;