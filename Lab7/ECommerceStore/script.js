const ELEMENTS_PER_PAGE = 4;

function setMainContentData(currentPage) {
    // indices and pages are 1-indexed
    $.get("getAlbums.php", {firstIndex: (currentPage - 1) * ELEMENTS_PER_PAGE + 1, lastIndex: currentPage * ELEMENTS_PER_PAGE}).done(function(data) {
        $('#mainContent').html(data);
    });
}

$(document).ready(function() {
    let currentPage = 1;
    setMainContentData(currentPage);

    $("#previousPageButton").click(function() {
        console.log('prev');
        currentPage -= 1;
        setMainContentData(currentPage);
    });

    $("#nextPageButton").click(function() {
        console.log('next');
        currentPage += 1;
        setMainContentData(currentPage);
    });
});