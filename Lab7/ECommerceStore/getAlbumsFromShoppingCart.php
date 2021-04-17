<?php
include 'beforeSessionRequest.php';
include 'DBConnection.php';

$currentPage = $_GET["currentPage"];
$elementsPerPage = $_GET["elementsPerPage"];
$returnedDataArray = [];

if (isset($_SESSION['elementCountInShoppingCart']) == false) {
    $_SESSION['elementCountInShoppingCart'] = [];
}
$array = $_SESSION['elementCountInShoppingCart'];

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