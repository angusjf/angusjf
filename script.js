var canvasName = "magic-canvas";
var ctx, c;
var running = true;
var objects = [];
var grav = 0.03;
var startFade = 0.1, fadeAmount = 0.00015;
var minSize = 4, maxSize = 8;
var closeButton;

/*
 * like a class for ball objects
 */
function Ball(x, y, vx, vy, r, a) {
	this.x = x;
	this.y = y;
	this.vx = vx;
	this.vy = vy;
	this.ax = 0;
	this.ay = grav;
	this.r = r;
	this.a = a;
}

function start() {
	closeButton = document.getElementById("close-button");
	closeButton.onclick = stop;
	c = document.getElementById(canvasName);
	c.width = document.body.clientWidth;
	c.height = document.body.clientHeight;
	c.onselectstart = function () { return false; }
	ctx = c.getContext("2d");
	ctx.font = "20px Menlo";
	window.requestAnimationFrame(update);
	setTimeout(spawnBall,2000);
}

function spawnBall() {
	objects.push(
		new Ball(
			Math.random() * c.width, -8, //pos
			Math.random() - 0.5, 0, //vel
			Math.random() * (maxSize - minSize) + minSize, startFade //size / alpha
		)
	);
	if (running) setTimeout(spawnBall,(Math.random() + 1) * 500);
}

function update() {
	objects.forEach(updateObject);
	draw();
}

function updateObject(i) {

	/*
	 * Acceleration
	 */
	i.vx = i.ax * 80;
	i.vy = i.ay * 80;

	/*
	 * Collisions
	if (i.y + i.r + i.vy > c.height) { //ground
		i.vx *= -0.1; i.vy *= -0.1;
		//i.ax = 0; i.ay = 0;
	} 

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
	 * Fade
	i.a -= fadeAmount;
	if (i.a <= 0) {
		objects.shift();
	}
	 */
	if (i.y > c.height) objects.shift();
}

function draw() {
	ctx.clearRect(0, 0, c.width, c.height); //clear screen
	objects.forEach(function(i) {
		ctx.beginPath();
		ctx.fillStyle = 'rgba(0, 0, 0, ' + i.a + ')'; //transparency
		ctx.arc(i.x, i.y, i.r, 0, 2 * Math.PI);
		ctx.fill();
	});
	window.requestAnimationFrame(update);
}

function stop() {
	running = false;
	closeButton.style.visibility = 'hidden';
}

//start called when page is loaded
window.onload = start;
