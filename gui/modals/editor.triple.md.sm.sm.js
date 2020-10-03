exports.modal_editor_triple_md_sm_sm = (params)=>{
	return `
	<!-- Modal -->
	<div class="modal fade" id="modal_editor_triple_md_sm_sm" tabindex="-1" aria-labelledby="modal_editor_triple_md_sm_sm_ModalLabel" aria-hidden="true">
		<div class="modal-dialog modalDialogLg">
			<div class="modal-content modalBody">
				<div class="modal-header">
					<h5 class="modal-title" id="modal_editor_triple_md_sm_sm_ModalLabel">Default Content</h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">	
					<div class="form-group cmEditorMD">
						<label class="formLabel" for="sectionTitleText">Section Title Text</label>
						<input type="text" class="form-control" id="modal_input1" value="${params.input1}">
					</div>

					<label class="formLabel">Main Template</label>

					<div class="form-group cmEditorvSM">
						<textarea class="form-control" id="modal_editor_single_lgTextArea1" rows="8">${params.textarea1}</textarea>
					</div>

					<label class="formLabel">Wrapper Template</label>

					<div class="form-group cmEditorXSM">
						<textarea class="form-control" id="modal_editor_single_lgTextArea2" rows="2">${params.textarea2}</textarea>
					</div>

					<label class="formLabel">Inner Template</label>

					<div class="form-group cmEditorXSM">
						<textarea class="form-control" id="modal_editor_single_lgTextArea3" rows="5">${params.textarea3}</textarea>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
				</div>
			</div>
		</div>
	</div>
	`;
};