exports.constants = {
	APP: {
		NAME: "Platys Credits Bot",
		VERSION: "1.0.0"
	},
	DATA_FILE_EXT: ".db",
	DATABASE_NAMES: {
		BANS: "bans",
		BITS: "users",
		CHANNELPOINTS: "channelpoints",
		CHATTERS: "chatters",
		FOLLOWS: "follows",
		GIFTSUBS: "giftsubs",
		HOSTS: "hosts",
		MODS: "mods",
		RAIDS: "raids",
		SUBS: "subs",

		HISTORIC_BITS: "h/hbits",
		HISTORIC_CHANNELPOINTS: "h/hchannelpoints",
		HISTORIC_GIFTSUBS: "h/hgiftsubs",
		HISTORIC_HOSTS: "h/hhosts",
		HISTORIC_RAIDS: "h/hraids",
		HISTORIC_SUBS: "h/hsubs",
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


