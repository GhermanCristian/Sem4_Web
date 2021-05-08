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
    
    moveSnakeOneStep() {
        if (this.pressedKeyCode === -1) {
            return;
        }

        let newHead = {x: this.snake[0].x + DIRECTIONS_X[this.pressedKeyCode], y: this.snake[0].y + DIRECTIONS_Y[this.pressedKeyCode]};
        this.snake.unshift(newHead);
        this.snake.pop();
        // send request to server with the move
    }

    pressKey(event) {
        let validKeys = [LEFT_ARROW_CODE, UP_ARROW_CODE, RIGHT_ARROW_CODE, DOWN_ARROW_CODE];
        if (validKeys.includes(event.which)) {
            this.pressedKeyCode = event.which - LEFT_ARROW_CODE;
        }
        else if (event.which === ESC_CODE) {
            this.running = false;
        }
    }

    gameLoop() {
        let gameEngineObject = this;
        setTimeout(function() {
            if (gameEngineObject.running === true) {
                gameEngineObject.drawSnake();
                gameEngineObject.moveSnakeOneStep();
                gameEngineObject.gameLoop();
            }
        }, 500);
    }
}

$(document).ready(function() {
    const gameEngine = new GameEngine();
    gameEngine.gameLoop();
});