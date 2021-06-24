function addAssetToTempList() {
    let nameInput = $("#nameInput");
    let descriptionInput = $("#descriptionInput");
    let valueInput = $("#valueInput");

    $.get("/exampleusersassets/addTempAsset",
        { name: nameInput[0].value, description: descriptionInput[0].value, value: valueInput[0].value }).done(function (response) {
        getTempCount();
    });
}

function addAllAssetsToDB() {
    $.get("/exampleusersassets/addAllAssetsToDB").done(function (response) {
        getTempCount();
        getAssets();
    });
}

function getTempCount() {
    $.get("/exampleusersassets/getTempCount").done(function(response) {
        $("#assetCount").html("Currently, there are " + JSON.parse(response)["tempCount"] + " assets in the temp list");
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
    $.get("/exampleusersassets/getAssets").done(function (response) {
        let parsedAssets = JSON.parse(response);
        let innerHTML = ``;
        parsedAssets.forEach(asset => innerHTML += generateAssetHTML(asset));
        $("#assetList").html(innerHTML);
    });
}

function getUserID() {
    $.get("/exampleusersassets/getUserID").done(function (response) {
        $("#IDSpan").html("You are user " + JSON.parse(response)["userID"]);
    });
}

function logout() {
    $.get("/exampleusersassets/logout").done(function (response) {
        console.log("logout");
    });
}

$(document).ready(function () {
    $.get("/exampleusersassets/isLoggedIn").done(function (response) {
        if (JSON.parse(response)["status"] === "valid") {
            getTempCount();
            getAssets();

            $("#addAssetButton").click(function (event) {
                addAssetToTempList();
            });
            $("#addAllAssetsButton").click(function (event) {
                addAllAssetsToDB();
            });
            $("#logoutButton").click(function (event) {
                logout();
                window.location.href = "loginPage.html";
            });
        }
        else {
            window.location.href = "loginPage.html";
        }
    });
});