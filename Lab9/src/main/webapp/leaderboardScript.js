$(document).ready(function() {
    $.get("leaderboard", {getLeaderboard: "true"}).done(function(response) {
        let html = `<div>User - Score - Game duration</div><br><br>`;
        for (let i = 0; i < response["results"].length; i++) {
            html += `<div>${i + 1}. ${response["results"][i]["username"]} - ${response["results"][i]["score"]} - ${response["results"][i]["gameLength"]}</div>`;
        }
        $("#mainList").html(html);
    });
});
