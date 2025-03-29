// Popular games data
const popularGames = [
    {
        id: "app-171",
        title: "The Final Earth 2",
        category: "Other",
        thumbnail: "/assets/img/application-img/the-final-earth-2.png",
        url: "/g/app-171"
    },
    {
        id: "game2",
        title: "Zombie Survival",
        category: "Action",
        thumbnail: "https://via.placeholder.com/300x170?text=Zombie+Survival",
        url: "/g/game2"
    },
    {
        id: "game3",
        title: "Farm Simulator",
        category: "Simulator",
        thumbnail: "https://via.placeholder.com/300x170?text=Farm+Simulator",
        url: "/g/game3"
    },
    {
        id: "game4",
        title: "Puzzle Master",
        category: "Puzzle",
        thumbnail: "https://via.placeholder.com/300x170?text=Puzzle+Master",
        url: "/g/game4"
    },
    {
        id: "game5",
        title: "Space Explorer",
        category: "Adventure",
        thumbnail: "https://via.placeholder.com/300x170?text=Space+Explorer",
        url: "/g/game5"
    },
    {
        id: "game6",
        title: "Football Pro",
        category: "Sports",
        thumbnail: "https://via.placeholder.com/300x170?text=Football+Pro",
        url: "/g/game6"
    }
];

// Load popular games when the DOM is ready
document.addEventListener("DOMContentLoaded", function() {
    renderGames(popularGames, 'popular-games');
    
    // Add to global games array for search
    window.allGames = window.allGames.concat(popularGames);
});
