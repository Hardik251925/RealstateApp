/* PropTrade — Shared App Logic */

// --------------- AUTH GUARD ---------------
function requireAuth() {
  const user = Store.getCurrentUser();
  if (!user) {
    window.location.replace('login.html');
    return null;
  }
  return user;
}

function redirectIfAuthed() {
  const user = Store.getCurrentUser();
  if (user) window.location.replace('market.html');
}

// --------------- HEADER RENDERING ---------------
function renderHeader(activePage) {
  const user = Store.getCurrentUser();
  if (!user) return;
  const root = document.getElementById('siteHeader');
  if (!root) return;

  const navItems = [
    { key: 'market', label: 'Market', href: 'market.html' },
    { key: 'portfolio', label: 'Portfolio', href: 'portfolio.html' },
    { key: 'orders', label: 'Orders', href: 'orders.html' },
    { key: 'watchlist', label: 'Watchlist', href: 'watchlist.html' },
    { key: 'wallet', label: 'Wallet', href: 'wallet.html' },
  ];

  root.innerHTML = `
    <header class="topbar">
      <div class="topbar-inner">
        <a href="market.html" class="brand">
          <span class="brand-logo">◆</span>
          <span class="brand-name">PropTrade</span>
          <span class="brand-tag">DEMO</span>
        </a>
        <nav class="topnav">
          ${navItems.map(n => `<a href="${n.href}" class="navlink ${n.key === activePage ? 'active' : ''}">${n.label}</a>`).join('')}
        </nav>
        <div class="topbar-right">
          <div class="balance-pill">
            <span class="balance-label">Balance</span>
            <span class="balance-value">${formatINR(user.wallet_balance)}</span>
          </div>
          <div class="user-menu">
            <button class="user-avatar" onclick="document.getElementById('userDropdown').classList.toggle('open')">${user.full_name[0].toUpperCase()}</button>
            <div id="userDropdown" class="user-dropdown">
              <div class="ud-header">
                <div class="ud-name">${user.full_name}</div>
                <div class="ud-email">${user.email}</div>
              </div>
              <a href="profile.html" class="ud-link">Profile</a>
              <a href="wallet.html" class="ud-link">Wallet</a>
              <a href="#" class="ud-link logout" onclick="event.preventDefault(); Store.logout(); location.replace('login.html');">Logout</a>
            </div>
          </div>
          <button class="mobile-menu-btn" onclick="document.querySelector('.topnav').classList.toggle('mobile-open')">☰</button>
        </div>
      </div>
    </header>
  `;

  // Outside-click for dropdown
  document.addEventListener('click', (e) => {
    const menu = document.getElementById('userDropdown');
    if (!menu) return;
    const avatar = document.querySelector('.user-avatar');
    if (avatar && !avatar.contains(e.target) && !menu.contains(e.target)) {
      menu.classList.remove('open');
    }
  });
}

// --------------- TOASTS ---------------
function toast(msg, type = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  t.textContent = msg;
  container.appendChild(t);
  setTimeout(() => {
    t.style.opacity = '0';
    t.style.transform = 'translateX(100%)';
    t.style.transition = 'all 0.3s';
    setTimeout(() => t.remove(), 300);
  }, 3500);
}

// --------------- WATCHLIST TOGGLE (global) ---------------
function toggleWatchlistBtn(btn, propId) {
  const user = Store.getCurrentUser();
  if (!user) return;
  const inWl = Store.toggleWatchlist(user.id, propId);
  if (inWl) {
    btn.classList.add('active');
    toast('Watchlist mein add ho gaya');
  } else {
    btn.classList.remove('active');
    toast('Watchlist se hata diya');
  }
}

// --------------- SEARCH ---------------
function initSearch() {
  const input = document.getElementById('searchInput');
  const results = document.getElementById('searchResults');
  if (!input || !results) return;

  let timer;
  input.addEventListener('input', (e) => {
    clearTimeout(timer);
    const q = e.target.value.toLowerCase().trim();
    if (q.length < 2) { results.classList.remove('open'); return; }
    timer = setTimeout(() => {
      const matches = PROPERTIES.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      ).slice(0, 8);
      if (!matches.length) {
        results.innerHTML = `<div style="padding:14px;color:#6b7a90;font-size:13px;">Koi property nahi mili</div>`;
      } else {
        results.innerHTML = matches.map(p => `
          <a href="property.html?id=${p.id}" class="search-item">
            <div>
              <div class="search-item-name">${p.name}</div>
              <div class="search-item-loc">${p.location}</div>
            </div>
            <div class="search-item-price">${formatINR(p.price, 0)}</div>
          </a>
        `).join('');
      }
      results.classList.add('open');
    }, 200);
  });

  document.addEventListener('click', (e) => {
    if (!input.contains(e.target) && !results.contains(e.target)) {
      results.classList.remove('open');
    }
  });
}

// --------------- VIEW TOGGLE (cards/table) ---------------
function initViewToggle() {
  const toggleBtns = document.querySelectorAll('.view-toggle .vt-btn');
  if (!toggleBtns.length) return;

  function applyView(view) {
    toggleBtns.forEach(b => b.classList.toggle('active', b.dataset.view === view));
    const cards = document.getElementById('propCards');
    const table = document.getElementById('propTable');
    if (view === 'cards') {
      if (cards) cards.style.display = 'grid';
      if (table) table.style.display = 'none';
    } else {
      if (cards) cards.style.display = 'none';
      if (table) table.style.display = 'block';
    }
    try { localStorage.setItem('pt_view', view); } catch {}
  }

  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => applyView(btn.dataset.view));
  });

  const saved = (() => { try { return localStorage.getItem('pt_view'); } catch { return null; } })();
  applyView(saved || 'cards');
}

// --------------- HELPERS ---------------
function fmtPct(v, signed = true) {
  const sign = signed && v >= 0 ? '+' : '';
  return sign + v.toFixed(2) + '%';
}

function escapeHTML(s) {
  return String(s).replace(/[&<>"']/g, m => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[m]));
}
