function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1);
    if (c.indexOf(nameEQ) === 0) {
      return c.substring(nameEQ.length);
    }
  }
  return null;
}

function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(
      date.getTime() + days * 24 * 60 * 60 * 1000
    );
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + value + expires + "; path=/";
}

document
  .querySelectorAll('input[name="theme"]')
  .forEach(function (input) {
    input.addEventListener("change", function () {
      if (this.value === "dark") {
        document.documentElement.setAttribute(
          "data-theme",
          "dark"
        );
      } else {
        document.documentElement.removeAttribute(
          "data-theme"
        );
      }
      setCookie("theme", this.value, 365);
    });
  });

var savedTheme = getCookie("theme");
if (savedTheme) {
  document.documentElement.setAttribute(
    "data-theme",
    savedTheme
  );
  var el = document.getElementById(savedTheme);
  if (el) el.checked = true;
}

document
  .getElementById("lsActionSelector")
  .addEventListener("change", function (e) {
    var v = e.target.value;
    var fileInput = document.getElementById(
      "lsImportFileInput"
    );
    if (v === "import" || v === "importCookies") {
      fileInput.style.display = "block";
    } else {
      fileInput.style.display = "none";
    }
  });

document
  .getElementById("lsActionButton")
  .addEventListener("click", function () {
    var action = document.getElementById(
      "lsActionSelector"
    ).value;

    if (action === "download") {
      var lsData = {};
      for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        lsData[key] = localStorage.getItem(key);
      }
      downloadJSON(lsData, "localStorage.json");
    } else if (action === "import") {
      importJSON(function (data) {
        localStorage.clear();
        Object.keys(data).forEach(function (k) {
          localStorage.setItem(k, data[k]);
        });
        alert("Imported localStorage data successfully.");
      });
    } else if (action === "delete") {
      if (getCookie("disableDeletePopup") === "true") {
        localStorage.clear();
      } else {
        document.getElementById("deletePopup").style.display =
          "flex";
      }
    } else if (action === "exportCookies") {
      var cookies = {};
      document.cookie.split(";").forEach(function (pair) {
        var parts = pair.split("=");
        var name = parts.shift().trim();
        var val = parts.join("=");
        if (name) cookies[name] = decodeURIComponent(val);
      });
      downloadJSON(cookies, "cookies.json");
    } else if (action === "importCookies") {
      importJSON(function (data) {
        Object.keys(data).forEach(function (k) {
          setCookie(k, data[k], 365);
        });
        alert("Imported cookies successfully.");
      });
    }
  });

function downloadJSON(obj, filename) {
  var jsonStr = JSON.stringify(obj, null, 2);
  var blob = new Blob([jsonStr], {
    type: "application/json"
  });
  var url = URL.createObjectURL(blob);
  var a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function importJSON(callback) {
  var fileInput = document.getElementById(
    "lsImportFileInput"
  );
  if (fileInput.files.length) {
    var reader = new FileReader();
    reader.onload = function () {
      try {
        var data = JSON.parse(reader.result);
        callback(data);
      } catch (e) {
        alert("Failed to import data: Invalid JSON.");
      }
    };
    reader.readAsText(fileInput.files[0]);
  } else {
    alert("Please select a JSON file first.");
  }
}

document
  .getElementById("deleteCancel")
  .addEventListener("click", function () {
    document.getElementById("deletePopup").style.display =
      "none";
  });

document
  .getElementById("deleteConfirm")
  .addEventListener("click", function () {
    localStorage.clear();
    document.getElementById("deletePopup").style.display =
      "none";
  });

document
  .getElementById("dontShowDelete")
  .addEventListener("click", function () {
    setCookie("disableDeletePopup", "true", 365);
    this.style.color = "#bbb";
  });

    document.getElementById("deletePopup").style.display = "none";
  });

document
  .getElementById("dontShowDelete")
  .addEventListener("click", function () {
    setCookie("disableDeletePopup", "true", 365);
    this.style.color = "#bbb";
  });
