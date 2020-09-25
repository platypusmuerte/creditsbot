exports.sectionDefaults = [
	{
		key: "bans",
		enabled: true,
		templates: [
			{
				token: "name",
				enabled: true,
				title: "Bye Felicias",
				tInner: `<div class="name">{{name}}</div>`,
				tOuter: `<div class="bansWrapper">{{{group}}}</div>`
			}
		]
	}, {
		key: "bits",
		enabled: true,
		templates: [
			{
				token: "name",
				enabled: true,
				title: "Who Spent Bits",
				tInner: `<div class="name">{{name}}</div>`,
				tOuter: `<div class="bitsWrapper">{{{group}}}</div>`
			}, {
				token: "name_amount",
				enabled: true,
				title: "How Many Bits Per Viewer Today",
				tInner: `<div class="nameAmount"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>`,
				tOuter: `<div class="bitsAmountWrapper">{{{group}}}</div>`
			}, {
				token: "name_amount_total",
				enabled: true,
				title: "How Many Bits Per Viewer Today and Their Total",
				tInner: `<div class="nameAmountTotal"><div class="name">{{name}}</div><div class="amount">{{amount}}</div><div class="total">{{total}}</div></div>`,
				tOuter: `<div class="bitsAmountTotalWrapper">{{{group}}}</div>`
			}, {
				token: "name_total",
				enabled: true,
				title: "How Many Total Bits Per Viewer",
				tInner: `<div class="nameTotal"><div class="name">{{name}}</div><div class="total">{{total}}</div></div>`,
				tOuter: `<div class="bitsTotalWrapper">{{{group}}}</div>`
			}, {
				token: "top5",
				enabled: true,
				title: "Todays Top 5 Bits Spenders",
				tInner: `<div class="nameTop5"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>`,
				tOuter: `<div class="bitsTop5Wrapper">{{{group}}}</div>`
			}, {
				token: "top10",
				enabled: true,
				title: "Todays Top 10 Bits Spenders",
				tInner: `<div class="nameTop10"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>`,
				tOuter: `<div class="bitsTop10Wrapper">{{{group}}}</div>`
			}
		]
	}, {
		key: "channelpoints",
		enabled: true,
		templates: [
			{
				token: "name",
				enabled: true,
				title: "Who Spent Channel Points",
				tInner: `<div class="name">{{name}}</div>`,
				tOuter: `<div class="channelpointsWrapper">{{{group}}}</div>`
			}, {
				token: "name_amount",
				enabled: true,
				title: "How Many Channel Points Per Viewer Today",
				tInner: `<div class="nameAmount"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>`,
				tOuter: `<div class="channelpointsAmountWrapper">{{{group}}}</div>`
			}, {
				token: "name_amount_total",
				enabled: true,
				title: "How Many Channel Points Per Viewer Today and Their Total",
				tInner: `<div class="nameAmountTotal"><div class="name">{{name}}</div><div class="amount">{{amount}}</div><div class="total">{{total}}</div></div>`,
				tOuter: `<div class="channelpointsAmountTotalWrapper">{{{group}}}</div>`
			}, {
				token: "name_total",
				enabled: true,
				title: "How Many Total Channel Points Per Viewer",
				tInner: `<div class="nameTotal"><div class="name">{{name}}</div><div class="total">{{total}}</div></div>`,
				tOuter: `<div class="channelpointsTotalWrapper">{{{group}}}</div>`
			}, {
				token: "top5",
				enabled: true,
				title: "Todays Top 5 Channel Points Spenders",
				tInner: `<div class="nameTop5"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>`,
				tOuter: `<div class="channelpointsTop5Wrapper">{{{group}}}</div>`
			}, {
				token: "top10",
				enabled: true,
				title: "Todays Top 10 Channel Points Spenders",
				tInner: `<div class="nameTop10"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>`,
				tOuter: `<div class="channelpointsTop10Wrapper">{{{group}}}</div>`
			}
		]
	}, {
		key: "chatters",
		enabled: true,
		templates: [
			{
				token: "name",
				enabled: true,
				title: "Who Talked Today",
				tInner: `<div class="name">{{name}}</div>`,
				tOuter: `<div class="chattersWrapper">{{{group}}}</div>`
			}, {
				token: "name_amount",
				enabled: true,
				title: "How Much Talking Today",
				tInner: `<div class="nameAmount"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>`,
				tOuter: `<div class="chattersAmountWrapper">{{{group}}}</div>`
			}, {
				token: "top5",
				enabled: true,
				title: "Todays Top 5 Talkers",
				tInner: `<div class="nameTop5"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>`,
				tOuter: `<div class="chattersTop5Wrapper">{{{group}}}</div>`
			}, {
				token: "top10",
				enabled: true,
				title: "Todays Top 10 Talkers",
				tInner: `<div class="nameTop10"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>`,
				tOuter: `<div class="chattersTop10Wrapper">{{{group}}}</div>`
			}
		]
	}, {
		key: "donos",
		enabled: true,
		templates: [
			{
				token: "name",
				enabled: true,
				title: "Who Donated Today",
				tInner: `<div class="name">{{name}}</div>`,
				tOuter: `<div class="donosWrapper">{{{group}}}</div>`
			}, {
				token: "name_amount",
				enabled: true,
				title: "Who Donated What Today",
				tInner: `<div class="nameAmount"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>`,
				tOuter: `<div class="donosAmountWrapper">{{{group}}}</div>`
			}, {
				token: "name_amount_total",
				enabled: true,
				title: "Todays Donos Per Viewer Today and Their Total",
				tInner: `<div class="nameAmountTotal"><div class="name">{{name}}</div><div class="amount">{{amount}}</div><div class="total">{{total}}</div></div>`,
				tOuter: `<div class="donosAmountTotalWrapper">{{{group}}}</div>`
			}, {
				token: "name_total",
				enabled: true,
				title: "Total Donos Per Viewer",
				tInner: `<div class="nameTotal"><div class="name">{{name}}</div><div class="total">{{total}}</div></div>`,
				tOuter: `<div class="donosTotalWrapper">{{{group}}}</div>`
			}, {
				token: "top5",
				enabled: true,
				title: "Todays Top 5 Donos",
				tInner: `<div class="nameTop5"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>`,
				tOuter: `<div class="donosTop5Wrapper">{{{group}}}</div>`
			}, {
				token: "top10",
				enabled: true,
				title: "Todays Top 10 Donos",
				tInner: `<div class="nameTop10"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>`,
				tOuter: `<div class="donosTop10Wrapper">{{{group}}}</div>`
			}
		]
	}, {
		key: "follows",
		enabled: true,
		templates: [
			{
				token: "name",
				enabled: true,
				title: "Who Followed Today",
				tInner: `<div class="name">{{name}}</div>`,
				tOuter: `<div class="followsWrapper">{{{group}}}</div>`
			}
		]
	}, {
		key: "giftsubs",
		enabled: true,
		templates: [
			{
				token: "name",
				enabled: true,
				title: "Who Gifted Subs Today",
				tInner: `<div class="name">{{name}}</div>`,
				tOuter: `<div class="giftsubsWrapper">{{{group}}}</div>`
			}, {
				token: "name_amount",
				enabled: true,
				title: "Who Gifted How Many Subs Today",
				tInner: `<div class="nameAmount"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>`,
				tOuter: `<div class="giftsubsAmountWrapper">{{{group}}}</div>`
			}, {
				token: "name_amount_total",
				enabled: true,
				title: "Todays Sub Gifts Per Viewer Today and Their Total",
				tInner: `<div class="nameAmountTotal"><div class="name">{{name}}</div><div class="amount">{{amount}}</div><div class="total">{{total}}</div></div>`,
				tOuter: `<div class="giftsubsAmountTotalWrapper">{{{group}}}</div>`
			}, {
				token: "name_total",
				enabled: true,
				title: "Total Gifted Subs Per Viewer",
				tInner: `<div class="nameTotal"><div class="name">{{name}}</div><div class="total">{{total}}</div></div>`,
				tOuter: `<div class="giftsubsTotalWrapper">{{{group}}}</div>`
			}, {
				token: "top5",
				enabled: true,
				title: "Todays Top 5 Sub Gifters",
				tInner: `<div class="nameTop5"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>`,
				tOuter: `<div class="giftsubsTop5Wrapper">{{{group}}}</div>`
			}, {
				token: "top10",
				enabled: true,
				title: "Todays Top 10 Sub Gifters",
				tInner: `<div class="nameTop10"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>`,
				tOuter: `<div class="giftsubsTop10Wrapper">{{{group}}}</div>`
			}
		]
	}, {
		key: "hosts",
		enabled: true,
		templates: [
			{
				token: "name",
				enabled: true,
				title: "Who Hosted Today",
				tInner: `<div class="name">{{name}}</div>`,
				tOuter: `<div class="hostsWrapper">{{{group}}}</div>`
			}, {
				token: "name_total",
				enabled: true,
				title: "Total Hosts Per Viewer",
				tInner: `<div class="nameTotal"><div class="name">{{name}}</div><div class="total">{{total}}</div></div>`,
				tOuter: `<div class="hostsTotalWrapper">{{{group}}}</div>`
			}, {
				token: "top5",
				enabled: true,
				title: "Todays Top 5 Hosters",
				tInner: `<div class="nameTop5"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>`,
				tOuter: `<div class="hostsTop5Wrapper">{{{group}}}</div>`
			}, {
				token: "top10",
				enabled: true,
				title: "Todays Top 10 Hosters",
				tInner: `<div class="nameTop10"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>`,
				tOuter: `<div class="hostsTop10Wrapper">{{{group}}}</div>`
			}
		]
	}, {
		key: "mods",
		enabled: true,
		templates: [
			{
				token: "name",
				enabled: true,
				title: "Todays Mods",
				tInner: `<div class="name">{{name}}</div>`,
				tOuter: `<div class="modsWrapper">{{{group}}}</div>`
			}
		]
	}, {
		key: "patreons",
		enabled: true,
		templates: [
			{
				token: "name",
				enabled: true,
				title: "Todays Patrons",
				tInner: `<div class="name">{{name}}</div>`,
				tOuter: `<div class="patreonsWrapper">{{{group}}}</div>`
			}
		]
	}, {
		key: "raids",
		enabled: true,
		templates: [
			{
				token: "name",
				enabled: true,
				title: "Who Raided Today",
				tInner: `<div class="name">{{name}}</div>`,
				tOuter: `<div class="raidsWrapper">{{{group}}}</div>`
			}, {
				token: "name_total",
				enabled: true,
				title: "Total Raids Per Viewer",
				tInner: `<div class="nameTotal"><div class="name">{{name}}</div><div class="total">{{total}}</div></div>`,
				tOuter: `<div class="raidsTotalWrapper">{{{group}}}</div>`
			}, {
				token: "top5",
				enabled: true,
				title: "Todays Top 5 Raiders",
				tInner: `<div class="nameTop5"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>`,
				tOuter: `<div class="raidsTop5Wrapper">{{{group}}}</div>`
			}, {
				token: "top10",
				enabled: true,
				title: "Todays Top 10 Raiders",
				tInner: `<div class="nameTop10"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>`,
				tOuter: `<div class="raidsTop10Wrapper">{{{group}}}</div>`
			}
		]
	}, {
		key: "streamloots",
		enabled: true,
		templates: [
			{
				token: "top5_cards",
				enabled: true,
				title: "Todays Top 5 StreamLoots",
				tInner: `<div class="nameTop5Cards"><div class="name"></div><div class="card"><img src="{{card}}" /><div class="amount">{{amount}}</div></div></div>`,
				tOuter: `<div class="streamlootsTop5CardsWrapper">{{{group}}}</div>`
			}, {
				token: "top10_cards",
				enabled: true,
				title: "Overall Top 10 Stream Loots",
				tInner: `<div class="nameTop5Cards"><div class="name"></div><div class="card"><img src="{{card}}" /><div class="amount">{{amount}}</div></div></div>`,
				tOuter: `<div class="streamlootsTop5CardsWrapper">{{{group}}}</div>`
			}
		]
	}, {
		key: "subs",
		enabled: true,
		templates: [
			{
				token: "name",
				enabled: true,
				title: "Who Subbed Today",
				tInner: `<div class="name">{{name}}</div>`,
				tOuter: `<div class="subsWrapper">{{{group}}}</div>`
			}, {
				token: "name_total",
				enabled: true,
				title: "Total Subs Per Viewer",
				tInner: `<div class="nameTotal"><div class="name">{{name}}</div><div class="total">{{total}}</div></div>`,
				tOuter: `<div class="subsTotalWrapper">{{{group}}}</div>`
			}, {
				token: "top5",
				enabled: true,
				title: "Todays Top 5 Subs",
				tInner: `<div class="nameTop5"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>`,
				tOuter: `<div class="subsTop5Wrapper">{{{group}}}</div>`
			}, {
				token: "top10",
				enabled: true,
				title: "Todays Top 10 Subs",
				tInner: `<div class="nameTop10"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>`,
				tOuter: `<div class="subsTop10Wrapper">{{{group}}}</div>`
			}
		]
	}, {
		key: "vips",
		enabled: true,
		templates: [
			{
				token: "name",
				enabled: true,
				title: "Todays VIPs",
				tInner: `<div class="name">{{name}}</div>`,
				tOuter: `<div class="vipsWrapper">{{{group}}}</div>`
			}
		]
	}, {
		key: "hbits",
		enabled: true,
		templates: [
			 {
				token: "top5h",
				enabled: true,
				title: "Overall Top 5 Bits Spenders",
				tInner: `<div class="nameTop5"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>`,
				tOuter: `<div class="hbitsTop5Wrapper">{{{group}}}</div>`
			}, {
				token: "top10h",
				enabled: true,
				title: "Overall Top 10 Bits Spenders",
				tInner: `<div class="nameTop10"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>`,
				tOuter: `<div class="hbitsTop10Wrapper">{{{group}}}</div>`
			}
		]
	}, {
		key: "hchannelpoints",
		enabled: true,
		templates: [
			{
				token: "top5h",
				enabled: true,
				title: "Overall Top 5 Channel Points Spenders",
				tInner: `<div class="nameTop5"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>`,
				tOuter: `<div class="hchannelpointsTop5Wrapper">{{{group}}}</div>`
			}, {
				token: "top10h",
				enabled: true,
				title: "Overall Top 10 Channel Points Spenders",
				tInner: `<div class="nameTop10"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>`,
				tOuter: `<div class="hchannelpointsTop10Wrapper">{{{group}}}</div>`
			}
		]
	}, {
		key: "hdonos",
		enabled: true,
		templates: [
			{
				token: "top5h",
				enabled: true,
				title: "Overall Top 5 Donos",
				tInner: `<div class="nameTop5"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>`,
				tOuter: `<div class="hdonosTop5Wrapper">{{{group}}}</div>`
			}, {
				token: "top10h",
				enabled: true,
				title: "Overall Top 10 Donos",
				tInner: `<div class="nameTop10"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>`,
				tOuter: `<div class="hdonosTop10Wrapper">{{{group}}}</div>`
			}
		]
	}, {
		key: "hgiftsubs",
		enabled: true,
		templates: [
			{
				token: "top5h",
				enabled: true,
				title: "Overall Top 5 Sub Gifters",
				tInner: `<div class="nameTop5"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>`,
				tOuter: `<div class="hgiftsubsTop5Wrapper">{{{group}}}</div>`
			}, {
				token: "top10h",
				enabled: true,
				title: "Overall Top 10 Sub Gifters",
				tInner: `<div class="nameTop10"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>`,
				tOuter: `<div class="hgiftsubsTop10Wrapper">{{{group}}}</div>`
			}
		]
	}, {
		key: "hhosts",
		enabled: true,
		templates: [
			{
				token: "top5h",
				enabled: true,
				title: "Overall Top 5 Hosters",
				tInner: `<div class="nameTop5"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>`,
				tOuter: `<div class="hhostsTop5Wrapper">{{{group}}}</div>`
			}, {
				token: "top10h",
				enabled: true,
				title: "Overall Top 10 Hosters",
				tInner: `<div class="nameTop10"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>`,
				tOuter: `<div class="hhostsTop10Wrapper">{{{group}}}</div>`
			}
		]
	}, {
		key: "hraids",
		enabled: true,
		templates: [
			{
				token: "top5h",
				enabled: true,
				title: "Overall Top 5 Raiders",
				tInner: `<div class="nameTop5"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>`,
				tOuter: `<div class="hraidsTop5Wrapper">{{{group}}}</div>`
			}, {
				token: "top10h",
				enabled: true,
				title: "Overall Top 10 Raiders",
				tInner: `<div class="nameTop10"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>`,
				tOuter: `<div class="hraidsTop10Wrapper">{{{group}}}</div>`
			}
		]
	}, {
		key: "hstreamloots",
		enabled: true,
		templates: [
			{
				token: "top5h_cards",
				enabled: true,
				title: "Overall Top 5 StreamLoots",
				tInner: `<div class="nameTop5Cards"><div class="name"></div><div class="card"><img src="{{card}}" /><div class="amount">{{amount}}</div></div></div>`,
				tOuter: `<div class="hstreamlootsTop5CardsWrapper">{{{group}}}</div>`
			}, {
				token: "top10h_cards",
				enabled: true,
				title: "Overall Top 10 StreamLoots",
				tInner: `<div class="nameTop5Cards"><div class="name"></div><div class="card"><img src="{{card}}" /><div class="amount">{{amount}}</div></div></div>`,
				tOuter: `<div class="hstreamlootsTop5CardsWrapper">{{{group}}}</div>`
			}
		]
	}, {
		key: "hsubs",
		enabled: true,
		templates: [
			{
				token: "top5h",
				enabled: true,
				title: "Overall Top 5 Subs",
				tInner: `<div class="nameTop5"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>`,
				tOuter: `<div class="hsubsTop5Wrapper">{{{group}}}</div>`
			}, {
				token: "top10h",
				enabled: true,
				title: "Overall Top 10 Subs",
				tInner: `<div class="nameTop10"><div class="name">{{name}}</div><div class="amount">{{amount}}</div></div>`,
				tOuter: `<div class="hsubsTop10Wrapper">{{{group}}}</div>`
			}
		]
	}
];