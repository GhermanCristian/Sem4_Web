<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Login</title>
</head>
<body>
    <h1>Login</h1>
    <form action="loginServlet" method="POST">
        <input type="text" name="username" autocomplete="off" placeholder="Username">
        <br>
        <input type="password" name="password" autocomplete="off" placeholder="Password">
        <br>
        <input type="submit" value="Submit">
    </form>
</body>
</html>
