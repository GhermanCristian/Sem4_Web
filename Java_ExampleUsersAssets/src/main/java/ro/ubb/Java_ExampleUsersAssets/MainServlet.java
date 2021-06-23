package ro.ubb.Java_ExampleUsersAssets;

import org.json.simple.JSONObject;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

@WebServlet(name = "mainServlet", value = "/mainServlet")
public class MainServlet extends HttpServlet {
    private ArrayList<JSONObject> getAssetsByUserID(int userID) {
        ArrayList<JSONObject> results = new ArrayList<>();

        try(Connection connection = DBConnection.initializeDB()) {
            PreparedStatement selectAssetsStatement = connection.prepareStatement("SELECT name, description, value FROM Assets WHERE userID = ?");
            selectAssetsStatement.setInt(1, userID);
            ResultSet queryResults = selectAssetsStatement.executeQuery();
            while (queryResults.next()) {
                JSONObject asset = new JSONObject();
                asset.put("name", queryResults.getString(1));
                asset.put("description", queryResults.getString(2));
                asset.put("value", queryResults.getInt(3));
                results.add(asset);
            }
            queryResults.close();
        }
        catch (SQLException | ClassNotFoundException throwables) {
            throwables.printStackTrace();
        }
        return results;
    }

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        if (request.getSession().getAttribute("login") == null || !request.getSession().getAttribute("login").equals("true")) {
            return; // request from someone that is not authenticated
        }
        if (request.getParameter("getUsername") != null && request.getParameter("getUsername").equals("true")) {
            JSONObject usernameResponse = new JSONObject();
            usernameResponse.put("username", request.getSession().getAttribute("username"));

            PrintWriter out = response.getWriter();
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");

            out.print(usernameResponse);
        }

        else if (request.getParameter("allAssets") != null && request.getParameter("allAssets").equals("true")) {
            PrintWriter out = response.getWriter();
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");

            out.print(this.getAssetsByUserID((int)request.getSession().getAttribute("userID")));
            out.flush();
        }

        else if (request.getParameter("getTempSize") != null && request.getParameter("getTempSize").equals("true")) {
            PrintWriter out = response.getWriter();
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");

            if (request.getSession().getAttribute("tempAssets") == null) {
                out.print(0);
            }
            else {
                ArrayList<JSONObject> tempAssets = (ArrayList<JSONObject>) request.getSession().getAttribute("tempAssets");
                out.print(tempAssets.size());
            }
            out.flush();
        }
    }

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        if (request.getSession().getAttribute("login") == null || !request.getSession().getAttribute("login").equals("true")) {
            return; // request from someone that is not authenticated
        }

        if (request.getParameter("name") != null &&
                request.getParameter("description") != null &&
                request.getParameter("value") != null) {
            HttpSession session = request.getSession();
            if (session.getAttribute("tempAssets") == null) {
                session.setAttribute("tempAssets", new ArrayList<JSONObject>());
            }
            ArrayList<JSONObject> tempAssets = (ArrayList<JSONObject>) session.getAttribute("tempAssets");
            JSONObject newAsset = new JSONObject();
            newAsset.put("name", request.getParameter("name"));
            newAsset.put("description", request.getParameter("description"));
            newAsset.put("value", request.getParameter("value"));
            newAsset.put("userID", session.getAttribute("userID"));
            tempAssets.add(newAsset);
            session.setAttribute("tempAssets", tempAssets);
        }

        else if (request.getParameter("addAssetsToDB") != null && request.getParameter("addAssetsToDB").equals("true")) {
            ArrayList<JSONObject> tempAssets = (ArrayList<JSONObject>) request.getSession().getAttribute("tempAssets");
            try(Connection connection = DBConnection.initializeDB()) {
                PreparedStatement insertStatement = connection.prepareStatement("INSERT INTO Assets(userID, name, description, value) VALUES (?, ?, ?, ?)");
                int userID = (int)request.getSession().getAttribute("userID");
                for (JSONObject asset : tempAssets) {
                    insertStatement.setInt(1, userID);
                    insertStatement.setString(2, (String)asset.get("name"));
                    insertStatement.setString(3, (String)asset.get("description"));
                    insertStatement.setInt(4, Integer.parseInt((String)asset.get("value")));
                    insertStatement.executeUpdate();
                }
                insertStatement.close();
                request.getSession().setAttribute("tempAssets", new ArrayList<JSONObject>());
            }

            catch (SQLException | ClassNotFoundException throwables) {
                throwables.printStackTrace();
            }
        }
    }
}
