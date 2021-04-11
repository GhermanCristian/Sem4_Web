const ELEMENTS_PER_PAGE = 4;

function setMainContentData(currentPage) {
    // indices and pages are 1-indexed
    $.get("getAlbums.php", {firstIndex: (currentPage - 1) * ELEMENTS_PER_PAGE + 1, lastIndex: currentPage * ELEMENTS_PER_PAGE}).done(function(data) {
        $('#mainContent').html(data);
    });
}

function changePage(currentPage, pageIncrement) {
    currentPage += pageIncrement;
    if (currentPage < 1) {
        return 1; // don't do another get request if we're not gonna change anything
    }
    // sth like if currentPage > maxpage, crtpage = maxpage
    setMainContentData(currentPage);
    return currentPage;
}

$(document).ready(function() {
    let currentPage = 1;
    setMainContentData(currentPage);

    $("#previousPageButton").click(function() {
        console.log('prev');
        currentPage = changePage(currentPage, -1);
    });

    $("#nextPageButton").click(function() {
        console.log('next');
        currentPage = changePage(currentPage, +1);
    });
});