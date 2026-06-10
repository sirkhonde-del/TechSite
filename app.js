/* ============================================
   UGC PRICING CALCULATOR - APP.JS (ENHANCED)
   Mwalimu Khonde Tech
   ============================================ */

// Pricing Configuration
const PRICING_CONFIG = {
    // Base rates by content type
    baseRates: {
        image: 125,           // Static Image/Graphic
        shortVideo: 450,      // Short-Form Video
        longVideo: 1500,      // Long-Form Video
        carousel: 250         // Carousel/Slide Deck
    },

    // Complexity multipliers by platform
    platformMultipliers: {
        instagram: 1.0,       // Base rate
        tiktok: 1.1,          // 10% premium
        youtube: 1.3,         // 30% premium (more complex)
        linkedin: 1.05        // 5% premium
    },

    // Usage rights add-ons
    usageRights: {
        organic: 0,           // No additional cost
        paidAds: 150,         // 30-60 days paid ads
        brandWebsite: 300     // 6-12 months website usage
    },

    // Rush/Expedited fees (percentage multipliers)
    turnaroundMultipliers: {
        standard: 1.0,        // Base rate
        rush: 1.35,           // 35% rush fee
        expedited: 1.75       // 75% expedited fee
    },

    // Tech/Finance niche premium
    techNichePremium: 0.25,  // 25% premium

    // Bulk Pricing Tiers (discount percentages)
    bulkDiscounts: {
        5: 0.05,              // 5% off for 5+ assets
        10: 0.10,             // 10% off for 10+ assets
        20: 0.15,             // 15% off for 20+ assets
        50: 0.20              // 20% off for 50+ assets
    },

    // Coupon/Promo Codes (discount percentages)
    promoCodes: {
        'SAVE10': 0.10,       // 10% off
        'SAVE15': 0.15,       // 15% off
        'SAVE20': 0.20,       // 20% off
        'WELCOME': 0.25,      // 25% off (new customers)
        'BULK25': 0.25,       // 25% off bulk orders
        'SUMMER2026': 0.30    // 30% off (seasonal)
    }
};

// Tiered Packages
const PACKAGES = [
    {
        id: 'starter',
        name: 'Starter',
        badge: 'Perfect for Beginners',
        description: 'Great for building your UGC portfolio',
        price: 299,
        features: [
            '1 Static Image/Graphic',
            '1 Short-Form Video',
            'Organic Usage Rights',
            'Standard Turnaround (7-10 days)',
            'Email Support',
            'Basic Revisions (2x)',
            'One Platform'
        ]
    },
    {
        id: 'professional',
        name: 'Professional',
        badge: 'Most Popular',
        description: 'Ideal for growing creators and small brands',
        price: 749,
        featured: true,
        features: [
            '3 Mixed Content Assets',
            '2 Short-Form Videos',
            '1 Long-Form Video',
            'Paid Ads Usage (30-60 days)',
            'Rush Turnaround (2-3 days)',
            'Priority Email Support',
            'Unlimited Revisions',
            'Multi-Platform Rights',
            'Tech/Finance Niche Option'
        ]
    },
    {
        id: 'enterprise',
        name: 'Enterprise',
        badge: 'Premium Service',
        description: 'Complete solution for agencies and established brands',
        price: 1599,
        features: [
            'Unlimited Assets (Month)',
            'All Content Types',
            'Brand Website Usage (6-12 months)',
            'Expedited Turnaround (24-48 hours)',
            'Dedicated Account Manager',
            '24/7 Support',
            'Unlimited Revisions',
            'All Platforms & Rights',
            'Tech/Finance Niche Included',
            'Quarterly Strategy Sessions',
            'Custom Analytics Reports'
        ]
    }
];

// Backend API Configuration
const API_CONFIG = {
    baseURL: process.env.API_BASE_URL || 'http://localhost:3000/api',
    endpoints: {
        calculateQuote: '/quotes/calculate',
        submitQuote: '/quotes/submit',
        validatePromoCode: '/promo-codes/validate',
        getQuotes: '/quotes',
        updateQuote: '/quotes/:id',
        createOrder: '/orders/create',
        getOrders: '/orders',
        webhook: '/webhooks/quote-submitted'
    }
};

