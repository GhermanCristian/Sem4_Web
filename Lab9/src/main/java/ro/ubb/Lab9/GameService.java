package ro.ubb.Lab9;

import java.sql.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

public class GameService {
    private List<GameEntity> games;
    public GameService() {
        this.games = new ArrayList<>();
        this.loadGamesFromDB();
    }

    private CoordinatePair generateCoordinatePair() {
        return new CoordinatePair(ThreadLocalRandom.current().nextInt(0, GameEntity.BOARD_SIZE), ThreadLocalRandom.current().nextInt(0, GameEntity.BOARD_SIZE));
    }

    private CoordinatePair generateFoodCoordinates(List<CoordinatePair> snake) {
        CoordinatePair foodCoordinates;
        while (true) {
            foodCoordinates = this.generateCoordinatePair();
            if (!snake.contains(foodCoordinates)) {
                return foodCoordinates;
            }
        }
    }

    private CoordinatePair generateObstacleCoordinates(List<CoordinatePair> snake, List<CoordinatePair> obstacles, CoordinatePair food) {
        CoordinatePair obstacleCoordinates;
        while (true) {
            obstacleCoordinates = this.generateCoordinatePair();
            if (!(snake.contains(obstacleCoordinates) || obstacles.contains(obstacleCoordinates) || food.equals(obstacleCoordinates))) {
                return obstacleCoordinates;
            }
        }
    }

    private GameEntity initializeNewGame(int userID) {
        GameEntity newGame = new GameEntity();
        newGame.setID(0);
        newGame.setUserID(userID);
        newGame.setStatus(false);
        newGame.setScore(0);
        newGame.setSnake(Arrays.asList(new CoordinatePair(1, 5), new CoordinatePair(1, 4), new CoordinatePair(1, 3), new CoordinatePair(1, 2), new CoordinatePair(1, 1), new CoordinatePair(1, 0)));
        newGame.setFoodPosition(this.generateFoodCoordinates(newGame.getSnake()));
        newGame.setObstacles(new ArrayList<>());
        for (int i = 0; i < GameEntity.OBSTACLE_COUNT; i++) {
            newGame.getObstacles().add(this.generateObstacleCoordinates(newGame.getSnake(), newGame.getObstacles(), newGame.foodPosition));
        }
        return newGame;
    }

    private void loadGamesFromDB() {
        try(Connection connection = DBConnection.initializeDB()) {
            Statement selectAll = connection.createStatement();
            ResultSet allGames = selectAll.executeQuery("SELECT id, userID, status, score, snake, obstacles, food FROM game");
            allGames.next();
            while (allGames.next()) {
                GameEntity newGame = new GameEntity();
                newGame.setID(allGames.getInt(1));
                newGame.setUserID(allGames.getInt(2));
                newGame.setStatus(allGames.getBoolean(3));
                newGame.setScore(allGames.getInt(4));
                newGame.setSnake(allGames.getString(5));
                newGame.setObstacles(allGames.getString(6));
                newGame.setFoodPosition(allGames.getString(7));
                this.games.add(newGame);
            }
            allGames.close();
            selectAll.close();
        }
        catch (SQLException | ClassNotFoundException throwables) {
            throwables.printStackTrace();
        }
    }

    private GameEntity addNewGameToDB(int userID) {
        GameEntity newGame = this.initializeNewGame(userID);
        try(Connection connection = DBConnection.initializeDB()) {
            PreparedStatement insertNewGame = connection.prepareStatement("INSERT INTO game(userID, status, score, snake, obstacles, food) VALUES (?, ?, ?, ?, ?, ?)", Statement.RETURN_GENERATED_KEYS);
            insertNewGame.setInt(1, newGame.getUserID());
            insertNewGame.setBoolean(2, newGame.getStatus());
            insertNewGame.setInt(3, newGame.getScore());
            insertNewGame.setString(4, newGame.getSnakeAsString());
            insertNewGame.setString(5, newGame.getObstaclesAsString());
            insertNewGame.setString(6, newGame.getFoodPosition().toString());
            int affectedRows = insertNewGame.executeUpdate(); // if == 0 => error
            ResultSet generatedKeys = insertNewGame.getGeneratedKeys();
            if (generatedKeys.next()) {
                newGame.setID(generatedKeys.getInt(1));
            }
            insertNewGame.close();
            generatedKeys.close();
        }
        catch (SQLException | ClassNotFoundException throwables) {
            throwables.printStackTrace();
        }
        return newGame;
    }

    public void addNewGame(int userID) {
        this.games.add(this.addNewGameToDB(userID));
    }

    public void updateGame(GameEntity game) {

    }
}
