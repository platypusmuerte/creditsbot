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

		this.templates = [
			/* name only */
			{ file: "_name", name: "bans", user: '<div class="name">{{name}}</div>', wrapper: '<div class="bansWrapper">{{{group}}}</div>' },
			{ file: "_name", name: "bits", user: '<div class="name">{{name}}</div>', wrapper: '<div class="bitsWrapper">{{{group}}}</div>' },
			{ file: "_name", name: "channelpoints", user: '<div class="name">{{name}}</div>', wrapper: '<div class="channelpointsWrapper">{{{group}}}</div>' },
			{ file: "_name", name: "chatters", user: '<div class="name">{{name}}</div>', wrapper: '<div class="chattersWrapper">{{{group}}}</div>' },
			{ file: "_name", name: "follows", user: '<div class="name">{{name}}</div>', wrapper: '<div class="followsWrapper">{{{group}}}</div>' },
			{ file: "_name", name: "giftsubs", user: '<div class="name">{{name}}</div>', wrapper: '<div class="giftsubsWrapper">{{{group}}}</div>' },
			{ file: "_name", name: "hosts", user: '<div class="name">{{name}}</div>', wrapper: '<div class="hostsWrapper">{{{group}}}</div>' },
			{ file: "_name", name: "mods", user: '<div class="name">{{name}}</div>', wrapper: '<div class="modsWrapper">{{{group}}}</div>' },
			{ file: "_name", name: "raids", user: '<div class="name">{{name}}</div>', wrapper: '<div class="raidsWrapper">{{{group}}}</div>' },
			{ file: "_name", name: "subs", user: '<div class="name">{{name}}</div>', wrapper: '<div class="subsWrapper">{{{group}}}</div>' },
			/* name and amount */
			{ file: "_name_amount", name: "bits", user: '<div class="nameAmount"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>', wrapper: '<div class="bitsAmountWrapper">{{{group}}}</div>' },
			{ file: "_name_amount", name: "channelpoints", user: '<div class="nameAmount"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>', wrapper: '<div class="channelpointsAmountWrapper">{{{group}}}</div>' },
			{ file: "_name_amount", name: "chatters", user: '<div class="nameAmount"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>', wrapper: '<div class="chattersAmountWrapper">{{{group}}}</div>' },
			{ file: "_name_amount", name: "giftsubs", user: '<div class="nameAmount"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>', wrapper: '<div class="giftsubsAmountWrapper">{{{group}}}</div>' },
			/* name and total */
			{ file: "_name_total", name: "bits", user: '<div class="nameTotal"><div class="name">{{name}}</div><div class="total">{{total}}</div></div>', wrapper: '<div class="bitsTotalWrapper">{{{group}}}</div>' },
			{ file: "_name_total", name: "channelpoints", user: '<div class="nameTotal"><div class="name">{{name}}</div><div class="total">{{total}}</div></div>', wrapper: '<div class="channelpointsTotalWrapper">{{{group}}}</div>' },
			{ file: "_name_total", name: "giftsubs", user: '<div class="nameTotal"><div class="name">{{name}}</div><div class="total">{{total}}</div></div>', wrapper: '<div class="giftsubsTotalWrapper">{{{group}}}</div>' },
			{ file: "_name_total", name: "hosts", user: '<div class="nameTotal"><div class="name">{{name}}</div><div class="total">{{total}}</div></div>', wrapper: '<div class="hostsTotalWrapper">{{{group}}}</div>' },
			{ file: "_name_total", name: "raids", user: '<div class="nameTotal"><div class="name">{{name}}</div><div class="total">{{total}}</div></div>', wrapper: '<div class="raidsTotalWrapper">{{{group}}}</div>' },
			{ file: "_name_total", name: "subs", user: '<div class="nameTotal"><div class="name">{{name}}</div><div class="total">{{total}}</div></div>', wrapper: '<div class="subsTotalWrapper">{{{group}}}</div>' },
			/* name and amount and total */
			{ file: "_name_amount_total", name: "bits", user: '<div class="nameAmountTotal"><div class="name">{{name}}</div><div class="amount">{{amount}}</div><div class="total">{{total}}</div></div>', wrapper: '<div class="bitsAmountTotalWrapper">{{{group}}}</div>' },
			{ file: "_name_amount_total", name: "channelpoints", user: '<div class="nameAmountTotal"><div class="name">{{name}}</div><div class="amount">{{amount}}</div><div class="total">{{total}}</div></div>', wrapper: '<div class="channelpointsAmountTotalWrapper">{{{group}}}</div>' },
			{ file: "_name_amount_total", name: "giftsubs", user: '<div class="nameAmountTotal"><div class="name">{{name}}</div><div class="amount">{{amount}}</div><div class="total">{{total}}</div></div>', wrapper: '<div class="giftsubsAmountTotalWrapper">{{{group}}}</div>' },
			/* top 10s */
			{ file: "_top10", name: "bits", user: '<div class="nameTop10"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>', wrapper: '<div class="bitsTop10Wrapper">{{{group}}}</div>' },
			{ file: "_top10", name: "channelpoints", user: '<div class="nameTop10"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>', wrapper: '<div class="channelpointsTop10Wrapper">{{{group}}}</div>' },
			{ file: "_top10", name: "chatters", user: '<div class="nameTop10"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>', wrapper: '<div class="chattersTop10Wrapper">{{{group}}}</div>' },
			{ file: "_top10", name: "giftsubs", user: '<div class="nameTop10"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>', wrapper: '<div class="giftsubsTop10Wrapper">{{{group}}}</div>' },
			/* top 5s */
			{ file: "_top5", name: "bits", user: '<div class="nameTop5"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>', wrapper: '<div class="bitsTop5Wrapper">{{{group}}}</div>' },
			{ file: "_top5", name: "channelpoints", user: '<div class="nameTop5"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>', wrapper: '<div class="channelpointsTop5Wrapper">{{{group}}}</div>' },
			{ file: "_top5", name: "chatters", user: '<div class="nameTop5"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>', wrapper: '<div class="chattersTop5Wrapper">{{{group}}}</div>' },
			{ file: "_top5", name: "giftsubs", user: '<div class="nameTop5"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>', wrapper: '<div class="giftsubsTop5Wrapper">{{{group}}}</div>' },
			/* top 10s H */
			{ file: "_top10H", name: "hbits", user: '<div class="nameTop10"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>', wrapper: '<div class="hbitsTop10Wrapper">{{{group}}}</div>' },
			{ file: "_top10H", name: "hchannelpoints", user: '<div class="nameTop10"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>', wrapper: '<div class="hchannelpointsTop10Wrapper">{{{group}}}</div>' },
			{ file: "_top10H", name: "hgiftsubs", user: '<div class="nameTop10"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>', wrapper: '<div class="hgiftsubsTop10Wrapper">{{{group}}}</div>' },
			{ file: "_top10H", name: "hhosts", user: '<div class="nameTop10"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>', wrapper: '<div class="hhostsTop10Wrapper">{{{group}}}</div>' },
			{ file: "_top10H", name: "hraids", user: '<div class="nameTop10"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>', wrapper: '<div class="hraidsTop10Wrapper">{{{group}}}</div>' },
			{ file: "_top10H", name: "hsubs", user: '<div class="nameTop10"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>', wrapper: '<div class="hsubsTop10Wrapper">{{{group}}}</div>' },
			/* top 5s H */
			{ file: "_top5H", name: "hbits", user: '<div class="nameTop5"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>', wrapper: '<div class="bitsTop5Wrapper">{{{group}}}</div>' },
			{ file: "_top5H", name: "hchannelpoints", user: '<div class="nameTop5"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>', wrapper: '<div class="channelpointsTop5Wrapper">{{{group}}}</div>' },
			{ file: "_top5H", name: "hgiftsubs", user: '<div class="nameTop5"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>', wrapper: '<div class="giftsubsTop5Wrapper">{{{group}}}</div>' },
			{ file: "_top5H", name: "hhosts", user: '<div class="nameTop5"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>', wrapper: '<div class="hhostsTop5Wrapper">{{{group}}}</div>' },
			{ file: "_top5H", name: "hraids", user: '<div class="nameTop5"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>', wrapper: '<div class="hraidsTop5Wrapper">{{{group}}}</div>' },
			{ file: "_top5H", name: "hsubs", user: '<div class="nameTop5"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>', wrapper: '<div class="hsubsTop5Wrapper">{{{group}}}</div>' }
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
		this.templates.forEach((t)=>{
			this.ensureInnerTemplateFiles(t);
			this.ensureWrapperTemplateFiles(t);
			this.ensureMainHTML();
			this.ensureMainCSS();
		});
	}

	ensureMainHTML() {
		let mainHTML = constants.TEMPLATE_DIR + "/_credits.html";

		if (!fs.existsSync(mainHTML)) {
			fs.copyFile('./builder/main_template.html', mainHTML, 0, ()=>{})

			this.userArgs.DEBUG && this.utils.console("  Created _credits.html template");
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
		let mainHTML = constants.TEMPLATE_DIR + "/_credits.html";
		let cssContent = constants.TEMPLATE_DIR + "/_credits.css";
		let mainTemplate = fs.readFileSync(mainHTML, 'utf8');
		let mainCSS = fs.readFileSync(mainHTML, 'utf8');
		let templateObj = {
			css: Mustache.render(mainCSS, cssContent)
		};

		this.finalHTML.forEach((s)=>{
			templateObj[s.key] = s.html;
		});

		let output = Mustache.render(mainTemplate, templateObj);

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
			this.getTop10("hchatters", "_top10H"),
			this.getTop10("hgiftsubs", "_top10H"),
			this.getTop10("hhosts", "_top10H"),
			this.getTop10("hraids", "_top10H"),
			this.getTop10("hsubs", "_top10H"),
			/* top 5Hs */
			this.getTop5("hbits", "_top5H"),
			this.getTop5("hchannelpoints", "_top5H"),
			this.getTop5("hgiftsubs", "_top5H"),
			this.getTop5("hosts", "_top5H"),
			this.getTop5("raids", "_top5H"),
			this.getTop5("subs", "_top5H")
		]);
	}

	getNameAmount(key,file) {
		let db = this.db;
		let fname = (key === file) ? key : key + file;
		let inner = fs.readFileSync(constants.TEMPLATE_DIR + "/" + fname + ".html", 'utf8');
		let wrapper = fs.readFileSync(constants.TEMPLATE_DIR + "/" + fname + "_wrapper.html", 'utf8');

		return new Promise(function (resolve, reject) {
			let users = '';

			db.databases[key].getAll().then((all) => {
				all.forEach((a) => {
					users += Mustache.render(inner, a);
				});

				resolve({ key: key, html: Mustache.render(wrapper, { group: users }) });
			});
		});
	}

	getNameAmountHistory(key, file) {
		let db = this.db;
		let fname = (key === file) ? key : key + file;
		let inner = fs.readFileSync(constants.TEMPLATE_DIR + "/" + fname + ".html", 'utf8');
		let wrapper = fs.readFileSync(constants.TEMPLATE_DIR + "/" + fname + "_wrapper.html", 'utf8');

		return new Promise(function (resolve, reject) {
			db.databases[key].getAll().then((users) => {
				let p = users.map((u) => {
					return db.databases["h" + key].getUser(u.name).then((hamount) => {
						let userWithHist = Object.assign({}, u, { total: hamount });
						return Mustache.render(inner, userWithHist)

					});
				});

				Promise.all(p).then((pr) => {
					resolve({ key: key, html: Mustache.render(wrapper, { group: pr.join('') }) });
				});
			});
		});
	}

	getTop10(key, file) {
		let db = this.db;
		let fname = (key === file) ? key : key + file;
		let inner = fs.readFileSync(constants.TEMPLATE_DIR + "/" + fname + ".html", 'utf8');
		let wrapper = fs.readFileSync(constants.TEMPLATE_DIR + "/" + fname + "_wrapper.html", 'utf8');

		return new Promise(function (resolve, reject) {
			let users = '';

			db.databases[key].getTop10().then((all) => {
				all.forEach((a) => {
					users += Mustache.render(inner, a);
				});

				resolve({ key: key, html: Mustache.render(wrapper, { group: users }) });
			});
		});
	}

	getTop5(key, file) {
		let db = this.db;
		let fname = (key === file) ? key : key + file;
		let inner = fs.readFileSync(constants.TEMPLATE_DIR + "/" + fname + ".html", 'utf8');
		let wrapper = fs.readFileSync(constants.TEMPLATE_DIR + "/" + fname + "_wrapper.html", 'utf8');

		return new Promise(function (resolve, reject) {
			let users = '';

			db.databases[key].getTop5().then((all) => {
				all.forEach((a) => {
					users += Mustache.render(inner, a);
				});

				resolve({ key: key, html: Mustache.render(wrapper, { group: users }) });
			});
		});
	}
}

exports.Builder = Builder;