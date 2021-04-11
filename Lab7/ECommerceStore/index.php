<!DOCTYPE html>
<html lang="en">
<head>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="styles.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="script.js"></script>
    <title>taraba casete obor</title>
</head>

<body>
    <div class="mt-2 mr-2" align="right">
        <button type="button" class="btn btn-primary" id = "shoppingCartButton">Shopping cart (0)</button>
    </div>

    <div class="container text-center">
        <h1 id = "pageTitle">taraba casete obor</h1>
        <div class="form-group">
            <label for="searchByGenre">Genre</label>
            <input class="form-control form-control-lg" id="searchByGenre" placeholder="Enter genre">
        </div>
        <div id = "mainContent"></div>
        <div id = "totalAlbumCount"></div>
        <button type="button" class="btn btn-primary" id = "previousPageButton">Previous page</button>
        <button type="button" class="btn btn-primary" id = "nextPageButton">Next page</button>
    </div>
</body>
</html>