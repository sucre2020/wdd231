// These store paths used throughout the application.
const staticBase = './';
const resourcePath = './scripts/data/resources.json';

// the base folder where static assets are located.


// Creates an empty array.

let libraryArticles = [];
let activeLibraryCategory = 'All';
let favoriteIds = JSON.parse(localStorage.getItem('libraryFavorites') || '[]');

const articleSearch = document.getElementById('articleSearch');
const categoryButtonsContainer = document.getElementById('categoryButtons');
const libraryGrid = document.getElementById('libraryGrid');
const articleModal = document.getElementById('articleModal');
const modalCloseButton = document.getElementById('modalCloseButton');
const articleModalTitle = document.getElementById('articleModalLabel');
const articleModalCategory = document.getElementById('articleModalCategory');
const articleModalMeta = document.getElementById('articleMeta');
const articleModalSummary = document.getElementById('articleModalSummary');
const articleModalContent = document.getElementById('articleModalContent');
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const primaryNavigation = document.getElementById('primary-navigation');
const supportSummary = document.getElementById('supportSummary');


function buildLibraryCategoryButtons() {
  if (!categoryButtonsContainer) {
    return;
  }

  const categories = ['All', ...new Set(libraryArticles.map((article) => article.category))];
  categoryButtonsContainer.innerHTML = categories
    .map((category) => {
      const isActive = category === activeLibraryCategory;
      return `<button type="button" class="category-button ${isActive ? 'active' : ''}" data-category="${category}">${category}</button>`;
    })
    .join('');

  categoryButtonsContainer.querySelectorAll('.category-button').forEach((button) => {
    button.addEventListener('click', () => {
      activeLibraryCategory = button.dataset.category;
      buildLibraryCategoryButtons();
      renderLibraryArticles();
    });
  });
}

function toggleFavorite(articleId) {
  const id = Number(articleId);
  if (favoriteIds.includes(id)) {
    favoriteIds = favoriteIds.filter((item) => item !== id);
  } else {
    favoriteIds.push(id);
  }
  localStorage.setItem('libraryFavorites', JSON.stringify(favoriteIds));
  renderLibraryArticles();
}

function openArticleModal(articleId) {
  if (!articleModal || !articleModalTitle || !articleModalCategory || !articleModalMeta || !articleModalSummary || !articleModalContent) {
    return;
  }

  const article = libraryArticles.find((item) => item.id === Number(articleId));
  if (!article) {
    return;
  }

  articleModalTitle.textContent = article.title;
  articleModalCategory.textContent = article.category;
  articleModalMeta.textContent = `${article.stage} • ${article.readingTime}`;
  articleModalSummary.textContent = article.summary;
  articleModalContent.textContent = article.content;
  articleModal.setAttribute('aria-hidden', 'false');
  articleModal.classList.add('open');
}

function closeArticleModal() {
  if (!articleModal) {
    return;
  }
  articleModal.setAttribute('aria-hidden', 'true');
  articleModal.classList.remove('open');
}

function renderLibraryArticles() {
  if (!libraryGrid) {
    return;
  }

  const query = articleSearch ? articleSearch.value.trim().toLowerCase() : '';
  const filteredArticles = libraryArticles.filter((article) => {
    const categoryMatch = activeLibraryCategory === 'All' || article.category === activeLibraryCategory;
    const text = `${article.title} ${article.category} ${article.stage} ${article.summary}`.toLowerCase();
    const queryMatch = text.includes(query);
    return categoryMatch && queryMatch;
  });

  if (filteredArticles.length === 0) {
    libraryGrid.innerHTML = `<div class="empty-state"><p>No articles found. Try adjusting your search or category.</p></div>`;
    return;
  }

  libraryGrid.innerHTML = filteredArticles
    .map((article) => {
      const isFavorite = favoriteIds.includes(article.id);
      return `
        <article class="card library-card">
          <div class="card-image">
            <img src="${staticBase}${article.image}" alt="${article.title}">
          </div>
          <div class="card-body">
            <div class="card-top">
              <span class="badge badge-soft">${article.category}</span>
              <span class="badge badge-meta">${article.stage}</span>
            </div>
            <h3>${article.title}</h3>
            <p class="text-muted">${article.summary}</p>
            <div class="card-actions">
              <button type="button" class="btn btn-outline-secondary" data-action="favorite" data-id="${article.id}">${isFavorite ? 'Saved' : 'Save'}</button>
              <button type="button" class="btn btn-primary" data-action="read" data-id="${article.id}">Read More</button>
            </div>
          </div>
        </article>
      `;
    })
    .join('');

  libraryGrid.querySelectorAll('[data-action="favorite"]').forEach((button) => {
    button.addEventListener('click', () => toggleFavorite(button.dataset.id));
  });
  libraryGrid.querySelectorAll('[data-action="read"]').forEach((button) => {
    button.addEventListener('click', () => openArticleModal(button.dataset.id));
  });
}

