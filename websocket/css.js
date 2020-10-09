exports.overlaycss = `<style>
	.alertWrapper {
		display: inline-block;
		position: absolute;
	}
	.tl, .tc, .tr, .cl, .cc, .cr, .bl, .bc, .br {
		
	}
	.tl {
		top: 75px;
		left: 75px;
	}
	.tc {
		top: 75px;
		left: 50%;
		transform: translateX(-50%);
	}
	.tr {
		top: 75px;
		right: 75px;
	}
	.cl {
		left: 75px;
		top: 50%;
		transform: translateY(-50%);
	}
	.cc {
		left: 50%;
		transform: translateX(-50%);
		top: 50%;
		transform: translateY(-50%);
	}
	.cr {
		right: 75px;
		top: 50%;
		transform: translateY(-50%);
	}
	.bl {
		bottom: 75px;
		left: 75px;
	}
	.bc {
		top: 75px;
		left: 50%;
		transform: translateX(-50%);
	}
	.br {
		bottom: 75px;
		right: 75px;
	}
	</style>`;