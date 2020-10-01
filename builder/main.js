const { constants } = require('../constants');
const Mustache = require("mustache");

/**
 * Build the output html for credits
 */
class Builder {
	/**
	 * @param {object}	utils		Utils
	 * @param {object}	userArgs	Merged settings from CLI opts into config file
	 * @param {object}	db			Database
	 *
	 * @property {object}	db					database adapter
	 * @property {object}	rawData				map of html page parts to add to final output
	 * @property {object}	sectionBuilders		map of data components to methods that build them
	 */
	constructor(params) {
		this.utils = params.utils;
		this.path = params.path;
		this.userArgs = params.userArgs;
		this.db;
		this.rawData;

		this.initRawData();

		this.sectionBuilders = {
			custom: this.getSection_Custom_Or_Static.bind(this),
			static: this.getSection_Custom_Or_Static.bind(this),
			name: this.getSection_Name_Amount.bind(this),
			name_amount: this.getSection_Name_Amount.bind(this),
			name_total: this.getSection_Name_Total.bind(this),
			name_amount_total: this.getSection_Name_Total.bind(this),
			top5: this.getSection_Top5.bind(this),
			top10: this.getSection_Top10.bind(this),
			top5H: this.getSection_Top5.bind(this),
			top10H: this.getSection_Top10.bind(this),
			top5_cards: this.getSection_Top5_Cards.bind(this),
			top10_cards: this.getSection_Top10_Cards.bind(this),
			top5H_cards: this.getSection_Top5_Cards.bind(this),
			top10H_cards: this.getSection_Top10_Cards.bind(this),
		};
	}

	/**
	 * Initialize or reset the rawData
	 * @TODO:	mainCSS moved to DB, stop using the file
	 */
	initRawData() {
		this.rawData = {
			mainHTML: null,
			jsIncludes: null,
			cssIncludes: null,
			defaultCSS: null,
			customCSS: null,
			colors: null,
			scrollSpeed: null,
			looping: null,
			sections: [],
			contentTitle: null,
			contentDivider: null
		};
	}
	
	getRawData() {
		return this.rawData;
	}

	/**
	 * update rawData object
	 * 
	 * @param {string} key
	 * @param {*} data 
	 */
	setRawData(key, data) {
		if(key === "sections") {
			this.rawData.sections.push(data);
		} else {
			this.rawData[key] = data;
		}		
	}

	/**
	 * Inject an html attribute on a element for parsing later
	 * 
	 * @param {string} str html element part
	 * @param {string} type the secetion type
	 * @param {string} db which database this relates to
	 */
	injectTypeAttrib(str, type, db) {
		let dbAttr = (db) ? db:'none';

		return str.replace('">', '" data-sectiontype="' + type + '"  data-db="' + dbAttr + '">');
	}

	/**
	 * Fetch template from db
	 */
	getContentTitle() {
		let db = this.db;
		let setRawData = this.setRawData.bind(this);

		return new Promise(function (resolve, reject) {
			db.databases.credittemplates.getTemplateByID("contentTitle").then((dbr) => {
				setRawData("contentTitle", dbr);
				resolve();
			});
		});
	}

	/**
	 * Fetch template from db
	 */
	getContentDivider() {
		let db = this.db;
		let setRawData = this.setRawData.bind(this);

		return new Promise(function (resolve, reject) {
			db.databases.credittemplates.getTemplateByID("contentDivider").then((dbr) => {
				setRawData("contentDivider", dbr);
				resolve();
			});
		});
	}

	/**
	 * Fetch template from db
	 */
	getMainHTML() {
		let db = this.db;
		let setRawData = this.setRawData.bind(this);

		return new Promise(function (resolve, reject) {
			db.databases.templatepage.getAll().then((dbr)=>{
				setRawData("mainHTML", dbr.page);
				resolve();
			});
		});
	}

	/**
	 * Build css and js include sections and put into rawData object
	 */
	getCssJsIncludes() {
		let db = this.db;
		let setRawData = this.setRawData.bind(this);

		return new Promise(function (resolve, reject) {
			db.databases.templateincludes.getAll().then((dbr) => {
				let js = dbr.js.map((url)=>{
					return `<script src="${url}"></script>`;
				});

				let css = dbr.css.map((url) => {
					return `<link href="${url}" rel="stylesheet">`;
				});

				setRawData("jsIncludes", js.join(""));
				setRawData("cssIncludes", css.join(""));
				resolve();
			});
		});
	}

	/**
	 * Fetch default css from db
	 */
	getDefaultCSS() {
		let db = this.db;
		let setRawData = this.setRawData.bind(this);

		return new Promise(function (resolve, reject) {
			db.databases.templatedefaultcss.getAll().then((dbr) => {
				setRawData("defaultCSS", '<style>' + dbr.css + '</style>');
				resolve();
			});
		});
	}

