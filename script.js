'use strict';

window.onload = function () {
	var boxes = document.getElementsByClassName("box");
	Array.prototype.forEach.call(boxes, function (box) {
		var closeButton = document.createElement("button");
		closeButton.classList.add('close-button');
		box.appendChild(closeButton);

		box.originalHeight = (box.offsetHeight - 40) + "px";
		box.style.height = box.originalHeight;
		closeButton.innerHTML = '&times;';

		closeButton.onclick = function () {
			box.closed = !box.closed;
			if (box.closed) {
				box.style.height = "16px";
				closeButton.innerHTML = '+';
			} else {
				box.style.height = box.originalHeight;
				closeButton.innerHTML = '&times;';
			}
		};
	});
	setup();
}
