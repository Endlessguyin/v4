window.addEventListener("load", function() {
    if (window.top !== window.self) return; 

    setTimeout(() => {
        document.querySelectorAll("iframe").forEach(iframe => iframe.remove());
        document.querySelectorAll("a[href^='https://']").forEach(link => link.remove()); 
    }, 100); 
});

console.log = function () {};
console.error = function () {};
console.warn = function () {};
console.info = function () {};