// DOM Elements
const quoteForm = document.getElementById('quoteForm');
const quoteDisplay = document.getElementById('quoteDisplay');
const packagesSection = document.getElementById('packagesSection');

// State Management
let calculatorState = {
    currentQuote: null,
    promoCodeApplied: false,
    promoCodeDiscount: 0,
    userEmail: null,
    userPhone: null
};

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    initializeEventListeners();
    renderPackages();
    setupPromoCodeListener();
    setupBulkDiscountIndicator();
});

quoteForm.addEventListener('submit', (e) => {
    e.preventDefault();
    calculateQuote();
});

// Initialize Event Listeners
function initializeEventListeners() {
    const projectScope = document.getElementById('projectScope');
    const platform = document.getElementById('platform');
    const usageRights = document.getElementById('usageRights');
    const turnaround = document.getElementById('turnaround');
    const quantity = document.getElementById('quantity');

    projectScope.addEventListener('change', updateFormValidation);
    platform.addEventListener('change', updateFormValidation);
    usageRights.addEventListener('change', updateFormValidation);
    turnaround.addEventListener('change', updateFormValidation);
    quantity.addEventListener('change', () => {
        updateFormValidation();
        updateBulkDiscountDisplay();
    });
}

// Update form validation styling
function updateFormValidation() {
    const inputs = document.querySelectorAll('input, select');
    inputs.forEach(input => {
        if (input.value) {
            input.style.borderColor = 'var(--border-color)';
        }
    });
}

// Calculate Bulk Discount
function calculateBulkDiscount(quantity) {
    const tiers = Object.keys(PRICING_CONFIG.bulkDiscounts)
        .map(Number)
        .sort((a, b) => b - a);

    for (let tier of tiers) {
        if (quantity >= tier) {
            return PRICING_CONFIG.bulkDiscounts[tier];
        }
    }
    return 0;
}

// Update Bulk Discount Display
function updateBulkDiscountDisplay() {
    const quantity = parseInt(document.getElementById('quantity').value) || 1;
    const bulkDiscount = calculateBulkDiscount(quantity);

    let bulkMessage = '';
    if (bulkDiscount > 0) {
        bulkMessage = `✨ Bulk Discount Applied: ${(bulkDiscount * 100).toFixed(0)}% OFF (${quantity}+ items)`;
    } else {
        if (quantity < 5) {
            bulkMessage = `Order ${5 - quantity} more items to unlock 5% bulk discount`;
        } else if (quantity < 10) {
            bulkMessage = `Order ${10 - quantity} more items to unlock 10% bulk discount`;
        }
    }

    if (bulkMessage) {
        let bulkIndicator = document.getElementById('bulkDiscountIndicator');
        if (!bulkIndicator) {
            bulkIndicator = document.createElement('div');
            bulkIndicator.id = 'bulkDiscountIndicator';
            bulkIndicator.style.cssText = `
                padding: 0.75rem;
                background: #dbeafe;
                border-left: 4px solid #0284c7;
                border-radius: 4px;
                margin-top: 0.5rem;
                font-size: 0.85rem;
                color: #0369a1;
                font-weight: 500;
            `;
            document.querySelector('.additional-options').appendChild(bulkIndicator);
        }
        bulkIndicator.textContent = bulkMessage;
    }
}

// Setup Promo Code Listener
function setupPromoCodeListener() {
    // Add promo code input if it doesn't exist
    if (!document.getElementById('promoCode')) {
        const additionalOptions = document.querySelector('.additional-options');
        const promoGroup = document.createElement('div');
        promoGroup.className = 'form-group';
        promoGroup.innerHTML = `
            <label for="promoCode">Promo Code (Optional)</label>
            <div style="display: flex; gap: 0.5rem;">
                <input type="text" id="promoCode" placeholder="Enter promo code" style="flex: 1;">
                <button type="button" class="btn btn-info" onclick="applyPromoCode()" style="flex: 0 0 auto; padding: 0.75rem 1rem;">
                    Apply
                </button>
            </div>
            <div id="promoMessage" style="display: none; margin-top: 0.5rem; padding: 0.5rem; border-radius: 4px; font-size: 0.85rem; font-weight: 500;"></div>
        `;
        additionalOptions.insertBefore(promoGroup, additionalOptions.lastElementChild);
    }
}

