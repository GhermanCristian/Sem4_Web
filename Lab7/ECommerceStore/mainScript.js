import {TABLE_FOOTER, ELEMENTS_PER_PAGE} from "./constants.js";
const TABLE_HEADER = `
            <div class='container mt-10 row justify-content-center col-auto'>
            <div class='row'>
                <table class='table'>
                    <thead>
                    <tr>
                        <th scope = 'col' class='col-2'>Title</th>
                        <th scope = 'col' class='col-2'>Artist</th>
                        <th scope = 'col' class='col-2'>Genre</th>
                        <th scope = 'col' class='col-2'>Sales</th>
                        <th scope = 'col' class='col-3'></th>
                        <th scope = 'col' class='col-1'></th>
                    </tr>
                    </thead>
                    <tbody>`;

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
        let tableHTML = TABLE_HEADER;
        let mainContentDiv = $("#mainContent");

        $("#totalAlbumCount").text("Total albums -> " + parsedData[0].count);
        if (parsedData.length === 1) { // it only receives the total number of albums
            mainContentDiv.html("");
            return;
        }

        for (let i = 1; i < parsedData.length; i++) {
            tableHTML += `
            <tr>
                <td class='col-2'>${parsedData[i].Title}</td>
                <td class='col-2'>${parsedData[i].Artist}</td>
                <td class='col-2'>${parsedData[i].Genre}</td>
                <td class='col-2'>${parsedData[i].Sales}</td>
                <td class='col-3'>
                    <button type="button" class="btn btn-primary btn-md" id = "addToCartButton${parsedData[i].ID}">Add to cart</button>
                </td>
                <td class='col-1 px-0'>
                    <input class="form-control form-control-lg px-1" id="addToCartForm${parsedData[i].ID}">
                </td>
            </tr>`;
        }
        tableHTML += TABLE_FOOTER;
        mainContentDiv.html(tableHTML);

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