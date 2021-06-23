function login(username, password) {
    $.post("loginController.php", {username: username, password: password}).done(function(response) {
        if (response === "NOT OK") {
            location.reload();
        }
        else {
            window.location.href = "main.html";
        }
    });
}

$(document).ready(function() {
    $("#loginButton").click(function(event) {
        login($("#usernameInput")[0].value, $("#passwordInput")[0].value);
    });
});