<?php
session_start();
if (session_status() !== PHP_SESSION_ACTIVE || $_SESSION["loggedIn"] !== "true") {
    header("Location: index.html");
    die();
}
?>