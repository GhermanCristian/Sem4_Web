package ro.ubb.Lab9;

import java.util.List;
import java.util.Objects;

public class GameEntity {
    public static final int OBSTACLE_COUNT = 10;
    public static final int BOARD_SIZE = 20; // in number of tiles

    private int ID;
    private int userID;
    private boolean status;
    private int score;
    List<CoordinatePair> snake;
    List<CoordinatePair> obstacles;
    CoordinatePair foodPosition;

    public GameEntity() {}

    public GameEntity(int ID,
                      int userID,
                      boolean status,
                      int score,
                      List<CoordinatePair> snake,
                      List<CoordinatePair> obstacles,
                      CoordinatePair foodPosition) {
        this.ID = ID;
        this.userID = userID;
        this.status = status;
        this.score = score;
        this.snake = snake;
        this.obstacles = obstacles;
        this.foodPosition = foodPosition;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        GameEntity that = (GameEntity) o;
        return ID == that.ID && userID == that.userID && status == that.status && score == that.score && snake.equals(that.snake) && obstacles.equals(that.obstacles) && foodPosition.equals(that.foodPosition);
    }

    @Override
    public int hashCode() {
        return Objects.hash(ID, userID, status, score, snake, obstacles, foodPosition);
    }

    public int getID() {
        return ID;
    }

    public void setID(int ID) {
        this.ID = ID;
    }

    public int getUserID() {
        return userID;
    }

    public void setUserID(int userID) {
        this.userID = userID;
    }

    public boolean getStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public List<CoordinatePair> getSnake() {
        return snake;
    }

    public String getSnakeAsString() {
        StringBuilder result = new StringBuilder();
        this.snake.forEach(snakePart -> result.append(snakePart.toString()));
        return result.toString();
    }

    public void setSnake(List<CoordinatePair> snake) {
        this.snake = snake;
    }

    public void setSnake(String snakeAsString) {
        this.snake.clear();
        for (int coordAsString = 0; coordAsString < snakeAsString.length() / 4; coordAsString++) {
            this.snake.add(new CoordinatePair(snakeAsString.substring(coordAsString * 4, (coordAsString + 1) * 4)));
        }
    }

    public List<CoordinatePair> getObstacles() {
        return obstacles;
    }

    public String getObstaclesAsString() {
        StringBuilder result = new StringBuilder();
        this.obstacles.forEach(obstacle -> result.append(obstacle.toString()));
        return result.toString();
    }

    public void setObstacles(List<CoordinatePair> obstacles) {
        this.obstacles = obstacles;
    }

    public void setObstacles(String obstaclesAsString) {
        this.obstacles.clear();
        for (int coordAsString = 0; coordAsString < obstaclesAsString.length() / 4; coordAsString++) {
            this.obstacles.add(new CoordinatePair(obstaclesAsString.substring(coordAsString * 4, (coordAsString + 1) * 4)));
        }
    }

    public CoordinatePair getFoodPosition() {
        return foodPosition;
    }

    public void setFoodPosition(CoordinatePair foodPosition) {
        this.foodPosition = foodPosition;
    }

    public void setFoodPosition(String foodPositionAsString) {
        this.foodPosition = new CoordinatePair(foodPositionAsString);
    }
}
