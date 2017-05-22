var canvasName = "magic-canvas";
var ctx, c;
var paused = true;
var closeButton;

var t = 0;
var points = [];
var gridSize = 32;
var offset = {'x': 0, 'y': 0};
var radius = 0;
var separation = {'x': 16, 'y': 16};
var speed = 0.05;
var amplitude = 3;

window.onload = start; //start called when page is loaded

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
	ctx.lineWidth = 1;
	ctx.strokeStyle = "#ddd";
	separation.x = c.width / (gridSize - 1);
	separation.y = c.height / (gridSize - 1);
	for (var i = 0; i < gridSize; i ++) {
		for (var j = 0; j < gridSize; j ++) {
			points[i*gridSize + j] = {'gridX': j * separation.x, 'gridY': i * separation.y, 'rand': 2*Math.random()};
		}
	}
	//ANIMATION SPECIFIC
}

function togglePaused() {
	paused = !paused;
	if (paused) ctx.clearRect(0, 0, c.width, c.height); //clear screen
	closeButton.innerHTML = paused ? "&#9654;" : "&times";
}

function update() {
	if (!paused) {
		ctx.clearRect(0, 0, c.width, c.height);

		for (var i = 0; i < gridSize; i ++) {
			for (var j = 0; j < gridSize; j ++) {

				points[i*gridSize + j].x = points[i*gridSize + j].gridX + amplitude * Math.sin(points[i*gridSize + j].rand * 2 * Math.PI + t);
				points[i*gridSize + j].y = points[i*gridSize + j].gridY + amplitude * Math.cos(points[i*gridSize + j].rand * 2 * Math.PI + t);

				ctx.beginPath();
				ctx.arc(points[i*gridSize + j].x + offset.x, points[i*gridSize + j].y + offset.y, radius, 0, Math.PI * 2);
				ctx.fill();

				if (j > 0) {
					ctx.beginPath();
					ctx.moveTo(points[i*gridSize + j - 1].x + offset.x, points[i*gridSize + j - 1].y + offset.y);
					ctx.lineTo(points[i*gridSize + j].x + offset.x, points[i*gridSize + j].y + offset.y);
					ctx.stroke();
				}

				if (i > 0) {
					ctx.beginPath();
					ctx.moveTo(points[i*gridSize + j].x + offset.x, points[i*gridSize + j].y + offset.y);
					ctx.lineTo(points[(i - 1)*gridSize + j].x + offset.x, points[(i - 1)*gridSize + j].y + offset.y);
					ctx.stroke();
				}
			}
		}

		t += speed;
		draw();
	}
	window.requestAnimationFrame(update);
}


function draw() {
}
