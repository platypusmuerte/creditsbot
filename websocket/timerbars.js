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
		this.addCustomCSS(alert);

		return new Promise((resolve, reject)=>{
			this.addTimerBarColors(alert);
			this.addTimerBar(alert);
			resolve();
		});
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

		if(this.active[timerbar.key] === 1) {
			let existingBar = $(".timerbars").find("." + timerbar.key)[0];
			let newTimeVal = $(existingBar).attr("data-time")*1 + timerBarTime;

			timerbar.time = newTimeVal+1;

			this.appendTimerBar(cssClasses, key, newTimeVal, timerbar.label, minutes, seconds, this.getTimerBarFill(timerbar,key));

			setTimeout(()=>{
				this.removeBar($(existingBar).attr("id"),timerbar.key);
			},500);
		} else {
			this.appendTimerBar(cssClasses, key, timerBarTime, timerbar.label, minutes, seconds, this.getTimerBarFill(timerbar,key));

			this.active[timerbar.key] = 1;			
			this.updateCounter(key);
		}
	}

	appendTimerBar(cssClasses, key, timeValue, label, m, s, fill) {
		$("#timerbars").append(
			$("<div>",{"class":cssClasses, "id":key,"data-time":timeValue}).css({
				width: this.barwidth + 'px'
			}).append(
				$("<div>",{"class":"timerbarcontent"}).append(
					$("<div>",{"class":"timerbarlabel"}).append(label)
				).append(
					$("<div>",{"class":"timerbarcounter"}).append(m + ":" + s)
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

	reSort() {
		let $wrapper = $('.timerbars');

		$wrapper.find('.timerbar').sort(function(a, b) {
			return +a.getAttribute('data-time') - +b.getAttribute('data-time');
		})
		.appendTo($wrapper);
	}
}`;