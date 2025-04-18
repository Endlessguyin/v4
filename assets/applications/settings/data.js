function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) {
      return c.substring(nameEQ.length, c.length);
    }
  }
  return null;
}

function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + value + expires + "; path=/";
}

document.querySelectorAll('input[name="theme"]').forEach(function (input) {
  input.addEventListener("change", function () {
    if (this.value === "dark") {
      document.documentElement.classList.add("dark-mode");
    } else {
      document.documentElement.classList.remove("dark-mode");
    }
  });
});

document
  .getElementById("lsActionSelector")
  .addEventListener("change", function (e) {
    if (e.target.value === "import") {
      document.getElementById("lsImportFileInput").style.display = "block";
    } else {
      document.getElementById("lsImportFileInput").style.display = "none";
    }
  });

document.getElementById("lsActionButton").addEventListener("click", function () {
  var action = document.getElementById("lsActionSelector").value;

  if (action === "download") {
    var data = {};
    for (var i = 0; i < localStorage.length; i++) {
      var key = localStorage.key(i);
      data[key] = localStorage.getItem(key);
    }
    var jsonStr = JSON.stringify(data, null, 2);
    var blob = new Blob([jsonStr], { type: "application/json" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = "data.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

  } else if (action === "import") {
    var fileInput = document.getElementById("lsImportFileInput");
    if (fileInput.files.length) {
      var file = fileInput.files[0];
      var reader = new FileReader();
      reader.onload = function () {
        try {
          var data = JSON.parse(reader.result);
          localStorage.clear();
          Object.keys(data).forEach(function (key) {
            localStorage.setItem(key, data[key]);
          });
          alert("Imported localStorage data successfully.");
        } catch (e) {
          alert("Failed to import data: Invalid JSON.");
        }
      };
      reader.readAsText(file);
    }

  } else if (action === "delete") {
    if (getCookie("disableDeletePopup") === "true") {
      localStorage.clear();
    } else {
      document.getElementById("deletePopup").style.display = "flex";
    }
  }
});

document.getElementById("deleteCancel").addEventListener("click", function () {
  document.getElementById("deletePopup").style.display = "none";
});

document.getElementById("deleteConfirm").addEventListener("click", function () {
  localStorage.clear();
  document.getElementById("deletePopup").style.display = "none";
});

document.getElementById("dontShowDelete").addEventListener("click", function () {
  setCookie("disableDeletePopup", "true", 365);
  this.style.color = "#bbb";
});
