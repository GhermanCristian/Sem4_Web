<?php
include 'DBConnection.php';

$sqlQuery = "SELECT * FROM album";
$result = mysqli_query($connection, $sqlQuery); // 'connection' is not recognised, but it works

while ($row = mysqli_fetch_object($result)) {
    echo $row->Title, "<br>";
}

?>