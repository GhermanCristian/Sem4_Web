<?php
include 'DBConnection.php';

$currentPage = $_GET["currentPage"];
$elementsPerPage = $_GET["elementsPerPage"];
$currentGenre = $_GET["currentGenre"];
$sqlQuery = "SELECT * FROM album WHERE Genre LIKE '%{$currentGenre}%'";
$result = mysqli_query($connection, $sqlQuery); // 'connection' is not recognised, but it works

$albumCount = ['count' => $result->num_rows];
$returnedDataArray = [$albumCount];

$index = 1;
while ($row = mysqli_fetch_object($result)) {
    if (($currentPage - 1) * $elementsPerPage < $index && $index <= $currentPage * $elementsPerPage) {
        array_push($returnedDataArray, $row);
    }
    $index = $index + 1;
}

echo json_encode($returnedDataArray);
?>