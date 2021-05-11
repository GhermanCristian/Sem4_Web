package ro.ubb.Lab9;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

@WebServlet(name = "loginServlet", value = "/loginServlet")
public class LoginServlet extends HttpServlet {
    private int getCount(String username, String password, Connection connection) throws SQLException {
        PreparedStatement checkCredentials = connection.prepareStatement("SELECT COUNT(*) FROM user WHERE username = ? AND password = ?");
        checkCredentials.setString(1, username);
        checkCredentials.setString(2, password);
        ResultSet result = checkCredentials.executeQuery();
        result.next();
        int count = result.getInt(1);
        result.close();
        checkCredentials.close();
        return count;
    }

    private boolean areCredentialsValid(String username, String password) {
        boolean areValid = false;

        try(Connection connection = DBConnection.initializeDB()) {
            if (this.getCount(username, password, connection) == 1) {
                areValid = true; // don't return here bc I want to close the connection
            }
        }
        catch (SQLException | ClassNotFoundException throwables) {
            throwables.printStackTrace();
        }

        return areValid;
    }

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        response.setContentType("text/html");
        RequestDispatcher redirect = null;
        if (this.areCredentialsValid(request.getParameter("username"), request.getParameter("password"))) {
            HttpSession session = request.getSession();
            session.setAttribute("login", "true");
            response.sendRedirect("game.jsp");
        }
        else {
            response.sendRedirect("loginError.html");
        }
    }
}
