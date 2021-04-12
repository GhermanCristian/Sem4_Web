<?php
session_start();

if (isset($_SESSION['elementCountInShoppingCart']) == false) {
    $_SESSION['elementCountInShoppingCart'] = [];
}

$modifiedElementID = $_GET["modifiedElementID"];
$isAdded = $_GET["isAdded"];

if ($isAdded == 1) {
    if (isset($_SESSION['elementCountInShoppingCart'][$modifiedElementID]) == true) {
        $_SESSION['elementCountInShoppingCart'][$modifiedElementID]++;
    }
    else {
        $_SESSION['elementCountInShoppingCart'][$modifiedElementID] = 1; // newly added element
    }
}
else if ($isAdded == 0){
    if (isset($_SESSION['elementCountInShoppingCart'][$modifiedElementID]) == true) {
        $_SESSION['elementCountInShoppingCart'][$modifiedElementID]--;
    }
    // else throw an exception ?
}

echo array_sum($_SESSION['elementCountInShoppingCart']);

?>
