exports.templatepage = {
	page: `
<html>
<head>
	{{{js_includes}}}
	<script>
		/*
		SCROLL_SPEED_TWEAK
			Adjust this value to impact scroll speed (1 = 1 second, 10 = 10 seconds, ...)
			default 0
			examples:
				-10 -> makes it 10 seconds shorter
				14 -> makes it 14 seconds longer
		*/
		let SCROLL_SPEED_TWEAK = {{{scroll_speed}}};

		/*
		REPLAY
			Loop the credits over and over for infinity
			default false
		*/
		let REPLAY = {{{looping}}};

		function credits() {
			$(".creditSection").each((i, s) => {
				if($(s).find("div.card").length) {
					if($(s).find("div.card").find("img").length) {
						$(s).find("div.card").find("img").each((i,el)=>{
							if($(el).width() < 5) {
								$(el).parent().parent().remove();
							}
						});
					}
				}
			});

			let creditsHeight = $("#credits").height();
			let wrapperHeight = $("#creditsWrapper").height();
			let creditsPlusWrapper = (REPLAY) ? creditsHeight + 1800:creditsHeight;
			let scrollDistance = creditsHeight;
			let rollupTime = Math.round(wrapperHeight + creditsHeight + creditsPlusWrapper + scrollDistance) * 2 + (SCROLL_SPEED_TWEAK * 1000);

			$("#credits").css("bottom", (creditsHeight) * -1).show().animate({ top: "-=" + scrollDistance + "px" }, rollupTime, "linear", () => {

				if (REPLAY) {
					$("#credits").removeAttr("style").hide();
					setTimeout(credits, 1000);
				}
			});
		}

		$(document).ready(() => {
			credits();
		});
	</script>
	{{{css_includes}}}
	{{{default_CSS}}}
	{{{custom_CSS}}}
</head>
<body>
	<div class="screen"></div>
	<div id="creditsWrapper" class="creditsWrapper">
		<div id="credits" class="mainWrapper">
			{{{sections}}}
		</div>
	</div>
</body>
</html>`
};