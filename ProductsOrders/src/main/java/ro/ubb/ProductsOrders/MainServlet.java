package ro.ubb.ProductsOrders;

import org.json.simple.JSONObject;
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
import java.util.ArrayList;
import java.util.HashMap;

@WebServlet(name = "mainServlet", value = "/mainServlet")
public class MainServlet extends HttpServlet {
    private void addProductToDB(String name, String description) {
        try(Connection connection = DBConnection.initializeDB()) {
            PreparedStatement insertStatement = connection.prepareStatement("INSERT INTO Products(name, description) VALUES (?, ?)");
            insertStatement.setString(1, name);
            insertStatement.setString(2, description);
            insertStatement.executeUpdate();
            insertStatement.close();
        }
        catch (SQLException | ClassNotFoundException throwables) {
            throwables.printStackTrace();
        }
    }

    private void addProductsToSession(String prefix, HttpSession session) {
        ArrayList<JSONObject> results = new ArrayList<>();
        try(Connection connection = DBConnection.initializeDB()) {
            PreparedStatement selectStatement = connection.prepareStatement("SELECT name, description, ID FROM Products WHERE name LIKE ?");
            selectStatement.setString(1, prefix + "%"); // kinda defeats the purpose of prepared statements but eh
            ResultSet queryResults = selectStatement.executeQuery();
            while (queryResults.next()) {
                JSONObject asset = new JSONObject();
                asset.put("name", queryResults.getString(1));
                asset.put("description", queryResults.getString(2));
                results.add(asset);
            }
            queryResults.close();
            selectStatement.close();
            session.setAttribute("productsPrefix", results);
        }
        catch (SQLException | ClassNotFoundException throwables) {
            throwables.printStackTrace();
        }
    }

    private void addProductsToCart(String productName, String quantity, HttpSession session) {
        int productID = -1;
        try(Connection connection = DBConnection.initializeDB()) {
            PreparedStatement selectStatement = connection.prepareStatement("SELECT ID FROM Products WHERE name = ?");
            selectStatement.setString(1, productName);
            ResultSet queryResults = selectStatement.executeQuery();
            if (queryResults.next()) {
                productID = queryResults.getInt(1);
            }
            queryResults.close();
            selectStatement.close();
        }
        catch (SQLException | ClassNotFoundException throwables) {
            throwables.printStackTrace();
        }

        if (productID == -1) {
            session.setAttribute("validProduct", "false"); // here I tried sth to notify the user if it inputs a wrong ID;
            // but if the user expects all this to be done in just one hour, fuck him, he's lucky that the page even opens correctly
            return;
        }

        session.setAttribute("validProduct", "true");

        HashMap<Integer, Integer> cart = (HashMap<Integer, Integer>)session.getAttribute("cart");
        if (!cart.containsKey(productID)) {
            cart.put(productID, 0);
        }
        cart.put(productID, cart.get(productID) + Integer.parseInt(quantity));
        session.setAttribute("cart", cart);
    }

    private void addCartToDB(HttpSession session) {
        HashMap<Integer, Integer> cart = (HashMap<Integer, Integer>)session.getAttribute("cart");
        String username = (String) session.getAttribute("name");
        try(Connection connection = DBConnection.initializeDB()) {
            PreparedStatement insertStatement = connection.prepareStatement("INSERT INTO Orders(user, PID, quantity) VALUES (?, ?, ?)");
            cart.entrySet().forEach(entry -> {
                try {
                    insertStatement.setString(1, username);
                    insertStatement.setInt(2, entry.getKey());
                    insertStatement.setInt(3, entry.getValue());
                    insertStatement.executeUpdate();
                }
                catch (SQLException throwables) {
                    throwables.printStackTrace();
                }
            });
            insertStatement.close();
        }
        catch (SQLException | ClassNotFoundException throwables) {
            throwables.printStackTrace();
        }
    }

    private void resetCart(HttpSession session) {
        session.setAttribute("cart", new HashMap<Integer, Integer>());
    }

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        if (request.getParameter("name") != null && request.getParameter("description") != null) {
            this.addProductToDB(request.getParameter("name"), request.getParameter("description"));
            response.sendRedirect("main.jsp");
        }
    }

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        if (request.getParameter("prefix") != null) {
            request.getSession().setAttribute("productsPrefix", new ArrayList<JSONObject>());
            this.addProductsToSession(request.getParameter("prefix"), request.getSession());
            response.sendRedirect("main.jsp");
        }

        else if (request.getParameter("name") != null && request.getParameter("quantity") != null) {
            this.addProductsToCart(request.getParameter("name"), request.getParameter("quantity"), request.getSession());
            response.sendRedirect("main.jsp");
        }

        else if (request.getParameter("finalize") != null) {
            this.addCartToDB(request.getSession());
            response.sendRedirect("main.jsp");
        }

        else if (request.getParameter("cancel") != null) {
            this.resetCart(request.getSession());
            response.sendRedirect("main.jsp");
        }
    }
}
