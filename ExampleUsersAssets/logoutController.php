<?php

if (isset($_GET["logout"]) && $_GET["logout"] === "true") {
    if (session_status() === PHP_SESSION_ACTIVE) {
        session_destroy();
        echo "logged out";
    }
    echo "wasn't logged in";
}
?>