async function loadLibraryArticles() {
  if (!libraryGrid) {
    return;
  }

  try {
    const response = await fetch(resourcePath);
    if (!response.ok) {
      throw new Error('Failed to load library resources.');
    }
    libraryArticles = await response.json();
    buildLibraryCategoryButtons();
    renderLibraryArticles();
  } catch (error) {
    libraryGrid.innerHTML = `<div class="empty-state"><p>Unable to load articles. Please try again later.</p></div>`;
    console.error(error);
  }
}

function applyFaqFilters() {
  const faqSearch = document.getElementById('faqSearch');
  const searchValue = faqSearch ? faqSearch.value.trim().toLowerCase() : '';
  const activeCategory = document.querySelector('.faq-category-buttons .active')?.dataset.category || 'All';
  const cards = document.querySelectorAll('.faq-card');

  cards.forEach((card) => {
    const text = card.dataset.search.toLowerCase();
    const categoryMatch = activeCategory === 'All' || card.dataset.category === activeCategory;
    const queryMatch = text.includes(searchValue);
    card.style.display = categoryMatch && queryMatch ? 'block' : 'none';
  });
}

function initializeFaqFilters() {
  const faqButtons = document.querySelectorAll('.faq-category-buttons .category-button');
  if (faqButtons.length > 0) {
    faqButtons.forEach((button) => {
      button.addEventListener('click', () => {
        faqButtons.forEach((item) => item.classList.remove('active'));
        button.classList.add('active');
        applyFaqFilters();
      });
    });
  }

  const faqSearchInput = document.getElementById('faqSearch');
  if (faqSearchInput) {
    faqSearchInput.addEventListener('input', applyFaqFilters);
  }
}

function initializeMobileMenu() {
  if (!mobileMenuToggle || !primaryNavigation) {
    return;
  }

  mobileMenuToggle.addEventListener('click', () => {
    const isOpen = primaryNavigation.classList.toggle('open');
    mobileMenuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  primaryNavigation.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (primaryNavigation.classList.contains('open')) {
        primaryNavigation.classList.remove('open');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

function renderSupportActionSummary() {
  if (!supportSummary) {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const name = params.get('name')?.trim();
  const email = params.get('email')?.trim();
  const phone = params.get('phone')?.trim();
  const reason = params.get('reason')?.trim();
  const message = params.get('message')?.trim();

  const requiredFieldsComplete = name && email && message;
  if (!requiredFieldsComplete) {
    supportSummary.innerHTML = `
      <div class="alert alert-error">
        Please complete the support request form on the <a href="support.html">Support page</a> before reviewing your request.
      </div>
    `;
    return;
  }

  supportSummary.innerHTML = `
    <div class="support-action-intro">
      <p class="section-copy">Here is the information you entered. If everything looks correct, go back to the support page to submit with your confirmed details.</p>
    </div>
    <dl class="support-summary">
      <div class="support-summary-item">
        <dt>Full name</dt>
        <dd>${name}</dd>
      </div>
      <div class="support-summary-item">
        <dt>Email address</dt>
        <dd>${email}</dd>
      </div>
      ${phone ? `
      <div class="support-summary-item">
        <dt>Phone number</dt>
        <dd>${phone}</dd>
      </div>
      ` : ''}
      <div class="support-summary-item">
        <dt>Type of support</dt>
        <dd>${reason || 'Not selected'}</dd>
      </div>
      <div class="support-summary-item">
        <dt>Message</dt>
        <dd>${message}</dd>
      </div>
    </dl>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  if (libraryGrid) {
    loadLibraryArticles();
  }

  if (articleSearch) {
    articleSearch.addEventListener('input', renderLibraryArticles);
  }

  if (modalCloseButton) {
    modalCloseButton.addEventListener('click', closeArticleModal);
  }

  if (articleModal) {
    articleModal.addEventListener('click', (event) => {
      if (event.target === articleModal) {
        closeArticleModal();
      }
    });
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && articleModal?.classList.contains('open')) {
      closeArticleModal();
    }
  });

  initializeFaqFilters();
  initializeMobileMenu();
  renderSupportActionSummary();
});
