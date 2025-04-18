(function () {
  const defaultTitle = document.title;

  function updateLogos(theme) {
    const logos = document.querySelectorAll("img");
    logos.forEach((img) => {
      const currentSrc = img.getAttribute("src");
      if (theme === "dark") {
        if (currentSrc === "/assets/img/essential/logo-min.png") {
          img.setAttribute(
            "src",
            "/assets/img/essential/logodarkmode-min.png"
          );
        }
      } else {
        if (currentSrc === "/assets/img/essential/logodarkmode-min.png") {
          img.setAttribute("src", "/assets/img/essential/logo-min.png");
        }
      }
    });
  }

  function updateTheme() {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
    updateLogos(savedTheme);
  }

  function updateFaviconAndTitle() {
    const faviconUrl = localStorage.getItem("faviconUrl");
    const websiteTitle = localStorage.getItem("websiteTitle");
    let link = document.querySelector("link[rel*='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.href = faviconUrl ? faviconUrl : "/assets/img/essential/icon.ico";
    document.title = websiteTitle ? websiteTitle : defaultTitle;
  }

  function anticloseBeforeUnload(e) {
    e.preventDefault();
    e.returnValue = "";
  }
  function updateAnticlose() {
    const anticlose = localStorage.getItem("anticlose") || "off";
    if (anticlose === "on") {
      window.addEventListener("beforeunload", anticloseBeforeUnload);
    } else {
      window.removeEventListener("beforeunload", anticloseBeforeUnload);
    }
  }

  updateTheme();
  updateFaviconAndTitle();
  updateAnticlose();

  window.addEventListener("storage", function (event) {
    if (event.key === "theme") {
      updateTheme();
    }
    if (event.key === "faviconUrl" || event.key === "websiteTitle") {
      updateFaviconAndTitle();
    }
    if (event.key === "anticlose") {
      updateAnticlose();
    }
  });

  const originalSetItem = localStorage.setItem;
  localStorage.setItem = function (key, value) {
    originalSetItem.apply(this, arguments);
    if (key === "theme") {
      updateTheme();
    }
    if (key === "faviconUrl" || key === "websiteTitle") {
      updateFaviconAndTitle();
    }
    if (key === "anticlose") {
      updateAnticlose();
    }
  };

  let globalPanicSequence = [];
  let panicTimeout;
  document.addEventListener("keydown", function (e) {
    if (e.target.matches("input, textarea, [contenteditable='true']")) return;
    if (window.self !== window.top) return;

    const storedPanic = localStorage.getItem("panicKeys");
    if (!storedPanic) return;
    const expectedSequence = storedPanic.split(" + ").map((s) => s.trim());

    clearTimeout(panicTimeout);
    panicTimeout = setTimeout(() => {
      globalPanicSequence = [];
    }, 2000);

    globalPanicSequence.push(e.key);

    for (let i = 0; i < globalPanicSequence.length; i++) {
      if (globalPanicSequence[i] !== expectedSequence[i]) {
        globalPanicSequence = [];
        return;
      }
    }

    if (globalPanicSequence.length === expectedSequence.length) {
      const panicUrl = localStorage.getItem("panicUrl");
      if (panicUrl && panicUrl.trim() !== "") {
        window.location.href = panicUrl;
      }
      globalPanicSequence = [];
    }
  });
})();