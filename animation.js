'use strict';

var canvasName = "magic-canvas";
var ctx, c;
var mouse = { x: 0, y: 0 };

function setup() {
	//canvas
	c = document.getElementById(canvasName);
	c.width = document.body.clientWidth;
	c.height = document.body.clientHeight;
	c.onselectstart = function () { return false; }
	ctx = c.getContext("2d");
	//loops
	start();
	window.requestAnimationFrame(update);
}

document.onmousemove = function (e) {
	mouse.x = e.clientX;
	mouse.y = e.clientY;
}

var points = [];
var gridSize = 32;
var offset = {'x': 0, 'y': 0};
var separation = {'x': 7, 'y': 10};

function start() {
	ctx.lineWidth = 2;
	ctx.strokeStyle = "#757575";
	//separation.x = c.width / (gridSize - 1);
	//separation.y = c.height / (gridSize - 1);
	offset.x = c.width/2;
	offset.y = c.height/1.7;
	for (var i = 0; i < gridSize; i ++) {
		for (var j = 0; j < gridSize; j ++) {
			points[i*gridSize + j] = {'gridX': (j - gridSize / 2) * separation.x + offset.x, 'gridY': (i - gridSize / 2) * separation.y + offset.y, 'rand': 2*Math.random()};
		}
	}
}

function update() {
	ctx.clearRect(0, 0, c.width, c.height);

	for (var i = 0; i < gridSize; i ++) {
		for (var j = 0; j < gridSize; j ++) {

			points[i*gridSize + j].x = points[i*gridSize + j].gridX;
			points[i*gridSize + j].y = points[i*gridSize + j].gridY
				- 20 * Math.min(2,Math.pow(Math.abs((mouse.x - points[i*gridSize + j].gridX) * 0.04), -2))
				* (0.6 + 0.4 * Math.abs(Math.sin(points[i*gridSize + j].rand)));

			if (j > 0) {
				ctx.beginPath();
				ctx.moveTo(points[i*gridSize + j - 1].x, points[i*gridSize + j - 1].y);
				ctx.lineTo(points[i*gridSize + j].x, points[i*gridSize + j].y);
				ctx.stroke();
			}
		}
	}

	window.requestAnimationFrame(update);
}
