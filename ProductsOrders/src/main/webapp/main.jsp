<%@ page import="org.json.simple.JSONObject" %>
<%@ page import="java.util.ArrayList" %>
<html>
<head>
    <title>Main</title>
</head>
<body>
    <form action="mainServlet" method="POST">
        <input type="text" name="name" autocomplete="off" placeholder="Name">
        <br>
        <input type="text" name="description" autocomplete="off" placeholder="Description">
        <br>
        <input type="submit" value="Add product to DB">
    </form>
    <br>
    <br>
    <br>
    <br>
    <form action="mainServlet" method="GET">
        <input type="text" name="prefix" autocomplete="off" placeholder="Prefix">
        <br>
        <input type="submit" value="Get products with prefix">
    </form>
    <br>
    <%!
        public String getProducts(HttpSession session) {
            if(session.getAttribute("productsPrefix") != null) {
                return ((ArrayList<JSONObject>) session.getAttribute("productsPrefix")).stream().map(JSONObject::toString).reduce("", (a, b) -> a + b + "|");
            }
            return "none";
        }
    %>
    <div>Products with prefix - <%=getProducts(session)%></div>
    <br>
    <br>
    <br>
    <br>
    <form action="mainServlet" method="GET">
        <input type="text" name="name" autocomplete="off" placeholder="Name">
        <br>
        <input type="text" name="quantity" autocomplete="off" placeholder="Quantity">
        <br>
        <input type="submit" value="Add to cart">
    </form>
    <br>
    <a href="cart.jsp">Go to cart</a>
</body>
</html>
