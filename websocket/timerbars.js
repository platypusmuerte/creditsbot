exports.oc_timerbars = `class TimerBars {		
				
	constructor(params) {
		this.count = 0;
		this.barwidth = 300;
		this.animObj;

		this.active = {};

		if($.find("#timerbars").length < 1) {
			$("body").append(
				$("<div>",{"class":"timerbars","id":"timerbars"})
			);
		}
	}

	newAlert(alert) {
		if(alert.customcss.length > 0) {
			$("head").append(
				$("<style>").text(alert.customcss)
			);
		}

		return new Promise((resolve, reject)=>{
			this.addTimerBar(alert);
			resolve();
		});
	}

	addTimerBarXX(timerbar) {
		this.active[timerbar.key] = 1;

		this.makeBar(timerbar);
	}

	addTimerBar(timerbar) {
		let cssClasses = "animate__animated animate__bounceInDown timerbar " + timerbar.key;
		let key = "timerbar" + ++this.count;
		let timerBarTime = timerbar.time*1;
		let minutes = Math.floor(timerBarTime / 60);
		let seconds = timerBarTime % 60;

		if(seconds < 10) {
			seconds = "0" + seconds;
		}

		if(this.active[timerbar.key] === 1) {
			let existingBar = $(".timerbars").find("." + timerbar.key)[0];
			let newTimeVal = $(existingBar).attr("data-time")*1 + timerBarTime;

			$("#timerbars").append(
				$("<div>",{"class":cssClasses, "id":key,"data-time":newTimeVal}).css({
					width: this.barwidth + 'px',
					color: timerbar.color,
					backgroundColor: timerbar.background
				}).append(
					$("<div>",{"class":"timerbarcontent"}).append(
						$("<div>",{"class":"timerbarlabel"}).append(timerbar.label)
					).append(
						$("<div>",{"class":"timerbarcounter"}).append(minutes + ":" + seconds)
					)
				).append(
					this.getTimerBarFill(timerbar,key)
				)
			);
			setTimeout(()=>{
				this.removeBar($(existingBar).attr("id"),timerbar.key);
			},1000);
		} else {
			$("#timerbars").append(
				$("<div>",{"class":cssClasses, "id":key,"data-time":timerBarTime}).css({
					width: this.barwidth + 'px',
					color: timerbar.color,
					backgroundColor: timerbar.background
				}).append(
					$("<div>",{"class":"timerbarcontent"}).append(
						$("<div>",{"class":"timerbarlabel"}).append(timerbar.label)
					).append(
						$("<div>",{"class":"timerbarcounter"}).append(minutes + ":" + seconds)
					)
				).append(
					this.getTimerBarFill(timerbar,key)
				)
			);

			this.active[timerbar.key] = 1;
		}

		this.updateCounter(key);
	}

	getTimerBarFill(timerbar,key) {
		if(this.active[timerbar.key] > 1) {
			return $("<div>",{"class":"timerbarfill " + timerbar.key + "fill"}).css({
				width: this.barwidth + 'px',
				color: timerbar.color,
				backgroundColor: timerbar.fill
			});
		} else {
			return $("<div>",{"class":"timerbarfill " + timerbar.key + "fill"}).css({
				width: this.barwidth + 'px',
				color: timerbar.color,
				backgroundColor: timerbar.fill
			}).animate(
				{width: '0px'},
				timerbar.time*1000,
				"linear",
				()=>{
					this.removeBar(key,timerbar.key);
				}
			);
		}
	}

	updateCounter(bar) {
		let counterDiv = $("#" + bar).find(".timerbarcounter")[0];
		let time = $("#" + bar).attr("data-time")*1;

		let minutes = Math.floor(time / 60);
		let seconds = time % 60;

		if(seconds < 10) {
			seconds = "0" + seconds;
		}

		$(counterDiv).html(minutes + ":" + seconds);

		$("#" + bar).attr("data-time",time - 1);

		if(time > 0) {
			setTimeout(()=>{
				this.updateCounter(bar);
			},1000);
		}
	}

	removeBar(key,type) {
		this.active[type] = 0;

		$("#" + key).addClass("animate__flipOutX");

		setTimeout(()=>{
			$("#" + key).remove();
		},500);

		setTimeout(()=>{
			if($(".timerbars").find("." + type)[0]) {
				this.startNext(type);
			}
		},1000);

		
	}

	startNext(type) {
		if($(".timerbars").find("." + type)[0]) {
			let time = $($(".timerbars").find("." + type)[0]).attr("data-time");
			let bar = $($(".timerbars").find("." + type)[0]);

			$(bar.find(".timerbarfill")).animate(
				{width: '0px'},
				time*1000,
				"linear",
				()=>{
					this.removeBar($(bar).attr("id"),type);
				}
			)

			this.updateCounter($(bar).attr("id"));

			this.active[type] = 1;
		}
	}
}`;