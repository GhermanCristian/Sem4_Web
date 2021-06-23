function addAssetToTempList() {
    let nameInput = $("#nameInput");
    let descriptionInput = $("#descriptionInput");
    let valueInput = $("#valueInput");

    $.get("mainController.php",
        {addTempAsset: "true", name: nameInput[0].value, description: descriptionInput[0].value, value: valueInput[0].value}).done(function(response) {
        console.log("done"); //idk
        getTempCount();
    });
}

function addAllAssetsToDB() {
    $.get("mainController.php", {addAllAssetsToDB: "true"}).done(function(response) {
       getTempCount();
       getAssets();
    });
}

function getTempCount() {
    $.get("mainController.php", {getTempCount: "true"}).done(function(response) {
        $("#assetCount").html("Currently, there are " + response + " assets in the temp list");
        console.log(response);
    });
}

function generateAssetHTML(asset) {
    if (asset.value <= 10) {
        return `<div>${asset.name} | ${asset.description} | ${asset.value}</div>`;
    }
    return `<div style="background-color: red">${asset.name} | ${asset.description} | ${asset.value}</div>`;
}

function getAssets() {
    $.get("mainController.php", {getAssets: "true"}).done(function(response) {
        let parsedAssets = JSON.parse(response);
        let innerHTML = ``;
        parsedAssets.forEach(asset => innerHTML += generateAssetHTML(asset));
        $("#assetList").html(innerHTML);
    });
}

function logout() {
    $.get("logoutController.php", {logout: "true"}).done(function(response) {
       console.log(response);
    });
}

$(document).ready(function() {
    $.get("mainController.php", {getUserID: "true"}).done(function(response) {
        $("#IDSpan").html("You are user " + response);
    });

    getTempCount();
    getAssets();

    $("#addAssetButton").click(function(event) {
       addAssetToTempList();
    });
    $("#addAllAssetsButton").click(function(event) {
       addAllAssetsToDB();
    });
    $("#logoutButton").click(function(event) {
        logout();
        window.location.href = "index.html";
    });
});