// Setup Bulk Discount Indicator
function setupBulkDiscountIndicator() {
    updateBulkDiscountDisplay();
}

// Apply Promo Code
async function applyPromoCode() {
    const promoCode = document.getElementById('promoCode').value.trim().toUpperCase();
    const promoMessage = document.getElementById('promoMessage');

    if (!promoCode) {
        showPromoMessage('Please enter a promo code', 'error');
        return;
    }

    try {
        // Try to validate with backend first
        const isValid = await validatePromoCodeBackend(promoCode);
        
        if (isValid || PRICING_CONFIG.promoCodes[promoCode]) {
            const discount = PRICING_CONFIG.promoCodes[promoCode] || 0;
            calculatorState.promoCodeApplied = true;
            calculatorState.promoCodeDiscount = discount;
            showPromoMessage(`✅ Promo code "${promoCode}" applied! ${(discount * 100).toFixed(0)}% discount`, 'success');
            document.getElementById('promoCode').disabled = true;
        } else {
            calculatorState.promoCodeApplied = false;
            calculatorState.promoCodeDiscount = 0;
            showPromoMessage('❌ Invalid promo code', 'error');
            document.getElementById('promoCode').disabled = false;
        }
    } catch (error) {
        console.error('Error validating promo code:', error);
        showPromoMessage('Error validating code. Please try again.', 'error');
    }
}

// Show Promo Message
function showPromoMessage(message, type) {
    const promoMessage = document.getElementById('promoMessage');
    promoMessage.textContent = message;
    promoMessage.style.display = 'block';
    promoMessage.style.background = type === 'success' ? '#d1fae5' : '#fee2e2';
    promoMessage.style.color = type === 'success' ? '#065f46' : '#991b1b';
}

// Validate Promo Code with Backend
async function validatePromoCodeBackend(code) {
    try {
        const response = await fetch(`${API_CONFIG.baseURL}${API_CONFIG.endpoints.validatePromoCode}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('auth_token') || ''}`
            },
            body: JSON.stringify({ code })
        });

        if (response.ok) {
            const data = await response.json();
            return data.valid;
        }
        return false;
    } catch (error) {
        console.warn('Backend validation failed, using local codes:', error);
        return false;
    }
}

