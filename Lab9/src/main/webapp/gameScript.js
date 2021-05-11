const TILE_SIZE = 20;

const LEFT_ARROW_CODE = 37;
const UP_ARROW_CODE = 38;
const RIGHT_ARROW_CODE = 39;
const DOWN_ARROW_CODE = 40;
const ESC_CODE = 27;

class GameEngine {
    constructor() {
        this.userID = 0;
        this.directionCode = -1;
        this.status = true;
        this.snake = [];
        this.obstacles = [];
        this.score = 0;
        this.nextFoodCoordinates = {x: 0, y: 0};
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
        this.snake.forEach(snakePart => this.drawSnakePart(snakePart));
    }

    drawFood() {
        this.boardContext.fillStyle = 'red';
        this.boardContext.fillRect(this.nextFoodCoordinates.x * TILE_SIZE, this.nextFoodCoordinates.y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    }

    drawObstacle(obstacle) {
        this.boardContext.fillStyle = 'black';
        this.boardContext.fillRect(obstacle.x * TILE_SIZE, obstacle.y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    }

    drawObstacles() {
        this.obstacles.forEach(obstacle => this.drawObstacle(obstacle));
    }

    drawEverything() {
        this.clearBoard();
        this.drawSnake();
        this.drawFood();
        this.drawObstacles();
    }

    endGame() {
        $("#gameStatus").html("<p>Game over. Score = " + this.score + "</p>");
    }

    pressKey(event) {
        let validKeys = [LEFT_ARROW_CODE, UP_ARROW_CODE, RIGHT_ARROW_CODE, DOWN_ARROW_CODE];
        if (validKeys.includes(event.which)) {
            this.directionCode = event.which - LEFT_ARROW_CODE;
            let gameEngineObject = this;
            $.get("game", {changeDirection: this.directionCode}).done(function() {
                ;
            });
        }
        else if (event.which === ESC_CODE) {
            //this.endGame();
            // send end game request to server
        }
    }

    setVolatileData(response) {
        // volatile data = that which changes after each move
        this.directionCode = parseInt(response["directionCode"]);
        this.status = (response["status"] === "true"); // parse boolean
        this.snake = parseCoordinates(response["snake"]);
        this.score = parseInt(response["score"]);
        this.nextFoodCoordinates = parseCoordinate(response["food"]);
    }

    gameLoop() {
        let gameEngineObject = this;
        $.get("game", {moveOneStep: "true"}).done(function(response) {
            setTimeout(function() {
                gameEngineObject.setVolatileData(response);
                if (response["status"] === true) {
                    gameEngineObject.endGame();
                    gameEngineObject.drawEverything();
                }
                else {
                    gameEngineObject.drawEverything();
                    gameEngineObject.gameLoop();
                }
            }, 100);

        });
    }
}

function parseCoordinate(coordinateAsString) {
    let coord = {x: 0, y: 0};
    coord.x = parseInt(coordinateAsString.slice(0, 2));
    coord.y = parseInt(coordinateAsString.slice(2, 4));
    return coord;
}

function parseCoordinates(coordinatesAsString) {
    let result = [];
    for (let i = 0; i < coordinatesAsString.length / 4; i++) {
        result.push(parseCoordinate(coordinatesAsString.slice(i * 4, (i + 1) * 4)));
    }
    return result;
}

$(document).ready(function() {
    $.get("game", {startGame: "true"}).done(function(response) {
        const gameEngine = new GameEngine();
        gameEngine.setVolatileData(response);
        gameEngine.userID = parseInt(response["userID"]);
        gameEngine.obstacles = parseCoordinates(response["obstacles"]);
        gameEngine.drawEverything();
        gameEngine.gameLoop();
    });
});