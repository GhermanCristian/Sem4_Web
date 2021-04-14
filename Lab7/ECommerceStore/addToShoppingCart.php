<?php
session_start();

if (isset($_SESSION['elementCountInShoppingCart']) == false) {
    $_SESSION['elementCountInShoppingCart'] = [];
}

$modifiedElementID = $_GET["modifiedElementID"];
$itemCount = $_GET["itemCount"];

if ($modifiedElementID != -1) { // id = -1 => we only want the number of elements in the cart (perhaps do another php file just for this ?)
    if (isset($_SESSION['elementCountInShoppingCart'][$modifiedElementID]) == true) {
        $_SESSION['elementCountInShoppingCart'][$modifiedElementID] += $itemCount; // add an element that already exists
    }
    else {
        $_SESSION['elementCountInShoppingCart'][$modifiedElementID] = $itemCount; // newly added element
    }
}

echo array_sum($_SESSION['elementCountInShoppingCart']);
?>