package ro.ubb.Java_ExampleUsersAssets;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DBConnection {
    protected static Connection initializeDB() throws SQLException, ClassNotFoundException {
        String dbDriver = "com.mysql.jdbc.Driver";
        String dbURL = "jdbc:mysql://localhost:3306/";

        String dbName = "exampleusersassets";
        String dbUsername = "root";
        String dbPassword = "";

        Class.forName(dbDriver);
        return DriverManager.getConnection(dbURL + dbName, dbUsername, dbPassword);
    }
}
