import discoveries from '../data/discoveries.mjs';

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('discover-container');
  const visitBox = document.getElementById('visitMessage');

  // Build cards
  discoveries.forEach((item, index) => {
    const card = document.createElement('article');
    card.className = `discover-card area-${String.fromCharCode(97 + index)}`;

    const title = document.createElement('h2');
    title.textContent = item.name;

    const fig = document.createElement('figure');
    const img = document.createElement('img');
    img.src = item.image;
    img.alt = item.name;
    fig.appendChild(img);

    const addr = document.createElement('address');
    addr.textContent = item.address;

    const p = document.createElement('p');
    p.textContent = item.description;

    const btn = document.createElement('button');
    btn.className = 'learn-more';
    btn.textContent = 'Learn More';

    card.appendChild(title);
    card.appendChild(fig);
    card.appendChild(addr);
    card.appendChild(p);
    card.appendChild(btn);

    container.appendChild(card);
  });

  // Visit message logic using localStorage
  const key = 'discoverLastVisit';
  const now = Date.now();
  const last = localStorage.getItem(key);

  if (!last) {
    showVisitMessage("Welcome! Let us know if you have any questions.");
  } else {
    const diffMs = now - Number(last);
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (days < 1) {
      showVisitMessage('Back so soon! Awesome!');
    } else if (days === 1) {
      showVisitMessage('You last visited 1 day ago.');
    } else {
      showVisitMessage(`You last visited ${days} days ago.`);
    }
  }

  localStorage.setItem(key, String(now));

  function showVisitMessage(text) {
    if (!visitBox) return;
    visitBox.querySelector('.message-text').textContent = text;
    visitBox.classList.add('visible');
  }

  // Close button handler
  const closeBtn = document.getElementById('closeVisitMsg');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      const box = document.getElementById('visitMessage');
      if (box) box.classList.remove('visible');
    });
  }
});
