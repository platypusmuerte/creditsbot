exports.oc_twitter = `${class Twitter {
	constructor(params) {
		this.props;
		this.wait = 2000;
		this.alertWrapper = {
			id: "alertWrapper",
			class: "alertWrapper "
		};

		this.newProps();
	}

	newProps() {
		this.props = {
			duration: 0,
			entrance: false,
			visible: false,
			exit: false,
			css: false,
			template: false,
			screenpos: false,
			soundfile: false,
			volume: false,
		};
	}

	newAlert(alert) {
		this.newProps();

		this.props = Object.assign(this.props,alert);

		let addWrapper = this.addWrapper.bind(this);
		let addAlertToScreen = this.addAlertToScreen.bind(this);
		let showAlert = this.showAlert.bind(this);
		let visibleAnimation = this.visibleAnimation.bind(this);
		let visibleDuration = this.visibleDuration.bind(this);
		let removeAlert = this.removeAlert.bind(this);

		return new Promise((resolve, reject)=>{
			addWrapper().then(()=>{
				addAlertToScreen().then(()=>{
					showAlert().then(()=>{
						visibleAnimation().then(()=>{
							visibleDuration().then(()=>{
								removeAlert().then(()=>{
									resolve();
								});
							});
						});
					});
				});
			});
		});
	}

	addWrapper() {
		let props = this.props;
		let alertWrapper = this.alertWrapper;

		return new Promise((resolve, reject)=>{
			$("body").append(props.css).append($("<div>",{"id":alertWrapper.id,"class":alertWrapper.class + props.screenpos + " animate__animated"}));
			resolve();
		});			
	}

	addAlertToScreen() {
		let props = this.props;
		let alertWrapper = this.alertWrapper;

		return new Promise((resolve, reject)=>{
			$("#" + alertWrapper.id).append(
				props.template
			);
			resolve();
		});
	}

	showAlert() {
		let props = this.props;
		let alertWrapper = this.alertWrapper;
		let wait = this.wait;
		let playSound = this.playSound.bind(this);

		return new Promise((resolve, reject)=>{
			if(props.entrance === "none") {
				$("#" + alertWrapper.id).show();
				resolve();
			} else {
				if(props.volume && props.soundfile) {
					playSound();
				}
				
				$("#" + alertWrapper.id).addClass("animate__" + props.entrance);

				// give animation time to finish
				setTimeout(()=>{
					$("#" + alertWrapper.id).removeClass("animate__" + props.entrance).addClass("animate__infinite");
					resolve();
				},wait);
			}
		});	
	}

	visibleAnimation() {
		let props = this.props;
		let alertWrapper = this.alertWrapper;

		return new Promise((resolve, reject)=>{
			if(props.visible !== "none") {
				$("#" + alertWrapper.id).addClass("animate__" + props.visible);
			}
			resolve();
		});
	}

	visibleDuration() {
		let props = this.props;
		let alertWrapper = this.alertWrapper;

		return new Promise((resolve, reject)=>{
			setTimeout(()=>{
				$("#" + alertWrapper.id).removeClass("animate__" + props.visible).removeClass("animate__infinite");
				resolve();							
			},props.duration*1000);
		});
	}

	removeAlert() {
		let props = this.props;
		let alertWrapper = this.alertWrapper;
		let wait = this.wait;

		return new Promise((resolve, reject)=>{
			if(props.exit === "none") {
				$("#" + alertWrapper.id).remove();
				resolve();
			} else {
				$("#" + alertWrapper.id).addClass("animate__" + props.exit);

				// give animation time to finish
				setTimeout(()=>{
					$("#" + alertWrapper.id).remove();
					resolve();
				},wait);
			}				
		});	
	}

	playSound() {
		let sound = new Howl({
			src: ["/usercontent/" + this.props.soundfile],
			autoplay: true,
			loop: false,
			volume: this.props.volume
		});
	}
}}`;