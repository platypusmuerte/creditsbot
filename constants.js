exports.constants = {
	APP: {
		NAME: "Platys Credits Bot",
		VERSION: "1.0.0"
	},
	DATA_FILE_EXT: ".db",
	DATA_FILE_HISTORIC_EXT: ".hdb",
	DATABASE_NAMES: {
		BANS: "bans",
		BITS: "bits",
		CHANNELPOINTS: "channelpoints",
		CHATTERS: "chatters",
		FOLLOWS: "follows",
		GIFTSUBS: "giftsubs",
		HOSTS: "hosts",
		MODS: "mods",
		RAIDS: "raids",
		SUBS: "subs",

		HISTORIC_BITS: "hbits",
		HISTORIC_CHANNELPOINTS: "hchannelpoints",
		HISTORIC_GIFTSUBS: "hgiftsubs",
		HISTORIC_HOSTS: "hhosts",
		HISTORIC_RAIDS: "hraids",
		HISTORIC_SUBS: "hsubs",
	},
	PATHS: {
		ADD_USER: "/add/:key/:user/:amount",
		GET_ALL: "/getall/:key",
		GET_10: "/top10/:key/",
		GET_5: "/top5/:key/",
		GET_USER: "/get/:key/:user",
		REMOVE_USER: "/remove/:user",
	},
	PORT: 3011
};


