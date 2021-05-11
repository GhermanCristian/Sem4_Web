package ro.ubb.Lab9;

import org.json.simple.JSONObject;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet(name = "game", value = "/game")
public class Game extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        // should I also check here if the user is logged in ?

        if (request.getParameter("startGame").equals("true")) {
            // will return the userID and add a new entry in the DB
            PrintWriter out = response.getWriter();
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            JSONObject userID = new JSONObject();
            userID.put("userID", (int)request.getSession().getAttribute("userID"));
            out.print(userID);
            return;
        }

    }
}
