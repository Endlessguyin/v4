(function() {
  function removeSearchSection() {
    const searchSection = document.getElementById("search-section");
    if (searchSection && searchSection.parentNode) {
      searchSection.parentNode.removeChild(searchSection);
      console.log("Search section removed");
    }
  }
  removeSearchSection();
  const observer = new MutationObserver((mutations) => {
    let needsCheck = false;
    mutations.forEach(mutation => {
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        needsCheck = true;
      }
    });
    if (needsCheck && document.getElementById("search-section")) {
      removeSearchSection();
    }
  });
  observer.observe(document.documentElement || document.body, {
    childList: true,
    subtree: true
  });
  document.addEventListener("DOMContentLoaded", removeSearchSection);
  window.addEventListener("load", removeSearchSection);
    setTimeout(removeSearchSection, 1000);
})();