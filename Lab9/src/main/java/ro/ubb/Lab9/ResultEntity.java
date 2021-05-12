package ro.ubb.Lab9;

public class ResultEntity {
    private String username;
    private int score;
    private long gameLength;

    public ResultEntity(String username, int score, long gameLength) {
        this.username = username;
        this.score = score;
        this.gameLength = gameLength;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public long getGameLength() {
        return gameLength;
    }

    public void setGameLength(long gameLength) {
        this.gameLength = gameLength;
    }
}
