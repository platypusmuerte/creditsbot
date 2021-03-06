let packagejson = require("./package.json");

exports.constants = {
	APP: {
		NAME: "Platys Credits Bot",
		EXENAME: "PlatysCreditsBot",
		VERSION: packagejson.version,
		DEFAULTS: {
			BLACKLIST: [],
			CLEAN_ON_STARTUP: true,
			DEBUG: true,
			PORT: 3022,
			WEBSOCKET_PORT: 3023
		}
	},
	DATA_FILE_EXT: ".db",
	DATA_FILE_HISTORIC_EXT: ".hdb",
	DATA_FILE_SETTINGS: ".sdb",
	DATABASE_NAMES: {
		BANS: "bans",
		BITS: "bits",
		CHANNELPOINTS: "channelpoints",
		CHATTERS: "chatters",
		DONOS: "donos",
		FOLLOWS: "follows",
		GIFTSUBS: "giftsubs",
		HOSTS: "hosts",
		MODS: "mods",
		PATREONS: "patreons",
		RAIDS: "raids",
		STREAMLOOTS: "streamloots",
		STREAMLOOTSPURCHASE: "streamlootspurchase",
		STREAMTWEETS: "streamtweets",
		SUBS: "subs",
		VIPS: "vips",

		HISTORIC_BITS: "hbits",
		HISTORIC_CHANNELPOINTS: "hchannelpoints",
		HISTORIC_DONOS: "hdonos",
		HISTORIC_GIFTSUBS: "hgiftsubs",
		HISTORIC_HOSTS: "hhosts",
		HISTORIC_RAIDS: "hraids",
		HISTORIC_STREAMLOOTS: "hstreamloots",
		HISTORIC_STREAMLOOTSPURCHASE: "hstreamlootspurchase",
		HISTORIC_STREAMTWEETS: "hstreamtweets",
		HISTORIC_SUBS: "hsubs"
	},
	DEFAULT_DB_THEME: "default",
	GUI_DIRS: {
		BASE: "./gui",
		BASE_WEB_PATH: "/ui/"
	},
	MESSAGES: {
		BLACKLISTED: "Ignored/blacklisted"
	},
	PATCHES: {
		VERSION_FILE: "./patch.info",
		FOLDER: "./patches"
	},
	PATHS: {
		ADD_USER: "/add/:key/:user/:amount",
		CREDITS: "/credits",
		CUSTOM_OVERLAY: "/customoverlay",
		CUSTOM_OVERLAY_TRIGGER: "/customoverlay/:key",
		GET_ALL: "/getall/:key",
		GET_10: "/top10/:key",
		GET_5: "/top5/:key",
		GET_USER: "/get/:key/:user",
		OVERLAY: "/overlay",
		PING: "/ping",
		REMOVE_USER: "/remove/:user",
		TESTDATA_ADD: "/testdata/add",
		TESTDATA_REMOVE: "/testdata/remove",
		TRANSITIONS: "/transitions",
		TRANSITION_TRIGGER: "/trigger/transition/:key",
		TIMERBARS: "/timerbars",
		TIMERBAR_TRIGGER: "/trigger/timerbars/:key",
		TIMERBAR_TRIGGER_REMOVE: "/remove/timerbars/:key",

		UI_PAGE_HOME: "/ui/*",
		UI_GET_DATA: "/uiget/:task",
		UI_SET_DATA: "/uiset/:task",
		UI_BASE_API: "/uiset/",
		UI_BASE_API_GET: "/uiget/"
	},
	QUERY_PARAMS: ["card","templateid","transitionid","timerbarkey"],
	SETTINGS_DATABASE_NAMES: {
		TEMPLATE_BLACKLIST: "blacklist",
		TEMPLATE_COLORS: "templatecolors",
		TEMPLATE_CREDITS: "credittemplates",
		TEMPLATE_CUSTOMCSS: "templatecustomcss",
		TEMPLATE_DEFAULTCSS: "templatedefaultcss",
		TEMPLATE_INCLUDES: "templateincludes",
		TEMPLATE_PAGE: "templatepage",
		TEMPLATE_SETTINGS: "templatesettings",
		TEMPLATE_SORT: "templatesort",
		TEMPLATE_THEME: "templatetheme",
		OVERLAY_TWITTER: "overlaytwitter",
		TRANSITIONS: "transitions",
		TIMERBARS: "timerbars",
		TIMERBARSCUSTCSS: "timerbarscustcss"
	},
	TEMPLATE_DIRS: {
		BASE: "./templates",
		STATIC: "./usercontent"
	},
	TEMPLATE_FILES: {
		DEFAULT_HTML: "_default.html",
		DEFAULT_CSS: "_default.css",
		USER_HTML: "_user.html",
		USER_CSS: "_user.css"
	},
	TWITTER: {
		PATH_ADD_RULE: "https://api.twitter.com/2/tweets/search/stream/rules",
		PATH_STREAM: "https://api.twitter.com/2/tweets/search/stream?"
	}
};


