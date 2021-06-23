function updateTempSize() {
    $.get("mainServlet", {getTempSize: "true"}).done(function(response) {
        $("#tempSize").html("There are " + response + " assets in the temporary list");
    });
}

function addAssetsToDB() {
    $.post("mainServlet", {addAssetsToDB: "true"}).done(function(response) {
        console.log(response);
    });
}

function generateAssetHTML(asset) {
    if (asset.value <= 10) {
        return `<div>${asset.name} | ${asset.description} | ${asset.value}</div>`;
    }
    return `<div style="background-color: red">${asset.name} | ${asset.description} | ${asset.value}</div>`;
}

function getAllAssets() {
    $.get("mainServlet", {allAssets: "true"}).done(function(response) {
        let innerHTML = ``;
        response.forEach(asset => innerHTML += generateAssetHTML(asset));
        $("#assetList").html(innerHTML);
    });
}

$(document).ready(function() {
    $.get("mainServlet", {getUsername: "true"}).done(function (response) {
        $("#nameTag").html("You are user: " + response["username"]);
    });

    $("#addAssetsToDB").click(function (event) {
        addAssetsToDB();
        updateTempSize();
        getAllAssets();
    });

    updateTempSize();
    getAllAssets();
});