const INCOMPLETED_LIST = "incompleteBookList";
const COMPLETED_LIST = "completeBookList";

const BOOK_ITEMID = "itemId";

// add book function
function addBook() {
  // get element section
  const incompleteReadBook = document.getElementById(INCOMPLETED_LIST);
  const completeReadBook = document.getElementById(COMPLETED_LIST);

  // get element input
  const title = document.getElementById("bookFormTitle").value;
  const author = document.getElementById("bookFormAuthor").value;
  const year = document.getElementById("bookFormYear").value;
  const isComplete = document.getElementById("bookFormIsComplete").checked;

  // create object
  const bookObject = composeBookObject(
    title,
    author,
    parseInt(year),
    isComplete
  );

  // create book html
  const book = makeBook(bookObject.id, title, author, year, isComplete);

  // saved id
  book[BOOK_ITEMID] = bookObject.id;

  books.push(bookObject);

  // add to read or unread
  if (isComplete) {
    completeReadBook.append(book);
  } else {
    incompleteReadBook.append(book);
  }

  // UPDATE STORAGE
  updateDataToStorage();

  // Alert
  alert("Buku berhasil ditambahkan");
}

// make book function
function makeBook(id, title, author, year, isComplete) {
  // Create element in section
  const textTitle = document.createElement("h3");
  textTitle.innerText = title;
  textTitle.setAttribute("data-testid", "bookItemTitle");

  const textAuthor = document.createElement("p");
  textAuthor.innerText = `Penulis: ${author}`;
  textAuthor.setAttribute("data-testid", "bookItemAuthor");

  const textYear = document.createElement("p");
  textYear.innerText = `Tahun: ${year}`;
  textYear.setAttribute("data-testid", "bookItemYear");

  const action = document.createElement("div");

  // create button in book area
  if (isComplete) {
    action.append(
      createButtonIncompleted(),
      createButtonDelete(),
      createButtonEdit(id)
    );
  } else {
    action.append(
      createButtonCompleted(),
      createButtonDelete(),
      createButtonEdit(id)
    );
  }

  // create container
  const container = document.createElement("div");
  container.setAttribute("data-bookid", id);
  container.setAttribute("data-testid", "bookItem");
  container.setAttribute("id", "bookItem");

  container.append(textTitle, textAuthor, textYear, action);
  return container;
}

// created button
function createdButton(eventListener) {
  const button = document.createElement("button");

  // add event
  button.addEventListener("click", function (event) {
    eventListener(event);
  });
  return button;
}

// created completed button
function createButtonCompleted() {
  const buttonCompleted = createdButton(function (event) {
    addBookToCompleted(event.target.parentElement.parentElement);
  });

  // add properti data-testid
  buttonCompleted.setAttribute("data-testid", "bookItemIsCompleteButton");

  buttonCompleted.innerText = "Selesai dibaca";
  return buttonCompleted;
}

// created incompleted button
function createButtonIncompleted() {
  const buttonIncompleted = createdButton(function (event) {
    addBookToIncompleted(event.target.parentElement.parentElement);
  });

  // add properti data-testid
  buttonIncompleted.setAttribute("data-testid", "bookItemIsCompleteButton");

  buttonIncompleted.innerText = "Belum Selesai Dibaca";
  return buttonIncompleted;
}

// created deleted button
function createButtonDelete() {
  const buttonDelete = createdButton(function (event) {
    deleteBook(event.target.parentElement.parentElement);
  });

  // add properti data-testid
  buttonDelete.setAttribute("data-testid", "bookItemDeleteButton");

  buttonDelete.innerText = "Hapus Buku";
  return buttonDelete;
}

// Created edit button
function createButtonEdit(id) {
  const buttonEdit = createdButton(function (event) {
    createFormEditBook(id);
  });

  // add properti data-testid
  buttonEdit.setAttribute("data-testid", "bookItemEditButton");

  buttonEdit.innerText = "Edit Buku";
  return buttonEdit;
}

// Create Form edit
function createFormEditBook(id) {
  const book = books.find((book) => book.id === id);

  // isi form dengan data baru
  document.getElementById("bookFormId").value = book.id;
  document.getElementById("bookFormTitle").value = book.title;
  document.getElementById("bookFormAuthor").value = book.author;
  document.getElementById("bookFormYear").value = book.year;
  document.getElementById("bookFormIsComplete").checked = book.isComplete;

  document.getElementById("formTitle").textContent = "Edit Buku";
  document.getElementById("bookFormSubmit").textContent = "Simpan Perubahan";
  document.getElementById("bookFormCancel").style.display = "inline-block";

  // scroll to form
  document.getElementById("formTitle").scrollIntoView({ behavior: "smooth" });
}

// book to complete
function addBookToCompleted(bookElement) {
  const book = findBook(bookElement[BOOK_ITEMID]);

  book.isComplete = true;

  document.dispatchEvent(new Event("ondataloaded"));
  updateDataToStorage();
}

// book to incompleted
function addBookToIncompleted(bookElement) {
  const book = findBook(bookElement[BOOK_ITEMID]);
  book.isComplete = false;

  document.dispatchEvent(new Event("ondataloaded"));
  updateDataToStorage();
}

// delete book
function deleteBook(bookElement) {
  const confirmMessage = confirm("Apakah anda yakin?");
  if (!confirmMessage) {
    return false;
  } else {
    const bookPosition = findBookIndex(bookElement);
    books.splice(bookPosition, 1);

    bookElement.remove();
    updateDataToStorage();

    // Alert
    alert("Buku berhasil dihapus");
  }
}

// search by title
function searchBookByTitle() {
  const keyInput = document
    .getElementById("searchBookTitle")
    .value.toLowerCase();

  const bookItems = document.querySelectorAll("#bookItem");

  for (bookItem of bookItems) {
    const title = bookItem.firstElementChild.textContent.toLowerCase();

    if (title.includes(keyInput)) {
      bookItem.style.display = "block";
    } else if (keyInput === "") {
      bookItem.style.display = "";
    } else {
      bookItem.style.display = "none";
    }
  }
}

// reset form input
function resetForm() {
  document.getElementById("bookForm").reset();
  document.getElementById("bookFormId").value = "";
  document.getElementById("formTitle").innerText = "Tambah Buku Baru";
  document.getElementById("bookFormSubmit").innerText = "Masukkan Buku ke rak";
  document.getElementById("bookFormCancel").style.display = "none";
}

document.getElementById("bookFormCancel").addEventListener("click", resetForm);

// edit book
function editBook(bookId) {
  const title = document.getElementById("bookFormTitle").value;

  const author = document.getElementById("bookFormAuthor").value;
  const year = document.getElementById("bookFormYear").value;
  const isComplete = document.getElementById("bookFormIsComplete").checked;

  const book = findBook(parseInt(bookId));

  book.title = title;
  book.author = author;
  book.year = parseInt(year);
  book.isComplete = isComplete;

  document.dispatchEvent(new Event("ondataloaded"));
  updateDataToStorage();
}
