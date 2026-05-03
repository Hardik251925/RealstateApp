/* PropTrade — Demo Property Data (Static) */

const PROPERTIES = [
  { id:'PROP001', name:'Lodha Park Tower', symbol:'LPT', location:'Worli, Mumbai', category:'Residential', price:52450.00, change:1245.50, change_pct:2.43, volume:'₹4.2 Cr', market_cap:'₹2,890 Cr', area:3500, bhk:'4 BHK', roi:8.5, status:'Ready to Move', rera:'P51800002345', description:'Premium 4 BHK luxury apartment in heart of Mumbai with sea view, 5-star amenities, and world-class infrastructure.', amenities:['Swimming Pool','Gym','Club House','Concierge','Sea View'] },
  { id:'PROP002', name:'Prestige Lakeside Habitat', symbol:'PLH', location:'Whitefield, Bangalore', category:'Residential', price:12850.00, change:285.30, change_pct:2.27, volume:'₹2.8 Cr', market_cap:'₹1,540 Cr', area:2200, bhk:'3 BHK', roi:7.8, status:'Ready to Move', rera:'PRM/KA/RERA/1251/309/PR/171014/000341', description:'Premium gated community with 100+ acres of lush greenery, lake view, and modern amenities.', amenities:['Lake View','Tennis Court','Jogging Track','Spa','Kids Play Area'] },
  { id:'PROP003', name:'DLF Camellias', symbol:'DLC', location:'Golf Course Road, Gurugram', category:'Residential', price:78900.00, change:-1450.00, change_pct:-1.81, volume:'₹6.7 Cr', market_cap:'₹4,120 Cr', area:6500, bhk:'5 BHK', roi:9.2, status:'Ready to Move', rera:'GGM/HRERA/2017/13', description:'Ultra-luxury residence with private elevator, butler service, and panoramic golf course view.', amenities:['Private Elevator','Butler Service','Golf View','Wine Cellar','Home Theater'] },
  { id:'PROP004', name:'Hiranandani Estate', symbol:'HRE', location:'Powai, Mumbai', category:'Residential', price:28750.00, change:520.40, change_pct:1.84, volume:'₹3.1 Cr', market_cap:'₹1,890 Cr', area:1850, bhk:'3 BHK', roi:7.2, status:'Ready to Move', rera:'P51800019822', description:'Italian-themed township with premium living standards, lake view, and excellent connectivity.', amenities:['Lake View','Italian Architecture','Schools','Hospital','Mall'] },
  { id:'PROP005', name:'Brigade Cornerstone Utopia', symbol:'BCU', location:'Varthur, Bangalore', category:'Residential', price:9450.00, change:178.20, change_pct:1.92, volume:'₹1.9 Cr', market_cap:'₹920 Cr', area:1650, bhk:'2 BHK', roi:6.8, status:'Under Construction', rera:'PRM/KA/RERA/1251/446/PR/210618/004233', description:'Smart living homes with sustainable design, sky garden, and EV charging infrastructure.', amenities:['Smart Home','Sky Garden','EV Charging','Co-working Space','Pet Park'] },
  { id:'PROP006', name:'BKC Business Square', symbol:'BKC', location:'Bandra Kurla Complex, Mumbai', category:'Commercial', price:89500.00, change:2340.00, change_pct:2.68, volume:'₹8.9 Cr', market_cap:'₹5,780 Cr', area:5000, bhk:'Office', roi:11.5, status:'Pre-leased', rera:'P51800018721', description:'Grade A commercial space in BKC with Fortune 500 tenants, LEED Gold certified.', amenities:['Pre-leased','LEED Gold','Power Backup','Parking','Cafeteria'] },
  { id:'PROP007', name:'Cyber City Tower 9', symbol:'CCT', location:'DLF Cyber City, Gurugram', category:'Commercial', price:45200.00, change:-890.50, change_pct:-1.93, volume:'₹5.4 Cr', market_cap:'₹3,210 Cr', area:4500, bhk:'Office', roi:10.8, status:'Pre-leased', rera:'RERA-GRG-PROJ-09', description:'IT/ITeS commercial tower with global tech tenants, 24/7 access, and premium infrastructure.', amenities:['IT Park','24/7 Access','Food Court','Daycare','Gym'] },
  { id:'PROP008', name:'Mindspace Madhapur', symbol:'MSP', location:'Madhapur, Hyderabad', category:'Commercial', price:18600.00, change:425.80, change_pct:2.34, volume:'₹3.6 Cr', market_cap:'₹1,640 Cr', area:3200, bhk:'Office', roi:9.4, status:'Pre-leased', rera:'P02400000789', description:'SEZ commercial space with multinational tenants, modern infrastructure, and tax benefits.', amenities:['SEZ Benefits','Smart Building','Solar Power','Sports Arena','Helipad'] },
  { id:'PROP009', name:'Sarjapur Greens Plot', symbol:'SGP', location:'Sarjapur Road, Bangalore', category:'Land', price:6850.00, change:142.50, change_pct:2.13, volume:'₹1.2 Cr', market_cap:'₹485 Cr', area:2400, bhk:'Plot', roi:12.5, status:'Clear Title', rera:'PRM/KA/RERA/1251/333/PR/180712/001234', description:'BDA approved residential plots in fast-growing IT corridor. Excellent appreciation potential.', amenities:['BDA Approved','Gated Community','Park','Underground Cabling','Wide Roads'] },
  { id:'PROP010', name:'Goa Beachfront Estate', symbol:'GBE', location:'Anjuna, Goa', category:'Land', price:15400.00, change:580.00, change_pct:3.91, volume:'₹2.1 Cr', market_cap:'₹720 Cr', area:4500, bhk:'Plot', roi:14.0, status:'Clear Title', rera:'GA-RERA-2023-89', description:'Premium beachfront land suitable for villa or boutique hotel development. 50m from beach.', amenities:['Beach Access','Sea View','Tourist Zone','Approved Layout','Utilities'] },
  { id:'PROP011', name:'Pune Tech Park Fractional', symbol:'PTPF', location:'Hinjewadi, Pune', category:'Fractional', price:1245.50, change:28.40, change_pct:2.33, volume:'₹68 L', market_cap:'₹125 Cr', area:100, bhk:'Token', roi:10.2, status:'Earning Rent', rera:'P52100012345', description:'Tokenized commercial property earning monthly rental yields. Min investment Rs.10,000.', amenities:['Monthly Payouts','Tokenized','Auto-reinvest','Liquid Trading','Tax Reports'] },
  { id:'PROP012', name:'Chennai IT Hub Tokens', symbol:'CITT', location:'OMR, Chennai', category:'Fractional', price:985.20, change:-18.50, change_pct:-1.84, volume:'₹52 L', market_cap:'₹98 Cr', area:100, bhk:'Token', roi:9.8, status:'Earning Rent', rera:'TN/29/Building/0143/2022', description:'Tokenized IT park property with stable rental income from anchor tenants like TCS, Infosys.', amenities:['Anchor Tenants','Quarterly Payout','Tokenized','SEBI Compliant','Insured'] },
  { id:'PROP013', name:'Noida Mall Fractional', symbol:'NMF', location:'Sector 18, Noida', category:'Fractional', price:2150.75, change:65.20, change_pct:3.13, volume:'₹95 L', market_cap:'₹215 Cr', area:100, bhk:'Token', roi:11.5, status:'Earning Rent', rera:'UPRERAPRJ12345', description:'Premium retail mall with footfall of 50,000+ daily. Anchor tenants include Pantaloons, PVR.', amenities:['Retail Anchors','High Footfall','Monthly Rent','Insured','Liquid'] },
  { id:'PROP014', name:'Ahmedabad Warehouse Token', symbol:'AWT', location:'Sanand, Ahmedabad', category:'Fractional', price:745.30, change:12.50, change_pct:1.71, volume:'₹38 L', market_cap:'₹68 Cr', area:100, bhk:'Token', roi:8.9, status:'Earning Rent', rera:'GUJ-RERA-2022-456', description:'Logistics warehouse tokens with leases from Amazon, Flipkart. Stable industrial yields.', amenities:['Logistics','Long Lease','Industrial Zone','Highway Access','Tokenized'] },
  { id:'PROP015', name:'Kolkata Heritage Plaza', symbol:'KHP', location:'Park Street, Kolkata', category:'Commercial', price:22400.00, change:-345.60, change_pct:-1.52, volume:'₹1.8 Cr', market_cap:'₹890 Cr', area:1800, bhk:'Office', roi:8.2, status:'Pre-leased', rera:'WBHIRA/P/SOU/2022/000234', description:'Heritage commercial plaza in CBD with premium retail and office tenants.', amenities:['Heritage Building','CBD Location','Retail Mix','Parking','Premium Tenants'] },
];

