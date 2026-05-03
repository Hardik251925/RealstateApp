# PropTrade — Real Estate Trading Platform (Static Web)

**Milestone 1 Demo Build** — Share-market style real estate buy/sell platform.
Pure HTML/CSS/JS — koi backend nahi, GitHub Pages pe direct deploy.

---

## 🚀 GitHub Pages Pe Deploy Karne Ke Steps

### Step 1: GitHub pe naya repository banao

1. https://github.com pe login karo
2. Top-right pe **+** icon → **New repository**
3. Repository name: `proptrade-demo` (ya jo bhi naam pasand ho)
4. **Public** select karo (GitHub Pages free tier ke liye public required hai)
5. **Create repository** click karo

### Step 2: Files upload karo

**Option A — Web Browser se (easy, no Git needed):**

1. New repo page pe **uploading an existing file** link click karo
2. Saari files (saara `proptrade-web/` ka content) drag-drop karo
3. Important: **`.nojekyll`** file bhi upload karo (hidden file hai, ensure copy ho)
4. Niche scroll karke **"Commit changes"** click karo

**Option B — Git command line se:**

```bash
cd proptrade-web
git init
git add .
git commit -m "Initial PropTrade demo"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/proptrade-demo.git
git push -u origin main
```

### Step 3: GitHub Pages enable karo

1. Repository ke **Settings** tab pe jao (top-right)
2. Left sidebar mein **Pages** click karo
3. **Source** section mein:
   - Branch: **`main`** select karo
   - Folder: **`/ (root)`** select karo
4. **Save** click karo
5. 1-2 minute wait karo

### Step 4: Live URL milegi

Settings → Pages page pe top mein dikh jayega:
```
✓ Your site is live at:
https://YOUR_USERNAME.github.io/proptrade-demo/
```

Yahi URL client ko share karo demo ke liye 🎉

---

## 📁 File Structure

```
proptrade-web/
├── index.html              ← Auto-redirect (login or market)
├── login.html              ← Login screen
├── signup.html             ← Sign up screen
├── market.html             ← Main market screen (cards + table view)
├── property.html           ← Property detail (?id=PROP001)
├── portfolio.html          ← Holdings with P&L
├── orders.html             ← Order history
├── wallet.html             ← Funds add/withdraw
├── watchlist.html          ← Starred properties
├── profile.html            ← Account info
├── .nojekyll               ← GitHub Pages compatibility
├── README.md               ← Yahi file
├── css/
│   └── style.css           ← Complete dark theme styles (50KB)
└── js/
    ├── data.js             ← 15 property data + chart generators
    ├── store.js            ← localStorage layer (auth, holdings, orders)
    └── main.js             ← Header, search, toasts, watchlist
```

---

## ✨ Features (Milestone 1)

### Authentication
- Sign up (name, email, phone, password)
- Login with email + password
- SHA-256 password hashing (Web Crypto API)
- Session via localStorage
- Auto ₹1,00,000 demo balance on signup

### Market Screen
- 15 premium properties pan-India
- **Cards View** (Strata-style visual cards)
- **Table View** (CoinDCX-style data table)
- Toggle button to switch views
- Categories: Residential, Commercial, Land, Fractional
- Sort: Default, Top Gainers, Top Losers, Price High/Low
- Filter by category
- Live search (autocomplete)
- Top Gainers + Top Losers strip
- Watchlist with star icons

### Property Detail
- Live price + 24h change indicators
- Stats: Market Cap, Volume, Area, Type, ROI, Status
- **Chart**: Line + Candlestick mode, 7D/1M/3M ranges
- **Order Book**: 8 bids + 8 asks (live look)
- **Buy/Sell Panel**:
  - Market + Limit orders
  - Quick % buttons (25%/50%/75%/Max)
  - 0.5% brokerage
  - Real-time total calculation
- Amenities, RERA number, legal info

### Trading Engine (client-side)
- Market orders → instant execution
- Limit orders → execute at specified price
- Auto wallet debit/credit
- Holdings tracking with average buy price
- P&L on sell