	/**
	 * Fetch template from db
	 */
	getCustomCSS() {
		let db = this.db;
		let setRawData = this.setRawData.bind(this);

		return new Promise(function (resolve, reject) {
			db.databases.templatecustomcss.getAll().then((dbr) => {
				setRawData("customCSS", '<style>' + dbr.css + '</style>');
				resolve();
			});
		});
	}

	/**
	 * Get user settings for credits
	 */
	getTemplateSettings() {
		let db = this.db;
		let setRawData = this.setRawData.bind(this);

		return new Promise(function (resolve, reject) {
			db.databases.templatesettings.getAll().then((dbr) => {
				setRawData("scrollSpeed", dbr.speed);
				setRawData("looping", dbr.looping);
				resolve();
			});
		});
	}

	/**
	 * Get color settings from db, build style section, add to rawData object
	 */
	getColors() {
		let db = this.db;
		let setRawData = this.setRawData.bind(this);

		return new Promise(function (resolve, reject) {
			db.databases.templatecolors.getAll().then((dbr) => {
				let colors = `<style>
				.titleColor {
					color: ${dbr.title};
				}
				.subTitleColor {
					color: ${dbr.subtitle};
				}
				.backgroundColor {
					background-color: ${dbr.background};
				}
				.sectionTitleColor {
					color: ${dbr.sectiontitle};
				}
				.textColor {
					color: ${dbr.textcolor};
				}
				.sectionBorderColor {
					border-bottom-color: ${dbr.sectionborder}
				}
				.screen::before {
					background-color: ${dbr.background};
				}
				</style>`;
				
				setRawData("colors", colors);
				resolve();
			});
		});
	}

	/**
	 * Fetch all sections in order, and build them out, adding each to rawData along the way
	 */
	getSections() {
		let db = this.db;
		let sectionBuilders = this.sectionBuilders;

		return new Promise(function (resolve, reject) {
			db.databases.templatesort.getAll().then((sortArr) => {
				db.databases.credittemplates.getTemplateDataForSorting(sortArr).then((templates) => {
					let promises = [];

					Object.entries(templates).forEach(([k,t])=>{
						let builderKey = t.id.replace(t.key + "_","");
						if(t.type === "dynamic" && t.enabled) {
							promises.push(sectionBuilders[builderKey](t));							
						} else if (t.type === "custom" && t.enabled) {
							promises.push(sectionBuilders[t.type](t));	
						} else if (t.type === "static" && t.enabled) {
							promises.push(sectionBuilders[t.type](t));
						}
					});

					Promise.all(promises).then(()=>{
						resolve();
					});
					
				});
			});
		});
	}

	/**
	 * Add built section after parsing tokens to rawData.sections
	 * @param {object} t tempalte object
	 */
	getSection_Custom_Or_Static(t) {
		let inner = t.inner;
		let wrapper = t.wrapper;
		let mainHTML = this.injectTypeAttrib(t.template, t.type, t.key);
		let rawTitle = this.rawData.contentTitle.template;
		let rawFooter = this.rawData.contentDivider.template;
		let setRawData = this.setRawData.bind(this);

		this.userArgs.DEBUG && this.utils.console("Adding data to template for " + t.id);

		return new Promise(function (resolve, reject) {
			let contentSection = Mustache.render(wrapper, { nodata: "" });
			let contentTitle = Mustache.render(rawTitle, { content_title: t.title });
			let contentDivider = Mustache.render(rawFooter, { nodata: "" });

			let replacement = {
				contentTitle: contentTitle,
				contentDivider: contentDivider
			};

			replacement[t.id] = contentSection;

			setRawData("sections", Mustache.render(mainHTML, replacement));
			resolve();
		});
	}

	/**
	 * Add built section after parsing tokens to rawData.sections, (skip if no users so no emtpy section rendered)
	 * @param {object} t tempalte object
	 */
	getSection_Name_Amount(t) {
		let db = this.db;
		let inner = t.inner;
		let wrapper = t.wrapper;
		let mainHTML = this.injectTypeAttrib(t.template, t.type, t.key);
		let rawTitle = this.rawData.contentTitle.template;
		let rawFooter = this.rawData.contentDivider.template;
		let setRawData = this.setRawData.bind(this);

		this.userArgs.DEBUG && this.utils.console("Adding data to template for " + t.id);

		return new Promise(function (resolve, reject) {
			let users = '';

			db.databases[t.key].getAll().then((all) => {
				if (all.length) {
					all.forEach((a) => {
						users += Mustache.render(inner, a);
					});

					let contentSection = Mustache.render(wrapper, { group: users });
					let contentTitle = Mustache.render(rawTitle, { content_title: t.title });
					let contentDivider = Mustache.render(rawFooter, { nodata: "" });

					let replacement = {
						contentTitle: contentTitle,
						contentDivider: contentDivider
					};

					replacement[t.id] = contentSection;

					setRawData("sections", Mustache.render(mainHTML, replacement));
				} else {
					//setRawData("sections", "");
				}
				
				resolve();
			});
		});
	}

