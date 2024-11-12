document.addEventListener("DOMContentLoaded", function () {
  // get form input book
  const bookForm = document.getElementById("bookForm");

  // listener submit form
  bookForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const bookFormId = document.getElementById("bookFormId").value;

    if (!bookFormId) {
      addBook();
    } else {
      editBook(bookFormId);
    }
  });

  const searchForm = document.getElementById("searchBook");

  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    searchBookByTitle();
  });

  if (isStorageExist()) {
    loadDataFromStorage();
  }
});

document.addEventListener("ondatasaved", () => {
  console.log("Data berhasil disimpan.");
});

document.addEventListener("ondataloaded", () => {
  refreshDataFromBooks();
});
