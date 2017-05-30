'use strict';

var canvasName = "animation-canvas";
var ctx, c;
var mouse = { x: 0, y: 0 };

function setup() {
	//canvas
	c = document.getElementById(canvasName);
	c.width = 170;
	c.height = 170;
	c.onselectstart = function () { return false; }
	ctx = c.getContext("2d");
	//loops
	start();
	window.requestAnimationFrame(update);
}

document.onmousemove = function (e) {
	mouse.x = e.clientX - c.getBoundingClientRect().left;
	mouse.y = e.clientY - c.getBoundingClientRect().top;
}

var points = [];
var gridSize = 16;
var offset = {'x': 0, 'y': 0};
var separation = {'x': 8, 'y': 8};

function start() {
	ctx.lineWidth = 1;
	ctx.strokeStyle = "#757575";
	offset.x = c.width/2;
	offset.y = c.height/2;
	for (var i = 0; i < gridSize; i ++) {
		for (var j = 0; j < gridSize; j ++) {
			points[i*gridSize + j] = {
				'gridX': (j - gridSize / 2) * separation.x + offset.x,
				'gridY': (i - gridSize / 2) * separation.y + offset.y,
				'x': 0,
				'y': 0,
				'rand': Math.random()
			};
		}
	}
}

var time = 0, dt = 0.06;
function update() {
	ctx.clearRect(0, 0, c.width, c.height);

	for (var i = 0; i < gridSize; i ++) {
		for (var j = 0; j < gridSize; j ++) {
			points[i*gridSize + j].x = lerp(
				points[i*gridSize + j].x,
				points[i*gridSize + j].gridX + (mouse.x - c.width / 2) * (0.3 * points[i*gridSize + j].rand + 0.7),
				0.1
			);
			points[i*gridSize + j].y = lerp(
				points[i*gridSize + j].y,
				points[i*gridSize + j].gridY + (mouse.y - c.height / 2) * (0.3 * points[i*gridSize + j].rand + 0.7),
				0.1
			);

			if (j > 0 && points[i*gridSize + j]) {
				ctx.beginPath();
				ctx.moveTo(points[i*gridSize + j - 1].x, points[i*gridSize + j - 1].y);
				ctx.lineTo(points[i*gridSize + j].x, points[i*gridSize + j].y);
				ctx.stroke();
			}

			if (i > 0 && points[i*gridSize + j]) {
				ctx.beginPath();
				ctx.moveTo(points[(i - 1)*gridSize + j].x, points[(i - 1)*gridSize + j].y);
				ctx.lineTo(points[i*gridSize + j].x, points[i*gridSize + j].y);
				ctx.stroke();
			}
		}
	}
	
	time += dt;

	window.requestAnimationFrame(update);
}

function lerp(v0, v1, t) {
	return v0*(1-t)+v1*t;
}
