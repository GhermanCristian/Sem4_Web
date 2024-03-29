<?php
include 'beforeSessionRequest.php';

if (isset($_SESSION['elementCountInShoppingCart']) == false) {
    $_SESSION['elementCountInShoppingCart'] = [];
}

$modifiedElementID = $_GET["modifiedElementID"];
$removeOne = $_GET["removeOne"]; // true => remove just one; false => remove all

if (isset($_SESSION['elementCountInShoppingCart'][$modifiedElementID]) == true) {
    if ($removeOne == "true") {
        $_SESSION['elementCountInShoppingCart'][$modifiedElementID]--;
    }
    else {
        $_SESSION['elementCountInShoppingCart'][$modifiedElementID] = 0;
    }

    if ($_SESSION['elementCountInShoppingCart'][$modifiedElementID] <= 0) {
        unset($_SESSION['elementCountInShoppingCart'][$modifiedElementID]); // remove item from cart if it reaches 0 or less occurrences
    }
}
// else throw an exception ?
?>