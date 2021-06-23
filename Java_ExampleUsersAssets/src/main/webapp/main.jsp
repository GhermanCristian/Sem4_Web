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
    <title>Main</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js" defer></script>
    <script src="mainScript.js" defer></script>
</head>
<body>
    <p id="nameTag">You are user </p>
    <br>
    <a href="logout.jsp">Logout</a>
    <br>
    <form id="addAssetForm" action="mainServlet" method="POST" target="_blank">
        <input type="text" name="name" autocomplete="off" placeholder="Name">
        <br>
        <input type="text" name="description" autocomplete="off" placeholder="Description">
        <br>
        <input type="text" name="value" autocomplete="off" placeholder="Value">
        <br>
        <input type="submit" value="Submit">
    </form>
    <br>
    <br>
    <hr>
    <span id="tempSize">There are 0 assets in the temporary list</span>
    <br>
    <button id="addAssetsToDB">Add assets to DB</button>
    <div id="assetList"></div>
</body>
