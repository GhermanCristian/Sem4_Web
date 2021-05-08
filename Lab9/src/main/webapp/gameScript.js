const BOARD_SIZE = 20; // no. of tiles
const TILE_SIZE = 20;

function drawSnakePart(snakePart, boardContext) {
    boardContext.fillStyle = 'lightblue';
    boardContext.strokestyle = 'darkblue';
    boardContext.fillRect(snakePart.x, snakePart.y, TILE_SIZE, TILE_SIZE);
    boardContext.strokeRect(snakePart.x, snakePart.y, TILE_SIZE, TILE_SIZE);
}

function drawSnake(snake, boardContext) {
    snake.forEach(snakePart => drawSnakePart(snakePart, boardContext));
}

$(document).ready(function() {
    const boardCanvas = document.getElementById("boardCanvas");
    const boardContext = boardCanvas.getContext("2d");
    let snake = [  {x: 200, y: 200},  {x: 180, y: 200},  {x: 160, y: 200},  {x: 140, y: 200},  {x: 120, y: 200},];
    drawSnake(snake, boardContext);
});