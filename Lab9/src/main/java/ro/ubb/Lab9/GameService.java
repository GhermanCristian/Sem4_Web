package ro.ubb.Lab9;

import java.sql.*;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;
import java.util.stream.Collectors;

public class GameService {
    private List<GameEntity> games;
    private final int[] directionsX = {-1, 0, 1, 0};
    private final int[] directionsY = {0, -1, 0, 1};

    public GameService() {
        this.games = new ArrayList<>();
        this.loadGamesFromDB();
    }

    private CoordinatePair generateCoordinatePair() {
        return new CoordinatePair(ThreadLocalRandom.current().nextInt(0, GameEntity.BOARD_SIZE), ThreadLocalRandom.current().nextInt(0, GameEntity.BOARD_SIZE));
    }

    private CoordinatePair generateFoodCoordinates(List<CoordinatePair> snake, List<CoordinatePair> obstacles) {
        CoordinatePair foodCoordinates;
        while (true) {
            foodCoordinates = this.generateCoordinatePair();
            if (!(snake.contains(foodCoordinates) || obstacles.contains(foodCoordinates))) {
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
        for (int y = 5; y >= 0; y--) {
            newGame.getSnake().add(new CoordinatePair(1, y));
        } // can't use arrays.asList because we will need to add/remove from this, and it would've been read only
        newGame.setFoodPosition(this.generateFoodCoordinates(newGame.getSnake(), newGame.getObstacles()));
        newGame.setObstacles(new ArrayList<>());
        for (int i = 0; i < GameEntity.OBSTACLE_COUNT; i++) {
            newGame.getObstacles().add(this.generateObstacleCoordinates(newGame.getSnake(), newGame.getObstacles(), newGame.getFoodPosition()));
        }
        newGame.setDirectionCode(2); // workaround so that when the game starts automatically, the snake doesn't hit itself (it goes straight down)
        newGame.setGameLength(System.currentTimeMillis());
        return newGame;
    }

    private void loadGamesFromDB() {
        try(Connection connection = DBConnection.initializeDB()) {
            Statement selectAll = connection.createStatement();
            ResultSet allGames = selectAll.executeQuery("SELECT id, userID, status, score, snake, obstacles, food, directionCode, gameLength FROM game");
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
                newGame.setDirectionCode(allGames.getInt(8));
                newGame.setGameLength(allGames.getLong(9));
                this.games.add(newGame);
            }
            allGames.close();
            selectAll.close();
        }
        catch (SQLException | ClassNotFoundException throwables) {
            throwables.printStackTrace();
        }
    }

    public List<ResultEntity> getLeaderboard() {
        List<ResultEntity> results = new ArrayList<>();
        try(Connection connection = DBConnection.initializeDB()) {
            Statement selectAll = connection.createStatement();
            ResultSet sortedGames = selectAll.executeQuery("SELECT U.username, G.score, G.gameLength FROM game G INNER JOIN user U ON G.userID = U.ID ORDER BY G.score DESC LIMIT 20");
            sortedGames.next();
            while (sortedGames.next()) {
                ResultEntity result = new ResultEntity(sortedGames.getString(1), sortedGames.getInt(2), sortedGames.getLong(3));
                results.add(result);
            }
            sortedGames.close();
            selectAll.close();
        }
        catch (SQLException | ClassNotFoundException throwables) {
            throwables.printStackTrace();
        }
        return results;
    }

    private GameEntity addNewGameToDB(int userID) {
        GameEntity newGame = this.initializeNewGame(userID);
        try(Connection connection = DBConnection.initializeDB()) {
            PreparedStatement insertNewGame = connection.prepareStatement("INSERT INTO game(userID, status, score, snake, obstacles, food, directionCode, gameLength) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", Statement.RETURN_GENERATED_KEYS);
            insertNewGame.setInt(1, newGame.getUserID());
            insertNewGame.setBoolean(2, newGame.getStatus());
            insertNewGame.setInt(3, newGame.getScore());
            insertNewGame.setString(4, newGame.getSnakeAsString());
            insertNewGame.setString(5, newGame.getObstaclesAsString());
            insertNewGame.setString(6, newGame.getFoodPosition().toString());
            insertNewGame.setInt(7, newGame.getDirectionCode());
            insertNewGame.setLong(8, newGame.getGameLength());
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

    public GameEntity addNewGame(int userID) {
        GameEntity newGame = this.addNewGameToDB(userID);
        this.games.add(newGame);
        return newGame;
    }

    private void updateGameInDB(GameEntity game) {
        try(Connection connection = DBConnection.initializeDB()) {
            PreparedStatement updateGame = connection.prepareStatement("UPDATE game SET status = ?, score = ?, snake = ?, food = ?, directionCode = ?, gameLength = ? WHERE ID = ?");
            updateGame.setBoolean(1, game.getStatus());
            updateGame.setInt(2, game.getScore());
            updateGame.setString(3, game.getSnakeAsString());
            updateGame.setString(4, game.getFoodPosition().toString());
            updateGame.setInt(5, game.getDirectionCode());
            updateGame.setLong(6, game.getGameLength());
            updateGame.setInt(7, game.getID());
            updateGame.executeUpdate();
            updateGame.close();
        }
        catch (SQLException | ClassNotFoundException throwables) {
            throwables.printStackTrace();
        }
    }

    private void endGame(GameEntity currentGame) {
        currentGame.setStatus(true);
        currentGame.setGameLength(System.currentTimeMillis() - currentGame.getGameLength());
    }

    public GameEntity moveSnakeOneStep(int gameID) {
        GameEntity currentGame = this.games.stream().filter(game -> game.getID() == gameID).findFirst().orElseThrow(RuntimeException::new);
        if (currentGame.getStatus()) {
            return currentGame; // game is over or hasn't started yet (and we're not gonna do requests until the user starts the game)
        }

        CoordinatePair snakeHead = currentGame.getSnake().get(0);
        CoordinatePair newHead = new CoordinatePair(snakeHead.x + this.directionsX[currentGame.getDirectionCode()], snakeHead.y + this.directionsY[currentGame.getDirectionCode()]);

        if (newHead.x < 0 || newHead.x >= GameEntity.BOARD_SIZE || newHead.y < 0 || newHead.y >= GameEntity.BOARD_SIZE ||
            currentGame.getSnake().contains(newHead) || currentGame.getObstacles().contains(newHead)) {
            this.endGame(currentGame);
        }
        else if (newHead.equals(currentGame.getFoodPosition())) { // found food
            currentGame.setScore(currentGame.getScore() + 1);
            currentGame.setFoodPosition(this.generateFoodCoordinates(currentGame.getSnake(), currentGame.getObstacles()));
            currentGame.getSnake().add(0, newHead);
            // when on food we don't remove the tail because we 'increase' the snake by 1
        }
        else {
            // normally we should check that the snake length > 0, but that will never be the case
            int lastPosition = currentGame.getSnake().size() - 1;
            currentGame.getSnake().remove(lastPosition);
            currentGame.getSnake().add(0, newHead);
        }

        this.updateGameInDB(currentGame);

        return currentGame;
    }

    public void changeDirection(int newDirectionCode, int gameID) {
        GameEntity currentGame = this.games.stream().filter(game -> game.getID() == gameID).findFirst().orElseThrow(RuntimeException::new);
        currentGame.setDirectionCode(newDirectionCode);
        this.updateGameInDB(currentGame);
    }
}
