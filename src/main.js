const library = [];

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

const computerSystemsBook = new Book(
  'Computer Systems: A programmer perspective',
  'Randal Bryant',
  1500,
  true
);
const ThePrinceBook = new Book('The Prince', 'Niccolo Machiavelli', 250, false);

library.push(...[computerSystemsBook, ThePrinceBook]);
