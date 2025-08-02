let myLibrary = [];

function createBook(title, author, pages, isRead) {
  return {
    id: Date.now(),
    title,
    author,
    pages,
    isRead
  };
}

function addBookToLibrary(title, author, pages, isRead) {
  const newBook = createBook(title, author, pages, isRead);
  myLibrary.push(newBook);
  displayBooks();
}

function displayBooks() {
  const list = document.getElementById('book-list');
  list.innerHTML = '';

  myLibrary.forEach(book => {
    const card = document.createElement('div');
    card.classList.add('book-card'); 
    card.innerHTML = `
      <h3>${book.title}</h3>
      <p>Author: ${book.author}</p>
      <p>Pages: ${book.pages}</p>
      <p>Read: ${book.isRead ? 'Yes' : 'No'}</p>
      <button class="toggle-read">Toggle Read</button>
      <button class="remove-book">Remove</button>
    `;

    
    const toggleBtn = card.querySelector('.toggle-read');
    const removeBtn = card.querySelector('.remove-book');

    toggleBtn.addEventListener('click', () => {
      book.isRead = !book.isRead;
      displayBooks();
    });

    removeBtn.addEventListener('click', () => {
      myLibrary = myLibrary.filter(b => b.id !== book.id);
      displayBooks();
    });

    list.appendChild(card);
  });
}

document.getElementById('new-book-btn').addEventListener('click', () => {
  const form = document.getElementById('book-form');
  form.style.display = form.style.display === 'none' ? 'block' : 'none';
});

document.getElementById('book-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const isRead = document.getElementById('isRead').checked;

  addBookToLibrary(title, author, pages, isRead);
  this.reset();
  this.style.display = 'none';
});


addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false);
