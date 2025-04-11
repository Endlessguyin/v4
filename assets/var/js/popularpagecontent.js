const newGames = [
    {
        id: "0000",
        title: "Sky Riders",
        category: "Racing",
        thumbnail: "/assets/img/applications-img/sky-riders.png",
        url: "/g/sky-riders/"
    },
    {
        id: "N/A",
        title: "N/A",
        category: "N/A",
        thumbnail: "/assets/img/essential/404.png",
        url: "/g/nan/"
    },
    {
        id: "N/A",
        title: "N/A",
        category: "N/A",
        thumbnail: "/assets/img/essential/404.png",
        url: "/g/nan/"
    },
    {
        id: "N/A",
        title: "N/A",
        category: "N/A",
        thumbnail: "/assets/img/essential/404.png",
        url: "/g/nan/"
    },
    {
        id: "N/A",
        title: "N/A",
        category: "N/A",
        thumbnail: "/assets/img/essential/404.png",
        url: "/g/nan/"
    },
    {
        id: "N/A",
        title: "N/A",
        category: "N/A",
        thumbnail: "/assets/img/essential/404.png",
        url: "/g/nan/"
    }
];

document.addEventListener("DOMContentLoaded", function() {
    if (typeof renderGames === 'function') {
        renderGames(newGames, 'new-games');
    }
    
    window.allGames = window.allGames || [];
    window.allGames = window.allGames.concat(newGames);
});