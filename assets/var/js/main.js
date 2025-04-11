function navigate(page) {
  window.top.location.href = page;
}

document.addEventListener("DOMContentLoaded", function () {
  const youtubeBtn = document.getElementById("youtube-btn");
  const discordBtn = document.getElementById("discord-btn");
  const randomBtn = document.getElementById("random-btn");

  if (youtubeBtn) {
    youtubeBtn.addEventListener("click", function () {
      window.top.location.href = "https://www.youtube.com/@marki-vids";
    });
  }

  if (discordBtn) {
    discordBtn.addEventListener("click", function () {
      window.top.location.href = "https://discord.gg/geometrylearn";
    });
  }

  if (randomBtn) {
    randomBtn.addEventListener("click", function () {
      window.top.location.href = "https://github.com/endlessguyin";
    });
  }

  const settingsBtn = document.getElementById("settings-btn");
  if (settingsBtn) {
    const settingsModal = document.getElementById("settings-modal");
    const closeModalBtn = document.getElementById("close-modal");

    settingsBtn.addEventListener("click", function () {
      settingsModal.style.display = "flex";
    });

    closeModalBtn.addEventListener("click", function () {
      settingsModal.style.display = "none";
    });

    settingsModal.addEventListener("click", function (event) {
      if (event.target === settingsModal) {
        settingsModal.style.display = "none";
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && settingsModal.style.display === "flex") {
        settingsModal.style.display = "none";
      }
    });
  }

  const searchInput = document.querySelector(".search-input");
  const clearIcon = document.querySelector(".clear-icon");

  if (searchInput && clearIcon) {
    function checkAndShowClearIcon() {
      if (searchInput.value.trim().length > 0) {
        clearIcon.style.display = "block";
      } else {
        clearIcon.style.display = "none";
      }
    }

    searchInput.addEventListener("input", function () {
      checkAndShowClearIcon();

      const query = searchInput.value.trim();
      performSearch(query);
    });

    clearIcon.addEventListener("click", function () {
      searchInput.value = "";
      clearIcon.style.display = "none";

      searchInput.dispatchEvent(new Event("input"));

      history.pushState("", document.title, window.location.pathname);

      searchInput.focus();
    });

    function checkUrlForSearchQuery() {
      let searchQuery = "";

      if (window.location.hash.startsWith("#searchquery=")) {
        searchQuery = decodeURIComponent(window.location.hash.substring(13));
      }

      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.has("searchquery")) {
        searchQuery = urlParams.get("searchquery");
      }

      if (searchQuery) {
        searchInput.value = searchQuery;
        checkAndShowClearIcon();

        setTimeout(() => {
          performSearch(searchQuery);
        }, 100);
      }
    }

    checkUrlForSearchQuery();

    window.addEventListener("hashchange", checkUrlForSearchQuery);
    window.addEventListener("popstate", checkUrlForSearchQuery);

    searchInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        const query = searchInput.value.trim();
        if (query) {
          window.location.hash = `searchquery=${encodeURIComponent(query)}`;
        } else {
          history.pushState("", document.title, window.location.pathname);
        }
      }
    });
  }

  const images = document.querySelectorAll("img");
  images.forEach(function (img) {
    img.addEventListener("error", function () {
      this.onerror = null;
      this.src = "/assets/img/essential/404.png";
    });
  });
});

window.allGames = window.allGames || [];

function renderGames(games, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = "";

  if (games.length === 0) {
    container.innerHTML =
      '<p class="no-results">No games found matching your search.</p>';
    return;
  }

  games.forEach((game) => {
    const gameWidget = document.createElement("div");
    gameWidget.className = "game-widget";
    gameWidget.onclick = function () {
      window.top.location.href = game.url;
    };

    gameWidget.innerHTML = `
      <img src="${game.thumbnail}" alt="${game.title}" class="game-thumbnail">
      <div class="game-info">
        <h3 class="game-title">${game.title}</h3>
        <p class="game-category">${game.category}</p>
      </div>
    `;

    container.appendChild(gameWidget);
  });
}

function performSearch(query) {
  if (!window.allGames || !Array.isArray(window.allGames)) {
    console.error("allGames array is not available");
    return;
  }

  const popularSection = document.getElementById("popular-section");
  const newSection = document.getElementById("new-section");

  if (query.length >= 2) {
    if (
      window.location.hash !==
      `#searchquery=${encodeURIComponent(query)}`
    ) {
      history.replaceState(
        null,
        null,
        `#searchquery=${encodeURIComponent(query)}`
      );
    }

    const results = window.allGames.filter(
      (game) =>
        game.title.toLowerCase().includes(query.toLowerCase()) ||
        game.category.toLowerCase().includes(query.toLowerCase())
    );

    if (popularSection) popularSection.style.display = "none";
    if (newSection) newSection.style.display = "none";

    if (!document.getElementById("search-section")) {
      const searchSection = document.createElement("div");
      searchSection.id = "search-section";
      searchSection.innerHTML = `
        <h2 class="section-title">Search Results for "${query}"</h2>
        <div class="games-grid" id="search-results"></div>
      `;
      document.querySelector(".content-area").appendChild(searchSection);
    } else {
      document.getElementById("search-section").style.display = "block";
      document.querySelector(
        "#search-section .section-title"
      ).textContent = `Search Results for "${query}"`;
    }

    renderGames(results, "search-results");
  } else if (query.length === 0) {
    if (window.location.hash) {
      history.pushState("", document.title, window.location.pathname);
    }

    const searchSection = document.getElementById("search-section");
    if (searchSection) {
      searchSection.style.display = "none";
    }

    if (popularSection) popularSection.style.display = "block";
    if (newSection) newSection.style.display = "block";
  }
}
