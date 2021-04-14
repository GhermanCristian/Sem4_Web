import {TABLE_FOOTER, ELEMENTS_PER_PAGE} from "./constants.js";
const TABLE_HEADER = `
            <div class='container mt-10 row justify-content-center col-auto'>
            <div class='row w-100'>
                <table class='table'>
                    <thead>
                    <tr>
                        <th scope = 'col' class='col-3'>Title</th>
                        <th scope = 'col' class='col-3'>Artist</th>
                        <th scope = 'col' class='col-2'>Genre</th>
                        <th scope = 'col' class='col-1'>Sales</th>
                        <th scope = 'col' class='col-2'></th>
                        <th scope = 'col' class='col-1'></th>
                    </tr>
                    </thead>
                    <tbody>`;

function initialiseShoppingCartButton() {
    $.get("addToShoppingCart.php", {modifiedElementID: -1, itemCount: 0}).done(function(data) {
        // modifiedElementID = -1 => just get the number of elements in the cart, don't add anything (the itemCount is irrelevant)
        $("#shoppingCartButton").text("Shopping cart (" + data + ")");
    });
}

function addItemsToCart(itemID, itemCount) {
    $.get("addToShoppingCart.php", {modifiedElementID: itemID, itemCount: itemCount}).done(function(data) {
        // data = number of elements in the cart
        $("#shoppingCartButton").text("Shopping cart (" + data + ")");
    });
}

function getHTMLForItem(item) {
    return `<tr>
                <td class='col-3'>${item.Title}</td>
                <td class='col-3'>${item.Artist}</td>
                <td class='col-2'>${item.Genre}</td>
                <td class='col-1'>${item.Sales}</td>
                <td class='col-2'>
                    <button type="button" class="btn btn-dark btn-md" id = "addToCartButton${item.ID}">Add to cart</button>
                </td>
                <td class='col-1 px-0'>
                    <input class="form-control form-control-md px-1" id="addToCartForm${item.ID}">
                </td>
            </tr>`;
}

function setMainContentData(currentPage, currentGenre) {
    // pages are 1-indexed
    $.get("getAlbums.php", {currentPage: currentPage, elementsPerPage: ELEMENTS_PER_PAGE, currentGenre: currentGenre}).done(function(data) {
        let parsedAlbums = JSON.parse(data);
        let tableHTML = TABLE_HEADER;
        let mainContentDiv = $("#mainContent");

        $("#totalAlbumCount").text("Total albums -> " + parsedAlbums[0].count);
        if (parsedAlbums.length === 1) { // it only receives the total number of albums
            mainContentDiv.html("");
            return;
        }

        for (let i = 1; i < parsedAlbums.length; i++) {
            tableHTML += getHTMLForItem(parsedAlbums[i]);
        }
        tableHTML += TABLE_FOOTER;
        mainContentDiv.html(tableHTML);

        $("button[id^='addToCartButton']").on("click", function (){
            let buttonID = $(this)[0].id.replace("addToCartButton", "");
            let itemCount = $("#addToCartForm" + buttonID)[0].value;
            if (itemCount === "") {
                itemCount = 1; // if we just press the button, without providing any number in the form, add 1
            }
            addItemsToCart(buttonID, itemCount);
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
    let searchForm = $("#searchByGenre");
    setMainContentData(currentPage, currentGenre);
    initialiseShoppingCartButton();
    searchForm.val(""); // reset the text in the form after a refresh

    $("#previousPageButton").click(function() {
        currentPage = changePage(currentPage, -1, currentGenre);
    });
    $("#nextPageButton").click(function() {
        currentPage = changePage(currentPage, +1, currentGenre);
    });

    searchForm.on("keyup", function () {
        currentGenre = $(this).val();
        currentPage = 1;
        setMainContentData(currentPage, currentGenre);
    });
});