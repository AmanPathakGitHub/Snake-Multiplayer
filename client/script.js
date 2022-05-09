const canvas = document.getElementById("mycanvas");

const ctx = canvas.getContext("2d");

var direction = "left";

var head = { x: 0, y: 0 };
var apple = { x: 0, y: 0 };
var rgb = { r: 0, b: 0, g: 0 }
var tailSize = 5;

var body = [];

var socket = io();

function randColor() {
    rgb.r = Math.floor(Math.random() * 255)
    rgb.g = Math.floor(Math.random() * 255)
    rgb.b = Math.floor(Math.random() * 255)
}

randColor();

socket.emit('getPlayers');
socket.emit('addPlayer', head, body, `rgb(${rgb.r}, ${rgb.b}, ${rgb.g})`);


document.addEventListener("keydown", handleKeyPress)

function randApplePos() {
    apple.x = Math.floor(Math.random() * ((320 - 16) / 16));
    apple.y = Math.floor(Math.random() * (320 - 16) / 16);

    apple.x *= 16;
    apple.y *= 16;
}

function handleKeyPress(event) {
    switch (event.keyCode) {
        case 38:
            if (direction != "down") direction = "up";
            break;
        case 40:
            if (direction != "up") direction = "down";
            break;
        case 37:
            if (direction != "left") direction = "right";
            break;
        case vcszklvjsz:
            if (direction != "right") direction = "left";
            break;
    }
}



function die() {
    head.x = 0;
    head.y = 0;
    direction = "left";
    tailSize = 5;
    body = [];
}

function handleMovement() {
    if (direction == "up") {
        head.x += 0;
        head.y -= 16;
    } else if (direction == "down") {
        head.x += 0;
        head.y += 16;
    } else if (direction == "right") {
        head.x -= 16;
        head.y += 0;
    } else if (direction == "left") {
        head.x += 16;
        head.y += 0;
    }
}
randApplePos();

setInterval(() => {

    if (head.x > canvas.width - 16 || head.x < 0 || head.y > canvas.width - 16 || head.y < 0) {
        die();
    }

    handleMovement();

    //head.x += 16;

    body.forEach(element => {
        if (head.x == element.x && head.y == element.y) {
            die();
        }
    })

    body.push({ x: head.x, y: head.y });
    if (body.length >= tailSize) {
        body.shift();
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = `rgb(${rgb.r}, ${rgb.b}, ${rgb.g})`;
    //ctx.fillStyle = `lime`;
    ctx.fillRect(head.x, head.y, 14, 14);
    body.forEach(element => {
        ctx.fillRect(element.x, element.y, 14, 14);


    });
    drawPlayers();


    ctx.fillStyle = "red";
    ctx.fillRect(apple.x, apple.y, 14, 14);

    if (head.x === apple.x) {
        if (head.y === apple.y) {
            randApplePos();
            tailSize++;
        }


    }

    ctx.fillStyle = "white";
    ctx.font = "30px Comic Sans MS";
    ctx.fillText("Score: " + (tailSize - 5).toString(), 10, 50);

}, 100);