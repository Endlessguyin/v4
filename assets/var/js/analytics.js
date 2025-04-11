(function() {
    let script = document.createElement('script');
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=G-R124MMCBQT";
    script.onload = function() {
        window.dataLayer = window.dataLayer || [];
        function gtag(){ dataLayer.push(arguments); }
        window.gtag = gtag;
        gtag('js', new Date());
        gtag('config', 'G-R124MMCBQT');
    };
    document.head.appendChild(script);
})();

(function() {
  function processWidget(widget) {
    var img = widget.querySelector(".game-thumbnail");
    if (!img) return;
    widget.classList.add("loading");
    if (img.complete && img.naturalHeight !== 0) {
      widget.classList.remove("loading");
    } else {
      img.addEventListener("load", function() {
        widget.classList.remove("loading");
      });
      img.addEventListener("error", function() {
        widget.classList.remove("loading");
      });
    }
  }

  function processWidgets(root) {
    var widgets = root.querySelectorAll(".game-widget");
    widgets.forEach(function(widget) {
      processWidget(widget);
    });
  }

  document.addEventListener("DOMContentLoaded", function() {
    processWidgets(document);
    var observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        mutation.addedNodes.forEach(function(node) {
          if (node.nodeType === 1) {
            if (node.matches(".game-widget")) {
              processWidget(node);
            }
            processWidgets(node);
          }
        });
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });
  });
})();
