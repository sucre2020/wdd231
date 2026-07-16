// Directory JavaScript - Handles member display and view toggling

const membersContainer = document.getElementById('members-container');
const gridViewBtn = document.getElementById('grid-view-btn');
const listViewBtn = document.getElementById('list-view-btn');

let members = [];
let currentView = 'grid'; // 'grid' or 'list'

// Membership level names
const membershipLevels = {
    1: 'Member',
    2: 'Silver',
    3: 'Gold'
};

/**
 * Fetch members data from JSON file
 */
async function fetchMembers() {
    try {
        const response = await fetch('data/members.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        members = await response.json();
        displayMembers();
    } catch (error) {
        console.error('Error fetching members:', error);
        membersContainer.innerHTML = '<p>Error loading members. Please try again later.</p>';
    }
}

/**
 * Display members in the container
 */
function displayMembers() {
    if (members.length === 0) {
        membersContainer.innerHTML = '<p>No members found.</p>';
        return;
    }

    membersContainer.innerHTML = '';

    members.forEach(member => {
        const card = createMemberCard(member);
        membersContainer.appendChild(card);
    });
}

/**
 * Create a member card element
 * @param {Object} member - Member data
 * @returns {HTMLElement} - Member card element
 */
function createMemberCard(member) {
    const card = document.createElement('div');
    card.className = 'member-card';

    const imagePath = `${member.image}`;

    card.innerHTML = `
        <img src="${imagePath}" alt="${member.name}" class="member-image" onerror="this.src='../images/placeholder.jpg'">
        <div class="member-content">
            <span class="member-badge membership-${member.membership}">
                ${membershipLevels[member.membership]} Member
            </span>
            <h3 class="member-name">${member.name}</h3>
            <p class="member-description">${member.description}</p>
            
            <div class="member-info">
                <span class="member-info-icon">📍</span>
                <span>${member.address}</span>
            </div>
            
            <div class="member-info">
                <span class="member-info-icon">📞</span>
                <a href="tel:${member.phone}"class="phone_num">${member.phone}</a>
            </div>
            
            <div class="member-links">
                <a href="${member.website}" target="_blank" class="member-link">Visit Website</a>
                <a href="mailto:contact@${member.website.replace(/https?:\/\/(www\.)?/, '').split('/')[0]}" class="member-link">Contact</a>
            </div>
        </div>
    `;

    return card;
}

/**
 * Toggle between grid and list view
 */
function toggleView(view) {
    currentView = view;

    if (view === 'grid') {
        membersContainer.classList.remove('list-view');
        gridViewBtn.classList.add('active');
        listViewBtn.classList.remove('active');
    } else if (view === 'list') {
        membersContainer.classList.add('list-view');
        listViewBtn.classList.add('active');
        gridViewBtn.classList.remove('active');
    }

    // Store preference in localStorage
    localStorage.setItem('viewPreference', view);
}

/**
 * Load view preference from localStorage
 */
function loadViewPreference() {
    const savedView = localStorage.getItem('viewPreference') || 'grid';
    toggleView(savedView);
}

/**
 * Event Listeners
 */
gridViewBtn.addEventListener('click', () => toggleView('grid'));
listViewBtn.addEventListener('click', () => toggleView('list'));

/**
 * Initialize the directory
 */
function initDirectory() {
    loadViewPreference();
    fetchMembers();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initDirectory);
