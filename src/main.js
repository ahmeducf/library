const pubsub = (() => {
  const events = {};

  const publish = (eventName, data) => {
    if (events[eventName]) {
      events[eventName].forEach((fn) => {
        fn(data);
      });
    }
  };

  const subscribe = (eventName, fn) => {
    events[eventName] = events[eventName] ?? [];
    events[eventName].push(fn);
  };

  const unSubscribe = (eventName, fn) => {
    if (events[eventName]) {
      for (let i = 0; i < events[eventName].length; i++) {
        if (events[eventName][i] === fn) {
          events[eventName].splice(i, 1);
          break;
        }
      }
    }
  };

  return {
    publish,
    subscribe,
    unSubscribe,
  };
})();

function Book(title, author, pages, status) {
  const bookTitle = title;
  const bookAuthor = author;
  const bookPages = pages;
  let bookStatus = status;

  const getTitle = () => bookTitle;
  const getAuthor = () => bookAuthor;
  const getPagesNumber = () => Number(bookPages);
  const getReadStatus = () => bookStatus;
  const setReadStatus = (s) => {
    bookStatus = s;
  };

  return { getTitle, getAuthor, getPagesNumber, getReadStatus, setReadStatus };
}

const library = (() => {
  const libraryBooks = [];
  let readBooksNumber = 0;

  const addBook = function addBook(book) {
    const { title, author, pages, isRead } = book;

    libraryBooks.push(Book(title, author, pages, isRead));
    if (isRead) {
      readBooksNumber += 1;
    }
  };

  const removeAll = function removeAll() {
    libraryBooks.splice(0);
    readBooksNumber = 0;
  };

  const removeBook = function removeBook(bookIndex) {
    if (libraryBooks[bookIndex].getReadStatus()) {
      readBooksNumber -= 1;
    }
    libraryBooks.splice(bookIndex, 1);
  };

  const unreadBook = function unreadBook(bookIndex) {
    libraryBooks[bookIndex].setReadStatus(false);
    readBooksNumber -= 1;
  };

  const readBook = function readBook(bookIndex) {
    libraryBooks[bookIndex].setReadStatus(true);
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

  // Bind events
  pubsub.subscribe('addBook', addBook);
  pubsub.subscribe('removeBook', removeBook);
  pubsub.subscribe('deleteAllBooks', removeAll);
  pubsub.subscribe('readBook', readBook);
  pubsub.subscribe('unreadBook', unreadBook);

  return {
    getLibraryBooks,
    getBooksNumber,
    getReadBooksNumber,
    addBook,
  };
})();

library.addBook({
  title: 'Computer Systems: A programmer perspective',
  author: 'Randal Bryant',
  pages: 1500,
  isRead: true,
});
library.addBook({
  title: 'The Prince',
  author: 'Niccolo Machiavelli',
  pages: 250,
  isRead: false,
});

// Display Controller
(() => {
  // Cache DOM
  const form = document.querySelector('form');
  const tableBody = document.querySelector('main .books-list tbody');
  const errorTextSpan = document.querySelectorAll('form span.validation-error');
  const totalBooksNumberDiv = document.querySelector(
    '.summary-item:nth-of-type(1) div:last-child'
  );
  const readBooksNumberDiv = document.querySelector(
    '.summary-item:nth-of-type(2) div:last-child'
  );
  const unreadBooksNumberDiv = document.querySelector(
    '.summary-item:nth-of-type(3) div:last-child'
  );

  function appendBookToTable(title, author, pages, isRead) {
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
      appendBookToTable(
        book.getTitle(),
        book.getAuthor(),
        book.getPagesNumber(),
        book.getReadStatus()
      );
    });
  }

  function updateLibrarySummary() {
    totalBooksNumberDiv.innerText = library.getBooksNumber();
    readBooksNumberDiv.innerText = library.getReadBooksNumber();
    unreadBooksNumberDiv.innerText =
      library.getBooksNumber() - library.getReadBooksNumber();
  }

  function loadLibraryData() {
    displayLibraryBooks();
    updateLibrarySummary();
  }

  function toggleValidationMessages(bookTitle, bookAuthor, bookPages) {
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

  function isValidForm(bookTitle, bookAuthor, bookPages) {
    return (
      bookTitle !== '' &&
      bookAuthor !== '' &&
      bookPages !== '' &&
      bookPages > 0 &&
      bookPages <= 10000
    );
  }

  function deleteAllBooks() {
    const allBooks = document.querySelectorAll('main .books-list tbody tr');
    [...allBooks].forEach((book) => book.remove());
  }

  function removeBook(target) {
    target.parentNode.parentNode.remove();
  }

  function unreadBook(target) {
    target.classList.remove('fa-check', 'book-read');
    target.classList.add('fa-xmark', 'book-not-read');
  }

  function readBook(target) {
    target.classList.remove('fa-xmark', 'book-not-read');
    target.classList.add('fa-check', 'book-read');
  }

  function listenButtonsClicks(e) {
    const { target } = e;
    const bookIndex = target.parentNode.parentNode.rowIndex - 1;

    if (target.classList.contains('fa-trash-can')) {
      removeBook(target);
      pubsub.publish('removeBook', bookIndex);

      updateLibrarySummary();
    } else if (target.classList.contains('fa-check')) {
      unreadBook(target);
      pubsub.publish('unreadBook', bookIndex);

      updateLibrarySummary();
    } else if (target.classList.contains('fa-xmark')) {
      readBook(target);
      pubsub.publish('readBook', bookIndex);

      updateLibrarySummary();
    } else if (target.getAttribute('id') === 'add-book-btn') {
      e.preventDefault();

      const bookTitle = document.querySelector('form input#title').value;
      const bookAuthor = document.querySelector('form input#author').value;
      const bookPages = document.querySelector('form input#pages').value;
      const bookIsRead = document.querySelector('form input#read').checked;

      toggleValidationMessages(bookTitle, bookAuthor, bookPages);

      if (isValidForm(bookTitle, bookAuthor, bookPages)) {
        appendBookToTable(
          bookTitle,
          bookAuthor,
          parseInt(bookPages, 10),
          bookIsRead
        );
        pubsub.publish('addBook', {
          title: bookTitle,
          author: bookAuthor,
          pages: parseInt(bookPages, 10),
          isRead: bookIsRead,
        });

        form.reset();
        updateLibrarySummary();
      }
    } else if (target.getAttribute('id') === 'delete-all-btn') {
      pubsub.publish('deleteAllBooks');
      deleteAllBooks();

      updateLibrarySummary();
    }
  }

  // Bind events
  window.addEventListener('load', loadLibraryData);
  document.addEventListener('click', listenButtonsClicks);
})();
