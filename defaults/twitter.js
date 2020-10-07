exports.twitter = {
	api_key: "",
	api_secret: "",
	access_key: "",
	access_secret: "",
	bearer: "",
	hashtag: "#poundsign",
	duration: 5,
	enabled: false,
	ruleid: false,
	template: `
<div class="overlayTwitterWrapper">
	<div class="overlayTwitterBox">
		<div class="overlayTwitterIcon"></div>		
		<div class="overlayTwitterMessage">
			<span class="overlayTwitterName">{{{tweeter}}}</span> shared the stream on Twitter!
		</div>
	</div>
</div>`,
	css: `
.overlayTwitterWrapper {

}
.overlayTwitterBox {

}
.overlayTwitterIcon {
	
}
.overlayTwitterMessage {
	
}
.overlayTwitterName {
	
}`
};