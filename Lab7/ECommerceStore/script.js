$(document).ready(function() {
    $.get("getAlbums.php").done(function(data) {
        $('#mainContent').html(data);
    });
});