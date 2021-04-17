<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
header('Access-Control-Allow-Credentials: true'); // the apache / angular servers are on different ports, so the PHP sessions won't work => we need this
header('Access-Control-Allow-Origin: http://localhost:4200'); // we also can't use the wildcard because of that ^
?>
