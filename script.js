var canvasName = "magic-canvas";
var ctx, c;
var paused = true;
var objects = [];
var grav = 0.03;
var startFade = 0.1, fadeAmount = 0.00015;
var minSize = 4, maxSize = 8;
var closeButton;

/*
 * like a class for ball objects
 */
function Ball(x, y, vx, vy, r) {
	this.x = x;
	this.y = y;
	this.vx = vx;
	this.vy = vy;
	this.ax = 0;
	this.ay = grav;
	this.r = r;
}

function start() {
	closeButton = document.getElementById("close-button");
	closeButton.onclick = togglePaused;
	c = document.getElementById(canvasName);
	c.width = document.body.clientWidth;
	c.height = document.body.clientHeight;
	c.onselectstart = function () { return false; }
	ctx = c.getContext("2d");
	ctx.font = "20px Menlo";
	window.requestAnimationFrame(update);
}

function update() {
	if (!paused) {
		spawnBall();
		objects.forEach(updateObject);
		draw();
	}
	window.requestAnimationFrame(update);
}

function updateObject(i) {

	/*
	 * Acceleration
	 */
	i.vx += i.ax;
	i.vy += i.ay;

	/*
	 * Collisions - ground
	if (i.y + i.r + i.vy > c.height) {
		i.vx *= -0.1; i.vy *= -0.1;
		//i.ax = 0; i.ay = 0;
	} 
	 */

	/*
	 * Collisions - other balls
	objects.forEach(function(j) { //cycle through every object
		if (j != i) { //other balls
			var dx = (i.x + i.vx + i.r) - (j.x + j.vx + j.r);
			var dy = (i.y + i.vy + i.r) - (j.y + j.vy + j.r);
			var distance = Math.sqrt(dx * dx + dy * dy);
			if (distance < i.r + j.r) {
				i.vx *= -0.2; i.vy *= -0.2;
				//i.ax = 0; i.ay = 0;
			}
		}
	});
	 */

	/*
	 * Velocity
	 */
	i.x += i.vx; //add velocity
	i.y += i.vy;
	
	/* 
	 * Remove once off screen
	 */
	if (i.y - i.r > c.height) objects.shift();
}

function draw() {
	ctx.clearRect(0, 0, c.width, c.height); //clear screen
	objects.forEach(function(i) {
		ctx.beginPath();
		ctx.fillStyle = '#e0e0e0'; //transparency
		ctx.arc(i.x, i.y, i.r, 0, 2 * Math.PI);//draw ball
		ctx.fill();
	});
}

function spawnBall() {
	objects.push(
		new Ball(
			Math.random() * c.width, -8, //pos
			Math.random() - 0.5, 0, //vel
			Math.random() * (maxSize - minSize) + minSize //size
		)
	);
}

function togglePaused() {
	paused = !paused;
	closeButton.innerHTML = paused ? "&#9654;" : "&times";
}

//start called when page is loaded
window.onload = start;
