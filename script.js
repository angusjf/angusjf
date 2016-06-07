var ctx;
var c;
var textPosY = 0;

var tick = 0;
var currency;
var dollar = "$";
var pound = "\u00A3";
var yen = "\u00A5";
var euro = "\u20AC";

window.onload = function () {
	c = document.getElementById("magicCanvas");
	ctx = c.getContext("2d");

	c.width = document.body.clientWidth;
	c.height = document.body.clientHeight;

	ctx.fillStyle = "green";
	ctx.font = "30px Menlo";
}

function startFill () {
	setInterval(placeBlock, 80);
	c.style.display = "inline";
}

function stopFill () {
	c.style.display = "none";
}

function placeBlock () {
	ctx.fillStyle = "rgb(" + (255 + Math.floor(Math.random()*-100)) + ", 215, 0)";
 
	switch (tick) {
		case 0:
			currency = dollar;	
			break;
		case 1:
			currency = pound;	
			break;
		case 2:
			currency = yen;	
			break;
		case 3:
			currency = euro;
			break;
		default:
			currency = "?";	
			break;
	}

	tick++;
	if (tick > 3) {
		tick = 0;
	}

	for (var textPosX = -20; textPosX < c.width; textPosX += 50) {
		ctx.fillText(currency,textPosX + Math.random() * 50,textPosY + Math.random() * 50);
	}
	textPosY += 50;

	if (textPosY > c.height + 20) {
		textPosY = -20 + Math.floor((Math.random() * 20));
	}
}
