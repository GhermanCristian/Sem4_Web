const ELEMENTS_PER_PAGE = 4;

function setMainContentData(currentPage, currentGenre) {
    // pages are 1-indexed
    $.get("getAlbums.php", {currentPage: currentPage, elementsPerPage: ELEMENTS_PER_PAGE, currentGenre: currentGenre}).done(function(data) {
        $('#mainContent').html(data);
    });
}

function changePage(currentPage, pageIncrement, currentGenre) {
    currentPage += pageIncrement;
    if (currentPage < 1) {
        return 1; // don't do another get request if we're not gonna change anything
    }
    // sth like if currentPage > maxpage, crtpage = maxpage
    setMainContentData(currentPage, currentGenre);
    return currentPage;
}

$(document).ready(function() {
    let currentPage = 1;
    let currentGenre = "";
    setMainContentData(currentPage, currentGenre);

    $("#previousPageButton").click(function() {
        console.log('prev');
        currentPage = changePage(currentPage, -1, currentGenre);
    });

    $("#nextPageButton").click(function() {
        console.log('next');
        currentPage = changePage(currentPage, +1, currentGenre);
    });

    $("#searchByGenre").on("keyup", function () {
        currentGenre = $(this).val();
        console.log(currentGenre);
        setMainContentData(currentPage, currentGenre);
    })
});