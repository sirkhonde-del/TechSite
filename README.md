# 🎬 UGC Pricing Calculator

A professional, feature-rich pricing calculator for User-Generated Content (UGC) creators and agencies. Built with vanilla JavaScript, featuring dynamic pricing, bulk discounts, promo codes, and full backend integration.

**Live Demo:** [https://sirkhonde-del.github.io/TechSite/](https://sirkhonde-del.github.io/TechSite/)

---

## 📋 Table of Contents

- [Features](#features)
- [Quick Start](#quick-start)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Usage Guide](#usage-guide)
- [Pricing Configuration](#pricing-configuration)
- [Backend Integration](#backend-integration)
- [Frontend Features](#frontend-features)
- [Promo Codes](#promo-codes)
- [Bulk Pricing Tiers](#bulk-pricing-tiers)
- [Tiered Packages](#tiered-packages)
- [GitHub Pages Setup](#github-pages-setup)
- [Backend Server Setup](#backend-server-setup)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Customization](#customization)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

---

## ✨ Features

### Core Functionality
- ✅ **Dynamic Quote Calculation** - Real-time pricing based on multiple factors
- ✅ **Bulk Discounts** - Automatic discounts for larger orders (5+, 10+, 20+, 50+ items)
- ✅ **Promo Codes** - Support for custom promotional codes and seasonal discounts
- ✅ **Platform-Specific Pricing** - Different rates for Instagram, TikTok, YouTube, LinkedIn
- ✅ **Usage Rights Management** - Organic, Paid Ads, and Brand Website options
- ✅ **Turnaround Options** - Standard, Rush, and Expedited delivery with fee multipliers
- ✅ **Niche Premium** - Tech/Finance specialization with 25% premium

### User Experience
- 📱 **Fully Responsive** - Mobile, tablet, and desktop optimized
- 🎨 **Modern UI/UX** - Beautiful gradients, smooth animations, and professional design
- 💾 **Quote Download** - Export quotes as text files
- 📦 **Tiered Packages** - Pre-configured packages (Starter, Professional, Enterprise)
- 🔔 **Notifications** - Real-time feedback with toast notifications
- ♿ **Accessible** - Semantic HTML, keyboard navigation support

### Technical Features
- 🔄 **Backend Integration** - Connect with Node.js/Express backend
- 💳 **Order Processing** - Full order management and submission
- 🛡️ **Form Validation** - Real-time validation and error handling
- 🔐 **Authentication Ready** - JWT token support for secure requests
- 📊 **Quote Management** - Save and retrieve quotes
- 🎯 **State Management** - Client-side state for seamless UX

---

## 🚀 Quick Start

### For Frontend Only (GitHub Pages)
```bash
# 1. Clone the repository
git clone https://github.com/sirkhonde-del/TechSite.git
cd TechSite

# 2. Open in browser
open index.html
# or use a local server
python -m http.server 8000
# Visit http://localhost:8000
```

### For Full Stack (Frontend + Backend)
```bash
# 1. Clone frontend repo
git clone https://github.com/sirkhonde-del/TechSite.git
cd TechSite

# 2. Clone backend repo (create separately)
git clone https://github.com/sirkhonde-del/ugc-calculator-backend.git
cd ugc-calculator-backend

# 3. Install backend dependencies
npm install

# 4. Set up environment
cp .env.example .env
# Edit .env with your configuration

# 5. Start backend server
npm start
# Server runs on http://localhost:3000

# 6. Start frontend (in TechSite directory)
python -m http.server 8000
```

---

## 📦 Installation

### Requirements
- Node.js 14+ (for backend)
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Git

### Step-by-Step

1. **Clone Repository**
   ```bash
   git clone https://github.com/sirkhonde-del/TechSite.git
   cd TechSite
   ```

2. **File Structure**
   ```
   TechSite/
   ├── index.html       # Main HTML structure
   ├── styles.css       # Styling (17.9 KB)
   ├── app.js           # JavaScript logic (27.8 KB)
   ├── README.md        # Documentation
   └── .github/
       └── workflows/
           └── deploy.yml  # GitHub Pages deployment
   ```

3. **Optional: Backend Setup**
   - See [Backend Server Setup](#backend-server-setup) section

4. **Deploy to GitHub Pages**
   - See [GitHub Pages Setup](#github-pages-setup) section

---

## 📂 Project Structure

```
TechSite/
│
├── index.html                 # Frontend structure
│   ├── Header with branding
│   ├── Quote generator form
│   ├── Quote display section
│   ├── Tiered packages grid
│   └── Baseline rates reference
│
├── styles.css                 # Comprehensive styling
│   ├── CSS Variables
│   ├── Layout & Typography
│   ├── Form Components
│   ├── Quote Display
│   ├── Package Cards
│   ├── Responsive Design
│   └── Animations
│
├── app.js                     # Complete application logic
│   ├── Configuration Objects
│   ├── Pricing Calculations
│   ├── Bulk Discount Logic
│   ├── Promo Code Management
│   ├── Frontend State Management
│   ├── Backend Integration
│   ├── Event Handlers
│   └── Utility Functions
│
├── README.md                  # This file
│
└── .github/
    └── workflows/
        └── deploy.yml         # CI/CD configuration
```

---

## 📖 Usage Guide

### For Users

1. **Select Project Type**
   - Static Image/Graphic
   - Short-Form Video
   - Long-Form Video
   - Carousel/Slide Deck

2. **Choose Platform**
   - Instagram (IG/FB)
   - TikTok
   - YouTube
   - LinkedIn

3. **Select Usage Rights**
   - Organic Only (Social Feed)
   - Paid Ads (30-60 days)
   - Brand Website (6-12 months)

4. **Pick Turnaround Time**
   - Standard (7-10 business days)
   - Rush (2-3 business days)
   - Expedited (24-48 hours)

5. **Optional Settings**
   - Tech/Finance Niche (+25%)
   - Custom Hourly Rate
   - Number of Assets

6. **Apply Promo Code (Optional)**
   - Enter code and click "Apply"
   - See instant discount calculation

7. **Calculate Quote**
   - Click "Calculate Quote"
   - Review detailed breakdown
   - Download or select package

---

## 💰 Pricing Configuration

### Base Rates (Per Asset)
```javascript
baseRates: {
    image: $125,              // Static Image/Graphic
    shortVideo: $450,         // Short-Form Video
    longVideo: $1,500,        // Long-Form Video
    carousel: $250            // Carousel/Slide Deck
}
```

### Platform Multipliers
```javascript
platformMultipliers: {
    instagram: 1.0x,          // Base rate
    tiktok: 1.1x,             // +10% premium
    youtube: 1.3x,            // +30% premium
    linkedin: 1.05x           // +5% premium
}
```

### Usage Rights Add-ons
```javascript
usageRights: {
    organic: $0,              // Social feed only
    paidAds: $150,            // 30-60 days ads
    brandWebsite: $300        // 6-12 months website
}
```

### Turnaround Multipliers
```javascript
turnaroundMultipliers: {
    standard: 1.0x,           // 7-10 business days
    rush: 1.35x,              // +35% fee
    expedited: 1.75x          // +75% fee
}
```

---

## 🎟️ Promo Codes

### Available Codes

| Code | Discount | Use Case |
|------|----------|----------|
| `SAVE10` | 10% | General discount |
| `SAVE15` | 15% | Mid-tier discount |
| `SAVE20` | 20% | Premium discount |
| `WELCOME` | 25% | New customer welcome |
| `BULK25` | 25% | Bulk order incentive |
| `SUMMER2026` | 30% | Seasonal promotion |

### How to Add New Codes

**Frontend Only:**
```javascript
// Edit app.js
PRICING_CONFIG.promoCodes['NEWYEAR'] = 0.35;  // 35% off
```

---

## 📊 Bulk Pricing Tiers

| Quantity | Discount | Example |
|----------|----------|---------|
| 1-4 items | 0% | Base price |
| 5-9 items | 5% off | $475 → $451.25 |
| 10-19 items | 10% off | $475 → $427.50 |
| 20-49 items | 15% off | $475 → $403.75 |
| 50+ items | 20% off | $475 → $380 |

---

## 📦 Tiered Packages

### 🌟 Starter - $299
- 1 Static Image/Graphic
- 1 Short-Form Video
- Organic Usage Rights
- Standard Turnaround
- Email Support

### 🚀 Professional - $749 (Most Popular)
- 3 Mixed Content Assets
- 2 Short-Form Videos
- 1 Long-Form Video
- Paid Ads Usage Rights
- Rush Turnaround
- Unlimited Revisions
- Multi-Platform Rights

### 💎 Enterprise - $1,599
- Unlimited Monthly Assets
- All Content Types
- Brand Website Usage
- Expedited Turnaround
- 24/7 Support
- Dedicated Account Manager

---

## 🌐 GitHub Pages Setup

### Step 1: Enable GitHub Pages

1. Go to repository Settings
2. Navigate to **Pages** section
3. Select **Source**: main branch
4. Select folder: **/ (root)**
5. Click Save

### Step 2: Verify Deployment

1. GitHub Pages URL: `https://sirkhonde-del.github.io/TechSite/`
2. Check for HTTPS (automatic)
3. Test all calculator functions

---

## 🔧 Backend Server Setup

### Create Backend Repository

```bash
# Initialize Node.js project
mkdir ugc-calculator-backend
cd ugc-calculator-backend
npm init -y

# Install dependencies
npm install express cors dotenv
npm install -D nodemon
```

### Environment Variables (.env)
```env
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:8000
```

### Sample Express Server

```javascript
// server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.post('/api/quotes/submit', async (req, res) => {
    try {
        const { totalPrice, userEmail, userPhone } = req.body;
        
        // Process quote
        res.json({
            success: true,
            quoteId: 'Q-2026-0001',
            message: 'Quote submitted successfully'
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/promo-codes/validate', async (req, res) => {
    try {
        const { code } = req.body;
        
        // Validate promo code
        res.json({ valid: true, discount: 0.20 });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
```

---

## 📊 API Endpoints

### Submit Quote
```
POST /api/quotes/submit
Content-Type: application/json

{
    "projectScope": "shortVideo",
    "totalPrice": 3101.25,
    "userEmail": "user@example.com",
    "userPhone": "+1-555-0100"
}
```

### Validate Promo Code
```
POST /api/promo-codes/validate
Content-Type: application/json

{
    "code": "SAVE20"
}
```

### Create Order
```
POST /api/orders/create
Content-Type: application/json

{
    "packageId": "professional",
    "packageName": "Professional",
    "price": 749,
    "userEmail": "user@example.com"
}
```

---

## 🚀 Deployment

### Deploy Frontend to GitHub Pages

```bash
# 1. Push to main branch
git add .
git commit -m "Update calculator"
git push origin main

# 2. GitHub Actions automatically deploys
# 3. Site available at GitHub Pages URL
```

### Deploy Backend to Heroku

```bash
# 1. Install Heroku CLI
brew tap heroku/brew && brew install heroku

# 2. Login to Heroku
heroku login

# 3. Create and deploy
heroku create ugc-calculator-api
git push heroku main
```

---

## 🎨 Customization

### Modify Pricing

```javascript
// Edit app.js
PRICING_CONFIG.baseRates.shortVideo = 500;
PRICING_CONFIG.turnaroundMultipliers.rush = 1.50;
```

### Change Colors

```css
/* Edit styles.css */
:root {
    --primary-color: #6366f1;
    --success-color: #f97316;
}
```

---

## 🐛 Troubleshooting

### Calculator not loading
- Check browser console for errors (F12)
- Verify all files in same directory
- Clear browser cache and refresh

### Promo code not working
```javascript
// Verify code exists
console.log(PRICING_CONFIG.promoCodes);

// Add code if missing
PRICING_CONFIG.promoCodes['TESTCODE'] = 0.10;
```

### Backend not connecting
- Verify API_CONFIG.baseURL matches backend URL
- Check backend is running on http://localhost:3000
- Verify CORS is enabled on backend

### GitHub Pages not showing
- Wait 2-3 minutes after push
- Check GitHub Actions status
- Clear browser cache thoroughly

---

## 📝 Code Examples

### Calculate Custom Price

```javascript
const baseRate = 450;
const platformMultiplier = 1.1;
const usageRightsAdd = 150;
const turnaroundMultiplier = 1.35;

const pricePerAsset = 
    (baseRate * platformMultiplier + usageRightsAdd) * 
    turnaroundMultiplier;

const quantity = 5;
const bulkDiscount = 0.05;
const finalPrice = (pricePerAsset * quantity) * (1 - bulkDiscount);

console.log(`Final Price: $${finalPrice.toFixed(2)}`);
```

### Access Calculator State

```javascript
// Check current quote
console.log(calculatorState.currentQuote);

// Check if promo code applied
if (calculatorState.promoCodeApplied) {
    console.log(`Discount: ${calculatorState.promoCodeDiscount * 100}%`);
}
```

---

## 📚 Additional Resources

- [MDN Web Docs](https://developer.mozilla.org/)
- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [Express.js Guide](https://expressjs.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

---

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👤 Author

**Mwalimu Khonde**
- GitHub: [@sirkhonde-del](https://github.com/sirkhonde-del)
- Email: sirkhonde@gmail.com

---

## 🙏 Support

Need help?

- 📧 Email: info@mwalimukonde.tech
- 💬 GitHub Issues: [Open an issue](https://github.com/sirkhonde-del/TechSite/issues)

---

**Happy calculating! 🎉**
