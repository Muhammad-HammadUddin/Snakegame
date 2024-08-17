const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
const scoreText = document.querySelector("#scoreText");
const resetBtn = document.querySelector(".resetBtn");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;  
const boardBackground = "white";
const snakeColor = "lightgreen";
const snakeBorder = "black";
const foodColor = "red";
const unitsize = 25;
let running = false;
let xVelocity = unitsize;
let yVelocity = 0;
let foodX;
let foodY;
let score = 0;
let snake = [
    {x: unitsize * 4, y: 0},
    {x: unitsize * 3, y: 0},
    {x: unitsize * 2, y: 0},
    {x: unitsize, y: 0},
    {x: 0, y: 0},
];

window.addEventListener("keydown", changeDirection);
resetBtn.addEventListener("click", resetGame);

gamestart();

function gamestart() {
    running = true;
    scoreText.textContent = score;
    createfood();
    drawfood();
    nextTick();
}

function nextTick() {
    if (running) {
        setTimeout(() => {
            clearboard();
            drawfood();
            movesnake();
            drawsnake();
            checkGameOver();
            nextTick();
        }, 100);
    } else {
        displayGameOver();
    }
}

function clearboard() {
    ctx.fillStyle = boardBackground;
    ctx.fillRect(0, 0, gameWidth, gameHeight);
}

function createfood() {
    function randomFood(min, max) {
        const randNum = Math.round((Math.random() * (max - min) + min) / unitsize) * unitsize;
        return randNum; 
    }
    foodX = randomFood(0, gameWidth - unitsize);
    foodY = randomFood(0, gameHeight - unitsize);
}

function drawfood() {
    ctx.fillStyle = foodColor;
    ctx.fillRect(foodX, foodY, unitsize, unitsize);
}

function movesnake() {
    const head = {x: snake[0].x + xVelocity, y: snake[0].y + yVelocity};
    snake.unshift(head);
    if (snake[0].x == foodX && snake[0].y == foodY) {
        score++;
        scoreText.textContent = score;
        createfood();
    } else {
        snake.pop();
    }
}

function drawsnake() {
    ctx.fillStyle = snakeColor;
    ctx.strokeStyle = snakeBorder;
    snake.forEach(snakePart => {
        ctx.fillRect(snakePart.x, snakePart.y, unitsize, unitsize);
    });
}

function changeDirection(event) {
    const keyPressed = event.keyCode;
    const LEFT = 37;
    const UP = 38;
    const RIGHT = 39;
    const DOWN = 40;

    const goingUp = (yVelocity == -unitsize);
    const goingDown = (yVelocity == unitsize);
    const goingRight = (xVelocity == unitsize);
    const goingLeft = (xVelocity == -unitsize);
    
    switch(true) {
        case (keyPressed == LEFT && !goingRight):
            xVelocity = -unitsize; 
            yVelocity = 0;
            break;
        case (keyPressed == UP && !goingDown):
            xVelocity = 0; 
            yVelocity = -unitsize;
            break;
        case (keyPressed == RIGHT && !goingLeft):
            xVelocity = unitsize; 
            yVelocity = 0;
            break;
        case (keyPressed == DOWN && !goingUp):
            xVelocity = 0; 
            yVelocity = unitsize;
            break;
    }
}

function checkGameOver() {
    switch(true) {
        case (snake[0].x < 0):
        case (snake[0].x >= gameWidth):
        case (snake[0].y < 0):
        case (snake[0].y >= gameHeight):
            running = false;
            break;
    }
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            running = false;
            break;
        }
    }
}

function displayGameOver() {
    ctx.font = "48px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("Game Over!", gameWidth / 2, gameHeight / 2);
    running = false;
}

function resetGame() {
    score = 0;
    xVelocity = unitsize;
    yVelocity = 0;
    snake = [
        {x: unitsize * 4, y: 0},
        {x: unitsize * 3, y: 0},
        {x: unitsize * 2, y: 0},
        {x: unitsize, y: 0},
        {x: 0, y: 0},
    ];
    gamestart();
}
