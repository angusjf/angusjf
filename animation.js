var c, ctx, divs;
window.onload = function () {
	c = document.getElementById('canvas');
	ctx = c.getContext("2d");
	divs = document.getElementsByTagName('div');
	c.onselectstart = function () { return false; }
	c.width = window.innerWidth;
	c.height = window.innerHeight;
	ctx.fillStyle = "#fbfbfb";
	ctx.font = "20px Helvetica Neue"
	draw();
}
var x = 0, y = 0;
var drawTime = 20, clearTime = 600, glitchTime = 75, resetGlitchTime = glitchTime + 50;
var t = clearTime;
function draw() {
	requestAnimationFrame(draw);
	if (t % clearTime == 0) {
		ctx.clearRect(0, 0, c.width, c. height);
	}
	if (t % drawTime == 0) {
		x = Math.random() * c.width;
		y = Math.random() * c.height;
		str = String.fromCharCode(32 + Math.random() * 95);
		ctx.fillText(str, x, y);
	}
	if (t % glitchTime == 0) {
		ctx.font = "20px Wingdings, Times";
		divs[Math.floor(Math.random() * (divs.length - 1))].style.fontFamily = "wingdings, times";
	}
	if (t % resetGlitchTime == 0) {
		ctx.font = "20px Helvetica Neue";
		for (i = 0; i < divs.length; i++){
			divs[i].style.fontFamily = "Helvetica Neue";
		}
	}
	t++;
}
