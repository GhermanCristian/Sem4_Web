const BOARD_SIZE = 20; // no. of tiles
const TILE_SIZE = 20;
const DIRECTIONS_X = [0, 1, 0, -1]; // up, left, down, right
const DIRECTIONS_Y = [-1, 0, 1, 0];

function drawSnakePart(snakePart, boardContext) {
    boardContext.fillStyle = 'lightblue';
    boardContext.strokeStyle = 'darkblue';
    boardContext.fillRect(snakePart.x * TILE_SIZE, snakePart.y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    boardContext.strokeRect(snakePart.x * TILE_SIZE, snakePart.y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
}

function clearBoard(boardContext) {
    boardContext.fillStyle = 'lightblue';
    boardContext.strokeStyle = 'darkblue';
    boardContext.fillRect(0, 0, 400, 400);
    boardContext.strokeRect(0, 0, 400, 400);
}

function drawSnake(snake, boardContext) {
    clearBoard(boardContext);
    snake.forEach(snakePart => drawSnakePart(snakePart, boardContext));
}

function moveSnakeOneStep(snake, boardContext, directionIndex) {
    let newHead = {x: snake[0].x + DIRECTIONS_X[directionIndex], y: snake[0].y + DIRECTIONS_Y[directionIndex]};
    snake.unshift(newHead);
    snake.pop();
    // send request to server with the move
}

$(document).ready(function() {
    const boardCanvas = document.getElementById("boardCanvas");
    const boardContext = boardCanvas.getContext("2d");
    let snake = [{x: 1, y: 3}, {x: 1, y: 2}, {x: 1, y: 1}, {x: 1, y: 0}, ];

    drawSnake(snake, boardContext);
    moveSnakeOneStep(snake, boardContext, 1);
    moveSnakeOneStep(snake, boardContext, 2);
    moveSnakeOneStep(snake, boardContext, 1);
    drawSnake(snake, boardContext);
});