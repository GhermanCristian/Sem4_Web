<?php
include 'DBConnection.php';

$firstIndex = 1; // these will be received in a request, for now they are like this
$lastIndex = 100;
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
        '<tbody>';
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