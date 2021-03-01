exports.oc_timerbars = `class TimerBars {		
				
	constructor(params) {
		this.count = 0;
		this.barwidth = 300;
		this.active = {};
		this.inprogress = false;
		this.callStack = [];

		if($.find("#timerbars").length < 1) {
			$("body").append(
				$("<div>",{"class":"timerbars","id":"timerbars"})
			);
		}
	}

	newAlert(alert) {
		this.addCustomCSS(alert);

		return new Promise((resolve, reject)=>{
			if(alert.removebykey) {
				this.removeTimerBarAmountByKey(alert.key);
			} else if(this.inprogress) {
				this.waitToAdd(alert);
			} else {
				this.addTimerBarColors(alert);
				this.addTimerBar(alert);
			}
			
			resolve();
		});
	}

	waitToAdd(alert) {
		setTimeout(()=>{
			this.tryToAdd(alert);
		},2000);
	}

	tryToAdd(alert) {
		if(this.inprogress) {
			this.waitToAdd(alert);
		} else {
			this.addTimerBarColors(alert);
			this.addTimerBar(alert);
		}
	}

	addCustomCSS(alert) {
		if(alert.customcss) {
			$("head").append(
				$("<style>").text(alert.customcss)
			);
		}
	}

	addTimerBarColors(alert) {
		let css = '.' + alert.key + ' {color: ' + alert.color + ';background-color: ' + alert.background + ';}';
		css += '.' + alert.key + 'fill {background-color: ' + alert.fill + ';}';

		$("head").append(
			$("<style>").text(css)
		);
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

		let timeStr = this.getTimeString(timerBarTime)

		if(this.active[timerbar.key] === 1) {
			this.inprogress = true;
			let existingBar = $(".timerbars").find("." + timerbar.key)[0];
			let newTimeVal = $(existingBar).attr("data-time")*1 + timerBarTime;

			timerbar.time = newTimeVal+1;

			this.appendTimerBar(cssClasses, key, newTimeVal, timerbar.label, timeStr, this.getTimerBarFill(timerbar,key), timerBarTime);

			setTimeout(()=>{
				this.removeBar($(existingBar).attr("id"),timerbar.key);
			},500);
		} else {
			this.appendTimerBar(cssClasses, key, timerBarTime, timerbar.label, timeStr, this.getTimerBarFill(timerbar,key), timerBarTime);

			this.active[timerbar.key] = 1;			
			this.updateCounter(key);
		}
	}

	appendTimerBar(cssClasses, key, timeValue, label, timeStr, fill, baseTime) {
		$("#timerbars").append(
			$("<div>",{"class":cssClasses, "id":key,"data-time":timeValue, "data-basetime":baseTime}).css({
				width: this.barwidth + 'px'
			}).append(
				$("<div>",{"class":"timerbarcontent"}).append(
					$("<div>",{"class":"timerbarlabel"}).append(label)
				).append(
					$("<div>",{"class":"timerbarcounter"}).append(timeStr)
				)
			).append(
				fill
			)
		);

		setTimeout(this.reSort,1000);
	}

	getTimerBarFill(timerbar,key) {
		return $("<div>",{"class":"timerbarfill " + timerbar.key + "fill"}).css({
			width: this.barwidth + 'px'
		}).animate(
			{width: '0px'},
			timerbar.time*1000,
			"linear",
			()=>{
				this.removeBar(key,timerbar.key);
			}
		);
	}

	removeBar(key,type) {
		if($("#" + key).length) {
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
			this.inprogress = false;
		}
	}

	updateCounter(bar) {
		if($("#" + bar).length) {
			let counterDiv = $("#" + bar).find(".timerbarcounter")[0];
			let time = $("#" + bar).attr("data-time")*1;
			
			$(counterDiv).html(this.getTimeString(time));

			$("#" + bar).attr("data-time",time - 1);

			if(time > 0) {
				setTimeout(()=>{
					this.updateCounter(bar);
				},1000);
			}
		}		
	}

	reSort() {
		if($(".timerbar").length > 1) {
			let $wrapper = $('.timerbars');

			$wrapper.find('.timerbar').sort(function(a, b) {
				return +a.getAttribute('data-time') - +b.getAttribute('data-time');
			}).appendTo($wrapper);
		}		
	}

	getTimeString(time) {
		let timeStr = new Date(time * 1000).toISOString().substr(11, 8).split(":");

		if(timeStr[0] !== "00") {
			let hour = timeStr[0]*1;
			return hour + ":" + timeStr[1] + ":" + timeStr[2];
		} else if(timeStr[1] !== "00") {
			return timeStr[1]*1 + ":" + timeStr[2];
		} else {
			return timeStr[2]*1;
		}
	}

	removeTimerBarAmountByKey(key) {
		if($("." + key).length) {
			let timeRemaining = ($("." + key).length) ? $($("." + key)[0]).attr("data-time")*1:0;
			let baseTime = ($("." + key).length) ? $($("." + key)[0]).attr("data-basetime")*1:0;

			if((timeRemaining > baseTime)) {
				$($("." + key)[0]).attr("data-time",timeRemaining - baseTime);
			} else {
				this.removeBar($($("." + key)[0]).attr("id"),key);
			}			
		}
	}
}`;