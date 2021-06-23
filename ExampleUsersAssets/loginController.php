<?php
include 'DBConnection.php';

function sessionLogin($userID) {
    if (session_status() === PHP_SESSION_NONE) {
        session_start();
        $_SESSION["loggedIn"] = "true";
        $_SESSION["userID"] = $userID;
    }
}

// if the user is already logged in, return "ALREADY LOGGED"

$username = mysqli_real_escape_string($connection, $_POST['username']);
$password = mysqli_real_escape_string($connection, $_POST['password']);
$statement = $connection->prepare("SELECT ID FROM Users WHERE username=? AND password=?");
$statement->bind_param("ss", $username, $password);
$statement->execute();
$result = $statement->get_result();

if ($result->num_rows === 1) {
    $userID = mysqli_fetch_object($result)->ID;
    sessionLogin($userID);
    echo $userID;
}
else {
    echo "NOT OK";
}
?>
