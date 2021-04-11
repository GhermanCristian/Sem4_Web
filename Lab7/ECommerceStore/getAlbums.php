<?php
include 'DBConnection.php';

$firstIndex = $_GET["firstIndex"];
$lastIndex = $_GET["lastIndex"];
$sqlQuery = "SELECT * FROM album WHERE ID BETWEEN {$firstIndex} AND {$lastIndex}";
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
while ($row = mysqli_fetch_object($result)) {
    echo '<tr>' .
        '<td>'.$row->Title.'</td>' .
        '<td>'.$row->Artist.'</td>' .
        '<td>'.$row->Genre.'</td>' .
        '<td>'.$row->Sales.'</td>' .
        '</tr>';
}
echo '</tbody>' . '</table>';

?>