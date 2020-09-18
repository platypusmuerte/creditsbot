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
			{ name: "bans", user: '<div class="user">{{name}}</div>', wrapper: '<div class="bansWrapper">{{{group}}}</div>' },
			{ name: "bits", user: '<div class="user">{{name}} ({{amount}}/{{total}})</div>', wrapper: '<div class="bitsWrapper">{{{group}}}</div>' },
			{ name: "channelpoints", user: '<div class="user">{{name}} ({{amount}}/{{total}})</div>', wrapper: '<div class="channelpointsWrapper">{{{group}}}</div>' },
			{ name: "chatters", user: '<div class="user">{{name}} ({{amount}}/{{total}})</div>', wrapper: '<div class="chattersWrapper">{{{group}}}</div>' },
			{ name: "follows", user: '<div class="user">{{name}})</div>', wrapper: '<div class="followsWrapper">{{{group}}}</div>' },
			{ name: "giftsubs", user: '<div class="user">{{name}} ({{amount}}/{{total}})</div>', wrapper: '<div class="giftsubsWrapper">{{{group}}}</div>' },
			{ name: "hosts", user: '<div class="user">{{name}} ({{total}})</div>', wrapper: '<div class="hostsWrapper">{{{group}}}</div>' },
			{ name: "mods", user: '<div class="user">{{name}}</div>', wrapper: '<div class="modsWrapper">{{{group}}}</div>' },
			{ name: "raids", user: '<div class="user">{{name}} ({{amount}}/{{total}})</div>', wrapper: '<div class="raidsWrapper">{{{group}}}</div>' },
			{ name: "subs", user: '<div class="user">{{name}} ({{total}})</div>', wrapper: '<div class="subsWrapper">{{{group}}}</div>' },
			
			{ name: "hbits", user: '<div class="user">{{name}} ({{total}})</div>', wrapper: '<div class="hbitsWrapper">{{{group}}}</div>' },
			{ name: "hchannelpoints", user: '<div class="user">{{name}} ({{total}})</div>', wrapper: '<div class="hchannelpointsWrapper">{{{group}}}</div>' },
			{ name: "hgiftsubs", user: '<div class="user">{{name}} ({{total}})</div>', wrapper: '<div class="hgiftsubsWrapper">{{{group}}}</div>' },
			{ name: "hhosts", user: '<div class="user">{{name}} ({{total}})</div>', wrapper: '<div class="hhostsWrapper">{{{group}}}</div>' },
			{ name: "hraids", user: '<div class="user">{{name}} ({{total}})</div>', wrapper: '<div class="hraidsWrapper">{{{group}}}</div>' },
			{ name: "hsubs", user: '<div class="user">{{name}} ({{total}})</div>', wrapper: '<div class="hsubsWrapper">{{{group}}}</div>' },

			{ name: "top10", user: '<div class="user">{{name}} ({{amount}})</div>', wrapper: '<div class="top10Wrapper">{{{group}}}</div>' },
			{ name: "top5", user: '<div class="user">{{name}} ({{amount}})</div>', wrapper: '<div class="top5Wrapper">{{{group}}}</div>' },
			{ name: "htop10", user: '<div class="user">{{name}} ({{total}})</div>', wrapper: '<div class="htop10Wrapper">{{{group}}}</div>' },
			{ name: "htop5", user: '<div class="user">{{name}} ({{total}})</div>', wrapper: '<div class="htop5Wrapper">{{{group}}}</div>' },

			{ name: "title", user: '<div class="title">Thanks for watching</div>', wrapper: '<div class="titleWrapper">{{{group}}}</div>' },
			{ name: "subtitle", user: '<div class="subtitle">This is a subtitle</div>', wrapper: '<div class="subtitleWrapper">{{{group}}}</div>' },

			{ name: "divider", user: '<div class="divider"></div>', wrapper: '<div class="dividerWrapper">{{{group}}}</div>' },
			{ name: "sectiontitle", user: '<div class="sectiontitle"></div>', wrapper: '<div class="sectiontitleWrapper">{{{group}}}</div>' }
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
			this.ensureUserTemplate(t);
			this.ensureWrapperTemplate(t);
			this.ensureMainTemplate();
			this.ensureCSSTemplate();
		});
	}

	ensureUserTemplate(t) {
		let fname = constants.TEMPLATE_DIR + "/" + t.name + "_user.html";
		if (!fs.existsSync(fname)) {
			fs.writeFile(fname, t.user, () => { });

			this.userArgs.DEBUG && this.utils.console("  Created " + t.name + " user template");
		}
	}

	ensureWrapperTemplate(t) {
		let fname = constants.TEMPLATE_DIR + "/" + t.name + "_wrapper.html";
		if (!fs.existsSync(fname)) {
			fs.writeFile(fname, t.wrapper, () => { });
			this.userArgs.DEBUG && this.utils.console("  Created " + t.name + " wrapper template");
		}
	}

	ensureMainTemplate() {
		let fname = constants.TEMPLATE_DIR + "/_credits.html";
		if (!fs.existsSync(fname)) {
			fs.copyFile('./builder/main_template.html', fname, 0, () => { });

			this.userArgs.DEBUG && this.utils.console("  Created credits html file");
		}
	}

	ensureCSSTemplate() {
		let fname = constants.TEMPLATE_DIR + "/_credits.css";
		if (!fs.existsSync(fname)) {
			fs.copyFile('./builder/main_template.css', fname, 0, () => { });

			this.userArgs.DEBUG && this.utils.console("  Created credits css file");
		}
	}

	getCreditsHTML() {
		let fname = constants.TEMPLATE_DIR + "/_credits.html";
		let mainTemplate = fs.readFileSync(fname, 'utf8');
		let templateObj = {};

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
			this.getBansHTML(), 
			this.getUserAmountWithHistory("bits"),
			this.getUserAmountWithHistory("channelpoints"),
			this.getUserAmountWithHistory("giftsubs")
		]);
	}

	getBansHTML() {
		let db = this.db;

		return new Promise(function (resolve, reject) {
			let user = fs.readFileSync(constants.TEMPLATE_DIR + "/bans_user.html", 'utf8');
			let wrapper = fs.readFileSync(constants.TEMPLATE_DIR + "/bans_wrapper.html", 'utf8');
			let users = '';

			db.databases.bans.getAll().then((bans) => {
				bans.forEach((b) => {
					users += Mustache.render(user, b);
				});

				resolve({key: "bans", html: Mustache.render(wrapper, { group: users })});
			});
		});		
	}

	getUserAmountWithHistory(key) {
		let db = this.db;
		let user = fs.readFileSync(constants.TEMPLATE_DIR + "/" + key + "_user.html", 'utf8');
		let wrapper = fs.readFileSync(constants.TEMPLATE_DIR + "/" + key + "_wrapper.html", 'utf8');

		return new Promise(function (resolve, reject) {
			db.databases[key].getAll().then((users) => {
				let p = users.map((u) => {
					return db.databases["h" + key].getUser(u.name).then((hamount) => {
						let userWithHist = Object.assign({}, u, { total: hamount });
						return Mustache.render(user, userWithHist)

					});
				});

				Promise.all(p).then((pr) => {
					resolve({ key: key, html: Mustache.render(wrapper, { group: pr.join('') }) });
				});
			});
		});
	}
}

exports.Builder = Builder;