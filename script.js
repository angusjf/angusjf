var ctx;
var c;
var color = 0;
var textPosX = 0;
var textPosY = -20;

window.onload = function () {
	c = document.getElementById("magicCanvas");
	ctx = c.getContext("2d");
	c.width = 1000;

	ctx.font = "50px Monospace";
	ctx.fillStyle = "gold";
	ctx.fillText("MAKE APPS GET MONEY", c.width / 2 - 300, c.height / 2);
	
	ctx.font = "20px Monospace";
	setInterval(placeBlock, 25);
}

function placeBlock () {

	ctx.fillText("$",textPosX,textPosY);

	textPosX += Math.floor((Math.random() * 8) + 1);
	textPosY += 13;

	ctx.fillStyle = "#" + color;
	
	if (textPosY > c.height + 20) {
		textPosY = -20;
	}
	
	if (textPosX > c.width + 20) {
		textPosX = -20;
	}

	color -= 1;

	if (color < 0) {
		color = 999;
	}
}
