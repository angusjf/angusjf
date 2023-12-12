customElements.define('draw-canvas', class extends HTMLElement {
	#root

	constructor() {
		super()
		this.#root = this.attachShadow({ mode: 'open' })
	}

	connectedCallback() {
		const canvas = document.createElement("canvas");
		this.#root.appendChild(canvas)

		// canvas {
		//   width: 100%;
		//   height: 100%;
		//   pointer-events: none;
		//   position: absolute;
		//   top: 0;
		//   left: 0;
		// }
		// canvas.style.position = "absolute"
		// canvas.style.left = "0"
		// canvas.style.right = "0"
		// canvas.style.top = "0"
		// canvas.style.bottom = "0"

		const ctx = canvas.getContext('2d');
		const dpr = window.devicePixelRatio;
		const rect = canvas.getBoundingClientRect();

		canvas.width = rect.width * dpr;
		canvas.height = rect.height * dpr;

		ctx.scale(dpr, dpr);

		canvas.style.width = `${rect.width}px`;
		canvas.style.height = `${rect.height}px`;

		let down = false;

		let old = null;

		canvas.addEventListener("mouseup", () => { down = false; old = null; })
		canvas.addEventListener("mousedown", () => { down = true; old = null; })

		const width = 30;

		ctx.lineWidth = width;

		const setColor = (color) => {
			ctx.strokeStyle = color;
			ctx.fillStyle = color;
		}


		let rt = 0;
		let gt = 0;
		let bt = 0;

		canvas.addEventListener('mousemove', (event) => {
			let x = event.offsetX;
			let y = event.offsetY;

			if (down) {
				ctx.beginPath();
				if (old) {
					ctx.moveTo(old.x, old.y);
				}
				ctx.lineTo(x, y);
				ctx.stroke();
				ctx.moveTo(x, y);
				ctx.ellipse(x, y, width / 2, width / 2, 0, 0, 2 * Math.PI)
				ctx.fill();
			}

			if (old) {
				old.x = x;
				old.y = y;
			} else {
				old = {x, y}
			}


			rt += 0.0128;
			gt += 0.029;
			bt += 0.02;

			let r = (Math.sin(rt) + 1) * 128;
			let b = (Math.sin(gt) + 1) * 128;
			let g = (Math.sin(bt) + 1) * 128;

			setColor(`rgba(${r}, ${g}, ${b}, 0.5)`)
		}, false);
	}
})
