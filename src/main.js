// Constructors
function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = Number(pages);
  this.isRead = isRead;
}

const library = (() => {
  const libraryBooks = [];
  let readBooksNumber = 0;

  const addBook = function addBook(title, author, pages, isRead) {
    libraryBooks.push(new Book(title, author, pages, isRead));
    if (isRead) {
      readBooksNumber += 1;
    }
  };

  const removeAll = function removeAll() {
    libraryBooks.splice(0);
    readBooksNumber = 0;
  };

  const removeBook = function removeBook(bookIndex) {
    if (libraryBooks[bookIndex].isRead) {
      readBooksNumber -= 1;
    }
    libraryBooks.splice(bookIndex, 1);
  };

  const unreadBook = function unreadBook(bookIndex) {
    libraryBooks[bookIndex].isRead = false;
    readBooksNumber -= 1;
  };

  const readBook = function readBook(bookIndex) {
    libraryBooks[bookIndex].isRead = true;
    readBooksNumber += 1;
  };

  const getLibraryBooks = function getLibraryBooks() {
    return libraryBooks;
  };

  const getBooksNumber = function getBooksNumber() {
    return libraryBooks.length;
  };

  const getReadBooksNumber = function getReadBooksNumber() {
    return readBooksNumber;
  };

  return {
    getLibraryBooks,
    getBooksNumber,
    getReadBooksNumber,
    readBook,
    unreadBook,
    addBook,
    removeAll,
    removeBook,
  };
})();

library.addBook(
  'Computer Systems: A programmer perspective',
  'Randal Bryant',
  1500,
  true
);
library.addBook('The Prince', 'Niccolo Machiavelli', 250, false);

// DOM
const addNewBookButton = document.querySelector('form button[type="submit"]');
const deleteAllBooksButton = document.querySelector('main .summary button');

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
  library.getLibraryBooks().forEach((book) => {
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

  totalBooksNumberDiv.innerText = library.getBooksNumber();
  readBooksNumberDiv.innerText = library.getReadBooksNumber();
  unreadBooksNumberDiv.innerText =
    library.getBooksNumber() - library.getReadBooksNumber();
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
  } else if (bookPages < 1 || bookPages > 10000) {
    errorTextSpan[2].innerText = 'Enter a number between 1 and 10000.';
    errorTextSpan[2].style.visibility = 'visible';
  } else {
    errorTextSpan[2].style.visibility = 'hidden';
  }
}

function deleteAllBooks() {
  const allBooks = document.querySelectorAll('main .books-list tbody tr');

  library.removeAll();

  [...allBooks].forEach((book) => book.remove());

  updateLibrarySummary();
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
      bookTitle !== '' &&
      bookAuthor !== '' &&
      bookPages !== '' &&
      bookPages > 0 &&
      bookPages <= 10000
    );
  };

  toggleValidationMessages(bookTitle, bookAuthor, bookPages);

  if (isValidForm()) {
    library.addBook(bookTitle, bookAuthor, parseInt(bookPages, 10), bookIsRead);
    appendBookRowToBooksTable(
      bookTitle,
      bookAuthor,
      parseInt(bookPages, 10),
      bookIsRead
    );
    form.reset();
    updateLibrarySummary();
  }
});

deleteAllBooksButton.addEventListener('click', deleteAllBooks);

document.addEventListener('click', (e) => {
  const { target } = e;
  const bookIndex = target.parentNode.parentNode.rowIndex - 1;

  if (target.classList.contains('fa-trash-can')) {
    library.removeBook(bookIndex);

    target.parentNode.parentNode.remove();
    updateLibrarySummary();
  } else if (target.classList.contains('fa-check')) {
    library.unreadBook(bookIndex);

    target.classList.remove('fa-check', 'book-read');
    target.classList.add('fa-xmark', 'book-not-read');
    updateLibrarySummary();
  } else if (target.classList.contains('fa-xmark')) {
    library.readBook(bookIndex);

    target.classList.remove('fa-xmark', 'book-not-read');
    target.classList.add('fa-check', 'book-read');
    updateLibrarySummary();
  }
});
