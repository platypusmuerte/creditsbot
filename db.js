class Database {
	constructor(params) {
		this.cryptr = params.cryptr;
		this.dataDir = params.dataDir;
		this.utils = params.utils;
		this.path = params.path;

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

		const { TemplateIncludesQueries } = require("./databases/templateincludes");
		const { TemplateColorsQueries } = require("./databases/templatecolors");
		const { TemplateSettingsQueries } = require("./databases/templatesettings");
		const { TemplateCustomCSSQueries } = require("./databases/templatecustomcss");
		const { BlacklistQueries } = require("./databases/blacklist");

		const { CreditTemplatesQueries } = require("./databases/credittemplates");
		const { TemplateSortQueries } = require("./databases/templatesort");
		const { TemplatePageQueries } = require("./databases/templatepage");
		const { TemplateDefaultCSSQueries } = require("./databases/templatedefaultcss");
		const { TemplateThemeQueries } = require("./databases/templatetheme");

		this.databases = {
			bans: new BansQueries({ cryptr: this.cryptr, dataDir: this.dataDir, utils: this.utils, path: this.path }),
			bits: new BitsQueries({ cryptr: this.cryptr, dataDir: this.dataDir, utils: this.utils, path: this.path }),
			channelpoints: new ChannelPointsQueries({ cryptr: this.cryptr, dataDir: this.dataDir, utils: this.utils, path: this.path }),
			chatters: new ChattersQueries({ cryptr: this.cryptr, dataDir: this.dataDir, utils: this.utils, path: this.path }),
			donos: new DonosQueries({ cryptr: this.cryptr, dataDir: this.dataDir, utils: this.utils, path: this.path }),
			follows: new FollowsQueries({ cryptr: this.cryptr, dataDir: this.dataDir, utils: this.utils, path: this.path }),
			giftsubs: new GiftSubsQueries({ cryptr: this.cryptr, dataDir: this.dataDir, utils: this.utils, path: this.path }),
			hosts: new HostsQueries({ cryptr: this.cryptr, dataDir: this.dataDir, utils: this.utils, path: this.path }),
			mods: new ModsQueries({ cryptr: this.cryptr, dataDir: this.dataDir, utils: this.utils, path: this.path }),
			patreons: new PatreonsQueries({ cryptr: this.cryptr, dataDir: this.dataDir, utils: this.utils, path: this.path }),
			raids: new RaidsQueries({ cryptr: this.cryptr, dataDir: this.dataDir, utils: this.utils, path: this.path }),
			streamloots: new StreamLootsQueries({ cryptr: this.cryptr, dataDir: this.dataDir, utils: this.utils, path: this.path }),
			streamlootspurchase: new StreamLootsPurchaseQueries({ cryptr: this.cryptr, dataDir: this.dataDir, utils: this.utils, path: this.path }),
			subs: new SubsQueries({ cryptr: this.cryptr, dataDir: this.dataDir, utils: this.utils, path: this.path }),
			vips: new VipsQueries({ cryptr: this.cryptr, dataDir: this.dataDir, utils: this.utils, path: this.path }),

			hbits: new HBitsQueries({ cryptr: this.cryptr, dataDir: this.dataDir, utils: this.utils, path: this.path }),
			hchannelpoints: new HChannelPointsQueries({ cryptr: this.cryptr, dataDir: this.dataDir, utils: this.utils, path: this.path }),
			hdonos: new HDonosQueries({ cryptr: this.cryptr, dataDir: this.dataDir, utils: this.utils, path: this.path }),
			hgiftsubs: new HGiftSubsQueries({ cryptr: this.cryptr, dataDir: this.dataDir, utils: this.utils, path: this.path }),
			hhosts: new HHostsQueries({ cryptr: this.cryptr, dataDir: this.dataDir, utils: this.utils, path: this.path }),
			hraids: new HRaidsQueries({ cryptr: this.cryptr, dataDir: this.dataDir, utils: this.utils, path: this.path }),
			hstreamloots: new HStreamLootsQueries({ cryptr: this.cryptr, dataDir: this.dataDir, utils: this.utils, path: this.path }),
			hstreamlootspurchase: new HStreamLootsPurchaseQueries({ cryptr: this.cryptr, dataDir: this.dataDir, utils: this.utils, path: this.path }),
			hsubs: new HSubsQueries({ cryptr: this.cryptr, dataDir: this.dataDir, utils: this.utils, path: this.path }),

			templateincludes: new TemplateIncludesQueries({ cryptr: this.cryptr, dataDir: this.dataDir, utils: this.utils, path: this.path }),
			templatecolors: new TemplateColorsQueries({ cryptr: this.cryptr, dataDir: this.dataDir, utils: this.utils, path: this.path }),
			templatesettings: new TemplateSettingsQueries({ cryptr: this.cryptr, dataDir: this.dataDir, utils: this.utils, path: this.path }),
			templatecustomcss: new TemplateCustomCSSQueries({ cryptr: this.cryptr, dataDir: this.dataDir, utils: this.utils, path: this.path }),
			blacklist: new BlacklistQueries({ cryptr: this.cryptr, dataDir: this.dataDir, utils: this.utils, path: this.path }),

			credittemplates: new CreditTemplatesQueries({ cryptr: this.cryptr, dataDir: this.dataDir, utils: this.utils, path: this.path }),
			templatesort: new TemplateSortQueries({ cryptr: this.cryptr, dataDir: this.dataDir, utils: this.utils, path: this.path }),
			templatepage: new TemplatePageQueries({ cryptr: this.cryptr, dataDir: this.dataDir, utils: this.utils, path: this.path }),
			templatedefaultcss: new TemplateDefaultCSSQueries({ cryptr: this.cryptr, dataDir: this.dataDir, utils: this.utils, path: this.path }),
			templatetheme: new TemplateThemeQueries({ cryptr: this.cryptr, dataDir: this.dataDir, utils: this.utils, path: this.path })
		};
	}
}

exports.Database = Database;