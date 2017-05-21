var canvasName = "magic-canvas";
var ctx, c;
var paused = true;
var closeButton;

function start() {
	closeButton = document.createElement("button");
	closeButton.classList.add('link');
	closeButton.id = 'close-button';
	closeButton.onclick = togglePaused;
	closeButton.innerHTML = '&#9654;';
	document.getElementById("container").appendChild(closeButton);
	c = document.getElementById(canvasName);
	c.width = document.body.clientWidth;
	c.height = document.body.clientHeight;
	c.onselectstart = function () { return false; }
	ctx = c.getContext("2d");
	ctx.font = "20px Menlo";
	window.requestAnimationFrame(update);
	//ANIMATION SPECIFIC
	togglePaused();
	ctx.lineWidth = 0.1;
	rect.offsetX = c.width / 2;
	rect.offsetY = c.height / 2;
	//ANIMATION SPECIFIC
}

function togglePaused() {
	paused = !paused;
	closeButton.innerHTML = paused ? "&#9654;" : "&times";
}

//start called when page is loaded
window.onload = start;

//ANIMATION SPECIFIC
var rect = {
	't': 0,
	'cwidth': 100, 'cheight': 100,
	'offsetX': 530, 'offsetY': 400,
	'a': Math.random() * Math.PI*2, 'b': Math.random() * Math.PI*2,
	'update': function() {
		this.t += 0.01;
		this.x1 =	Math.sin(this.t + this.a) * this.cwidth;
		this.y1 =	Math.sin(this.t + this.b) * this.cheight;
		this.width =	Math.sin(this.t + this.a) * this.cwidth;
		this.height =	Math.sin(this.t + this.b) * this.cheight;
		if (this.t > Math.PI*2) {
			paused = true;
			this.t = 0;
			this.a = Math.random() * Math.PI*2;
			this.b = Math.random() * Math.PI*2;
			window.setTimeout(function() {
				paused = false;
				ctx.clearRect(0, 0, c.width, c.height); //clear screen
			}, 1500);
		}
	},
	'draw': function() {
		ctx.strokeRect(
			this.x1 + this.offsetX,
			this.y1 + this.offsetY,
			this.width,
			this.height
		);
	}
}
//ANIMATION SPECIFIC

function update() {
	if (!paused) {
		// ANIMATION SPECIFIC //
		rect.update();
		draw();
		// ANIMATION SPECIFIC //
	}
	window.requestAnimationFrame(update);
}


function draw() {
	//ctx.clearRect(0, 0, c.width, c.height); //clear screen
	// ANIMATION SPECIFIC //
	rect.draw(); 
	// ANIMATION SPECIFIC //
}
