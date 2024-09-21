const myLibrary = [];
let currentIndex = 0; // Initialize index counter

function booksInLibrary(title, author, pages, readStatus, index){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
    this.index = index;
    this.info = function () {
        const statusMessage = this.readStatus.toLowerCase() === 'yes' ? 'read' : 'not read yet';
        return `${this.title} by ${this.author}, ${this.pages} pages, ${statusMessage}.`
    };
}

function addBooksToLibrary(book){
    if (book instanceof booksInLibrary) {
        book.index = currentIndex; // Assign current index to the book
        myLibrary.push(book);
        currentIndex++; // Increment index counter
    } else {
        console.error("Invalid book object:", book);
    }
}

function createCards(array) {
    const cardContainer = document.getElementById('leftBox'); 
    array.forEach(book => {
        const card = document.createElement('div');
        card.classList.add('card');
        
        const title = document.createElement('h3');
        title.classList.add('card__title');
        title.textContent = book.title;

        const author = document.createElement('p');
        author.classList.add('card__content');
        author.textContent = book.author;

        const details = document.createElement('p');
        details.classList.add('card__content2');
        details.textContent = book.info();

        const readStatusLabel = document.createElement('label');
        readStatusLabel.setAttribute('for', 'readStatus');
        readStatusLabel.textContent = 'Read Status: ';

        const readStatusCheckbox = document.createElement('input');
        readStatusCheckbox.setAttribute('type', 'checkbox');
        readStatusCheckbox.setAttribute('name', 'readStatus');
        readStatusCheckbox.setAttribute('id', 'readStatus');
        if (book.readStatus === "yes") {
            readStatusCheckbox.setAttribute('checked', 'checked');
        }

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete Book';
        deleteButton.addEventListener('click', () => {
            deleteBook(book.index);
            cardContainer.innerHTML = '';
            createCards(myLibrary);
        });

        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(details);
        card.appendChild(readStatusLabel);
        card.appendChild(readStatusCheckbox);
        card.appendChild(deleteButton);

        cardContainer.appendChild(card);
    });
}

const addBook = document.getElementById('addBook');
addBook.addEventListener('click', takeBookInput);

function deleteBook(index) {
    if (index >= 0 && index < myLibrary.length) {
        myLibrary.splice(index, 1);
        myLibrary.forEach((book, i) => {
            book.index = i;
        });
    } else {
        console.error("Invalid index:", index);
    }
}


function takeBookInput(){
    const bookTitle = document.getElementById('bookTitle').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const readStatus = document.getElementById('readStatus').checked ? "yes" : "no";
    addBooksToLibrary(new booksInLibrary(bookTitle, author, pages, readStatus));
    const cardContainer = document.getElementById('leftBox'); 
    cardContainer.innerHTML = '';
    createCards(myLibrary);
}





