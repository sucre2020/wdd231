// date.js
// Handle dynamic copyright year and last modified date

document.addEventListener('DOMContentLoaded', function() {
    // Set current year in copyright
    const currentYearElement = document.getElementById('currentyear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    // Set last modified date
    const lastModifiedElement = document.getElementById('lastModified');
    if (lastModifiedElement) {
        lastModifiedElement.textContent = document.lastModified;
    }
});