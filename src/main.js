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

Library.prototype.addBook = (title, author, pages, isRead) => {
  this.libraryBooks.push(new Book(title, author, pages, isRead));
  if (isRead) {
    this.readBooksNumber += 1;
  }
};

// Functions
function displayLibraryBooks() {}

function updateLibrarySummary() {}

// Library object and stub book objects
const myLibrary = new Library();
myLibrary.push(
  'Computer Systems: A programmer perspective',
  'Randal Bryant',
  1500,
  true
);
myLibrary.push('The Prince', 'Niccolo Machiavelli', 250, false);

// DOM
const addNewBookButton = document.querySelector('form button[type="submit"]');
const deleteAllBooksButton = document.querySelector('main .summary button');
const removeBookButton = document.querySelectorAll(
  'main .books-list tbody tr td:last-of-type i'
);
const readStatusButton = document.querySelectorAll(
  'main .books-list tbody tr td:nth-child(4) i'
);

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
