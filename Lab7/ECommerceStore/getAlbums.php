<?php
include 'DBConnection.php';

$currentPage = $_GET["currentPage"];
$elementsPerPage = $_GET["elementsPerPage"];
$currentGenre = $_GET["currentGenre"];
$sqlQuery = "SELECT * FROM album WHERE Genre LIKE '%{$currentGenre}%'";
$result = mysqli_query($connection, $sqlQuery); // 'connection' is not recognised, but it works

echo    '<div class="container mt-10">' .
        '<div class="row">' .
        '<table class="table">' .
        '<thead>' .
            '<tr>' .
            '<th scope = "col">Title</th>' .
            '<th scope = "col">Artist</th>' .
            '<th scope = "col">Genre</th>' .
            '<th scope = "col">Sales</th>' .
        '</thead>' .
        '<tbody>'; // perhaps this part should be in index.php, so that we don't send it each time

$index = 1;
while ($row = mysqli_fetch_object($result)) {
    if (($currentPage - 1) * $elementsPerPage < $index && $index <= $currentPage * $elementsPerPage) {
        echo '<tr>' .
            '<td>'.$row->Title.'</td>' .
            '<td>'.$row->Artist.'</td>' .
            '<td>'.$row->Genre.'</td>' .
            '<td>'.$row->Sales.'</td>' .
            '</tr>';
    }
    $index = $index + 1;
}
echo '</tbody>' . '</table>';

?>