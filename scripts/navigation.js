// navigation.js
// Handle responsive navigation menu toggle

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navbar = document.getElementById('navbar');

    // Toggle menu on hamburger click
    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        navbar.classList.toggle('active');
    });

    // Close menu when a link is clicked
    const navLinks = navbar.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Only close on actual navigation (not on current page)
            if (link.getAttribute('href') !== window.location.pathname) {
                menuToggle.classList.remove('active');
                navbar.classList.remove('active');
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navbar.contains(event.target);
        const isClickInsideToggle = menuToggle.contains(event.target);
        
        if (!isClickInsideNav && !isClickInsideToggle) {
            menuToggle.classList.remove('active');
            navbar.classList.remove('active');
        }
    });

    // Close menu on window resize to desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 768) {
            menuToggle.classList.remove('active');
            navbar.classList.remove('active');
        }
    });

    // Set active navigation link
    const currentPage = window.location.pathname;
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage || 
            (currentPage.includes('index.html') && link.getAttribute('href') === 'index.html') ||
            (currentPage.endsWith('/') && link.getAttribute('href') === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});