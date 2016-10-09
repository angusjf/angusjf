var ctx, c;
var objects = [];
var grav = 0.45;
var bounceY = 0.95, bounceX = 0.9;
var fadeAmount = 0.05;

function Ball(x, y, vx, vy, r, a) { //like a class for ball objects
	this.x = x;
	this.y = y;
	this.vx = vx;
	this.vy = vy;
	this.r = r;
	this.a = a;
}

function start() {
	c = document.getElementById("magic-canvas");
	c.width = 170;
	c.height = 170;
	c.onselectstart = function () { return false; }
	ctx = c.getContext("2d");
	ctx.font = "20px Menlo";
	window.requestAnimationFrame(update);
}

function clicked() { //called on click in html
	objects.push(
		new Ball(
			c.width/2, 8, //pos
			Math.random() * 6 - 3, 0, //vel
			Math.random() * 4 + 8, 0.5 //size / alpha
		)
	);
}

function update() {
	objects.forEach(function(i) { //cycle through every object
		i.vy += grav; //gravity
		i.x += i.vx; //add velocity
		i.y += i.vy;

		//collisions
		if (i.y + i.r > c.height) { //ground
			i.y = c.height - i.r; 
			i.vy *= -bounceY;
			i.a -= fadeAmount; //fade on bounce
			if (i.a <= 0) objects.shift(); //if faded, remove it
		}

		if (i.x - i.r < 0) { //left
			i.x = i.r;
			i.vx *= -bounceX;
		} else if (i.x + i.r > c.width) { //right
			i.x = c.width - i.r;
			i.vx *= -bounceX;
		}
	});
	draw();
}

function draw() {
	ctx.clearRect(0, 0, c.width, c.height); //clear screen
	objects.forEach(function(i) {
		ctx.beginPath();
		ctx.fillStyle = 'rgba(0, 0, 0, ' + i.a + ')'; //transparency
		ctx.arc(i.x, i.y, i.r, 0, 2 * Math.PI);
		ctx.fill();
	});
	if (objects.length == 0) { //if no objects show message
		ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
		ctx.fillText("click me", 34, c.height / 2 + 5);
	}
	window.requestAnimationFrame(update);
}

//start called when page is loaded
window.onload = start;
