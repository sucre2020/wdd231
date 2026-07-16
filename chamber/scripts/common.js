// Common JavaScript - Shared functionality across all pages

/**
 * Initialize navigation menu toggle
 */
function initNavigation() {
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            // Update button text based on menu state
            menuToggle.textContent = navMenu.classList.contains('active') ? '✕ Close' : '☰ Menu';
        });

        // Close menu when a link is clicked
        const menuLinks = navMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuToggle.textContent = '☰ Menu';
            });
        });
    }
}

/**
 * Display current date in the date display element
 */
function displayCurrentDate() {
    const dateDisplay = document.getElementById('currentDate');
    if (dateDisplay) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const today = new Date();
        const formattedDate = today.toLocaleDateString('en-US', options);
        dateDisplay.textContent = formattedDate;
    }
}

/**
 * Display copyright year in footer
 */
function displayCopyrightYear() {
    const yearElement = document.getElementById('year');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.textContent = currentYear;
    }
}

/**
 * Display last modification date
 */
function displayLastModifiedDate() {
    const lastModifiedElement = document.getElementById('lastModified');
    if (lastModifiedElement) {
        const lastModified = new Date(document.lastModified);
        const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
        const formattedDate = lastModified.toLocaleDateString('en-US', options);
        lastModifiedElement.textContent = formattedDate;
    }
}

/**
 * Initialize all common functions
 */
function initCommon() {
    initNavigation();
    displayCurrentDate();
    displayCopyrightYear();
    displayLastModifiedDate();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initCommon);

/**
 * Utility function: Get URL parameters
 */
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

/**
 * Utility function: Format date
 */
function formatDate(date, format = 'MM/DD/YYYY') {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();

    if (format === 'MM/DD/YYYY') {
        return `${month}/${day}/${year}`;
    } else if (format === 'YYYY-MM-DD') {
        return `${year}-${month}-${day}`;
    }
    return d.toLocaleDateString();
}

/**
 * Utility function: Debounce function for resize events
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
