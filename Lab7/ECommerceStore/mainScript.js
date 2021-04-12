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
//export {ELEMENTS_PER_PAGE, TABLE_HEADER, TABLE_FOOTER};

function initialiseShoppingCartButton() {
    $.get("modifyShoppingCart.php", {modifiedElementID: 0, isAdded: 2, itemCount: 0}).done(function(data) {
        // isAdded > 1 => not an add, nor a remove => it just returns the number of elements in the cart; it also doesn't care about the ID nor the itemCount
        // data = number of elements in the cart
        $("#shoppingCartButton").text("Shopping cart (" + data + ")");
    });
}

function modifyCart(itemID, isAdded, itemCount) {
    $.get("modifyShoppingCart.php", {modifiedElementID: itemID, isAdded: isAdded, itemCount: itemCount}).done(function(data) {
        // data = number of elements in the cart
        $("#shoppingCartButton").text("Shopping cart (" + data + ")");
    });
}

function addItemToCart(itemID) {
    modifyCart(itemID, 1, 1);
}

function removeItemFromCart(itemID) {
    modifyCart(itemID, 0, 1);
}

function setMainContentData(currentPage, currentGenre) {
    // pages are 1-indexed
    $.get("getAlbums.php", {currentPage: currentPage, elementsPerPage: ELEMENTS_PER_PAGE, currentGenre: currentGenre}).done(function(data) {
        let parsedData = JSON.parse(data);
        $("#totalAlbumCount").text("Total albums -> " + parsedData[0].count);
        let tableHTML = TABLE_HEADER;
        for (let i = 1; i < parsedData.length; i++) {
            tableHTML += `
            <tr>
                <td>${parsedData[i].Title}</td>
                <td>${parsedData[i].Artist}</td>
                <td>${parsedData[i].Genre}</td>
                <td>${parsedData[i].Sales}</td>
                <td>
                    <button type="button" class="btn btn-primary btn-sm" id = "addToCartButton${parsedData[i].ID}">Add to cart</button>
                </td>
            </tr>`;
        }
        tableHTML += TABLE_FOOTER;
        $("#mainContent").html(tableHTML);

        $("button[id^='addToCartButton']").on("click", function (){
            let buttonID = $(this)[0].id.replace("addToCartButton", "");
            addItemToCart(buttonID);
        });
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
    initialiseShoppingCartButton();
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
    });
});