// Calculate Quote
async function calculateQuote() {
    const projectScope = document.getElementById('projectScope').value;
    const platform = document.getElementById('platform').value;
    const usageRights = document.getElementById('usageRights').value;
    const turnaround = document.getElementById('turnaround').value;
    const techNiche = document.getElementById('techNiche').checked;
    const customHours = parseFloat(document.getElementById('customHours').value) || null;
    const quantity = parseInt(document.getElementById('quantity').value) || 1;

    // Validate inputs
    if (!projectScope || !platform || !usageRights || !turnaround) {
        alert('Please fill in all required fields');
        return;
    }

    // Get base rate
    let baseRate = PRICING_CONFIG.baseRates[projectScope];

    // Apply custom hourly rate if provided
    if (customHours !== null && customHours > 0) {
        baseRate = customHours;
    }

    // Calculate all fees
    const platformMultiplier = PRICING_CONFIG.platformMultipliers[platform];
    const usageRightsAdd = PRICING_CONFIG.usageRights[usageRights];
    const turnaroundMultiplier = PRICING_CONFIG.turnaroundMultipliers[turnaround];

    // Base production fee with platform multiplier
    const baseProduction = baseRate * platformMultiplier;

    // Tech/Finance premium
    const techFee = techNiche ? baseProduction * PRICING_CONFIG.techNichePremium : 0;

    // Rush/Expedited fee
    const rushFee = (baseProduction + techFee) * (turnaroundMultiplier - 1);

    // Calculate per-asset total
    let pricePerAsset = (baseProduction + usageRightsAdd + techFee + rushFee) * turnaroundMultiplier;

    // Apply bulk discount
    const bulkDiscount = calculateBulkDiscount(quantity);
    const bulkDiscountAmount = pricePerAsset * bulkDiscount;

    // Apply promo code discount
    let promoDiscountAmount = 0;
    if (calculatorState.promoCodeApplied && calculatorState.promoCodeDiscount > 0) {
        promoDiscountAmount = pricePerAsset * calculatorState.promoCodeDiscount;
    }

    // Final price per asset after discounts
    const finalPricePerAsset = pricePerAsset - bulkDiscountAmount - promoDiscountAmount;

    // Total with quantity
    const totalPrice = finalPricePerAsset * quantity;

    // Store quote in state
    calculatorState.currentQuote = {
        projectScope,
        platform,
        usageRights,
        turnaround,
        techNiche,
        quantity,
        baseProduction,
        platformMultiplier,
        usageRightsAdd,
        rushFee,
        techFee,
        bulkDiscount,
        bulkDiscountAmount,
        promoDiscountAmount,
        pricePerAsset,
        finalPricePerAsset,
        totalPrice,
        turnaroundMultiplier
    };

    // Display results
    displayQuote(calculatorState.currentQuote);

    // Scroll to quote display
    setTimeout(() => {
        quoteDisplay.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
}

// Display Quote Results
function displayQuote(data) {
    // Update summary items
    document.getElementById('baseFee').textContent = `$${parseFloat(data.baseProduction).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    document.getElementById('multiplier').textContent = `${data.platformMultiplier.toFixed(2)}x`;
    document.getElementById('usageAdd').textContent = `$${parseFloat(data.usageRightsAdd).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    document.getElementById('rushFee').textContent = `$${parseFloat(data.rushFee).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    document.getElementById('techFee').textContent = `$${parseFloat(data.techFee).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    // Update breakdown details
    const breakdownDetails = document.getElementById('breakdownDetails');
    let breakdownHTML = `
        <div class="breakdown-item">
            <span>Project Type</span>
            <strong>${formatLabel(data.projectScope)}</strong>
        </div>
        <div class="breakdown-item">
            <span>Platform</span>
            <strong>${formatLabel(data.platform)}</strong>
        </div>
        <div class="breakdown-item">
            <span>Usage Rights</span>
            <strong>${formatLabel(data.usageRights)}</strong>
        </div>
        <div class="breakdown-item">
            <span>Turnaround</span>
            <strong>${formatLabel(data.turnaround)}</strong>
        </div>
        ${data.techNiche ? `
            <div class="breakdown-item">
                <span>Tech/Finance Premium</span>
                <strong>Applied (+25%)</strong>
            </div>
        ` : ''}
        <div class="breakdown-item">
            <span>Quantity</span>
            <strong>${data.quantity} asset${data.quantity > 1 ? 's' : ''}</strong>
        </div>
    `;

    // Add discount information
    if (data.bulkDiscount > 0) {
        breakdownHTML += `
            <div class="breakdown-item" style="background: #d1fae5; border-radius: 4px;">
                <span>Bulk Discount (${(data.bulkDiscount * 100).toFixed(0)}%)</span>
                <strong style="color: #059669;">-$${parseFloat(data.bulkDiscountAmount * data.quantity).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
            </div>
        `;
    }

    if (data.promoDiscountAmount > 0) {
        breakdownHTML += `
            <div class="breakdown-item" style="background: #fef3c7; border-radius: 4px;">
                <span>Promo Code Discount</span>
                <strong style="color: #f59e0b;">-$${parseFloat(data.promoDiscountAmount * data.quantity).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
            </div>
        `;
    }

    breakdownDetails.innerHTML = breakdownHTML;

    // Update total price
    document.getElementById('totalPrice').textContent = `$${parseFloat(data.totalPrice).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    // Show quote display and hide form
    document.querySelector('.quote-generator').style.display = 'none';
    quoteDisplay.style.display = 'block';
    packagesSection.style.display = 'none';
}

// Format label for display
function formatLabel(value) {
    const labels = {
        image: 'Static Image/Graphic',
        shortVideo: 'Short-Form Video',
        longVideo: 'Long-Form Video',
        carousel: 'Carousel/Slide Deck',
        instagram: 'Instagram (IG/FB)',
        tiktok: 'TikTok',
        youtube: 'YouTube',
        linkedin: 'LinkedIn',
        organic: 'Organic Only (Social Feed)',
        paidAds: 'Paid Ads (30-60 days)',
        brandWebsite: 'Brand Website (6-12 months)',
        standard: 'Standard (7-10 business days)',
        rush: 'Rush (2-3 business days)',
        expedited: 'Expedited (24-48 hours)'
    };
    return labels[value] || value;
}

// Submit Quote to Backend
async function submitQuote() {
    if (!calculatorState.currentQuote) {
        alert('Please calculate a quote first');
        return;
    }

    // Get user info
    const userEmail = prompt('Please enter your email:');
    if (!userEmail) return;

    const userPhone = prompt('Please enter your phone number:');
    if (!userPhone) return;

    try {
        const response = await fetch(`${API_CONFIG.baseURL}${API_CONFIG.endpoints.submitQuote}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...calculatorState.currentQuote,
                userEmail,
                userPhone,
                submittedAt: new Date().toISOString()
            })
        });

        if (response.ok) {
            const data = await response.json();
            calculatorState.userEmail = userEmail;
            calculatorState.userPhone = userPhone;
            showNotification('Quote submitted successfully! Check your email.', 'success');
            console.log('Quote ID:', data.quoteId);
            return data;
        } else {
            showNotification('Error submitting quote', 'error');
        }
    } catch (error) {
        console.error('Error submitting quote:', error);
        showNotification('Failed to submit quote. Please try again.', 'error');
    }
}

