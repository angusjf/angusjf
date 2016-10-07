var ctx, c;
var running = false;
var objects = [];

function Ball(x, y, vx, vy, r, a) { //like a class for ball objects
	this.x = x;
	this.y = y;
	this.vx = vx;
	this.vy = vy;
	this.r = r;
	this.a = a;
}

window.onload = function () { //called when page is loaded
	c = document.getElementById("magic-canvas");
	c.width = 170;
	c.height = 170;
	ctx = c.getContext("2d");
	ctx.font = "20px Menlo";
	ctx.fillStyle = 'rgba(0,0,0, 0.1)'; //transparency
	ctx.fillText("click me", 34, c.height / 2 + 5);
	setInterval(update, 33); //call update at 30fps (every 33ms)
}

function clicked() { //called on click in html
	if (!running) running = true;
	objects.push(new Ball((Math.random() * (c.width - 16)) + 8, 16, Math.random() * 6 - 3, 0, 8, 0.5));
}

function update() { if (running) {
	objects.forEach(function(i) { //cycle through every object
		i.vy += 2.5; //gravity
		i.x += i.vx;
		i.y += i.vy;
		if (i.y + i.r > c.height) { //collisions
			i.y = c.height - i.r; 
			i.vy *= -0.9;
		}
		i.a -= 0.0045;
		if (i.a <= 0) objects.shift(); //if faded, remove it
	});
	draw();
}}

function draw() {
	ctx.clearRect(0, 0, c.width, c.height); //clear screen
	objects.forEach(function(i) {
		ctx.beginPath();
		ctx.fillStyle = 'rgba(0, 0, 0, ' + i.a + ')'; //transparency
		ctx.arc(i.x, i.y, i.r, 0, 2 * Math.PI);
		ctx.fill();
	});
}
