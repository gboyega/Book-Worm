var url;
var content = document.getElementById("content");
var search = document.getElementById("search");
// var searchQuery = searchText.value;

search.addEventListener("click", () => {
    var searchText = document.getElementById("searchText").value;
    // var searchQuery = searchText.textContent;
    console.log(searchText);
    url = `https://www.googleapis.com/books/v1/volumes?q=${searchText}&maxResults=40`;
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
                } else {
                    continue;
                }
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
})

window.onload = () => {
    url = "https://www.googleapis.com/books/v1/volumes?q=2019&maxResults=40"
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
            console.log(eligible, search, searchText); //searchQuery);
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
                    <p><a href="${info.previewLink}" class="card-link text-success" target="_blank">Preview</a></p>
                    <p><a href="${info.infoLink}" class="card-link text-success" target="_blank">Get book</a></p> 
                </div>
                <div class="col-md-10">
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