// Download Quote as PDF/Text
function downloadQuote() {
    if (!calculatorState.currentQuote) {
        alert('Please calculate a quote first');
        return;
    }

    const data = calculatorState.currentQuote;
    const quoteContent = `
MWALIMU KHONDE TECH - UGC PRICING QUOTE
=====================================
Generated: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
Time: ${new Date().toLocaleTimeString('en-US')}

PROJECT DETAILS
=====================================
Project Type: ${formatLabel(data.projectScope)}
Platform: ${formatLabel(data.platform)}
Usage Rights: ${formatLabel(data.usageRights)}
Turnaround: ${formatLabel(data.turnaround)}
Quantity: ${data.quantity} asset(s)
Tech/Finance Niche: ${data.techNiche ? 'Yes' : 'No'}

PRICING BREAKDOWN
=====================================
Base Production Fee: $${parseFloat(data.baseProduction).toFixed(2)}
Platform Multiplier: ${data.platformMultiplier.toFixed(2)}x
Usage Rights Add-on: $${parseFloat(data.usageRightsAdd).toFixed(2)}
Tech/Finance Premium: $${parseFloat(data.techFee).toFixed(2)}
Rush/Expedited Fee: $${parseFloat(data.rushFee).toFixed(2)}
${data.bulkDiscount > 0 ? `Bulk Discount (${(data.bulkDiscount * 100).toFixed(0)}%): -$${parseFloat(data.bulkDiscountAmount).toFixed(2)}` : ''}
${data.promoDiscountAmount > 0 ? `Promo Code Discount: -$${parseFloat(data.promoDiscountAmount).toFixed(2)}` : ''}

PRICING SUMMARY
=====================================
Price Per Asset: $${parseFloat(data.pricePerAsset).toFixed(2)}
After Discounts: $${parseFloat(data.finalPricePerAsset).toFixed(2)}
Total for ${data.quantity} asset(s): $${parseFloat(data.totalPrice).toFixed(2)}

SAVINGS
=====================================
${data.bulkDiscount > 0 ? `Bulk Discount Saved: $${parseFloat(data.bulkDiscountAmount * data.quantity).toFixed(2)}` : 'No bulk discount'}
${data.promoDiscountAmount > 0 ? `Promo Code Saved: $${parseFloat(data.promoDiscountAmount * data.quantity).toFixed(2)}` : 'No promo code applied'}

NOTES
=====================================
* All rates are subject to project requirements
* Rush and Expedited services require minimum notice
* Additional features may incur additional fees
* Payment terms: 50% deposit, 50% on completion
* Quote valid for 30 days

Thank you for choosing Mwalimu Khonde Tech!
For more information, contact: info@mwalimukonde.tech
Website: https://mwalimukonde.tech
    `;

    // Create blob and download
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(quoteContent));
    element.setAttribute('download', `UGC_Quote_${new Date().getTime()}.txt`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    showNotification('Quote downloaded successfully!', 'success');
}

