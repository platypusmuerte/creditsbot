const { constants } = require('../constants');


/**
 * DB Queries
 */
class TemplateThemeQueries {
	constructor(params) {
		this.cryptr = params.cryptr;
		this.dataDir = params.dataDir;
		this.utils = params.utils;
		this.path = params.path;
		this.DBNAME = constants.SETTINGS_DATABASE_NAMES.TEMPLATE_THEME;
		this.addToThemes = params.addToThemes;
		this.dupeTheme = params.dupeTheme;
		this.setTheme = params.setTheme;

		const { TemplateThemeDBAdapter } = require("../adapters/templatetheme");
		this.db = new TemplateThemeDBAdapter({ cryptr: this.cryptr, dataDir: this.dataDir, path: this.path }).get();
	}

	/**
	 * get full state of DB
	 */
	getState() {
		let db = this.db;

		return new Promise((resolve, reject)=>{
			resolve(db.value());
		});
	}

	/**
	 * returns array of json
	 */
	getAll() {
		let db = this.db;

		return new Promise((resolve, reject)=>{
			resolve(db.value());
		});		
	}

	/**
	 * Switch active theme
	 * @param {string} id the theme folder name/id
	 */
	activateThemeByID(id) {
		let db = this.db;
		let getActiveTheme = this.getActiveTheme.bind(this);
		let deactivateThemeDyID = this.deactivateThemeDyID.bind(this);
		let setTheme = this.setTheme.bind(this);

		return new Promise((resolve, reject)=>{
			getActiveTheme().then((activeTheme)=>{
				deactivateThemeDyID(activeTheme.id).then(()=>{
					console.log("activating " + id);
					db.find({ id: id }).assign({ active: true }).write();
					setTheme(id);
					resolve({success: true});
				});
			});
		});
	}

	/**
	 * Deactivate a theme
	 * @param {string} id theme id
	 */
	deactivateThemeDyID(id) {
		let db = this.db;

		return new Promise((resolve, reject)=>{
			resolve(db.find({ id: id }).assign({ active: false }).write());
		});
	}

	/**
	 * dupe a template.
	 * @param {object}	theme	{name: str, id: str, active: bool}
	 */
	duplicate(theme) {
		let db = this.db;
		let addNew = this.addNew.bind(this);
		let dupeTheme = this.dupeTheme;
		let id = Date.now() + "";

		return new Promise((resolve, reject)=>{
			dupeTheme({src: theme.of, dest: id}).then(()=>{
				addNew({name: theme.name}, id).then((newTheme)=>{
					resolve(newTheme);
				});
			});
		});
	}

	/**
	 * Add new template.
	 * @param {object}	theme	{name: str, id: str, active: bool}
	 */
	addNew(theme, duping) {
		let db = this.db;
		let id = (duping) ? duping:Date.now() + "";
		let addToThemes = this.addToThemes;

		let newTheme = Object.assign({},theme,{id: id, active: false});

		return new Promise((resolve, reject)=>{
			if (db.filter({ name: theme.name }).size().value() * 1 < 1) {
				db.push(newTheme).write();
				addToThemes(id);
				resolve(newTheme);
			} else {
				resolve(false);
			}
		});
	}

	/**
	 * Get the active theme folder
	 */
	getActiveTheme() {
		let db = this.db;

		return new Promise((resolve, reject)=>{
			resolve(db.find({ active: true }).value());			
		});
	}

	/**
	 * Remove a theme
	 * @param {string} id theme id
	 */
	deleteThemeByID(id) {
		let db = this.db;
		let getActiveTheme = this.getActiveTheme.bind(this);
		let activateThemeByID = this.activateThemeByID.bind(this);

		return new Promise((resolve, reject)=>{
			getActiveTheme().then((activeTheme)=>{
				db.remove({ id: id }).write();

				// if we just deleted the active theme, make default active
				if(activeTheme.id === id) {
					activateThemeByID("default").then(()=>{
						resolve("");
					});
				} else {
					resolve("");
				}
			});
		});
	}
}

exports.TemplateThemeQueries = TemplateThemeQueries;