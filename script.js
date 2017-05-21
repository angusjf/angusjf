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
	circ.offsetX = c.width / 2;
	circ.offsetY = c.height / 1.75;
	//ANIMATION SPECIFIC
}

function togglePaused() {
	paused = !paused;
	if (paused) ctx.clearRect(0, 0, c.width, c.height); //clear screen
	closeButton.innerHTML = paused ? "&#9654;" : "&times";
}

//start called when page is loaded
window.onload = start;

var initialT = 0;
var speed = 0.03;
var maxT = Math.PI * 30;
var delay = 500;

var circ = {
	't': initialT,
	'xScale': 100, 'yScale': 100, 'rScale': 1,
	'offsetX': 530, 'offsetY': 400,
	'a': 1 * Math.random() * Math.PI*2,
	'b': 1 * Math.random() * Math.PI*2,
	'c': 1 * Math.random() * Math.PI*2,
	'update': function() {
		if (this.t > maxT) {
			paused = true;
			this.t = initialT;
			this.a = 1 * Math.random() * Math.PI*2;
			this.b = 1 * Math.random() * Math.PI*2;
			window.setTimeout(function() {
				paused = false;
			}, delay);
		}
		this.x1 =		Math.sin(this.t + this.a) * this.xScale;
		this.y1 =		Math.sin(this.t + this.b) * this.yScale;
		this.radius =  Math.abs(Math.pow(this.t + this.c, 2) * this.rScale);
		this.t += speed;
	},
	'draw': function() {
		ctx.beginPath();
		ctx.arc(this.x1 + this.offsetX, this.y1 + this.offsetY, this.radius, 0, 2 * Math.PI);
		ctx.stroke();
	}
}

function update() {
	if (!paused) {
		circ.update();
		draw();
	}
	window.requestAnimationFrame(update);
}


function draw() {
	circ.draw(); 
}
