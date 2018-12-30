alert('tap on screen to spawn balls')

function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomValFromRange(min, max) {
    return Math.random() * (max - min + 1) + min
}

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)]
}

function distance(x1, y1, x2, y2) {
    const xDist = x2 - x1
    const yDist = y2 - y1

    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
}

var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');
const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']
var mouse = {
	x: undefined,
	y: undefined
}

var balls = []

canvas.addEventListener('mousemove', function() {
	mouse.x = event.x;
	mouse.y = event.y;
})

canvas.addEventListener('mousedown', addBall)

function Ball() {
	this.x = mouse.x;
	this.y = mouse.y;
	this.radius = randomIntFromRange(10, 15);
	this.dy = randomValFromRange(0, 1)
	this.color = randomColor(colors);
	this.gravity = randomValFromRange(0.5,1)
	this.friction = 0.99
	this.display = true
	this.draw = function() {
		c.beginPath()
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true)
		c.fillStyle = this.color
		c.fill()
		c.stroke()
		c.closePath()
	}
	this.update = function() {
		if (this.dy < 0.01 && this.dy > -0.01) {
			this.display = false
		}
		if (this.display) {
			this.draw()
		}
		this.y += this.dy
		if (this.y + this.radius + 5 > innerHeight) {
			this.dy = -this.dy * this.friction
		} else {
			this.dy += this.gravity
		}
	}
}


function addBall() {
	balls.push(new Ball())
}

function screen() {
	requestAnimationFrame(screen)
	c.clearRect(0, 0, innerWidth, innerHeight)
	for (var i = balls.length - 1; i >= 0; i--) {
		balls[i].update()
	}
}
screen()