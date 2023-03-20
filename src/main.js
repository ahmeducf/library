// Constructors
function Library() {
  this.libraryBooks = [];
  this.readBooksNumber = 0;
}

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = Number(pages);
  this.isRead = isRead;
}

Library.prototype.addBook = function addBook(title, author, pages, isRead) {
  this.libraryBooks.push(new Book(title, author, pages, isRead));
  if (isRead) {
    this.readBooksNumber += 1;
  }
};

Library.prototype.removeAll = function removeAll() {
  this.libraryBooks.splice(0);
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

function updateLibrarySummary() {
  const totalBooksNumberDiv = document.querySelector(
    '.summary-item:nth-of-type(1) div:last-child'
  );
  const readBooksNumberDiv = document.querySelector(
    '.summary-item:nth-of-type(2) div:last-child'
  );
  const unreadBooksNumberDiv = document.querySelector(
    '.summary-item:nth-of-type(3) div:last-child'
  );

  totalBooksNumberDiv.innerText = myLibrary.libraryBooks.length;
  readBooksNumberDiv.innerText = myLibrary.readBooksNumber;
  unreadBooksNumberDiv.innerText =
    myLibrary.libraryBooks.length - myLibrary.readBooksNumber;
}

function toggleValidationMessages(bookTitle, bookAuthor, bookPages) {
  const errorTextSpan = document.querySelectorAll('form span.validation-error');

  if (bookTitle === '') {
    errorTextSpan[0].style.visibility = 'visible';
  } else {
    errorTextSpan[0].style.visibility = 'hidden';
  }

  if (bookAuthor === '') {
    errorTextSpan[1].style.visibility = 'visible';
  } else {
    errorTextSpan[1].style.visibility = 'hidden';
  }

  if (bookPages === '') {
    errorTextSpan[2].style.visibility = 'visible';
  } else if (bookPages < 1) {
    errorTextSpan[2].innerText = 'Please enter a number bigger than 0.';
    errorTextSpan[2].style.visibility = 'visible';
  } else {
    errorTextSpan[2].style.visibility = 'hidden';
  }
}

function deleteAllBooks() {
  const allBooks = document.querySelectorAll('main .books-list tbody tr');

  myLibrary.removeAll();
  [...allBooks].forEach((book) => book.remove());
}

// Event Listeners
window.addEventListener('load', () => {
  displayLibraryBooks();
  updateLibrarySummary();
});

addNewBookButton.addEventListener('click', (e) => {
  e.preventDefault();

  const form = document.querySelector('form');
  const bookTitle = document.querySelector('form input#title').value;
  const bookAuthor = document.querySelector('form input#author').value;
  const bookPages = document.querySelector('form input#pages').value;
  const bookIsRead = document.querySelector('form input#read').checked;

  const isValidForm = function isValidForm() {
    return (
      bookTitle !== '' && bookAuthor !== '' && bookPages !== '' && bookPages > 0
    );
  };

  toggleValidationMessages(bookTitle, bookAuthor, bookPages);

  if (isValidForm()) {
    myLibrary.addBook(
      bookTitle,
      bookAuthor,
      parseInt(bookPages, 10),
      bookIsRead
    );
    appendBookRowToBooksTable(
      bookTitle,
      bookAuthor,
      parseInt(bookPages, 10),
      bookIsRead
    );
    form.reset();
  }
});

deleteAllBooksButton.addEventListener('click', deleteAllBooks);

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
