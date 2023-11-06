const canvas = document.querySelector("canvas");
const plus = document.querySelector(".plus");
const minus = document.querySelector(".minus");
const pointerDiv = document.querySelector(".pointer");
const lineDiv = document.querySelector(".line");
const pointersDiv = document.querySelector(".pointers");

const CENTER = [200, 200];
const RADIUS = 100;
const AMPLITUDE = 30;
const PERIOD = 500;

let drawer;
let N = 4;
let drawPointer = true;
let drawLine = false;
let drawPointers = false;

const drawStandingWave = (n) => {
	const t = Date.now();
	const ctx = canvas.getContext("2d");
	ctx.strokeStyle = "white";
	ctx.clearRect(0, 0, 600, 600);

	const pointer = [
		CENTER[0],
		CENTER[1] -
			RADIUS -
			AMPLITUDE * Math.sin(-(n * Math.PI) / 2 + t / PERIOD),
	];

	if (drawPointer) {
		ctx.beginPath();
		ctx.arc(pointer[0], pointer[1], 5, 0, Math.PI * 2, true);
		ctx.closePath();
		ctx.fillStyle = "red";
		ctx.fill();
	}

	if (drawLine) {
		ctx.beginPath();
		ctx.moveTo(0, pointer[1]);
		ctx.lineTo(600, pointer[1]);
		ctx.closePath();
		ctx.stroke();
	}

	for (let m = 0; m < n; m++) {
		const pointer = [
			CENTER[0],
			CENTER[1] -
				RADIUS -
				AMPLITUDE *
					Math.sin(
						-(n * Math.PI) / 2 + t / PERIOD + (2 * m * Math.PI) / n
					),
		];

		if (drawPointers) {
			ctx.beginPath();
			ctx.arc(pointer[0], pointer[1], 5, 0, Math.PI * 2, true);
			ctx.closePath();
			ctx.fillStyle = m == 0 ? "red" : "white";
			ctx.fill();
		}

		const start = [
			CENTER[0] +
				RADIUS +
				AMPLITUDE * Math.sin(t / PERIOD + (2 * m * Math.PI) / n),
			CENTER[1],
		];
		ctx.beginPath();
		ctx.moveTo(start[0], start[1]);
		for (let rad = 0; rad < Math.PI * 2; rad += Math.PI * 0.02) {
			const radius =
				RADIUS +
				AMPLITUDE *
					Math.sin(n * rad + t / PERIOD + (2 * m * Math.PI) / n);
			ctx.lineTo(
				CENTER[0] + radius * Math.cos(rad),
				CENTER[1] + radius * Math.sin(rad)
			);
		}
		ctx.lineTo(start[0], start[1]);
		ctx.closePath();
		ctx.stroke();
	}
};

const startDrawing = () => {
	if (!drawer) {
		drawer = setInterval(() => {
			drawStandingWave(N);
		}, 20);
	}
};

const handlePlus = () => {
	N = Math.min(12, N + 1);
};

const handleMinus = () => {
	N = Math.max(1, N - 1);
};

const handlePointer = () => {
	drawPointer = !drawPointer;
	if (drawPointer && drawPointers) {
		drawPointers = false;
	}
};

const handleLine = () => {
	drawLine = !drawLine;
};

const handlePointers = () => {
	drawPointers = !drawPointers;
	if (drawPointer && drawPointers) {
		drawPointer = false;
	}
};

plus.addEventListener("click", handlePlus);
minus.addEventListener("click", handleMinus);
pointerDiv.addEventListener("click", handlePointer);
lineDiv.addEventListener("click", handleLine);
pointersDiv.addEventListener("click", handlePointers);

startDrawing();
