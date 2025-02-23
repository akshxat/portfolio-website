/*
    Author: Akshat Bhatnagar
    Date: 2024-12-12
    Description: JavaScript for Akshat's E-Portfolio
*/

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

let width, height, balls = [];
let mouse = {
	x: undefined,
	y: undefined
}

let rgb = [
	"rgb(248, 249, 250)",
	"rgb(233, 236, 239",
	"rgb(222, 226, 230)",
	"rgb(206, 212, 218)",
	"rgb(173, 181, 189)",
	"rgb(108, 117, 125)",
	"rgb(73, 80, 87)",
    "rgb(52, 58, 64)",
    "rgb(33, 37, 41)"
]

const init = () => {
	resizeReset();
	animationLoop();
}

const resizeReset = () => {
	width = canvas.width = window.innerWidth;
	height = canvas.height = window.innerHeight;
}

const animationLoop = () => {
	ctx.clearRect(0, 0, width, height);
	ctx.globalCompositeOperation = 'color';
	drawBalls();

	let temp = [];
	for (let i = 0; i < balls.length; i++) {
		if (balls[i].time <= balls[i].ttl) {
			temp.push(balls[i]);
		}
	}
	balls = temp;
	requestAnimationFrame(animationLoop);
}

const drawBalls = () => {
	for (let i = 0; i < balls.length; i++) {
		balls[i].update();
		balls[i].draw();
	}
}

const mousemove = (e) => {
	mouse.x = e.x;
	mouse.y = e.y;

	for (let i = 0; i < 3; i++) {
		balls.push(new Ball());
	}
}

const mouseout = () => {
	mouse.x = undefined;
	mouse.y = undefined;
}

const getRandomInt = (min, max) => {
	return Math.round(Math.random() * (max - min)) + min;
}

const easeOutQuart = (x) => {
	return 1 - Math.pow(1 - x, 4);
}

class Ball {
	constructor() {
		this.start = {
			x: mouse.x + getRandomInt(-20, 20),
			y: mouse.y + getRandomInt(-20, 20),
			size: getRandomInt(7, 15)
		}

		this.end = {
			x: this.start.x + getRandomInt(-70, 70),
			y: this.start.y + getRandomInt(-70, 70)
		}

		this.x = this.start.x;
		this.y = this.start.y;
		this.size = this.start.size;
		this.style = rgb[getRandomInt(0, rgb.length - 1)];
		this.time = 0;
		this.ttl = 120;
	}

	draw() {
		ctx.fillStyle = this.style;
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
		ctx.closePath();
		ctx.fill();
	}

	update() {
		if (this.time <= this.ttl) {
			let progress = 1 - (this.ttl - this.time) / this.ttl;
			this.size = this.start.size * (1 - easeOutQuart(progress));
			this.x = this.x + (this.end.x - this.x) * 0.01;
			this.y = this.y + (this.end.y - this.y) * 0.01;
		}
		this.time++;
	}
}

window.addEventListener("DOMContentLoaded", init);
window.addEventListener("resize", resizeReset);
window.addEventListener("mousemove", mousemove);
window.addEventListener("mouseout", mouseout);