// Show Packages
function showPackages() {
    quoteDisplay.style.display = 'none';
    packagesSection.style.display = 'block';
    packagesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Hide Packages
function hidePackages() {
    packagesSection.style.display = 'none';
    quoteDisplay.style.display = 'block';
    quoteDisplay.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Reset Quote
function resetQuote() {
    quoteForm.reset();
    calculatorState.promoCodeApplied = false;
    calculatorState.promoCodeDiscount = 0;
    calculatorState.currentQuote = null;

    const promoCode = document.getElementById('promoCode');
    if (promoCode) {
        promoCode.disabled = false;
        promoCode.value = '';
    }

    const promoMessage = document.getElementById('promoMessage');
    if (promoMessage) {
        promoMessage.style.display = 'none';
    }

    quoteDisplay.style.display = 'none';
    packagesSection.style.display = 'none';
    document.querySelector('.quote-generator').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Render Packages
function renderPackages() {
    const packagesGrid = document.getElementById('packagesGrid');
    packagesGrid.innerHTML = '';

    PACKAGES.forEach(pkg => {
        const packageCard = document.createElement('div');
        packageCard.className = `package-card ${pkg.featured ? 'featured' : ''}`;

        const featuresHTML = pkg.features
            .map(feature => `<li>${feature}</li>`)
            .join('');

        packageCard.innerHTML = `
            <div class="package-badge">${pkg.badge}</div>
            <h3 class="package-name">${pkg.name}</h3>
            <p class="package-description">${pkg.description}</p>
            <div class="package-price">$${pkg.price.toLocaleString('en-US')}</div>
            <div class="package-features">
                <ul>
                    ${featuresHTML}
                </ul>
            </div>
            <button class="package-cta" onclick="selectPackage('${pkg.id}', ${pkg.price})">
                Select ${pkg.name}
            </button>
        `;

        packagesGrid.appendChild(packageCard);
    });
}

// Select Package
function selectPackage(packageId, price) {
    const pkg = PACKAGES.find(p => p.id === packageId);
    const email = prompt('Please enter your email to proceed:');
    
    if (!email) return;

    try {
        // Send package selection to backend
        fetch(`${API_CONFIG.baseURL}${API_CONFIG.endpoints.createOrder}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                packageId,
                packageName: pkg.name,
                price,
                userEmail: email,
                selectedAt: new Date().toISOString()
            })
        }).then(res => {
            if (res.ok) {
                showNotification(`${pkg.name} package selected! Check your email for next steps.`, 'success');
            } else {
                showNotification('Error processing package selection', 'error');
            }
        }).catch(err => {
            console.error('Error:', err);
            showNotification('Failed to process selection. Please try again.', 'error');
        });
    } catch (error) {
        console.error('Error selecting package:', error);
        showNotification('An error occurred', 'error');
    }
}

// Show Notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#0ea5e9'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        animation: slideInRight 0.3s ease;
        font-weight: 500;
    `;

    document.body.appendChild(notification);

    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// Add slide animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(20px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(20px);
        }
    }
`;
document.head.appendChild(style);

// Export functions for HTML onclick handlers
window.downloadQuote = downloadQuote;
window.showPackages = showPackages;
window.hidePackages = hidePackages;
window.resetQuote = resetQuote;
window.selectPackage = selectPackage;
window.applyPromoCode = applyPromoCode;
window.submitQuote = submitQuote;
