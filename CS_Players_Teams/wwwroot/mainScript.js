function getName() {
    $.get("/personscourses/getName").done(function (response) {
        console.log(response);
    });
}

function getTeams() {
    $.get("/personscourses/getTeams").done(function (response) {
        $("#teamsList").html("Teams - " + response);
    });
}

function getYourTeams() {
    $.get("/personscourses/getYourTeams").done(function (response) {
        $("#yourTeamsList").html("Your teams - " + response);
    });
}

function addPlayerToTeams(playerName, teams) {
    $.post("/personscourses/addPlayerToTeams", { playerName: playerName, teams: teams }).done(function (response) {
        console.log("added player");
    });
}

$(document).ready(function () {
    getTeams();
    getYourTeams();

    $("#addPlayerButton").click(function (event) {
        addPlayerToTeams($("#playerNameInput").val(), $("#teamsInput").val());
    });
});