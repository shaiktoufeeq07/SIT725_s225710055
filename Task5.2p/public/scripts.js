const container = document.getElementById('booksDisplay');

async function loadBooks() {
  container.textContent = 'Loading books...';

  try {
    const response = await fetch('/api/books');
    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message || 'Unable to load books');
    }

    const books = Array.isArray(json.data) ? json.data : [];
    container.innerHTML = '';

    if (books.length === 0) {
      container.textContent = 'No books available.';
      return;
    }

    books.forEach(book => {
      const card = document.createElement('div');
      card.className = 'book-card';
      card.innerHTML = `
        <h2>${book.title}</h2>
        <p>${book.author}</p>
      `;
      container.appendChild(card);
    });
  } catch (error) {
    console.error(error);
    container.textContent = 'Error loading books.';
  }
}

window.onload = loadBooks;
