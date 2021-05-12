<%
    String isLoggedIn = (String) session.getAttribute("login");
    if (isLoggedIn == null || !isLoggedIn.equals("true")) {
        response.sendRedirect("loginError.html");
        return;
    }
%>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>sss</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js" defer></script>
    <script src="gameScript.js" defer></script>
</head>
<body>
    <h1>sss</h1>
    <canvas id="boardCanvas" width="400" height="400"></canvas>
    <p id="nameTag">You are user </p>
    <p id="gameStatus">Score: </p>
    <a href="leaderboard.jsp">Check leaderboard (will invalidate current game)</a>
    <br>
    <a href="logout.jsp">Logout</a>
</body>
</html>