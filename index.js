// var cover = `http://covers.openlibrary.org/b/id/${books[i].cover_i}-M.jpg`;
// var url = `https://openlibrary.org/search.json?q=${...}`;

window.onload = () => {
    currency = "USD";
    url = "https://www.googleapis.com/books/v1/volumes?q=search+terms&maxResults=30"
        // url = "https://openlibrary.org/search.json?q=the+lord+of+the+rings&page=5";
    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.onload = () => {
        if (request.status >= 200 && request.status < 400) {
            var data = JSON.parse(request.responseText);
            var books = data.items;
            console.log(books);

            // content.innerHTML = "";
            // for (var i = 0; i < coins.length; i++) {
            //     displayCards(coins, currency, i);
            // }
        } else {
            window.alert("There's a problem contacting the server, Please refresh or try again in a few moments.");
        };
    };

    request.onerror = () => {
        window.alert("There's a problem contacting the server, Please refresh or try again in a few moments.");
    }
    request.send();
}

const displayCards = (books, i) => {
    var card =
        `<div class="card col-sm-3 mx-sm-5" style="margin:20px; padding-left:0; padding-right:0;">
            <img src="${coins[i].iconUrl}" class="card-img-top" alt="${coins[i].name}" style="height:200px; margin:10px;">
            <h4 class = "card-header">
                ${coins[i].name}
            </h4>
            <div class="card-body">
                <h5 class="card-title">${coins[i].symbol}</h5>
                <p class="card-text">${coins[i].description}</p>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Rank: ${coins[i].rank}</li>
                <li class="list-group-item">Price: ${coins[i].price} ${currency}</li>
                <li class="list-group-item">24h Price change: ${coins[i].change}%</li>
                <li class="list-group-item">Market Cap: ${coins[i].marketCap} ${currency}</li>
                <li class="list-group-item">Circulation: ${coins[i].circulatingSupply}</li>
            </ul>
            <div class="card-footer text-muted">
                ${coins[i].slug}
            </div>
        </div>`
    content.insertAdjacentHTML('beforeend', card);
}