exports.defaultcss = {
	css: `body, html {
	padding: 0;
	margin: 0;
}
body {
	font-family: 'Kumbh Sans', sans-serif;
}
.screen {
	display: block;
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0px;
	left: 0px;
	border: 1px solid;
	opacity: .9;
}
.screen::before {
	content:'';
	display: block;
	background-color: #333;
	width: 100%;
	height: 100%;
}
.creditsWrapper {
	display: block;
	position: relative;
	width: 100%;
	height: 100%;
	overflow: hidden;
}
.mainWrapper {
	display: block;
	position: absolute;
	bottom: 0px;
	width: 100%;
}
.titleWrapper {
	display: block;
	width: 100%;
	margin: 50px 0 20px 0;
}
.title {
	display: block;
	width: 100%;
	text-align: center;
	color: #ff9900;
	font-size: 6vw;
}
.subtitleWrapper {
	display: block;
	width: 100%;
	margin: 0 0 100px 0;
}
.subtitle {
	display: block;
	width: 100%;
	text-align: center;
	color: #297bd6;
	font-size: 4vw;
}
.sectionTitleWrapper {
	display: block;
	width: 100%;
	margin: 60px 0 20px 0;
	text-align: center;
}
.sectionTitle {
	display: block;
	width: 80%;
	margin: 0 auto;
	padding-bottom: 10px;
	text-align: center;
	color: #297bd6;
	font-size: 3vw;
	font-style: italic;
	border-bottom: 1px solid #ff9900;
	text-transform: uppercase;
}
.bansWrapper, .bitsWrapper, .channelpointsWrapper, .chattersWrapper, .donosWrapper, .followsWrapper, .giftsubsWrapper, 
.hostsWrapper, .modsWrapper, .patreonsWrapper, .raidsWrapper, .subsWrapper, .hbitsWrapper, .hchannelpointsWrapper, .hgiftsubsWrapper, 
.hhostsWrapper, .hraidsWrapper, .hsubsWrapper, .vipsWrapper, .streamLootsWrapper, .hstreamlootsWrapper {
	display: block;
	width: 80%;
	margin: 0 auto;
	text-align: center;
}
.bansWrapper .name, .bitsWrapper .name, .channelpointsWrapper .name, .chattersWrapper .name, .donosWrapper .name, .followsWrapper .name, 
.giftsubsWrapper .name, .hostsWrapper .name, .modsWrapper .name, .patreonsWrapper .name, .raidsWrapper .name, .subsWrapper .name, .hbitsWrapper .name, 
.hchannelpointsWrapper .name, .hgiftsubsWrapper .name, .hhostsWrapper .name, .hraidsWrapper .name, .hsubsWrapper .name, .vipsWrapper .name,
.streamLootsWrapper .name, .hstreamlootsWrapper .name {
	display: inline-block;
	padding: 10px;
	color: #fff;
	font-size: 2vw;
}
.bitsAmountWrapper, .channelpointsAmountWrapper, .chattersAmountWrapper, .giftsubsAmountWrapper, .donosAmountWrapper, .streamlootsAmountWrapper {
	display: block;
	width: 80%;
	margin: 0 auto;
	text-align: center;
}
.nameAmount {
	display: inline-block;
	padding: 10px;
}
.nameAmount .name {
	display: inline-block;
	padding: 10px 8px 10px 10px;
	color: #fff;
	font-size: 2vw;
}
.nameAmount .amount {
	display: inline-block;
	position: relative;
	padding: 10px 10px 10px 8px;
	color: #fff;
	font-size: 2vw;
}
.nameAmount .amount::before {
	content: '';
	display: block;
	position: absolute;
	width: 0;
	height: 0;
	left: -5px;
	top: 25%;
	border-top: 10px solid transparent;
	border-bottom: 10px solid transparent;
	border-left: 10px solid #ff9900;
}
.bitsTotalWrapper, .channelpointsTotalWrapper, .giftsubsTotalWrapper, .hostsTotalWrapper, .raidsTotalWrapper, .subsTotalWrapper, .donosTotalWrapper, .streamlootsTotalWrapper {
	display: block;
	width: 80%;
	margin: 0 auto;
	text-align: center;
}
.nameTotal {
	display: inline-block;
	padding: 10px;
}
.nameTotal .name {
	display: inline-block;
	padding: 10px 8px 10px 10px;
	color: #fff;
	font-size: 2vw;
}
.nameTotal .total {
	display: inline-block;
	position: relative;
	padding: 10px 10px 10px 8px;
	color: #fff;
	font-size: 2vw;
}
.nameTotal .total::before {
	content: '';
	display: block;
	position: absolute;
	width: 0;
	height: 0;
	left: -5px;
	top: 25%;
	border-top: 10px solid transparent;
	border-bottom: 10px solid transparent;
	border-left: 10px solid #ff9900;
}
.bitsAmountTotalWrapper, .channelpointsAmountTotalWrapper, .giftsubsAmountTotalWrapper, .donosAmountTotalWrapper, .streamlootsAmountTotalWrapper {
	display: block;
	width: 80%;
	margin: 0 auto;
	text-align: center;
}
.nameAmountTotal {
	display: inline-block;
	padding: 10px;
}
.nameAmountTotal .name {
	display: inline-block;
	padding: 10px 8px 10px 10px;
	color: #fff;
	font-size: 2vw;
}
.nameAmountTotal .amount {
	display: inline-block;
	position: relative;
	padding: 10px 8px 10px 10px;
	color: #fff;
	font-size: 2vw;
}
.nameAmountTotal .total {
	display: inline-block;
	position: relative;
	padding: 10px 8px 10px 10px;
	color: #fff;
	font-size: 2vw;
}
.nameAmountTotal .amount::before {
	content: '';
	display: block;
	position: absolute;
	width: 0;
	height: 0;
	left: -5px;
	top: 25%;
	border-top: 10px solid transparent;
	border-bottom: 10px solid transparent;
	border-left: 10px solid #ff9900;
}
.nameAmountTotal .total::before {
	content: '';
	display: block;
	position: absolute;
	width: 0;
	height: 0;
	left: -5px;
	top: 25%;
	border-top: 10px solid transparent;
	border-bottom: 10px solid transparent;
	border-left: 10px solid #fff;
}
.bitsTop10Wrapper, .channelpointsTop10Wrapper, .chattersTop10Wrapper, .giftsubsTop10Wrapper, .bitsTop5Wrapper, 
.channelpointsTop5Wrapper, .chattersTop5Wrapper, .giftsubsTop5Wrapper, .hbitsTop10Wrapper, .hchannelpointsTop10Wrapper, .hgiftsubsTop10Wrapper,
.hhostsTop10Wrapper, .hraidsTop10Wrapper, .hsubsTop10Wrapper, .hbitsTop5Wrapper, .hchannelpointsTop5Wrapper, .hgiftsubsTop5Wrapper, .hhostsTop5Wrapper,
.hraidsTop5Wrapper, .hsubsTop5Wrapper,.donosTop10Wrapper, .donosTop5Wrapper, .hdonosTop10Wrapper, .hdonosTop5Wrapper, .streamlootsTop5Wrapper, .streamlootsTop10Wrapper,
.hstreamlootsTop5Wrapper, .hstreamlootsTop10Wrapper, .streamlootsTop5CardsWrapper, .hstreamlootsTop5CardsWrapper, .streamlootsTop10CardsWrapper, .hstreamlootsTop10CardsWrapper {
	display: block;
	width: 80%;
	margin: 0 auto;
	text-align: center;
}
.nameTop10, .nameTop5 {
	display: inline-block;
	padding: 10px;
}
.nameTop10 .name,.nameTop5 .name {
	display: inline-block;
	padding: 10px 8px 10px 10px;
	color: #fff;
	font-size: 2vw;
}
.nameTop10 .amount, .nameTop5 .amount {
	display: inline-block;
	position: relative;
	padding: 10px 10px 10px 8px;
	color: #fff;
	font-size: 2vw;
}
.nameTop10 .amount::before, .nameTop5 .amount::before {
	content: '';
	display: block;
	position: absolute;
	width: 0;
	height: 0;
	left: -5px;
	top: 25%;
	border-top: 10px solid transparent;
	border-bottom: 10px solid transparent;
	border-left: 10px solid #ff9900;
}
.nameTop5Cards {
	display: inline-block;
}
.nameTop5Cards .name {
	display: none;
}
.nameTop5Cards .card {
	display: inline-block;
	padding: 10px 8px 10px 10px;
	max-width: 180px;
	position: relative;
}
.nameTop5Cards .card img {
	width: 100%;
}
.nameTop5Cards .card .amount {
	display: inline-block;
	position: absolute;
	font-weight: bold;
	line-height: 35px;
	bottom: 0px;
	left: 0px;
	width: 30px;
	height: 30px;
	background-color: #ff9900;
	color: #297bd6;
	font-size: 1vw;
	border-radius: 50%;
	text-align: center;
	border: 1px solid #297bd6;
}
.footerWrapper {
	display: block;
	width: 80%;
	height: 1px;
	margin: 0 auto;
	text-align: center;
	position: relative;
}
.footer {
	display: block;
	position: absolute;
	width: 100%;
	height: 1000px;
}`
};