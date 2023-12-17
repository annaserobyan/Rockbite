const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const gravity = 0.2;
let balls = [];
let lastTime = 0;
const maxBalls = 15; // maximum number of balls allowed on the screen

class Ball {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.velocityY = 0;
        this.colour = getRandomColour(); // assigning a random colour to each ball
    }

    drawCircle() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.colour;
        ctx.fill();
        ctx.closePath();
    }

    update(deltaTime) {
        this.velocityY += gravity;
        this.y += this.velocityY * deltaTime;

        const bottomEdge = this.y + this.radius;

        if (bottomEdge > canvas.height) {
            this.y = canvas.height - this.radius;
            this.velocityY *= -0.7; // dampening effect on bounce, changing the bounce intensity
        }

        this.drawCircle();
    }
}

function getRandomColour() {
    const letters = '0123456789ABCDEF';
    let colour = '#';
    for (let i = 0; i < 6; i++) {
        colour += letters[Math.floor(Math.random() * 16)];
    }
    return colour;
}

function spawnBall(x, y) {
    if (balls.length < maxBalls) {
        const radius = 20;
        const newBall = new Ball(x, y, radius);
        balls.push(newBall); // adding a new ball to the array
    } 
}

function tick(currentTime) {
    const deltaTime = currentTime - lastTime;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < balls.length; i++) {
        balls[i].update(deltaTime); // updating each ball's position
    }

    lastTime = currentTime;
    requestAnimationFrame(tick);
}

requestAnimationFrame(tick);

canvas.addEventListener('click', function (event) {
    const clickX = event.offsetX;
    const clickY = event.offsetY;
    spawnBall(clickX, clickY); // spawning a new ball at the click position
});