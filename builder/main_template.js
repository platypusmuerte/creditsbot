exports.mainTemplateFile = `
<html>

<head>
	<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
	<script>
		/*
		SCROLL_SPEED_TWEAK
			Adjust this value to impact scroll speed (1 = 1 second, 10 = 10 seconds, ...)
			default 0
			examples:
				-10 -> makes it 10 seconds shorter
				14 -> makes it 14 seconds longer
		*/
		let SCROLL_SPEED_TWEAK = 0;

		/*
		REPLAY
			Loop the credits over and over for infinity
			default false
		*/
		let REPLAY = false;

		function credits() {
			$(".creditSection").each((i, s) => {
				if ($(s).find("div.name").length < 1) {
					$(s).remove();
				}

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
			let creditsPlusWrapper = creditsHeight + 100;
			let scrollDistance = creditsPlusWrapper + wrapperHeight;
			let rollupTime = Math.round(wrapperHeight + creditsHeight + creditsPlusWrapper + scrollDistance) * 2 + (SCROLL_SPEED_TWEAK * 1000);

			$("#credits").css("bottom", (creditsHeight+40) * -1).show().animate({ top: "-=" + scrollDistance + "px" }, rollupTime, "linear", () => {

				if (REPLAY) {
					$("#credits").removeAttr("style").hide();
					setTimeout(credits, 3000);
				}
			});
		}

		$(document).ready(() => {
			credits();
		});
	</script>
	<link href="https://fonts.googleapis.com/css2?family=Kumbh+Sans&display=swap" rel="stylesheet">
	{{{css}}}
	{{{usercss}}}
</head>

<body>
	<div class="screen"></div>
	<div id="creditsWrapper" class="creditsWrapper">
		<div id="credits" class="mainWrapper">

			<div class="titleWrapper">
				<div class="title">Thanks for watching!</div>
			</div>
			<div class="subtitleWrapper">
				<div class="subtitle">See ya next time!</div>
			</div>

			{{{body}}}

		</div>
	</div>
</body>

</html>
`;