	/**
	 * Add built section after parsing tokens to rawData.sections, (skip if no users so no emtpy section rendered)
	 * @param {object} t tempalte object
	 */
	getSection_Name_Total(t) {
		let db = this.db;
		let inner = t.inner;
		let wrapper = t.wrapper;
		let mainHTML = this.injectTypeAttrib(t.template, t.type, t.key);
		let rawTitle = this.rawData.contentTitle.template;
		let rawFooter = this.rawData.contentDivider.template;
		let setRawData = this.setRawData.bind(this);

		this.userArgs.DEBUG && this.utils.console("Adding data to template for " + t.id);


		return new Promise(function (resolve, reject) {
			db.databases[t.key].getAll().then((users) => {
				if(users.length) {
					let p = users.map((u) => {
						return db.databases["h" + t.key].getUser(u.name).then((hamount) => {
							let userWithHist = Object.assign({}, u, { total: hamount });
							return Mustache.render(inner, userWithHist)

						});
					});

					Promise.all(p).then((pr) => {
						let contentSection = Mustache.render(wrapper, { group: pr.join('') });
						let contentTitle = Mustache.render(rawTitle, { content_title: t.title });
						let contentDivider = Mustache.render(rawFooter, { nodata: "" });

						let replacement = {
							contentTitle: contentTitle,
							contentDivider: contentDivider
						};

						replacement[t.id] = contentSection;

						setRawData("sections", Mustache.render(mainHTML, replacement));
						
					});
				} else {
					//setRawData("sections", "");
				}

				resolve();
			});
		});
	}

	/**
	 * Add built section after parsing tokens to rawData.sections, (skip if no users so no emtpy section rendered)
	 * @param {object} t tempalte object
	 */
	getSection_Top5(t) {
		let db = this.db;
		let inner = t.inner;
		let wrapper = t.wrapper;
		let mainHTML = this.injectTypeAttrib(t.template, t.type, t.key);
		let rawTitle = this.rawData.contentTitle.template;
		let rawFooter = this.rawData.contentDivider.template;
		let setRawData = this.setRawData.bind(this);

		this.userArgs.DEBUG && this.utils.console("Adding data to template for " + t.id);

		return new Promise(function (resolve, reject) {
			let users = '';

			db.databases[t.key].getTop5(true, {}).then((all) => {
				if(all.length) {
					all.forEach((a) => {
						users += Mustache.render(inner, a);
					});

					let contentSection = Mustache.render(wrapper, { group: users });
					let contentTitle = Mustache.render(rawTitle, { content_title: t.title });
					let contentDivider = Mustache.render(rawFooter, { nodata: "" });

					let replacement = {
						contentTitle: contentTitle,
						contentDivider: contentDivider
					};

					replacement[t.id] = contentSection;

					setRawData("sections", Mustache.render(mainHTML, replacement));
				} else {
					//setRawData("sections", "");
				}
				
				resolve();
			});
		});
	}

	/**
	 * Add built section after parsing tokens to rawData.sections, (skip if no users so no emtpy section rendered)
	 * @param {object} t tempalte object
	 */
	getSection_Top10(t) {
		let db = this.db;
		let inner = t.inner;
		let wrapper = t.wrapper;
		let mainHTML = this.injectTypeAttrib(t.template, t.type, t.key);
		let rawTitle = this.rawData.contentTitle.template;
		let rawFooter = this.rawData.contentDivider.template;
		let setRawData = this.setRawData.bind(this);

		this.userArgs.DEBUG && this.utils.console("Adding data to template for " + t.id);

		return new Promise(function (resolve, reject) {
			let users = '';

			db.databases[t.key].getTop10(true, {}).then((all) => {
				if(all.length) {
					all.forEach((a) => {
						users += Mustache.render(inner, a);
					});

					let contentSection = Mustache.render(wrapper, { group: users });
					let contentTitle = Mustache.render(rawTitle, { content_title: t.title });
					let contentDivider = Mustache.render(rawFooter, { nodata: "" });

					let replacement = {
						contentTitle: contentTitle,
						contentDivider: contentDivider
					};

					replacement[t.id] = contentSection;

					setRawData("sections", Mustache.render(mainHTML, replacement));
				} else {
					//setRawData("sections", "");
				}
				
				resolve();
			});
		});
	}

