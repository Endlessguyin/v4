document.addEventListener('DOMContentLoaded', function() {
    const playButton = document.getElementById('play-game-btn');
    const closeButton = document.getElementById('close-iframe-btn');
    const iframeContainer = document.getElementById('fullscreen-iframe-container');
    const gameIframe = document.getElementById('game-iframe');
    const gameDetails = document.getElementById('game-details');
    
    playButton.addEventListener('click', function() {
        const gameUrl = playButton.getAttribute('data-game-url');
        gameIframe.src = gameUrl;
        gameDetails.style.display = 'none';
        iframeContainer.classList.remove('hidden');
    });
    
    closeButton.addEventListener('click', function() {
        gameDetails.style.display = 'block';
        iframeContainer.classList.add('hidden');
        gameIframe.src = '';
    });
});