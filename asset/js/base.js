// document.addEventListener("DOMContentLoaded", function (event) {
//     document.querySelectorAll('img').forEach(function (img) {
//         img.onerror = function () { this.style.display = 'none'; };
//     })
// });
window.onload = function (event) {
    document.querySelectorAll('img').forEach(function (img) {
        img.onerror = function () { this.style.display = 'none'; };
    })
};