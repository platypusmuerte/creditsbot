exports.js = `
function init() {
	$(".tabbable").each((i, el) => {
		$(el).on("keydown",(e)=>{
			var TABKEY = 9;
			if(e.keyCode == TABKEY) {
				let v = $(el).val() + "    ";
				$(el).val(v);
				console.log($(el).val());
				if(e.preventDefault) {
					e.preventDefault();
				}
				return false;
			}
		});
	});
}




$(document).ready(() => {
	init();
});
`;