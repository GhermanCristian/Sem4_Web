<?php
    $serverName = "localhost";
    $username = "root";
    $password = "";
    $DBName = "exampleusersassets";

    $connection = mysqli_connect($serverName, $username, $password, $DBName);
    if (! $connection) {
        die("Could not connect to database. " . mysqli_connect_error());
    }
?>
