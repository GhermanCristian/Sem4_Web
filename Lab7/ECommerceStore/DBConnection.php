<?php
    $serverName = "localhost";
    $username = "admin";
    $password = "root";
    $DBName = "lab7";

    $connection = mysqli_connect($serverName, $username, $password, $DBName);
    if (! $connection) {
        die("Could not connect to database. " . mysqli_connect_error());
    }

    echo "Successful connection"
?>
