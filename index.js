// var url = `https://openlibrary.org/search.json?q=${...}`;
var content = document.getElementById("content");


window.onload = () => {
    currency = "USD";
    url = "https://www.googleapis.com/books/v1/volumes?q=jungle+book&maxResults=40"
        // url = "https://openlibrary.org/search.json?q=the+lord+of+the+rings&page=5";
    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.onload = () => {
        if (request.status >= 200 && request.status < 400) {
            var data = JSON.parse(request.responseText);
            var books = data.items;
            var eligible = [];
            for (x = 0; x < books.length; x++) {
                if (books[x].volumeInfo.imageLinks != null && books[x].volumeInfo.authors != null && books[x].volumeInfo.industryIdentifiers != null) {
                    eligible.push(books[x]);
                } else { continue; }
            }
            console.log(eligible);
            content.innerHTML = "";
            for (var i = 0; i < eligible.length; i++) {
                displayCards(eligible, i);
            }
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
    var info = books[i].volumeInfo;
    var card =
        `<div class="card border-secondary mb-3" style="margin:50px;">
            <div class="row no-gutters">
                <div class="col-md-2 text-center">
                    <img src="${info.imageLinks.thumbnail}" class="card-img" alt="cover" style="width:200px; margin:10px;">
                    <p><a href="${info.previewLink}" class="card-link">Preview</a></p>
                    <p><a href="${info.infoLink}" class="card-link">Get book</a></p> 
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${info.title}</h5>
                        <p class="card-text"><small class="text-muted">${info.subtitle}</small></p>
                        <p class="card-text">${info.description}</p>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Author: ${info.authors.join(", ")}</li>
                        <li class="list-group-item">Published: ${info.publishedDate}</li>
                        <li class="list-group-item">Publisher: ${info.publisher}</li>
                        <li class="list-group-item">${info.industryIdentifiers[0].type}: ${info.industryIdentifiers[0].identifier}</li>
                        <li class="list-group-item">Category: ${info.categories}</li>
                    </ul>
                </div>
            </div>
        </div>`
    content.insertAdjacentHTML('beforeend', card);
}