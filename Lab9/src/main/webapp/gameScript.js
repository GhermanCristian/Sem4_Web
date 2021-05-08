const BOARD_SIZE = 20; // no. of tiles
const TILE_SIZE = 20;
const DIRECTIONS_X = [-1, 0, 1, 0]; // left, up, right, down
const DIRECTIONS_Y = [0, -1, 0, 1];

const LEFT_ARROW_CODE = 37;
const UP_ARROW_CODE = 38;
const RIGHT_ARROW_CODE = 39;
const DOWN_ARROW_CODE = 40;
const ESC_CODE = 27;

class GameEngine {
    constructor() {
        this.pressedKeyCode = -1;
        this.running = true;
        this.snake = [{x: 1, y: 3}, {x: 1, y: 2}, {x: 1, y: 1}, {x: 1, y: 0}, ];
        this.boardCanvas = document.getElementById("boardCanvas");
        this.boardContext = this.boardCanvas.getContext("2d");

        const gameEngineObj = this;
        $(document).keydown(function(event) {
            return gameEngineObj.pressKey(event);
        });

        this.generateNewFoodCoordinates();
    }

    generateNewFoodCoordinates() {
        let foundCoords = false;
        do{
            let newCoords = {x: Math.floor(Math.random() * BOARD_SIZE), y: Math.floor(Math.random() * BOARD_SIZE)};
            if (! this.snake.includes(newCoords)) {
                this.nextFoodCoordinates = newCoords;
                foundCoords = true;
            }
        }
        while(! foundCoords);
    }

    drawSnakePart(snakePart) {
        this.boardContext.fillStyle = 'lightblue';
        this.boardContext.strokeStyle = 'darkblue';
        this.boardContext.fillRect(snakePart.x * TILE_SIZE, snakePart.y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
        this.boardContext.strokeRect(snakePart.x * TILE_SIZE, snakePart.y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    }

    clearBoard() {
        this.boardContext.fillStyle = 'lightblue';
        this.boardContext.strokeStyle = 'darkblue';
        this.boardContext.fillRect(0, 0, 400, 400);
        this.boardContext.strokeRect(0, 0, 400, 400);
    }

    drawSnake() {
        this.clearBoard();
        this.snake.forEach(snakePart => this.drawSnakePart(snakePart));
    }

    drawFood() {
        this.boardContext.fillStyle = 'red';
        this.boardContext.fillRect(this.nextFoodCoordinates.x * TILE_SIZE, this.nextFoodCoordinates.y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    }

    endGame() {
        this.running = false;
        $("#gameStatus").html("<p>Game Over</p>");
    }

    moveSnakeOneStep() {
        if (this.pressedKeyCode === -1) {
            return;
        }

        let newHead = {x: this.snake[0].x + DIRECTIONS_X[this.pressedKeyCode], y: this.snake[0].y + DIRECTIONS_Y[this.pressedKeyCode]};
        if (newHead.x < 0 || newHead.x >= BOARD_SIZE || newHead.y < 0 || newHead.y >= BOARD_SIZE) {
            this.endGame();
        }
        if (newHead.x === this.nextFoodCoordinates.x && newHead.y === this.nextFoodCoordinates.y) { // on the food coord
            this.generateNewFoodCoordinates(); // when on food we don't remove the tail because we 'increase' the snake by 1
        }
        else {
            this.snake.pop();
        }
        this.snake.unshift(newHead);
        // send request to server with the move
    }

    pressKey(event) {
        let validKeys = [LEFT_ARROW_CODE, UP_ARROW_CODE, RIGHT_ARROW_CODE, DOWN_ARROW_CODE];
        if (validKeys.includes(event.which)) {
            this.pressedKeyCode = event.which - LEFT_ARROW_CODE;
        }
        else if (event.which === ESC_CODE) {
            this.endGame();
        }
    }

    gameLoop() {
        let gameEngineObject = this;
        setTimeout(function() {
            if (gameEngineObject.running === true) {
                gameEngineObject.drawSnake();
                gameEngineObject.drawFood();
                gameEngineObject.moveSnakeOneStep();
                gameEngineObject.gameLoop();
            }
        }, 300);
    }
}

$(document).ready(function() {
    const gameEngine = new GameEngine();
    gameEngine.gameLoop();
});