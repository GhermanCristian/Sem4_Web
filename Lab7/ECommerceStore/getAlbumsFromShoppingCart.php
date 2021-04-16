<?php
header('Access-Control-Allow-Origin: *');
include 'DBConnection.php';
session_start();

$currentPage = $_GET["currentPage"];
$elementsPerPage = $_GET["elementsPerPage"];
$returnedDataArray = [];

if (isset($_SESSION['elementCountInShoppingCart']) == false) {
    $_SESSION['elementCountInShoppingCart'] = [];
}
$array = $_SESSION['elementCountInShoppingCart'];
$array[1] = 4; // just for testing the shopping cart page before implementing add to shopping cart

$currentPosition = 1;
foreach ($array as $currentIndex => $currentItemCount) {
    if (($currentPage - 1) * $elementsPerPage < $currentPosition && $currentPosition <= $currentPage * $elementsPerPage) {
        $queryResult = mysqli_query($connection, "SELECT * FROM album WHERE ID = {$currentIndex}");
        if ($queryResult->num_rows == 1) {
            $item = mysqli_fetch_object($queryResult);
            $item->{"TimesInCart"} = $currentItemCount;
            array_push($returnedDataArray, $item);
        }
        // else throw an exception
    }
    $currentPosition++;
}

echo json_encode($returnedDataArray);

?>