document.addEventListener('DOMContentLoaded', function () {
  const playGameBtn = document.getElementById('play-game-btn');
  const fullscreenContainer = document.getElementById('fullscreen-iframe-container');
  const gameIframe = document.getElementById('game-iframe');
  const closeBtn = document.getElementById('close-iframe-btn');
  let refreshCooldown = false;

  const controlsContainer = document.createElement('div');
  controlsContainer.className = 'iframe-controls';
  
  closeBtn.parentNode.removeChild(closeBtn);
  controlsContainer.appendChild(closeBtn);
  
  const fullscreenBtn = document.createElement('button');
  fullscreenBtn.id = 'fullscreen-iframe-btn';
  fullscreenBtn.className = 'control-button';
  fullscreenBtn.innerHTML = '<span class="icon">⛶</span>';
  fullscreenBtn.title = 'Fullscreen';
  controlsContainer.appendChild(fullscreenBtn);
  
  const refreshBtn = document.createElement('button');
  refreshBtn.id = 'refresh-iframe-btn';
  refreshBtn.className = 'control-button';
  refreshBtn.innerHTML = '<span class="icon">↻</span>';
  refreshBtn.title = 'Refresh Game';
  controlsContainer.appendChild(refreshBtn);
  
  fullscreenContainer.appendChild(controlsContainer);

  playGameBtn.addEventListener('click', function () {
    const gameUrl = this.dataset.gameUrl;
    gameIframe.src = gameUrl;
    fullscreenContainer.classList.remove('hidden');
    document.body.style.overflow = "hidden";
  });

  closeBtn.addEventListener('click', function () {
    if (document.fullscreenElement) {
      document.exitFullscreen().then(() => {
        closeIframe();
      }).catch(() => {
        closeIframe();
      });
    } else {
      closeIframe();
    }
  });

  fullscreenBtn.addEventListener('click', function() {
    if (window.unityInstance) {
      window.unityInstance.SetFullscreen(1);
    }

    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      if (fullscreenContainer.requestFullscreen) {
        fullscreenContainer.requestFullscreen();
      } else if (fullscreenContainer.webkitRequestFullscreen) {
        fullscreenContainer.webkitRequestFullscreen();
      } else if (fullscreenContainer.msRequestFullscreen) {
        fullscreenContainer.msRequestFullscreen();
      }
    }
  });
  
  refreshBtn.addEventListener('click', function() {
    if (refreshCooldown) return;
    
    refreshCooldown = true;
    refreshBtn.classList.add('disabled');
    refreshBtn.style.opacity = '0.5';
    refreshBtn.style.cursor = 'not-allowed';
    
    const currentSrc = gameIframe.src;
    gameIframe.src = '';
    setTimeout(() => {
      gameIframe.src = currentSrc;
    }, 100);
    
    setTimeout(() => {
      refreshCooldown = false;
      refreshBtn.classList.remove('disabled');
      refreshBtn.style.opacity = '1';
      refreshBtn.style.cursor = 'pointer';
    }, 1000);
  });

  function closeIframe() {
    fullscreenContainer.classList.add("hidden");
    setTimeout(() => {
      gameIframe.src = "";
    }, 300);
    document.body.style.overflow = "auto";
  }

  document.addEventListener("keydown", function(event) {
    if (event.key === "Escape" && !fullscreenContainer.classList.contains("hidden")) {
      if (document.fullscreenElement) {
        document.exitFullscreen().then(() => {
          closeIframe();
        }).catch(() => {
          closeIframe();
        });
      } else {
        closeIframe();
      }
    }
  });

  const allLinks = document.querySelectorAll('a');
  allLinks.forEach(link => {
    link.setAttribute('target', '_top');
  });

  document.addEventListener('fullscreenchange', updateFullscreenButtonIcon);
  document.addEventListener('webkitfullscreenchange', updateFullscreenButtonIcon);
  document.addEventListener('mozfullscreenchange', updateFullscreenButtonIcon);
  document.addEventListener('MSFullscreenChange', updateFullscreenButtonIcon);

  function updateFullscreenButtonIcon() {
    if (document.fullscreenElement) {
      fullscreenBtn.innerHTML = '<span class="icon">⛶</span>';
      fullscreenBtn.title = 'Exit Fullscreen';
    } else {
      fullscreenBtn.innerHTML = '<span class="icon">⛶</span>';
      fullscreenBtn.title = 'Fullscreen';
    }
  }
});

document.addEventListener("DOMContentLoaded", function() {
    var gameIframe = document.querySelector(".game-iframe, #game-iframe");

    if (gameIframe) {
        gameIframe.style.borderRadius = "30px";
        gameIframe.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
        gameIframe.style.border = "none";
        gameIframe.style.overflow = "hidden";
    }
});
