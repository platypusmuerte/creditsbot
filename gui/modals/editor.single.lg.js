exports.modal_editor_single_lg = (params)=>{
	return `
	<!-- Modal -->
	<div class="modal fade" id="modal_editor_single_lg" tabindex="-1" aria-labelledby="modal_editor_single_lg_ModalLabel" aria-hidden="true">
		<div class="modal-dialog modalDialogLg">
			<div class="modal-content modalBody">
				<div class="modal-header">
					<h5 class="modal-title" id="modal_editor_single_lg_ModalLabel">Default Content</h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<label class="formLabel">Template</label>
	
					<div class="form-group cmEditorLG">
						<textarea class="form-control" id="modal_editor_single_lgTextArea" rows="25">${params.textarea}</textarea>
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