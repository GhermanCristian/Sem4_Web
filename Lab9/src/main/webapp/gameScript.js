const TILE_SIZE = 20;

const LEFT_ARROW_CODE = 37;
const UP_ARROW_CODE = 38;
const RIGHT_ARROW_CODE = 39;
const DOWN_ARROW_CODE = 40;
const ESC_CODE = 27;

class GameEngine {
    constructor() {
        this.obstacles = [];
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

    drawSnake(snake) {
        snake.forEach(snakePart => this.drawSnakePart(snakePart));
    }

    drawFood(nextFoodCoordinates) {
        this.boardContext.fillStyle = 'red';
        this.boardContext.fillRect(nextFoodCoordinates.x * TILE_SIZE, nextFoodCoordinates.y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    }

    drawObstacle(obstacle) {
        this.boardContext.fillStyle = 'black';
        this.boardContext.fillRect(obstacle.x * TILE_SIZE, obstacle.y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    }

    drawObstacles() {
        this.obstacles.forEach(obstacle => this.drawObstacle(obstacle));
    }

    drawEverything(snake, nextFoodCoordinates, score) {
        this.clearBoard();
        this.drawSnake(snake);
        this.drawFood(nextFoodCoordinates);
        this.drawObstacles();
        $("#gameStatus").html("<p>Score: " + score + "</p>");
    }

    endGame(score) {
        $("#gameStatus").html("<p>Game over. Score = " + score + "</p>");
    }

    pressKey(event) {
        let validKeys = [LEFT_ARROW_CODE, UP_ARROW_CODE, RIGHT_ARROW_CODE, DOWN_ARROW_CODE];
        if (validKeys.includes(event.which)) {
            let directionCode = event.which - LEFT_ARROW_CODE;
            $.get("game", {changeDirection: directionCode}).done(function() {
                // this request should be a put or sth
            });
        }
        else if (event.which === ESC_CODE) {
            //this.endGame();
            // send end game request to server
        }
    }

    gameLoop() {
        let gameEngineObject = this;
        $.get("game", {moveOneStep: "true"}).done(function(response) {
            setTimeout(function() {
                let status = response["status"]; // apparently this was boolean
                let snake = parseCoordinates(response["snake"]);
                let score = parseInt(response["score"]);
                let nextFoodCoordinates = parseCoordinate(response["food"]);
                console.log(typeof response["status"]);
                if (status === true) { // game has ended
                    gameEngineObject.endGame(score);
                    gameEngineObject.drawEverything(snake, nextFoodCoordinates, score);
                }
                else {
                    gameEngineObject.drawEverything(snake, nextFoodCoordinates, score);
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
        $("#nameTag").html("<p>You are user: " + response["username"] + "</p>");
        gameEngine.obstacles = parseCoordinates(response["obstacles"]);
        gameEngine.drawEverything(parseCoordinates(response["snake"]), parseCoordinate(response["food"]), parseInt(response["score"]));
        gameEngine.gameLoop();
    });
});