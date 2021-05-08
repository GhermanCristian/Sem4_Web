package ro.ubb.Lab9;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import ro.ubb.Lab9.DBConnection;

@WebServlet(name = "loginServlet", value = "/loginServlet")
public class LoginServlet extends HttpServlet {
    private boolean areCredentialsValid(String username, String password) {
        boolean areValid = false;
        try {
            Connection connection = DBConnection.initializeDB();
            PreparedStatement checkCredentials = connection.prepareStatement("SELECT COUNT(*) FROM user WHERE username = ? AND password = ?");
            checkCredentials.setString(1, username);
            checkCredentials.setString(2, password);
            ResultSet result = checkCredentials.executeQuery();
            result.next();
            if (result.getInt(1) == 1) {
                areValid = true;
            }
            checkCredentials.close();
            connection.close();
        }
        catch (SQLException | ClassNotFoundException throwables) {
            throwables.printStackTrace();
        }

        return areValid;
    }

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("text/html");
        String responseText = "not valid";
        PrintWriter out = response.getWriter();
        out.println("<html><body>");
        if (this.areCredentialsValid(request.getParameter("username"), request.getParameter("password"))) {
            responseText = request.getParameter("username") + " -> " + request.getParameter("password");
        }
        out.println("<h1>" + responseText + "</h1>");
        out.println("</body></html>");
    }
}
