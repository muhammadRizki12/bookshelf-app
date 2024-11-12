// key local storage
const STORAGE_KEY = "BOOKSELF_APPS";

// data
let books = [];

// check type storage
function isStorageExist() {
  if (typeof Storage === undefined) {
    alert("Your browser not supported");
    return false;
  }
  return true;
}

// save data
function saveData() {
  const parsed = JSON.stringify(books);

  localStorage.setItem(STORAGE_KEY, parsed);
  document.dispatchEvent(new Event("ondatasaved"));
}

// load data from storage
function loadDataFromStorage() {
  const serialzedData = localStorage.getItem(STORAGE_KEY);

  // get data
  let data = JSON.parse(serialzedData);

  if (data !== null) {
    books = data;

    document.dispatchEvent(new Event("ondataloaded"));
  }
}

// update data to storage
function updateDataToStorage() {
  if (isStorageExist()) {
    saveData();
  }
}

// compose book object
function composeBookObject(title, author, year, isComplete) {
  return {
    id: +new Date(),
    title,
    author,
    year,
    isComplete,
  };
}

// find book
function findBook(bookId) {
  for (book of books) {
    if (book.id === bookId) return book;
  }
  return null;
}

// find book by index
function findBookIndex(bookId) {
  let index = 0;
  for (book of books) {
    if (book.id === bookId) return index;

    index++;
  }

  return -1;
}

// refresh data from books
function refreshDataFromBooks() {
  const listIncompleted = document.getElementById(INCOMPLETED_LIST);
  listIncompleted.innerHTML = "";
  const listCompleted = document.getElementById(COMPLETED_LIST);
  listCompleted.innerHTML = "";

  for (book of books) {
    const newBook = makeBook(
      book.id,
      book.title,
      book.author,
      book.year,
      book.isComplete
    );
    newBook[BOOK_ITEMID] = book.id;

    if (book.isComplete) {
      listCompleted.append(newBook);
    } else {
      listIncompleted.append(newBook);
    }
  }
}
