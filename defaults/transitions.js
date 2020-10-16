exports.transitions = [
	{
		name: "Color Fade",
		id: "colorfade",
		css: `body, html {
	padding: 0px;
	margin: 0px;
}
.fadeWrapper {
	display: block;
	width: 100%;
	height: 100vh;
	opacity: 1;
	background-color: #ff9900;
}
.fadeIn {
	animation: fadeIn 1.15s linear;
}
.fadeOut {
	animation: fadeOut 1.15s linear;
}
@keyframes fadeIn {
	0% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
}
@keyframes fadeOut {
	0% {
		opacity: 1;
	}
	100% {
		opacity: 0;
	}
}`,
		js: `$(document).ready(() => {
	setTimeout(()=>{
		$("#fadeWrapper").addClass("fadeOut");
		setTimeout(()=>{
			$("body").empty();
		},1000);
	},1200);
});`,
		body: `<div id="fadeWrapper" class="fadeWrapper fadeIn"></div>`,
		isdefault: true
	},{
		name: "Curtains",
		id: "curtains",
		css: `body, html {
	padding: 0px;
	margin: 0px;
}
.curtainWrapper {
	display: block;
	position: relative;
	width: 100%;
	height: 100vh;
	text-align: left;
	overflow: hidden;
}
.curtains {
	display: inline-block;
	position: relative;
	transition: all 1s ease-out;
	float: left;
	width: 50%;
	height: 100vh;
	background-color: #ff9900;
}
.curtainBorder {
	display: block;
	position: absolute;
	width: 8px;
	height: 100vh;
	background-color: #297bd6;
}
.curtainLeft {
	transform: translateX(0);
}
.curtainRight {
	transform: translateX(0);
}
.curtainLeft .curtainBorder {
	right: 0px;
}
.curtainRight .curtainBorder {
	left: 0px;
}
.goLeft {
	transform: translateX(-100%);
}
.goRight {
	transform: translateX(100%);
}
.startLeft {
	transform: translateX(-100%);
}
.startRight {
	transform: translateX(100%);
}`,
		js: `$(document).ready(() => {
	setTimeout(()=>{
		$(".curtainLeft").removeClass("startLeft");
		$(".curtainRight").removeClass("startRight");
		
		setTimeout(()=>{
			$(".curtainLeft").addClass("goLeft");
			$(".curtainRight").addClass("goRight");

			setTimeout(()=>{
				$("#curtainWrapper").remove();
				$("body").empty();
			},1150);
		},1500);
	},500);		
});`,
		body: `<div id="curtainWrapper" class="curtainWrapper">
	<div class="curtains curtainLeft startLeft">
		<div class="curtainBorder"></div>
	</div>
	<div class="curtains curtainRight startRight">
		<div class="curtainBorder"></div>
	</div>
</div>`,
		isdefault: true
	},{
		name: "Bars",
		id: "bars",
		css: `body, html {
	padding: 0px;
	margin: 0px;
}
.barsWrapper {
	width: 100%;
	height: 100vh;
}
.bar {
	display: block;	
}
.barLeft {
	transform: translateX(-100%);
}
.barRight {
	transform: translateX(100%);
}
.moveBarRight {
	transform: translateX(100%);
}
.moveBarLeft {
	transform: translateX(-100%);
}
.moveFromLeftToMiddle {
	transform: translateX(0);
}`,
		js: `$(document).ready(() => {
	const CSS_COLOR_NAMES = [
		"AliceBlue","AntiqueWhite","Aqua","Aquamarine","Azure","Beige","Bisque","Black","BlanchedAlmond","Blue","BlueViolet","Brown","BurlyWood","CadetBlue",
		"Chartreuse","Chocolate","Coral","CornflowerBlue","Cornsilk","Crimson","Cyan","DarkBlue","DarkCyan","DarkGoldenRod","DarkGray","DarkGrey","DarkGreen",
		"DarkKhaki","DarkMagenta","DarkOliveGreen","DarkOrange","DarkOrchid","DarkRed","DarkSalmon","DarkSeaGreen","DarkSlateBlue","DarkSlateGray","DarkSlateGrey",
		"DarkTurquoise","DarkViolet","DeepPink","DeepSkyBlue","DimGray","DimGrey","DodgerBlue","FireBrick","FloralWhite","ForestGreen","Fuchsia","Gainsboro","GhostWhite",
		"Gold","GoldenRod","Gray","Grey","Green","GreenYellow","HoneyDew","HotPink","IndianRed","Indigo","Ivory","Khaki","Lavender","LavenderBlush","LawnGreen","LemonChiffon",
		"LightBlue","LightCoral","LightCyan","LightGoldenRodYellow","LightGray","LightGrey","LightGreen","LightPink","LightSalmon","LightSeaGreen","LightSkyBlue","LightSlateGray",
		"LightSlateGrey","LightSteelBlue","LightYellow","Lime","LimeGreen","Linen","Magenta","Maroon","MediumAquaMarine","MediumBlue","MediumOrchid","MediumPurple",
		"MediumSeaGreen","MediumSlateBlue","MediumSpringGreen","MediumTurquoise","MediumVioletRed","MidnightBlue","MintCream","MistyRose","Moccasin","NavajoWhite","Navy",
		"OldLace","Olive","OliveDrab","Orange","OrangeRed","Orchid","PaleGoldenRod","PaleGreen","PaleTurquoise","PaleVioletRed","PapayaWhip","PeachPuff","Peru","Pink","Plum",
		"PowderBlue","Purple","RebeccaPurple","Red","RosyBrown","RoyalBlue","SaddleBrown","Salmon","SandyBrown","SeaGreen","SeaShell","Sienna","Silver","SkyBlue","SlateBlue",
		"SlateGray","SlateGrey","Snow","SpringGreen","SteelBlue","Tan","Teal","Thistle","Tomato","Turquoise","Violet","Wheat","White","WhiteSmoke","Yellow","YellowGreen"];
	
	let bars = CSS_COLOR_NAMES.length;
	let totalHeight = $("#barsWrapper").height();
	let barHeight = totalHeight / bars;
	
	for(let b = 0; b < bars; ++b) {
		let css = {
			backgroundColor: CSS_COLOR_NAMES[b],
			height: barHeight + "px"
		};
		
		let barClass = (b % 2) ? "barLeft":"barRight";
		
		$("#barsWrapper").append(	
			$("<div>",{"class":"bar " + barClass}).css(css)
		);
	}
	
	setTimeout(()=>{
		move();
		
		setTimeout(()=>{
			move2();
			
			setTimeout(()=>{
				$("body").empty();
			},2000);
			
		}, 2000);		
	}, 500);		
});
		
function move() {
	let barsEls = $("#barsWrapper").find(".bar");
	
	for(var i = barsEls.length-1;i>=0;i--) {
		let thisEl = barsEls.splice(Math.floor(Math.random()*barsEls.length), 1);
		let wait = (Math.floor(Math.random() * 5) + 1) * 100;
		let moveTime = (Math.floor(Math.random() * 2) + 1) * .5;
		
		setTimeout(()=>{
			if($(thisEl).hasClass("barLeft")) {
				$(thisEl).css("transition","all " + moveTime + "s linear").addClass("moveFromLeftToMiddle");
			} else {
				$(thisEl).css("transition","all " + moveTime + "s linear").addClass("moveFromLeftToMiddle");
			}			
		},wait);
		
	}
}

function move2() {
	let barsEls = $("#barsWrapper").find(".bar");
	
	for(var i = barsEls.length-1;i>=0;i--) {
		let thisEl = barsEls.splice(Math.floor(Math.random()*barsEls.length), 1);
		let wait = (Math.floor(Math.random() * 5) + 1) * 100;
		let moveTime = (Math.floor(Math.random() * 2) + 1) * .5;
		
		setTimeout(()=>{
			if($(thisEl).hasClass("barLeft")) {
				$(thisEl).removeClass("moveFromLeftToMiddle").addClass("moveBarRight");
			} else {
				$(thisEl).removeClass("moveFromLeftToMiddle").addClass("moveBarLeft");
			}
			
		},wait);		
	}
}`,
		body: `<div id="barsWrapper" class="barsWrapper"></div>`,
		isdefault: true
	}
];