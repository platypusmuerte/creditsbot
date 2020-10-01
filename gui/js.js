/**
 * Any JS for the GUI pages
 * 		- makes textareas tabbable
 */

exports.js = `
function init() {
	$(".tabbable").each((i, el) => {
		$(el).on("keydown",(e)=>{
			let TABKEY = 9;

			if(e.keyCode == TABKEY) {
				let position = cursorPosition = $(el).prop("selectionStart");

				if(e.preventDefault) {
					e.preventDefault();
				}

				let sArr = $(el).val().split('');
				sArr.splice(position, 0, "    "); 
				let newString = sArr.join('');
				
				$(el).val(newString);
				$(el).selectRange(position + 4);
				
				return false;
			}
		});
	});
}

$.fn.selectRange = function(start, end) {
    if(end === undefined) {
        end = start;
    }
    return this.each(function() {
        if('selectionStart' in this) {
            this.selectionStart = start;
            this.selectionEnd = end;
        } else if(this.setSelectionRange) {
            this.setSelectionRange(start, end);
        } else if(this.createTextRange) {
            var range = this.createTextRange();
            range.collapse(true);
            range.moveEnd('character', end);
            range.moveStart('character', start);
            range.select();
        }
    });
};


$(document).ready(() => {
	init();
});
`;