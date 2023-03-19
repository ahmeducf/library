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

// Library object and stub book objects
const computerSystemsBook = new Book(
  'Computer Systems: A programmer perspective',
  'Randal Bryant',
  1500,
  true
);
const ThePrinceBook = new Book('The Prince', 'Niccolo Machiavelli', 250, false);

const myLibrary = new Library();

myLibrary.libraryBooks.push(...[computerSystemsBook, ThePrinceBook]);
myLibrary.readBooksNumber += computerSystemsBook.isRead;
myLibrary.readBooksNumber += ThePrinceBook.isRead;
