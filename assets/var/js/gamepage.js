function navigate(page) {
    window.top.location.href = page;
}

document.addEventListener("DOMContentLoaded", function() {
    const youtubeBtn = document.getElementById("youtube-btn");
    const discordBtn = document.getElementById("discord-btn");
    const randomBtn = document.getElementById("random-btn");
    
    if (youtubeBtn) {
        youtubeBtn.addEventListener("click", function() {
            window.top.location.href = "https://www.youtube.com/@marki-vids"; 
        });
    }
    
    if (discordBtn) {
        discordBtn.addEventListener("click", function() {
            window.top.location.href = "https://discord.gg/geometrylearn";
        });
    }
    
    if (randomBtn) {
        randomBtn.addEventListener("click", function() {
            window.top.location.href = "https://example.com"; 
        });
    }
    
    const settingsBtn = document.getElementById('settings-btn');
    if (settingsBtn) {
        const settingsModal = document.getElementById('settings-modal');
        const closeModalBtn = document.getElementById('close-modal');
        
        settingsBtn.addEventListener('click', function() {
            settingsModal.style.display = 'flex';
        });
        
        closeModalBtn.addEventListener('click', function() {
            settingsModal.style.display = 'none';
        });
        
        settingsModal.addEventListener('click', function(event) {
            if (event.target === settingsModal) {
                settingsModal.style.display = 'none';
            }
        });
        
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && settingsModal.style.display === 'flex') {
                settingsModal.style.display = 'none';
            }
        });
    }