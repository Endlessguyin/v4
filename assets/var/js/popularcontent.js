const heartOutlinePath = "/assets/img/essential/favorite-empty.png";
const heartFilledPath = "/assets/img/essential/favorite-filled.png";

const gamesList = [
  { id: "9012", title: "The Final Earth 2", category: "Sandbox", thumbnail: "/assets/img/applications-img/the-final-earth-2.png", url: "/g/the-final-earth-2/" },
  { id: "4123", title: "Tuner Racer", category: "Racing", thumbnail: "/assets/img/applications-img/tuner-racer.png", url: "/g/tuner-racer/" },
  { id: "4716", title: "Top Driver", category: "Racing", thumbnail: "/assets/img/applications-img/top-driver.png", url: "/g/top-driver/" },
  { id: "9122", title: "Block Tech: Epic Sandbox", category: "Sandbox", thumbnail: "/assets/img/applications-img/block-tech.png", url: "/g/block-tech/" },
  { id: "6142", title: "PolyTrack", category: "Racing", thumbnail: "/assets/img/applications-img/polytrack.png", url: "/g/polytrack/" },
  { id: "0812", title: "Indian Truck Driving", category: "Casual Driving", thumbnail: "/assets/img/applications-img/indian-truck-driving.png", url: "/g/indian-truck-driving/" },
  { id: "0811", title: "Slope", category: "Casual", thumbnail: "/assets/img/applications-img/slope.png", url: "/g/slope/" },
  { id: "2817", title: "Ultimate Car Driving Simulator", category: "Casual Driving", thumbnail: "/assets/img/applications-img/ultimate-car-driving-simulator.png", url: "/g/ultimate-car-driving-simulator/" },
  { id: "3683", title: "Discord", category: "Apps", thumbnail: "/assets/img/apps-img/discord.png", url: "/a/chat/" },
  { id: "3682", title: "DownGit", category: "Apps", thumbnail: "/assets/img/apps-img/downgit.png", url: "/a/downgit/" },
  { id: "3678", title: "Sky Riders", category: "Racing", thumbnail: "/assets/img/applications-img/sky-riders.png", url: "/g/sky-riders/" },
  { id: "3611", title: "Optric", category: "Puzzle", thumbnail: "/assets/img/applications-img/optric.png", url: "/g/optric/" },
  { id: "32400", title: "Granny Prison Escape", category: "Horror", thumbnail: "/assets/img/applications-img/granny-prison-escape.png", url: "/g/granny-prison-escape/" },
  { id: "32440", title: "Crazy Cars", category: "Casual Driving", thumbnail: "/assets/img/applications-img/crazy-cars.png", url: "/g/crazy-cars/" },
  { id: "32449", title: "Zombie Derby: Pixel Survival", category: "Casual", thumbnail: "/assets/img/applications-img/zombie-derby-pixel-survival.png", url: "/g/zombie-derby-pixel-survival/" },
  { id: "915616", title: "SpookyTrack", category: "Racing", thumbnail: "/assets/img/applications-img/spookytrack.png", url: "/g/spookytrack/" },
  { id: "515614", title: "Block Blast", category: "Puzzle", thumbnail: "/assets/img/applications-img/block-blast.png", url: "/g/block-blast/" },
  { id: "519924", title: "YoHoHo.io", category: ".io", thumbnail: "/assets/img/applications-img/yohoho-io.png", url: "/g/yohoho-io/" },
  { id: "519772", title: "Funny Shooter 2", category: "FPS", thumbnail: "/assets/img/applications-img/funny-shooter-2.png", url: "/g/funny-shooter-2/" },
  { id: "519771", title: "Ducklings.io", category: ".io", thumbnail: "/assets/img/applications-img/ducklings-io.png", url: "/g/ducklings-io/" },
  { id: "519770", title: "Idle Ants", category: "Idle", thumbnail: "/assets/img/applications-img/idle-ants.png", url: "/g/idle-ants/" },
  { id: "519769", title: "Raft Survival", category: "Survival", thumbnail: "/assets/img/applications-img/raft-survival.png", url: "/g/raft-survival/" },
  { id: "519768", title: "Grand Vegas Simulator", category: "Casual Driving", thumbnail: "/assets/img/applications-img/grand-vegas-simulator.png", url: "/g/grand-vegas-simulator/" },
  { id: "519767", title: "Sniper Shot: Bullet Time", category: "FPS", thumbnail: "/assets/img/applications-img/sniper-shot-bullet-time.png", url: "/g/sniper-shot-bullet-time/" },
  { id: "519766", title: "House Of Hazards", category: "Two Player", thumbnail: "/assets/img/applications-img/house-of-hazards.png", url: "/g/house-of-hazards/" },
  { id: "519765", title: "House Painter", category: "Casual", thumbnail: "/assets/img/applications-img/house-painter.png", url: "/g/house-painter/" },
  { id: "519764", title: "Sling Drift", category: "Casual", thumbnail: "/assets/img/applications-img/sling-drift.png", url: "/g/sling-drift/" },
  { id: "519763", title: "Blacktop: Police Chase", category: "Casual Driving", thumbnail: "/assets/img/applications-img/blacktop-police-chase.png", url: "/g/blacktop-police-chase/" },
];

function getFavorites() {
  return JSON.parse(localStorage.getItem("favoriteGames") || "[]");
}

function saveFavorites(favorites) {
  localStorage.setItem("favoriteGames", JSON.stringify(favorites));
}