### Portfolio
- Total invested, current value, overall P&L%
- Per-property breakdown with live LTP
- One-click trade button

### Orders & Wallet
- Complete order history with details
- Demo deposit/withdraw
- Payment method UI (UPI, Net Banking, Card)
- Transaction ledger

### Profile
- KYC status, account stats
- Security panel (placeholder for M2)

---

## 🎨 Design

- **Dark fintech theme** — original color palette (no copyright issues)
- **Typography** — Inter (display) + JetBrains Mono (numbers)
- **Fully responsive** — desktop, tablet, mobile
- **Live price flicker animation** for that real-time feel

---

## 🔐 Browser Compatibility

| Browser | Status |
|---|---|
| Chrome 90+ | ✅ Full support |
| Firefox 88+ | ✅ Full support |
| Safari 14+ | ✅ Full support |
| Edge 90+ | ✅ Full support |
| Mobile Safari (iOS 14+) | ✅ Full support |
| Chrome Mobile | ✅ Full support |

**Note:** Web Crypto API ke liye HTTPS required hai. GitHub Pages automatically HTTPS deta hai. Local testing ke liye `http://localhost:PORT` use karo (`file://` se chart aur auth nahi chalega).

---

## 🖥 Local Testing

```bash
# Python ka simple HTTP server
cd proptrade-web
python3 -m http.server 8000

# Browser open karo: http://localhost:8000
```

Ya phir Node.js wala:
```bash
npx serve .
```

---

## 🔄 Reset Demo Data

Browser mein chala test data clear karne ke liye:
1. F12 (Developer Tools) open karo
2. **Application** tab → **Local Storage** → `https://your-site.github.io`
3. Sab `pt_*` keys delete karo
4. Page refresh karo

Ya browser console mein:
```js
['pt_users','pt_session','pt_holdings','pt_orders','pt_watchlist','pt_txns'].forEach(k=>localStorage.removeItem(k))
```

---

## 📝 Demo Flow (Client ko dikhane ke liye)

1. **Sign Up** karo (`/signup.html`) — instant ₹1,00,000 balance
2. **Market** screen pe properties dekho (Cards/Table toggle)
3. Filter karke **Fractional** category dekho — ₹745 se start
4. Kisi property pe click karo → **chart, order book, buy panel**
5. **Buy** kuch units → "Buy executed" toast
6. **Portfolio** dekho → live P&L
7. Wapas property pe jao → **Sell** karo
8. **Orders** mein history dekho
9. **Wallet** mein deposit/withdraw try karo
10. **Watchlist** mein star karo properties

---

## ⚠️ Important Notes

- **Demo build hai** — koi real money nahi, koi real properties nahi
- Saara data **client-side localStorage mein** save hota hai (per-browser)
- Different browser/device pe alag account banana padega
- Production mein ye Flask backend + PostgreSQL DB se replace hoga
- GitHub Pages free tier — unlimited bandwidth, custom domain support

---

## 🔮 Next Milestones

| Milestone | Features |
|---|---|
| **M2** | Real backend (Flask/Node), PostgreSQL DB, OTP login |
| **M3** | KYC integration (Digio/HyperVerge), Razorpay payment |
| **M4** | Native Android (Kotlin) + iOS (Swift) apps |
| **M5** | Admin panel for property listing |
| **M6** | AI valuation engine, real-time WebSocket prices |

---

## 🆘 Troubleshooting

**Site live hai but blank dikhayi de raha?**
→ Browser console (F12) check karo. Common issue: `.nojekyll` file missing hai. Repo root mein add karo.

**Login nahi ho raha?**
→ HTTPS pe ho confirm karo. `http://...github.io` redirect ho jata hai automatically.

**Charts load nahi ho rahe?**
→ Internet check karo — Chart.js CDN se load hota hai. Offline mode mein nahi chalega.

**Custom domain chahiye?**
→ Settings → Pages → Custom domain field mein apna domain daalo + DNS configure karo.

---

**Built for client demo — Milestone 1 ✓**
**Deploy time: 2 minutes after upload**
