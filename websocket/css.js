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
	body {
		
	}


	/* timer bars */
	@import url('https://fonts.googleapis.com/css2?family=Varela+Round&display=swap');

	.timerbars {
		display: block;
		width: 300px;
		height: auto;
		overflow: hidden;
	}
	.timerbar {
		display: block;
		position: relative;
		width: 100%;
		height: 48px;
		margin-bottom: 10px;
		font-family: 'Varela Round', sans-serif;
		font-size: 26px;
		line-height: 48px;
		border-radius: 4px;
	}
	.timerbarcontent {
		display: block;
		position: absolute;
		width: 100%;
		height: 48px;
		z-index: 101;
	}
	.timerbarfill {
		display: block;
		position: absolute;
		width: 100%;
		height: 48px;
		z-index: 100;
		border-radius: 4px;
	}
	.timerbarlabel {
		display: inline-block;
		width: 80%;
		padding-left: 6px;
	}
	.timerbarcounter {
		display: inline-block;
		position: absolute;
		right: 5px;
	}
	</style>`;