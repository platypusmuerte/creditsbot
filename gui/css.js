exports.css = `
body {
	background-color: #333;
	color: #fff;
}
.nav-link {
	color: #fff
}
.activeMenu, h1, h2, h3, h4, .versionText, .formLabel, .dragSectionTitle, .modal-title {
	color: #ff9900;
}
.titleText {
	font-size: 2vw;
}
.titleVersion {
	
}
.queryRow {
	margin-bottom: 30px;
}
.versionText {
	font-size: 1vw;
}
.topSectionContainer {
	border-bottom: 2px solid #ff9900;
}
.nav-link {
	font-size: 1.5vw;
}
.subMenu .nav-link {
	font-size: 1vw;
	white-space: nowrap;
}
.menuContainer {
	
}
.homeBanner, .alertBanner {
	margin: 10px;
}
.jumbotron, .modalBody {
	background-color: #297bd6;
	border: 1px solid #ff9900;
}
.colorPickerLabel {
	display: block;
}
.colorPickerInput {
	width: 100px;
}
.colorValueLabel {
	padding-top: 3px;
}
.numberInput {
	width: 100px;
}
.textInput {
	width: 250px;
}
.formSuccess {
	margin-left: 20px;
}
.templateDD option {
	text-transform: capitalize;
}
.dragSectionIcon {
	display: inline-block;
	width: 30px;
	vertical-align: top;
	padding-top: 10px;
	color: #ff9900;
}
.dragSectionBody {
	display: inline-block;
}
.sectionEnabledLabel, .sectionToggleIsOn {
	color: #0ddb44;
}
.sectionDisabledLabel, .sectionToggleIsOff {
	color: #db0d0d;
}
.sectionToggleIsOn, .sectionToggleIsOff {
	cursor: pointer;
}
.sectionDBLabel, .sectionKey {
	margin-left: 30px;
	text-transform: capitalize;
}
.sectionDragEdit {
	font-size: .8em;
	margin-left: 30px;
	visibility: hidden;
}
.sectionDraggable {
	transition: background-color .3s linear;
}
.sectionToggle {
	visibility: hidden;
}
.sectionDraggable:hover .sectionDragEdit, .sectionDraggable:hover .sectionToggle {
	visibility: visible;
}
.modalDialogLg {
	max-width: 800px;
}
.CodeMirror {
	border-radius: 5px;
}
.cmEditorXSM .CodeMirror {
	height: 100px;
}
.cmEditorVSM .CodeMirror {
	height: 200px;
}
.cmEditorSM .CodeMirror {
	height: 300px;
}
.cmEditorMD .CodeMirror {
	height: 450px;
}
.cmEditorLG .CodeMirror {
	height: 600px;
}
.cmEditorVLG .CodeMirror {
	height: 800px;
}

`;