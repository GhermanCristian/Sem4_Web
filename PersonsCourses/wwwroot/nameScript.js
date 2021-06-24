function enterName(name) {
    $.post("/personscourses/enterName", { name: name }).done(function (result) {
        window.location.href = "main.html";
    });
}

$(document).ready(function () {
    $("#nameButton").click(function (event) {
        enterName($("#nameInput")[0].value);
    });
});