function toggleFavorite(gameId, favButton) {
  let favorites = getFavorites();
  const imgElem = favButton.querySelector("img");
  const index = favorites.indexOf(gameId);
  if (index === -1) {
    favorites.push(gameId);
    favButton.classList.add("active");
    if (imgElem) imgElem.src = heartFilledPath;
  } else {
    favorites.splice(index, 1);
    favButton.classList.remove("active");
    if (imgElem) imgElem.src = heartOutlinePath;
  }
  saveFavorites(favorites);

  const path = window.location.pathname;
  if (path === "/favorites/" || path === "/favorites") {
    const updatedFavorites = getFavorites();
    const favoriteGames = gamesList.filter((game) =>
      updatedFavorites.includes(game.id)
    );
    const container = document.getElementById("popular-games");
    if (container) {
      if (favoriteGames.length === 0) {
        container.innerHTML = "<p>You have no favorites.</p>";
      } else {
        renderGames(favoriteGames, "popular-games");
      }
    }
  }
}

function renderGames(games, containerId) {
  const container = document.getElementById(containerId);
  if (!container) {
    return;
  }
  container.innerHTML = "";
  const favorites = getFavorites();

  games.forEach((game) => {
    const gameWidget = document.createElement("a");
    gameWidget.dataset.url = game.url;
    gameWidget.classList.add("game-widget");
    gameWidget.style.textDecoration = "none";

    gameWidget.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = game.url;
    });

    const imgElem = document.createElement("img");
    imgElem.src = game.thumbnail;
    imgElem.alt = game.title;
    imgElem.classList.add("game-thumbnail");
    gameWidget.appendChild(imgElem);

    if (containerId === "popular-games") {
      const favButton = document.createElement("button");
      favButton.classList.add("favorite-btn");
      favButton.addEventListener("click", (e) => {
        e.stopPropagation();
        e.preventDefault();
        toggleFavorite(game.id, favButton);
      });
      const favImg = document.createElement("img");
      favImg.src = favorites.includes(game.id)
        ? heartFilledPath
        : heartOutlinePath;
      favImg.alt = "Favorite";
      favButton.appendChild(favImg);
      gameWidget.appendChild(favButton);
    }

    const infoDiv = document.createElement("div");
    infoDiv.classList.add("game-info");

    const titleElem = document.createElement("h3");
    titleElem.textContent = game.title;
    titleElem.classList.add("game-title");
    infoDiv.appendChild(titleElem);

    const categoryElem = document.createElement("p");
    categoryElem.textContent = game.category;
    categoryElem.classList.add("game-category");
    infoDiv.appendChild(categoryElem);

    gameWidget.appendChild(infoDiv);
    container.appendChild(gameWidget);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;
  let gamesToRender = [];

  if (path === "/favorites/" || path === "/favorites") {
    const userFavorites = getFavorites();
    gamesToRender = gamesList.filter((game) =>
      userFavorites.includes(game.id)
    );
    const container = document.getElementById("popular-games");
    if (container) {
      if (gamesToRender.length === 0) {
        container.innerHTML = "<p>You have No Favorites.</p>";
      } else {
        renderGames(gamesToRender, "popular-games");
      }
    }
  } else if (path === "/racing/" || path === "/racing") {
    gamesToRender = gamesList.filter(
      (game) => game.category.toLowerCase() === "racing"
    );
    renderGames(gamesToRender, "popular-games");
  } else if (path === "/puzzle/" || path === "/puzzle") {
    gamesToRender = gamesList.filter(
      (game) => game.category.toLowerCase() === "puzzle"
    );
    renderGames(gamesToRender, "popular-games");
  } else if (path === "/a/" || path === "/apps") {
    gamesToRender = gamesList.filter(
      (game) => game.category.toLowerCase() === "apps"
    );
    renderGames(gamesToRender, "popular-games");
  } else if (path === "/horror/" || path === "/horror") {
    gamesToRender = gamesList.filter(
      (game) => game.category.toLowerCase() === "horror"
    );
    renderGames(gamesToRender, "popular-games");
  } else if (path === "/sandbox/" || path === "/sandbox") {
    gamesToRender = gamesList.filter(
      (game) => game.category.toLowerCase() === "sandbox"
    );
    renderGames(gamesToRender, "popular-games");
  } else if (path === "/driving/" || path === "/driving") {
    gamesToRender = gamesList.filter(
      (game) =>
        game.category.toLowerCase() === "casual driving"
    );
    renderGames(gamesToRender, "popular-games");
  } else if (path === "/io/" || path === "/io") {
    gamesToRender = gamesList.filter(
      (game) => game.category.toLowerCase() === ".io"
    );
    renderGames(gamesToRender, "popular-games");
  } else if (path === "/fps/" || path === "/fps") {
    gamesToRender = gamesList.filter(
      (game) => game.category.toLowerCase() === "fps"
    );
    renderGames(gamesToRender, "popular-games");
  } else if (path === "/idle/" || path === "/idle") {
    gamesToRender = gamesList.filter(
      (game) => game.category.toLowerCase() === "idle"
    );
    renderGames(gamesToRender, "popular-games");
  } else if (path === "/survival/" || path === "/survival") {
    gamesToRender = gamesList.filter(
      (game) => game.category.toLowerCase() === "survival"
    );
    renderGames(gamesToRender, "popular-games");
  } else if (path === "/two-player/" || path === "/two-player") {
    gamesToRender = gamesList.filter(
      (game) => game.category.toLowerCase() === "two player"
    );
    renderGames(gamesToRender, "popular-games");
  } else if (path === "/casual/" || path === "/casual") {
    gamesToRender = gamesList.filter(
      (game) => game.category.toLowerCase() === "casual"
    );
    renderGames(gamesToRender, "popular-games");
  } else {
    gamesToRender = gamesList.filter(
      (game) => game.category.toLowerCase() !== "apps"
    );
    renderGames(gamesToRender, "popular-games");
  }

  window.allGames = window.allGames || [];
  window.allGames = window.allGames.concat(gamesToRender);
});
