const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gridSize = 20;
const tileSize = canvas.width / gridSize;
let snake = [{ x: 10, y: 10 }];
let direction = { x: 0, y: 0 };
let food = { x: 5, y: 5 };
let score = 0;
let speed = 100;
let level = 1;

const colors = ["red", "green", "blue", "yellow", "purple", "orange", "pink"];

function gameLoop() {
    update();
    draw();
}

function update() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        updateScore();
        placeFood();
    } else {
        snake.pop();
    }

    if (head.x < 0 || head.y < 0 || head.x >= gridSize || head.y >= gridSize || snakeCollision(head)) {
        resetGame();
    }

    if (score > level * 50) {
        level++;
        speed -= 10;
        updateLevel();
        clearInterval(gameInterval);
        gameInterval = setInterval(gameLoop, speed);
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    snake.forEach((segment, index) => {
        ctx.fillStyle = colors[index % colors.length];
        ctx.fillRect(segment.x * tileSize, segment.y * tileSize, tileSize, tileSize);
    });

    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * tileSize, food.y * tileSize, tileSize, tileSize);
}

function placeFood() {
    food.x = Math.floor(Math.random() * gridSize);
    food.y = Math.floor(Math.random() * gridSize);
}

function snakeCollision(head) {
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
            return true;
        }
    }
    return false;
}

function resetGame() {
    snake = [{ x: 10, y: 10 }];
    direction = { x: 0, y: 0 };
    score = 0;
    level = 1;
    speed = 100;
    updateScore();
    updateLevel();
    placeFood();
}

function updateScore() {
    document.getElementById('score').innerText = `Score: ${score}`;
}

function updateLevel() {
    document.getElementById('level').innerText = `Level: ${level}`;
}

document.addEventListener('keydown', event => {
    switch (event.key) {
        case 'ArrowUp':
            if (direction.y === 0) direction = { x: 0, y: -1 };
            break;
        case 'ArrowDown':
            if (direction.y === 0) direction = { x: 0, y: 1 };
            break;
        case 'ArrowLeft':
            if (direction.x === 0) direction = { x: -1, y: 0 };
            break;
        case 'ArrowRight':
            if (direction.x === 0) direction = { x: 1, y: 0 };
            break;
    }
});

let gameInterval = setInterval(gameLoop, speed);
