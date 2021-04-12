//import {ELEMENTS_PER_PAGE, TABLE_HEADER, TABLE_FOOTER} from "./mainScript.js";

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

function removeFromCart(itemID, itemCount, currentPage) {
    $.get("modifyShoppingCart.php", {modifiedElementID: itemID, isAdded: 0, itemCount: itemCount}).done(function(data) {
        setMainContentData(currentPage);
    });
}

function removeOneItemOccurrenceFromCart(itemID, currentPage) {
    removeFromCart(itemID, 1, currentPage);
}

function removeAllItemOccurrencesFromCart(itemID, currentPage) {
    removeFromCart(itemID, 999, currentPage);
}

function setMainContentData(currentPage) {
    $.get("getAlbumsFromShoppingCart.php", {currentPage: currentPage, elementsPerPage: ELEMENTS_PER_PAGE}).done(function(data) {
        let parsedData = JSON.parse(data);
        let tableHTML = TABLE_HEADER;

        for (let i = 0; i < parsedData.length; i++) {
            tableHTML += `
            <tr>
                <td>${parsedData[i].Title}</td>
                <td>${parsedData[i].Artist}</td>
                <td>${parsedData[i].Genre}</td>
                <td>${parsedData[i].Sales}</td>
                <td>${parsedData[i].TimesInCart}</td>
                <td>
                    <button type="button" class="btn btn-primary btn-sm" id = "removeOneFromCartButton${parsedData[i].ID}">Remove 1 from cart</button>
                </td>
                <td>
                    <button type="button" class="btn btn-primary btn-sm" id = "removeAllFromCartButton${parsedData[i].ID}">Remove all from cart</button>
                </td>
            </tr>`;
        }

        tableHTML += TABLE_FOOTER;
        $("#mainContent").html(tableHTML);

        $("button[id^='removeOneFromCartButton']").on("click", function (){
            let buttonID = $(this)[0].id.replace("removeOneFromCartButton", "");
            removeOneItemOccurrenceFromCart(buttonID, currentPage);
        });
        $("button[id^='removeAllFromCartButton']").on("click", function (){
            let buttonID = $(this)[0].id.replace("removeAllFromCartButton", "");
            removeAllItemOccurrencesFromCart(buttonID, currentPage);
        });
    })
}

function changePage(currentPage, pageIncrement) {
    currentPage += pageIncrement;
    if (currentPage < 1) {
        return 1; // don't do another get request if were not gonna change anything
    }
    // sth like if currentPage > maxpage, crtpage = maxpage
    setMainContentData(currentPage);
    return currentPage;
}

$(document).ready(function() {
    let currentPage = 1;
    let currentGenre = "";
    setMainContentData(currentPage, currentGenre);

    $("#previousPageButton").click(function() {
        currentPage = changePage(currentPage, -1);
    });
    $("#nextPageButton").click(function() {
        currentPage = changePage(currentPage, +1);
    });
})