// Navigation function
function navigate(page) {
    window.location.href = page;
}

// Social media buttons
document.getElementById("youtube-btn").addEventListener("click", function() {
    window.location.href = "https://www.youtube.com/@marki-vids"; 
});

document.getElementById("discord-btn").addEventListener("click", function() {
    window.location.href = "https://discord.gg/geometrylearn";
});

document.getElementById("random-btn").addEventListener("click", function() {
    window.location.href = "https://example.com"; 
});

function renderGames(games, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = '';
    
    if (games.length === 0) {
        container.innerHTML = '<p class="no-results">No games found matching your search.</p>';
        return;
    }
    
    games.forEach(game => {
        const gameWidget = document.createElement('div');
        gameWidget.className = 'game-widget';
        gameWidget.onclick = function() {
            window.location.href = game.url;
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

window.allGames = [];

document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.querySelector('.search-input');
    const clearIcon = document.querySelector('.clear-icon');
    
    searchInput.addEventListener('input', function() {
        if (searchInput.value.trim().length > 0) {
            clearIcon.style.display = 'block';
        } else {
            clearIcon.style.display = 'none';
        }
        
        const query = searchInput.value.trim();
        performSearch(query);
    });
    
    clearIcon.addEventListener('click', function() {
        searchInput.value = '';
        clearIcon.style.display = 'none';
        
        searchInput.dispatchEvent(new Event('input'));
        
        history.pushState("", document.title, window.location.pathname);
        
        searchInput.focus();
    });
    
    if (window.location.hash.startsWith('#searchquery=')) {
        const query = decodeURIComponent(window.location.hash.substring(13));
        searchInput.value = query;
        
        if (query.trim().length > 0) {
            clearIcon.style.display = 'block';
        }
        
        setTimeout(() => {
            performSearch(query);
        }, 100);
    }
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const query = searchInput.value.trim();
            if (query) {
                window.location.hash = `searchquery=${encodeURIComponent(query)}`;
            } else {
                history.pushState("", document.title, window.location.pathname);
            }
        }
    });
    
    function performSearch(query) {
        if (query.length >= 2) {
            if (window.location.hash !== `#searchquery=${encodeURIComponent(query)}`) {
                history.replaceState(null, null, `#searchquery=${encodeURIComponent(query)}`);
            }
            
            const results = window.allGames.filter(game => 
                game.title.toLowerCase().includes(query.toLowerCase()) || 
                game.category.toLowerCase().includes(query.toLowerCase())
            );
            
            document.getElementById('popular-section').style.display = 'none';
            document.getElementById('new-section').style.display = 'none';
            
            if (!document.getElementById('search-section')) {
                const searchSection = document.createElement('div');
                searchSection.id = 'search-section';
                searchSection.innerHTML = `
                    <h2 class="section-title">Search Results for "${query}"</h2>
                    <div class="games-grid" id="search-results"></div>
                `;
                document.querySelector('.content-area').appendChild(searchSection);
            } else {
                document.getElementById('search-section').style.display = 'block';
                document.querySelector('#search-section .section-title').textContent = 
                    `Search Results for "${query}"`;
            }
            
            renderGames(results, 'search-results');
        } else if (query.length === 0) {
            if (window.location.hash) {
                history.pushState("", document.title, window.location.pathname);
            }
            
            if (document.getElementById('search-section')) {
                document.getElementById('search-section').style.display = 'none';
            }
            
            document.getElementById('popular-section').style.display = 'block';
            document.getElementById('new-section').style.display = 'block';
        }
    }
});
