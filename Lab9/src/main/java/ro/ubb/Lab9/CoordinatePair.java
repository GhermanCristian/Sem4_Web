package ro.ubb.Lab9;

import java.util.Objects;

public class CoordinatePair {
    public int x;
    public int y;

    public CoordinatePair() {
        this.x = 0;
        this.y = 0;
    }

    public CoordinatePair(int x, int y) {
        this.x = x;
        this.y = y;
    }

    public CoordinatePair(String pairAsString) {
        this.x = Integer.parseInt(pairAsString.substring(0, 2));
        this.y = Integer.parseInt(pairAsString.substring(2, 4));
    }

    public String toString() {
        String result = "";
        if (this.x < 10) {
            result += "0";
        }
        result += Integer.toString(x);
        if (this.y < 10) {
            result += "0";
        }
        result += Integer.toString(y);
        return result;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CoordinatePair that = (CoordinatePair) o;
        return x == that.x && y == that.y;
    }

    @Override
    public int hashCode() {
        return Objects.hash(x, y);
    }
}
