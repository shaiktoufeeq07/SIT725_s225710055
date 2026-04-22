const loadButton = document.getElementById('loadBooksBtn');
const booksList = document.getElementById('booksList');
const bookDetails = document.getElementById('bookDetails');

function createBookListItem(book) {
  const item = document.createElement('button');
  item.type = 'button';
  item.className = 'book-item';
  item.textContent = `${book.title} ${book.price} AUD`;
  item.addEventListener('click', () => loadBookDetails(book.id));
  return item;
}

function showBooksMessage(message) {
  booksList.innerHTML = '';
  const messageElement = document.createElement('p');
  messageElement.className = 'message';
  messageElement.textContent = message;
  booksList.appendChild(messageElement);
}

async function loadBooks() {
  booksList.textContent = 'Loading books...';
  bookDetails.innerHTML = '';

  try {
    const response = await fetch('/api/books');
    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message || 'Unable to load books');
    }

    const books = Array.isArray(json.data) ? json.data : [];
    booksList.innerHTML = '';

    if (books.length === 0) {
      showBooksMessage('No books available.');
      return;
    }

    books.forEach(book => {
      booksList.appendChild(createBookListItem(book));
    });
  } catch (error) {
    console.error(error);
    showBooksMessage('Error loading books.');
  }
}

function renderBookDetails(book) {
  bookDetails.innerHTML = '';

  if (!book) {
    bookDetails.textContent = 'Book details not found.';
    return;
  }

  const details = document.createElement('div');
  details.className = 'details-card';
  details.innerHTML = `
    <h2>${book.title}</h2>
    <p><strong>Author:</strong> ${book.author}</p>
    <p><strong>Year:</strong> ${book.year}</p>
    <p><strong>Genre:</strong> ${book.genre}</p>
    <p><strong>Summary:</strong> ${book.summary}</p>
    <p><strong>Price (AUD):</strong> ${book.price} AUD</p>
  `;
  bookDetails.appendChild(details);
}

async function loadBookDetails(bookId) {
  bookDetails.textContent = 'Loading book details...';

  try {
    const response = await fetch(`/api/books/${bookId}`);
    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message || 'Unable to load book details');
    }

    renderBookDetails(json.data);
  } catch (error) {
    console.error(error);
    bookDetails.textContent = 'Error loading book details.';
  }
}

loadButton.addEventListener('click', loadBooks);
