// New games data
const newGames = [
    {
        id: "game7",
        title: "Cyber Racer 2023",
        category: "Racing",
        thumbnail: "https://via.placeholder.com/300x170?text=Cyber+Racer"
    },
    {
        id: "game8",
        title: "Monster Hunter",
        category: "Action",
        thumbnail: "https://via.placeholder.com/300x170?text=Monster+Hunter"
    },
    {
        id: "game9",
        title: "City Builder Pro",
        category: "Simulator",
        thumbnail: "https://via.placeholder.com/300x170?text=City+Builder"
    },
    {
        id: "game10",
        title: "Color Match",
        category: "Puzzle",
        thumbnail: "https://via.placeholder.com/300x170?text=Color+Match"
    },
    {
        id: "game11",
        title: "Treasure Island",
        category: "Adventure",
        thumbnail: "https://via.placeholder.com/300x170?text=Treasure+Island"
    },
    {
        id: "game12",
        title: "Basketball Stars",
        category: "Sports",
        thumbnail: "https://via.placeholder.com/300x170?text=Basketball+Stars"
    }
];

// Load new games when the DOM is ready
document.addEventListener("DOMContentLoaded", function() {
    renderGames(newGames, 'new-games');
    
    // Add to global games array for search
    window.allGames = window.allGames.concat(newGames);
});
