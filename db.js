const { constants } = require ("./constants");

/**
 * DB Queries
 */
class Database {
	constructor(params) {
		this.fs = params.fs;
		this.cryptr = params.cryptr;
		this.dataDir = params.dataDir;
		this.utils = params.utils;
		this.userArgs = params.userArgs;
		this.path = params.path;
		this.themeDir = params.themeDir;
		this.defaultThemeDir = params.defaultThemeDir;

		this.currentTheme = constants.DEFAULT_DB_THEME;

		this.themes = {};
		this.databases = {};	
	}

	ready() {
		let buildThemes = this.buildThemes.bind(this);
		let buildDataBases = this.buildDataBases.bind(this);

		return new Promise((resolve, reject)=>{
			buildThemes().then(()=>{
				buildDataBases().then(()=>{
					resolve();
				});
			});
		});
	}

	/**
	 * Switch to active theme, after app ready
	 */
	switchToActiveTheme() {
		this.databases.templatetheme.getActiveTheme().then((theme)=>{
			this.setTheme(theme.id);
		});
	}

	/**
	 * returns reference to set of dbs (data/themes/THEME)
	 */
	theme() {
		return this.themes[this.currentTheme];
	}

	setTheme(str) {
		this.currentTheme = str;
	}

	/**
	 * create or refresh dbs for each folder in data/themes
	 */
	buildThemes() {
		let themeDir = this.themeDir;
		let fs = this.fs;
		let path = this.path;
		let utils = this.utils;
		let userArgs = this.userArgs;
		let addToThemes = this.addToThemes.bind(this);

		return new Promise((resolve, reject)=>{
			let dir = path.join(themeDir, "");
			
			fs.readdir(dir, (err, files) => {
				if (err) throw err;

				for (const file of files) {
					if(fs.lstatSync(path.join(dir, file)).isDirectory()) {
						let name = path.parse(file).name;

						userArgs.DEBUG && utils.console("Created theme " + name);

						addToThemes(name);
					}
				}
				
				resolve();
			});
			
		});
	}

	/**
	 * Duplicate a theme (copy its dbs to a new folder)
	 * @param {object} data src and dest paths
	 */
	dupeTheme(data) {
		let path = this.path;
		let fs = this.fs;
		let utils = this.utils;
		let userArgs = this.userArgs;
		let themePath = this.dataDir + "/themes/" + data.dest;
		let themePathSrc = this.dataDir + "/themes/" + data.src;

		if (!this.fs.existsSync(themePath)) {
			this.fs.mkdirSync(themePath);
			userArgs.DEBUG && utils.console("Created " + themePath);
		}

		return new Promise((resolve, reject)=>{	
			let dir = themePathSrc;

			fs.readdir(dir, (err, files) => {
				if (err) throw err;

				for (const file of files) {
					let name = path.parse(file).name;

					userArgs.DEBUG && utils.console("moving file " + name);

					fs.copy(path.join(dir, file),themePath + "/" + file, err => {
						if (err) throw err;							
					});
				}
				
				setTimeout(()=>{
					resolve();
				},500);								
			});			
		});
	}

	/**
	 * map folder to set of dbs (theme)
	 * @param {string} themeDir folder name
	 */
	addToThemes(themeDir) {
		let utils = this.utils;
		let userArgs = this.userArgs;
		let themePath = this.dataDir + "/themes/" + themeDir;

		if (!this.fs.existsSync(themePath)) {
			this.fs.mkdirSync(themePath);
			userArgs.DEBUG && utils.console("Created " + themePath);
		}

		const { TemplateIncludesQueries } = require("./databases/templateincludes");
		const { TemplateColorsQueries } = require("./databases/templatecolors");
		const { TemplateSettingsQueries } = require("./databases/templatesettings");
		const { TemplateCustomCSSQueries } = require("./databases/templatecustomcss");
		const { CreditTemplatesQueries } = require("./databases/credittemplates");
		const { TemplateSortQueries } = require("./databases/templatesort");
		const { TemplatePageQueries } = require("./databases/templatepage");
		const { TemplateDefaultCSSQueries } = require("./databases/templatedefaultcss");
		const { OverlayTwitterQueries } = require("./databases/overlaytwitter");

		this.themes[themeDir] = {
			templateincludes: new TemplateIncludesQueries({ cryptr: this.cryptr, dataDir: themePath, utils: this.utils, path: this.path }),
			templatecolors: new TemplateColorsQueries({ cryptr: this.cryptr, dataDir: themePath, utils: this.utils, path: this.path }),
			templatesettings: new TemplateSettingsQueries({ cryptr: this.cryptr, dataDir: themePath, utils: this.utils, path: this.path }),
			templatecustomcss: new TemplateCustomCSSQueries({ cryptr: this.cryptr, dataDir: themePath, utils: this.utils, path: this.path }),
			credittemplates: new CreditTemplatesQueries({ cryptr: this.cryptr, dataDir: themePath, utils: this.utils, path: this.path }),
			templatesort: new TemplateSortQueries({ cryptr: this.cryptr, dataDir: themePath, utils: this.utils, path: this.path }),
			templatepage: new TemplatePageQueries({ cryptr: this.cryptr, dataDir: themePath, utils: this.utils, path: this.path }),
			templatedefaultcss: new TemplateDefaultCSSQueries({ cryptr: this.cryptr, dataDir: themePath, utils: this.utils, path: this.path }),
			overlaytwitter: new OverlayTwitterQueries({ cryptr: this.cryptr, dataDir: themePath, utils: this.utils, path: this.path })
		};

		userArgs.DEBUG && utils.console("DBs created for theme " + themeDir);
	}

