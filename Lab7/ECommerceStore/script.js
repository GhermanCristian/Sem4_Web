const ELEMENTS_PER_PAGE = 4;
const TABLE_HEADER = `
            <div class='container mt-10'>
            <div class='row'>
                <table class=\"table\">
                    <thead>
                    <tr>
                        <th scope = 'col'>Title</th>
                        <th scope = 'col'>Artist</th>
                        <th scope = 'col'>Genre</th>
                        <th scope = 'col'>Sales</th>
                    </tr>
                    </thead>
                    <tbody>`;
const TABLE_FOOTER = `</tbody></table>`;

function isInShoppingCart(album) {
    return false; // TO-DO
}

function setMainContentData(currentPage, currentGenre) {
    // pages are 1-indexed
    $.get("getAlbums.php", {currentPage: currentPage, elementsPerPage: ELEMENTS_PER_PAGE, currentGenre: currentGenre}).done(function(data) {
        let parsedData = JSON.parse(data);
        $("#totalAlbumCount").text("Total albums -> " + parsedData[0].count);
        let tableHTML = TABLE_HEADER;
        for (let i = 1; i < parsedData.length; i++) {
            let checkedStatus = ""
            if (isInShoppingCart(parsedData[i])) {
                checkedStatus = "checked";
            }
            tableHTML += `
            <tr>
                <td>${parsedData[i].Title}</td>
                <td>${parsedData[i].Artist}</td>
                <td>${parsedData[i].Genre}</td>
                <td>${parsedData[i].Sales}</td>
                <td>
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault${i}" ${checkedStatus}>
                </td>
            </tr>`;
        }
        tableHTML += TABLE_FOOTER;

        $("#mainContent").html(tableHTML);
    });
}

function changePage(currentPage, pageIncrement, currentGenre) {
    currentPage += pageIncrement;
    if (currentPage < 1) {
        return 1; // don't do another get request if were not gonna change anything
    }
    // sth like if currentPage > maxpage, crtpage = maxpage
    setMainContentData(currentPage, currentGenre);
    return currentPage;
}

$(document).ready(function() {
    let currentPage = 1;
    let currentGenre = "";
    setMainContentData(currentPage, currentGenre);
    $("#searchByGenre").val(""); // reset the text in the form after a refresh

    $("#previousPageButton").click(function() {
        currentPage = changePage(currentPage, -1, currentGenre);
    });

    $("#nextPageButton").click(function() {
        currentPage = changePage(currentPage, +1, currentGenre);
    });

    $("#searchByGenre").on("keyup", function () {
        currentGenre = $(this).val();
        currentPage = 1;
        setMainContentData(currentPage, currentGenre);
    })
});