	/**
	 * Add built section after parsing tokens to rawData.sections, (skip if no users so no emtpy section rendered)
	 * @param {object} t tempalte object
	 */
	getSection_Top5_Cards(t) {
		let db = this.db;
		let inner = t.inner;
		let wrapper = t.wrapper;
		let mainHTML = this.injectTypeAttrib(t.template, t.type, t.key);
		let rawTitle = this.rawData.contentTitle.template;
		let rawFooter = this.rawData.contentDivider.template;
		let setRawData = this.setRawData.bind(this);

		this.userArgs.DEBUG && this.utils.console("Adding data to template for " + t.id);

		return new Promise(function (resolve, reject) {
			let users = '';

			db.databases[t.key].getTop5(true, { card: 1 }).then((all) => {
				if(all.length) {
					all.forEach((a) => {
						users += Mustache.render(inner, a);
					});

					let contentSection = Mustache.render(wrapper, { group: users });
					let contentTitle = Mustache.render(rawTitle, { content_title: t.title });
					let contentDivider = Mustache.render(rawFooter, { nodata: "" });

					let replacement = {
						contentTitle: contentTitle,
						contentDivider: contentDivider
					};

					replacement[t.id] = contentSection;

					setRawData("sections", Mustache.render(mainHTML, replacement));
				} else {
					//setRawData("sections", "");
				}
				
				resolve();
			});
		});
	}

	/**
	 * Add built section after parsing tokens to rawData.sections, (skip if no users so no emtpy section rendered)
	 * @param {object} t tempalte object
	 */
	getSection_Top10_Cards(t) {
		let db = this.db;
		let inner = t.inner;
		let wrapper = t.wrapper;
		let mainHTML = this.injectTypeAttrib(t.template, t.type, t.key);
		let rawTitle = this.rawData.contentTitle.template;
		let rawFooter = this.rawData.contentDivider.template;
		let setRawData = this.setRawData.bind(this);

		this.userArgs.DEBUG && this.utils.console("Adding data to template for " + t.id);

		return new Promise(function (resolve, reject) {
			let users = '';

			db.databases[t.key].getTop10(true, { card: 1 }).then((all) => {
				if(all.length) {
					all.forEach((a) => {
						users += Mustache.render(inner, a);
					});

					let contentSection = Mustache.render(wrapper, { group: users });
					let contentTitle = Mustache.render(rawTitle, { content_title: t.title });
					let contentDivider = Mustache.render(rawFooter, { nodata: "" });

					let replacement = {
						contentTitle: contentTitle,
						contentDivider: contentDivider
					};

					replacement[t.id] = contentSection;

					setRawData("sections", Mustache.render(mainHTML, replacement));
				} else {
					//setRawData("sections", "");
				}
				
				resolve();
			});
		});
	}
	
	/**
	 * Entry point for class
	 * Set db at build time, run through all sections, build the html page, return as massive string for express response
	 * @param {dbadapter} db 
	 */
	getCreditsOutput(db) {
		this.db = db;
		this.initRawData();
		let assembleSections = this.assembleSections.bind(this);

		return new Promise(function (resolve, reject) {
			assembleSections().then((htmlpage)=>{
				resolve(htmlpage);
			});
		});
	}

	/**
	 * Build each section as promise, once complete parse the templates w Mustache and resolve 
	 */
	assembleSections() {
		let getContentTitle = this.getContentTitle.bind(this);
		let getContentDivider = this.getContentDivider.bind(this);
		let getMainHTML = this.getMainHTML.bind(this);
		let getCssJsIncludes = this.getCssJsIncludes.bind(this);
		let getDefaultCSS = this.getDefaultCSS.bind(this);
		let getCustomCSS = this.getCustomCSS.bind(this);
		let getTemplateSettings = this.getTemplateSettings.bind(this);
		let getColors = this.getColors.bind(this);
		let getSections = this.getSections.bind(this);
		let getRawData = this.getRawData.bind(this);

		return new Promise(function (resolve, reject) {
			Promise.all([
				getContentTitle(),
				getContentDivider(),
				getMainHTML(),
				getCssJsIncludes(),
				getDefaultCSS(),
				getCustomCSS(),
				getTemplateSettings(),
				getColors(),
				getSections()
			]).then(() => {
				let rawData = getRawData();
				resolve(Mustache.render(rawData.mainHTML, {
					js_includes: rawData.jsIncludes,
					scroll_speed: rawData.scrollSpeed,
					looping: rawData.looping.toString(),
					css_includes: rawData.cssIncludes,
					default_CSS: rawData.defaultCSS,
					custom_CSS: rawData.colors + rawData.customCSS,
					sections: rawData.sections.join("")
				}));
			});
		});
	}
}

exports.Builder = Builder;