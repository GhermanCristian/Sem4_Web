<html>
<head>
    <title>Cart</title>
</head>
<body>
<%!
    public String getProductsFromCart(HttpSession session) {
        if(session.getAttribute("cart") != null) {
            return session.getAttribute("cart").toString();
        }
        return "none";
    }
%>
<%=
    getProductsFromCart(session)
%>
<form action="mainServlet" method="GET">
    <input type="submit" value="Finalize" name="finalize">
    <input type="submit" value="Cancel" name="cancel">
</form>
<a href="main.jsp">Go back</a>
</body>
</html>
