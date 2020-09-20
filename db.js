class Database {
	constructor(params) {
		this.cryptr = params.cryptr;
		this.dataDir = params.dataDir;
		this.utils = params.utils;

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
		const { SubsQueries } = require("./databases/subs");
		const { VipsQueries } = require("./databases/vips");

		const { HBitsQueries } = require("./databases/hbits");
		const { HChannelPointsQueries } = require("./databases/hchannelpoints");
		const { HDonosQueries } = require("./databases/hdonos");
		const { HGiftSubsQueries } = require("./databases/hgiftsubs");
		const { HHostsQueries } = require("./databases/hhosts");
		const { HRaidsQueries } = require("./databases/hraids");
		const { HSubsQueries } = require("./databases/hsubs");

		this.databases = {
			bans: new BansQueries({ cryptr: this.cryptr, dataDir: this.dataDir, utils: this.utils }),
			bits: new BitsQueries({ cryptr: this.cryptr, dataDir: this.dataDir, utils: this.utils }),
			channelpoints: new ChannelPointsQueries({ cryptr: this.cryptr, dataDir: this.dataDir, utils: this.utils }),
			chatters: new ChattersQueries({ cryptr: this.cryptr, dataDir: this.dataDir, utils: this.utils }),
			donos: new DonosQueries({ cryptr: this.cryptr, dataDir: this.dataDir, utils: this.utils }),
			follows: new FollowsQueries({ cryptr: this.cryptr, dataDir: this.dataDir, utils: this.utils }),
			giftsubs: new GiftSubsQueries({ cryptr: this.cryptr, dataDir: this.dataDir, utils: this.utils }),
			hosts: new HostsQueries({ cryptr: this.cryptr, dataDir: this.dataDir, utils: this.utils }),
			mods: new ModsQueries({ cryptr: this.cryptr, dataDir: this.dataDir, utils: this.utils }),
			patreons: new PatreonsQueries({ cryptr: this.cryptr, dataDir: this.dataDir, utils: this.utils }),
			raids: new RaidsQueries({ cryptr: this.cryptr, dataDir: this.dataDir, utils: this.utils }),
			subs: new SubsQueries({ cryptr: this.cryptr, dataDir: this.dataDir, utils: this.utils }),
			vips: new VipsQueries({ cryptr: this.cryptr, dataDir: this.dataDir, utils: this.utils }),

			hbits: new HBitsQueries({ cryptr: this.cryptr, dataDir: this.dataDir, utils: this.utils }),
			hchannelpoints: new HChannelPointsQueries({ cryptr: this.cryptr, dataDir: this.dataDir, utils: this.utils }),
			hdonos: new HDonosQueries({ cryptr: this.cryptr, dataDir: this.dataDir, utils: this.utils }),
			hgiftsubs: new HGiftSubsQueries({ cryptr: this.cryptr, dataDir: this.dataDir, utils: this.utils }),
			hhosts: new HHostsQueries({ cryptr: this.cryptr, dataDir: this.dataDir, utils: this.utils }),
			hraids: new HRaidsQueries({ cryptr: this.cryptr, dataDir: this.dataDir, utils: this.utils }),
			hsubs: new HSubsQueries({ cryptr: this.cryptr, dataDir: this.dataDir, utils: this.utils }),
		};
	}
}

exports.Database = Database;