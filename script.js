function toggleBoxes() {
	var boxes = document.getElementsByClassName("box");
	Array.prototype.forEach.call(boxes, function (box) {
		if (box.style.display === "inline-block") {
			box.style.display = "none";
		} else {
			box.style.display = "inline-block";
		}
	});
}
