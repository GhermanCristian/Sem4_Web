package ro.ubb.Lab9;

import org.json.simple.JSONObject;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

@WebServlet(name = "leaderboard", value = "/leaderboard")
public class LeaderboardServlet extends HttpServlet {
    private GameService gameService = new GameService();

    private JSONObject convertResultToJSON(ResultEntity result) {
        JSONObject resultJSON = new JSONObject();
        resultJSON.put("score", result.getScore());
        resultJSON.put("gameLength", result.getGameLength());
        resultJSON.put("username", result.getUsername());
        return resultJSON;
    }

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        if (request.getParameter("getLeaderboard") != null && request.getParameter("getLeaderboard").equals("true")) {
            PrintWriter out = response.getWriter();
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            List<JSONObject> responseJSON = new ArrayList<>();
            this.gameService.getLeaderboard().forEach(result -> responseJSON.add(this.convertResultToJSON(result)));
            JSONObject listJSON = new JSONObject();
            listJSON.put("results", responseJSON);
            out.print(listJSON.toJSONString());
            out.flush();
        }
    }
}
