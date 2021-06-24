package ro.ubb.ProductsOrders;

import org.json.simple.JSONObject;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;

@WebServlet(name = "nameServlet", value = "/nameServlet")
public class NameServlet extends HttpServlet {
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        if (request.getParameter("name") != null) {
            String name = request.getParameter("name");
            request.getSession().setAttribute("name", name);
            request.getSession().setAttribute("cart", new HashMap<Integer, Integer>());
            response.sendRedirect("main.jsp");
        }
    }
}
