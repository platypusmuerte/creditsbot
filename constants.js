exports.constants = {
	APP: {
		NAME: "Platys Credits Bot",
		EXENAME: "PlatysCreditsBot",
		VERSION: "2.0.0",
		DEFAULTS: {
			BLACKLIST: [],
			CLEAN_ON_STARTUP: true,
			DEBUG: true,
			PORT: 3022
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
		SUBS: "subs",
		VIPS: "vips",

		HISTORIC_BITS: "hbits",
		HISTORIC_CHANNELPOINTS: "hchannelpoints",
		HISTORIC_DONOS: "hdonos",
		HISTORIC_GIFTSUBS: "hgiftsubs",
		HISTORIC_HOSTS: "hhosts",
		HISTORIC_RAIDS: "hraids",
		HISTORIC_STREAMLOOTS: "hstreamloots",
		HISTORIC_SUBS: "hsubs"
	},
	GUI_DIRS: {
		BASE: "./gui",
		BASE_WEB_PATH: "/ui/"
	},
	MESSAGES: {
		BLACKLISTED: "Ignored/blacklisted"
	},
	PATHS: {
		ADD_USER: "/add/:key/:user/:amount",
		CREDITS: "/credits",
		GET_ALL: "/getall/:key",
		GET_10: "/top10/:key",
		GET_5: "/top5/:key",
		GET_USER: "/get/:key/:user",
		PING: "/ping",
		REMOVE_USER: "/remove/:user",
		TESTDATA_ADD: "/testdata/add",
		TESTDATA_REMOVE: "/testdata/remove",

		UI_PAGE_HOME: "/ui/*",
		UI_GET_DATA: "/uiget/:task",
		UI_SET_DATA: "/uiset/:task",
		UI_BASE_API: "/uiset/",
		UI_BASE_API_GET: "/uiget/"
	},
	QUERY_PARAMS: ["card","templateid"],
	SETTINGS_DATABASE_NAMES: {
		TEMPLATE_BLACKLIST: "blacklist",
		TEMPLATE_COLORS: "templatecolors",
		TEMPLATE_CREDITS: "credittemplates",
		TEMPLATE_CUSTOMCSS: "templatecustomcss",
		TEMPLATE_DEFAULTCSS: "templatedefaultcss",
		TEMPLATE_INCLUDES: "templateincludes",
		TEMPLATE_PAGE: "templatepage",
		TEMPLATE_SETTINGS: "templatesettings",
		TEMPLATE_SORT: "templatesort"
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
	}
};


