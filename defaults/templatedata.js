exports.templatedata = [
	{
		enabled: true,
		id: "titleWrapper",
		type: "static",
		key: false,
		title: `Main Title`,
		template: `<div class="titleWrapper">
	<div class="title titleColor">Thanks for watching!</div>
</div>`,
		wrapper: ``,
		inner: ``
	}, {
		enabled: true,
		id: "subtitleWrapper",
		type: "static",
		key: false,
		title: `Main Subtitle`,
		template: `<div class="subtitleWrapper">
	<div class="subtitle subTitleColor">See ya next time!</div>
</div>`,
		wrapper: ``,
		inner: ``
	}, {
		enabled: true,
		id: "contentTitle",
		type: "content",
		key: false,
		title: ``,
		template: `<div class="sectionTitleWrapper" >
		<div class="sectionTitle sectionTitleColor sectionBorderColor">{{{content_title}}}</div>
	</div>`,
		wrapper: ``,
		inner: ``
	}, {
		enabled: true,
		id: "contentDivider",
		type: "content",
		key: false,
		title: ``,
		template: `<div class="dividerWrapper">
		<div class="divider"></div>
	</div>`,
		wrapper: ``,
		inner: ``
	}, {
		enabled: true,
		id: "mods_name",
		type: "dynamic",
		key: "mods",
		title: `Todays Moderators`,
		template: `<div id="section_mods_name" class="creditSection">
	{{{contentTitle}}}
	{{{mods_name}}}
	{{{contentDivider}}}
</div>`,
		wrapper: `<div class="modsWrapper">{{{group}}}</div>`,
		inner: `<div class="name textColor">{{name}}</div>`
	}, {
		enabled: true,
		id: "vips_name",
		type: "dynamic",
		key: "vips",
		title: `Todays VIPs`,
		template: `<div id="section_vips_name" class="creditSection">
	{{{contentTitle}}}
	{{{vips_name}}}
	{{{contentDivider}}}
</div>`,
		wrapper: `<div class="vipsWrapper">{{{group}}}</div>`,
		inner: `<div class="name textColor">{{name}}</div>`
	}, {
		enabled: true,
		id: "follows_name",
		type: "dynamic",
		key: "follows",
		title: `Todays Follows`,
		template: `<div id="section_follows_name" class="creditSection">
	{{{contentTitle}}}
	{{{follows_name}}}
	{{{contentDivider}}}
</div>`,
		wrapper: `<div class="followsWrapper">{{{group}}}</div>`,
		inner: `<div class="name textColor">{{name}}</div>`
	}, {
		enabled: true,
		id: "subs_name",
		type: "dynamic",
		key: "subs",
		title: `New and Renewing Subs`,
		template: `<div id="section_subs_name" class="creditSection">
	{{{contentTitle}}}
	{{{subs_name}}}
	{{{contentDivider}}}
</div>`,
		wrapper: `<div class="subsWrapper">{{{group}}}</div>`,
		inner: `<div class="name textColor">{{name}}</div>`
	}, {
		enabled: true,
		id: "giftsubs_name",
		type: "dynamic",
		key: "giftsubs",
		title: `Many Thanks For The Gift Subs`,
		template: `<div id="section_giftsubs_name" class="creditSection">
	{{{contentTitle}}}
	{{{giftsubs_name}}}
	{{{contentDivider}}}
</div>`,
		wrapper: `<div class="giftsubsWrapper">{{{group}}}</div>`,
		inner: `<div class="name textColor">{{name}}</div>`
	}, {
		enabled: true,
		id: "footerWrapper",
		type: "static",
		key: false,
		title: `Footer Wrapper`,
		template: `<div class="footerWrapper">
	<div class="footer">
		<!-- THIS DIV IS POSITIONED BELOW THE CREDITS, AND WILL SHOW ON SCREEN AFTER ROLLUP/NOT BE HIDDEN -->
	</div>
</div>`,
		wrapper: ``,
		inner: ``
	}, {
		enabled: true,
		id: "hchannelpoints_top5H",
		type: "dynamic",
		key: "hchannelpoints",
		title: `Overall Top 5 Channel Points`,
		template: `<div id="section_hchannelpoints_top5H" class="creditSection">
	{{{contentTitle}}}
	{{{hchannelpoints_top5H}}}
	{{{contentDivider}}}
</div>`,
		wrapper: `<div class="hchannelpointsTop5Wrapper">{{{group}}}</div>`,
		inner: `<div class="nameTop5"><div class="name textColor">{{name}}</div><div class="amount amountColor">{{amount}}</div></div>`
	}, {
		enabled: true,
		id: "patreons_name",
		type: "dynamic",
		key: "patreons",
		title: `New Patrons`,
		template: `<div id="section_patreons_name" class="creditSection">
	{{{contentTitle}}}
	{{{patreons_name}}}
	{{{contentDivider}}}
</div>`,
		wrapper: `<div class="patreonsWrapper">{{{group}}}</div>`,
		inner: `<div class="name textColor">{{name}}</div>`
	}, {
		enabled: true,
		id: "donos_name",
		type: "dynamic",
		key: "donos",
		title: `Todays Donations`,
		template: `<div id="section_donos_name" class="creditSection">
	{{{contentTitle}}}
	{{{donos_name}}}
	{{{contentDivider}}}
</div>`,
		wrapper: `<div class="donosWrapper">{{{group}}}</div>`,
		inner: `<div class="name textColor">{{name}}</div>`
	}, {
		enabled: true,
		id: "hosts_name",
		type: "dynamic",
		key: "hosts",
		title: `Todays Stream Was Hosted By`,
		template: `<div id="section_hosts_name" class="creditSection">
	{{{contentTitle}}}
	{{{hosts_name}}}
	{{{contentDivider}}}
</div>`,
		wrapper: `<div class="hostsWrapper">{{{group}}}</div>`,
		inner: `<div class="name textColor">{{name}}</div>`
	}, {
		enabled: true,
		id: "raids_name",
		type: "dynamic",
		key: "raids",
		title: `The Raids`,
		template: `<div id="section_raids_name" class="creditSection">
	{{{contentTitle}}}
	{{{raids_name}}}
	{{{contentDivider}}}
</div>`,
		wrapper: `<div class="raidsWrapper">{{{group}}}</div>`,
		inner: `<div class="name textColor">{{name}}</div>`
	}, {
		enabled: true,
		id: "bans_name",
		type: "dynamic",
		key: "bans",
		title: `Bye Felicias`,
		template: `<div id="section_bans_name" class="creditSection">
	{{{contentTitle}}}
	{{{bans_name}}}
	{{{contentDivider}}}
</div>`,
		wrapper: `<div class="bansWrapper">{{{group}}}</div>`,
		inner: `<div class="name textColor">{{name}}</div>`
	}, {
		enabled: true,
		id: "bits_name",
		type: "dynamic",
		key: "bits",
		title: `Thanks for the Bits!`,
		template: `<div id="section_bits_name" class="creditSection">
	{{{contentTitle}}}
	{{{bits_name}}}
	{{{contentDivider}}}
</div>`,
		wrapper: `<div class="bitsWrapper">{{{group}}}</div>`,
		inner: `<div class="name textColor">{{name}}</div>`
	}, {
		enabled: true,
		id: "channelpoints_name",
		type: "dynamic",
		key: "channelpoints",
		title: `Special Interactions Provided By`,
		template: `<div id="section_channelpoints_name" class="creditSection">
	{{{contentTitle}}}
	{{{channelpoints_name}}}
	{{{contentDivider}}}
</div>`,
		wrapper: `<div class="channelpointsWrapper">{{{group}}}</div>`,
		inner: `<div class="name textColor">{{name}}</div>`
	}, {
		enabled: true,
		id: "chatters_name",
		type: "dynamic",
		key: "chatters",
		title: `The Voices In My Head`,
		template: `<div id="section_chatters_name" class="creditSection">
	{{{contentTitle}}}
	{{{chatters_name}}}
	{{{contentDivider}}}
</div>`,
		wrapper: `<div class="chattersWrapper">{{{group}}}</div>`,
		inner: `<div class="name textColor">{{name}}</div>`
	}, {
		enabled: true,
		id: "giftsubs_top5",
		type: "dynamic",
		key: "giftsubs",
		title: `Top 5 Sub Gifters Today`,
		template: `<div id="section_giftsubs_top5" class="creditSection">
	{{{contentTitle}}}
	{{{giftsubs_top5}}}
	{{{contentDivider}}}
</div>`,
		wrapper: `<div class="giftsubsTop5Wrapper">{{{group}}}</div>`,
		inner: `<div class="nameTop5"><div class="name textColor">{{name}}</div><div class="amount amountColor">{{amount}}</div></div>`
	}, {
		enabled: true,
		id: "bits_top5",
		type: "dynamic",
		key: "bits",
		title: `Top 5 Bits Today`,
		template: `<div id="section_bits_top5" class="creditSection">
	{{{contentTitle}}}
	{{{bits_top5}}}
	{{{contentDivider}}}
</div>`,
		wrapper: `<div class="bitsTop5Wrapper">{{{group}}}</div>`,
		inner: `<div class="nameTop5"><div class="name textColor">{{name}}</div><div class="amount amountColor">{{amount}}</div></div>`
	}, {
		enabled: true,
		id: "donos_top5",
		type: "dynamic",
		key: "donos",
		title: `Top 5 Donations Today`,
		template: `<div id="section_donos_top5" class="creditSection">
	{{{contentTitle}}}
	{{{donos_top5}}}
	{{{contentDivider}}}
</div>`,
		wrapper: `<div class="donosTop5Wrapper">{{{group}}}</div>`,
		inner: `<div class="nameTop5"><div class="name textColor">{{name}}</div><div class="amount amountColor">{{amount}}</div></div>`
	}, {
		enabled: true,
		id: "channelpoints_top5",
		type: "dynamic",
		key: "channelpoints",
		title: `Top 5 Channel Points Today`,
		template: `<div id="section_channelpoints_top5" class="creditSection">
	{{{contentTitle}}}
	{{{channelpoints_top5}}}
	{{{contentDivider}}}
</div>`,
		wrapper: `<div class="channelpointsTop5Wrapper">{{{group}}}</div>`,
		inner: `<div class="nameTop5"><div class="name textColor">{{name}}</div><div class="amount amountColor">{{amount}}</div></div>`
	}, {
		enabled: true,
		id: "chatters_top5",
		type: "dynamic",
		key: "chatters",
		title: `Top 5 Chatty People Today`,
		template: `<div id="section_chatters_top5" class="creditSection">
	{{{contentTitle}}}
	{{{chatters_top5}}}
	{{{contentDivider}}}
</div>`,
		wrapper: `<div class="chattersTop5Wrapper">{{{group}}}</div>`,
		inner: `<div class="nameTop5"><div class="name textColor">{{name}}</div><div class="amount amountColor">{{amount}}</div></div>`
	}, {
		enabled: true,
		id: "streamloots_top5_cards",
		type: "dynamic",
		key: "streamloots",
		title: `Top 5 StreamLoots Cards`,
		template: `<div id="section_streamloots_top5_cards" class="creditSection">
	{{{contentTitle}}}
	{{{streamloots_top5_cards}}}
	{{{contentDivider}}}
</div>`,
		wrapper: `<div class="streamlootsTop5CardsWrapper">{{{group}}}</div>`,
		inner: `<div class="nameTop5Cards"><div class="name textColor"></div><div class="card"><img src="{{card}}" /><div class="amount amountColor">{{amount}}</div></div></div>`
	}, {
		enabled: true,
		id: "streamloots_top10_cards",
		type: "dynamic",
		key: "streamloots",
		title: `Top 10 StreamLoots Cards`,
		template: `<div id="section_streamloots_top10_cards" class="creditSection">
	{{{contentTitle}}}
	{{{streamloots_top10_cards}}}
	{{{contentDivider}}}
</div>`,
		wrapper: `<div class="streamlootsTop10CardsWrapper">{{{group}}}</div>`,
		inner: `<div class="nameTop5Cards"><div class="name textColor"></div><div class="card"><img src="{{card}}" /><div class="amount amountColor">{{amount}}</div></div></div>`
	}, {
		enabled: true,
		id: "hstreamloots_top5H_cards",
		type: "dynamic",
		key: "hstreamloots",
		title: `Overall Top 5 StreamLoots Cards`,
		template: `<div id="section_hstreamloots_top5H_cards" class="creditSection">
	{{{contentTitle}}}
	{{{hstreamloots_top5H_cards}}}
	{{{contentDivider}}}
</div>`,
		wrapper: `<div class="hstreamlootsTop5CardsWrapper">{{{group}}}</div>`,
		inner: `<div class="nameTop5Cards"><div class="name textColor"></div><div class="card"><img src="{{card}}" /><div class="amount amountColor">{{amount}}</div></div></div>`
	}, {
		enabled: true,
		id: "hstreamloots_top10H_cards",
		type: "dynamic",
		key: "hstreamloots",
		title: `Overall Top 10 StreamLoots Cards`,
		template: `<div id="section_hstreamloots_top10H_cards" class="creditSection">
	{{{contentTitle}}}
	{{{hstreamloots_top10H_cards}}}
	{{{contentDivider}}}
</div>`,
		wrapper: `<div class="hstreamlootsTop5CardsWrapper">{{{group}}}</div>`,
		inner: `<div class="nameTop5Cards"><div class="name textColor"></div><div class="card"><img src="{{card}}" /><div class="amount amountColor">{{amount}}</div></div></div>`
	}, {
		enabled: true,
		id: "giftsubs_name_amount",
		type: "dynamic",
		key: "giftsubs",
		title: `Gifted Subs Today`,
		template: `<div id="section_giftsubs_name_amount" class="creditSection">
	{{{contentTitle}}}
	{{{giftsubs_name_amount}}}
	{{{contentDivider}}}
</div>`,
		wrapper: `<div class="giftsubsAmountWrapper">{{{group}}}</div>`,
		inner: `<div class="nameAmount"><div class="name textColor">{{name}}</div><div class="amount amountColor">{{amount}}</div></div>`
	}, {
		enabled: true,
		id: "bits_name_amount",
		type: "dynamic",
		key: "bits",
		title: `Bits and Who Spent Them`,
		template: `<div id="section_bits_name_amount" class="creditSection">
	{{{contentTitle}}}
	{{{bits_name_amount}}}
	{{{contentDivider}}}
</div>`,
		wrapper: `<div class="bitsAmountWrapper">{{{group}}}</div>`,
		inner: `<div class="nameAmount"><div class="name textColor">{{name}}</div><div class="amount amountColor">{{amount}}</div></div>`
	}, {
		enabled: true,
		id: "donos_name_amount",
		type: "dynamic",
		key: "donos",
		title: `Donation Details`,
		template: `<div id="section_donos_name_amount" class="creditSection">
	{{{contentTitle}}}
	{{{donos_name_amount}}}
	{{{contentDivider}}}
</div>`,
		wrapper: `<div class="donosAmountWrapper">{{{group}}}</div>`,
		inner: `<div class="nameAmount"><div class="name textColor">{{name}}</div><div class="amount amountColor">{{amount}}</div></div>`
	}, {
		enabled: true,
		id: "channelpoints_name_amount",
		type: "dynamic",
		key: "channelpoints",
		title: `Channel Points and Who Spent Them`,
		template: `<div id="section_channelpoints_name_amount" class="creditSection">
	{{{contentTitle}}}
	{{{channelpoints_name_amount}}}
	{{{contentDivider}}}
</div>`,
		wrapper: `<div class="channelpointsAmountWrapper">{{{group}}}</div>`,
		inner: `<div class="nameAmount"><div class="name textColor">{{name}}</div><div class="amount amountColor">{{amount}}</div></div>`
	}, {
		enabled: true,
		id: "chatters_name_amount",
		type: "dynamic",
		key: "chatters",
		title: `Stream Chat Details`,
		template: `<div id="section_chatters_name_amount" class="creditSection">
	{{{contentTitle}}}
	{{{chatters_name_amount}}}
	{{{contentDivider}}}
</div>`,
		wrapper: `<div class="chattersAmountWrapper">{{{group}}}</div>`,
		inner: `<div class="nameAmount"><div class="name textColor">{{name}}</div><div class="amount amountColor">{{amount}}</div></div>`
	}, {
		enabled: true,
		id: "giftsubs_name_total",
		type: "dynamic",
		key: "giftsubs",
		title: `Total Subs Gifted By Viewers`,
		template: `<div id="section_giftsubs_name_total" class="creditSection">
	{{{contentTitle}}}
	{{{giftsubs_name_total}}}
	{{{contentDivider}}}
</div>`,
		wrapper: `<div class="giftsubsTotalWrapper">{{{group}}}</div>`,
		inner: `<div class="nameTotal"><div class="name textColor">{{name}}</div><div class="total totalColor">{{total}}</div></div>`
	}, {
		enabled: true,
		id: "subs_name_total",
		type: "dynamic",
		key: "subs",
		title: `Total Subs By Viewers`,
		template: `<div id="section_subs_name_total" class="creditSection">
	{{{contentTitle}}}
	{{{subs_name_total}}}
	{{{contentDivider}}}
</div>`,
		wrapper: `<div class="subsTotalWrapper">{{{group}}}</div>`,
		inner: `<div class="nameTotal"><div class="name textColor">{{name}}</div><div class="total totalColor">{{total}}</div></div>`
	}, {
		enabled: true,
		id: "bits_name_total",
		type: "dynamic",
		key: "bits",
		title: `Total Bits Spent By Viewers`,
		template: `<div id="section_bits_name_total" class="creditSection">
	{{{contentTitle}}}
	{{{bits_name_total}}}
	{{{contentDivider}}}
</div>`,
		wrapper: `<div class="bitsTotalWrapper">{{{group}}}</div>`,
		inner: `<div class="nameTotal"><div class="name textColor">{{name}}</div><div class="total totalColor">{{total}}</div></div>`
	}, {
		enabled: true,
		id: "donos_name_total",
		type: "dynamic",
		key: "donos",
		title: `Total Donations From Viewers`,
		template: `<div id="section_donos_name_total" class="creditSection">
	{{{contentTitle}}}
	{{{donos_name_total}}}
	{{{contentDivider}}}
</div>`,
		wrapper: `<div class="donosTotalWrapper">{{{group}}}</div>`,
		inner: `<div class="nameTotal"><div class="name textColor">{{name}}</div><div class="total totalColor">{{total}}</div></div>`
	}, {
		enabled: true,
		id: "channelpoints_name_total",
		type: "dynamic",
		key: "channelpoints",
		title: `Total Channel Points Spent By Viewers`,
		template: `<div id="section_channelpoints_name_total" class="creditSection">
	{{{contentTitle}}}
	{{{channelpoints_name_total}}}
	{{{contentDivider}}}
</div>`,
		wrapper: `<div class="channelpointsTotalWrapper">{{{group}}}</div>`,
		inner: `<div class="nameTotal"><div class="name textColor">{{name}}</div><div class="total totalColor">{{total}}</div></div>`
	}, {
		enabled: true,
		id: "hosts_name_total",
		type: "dynamic",
		key: "hosts",
		title: `Total Hosts By Viewers`,
		template: `<div id="section_hosts_name_total" class="creditSection">
	{{{contentTitle}}}
	{{{hosts_name_total}}}
	{{{contentDivider}}}
</div>`,
		wrapper: `<div class="hostsTotalWrapper">{{{group}}}</div>`,
		inner: `<div class="nameTotal"><div class="name textColor">{{name}}</div><div class="total totalColor">{{total}}</div></div>`
	}, {
		enabled: true,
		id: "raids_name_total",
		type: "dynamic",
		key: "raids",
		title: `Total Raids By Viewers`,
		template: `<div id="section_raids_name_total" class="creditSection">
	{{{contentTitle}}}
	{{{raids_name_total}}}
	{{{contentDivider}}}
</div>`,
		wrapper: `<div class="raidsTotalWrapper">{{{group}}}</div>`,
		inner: `<div class="nameTotal"><div class="name textColor">{{name}}</div><div class="total totalColor">{{total}}</div></div>`
	}, {
		enabled: true,
		id: "bits_name_amount_total",
		type: "dynamic",
		key: "bits",
		title: `Bits: Today and Total By Viewers`,
		template: `<div id="section_bits_name_amount_total" class="creditSection">
	{{{contentTitle}}}
	{{{bits_name_amount_total}}}
	{{{contentDivider}}}
</div>`,
		wrapper: `<div class="bitsAmountTotalWrapper">{{{group}}}</div>`,
		inner: `<div class="nameAmountTotal"><div class="name textColor">{{name}}</div><div class="amount amountColor">{{amount}}</div><div class="total totalColor">{{total}}</div></div>`
	}, {
		enabled: true,
		id: "donos_name_amount_total",
		type: "dynamic",
		key: "donos",
		title: `Donations Today and Total By Viewers`,
		template: `<div id="section_donos_name_amount_total" class="creditSection">
	{{{contentTitle}}}
	{{{donos_name_amount_total}}}
	{{{contentDivider}}}
</div>`,
		wrapper: `<div class="donosAmountTotalWrapper">{{{group}}}</div>`,
		inner: `<div class="nameAmountTotal"><div class="name textColor">{{name}}</div><div class="amount amountColor">{{amount}}</div><div class="total totalColor">{{total}}</div></div>`
	}, {
		enabled: true,
		id: "giftsubs_name_amount_total",
		type: "dynamic",
		key: "giftsubs",
		title: `Gifted Subs Today and Total By Viewers`,
		template: `<div id="section_giftsubs_name_amount_total" class="creditSection">
	{{{contentTitle}}}
	{{{giftsubs_name_amount_total}}}
	{{{contentDivider}}}
</div>`,
		wrapper: `<div class="giftsubsAmountTotalWrapper">{{{group}}}</div>`,
		inner: `<div class="nameAmountTotal"><div class="name textColor">{{name}}</div><div class="amount amountColor">{{amount}}</div><div class="total totalColor">{{total}}</div></div>`
	}, {
		enabled: true,
		id: "channelpoints_name_amount_total",
		type: "dynamic",
		key: "channelpoints",
		title: `Channel Points Today and Total By Viewers`,
		template: `<div id="section_channelpoints_name_amount_total" class="creditSection">
	{{{contentTitle}}}
	{{{channelpoints_name_amount_total}}}
	{{{contentDivider}}}
</div>`,
		wrapper: `<div class="channelpointsAmountTotalWrapper">{{{group}}}</div>`,
		inner: `<div class="nameAmountTotal"><div class="name textColor">{{name}}</div><div class="amount amountColor">{{amount}}</div><div class="total totalColor">{{total}}</div></div>`
	}, {
		enabled: true,
		id: "giftsubs_top10",
		type: "dynamic",
		key: "giftsubs",
		title: `Top 10 Sub Gifters Today`,
		template: `<div id="section_giftsubs_top10" class="creditSection">
	{{{contentTitle}}}
	{{{giftsubs_top10}}}
	{{{contentDivider}}}
</div>`,
		wrapper: `<div class="giftsubsTop10Wrapper">{{{group}}}</div>`,
		inner: `<div class="nameTop10"><div class="name textColor">{{name}}</div><div class="amount amountColor">{{amount}}</div></div>`
	}, {
		enabled: true,
		id: "bits_top10",
		type: "dynamic",
		key: "bits",
		title: `Top 10 Bits Today`,
		template: `<div id="section_bits_top10" class="creditSection">
	{{{contentTitle}}}
	{{{bits_top10}}}
	{{{contentDivider}}}
</div>`,
		wrapper: `<div class="bitsTop10Wrapper">{{{group}}}</div>`,
		inner: `<div class="nameTop10"><div class="name textColor">{{name}}</div><div class="amount amountColor">{{amount}}</div></div>`
	}, {
		enabled: true,
		id: "donos_top10",
		type: "dynamic",
		key: "donos",
		title: `Top 10 Donos Today`,
		template: `<div id="section_donos_top10" class="creditSection">
	{{{contentTitle}}}
	{{{donos_top10}}}
	{{{contentDivider}}}
</div>`,
		wrapper: `<div class="donosTop10Wrapper">{{{group}}}</div>`,
		inner: `<div class="nameTop10"><div class="name textColor">{{name}}</div><div class="amount amountColor">{{amount}}</div></div>`
	}, {
		enabled: true,
		id: "channelpoints_top10",
		type: "dynamic",
		key: "channelpoints",
		title: `Top 10 Channel Points Today`,
		template: `<div id="section_channelpoints_top10" class="creditSection">
	{{{contentTitle}}}
	{{{channelpoints_top10}}}
	{{{contentDivider}}}
</div>`,
		wrapper: `<div class="channelpointsTop10Wrapper">{{{group}}}</div>`,
		inner: `<div class="nameTop10"><div class="name textColor">{{name}}</div><div class="amount amountColor">{{amount}}</div></div>`
	}, {
		enabled: true,
		id: "chatters_top10",
		type: "dynamic",
		key: "chatters",
		title: `Top 10 Chatty People Today`,
		template: `<div id="section_chatters_top10" class="creditSection">
	{{{contentTitle}}}
	{{{chatters_top10}}}
	{{{contentDivider}}}
</div>`,
		wrapper: `<div class="chattersTop10Wrapper">{{{group}}}</div>`,
		inner: `<div class="nameTop10"><div class="name textColor">{{name}}</div><div class="amount amountColor">{{amount}}</div></div>`
	}, {
		enabled: true,
		id: "hgiftsubs_top10H",
		type: "dynamic",
		key: "hgiftsubs",
		title: `Overall Top 10 Sub Gifters`,
		template: `<div id="section_hgiftsubs_top10H" class="creditSection">
	{{{contentTitle}}}
	{{{hgiftsubs_top10H}}}
	{{{contentDivider}}}
</div>`,
		wrapper: `<div class="hgiftsubsTop10Wrapper">{{{group}}}</div>`,
		inner: `<div class="nameTop10"><div class="name textColor">{{name}}</div><div class="amount amountColor">{{amount}}</div></div>`
	}, {
		enabled: true,
		id: "hbits_top10H",
		type: "dynamic",
		key: "hbits",
		title: `Overall Top 10 Bits`,
		template: `<div id="section_hbits_top10H" class="creditSection">
	{{{contentTitle}}}
	{{{hbits_top10H}}}
	{{{contentDivider}}}
</div>`,
		wrapper: `<div class="hbitsTop10Wrapper">{{{group}}}</div>`,
		inner: `<div class="nameTop10"><div class="name textColor">{{name}}</div><div class="amount amountColor">{{amount}}</div></div>`
	}, {
		enabled: true,
		id: "hdonos_top10H",
		type: "dynamic",
		key: "hdonos",
		title: `Overall Top 10 Donations`,
		template: `<div id="section_hdonos_top10H" class="creditSection">
	{{{contentTitle}}}
	{{{hdonos_top10H}}}
	{{{contentDivider}}}
</div>`,
		wrapper: `<div class="hdonosTop10Wrapper">{{{group}}}</div>`,
		inner: `<div class="nameTop10"><div class="name textColor">{{name}}</div><div class="amount amountColor">{{amount}}</div></div>`
	}, {
		enabled: true,
		id: "hsubs_top10H",
		type: "dynamic",
		key: "hsubs",
		title: `Overall Top 10 Subscribers`,
		template: `<div id="section_hsubs_top10H" class="creditSection">
	{{{contentTitle}}}
	{{{hsubs_top10H}}}
	{{{contentDivider}}}
</div>`,
		wrapper: `<div class="hsubsTop10Wrapper">{{{group}}}</div>`,
		inner: `<div class="nameTop10"><div class="name textColor">{{name}}</div><div class="amount amountColor">{{amount}}</div></div>`
	}, {
		enabled: true,
		id: "hhosts_top10H",
		type: "dynamic",
		key: "hhosts",
		title: `Overall Top 10 Hosts`,
		template: `<div id="section_hhosts_top10H" class="creditSection">
	{{{contentTitle}}}
	{{{hhosts_top10H}}}
	{{{contentDivider}}}
</div>`,
		wrapper: `<div class="hhostsTop10Wrapper">{{{group}}}</div>`,
		inner: `<div class="nameTop10"><div class="name textColor">{{name}}</div><div class="amount amountColor">{{amount}}</div></div>`
	}, {
		enabled: true,
		id: "hraids_top10H",
		type: "dynamic",
		key: "hraids",
		title: `Overall Top 10 Raiders`,
		template: `<div id="section_hraids_top10H" class="creditSection">
	{{{contentTitle}}}
	{{{hraids_top10H}}}
	{{{contentDivider}}}
</div>`,
		wrapper: `<div class="hraidsTop10Wrapper">{{{group}}}</div>`,
		inner: `<div class="nameTop10"><div class="name textColor">{{name}}</div><div class="amount amountColor">{{amount}}</div></div>`
	}, {
		enabled: true,
		id: "hchannelpoints_top10H",
		type: "dynamic",
		key: "hchannelpoints",
		title: `Overall Top 10 Channel Points`,
		template: `<div id="section_hchannelpoints_top10H" class="creditSection">
	{{{contentTitle}}}
	{{{hchannelpoints_top10H}}}
	{{{contentDivider}}}
</div>`,
		wrapper: `<div class="hchannelpointsTop10Wrapper">{{{group}}}</div>`,
		inner: `<div class="nameTop10"><div class="name textColor">{{name}}</div><div class="amount amountColor">{{amount}}</div></div>`
	}, {
		enabled: true,
		id: "hgiftsubs_top5H",
		type: "dynamic",
		key: "hgiftsubs",
		title: `Overall Top 5 Sub Gifters`,
		template: `<div id="section_hgiftsubs_top5H" class="creditSection">
	{{{contentTitle}}}
	{{{hgiftsubs_top5H}}}
	{{{contentDivider}}}
</div>`,
		wrapper: `<div class="hgiftsubsTop5Wrapper">{{{group}}}</div>`,
		inner: `<div class="nameTop5"><div class="name textColor">{{name}}</div><div class="amount amountColor">{{amount}}</div></div>`
	}, {
		enabled: true,
		id: "hbits_top5H",
		type: "dynamic",
		key: "hbits",
		title: `Overall Top 5 Bits`,
		template: `<div id="section_hbits_top5H" class="creditSection">
	{{{contentTitle}}}
	{{{hbits_top5H}}}
	{{{contentDivider}}}
</div>`,
		wrapper: `<div class="hbitsTop5Wrapper">{{{group}}}</div>`,
		inner: `<div class="nameTop5"><div class="name textColor">{{name}}</div><div class="amount amountColor">{{amount}}</div></div>`
	}, {
		enabled: true,
		id: "hdonos_top5H",
		type: "dynamic",
		key: "hdonos",
		title: `Overall Top 5 Donations`,
		template: `<div id="section_hdonos_top5H" class="creditSection">
	{{{contentTitle}}}
	{{{hdonos_top5H}}}
	{{{contentDivider}}}
</div>`,
		wrapper: `<div class="hdonosTop5Wrapper">{{{group}}}</div>`,
		inner: `<div class="nameTop5"><div class="name textColor">{{name}}</div><div class="amount amountColor">{{amount}}</div></div>`
	}, {
		enabled: true,
		id: "hsubs_top5H",
		type: "dynamic",
		key: "hsubs",
		title: `overall Top 5 Subscribers`,
		template: `<div id="section_hsubs_top5H" class="creditSection">
	{{{contentTitle}}}
	{{{hsubs_top5H}}}
	{{{contentDivider}}}
</div>`,
		wrapper: `<div class="hsubsTop5Wrapper">{{{group}}}</div>`,
		inner: `<div class="nameTop5"><div class="name textColor">{{name}}</div><div class="amount amountColor">{{amount}}</div></div>`
	}, {
		enabled: true,
		id: "hhosts_top5H",
		type: "dynamic",
		key: "hhosts",
		title: `Overall Top 5 Hosts`,
		template: `<div id="section_hhosts_top5H" class="creditSection">
	{{{contentTitle}}}
	{{{hhosts_top5H}}}
	{{{contentDivider}}}
</div>`,
		wrapper: `<div class="hhostsTop5Wrapper">{{{group}}}</div>`,
		inner: `<div class="nameTop5"><div class="name textColor">{{name}}</div><div class="amount amountColor">{{amount}}</div></div>`
	}, {
		enabled: true,
		id: "hraids_top5H",
		type: "dynamic",
		key: "hraids",
		title: `Overall Top 5 Raiders`,
		template: `<div id="section_hraids_top5H" class="creditSection">
	{{{contentTitle}}}
	{{{hraids_top5H}}}
	{{{contentDivider}}}
</div>`,
		wrapper: `<div class="hraidsTop5Wrapper">{{{group}}}</div>`,
		inner: `<div class="nameTop5"><div class="name textColor">{{name}}</div><div class="amount amountColor">{{amount}}</div></div>`
	},{
		enabled: true,
		id: "streamlootspurchase_name",
		type: "dynamic",
		key: "streamlootspurchase",
		title: `Thanks for Supporting With StreamLoots!`,
		template: `<div id="section_streamlootspurchase_name" class="creditSection">
	{{{contentTitle}}}
	{{{streamlootspurchase_name}}}
	{{{contentDivider}}}
</div>`,
		wrapper: `<div class="streamlootspurchaseWrapper">{{{group}}}</div>`,
		inner: `<div class="name textColor">{{name}}</div>`
	},{
		enabled: true,
		id: "streamlootspurchase_top5",
		type: "dynamic",
		key: "streamlootspurchase",
		title: `Top 5 StreamLoots Today`,
		template: `<div id="section_streamlootspurchase_top5" class="creditSection">
	{{{contentTitle}}}
	{{{streamlootspurchase_top5}}}
	{{{contentDivider}}}
</div>`,
		wrapper: `<div class="streamlootspurchaseTop5Wrapper">{{{group}}}</div>`,
		inner: `<div class="nameTop5"><div class="name textColor">{{name}}</div><div class="amount amountColor">{{amount}}</div></div>`
	},{
		enabled: true,
		id: "streamlootspurchase_name_amount",
		type: "dynamic",
		key: "streamlootspurchase",
		title: `StreamLoots and Who Bought Them`,
		template: `<div id="section_streamlootspurchase_name_amount" class="creditSection">
	{{{contentTitle}}}
	{{{streamlootspurchase_name_amount}}}
	{{{contentDivider}}}
</div>`,
		wrapper: `<div class="streamlootspurchaseAmountWrapper">{{{group}}}</div>`,
		inner: `<div class="nameAmount"><div class="name textColor">{{name}}</div><div class="amount amountColor">{{amount}}</div></div>`
	},{
		enabled: true,
		id: "streamlootspurchase_name_total",
		type: "dynamic",
		key: "streamlootspurchase",
		title: `Total StreamLoots Purchases By Viewers`,
		template: `<div id="section_streamlootspurchase_name_total" class="creditSection">
	{{{contentTitle}}}
	{{{streamlootspurchase_name_total}}}
	{{{contentDivider}}}
</div>`,
		wrapper: `<div class="streamlootspurchaseTotalWrapper">{{{group}}}</div>`,
		inner: `<div class="nameTotal"><div class="name textColor">{{name}}</div><div class="total totalColor">{{total}}</div></div>`
	},{
		enabled: true,
		id: "streamlootspurchase_name_amount_total",
		type: "dynamic",
		key: "streamlootspurchase",
		title: `StreamLoots Purchases: Today and Total By Viewers`,
		template: `<div id="section_streamlootspurchase_name_amount_total" class="creditSection">
	{{{contentTitle}}}
	{{{streamlootspurchase_name_amount_total}}}
	{{{contentDivider}}}
</div>`,
		wrapper: `<div class="streamlootspurchaseAmountTotalWrapper">{{{group}}}</div>`,
		inner: `<div class="nameAmountTotal"><div class="name textColor">{{name}}</div><div class="amount amountColor">{{amount}}</div><div class="total totalColor">{{total}}</div></div>`
	},{
		enabled: true,
		id: "streamlootspurchase_top10",
		type: "dynamic",
		key: "streamlootspurchase",
		title: `Top 10 StreamLoots Purchases Today`,
		template: `<div id="section_streamlootspurchase_top10" class="creditSection">
	{{{contentTitle}}}
	{{{streamlootspurchase_top10}}}
	{{{contentDivider}}}
</div>`,
		wrapper: `<div class="streamlootspurchaseTop10Wrapper">{{{group}}}</div>`,
		inner: `<div class="nameTop10"><div class="name textColor">{{name}}</div><div class="amount amountColor">{{amount}}</div></div>`
	},{
		enabled: true,
		id: "hstreamlootspurchase_top10H",
		type: "dynamic",
		key: "hstreamlootspurchase",
		title: `Overall Top 10 StreamLoots Purchases`,
		template: `<div id="section_hstreamlootspurchase_top10H" class="creditSection">
	{{{contentTitle}}}
	{{{hstreamlootspurchase_top10H}}}
	{{{contentDivider}}}
</div>`,
		wrapper: `<div class="hstreamlootspurchaseTop10Wrapper">{{{group}}}</div>`,
		inner: `<div class="nameTop10"><div class="name textColor">{{name}}</div><div class="amount amountColor">{{amount}}</div></div>`
	},{
		enabled: true,
		id: "hstreamlootspurchase_top5H",
		type: "dynamic",
		key: "hstreamlootspurchase",
		title: `Overall Top 5 StreamLoots Purchases`,
		template: `<div id="section_hstreamlootspurchase_top5H" class="creditSection">
	{{{contentTitle}}}
	{{{hstreamlootspurchase_top5H}}}
	{{{contentDivider}}}
</div>`,
		wrapper: `<div class="hstreamlootspurchaseTop5Wrapper">{{{group}}}</div>`,
		inner: `<div class="nameTop5"><div class="name textColor">{{name}}</div><div class="amount amountColor">{{amount}}</div></div>`
	}
];