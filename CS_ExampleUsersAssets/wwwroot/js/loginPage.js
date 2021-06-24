function login(username, password) {
    $.post("/exampleusersassets/login", { username: username, password: password }).done(function (response) {
        let parsedResponse = JSON.parse(response);
        console.log(parsedResponse);
        if (parsedResponse["status"] === "invalid") {
            location.reload();
        }
        else {
            window.location.href = "main.html";
        }
    });
}

$(document).ready(function() {
    $("#loginButton").click(function (event) {
        login($("#usernameInput")[0].value, $("#passwordInput")[0].value);
    });
});