	buildDataBases() {
		const { BansQueries } = require("./databases/bans");
		const { BitsQueries } = require("./databases/bits");
		const { ChannelPointsQueries } = require("./databases/channelpoints");
		const { ChattersQueries } = require("./databases/chatters");
		const { DonosQueries } = require("./databases/donos");
		const { FollowsQueries } = require("./databases/follows");
		const { GiftSubsQueries } = require("./databases/giftsubs");
		const { HostsQueries } = require("./databases/hosts");
		const { ModsQueries } = require("./databases/mods");
		const { PatreonsQueries } = require("./databases/patreons");
		const { RaidsQueries } = require("./databases/raids");
		const { StreamLootsQueries } = require("./databases/streamloots");
		const { StreamLootsPurchaseQueries } = require("./databases/streamlootspurchase");
		const { SubsQueries } = require("./databases/subs");
		const { VipsQueries } = require("./databases/vips");

		const { HBitsQueries } = require("./databases/hbits");
		const { HChannelPointsQueries } = require("./databases/hchannelpoints");
		const { HDonosQueries } = require("./databases/hdonos");
		const { HGiftSubsQueries } = require("./databases/hgiftsubs");
		const { HHostsQueries } = require("./databases/hhosts");
		const { HRaidsQueries } = require("./databases/hraids");
		const { HStreamLootsQueries } = require("./databases/hstreamloots");
		const { HStreamLootsPurchaseQueries } = require("./databases/hstreamlootspurchase");
		const { HSubsQueries } = require("./databases/hsubs");
		
		const { BlacklistQueries } = require("./databases/blacklist");		
		const { TemplateThemeQueries } = require("./databases/templatetheme");

		let addDatabase = this.addDatabase.bind(this);

		return new Promise((resolve, reject)=>{			
			addDatabase("bans", BansQueries);
			addDatabase("bits", BitsQueries);
			addDatabase("channelpoints", ChannelPointsQueries);
			addDatabase("chatters", ChattersQueries);
			addDatabase("donos", DonosQueries);
			addDatabase("follows", FollowsQueries);
			addDatabase("giftsubs", GiftSubsQueries);
			addDatabase("hosts", HostsQueries);
			addDatabase("mods", ModsQueries);
			addDatabase("patreons", PatreonsQueries);
			addDatabase("raids", RaidsQueries);
			addDatabase("streamloots", StreamLootsQueries);
			addDatabase("streamlootspurchase", StreamLootsPurchaseQueries);
			addDatabase("subs", SubsQueries);
			addDatabase("vips", VipsQueries);
	
			addDatabase("hbits", HBitsQueries);
			addDatabase("hchannelpoints", HChannelPointsQueries);
			addDatabase("hdonos", HDonosQueries);
			addDatabase("hgiftsubs", HGiftSubsQueries);
			addDatabase("hhosts", HHostsQueries);
			addDatabase("hraids", HRaidsQueries);
			addDatabase("hstreamloots", HStreamLootsQueries);
			addDatabase("hstreamlootspurchase", HStreamLootsPurchaseQueries);
			addDatabase("hsubs", HSubsQueries);
	
			addDatabase("blacklist", BlacklistQueries);
			addDatabase("templatetheme", TemplateThemeQueries);
			
			resolve();
		});
	}

	addDatabase(key, db) {
		let addToThemes = (key === "templatetheme") ? this.addToThemes.bind(this):false;
		let dupeTheme = (key === "templatetheme") ? this.dupeTheme.bind(this):false;
		let setTheme = (key === "templatetheme") ? this.setTheme.bind(this):false;

		this.databases[key] = new db({ cryptr: this.cryptr, dataDir: this.dataDir, utils: this.utils, path: this.path, addToThemes: addToThemes, dupeTheme: dupeTheme, setTheme: setTheme });
	}
}

exports.Database = Database;