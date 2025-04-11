document.addEventListener("DOMContentLoaded", function () {
  window.allGames = [];

  const searchInput = document.querySelector('.search-input');
  const clearIcon = document.querySelector('.clear-icon');
  const searchContainer = document.querySelector('.search-container');


  let searchResults = document.querySelector('.search-results');
  if (!searchResults) {
    searchResults = document.createElement('div');
    searchResults.className = 'search-results';
    searchContainer.appendChild(searchResults);
  } else {
    searchResults.innerHTML = '';
  }

  function displayResults(games) {
    searchResults.innerHTML = '';

    if (games.length === 0) {
      searchResults.classList.remove('active');
      return;
    }

    games.forEach((game) => {
      const resultItem = document.createElement('div');
      resultItem.className = 'search-result-item';

      const thumbnail = document.createElement('img');
      thumbnail.className = 'search-result-thumbnail';
      thumbnail.src = game.thumbnail;
      thumbnail.alt = game.title;

      const infoDiv = document.createElement('div');
      infoDiv.className = 'search-result-info';

      const titleDiv = document.createElement('div');
      titleDiv.className = 'search-result-title';
      titleDiv.textContent = game.title;

      const categoryDiv = document.createElement('div');
      categoryDiv.className = 'search-result-category';
      categoryDiv.textContent = game.category;

      infoDiv.appendChild(titleDiv);
      infoDiv.appendChild(categoryDiv);

      resultItem.appendChild(thumbnail);
      resultItem.appendChild(infoDiv);

      resultItem.addEventListener('click', function () {
        if (game.url) {
          window.location.href = game.url;
        } else {
          window.location.href = `/g/${game.id}/`;
        }
      });

      searchResults.appendChild(resultItem);
    });

    searchResults.classList.add('active');
  }

  function searchGames(query) {
    if (!query) {
      searchResults.classList.remove('active');
      return;
    }

    query = query.toLowerCase();

    const filteredGames = window.allGames.filter(
      (game) =>
        game.title.toLowerCase().includes(query) ||
        game.category.toLowerCase().includes(query)
    );

    displayResults(filteredGames.slice(0, 6));
  }

  searchInput.addEventListener('input', function () {
    searchGames(this.value.trim());
  });

  clearIcon.addEventListener('click', function () {
    searchInput.value = '';
    searchResults.classList.remove('active');
  });

  document.addEventListener('click', function (event) {
    if (!searchContainer.contains(event.target)) {
      searchResults.classList.remove('active');
    }
  });
});