<?php
session_start();

if (isset($_SESSION['elementCountInShoppingCart']) == false) {
    $_SESSION['elementCountInShoppingCart'] = [];
}

$modifiedElementID = $_GET["modifiedElementID"];
$isAdded = $_GET["isAdded"];
$itemCount = $_GET["itemCount"];

if ($isAdded == 1) {
    if (isset($_SESSION['elementCountInShoppingCart'][$modifiedElementID]) == true) {
        $_SESSION['elementCountInShoppingCart'][$modifiedElementID] += $itemCount;
    }
    else {
        $_SESSION['elementCountInShoppingCart'][$modifiedElementID] = $itemCount; // newly added element
    }
}
else if ($isAdded == 0){
    if (isset($_SESSION['elementCountInShoppingCart'][$modifiedElementID]) == true) {
        $_SESSION['elementCountInShoppingCart'][$modifiedElementID] -= $itemCount;
        if ($_SESSION['elementCountInShoppingCart'][$modifiedElementID] <= 0) {
            unset($_SESSION['elementCountInShoppingCart'][$modifiedElementID]); // remove item from cart if it reaches 0 or less occurrences
        }
    }
    // else throw an exception ?
}

echo array_sum($_SESSION['elementCountInShoppingCart']);

?>
