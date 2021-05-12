<%
    String isLoggedIn = (String) session.getAttribute("login");
    if (isLoggedIn == null || !isLoggedIn.equals("true")) {
        response.sendRedirect("loginError.html");
        return;
    }
%>
<html>
<head>
    <title>clasamentu</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js" defer></script>
    <script src="leaderboardScript.js" defer></script>
</head>
<body>
    <div id="mainList"></div>
</body>
</html>
