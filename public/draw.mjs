customElements.define('draw-canvas', class extends HTMLElement {
	#root

	constructor() {
		super()
		this.#root = this.attachShadow({ mode: 'open' })
	}

	connectedCallback() {
		const canvas = document.createElement("canvas");
		this.#root.appendChild(canvas)

		canvas.style.width = "100vw"
		canvas.style.height = "100vh"
		this.style.display = "block"
		setTimeout(() => {
			this.style.position = "fixed"
			this.style.top = 0
			this.style.pointerEvents = "none"
		})

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

		document.addEventListener("mouseup", () => { down = false; old = null; })
		document.addEventListener("mousedown", () => { down = true; old = null; })

		const width = 30;

		ctx.lineWidth = width;

		const setColor = (color) => {
			ctx.strokeStyle = color;
			ctx.fillStyle = color;
		}


		let rt = 0;
		let gt = 0;
		let bt = 0;

		document.addEventListener('mousemove', (event) => {
			let x = event.x;
			let y = event.y;

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
				old = { x, y }
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
