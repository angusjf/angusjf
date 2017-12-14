var c, ctx;
window.onload = function () {
	c = document.getElementById('canvas');
	ctx = c.getContext("2d");
	c.onselectstart = function () { return false; }
	c.width = window.outerWidth;
	c.height = window.outerHeight;
	ctx.fillStyle = "#fbfbfb";
	ctx.font = "20px Helvetica Neue"
	draw();
}
var x = 0, y = 0, w = 10, h = 10, str = 'a';
var i = 0, max1 = 20, max2 = 80;
function draw() {
	requestAnimationFrame(draw);
	i++;
	if (i % max2 == 0)
	ctx.clearRect(0, 0, c.width, c. height);
	if (i % max1 == 0) {
		x = Math.random() * c.width;
		y = Math.random() * c.height;
		w = Math.random() * c.width;
		h = Math.random() * c.height;
		str = String.fromCharCode(32 + Math.random() * 95);
		ctx.fillText(str, x, y);
	}
}
