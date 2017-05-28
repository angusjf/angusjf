'use strict';

window.onload = function () {
	var boxes = document.getElementsByClassName("box");
	Array.prototype.forEach.call(boxes, function (box) {
		var closeButton = document.createElement("button");
		closeButton.classList.add('close-button');
		closeButton.onclick = function () {
			box.style.display = "none";
		};
		closeButton.innerHTML = '&times;';
		box.appendChild(closeButton);
	});
	setup();
}
