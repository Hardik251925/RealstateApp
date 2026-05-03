/* PropTrade — Storage Layer (localStorage based)
   Replaces SQLite for static deployment */

const Store = (function () {
  const KEYS = {
    USERS: 'pt_users',
    SESSION: 'pt_session',
    HOLDINGS: 'pt_holdings',  // map: userId -> [{property_id, units, avg_buy_price}]
    ORDERS: 'pt_orders',      // map: userId -> [orders]
    WATCHLIST: 'pt_watchlist',// map: userId -> [property_ids]
    TXNS: 'pt_txns',          // map: userId -> [txns]
  };

  function read(key, fallback = null) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : (fallback === null ? null : fallback);
    } catch { return fallback; }
  }
  function write(key, val) {
    localStorage.setItem(key, JSON.stringify(val));
  }

  // Simple SHA-256 (Web Crypto API). Fallback for very old browsers.
  async function hash(text) {
    if (window.crypto && window.crypto.subtle) {
      const buf = new TextEncoder().encode(text);
      const hashBuf = await window.crypto.subtle.digest('SHA-256', buf);
      return Array.from(new Uint8Array(hashBuf)).map(b => b.toString(16).padStart(2, '0')).join('');
    }
    // Tiny fallback (NOT cryptographic — just a stable digest)
    let h = 0; for (let i = 0; i < text.length; i++) h = ((h << 5) - h + text.charCodeAt(i)) | 0;
    return 'fb' + Math.abs(h).toString(16);
  }

  // -------- USERS --------
  function getUsers() { return read(KEYS.USERS, {}); }
  function saveUsers(u) { write(KEYS.USERS, u); }

  async function signup({ full_name, email, phone, password }) {
    const users = getUsers();
    email = email.toLowerCase().trim();
    if (users[email]) return { ok: false, msg: 'Ye email already registered hai' };
    if (!full_name || !email || !phone || !password) return { ok: false, msg: 'Saare fields fill karna zaroori hai' };
    if (password.length < 6) return { ok: false, msg: 'Password kam se kam 6 character ka hona chahiye' };

    const passwordHash = await hash(password);
    const userId = 'u_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8);
    const user = {
      id: userId,
      full_name,
      email,
      phone,
      password: passwordHash,
      pan: null,
      kyc_status: 'PENDING',
      wallet_balance: 100000.00,
      created_at: new Date().toISOString(),
    };
    users[email] = user;
    saveUsers(users);

    // Welcome bonus txn
    addTxn(userId, 'CREDIT', 100000, 'Demo Welcome Bonus');

    setSession(userId);
    return { ok: true, user };
  }

  async function login({ email, password }) {
    const users = getUsers();
    email = email.toLowerCase().trim();
    const user = users[email];
    if (!user) return { ok: false, msg: 'Email ya password galat hai' };
    const passwordHash = await hash(password);
    if (passwordHash !== user.password) return { ok: false, msg: 'Email ya password galat hai' };
    setSession(user.id);
    return { ok: true, user };
  }

  function logout() {
    localStorage.removeItem(KEYS.SESSION);
  }

  function setSession(userId) {
    write(KEYS.SESSION, { user_id: userId, ts: Date.now() });
  }

  function getSession() {
    return read(KEYS.SESSION);
  }

  function getCurrentUser() {
    const sess = getSession();
    if (!sess || !sess.user_id) return null;
    const users = getUsers();
    return Object.values(users).find(u => u.id === sess.user_id) || null;
  }

  function updateBalance(userId, delta) {
    const users = getUsers();
    const user = Object.values(users).find(u => u.id === userId);
    if (!user) return null;
    user.wallet_balance = Math.round((user.wallet_balance + delta) * 100) / 100;
    users[user.email] = user;
    saveUsers(users);
    return user.wallet_balance;
  }

  // -------- TRANSACTIONS --------
  function getTxns(userId) {
    const all = read(KEYS.TXNS, {});
    return all[userId] || [];
  }

  function addTxn(userId, type, amount, description) {
    const all = read(KEYS.TXNS, {});
    if (!all[userId]) all[userId] = [];
    all[userId].unshift({
      id: Date.now() + '_' + Math.random().toString(36).slice(2, 6),
      txn_type: type,
      amount,
      description,
      created_at: new Date().toISOString(),
    });
    write(KEYS.TXNS, all);
  }

  // -------- HOLDINGS --------
  function getHoldings(userId) {
    const all = read(KEYS.HOLDINGS, {});
    return all[userId] || [];
  }

  function setHoldings(userId, h) {
    const all = read(KEYS.HOLDINGS, {});
    all[userId] = h;
    write(KEYS.HOLDINGS, all);
  }

  function getHolding(userId, propId) {
    return getHoldings(userId).find(h => h.property_id === propId) || null;
  }

  // -------- ORDERS --------
  function getOrders(userId) {
    const all = read(KEYS.ORDERS, {});
    return all[userId] || [];
  }

  function addOrder(userId, order) {
    const all = read(KEYS.ORDERS, {});
    if (!all[userId]) all[userId] = [];
    all[userId].unshift({
      id: Date.now() + '_' + Math.random().toString(36).slice(2, 6),
      ...order,
      status: 'EXECUTED',
      created_at: new Date().toISOString(),
    });
    write(KEYS.ORDERS, all);
  }

  // -------- WATCHLIST --------
  function getWatchlist(userId) {
    const all = read(KEYS.WATCHLIST, {});
    return all[userId] || [];
  }

  function toggleWatchlist(userId, propId) {
    const all = read(KEYS.WATCHLIST, {});
    if (!all[userId]) all[userId] = [];
    const idx = all[userId].indexOf(propId);
    if (idx >= 0) {
      all[userId].splice(idx, 1);
      write(KEYS.WATCHLIST, all);
      return false;
    } else {
      all[userId].push(propId);
      write(KEYS.WATCHLIST, all);
      return true;
    }
  }

  // -------- TRADING --------
  function buy(userId, propId, units, orderType, limitPrice) {
    const prop = findProperty(propId);
    if (!prop) return { ok: false, msg: 'Property nahi mili' };
    if (units <= 0) return { ok: false, msg: 'Units 0 se zyada hone chahiye' };

    const execPrice = orderType === 'MARKET' ? prop.price : Number(limitPrice);
    if (!execPrice || execPrice <= 0) return { ok: false, msg: 'Valid price daalo' };
    const subtotal = execPrice * units;
    const fee = subtotal * 0.005;
    const total = subtotal + fee;

    const user = getCurrentUser();
    if (!user || user.wallet_balance < total) {
      return { ok: false, msg: `Wallet balance kam hai. Need ${formatINR(total)}` };
    }

    updateBalance(userId, -total);
    addTxn(userId, 'DEBIT', total, `Buy ${units} units of ${prop.name}`);

    // Update holdings
    const holdings = getHoldings(userId);
    const existing = holdings.find(h => h.property_id === propId);
    if (existing) {
      const newUnits = existing.units + units;
      const newAvg = ((existing.avg_buy_price * existing.units) + (execPrice * units)) / newUnits;
      existing.units = newUnits;
      existing.avg_buy_price = newAvg;
    } else {
      holdings.push({ property_id: propId, units, avg_buy_price: execPrice });
    }
    setHoldings(userId, holdings);

    addOrder(userId, {
      property_id: propId,
      order_type: orderType,
      side: 'BUY',
      units, price: execPrice, total
    });

    return { ok: true, msg: `Buy executed! ${units} units @ ${formatINR(execPrice)}`, total };
  }

  function sell(userId, propId, units, orderType, limitPrice) {
    const prop = findProperty(propId);
    if (!prop) return { ok: false, msg: 'Property nahi mili' };
    if (units <= 0) return { ok: false, msg: 'Units 0 se zyada hone chahiye' };

    const holdings = getHoldings(userId);
    const existing = holdings.find(h => h.property_id === propId);
    if (!existing || existing.units < units) {
      return { ok: false, msg: 'Itne units hai nahi aapke paas' };
    }

    const execPrice = orderType === 'MARKET' ? prop.price : Number(limitPrice);
    if (!execPrice || execPrice <= 0) return { ok: false, msg: 'Valid price daalo' };
    const subtotal = execPrice * units;
    const fee = subtotal * 0.005;
    const credit = subtotal - fee;

    updateBalance(userId, credit);
    addTxn(userId, 'CREDIT', credit, `Sell ${units} units of ${prop.name}`);

    // Update holdings
    existing.units = +(existing.units - units).toFixed(6);
    if (existing.units <= 0.0001) {
      const idx = holdings.indexOf(existing);
      holdings.splice(idx, 1);
    }
    setHoldings(userId, holdings);

    const pnl = (execPrice - existing.avg_buy_price) * units;

    addOrder(userId, {
      property_id: propId,
      order_type: orderType,
      side: 'SELL',
      units, price: execPrice, total: subtotal
    });

    return { ok: true, msg: `Sell executed! ${units} units @ ${formatINR(execPrice)} | P&L: ${formatINR(pnl)}`, total: credit, pnl };
  }

  function deposit(userId, amount) {
    if (amount <= 0) return { ok: false, msg: 'Valid amount enter karo' };
    updateBalance(userId, amount);
    addTxn(userId, 'CREDIT', amount, 'Demo deposit (UPI)');
    return { ok: true, msg: `${formatINR(amount)} successfully add ho gaya` };
  }

  function withdraw(userId, amount) {
    if (amount <= 0) return { ok: false, msg: 'Valid amount enter karo' };
    const user = getCurrentUser();
    if (user.wallet_balance < amount) return { ok: false, msg: 'Insufficient balance' };
    updateBalance(userId, -amount);
    addTxn(userId, 'DEBIT', amount, 'Demo withdrawal to bank');
    return { ok: true, msg: `${formatINR(amount)} successfully withdraw ho gaya` };
  }

  return {
    signup, login, logout,
    getSession, getCurrentUser,
    getHoldings, getHolding,
    getOrders, addOrder,
    getWatchlist, toggleWatchlist,
    getTxns,
    buy, sell, deposit, withdraw,
  };
})();
