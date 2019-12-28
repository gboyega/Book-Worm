var content = document.getElementById("content");
var search = document.getElementById("search");

search.addEventListener("click", () => {
    var searchText = document.getElementById("searchText").value;
    var url = getUrl(searchText);
    if (searchText !== "" && searchText.trim(" ").length !== 0) {
        getData(url);
        
    } else {
        window.alert("Please enter a search term that contains at least one alphanumeric character")
    }
    searchText = "";
});

window.onload = () => {
    v
    getData(getUrl("Happy people"));
};

const getData = (url) => {
    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.onload = () => {
        if (request.status = 200) {
            var data = JSON.parse(request.responseText);
            var books = data.items;
            var eligible = [];
            for (x = 0; x < books.length; x++) {
                if (books[x].volumeInfo.imageLinks != null &&
                     books[x].volumeInfo.authors != null && 
                     books[x].volumeInfo.industryIdentifiers != null) {
                    eligible.push(books[x]);
                } else {
                    continue;
                }
            }
            content.innerHTML = "";
            for (var i = 0; i < eligible.length; i++) {
                displayCards(eligible, i);
            }
        } else {
            window.alert("There's a problem contacting the server, Please refresh or try again in a few moments.");
        }
    };

    request.onerror = () => {
        window.alert("There's a problem contacting the server, Please refresh or try again in a few moments.");
    };
    request.send();
};

const getUrl = (searchText) => {
    var url = `https://www.googleapis.com/books/v1/volumes?q=${searchText}&download=epub&maxResults=40`;
    return url;
};

const displayCards = (books, i) => {
    var info = books[i].volumeInfo;
    var card =
        `<div class="card border-secondary m-2 mt-3 mb-3">
            <div class="row no-gutters">
                <div class="col-xl-2 text-center">
                    <img src="${info.imageLinks.thumbnail}" class="card-img m-2" alt= ${info.title}+"cover" style="width:200px;">
                    <p><a href="${info.previewLink}" class="card-link text-success" target="_blank">Preview</a></p>
                    <p><a href="${books[i].accessInfo.epub.downloadLink}" class="card-link text-success" target="_blank">Download</a></p>
                
                </div>

                <div class="col-xl-10">
                    <div class="card-body">
                        <h5 class="card-title">${info.title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted"></h6>
                        <p class="card-text">${info.description}</p>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Author: ${info.authors.join(", ")}</li>
                        <li class="list-group-item">Published: ${info.publishedDate}</li>
                        <li class="list-group-item">Publisher: ${info.publisher}</li>
                        <li class="list-group-item">${info.industryIdentifiers[0].type}: ${info.industryIdentifiers[0].identifier}</li>
                        <li class="list-group-item">Category: ${info.categories}</li>
                    </ul>
                    <div class="card-footer text-muted">
                        Data from <a href="${info.infoLink}" class="card-link text-success" target="_blank">Google Books</a>
                    </div>
                   
                </div>
            </div>
        </div>`
    content.insertAdjacentHTML('beforeend', card);
};