package ro.ubb.Lab9;

import org.json.simple.JSONObject;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet(name = "game", value = "/game")
public class GameServlet extends HttpServlet {
    private GameService gameService = new GameService();
    // because httpservlet is a singleton, this should only be called once

    private JSONObject convertGameToJSON(GameEntity currentGame) {
        // I'm only sending the relevant fields i.e those which change between moves
        JSONObject game = new JSONObject();
        game.put("status", currentGame.getStatus());
        game.put("score", currentGame.getScore());
        game.put("snake", currentGame.getSnakeAsString());
        game.put("food", currentGame.getFoodPosition().toString());
        game.put("directionCode", currentGame.getDirectionCode());
        return game;
    }

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        // should I also check here if the user is logged in ?

        if (request.getParameter("startGame") != null && request.getParameter("startGame").equals("true")) {
            GameEntity currentGame = this.gameService.addNewGame((int)request.getSession().getAttribute("userID"));
            request.getSession().setAttribute("gameID", currentGame.getID());

            PrintWriter out = response.getWriter();
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");

            JSONObject game = this.convertGameToJSON(currentGame);
            // when sending for the first time we also need some extra one-time arguments, which don't change between moves
            game.put("userID", request.getSession().getAttribute("userID"));
            game.put("obstacles", currentGame.getObstaclesAsString());
            out.print(game);
        }

        else if(request.getParameter("moveOneStep") != null && request.getParameter("moveOneStep").equals("true")) {
            GameEntity currentGame = this.gameService.moveSnakeOneStep((int)request.getSession().getAttribute("gameID"));
            PrintWriter out = response.getWriter();
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            out.print(this.convertGameToJSON(currentGame));
        }
    }
}
