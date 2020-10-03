/**
 * Any JS for the GUI pages
 * 		- makes textareas tabbable
 */

exports.js = `
function initCodeMirror(params) {
	let refresh = (params.refresh);

	let thisCM = CodeMirror.fromTextArea(params.textarea,{
		theme: "monokai",
		mode: params.mode,
		lineNumbers: true,
		extraKeys: {"Ctrl-Space": "autocomplete"},
		value: $(params.textarea).val(),
		indentWithTabs: true,
		smartIndent: true,
		indentUnit: 4,
		matchBrackets: true,
		autoRefresh: refresh
	});

	thisCM.on("change",()=>{
		thisCM.save();
	});

	return thisCM;
}

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