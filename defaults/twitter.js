exports.twitter = {
	api_key: "",
	api_secret: "",
	access_key: "",
	access_secret: "",
	bearer: "",
	hashtag: "poundsign",
	duration: 5,
	entrance: 'none',
	visible: 'none',
	exit: 'none',
	enabled: false,
	ruleid: false,
	volume: .5,
	soundfile: "",
	screenpos: "tr",
	template: `
<div class="overlayTwitterWrapper">
	<div class="overlayTwitterBox">
		<div class="overlayTwitterIcon"><span class="iconify animate__animated animate__headShake animate__infinite" data-icon="mdi-twitter" data-inline="false"></span></div>		
		<div class="overlayTwitterMessage">
			<span class="overlayTwitterName">@{{{tweeter}}}</span><span class="overlayTwitterText">shared the stream on Twitter!</span>
		</div>
	</div>
</div>`,
	css: `
.overlayTwitterWrapper {
	display: block;
	font-family: Arial, Helvetica, sans-serif;
}
.overlayTwitterBox {
	display: block;
	border: 4px solid #276bd6;
	background-color: #276bd6;
	border-radius: 6px;
	width: 400px;
}
.overlayTwitterIcon {
	display: inline-block;
	vertical-align: top;
	width: 85px;
	height: 85px;
	background-color: #333;
	border-radius: 6px 0 0 6px;
	color: #ff9900;
}
.overlayTwitterIcon .iconify {
	width: 100%;
	height: 100%;
}
.overlayTwitterMessage {
	display: inline-block;
	vertical-align: top;
	width: 280px;
	height: 85px;
	padding-left: 20px;
	border-right: 3px solid #333;
	border-radius: 0 6px 6px 0;
}
.overlayTwitterName {
	display: block;
	font-size: 30px;
	margin-top: 10px;
	margin-bottom: 8px;
	color: #ff9900;
	font-weight: bold;
}
.overlayTwitterText {
	padding-left: 30px;
	color: #fff;
}`
};