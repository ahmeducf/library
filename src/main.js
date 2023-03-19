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

// Library object and stub book objects
const myLibrary = new Library();
myLibrary.push(
  'Computer Systems: A programmer perspective',
  'Randal Bryant',
  1500,
  true
);
myLibrary.push('The Prince', 'Niccolo Machiavelli', 250, false);