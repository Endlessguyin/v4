document.addEventListener("DOMContentLoaded", function () {
  const savedTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);
  const themeRadio = document.querySelector(
    `input[name="theme"][value="${savedTheme}"]`
  );
  if (themeRadio) {
    themeRadio.checked = true;
  }
  const themeRadios = document.querySelectorAll("input[name='theme']");
  themeRadios.forEach((radio) => {
    radio.addEventListener("change", function () {
      const theme = this.value;
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
    });
  });

  const defaultFavicon = "/assets/img/essential/icon.ico";
  const defaultTitle = document.title;
  function updateFavicon(url) {
    let link = document.querySelector("link[rel*='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.href = url;
  }
  const savedFaviconUrl = localStorage.getItem("faviconUrl");
  const savedWebsiteTitle = localStorage.getItem("websiteTitle");
  if (savedFaviconUrl) {
    updateFavicon(savedFaviconUrl);
    const faviconInput = document.getElementById("faviconUrl");
    if (faviconInput) faviconInput.value = "";
  } else {
    updateFavicon(defaultFavicon);
  }
  if (savedWebsiteTitle) {
    document.title = savedWebsiteTitle;
    const titleInput = document.getElementById("websiteTitle");
    if (titleInput) titleInput.value = savedWebsiteTitle;
  } else {
    document.title = defaultTitle;
  }
  const saveBtn = document.getElementById("saveFaviconTitle");
  const resetBtn = document.getElementById("resetFaviconTitle");
  if (saveBtn) {
    saveBtn.addEventListener("click", function () {
      let faviconUrl = document.getElementById("faviconUrl").value.trim();
      let websiteTitle = document.getElementById("websiteTitle").value.trim();
      if (faviconUrl) {
        localStorage.setItem("faviconUrl", faviconUrl);
        updateFavicon(faviconUrl);
      }
      if (websiteTitle) {
        localStorage.setItem("websiteTitle", websiteTitle);
        document.title = websiteTitle;
      }
    });
  }
  function resetSettings() {
    localStorage.removeItem("faviconUrl");
    localStorage.removeItem("websiteTitle");
    document.getElementById("faviconUrl").value = "";
    document.getElementById("websiteTitle").value = "";
    updateFavicon(defaultFavicon);
    document.title = defaultTitle;
  }
  resetBtn.addEventListener("click", function () {
    const hideResetPopupUntil = localStorage.getItem("hideResetPopupUntil");
    const now = Date.now();
    if (hideResetPopupUntil && now < Number(hideResetPopupUntil)) {
      resetSettings();
    } else {
      document.querySelector("#resetPopup p").innerText =
        "Are you sure you want to reset your Cloak settings?";
      showResetPopup();
      resetPanicMode = false;
    }
  });
  function showResetPopup() {
    document.getElementById("resetPopup").style.display = "flex";
  }
  function hideResetPopup() {
    document.getElementById("resetPopup").style.display = "none";
  }
  document
    .getElementById("popupConfirm")
    .addEventListener("click", function () {
      const disableCheckbox = document.getElementById("popupDisableCheckbox");
      if (resetPanicMode) {
        if (disableCheckbox.checked) {
          localStorage.setItem(
            "hideResetPanicPopupUntil",
            Date.now() + 3 * 24 * 60 * 60 * 1000
          );
        }
        localStorage.removeItem("panicKeys");
        localStorage.removeItem("panicUrl");
        panicSequence = [];
        panicKeysInput.value = "";
        panicUrlInput.value = "";
        resetPanicMode = false;
        document.querySelector("#resetPopup p").innerText =
          "Are you sure you want to reset your setting?";
      } else {
        if (disableCheckbox.checked) {
          localStorage.setItem(
            "hideResetPopupUntil",
            Date.now() + 3 * 24 * 60 * 60 * 1000
          );
        }
        resetSettings();
      }
      hideResetPopup();
    });
  document
    .getElementById("popupCancel")
    .addEventListener("click", function () {
      hideResetPopup();
      resetPanicMode = false;
      document.querySelector("#resetPopup p").innerText =
        "Are you sure you want to reset your setting?";
    });

  const templates = [
    {
      title: "Google",
      favicon: "/assets/applications/settings/ico/google.png",
      preview: "/assets/applications/settings/ico/google.png"
    },
    {
      title: "Google Classroom",
      favicon: "/assets/applications/settings/ico/google-classroom.png",
      preview: "/assets/applications/settings/ico/google-classroom.png"
    },
    {
      title: "Clever",
      favicon: "/assets/applications/settings/ico/clever.png",
      preview: "/assets/applications/settings/ico/clever.png"
    },
    {
      title: "My Apps",
      favicon: "/assets/applications/settings/ico/classlink.ico",
      preview: "/assets/applications/settings/ico/classlink.ico"
    }
  ];
  const templateContainer = document.getElementById("templateButtons");
  templates.forEach((template) => {
    let btn = document.createElement("button");
    btn.className = "btn-template";
    btn.style.backgroundImage = `url('${template.preview}')`;
    btn.addEventListener("click", function () {
      localStorage.setItem("faviconUrl", template.favicon);
      localStorage.setItem("websiteTitle", template.title);
      updateFavicon(template.favicon);
      document.title = template.title;
      document.getElementById("faviconUrl").value = "";
      document.getElementById("websiteTitle").value = template.title;
    });
    templateContainer.appendChild(btn);
  });

  const panicKeysInput = document.getElementById("panicKeys");
  const panicUrlInput = document.getElementById("panicUrl");
  let panicSequence = [];
  const savedPanicKeys = localStorage.getItem("panicKeys") || "";
  if (savedPanicKeys !== "") {
    panicKeysInput.value = savedPanicKeys;
    panicSequence = savedPanicKeys.split(" + ");
  }
  const savedPanicUrl = localStorage.getItem("panicUrl") || "";
  panicUrlInput.value = savedPanicUrl;
  panicKeysInput.addEventListener("keydown", function (e) {
    if (e.key === "Backspace") {
      e.preventDefault();
      panicSequence.pop();
      panicKeysInput.value = panicSequence.join(" + ");
      return;
    }
    if (panicSequence.length >= 3) {
      e.preventDefault();
      return;
    }
    if (e.key === "Unidentified" || e.key.trim() === "") {
      return;
    }
    e.preventDefault();
    panicSequence.push(e.key);
    panicKeysInput.value = panicSequence.join(" + ");
  });
  const savePanicKeysBtn = document.getElementById("savePanicKeys");
  const resetPanicKeysBtn = document.getElementById("resetPanicKeys");
  savePanicKeysBtn.addEventListener("click", function () {
    const keys = panicKeysInput.value.trim();
    const url = panicUrlInput.value.trim();
    localStorage.setItem("panicKeys", keys);
    localStorage.setItem("panicUrl", url);
  });
  
  let resetPanicMode = false;
  resetPanicKeysBtn.addEventListener("click", function () {
    const hideResetPanicPopupUntil = localStorage.getItem("hideResetPanicPopupUntil");
    const now = Date.now();
    if (hideResetPanicPopupUntil && now < Number(hideResetPanicPopupUntil)) {
      localStorage.removeItem("panicKeys");
      localStorage.removeItem("panicUrl");
      panicSequence = [];
      panicKeysInput.value = "";
      panicUrlInput.value = "";
    } else {
      resetPanicMode = true;
      document.querySelector("#resetPopup p").innerText =
        "Are you sure you want to reset your Panic Key settings?";
      showResetPopup();
    }
  });

  let globalPanicSequence = [];
  let panicTimeout;
  document.addEventListener("keydown", function (e) {
    if (e.target.matches("input, textarea, [contenteditable='true']"))
      return;
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

  window.addEventListener("storage", function (event) {
    if (event.key === "theme") {
      const newTheme = localStorage.getItem("theme") || "light";
      document.documentElement.setAttribute("data-theme", newTheme);
    }
    if (event.key === "faviconUrl" || event.key === "websiteTitle") {
      const newFavicon = localStorage.getItem("faviconUrl") || defaultFavicon;
      updateFavicon(newFavicon);
      const newTitle = localStorage.getItem("websiteTitle") || defaultTitle;
      document.title = newTitle;
    }
  });

  const originalSetItem = localStorage.setItem;
  localStorage.setItem = function (key, value) {
    originalSetItem.apply(this, arguments);
    if (key === "theme") {
      const newTheme = localStorage.getItem("theme") || "light";
      document.documentElement.setAttribute("data-theme", newTheme);
    }
    if (key === "faviconUrl" || key === "websiteTitle") {
      const newFavicon = localStorage.getItem("faviconUrl") || defaultFavicon;
      updateFavicon(newFavicon);
      const newTitle = localStorage.getItem("websiteTitle") || defaultTitle;
      document.title = newTitle;
    }
  };

  const anticloseToggle = document.getElementById("anticloseToggle");
  function updateAnticloseButton() {
    const anticloseState = localStorage.getItem("anticlose") || "off";
    if (anticloseState === "on") {
      anticloseToggle.classList.add("active");
      anticloseToggle.innerText = "ON";
    } else {
      anticloseToggle.classList.remove("active");
      anticloseToggle.innerText = "OFF";
    }
  }
  updateAnticloseButton();
  anticloseToggle.addEventListener("click", function () {
    const currentState = localStorage.getItem("anticlose") || "off";
    if (currentState === "on") {
      localStorage.setItem("anticlose", "off");
    } else {
      localStorage.setItem("anticlose", "on");
    }
    updateAnticloseButton();
  });
});