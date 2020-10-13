exports.transitions = [
	{
		name: "LTR Color Swipe",
		id: "ltrcolorswipe",
		css: `.someCSS {
	color: red;
}`,
		js: `let x = "ltr";`,
		body: `<p>LTR Color Swipe</p>`,
		isdefault: true
	},{
		name: "RTL Color Swipe",
		id: "rtlcolorswipe",
		css: `.someCSS {
	color: green;
}`,
		js: `let x = "rtl";`,
		body: `<p>RTL Color Swipe</p>`,
		isdefault: true
	},{
		name: "Down Color Swipe",
		id: "downcolorswipe",
		css: `.someCSS {
	color: yellow;
}`,
		js: `let x = "down";`,
		body: `<p>Down Color Swipe</p>`,
		isdefault: true
	},{
		name: "Up Color Swipe",
		id: "upcolorswipe",
		css: `.someCSS {
	color: blue;
}`,
		js: `let x = "up";`,
		body: `<p>Up Color Swipe</p>`,
		isdefault: true
	}
];