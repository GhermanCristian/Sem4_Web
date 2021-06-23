<?php
include "DBConnection.php";

if (session_status() === PHP_SESSION_NONE) {
    session_start();
    if(isset($_SESSION["tempList"]) === false) {
        $_SESSION["tempList"] = [];
    }
}

function getUserIDFromSession() {
    if(isset($_SESSION["userID"])) {
        return $_SESSION["userID"];
    }
    return -1;
}

function addAssetToTempList($newAsset) {
    array_push($_SESSION["tempList"], $newAsset);
}

if(isset($_GET["getUserID"])) { // handle the getUserID request
    if($_GET["getUserID"] === "true") {
        echo getUserIDFromSession();
    }
}

else if(isset($_GET["addTempAsset"])) { // handle the addTempAsset request
    if($_GET["addTempAsset"] === "true") {
        $name = $_GET["name"];
        $description = $_GET["description"];
        $value = $_GET["value"];
        $userID = $_SESSION["userID"];
        $newAsset = (object) array('name' => $name, 'description' => $description, 'value' => $value, 'userID' => $userID);
        addAssetToTempList($newAsset);
    }
}

else if(isset($_GET["getTempCount"])) {
    if($_GET["getTempCount"] === "true") {
        echo count($_SESSION["tempList"]);
    }
}

else if(isset($_GET["getAssets"])) {
    if($_GET["getAssets"] === "true") {
        $userID = $_SESSION["userID"];
        $statement = $connection->prepare("SELECT * FROM Assets WHERE userid=?");
        $statement->bind_param("i", $userID);
        $statement->execute();
        $result = $statement->get_result();
        $response = [];
        while ($row = mysqli_fetch_object($result)) {
            array_push($response, $row);
        }
        echo json_encode($response);
    }
}

else if(isset($_GET["addAllAssetsToDB"])) {
    if($_GET["addAllAssetsToDB"] === "true") {
        foreach ($_SESSION["tempList"] as $asset) {
            $statement = $connection->prepare("INSERT INTO Assets(userID, name, description, value) VALUES(?, ?, ?, ?)");
            $statement->bind_param("issi", $asset->userID, $asset->name, $asset->description, $asset->value);
            $statement->execute();
        }
        $_SESSION["tempList"] = []; // clear the temp list
    }
}
?>