// Generate price history (deterministic per property)
function generatePriceHistory(prop, days = 90) {
  // Deterministic seed from prop id
  let seed = 0;
  for (let i = 0; i < prop.id.length; i++) seed = (seed * 31 + prop.id.charCodeAt(i)) >>> 0;
  function rand() {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 0xFFFFFFFF;
  }
  function randn() {
    let u = 0, v = 0;
    while (u === 0) u = rand();
    while (v === 0) v = rand();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  }
  const out = [];
  let price = prop.price;
  const drift = -prop.change_pct / 100 / days;
  for (let i = 0; i < days; i++) {
    const rnd = drift + randn() * 0.025;
    const prevClose = price / (1 + rnd);
    const open = prevClose * (1 + randn() * 0.005);
    const close = price;
    const high = Math.max(open, close) * (1 + Math.abs(randn() * 0.008));
    const low = Math.min(open, close) * (1 - Math.abs(randn() * 0.008));
    const d = new Date();
    d.setDate(d.getDate() - (days - i));
    out.push({
      date: d.toISOString().slice(0, 10),
      open: +open.toFixed(2),
      high: +high.toFixed(2),
      low: +low.toFixed(2),
      close: +close.toFixed(2),
      volume: Math.floor(rand() * 4500) + 500,
    });
    price = prevClose;
  }
  return out;
}

// Generate order book
function generateOrderBook(prop) {
  let seed = 0;
  for (let i = 0; i < prop.id.length; i++) seed = (seed * 31 + prop.id.charCodeAt(i)) >>> 0;
  seed = (seed + 1) >>> 0;
  function rand() {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 0xFFFFFFFF;
  }
  const bids = [], asks = [];
  for (let i = 0; i < 8; i++) {
    const bidPrice = prop.price * (1 - 0.001 * (i + 1) - rand() * 0.0005);
    const askPrice = prop.price * (1 + 0.001 * (i + 1) + rand() * 0.0005);
    const bidQty = Math.floor(rand() * 750) + 50;
    const askQty = Math.floor(rand() * 750) + 50;
    bids.push({ price: +bidPrice.toFixed(2), qty: bidQty, total: +(bidPrice * bidQty).toFixed(2) });
    asks.push({ price: +askPrice.toFixed(2), qty: askQty, total: +(askPrice * askQty).toFixed(2) });
  }
  return { bids, asks };
}

// Find property by id
function findProperty(id) {
  return PROPERTIES.find(p => p.id === id);
}

// Format INR currency
function formatINR(value, decimals = 2) {
  if (value === null || value === undefined || isNaN(value)) return '₹0.00';
  return '₹' + Number(value).toLocaleString('en-IN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
}
