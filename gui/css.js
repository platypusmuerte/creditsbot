exports.css = `
body {
	background-color: #333;
	color: #fff;
}
.nav-link {
	color: #fff
}
.activeMenu, h1, h2, h3, h4, .versionText, .formLabel, .dragSectionTitle, .modal-title, .themeText, .nav-tabs .nav-link, .pageTabs .nav-link.active {
	color: #ff9900;
}
.titleText {
	height: 100%;
	font-size: 2vw;
}
.titleVersion {
	
}
.queryRow {
	margin-bottom: 30px;
}
.versionText, .themeText {
	font-size: 1vw;
}
.themeText {
	display: inline-block;
	margin: auto 0;
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
.pageTabs .nav-link {
	font-size: 1vw;
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
	width: 20px;
	vertical-align: top;
	padding-top: 10px;
	color: #297bd6;
}
.dragSectionOnOff {
	display: inline-block;
	width: 30px;
	vertical-align: top;
	padding-top: 10px;
}
.dragSectionDesc {
	display: block;
	font-weight: 425;
	font-size: 1rem;
	color: #6c757d;
}
.dragSectionBody {
	display: inline-block;
	max-width: 400px;
}
.sectionEnabledLabel, .sectionToggleIsOn, .allSectionToggleIsOn {
	color: #0ddb44;
}
.sectionDisabledLabel, .sectionToggleIsOff, .allSectionToggleIsOff {
	color: #db0d0d;
}
.sectionToggleIsOn, .sectionToggleIsOff, .allSectionToggleIsOn, .allSectionToggleIsOff {
	cursor: pointer;
}
.allSectionToggleIsOn, .allSectionToggleIsOff {
	display: inline-block;
	vertical-align: middle;
	font-size: 26px;
}
.sectionDBLabel, .sectionKey {
	text-transform: capitalize;
}
.dragSectionEditIcon {
	display: inline-block;
	float: right;
	padding-top: 10px;
	padding-right: 8px;
}
.sectionDragEdit {
	font-size: .8em;
	visibility: hidden;
}
.sectionDraggable {
	transition: background-color .3s linear;
	padding: 4px;
	cursor: default;
}
.dragSectionTitle {
	display: block;
	font-weight: 500;
	line-height: 1.2;
	font-size: 1.2rem;
}
.sectionDraggable:hover .sectionDragEdit {
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
.disabledOpt {
	font-weight: bold;
}
.guiSliderWrapper {
	padding-top: 6px;
}
.guiTabBody {
	padding-top: 20px;
}
.twitterTestBtnWrapper button {
	margin-top: 8px;
	margin-left: 40px;
}
.defTransitionOpt {
	font-style: italic;
}







/*** RANGE CSS FROM http://danielstern.ca/range.css/#/ ***/

input[type=range].guiSlider {
	width: 100%;
	margin: 8.95px 0;
	background-color: transparent;
	-webkit-appearance: none;
  }
  input[type=range].guiSlider:focus {
	outline: none;
  }
  input[type=range].guiSlider::-webkit-slider-runnable-track {
	background: #ff9900;
	border: 0.2px solid #010101;
	border-radius: 1.3px;
	width: 100%;
	height: 5.1px;
	cursor: pointer;
  }
  input[type=range].guiSlider::-webkit-slider-thumb {
	margin-top: -9.15px;
	width: 17px;
	height: 23px;
	background: #ff9900;
	border: 1px solid #ffffff;
	border-radius: 50px;
	cursor: pointer;
	-webkit-appearance: none;
  }
  input[type=range].guiSlider:focus::-webkit-slider-runnable-track {
	background: #ff9b05;
  }
  input[type=range].guiSlider::-moz-range-track {
	background: #ff9900;
	border: 0.2px solid #010101;
	border-radius: 1.3px;
	width: 100%;
	height: 5.1px;
	cursor: pointer;
  }
  input[type=range].guiSlider::-moz-range-thumb {
	width: 17px;
	height: 23px;
	background: #ff9900;
	border: 1px solid #ffffff;
	border-radius: 50px;
	cursor: pointer;
  }
  input[type=range].guiSlider::-ms-track {
	background: transparent;
	border-color: transparent;
	border-width: 9.95px 0;
	color: transparent;
	width: 100%;
	height: 5.1px;
	cursor: pointer;
  }
  input[type=range].guiSlider::-ms-fill-lower {
	background: #fa9600;
	border: 0.2px solid #010101;
	border-radius: 2.6px;
  }
  input[type=range].guiSlider::-ms-fill-upper {
	background: #ff9900;
	border: 0.2px solid #010101;
	border-radius: 2.6px;
  }
  input[type=range].guiSlider::-ms-thumb {
	width: 17px;
	height: 23px;
	background: #ff9900;
	border: 1px solid #ffffff;
	border-radius: 50px;
	cursor: pointer;
	margin-top: 0px;
	/*Needed to keep the Edge thumb centred*/
  }
  input[type=range].guiSlider:focus::-ms-fill-lower {
	background: #ff9900;
  }
  input[type=range].guiSlider:focus::-ms-fill-upper {
	background: #ff9b05;
  }
  /*TODO: Use one of the selectors from https://stackoverflow.com/a/20541859/7077589 and figure out
  how to remove the virtical space around the range input in IE*/
  @supports (-ms-ime-align:auto) {
	/* Pre-Chromium Edge only styles, selector taken from hhttps://stackoverflow.com/a/32202953/7077589 */
	input[type=range].guiSlider {
	  margin: 0;
	  /*Edge starts the margin from the thumb, not the track as other browsers do*/
	}
  }
  
  
`;