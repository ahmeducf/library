// Constructors
function Library() {
  this.libraryBooks = [];
  this.readBooksNumber = 0;
}

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

Library.prototype.addBook = function addBook(title, author, pages, isRead) {
  this.libraryBooks.push(new Book(title, author, pages, isRead));
  if (isRead) {
    this.readBooksNumber += 1;
  }
};

// Library object and stub book objects
const myLibrary = new Library();
myLibrary.addBook(
  'Computer Systems: A programmer perspective',
  'Randal Bryant',
  1500,
  true
);
myLibrary.addBook('The Prince', 'Niccolo Machiavelli', 250, false);

// DOM
const addNewBookButton = document.querySelector('form button[type="submit"]');
const deleteAllBooksButton = document.querySelector('main .summary button');
const removeBookButton = document.querySelectorAll(
  'main .books-list tbody tr td:last-of-type i'
);
const readStatusButton = document.querySelectorAll(
  'main .books-list tbody tr td:nth-child(4) i'
);

// Functions
function appendBookRowToBooksTable(title, author, pages, isRead) {
  const tableBody = document.querySelector('main .books-list tbody');
  const tr = document.createElement('tr');

  const tdTitle = document.createElement('td');
  const tdAuthor = document.createElement('td');
  const tdPages = document.createElement('td');
  const tdStatus = document.createElement('td');
  const iStatusSymbol = document.createElement('i');
  const tdRemove = document.createElement('td');
  const iRemoveSymbol = document.createElement('i');

  tdTitle.innerText = title;
  tdAuthor.innerText = author;
  tdPages.innerText = pages;

  tdStatus.appendChild(iStatusSymbol);
  if (isRead) {
    iStatusSymbol.classList.add('fa-solid', 'fa-check', 'book-read');
  } else {
    iStatusSymbol.classList.add('fa-solid', 'fa-xmark', 'book-not-read');
  }

  tdRemove.appendChild(iRemoveSymbol);
  iRemoveSymbol.classList.add('fa-solid', 'fa-trash-can');

  tr.append(tdTitle, tdAuthor, tdPages, tdStatus, tdRemove);
  tableBody.appendChild(tr);
}

function displayLibraryBooks() {
  myLibrary.libraryBooks.forEach((book) => {
    appendBookRowToBooksTable(book.title, book.author, book.pages, book.isRead);
  });
}

function updateLibrarySummary() {}

// Event Listeners
window.addEventListener('load', () => {
  displayLibraryBooks();
  updateLibrarySummary();
});

addNewBookButton.addEventListener('click', (e) => {
  console.dir(e);
});

deleteAllBooksButton.addEventListener('click', (e) => {
  console.dir(e);
});

[...removeBookButton].forEach((book) => {
  book.addEventListener('click', (e) => {
    console.dir(e);
  });
});

[...readStatusButton].forEach((button) => {
  button.addEventListener('click', (e) => {
    console.dir(e);
  });
});
