/* Shineflo Scripts */

// ===================================
// PRODUCT DATA
// ===================================
const products = [
    {
        id: 1,
        name: "Industrial Motors",
        description: "High-performance motors for demanding applications",
        price: 100,
        material: "SS 304",
        finish: "Chrome",
        image: "public/motor.jpeg",
        brand: "Hafele",
        technicalSheet: "technical-sheets/motor-specs.pdf", // PDF path
        sheetSize: "2.4 MB"
    },
    {
        id: 2,
        name: "Steel Piping",
        description: "Durable piping systems for industrial infrastructure",
        price: 85,
        material: "Brass",
        finish: "Satin",
        image: "public/pipe.jpeg",
        brand: "Hettich",
        technicalSheet: "technical-sheets/pipe-specs.pdf",
        sheetSize: "1.8 MB"
    },
    {
        id: 3,
        name: "Storage Tanks",
        description: "Heavy-duty storage solutions for industrial needs",
        price: 120,
        material: "Zinc",
        finish: "Antique",
        image: "public/tank.jpeg",
        brand: "Godrej",
        technicalSheet: "technical-sheets/tank-specs.pdf",
        sheetSize: "3.1 MB"
    },
    {
        id: 4,
        name: "Door Hinges",
        description: "Premium quality hinges for wardrobe doors",
        price: 45,
        material: "SS 304",
        finish: "Chrome",
        image: "public/Background.jpeg",
        brand: "Ebco",
        technicalSheet: "technical-sheets/hinge-specs.pdf",
        sheetSize: "1.2 MB"
    },
    {
        id: 5,
        name: "Cabinet Handles",
        description: "Elegant handles for modern wardrobes",
        price: 65,
        material: "Brass",
        finish: "Antique",
        image: "public/Background.jpeg",
        brand: "Dorset",
        technicalSheet: null, // No PDF available
        sheetSize: null
    },
    {
        id: 6,
        name: "Security Locks",
        description: "High-security locks for wardrobe protection",
        price: 150,
        material: "Zinc",
        finish: "Satin",
        image: "public/Background.jpeg",
        brand: "Godrej",
        technicalSheet: "technical-sheets/lock-specs.pdf",
        sheetSize: "2.0 MB"
    }
];

let currentFilters = {
    materials: [],
    finishes: [],
    maxPrice: 5000
};

// Trusted brands data
const trustedBrands = [
    { name: "Hafele", logo: "brands/hafele.png" },
    { name: "Hettich", logo: "brands/hettich.png" },
    { name: "Ebco", logo: "brands/ebco.png" },
    { name: "Godrej", logo: "brands/godrej.png" },
    { name: "Dorset", logo: "brands/dorset.png" },
    { name: "Yale", logo: "brands/yale.png" }
];

let selectedBundle = null;
let currentQuantity = 1;
let currentProduct = null;
let gstNumber = '';
let isGstValid = false;

// ===================================
// FILTER FUNCTIONS
// ===================================

// Apply filters and update product display
function applyFilters() {
    // Get selected materials
    currentFilters.materials = Array.from(
        document.querySelectorAll('input[name="material"]:checked')
    ).map(cb => cb.value);
    
    // Get selected finishes
    currentFilters.finishes = Array.from(
        document.querySelectorAll('input[name="finish"]:checked')
    ).map(cb => cb.value);
    
    // Get price range
    currentFilters.maxPrice = parseInt(document.getElementById('priceRange').value);
    
    // Filter products
    const filtered = products.filter(product => {
        const materialMatch = currentFilters.materials.length === 0 || 
                             currentFilters.materials.includes(product.material);
        const finishMatch = currentFilters.finishes.length === 0 || 
                           currentFilters.finishes.includes(product.finish);
        const priceMatch = product.price <= currentFilters.maxPrice;
        
        return materialMatch && finishMatch && priceMatch;
    });
    
    // Update display
    renderProducts(filtered);
    updateActiveFilters();
}

// Render products to grid
function renderProducts(productsToShow) {
    const grid = document.getElementById('productGrid');
    
    if (productsToShow.length === 0) {
        grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 60px; color: var(--slate);"><h3>No products found</h3><p>Try adjusting your filters</p></div>';
        return;
    }
    
    grid.innerHTML = productsToShow.map(product => `
        <div class="product-card" onclick="openProductModal(${product.id})">
            <img src="${product.image}" alt="${product.name}">
            <div class="product-card-content">
                <h3>${product.name}</h3>
                <div class="product-meta">
                    <span class="product-badge">${product.material}</span>
                    <span class="product-badge">${product.finish}</span>
                </div>
                <p>${product.description}</p>
                <div class="product-price">₹${product.price}</div>
                <a href="#" class="card-link" onclick="event.stopPropagation(); openProductModal(${product.id})">View Details →</a>
            </div>
        </div>
    `).join('');
}

// Update active filter tags
function updateActiveFilters() {
    const container = document.getElementById('activeFilters');
    const tags = [];
    
    currentFilters.materials.forEach(mat => {
        tags.push(`<div class="filter-tag">${mat} <button onclick="removeFilter('material', '${mat}')">×</button></div>`);
    });
    
    currentFilters.finishes.forEach(fin => {
        tags.push(`<div class="filter-tag">${fin} <button onclick="removeFilter('finish', '${fin}')">×</button></div>`);
    });
    
    if (currentFilters.maxPrice < 5000) {
        tags.push(`<div class="filter-tag">Up to ₹${currentFilters.maxPrice} <button onclick="removeFilter('price', null)">×</button></div>`);
    }
    
    container.innerHTML = tags.join('');
}

// Remove individual filter
function removeFilter(type, value) {
    if (type === 'material') {
        document.querySelector(`input[name="material"][value="${value}"]`).checked = false;
    } else if (type === 'finish') {
        document.querySelector(`input[name="finish"][value="${value}"]`).checked = false;
    } else if (type === 'price') {
        document.getElementById('priceRange').value = 5000;
        updatePriceLabel();
    }
    applyFilters();
}

// Clear all filters
function clearAllFilters() {
    document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
    document.getElementById('priceRange').value = 5000;
    updatePriceLabel();
    applyFilters();
}

// Update price label
function updatePriceLabel() {
    const value = document.getElementById('priceRange').value;
    document.getElementById('maxPrice').textContent = '₹' + value;
}

// ===================================
// BULK PRICING CALCULATOR
// ===================================

// Calculate price based on quantity
function calculatePrice(basePrice, quantity) {
    let pricePerUnit = basePrice;
    
    if (quantity >= 51) {
        pricePerUnit = basePrice * 0.7; // 30% discount
    } else if (quantity >= 11) {
        pricePerUnit = basePrice * 0.85; // 15% discount
    }
    
    return {
        pricePerUnit: Math.round(pricePerUnit),
        total: Math.round(pricePerUnit * quantity),
        savings: Math.round((basePrice - pricePerUnit) * quantity)
    };
}

// Open product modal with bulk pricing
function openProductModal(productId) {
    currentProduct = products.find(p => p.id === productId);
    currentQuantity = 1;
    
    const modal = document.getElementById('productModal');
    const modalBody = document.getElementById('modalBody');
    
    // Technical sheet button (only if PDF exists)
    const technicalSheetBtn = currentProduct.technicalSheet ? `
        <button class="btn-technical" onclick="downloadTechnicalSheet()" title="Detailed specifications and installation guide">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="12" y1="18" x2="12" y2="12"></line>
                <line x1="9" y1="15" x2="15" y2="15"></line>
            </svg>
            Download Technical Sheet
            <span class="file-size">${currentProduct.sheetSize}</span>
        </button>
    ` : '';
    
    modalBody.innerHTML = `
        <div class="modal-product-header">
            <h2>${currentProduct.name}</h2>
            <p>${currentProduct.description}</p>
            <div class="product-brand-badge">
                <span>Brand:</span> <strong>${currentProduct.brand}</strong>
            </div>
        </div>
        
        <div class="pricing-tiers">
            <h4>Bulk Pricing Tiers</h4>
            <div class="tier-list">
                <div class="tier-item">
                    <span>1-10 units</span>
                    <strong>₹${currentProduct.price} per unit</strong>
                </div>
                <div class="tier-item">
                    <span>11-50 units</span>
                    <strong>₹${Math.round(currentProduct.price * 0.85)} per unit (15% off)</strong>
                </div>
                <div class="tier-item">
                    <span>51+ units</span>
                    <strong>₹${Math.round(currentProduct.price * 0.7)} per unit (30% off)</strong>
                </div>
            </div>
        </div>
        
        <div class="quantity-selector">
            <button class="qty-btn" onclick="updateQuantity(-1)">-</button>
            <div class="qty-display" id="qtyDisplay">1</div>
            <button class="qty-btn" onclick="updateQuantity(1)">+</button>
        </div>
        
        <div id="priceSummary"></div>
        
        <div class="modal-actions">
            ${technicalSheetBtn}
            <button class="btn-primary" onclick="addToCartFromModal()">Add to Cart</button>
        </div>
    `;
    
    modal.style.display = 'block';
    updatePriceSummary();
}

// Update quantity
function updateQuantity(change) {
    currentQuantity = Math.max(1, currentQuantity + change);
    document.getElementById('qtyDisplay').textContent = currentQuantity;
    updatePriceSummary();
}

// Update price summary
function updatePriceSummary() {
    const pricing = calculatePrice(currentProduct.price, currentQuantity);
    const summaryDiv = document.getElementById('priceSummary');
    
    let html = `
        <div class="price-summary">
            <div class="price-row">
                <span>Price per unit:</span>
                <span>₹${pricing.pricePerUnit}</span>
            </div>
            <div class="price-row">
                <span>Quantity:</span>
                <span>${currentQuantity}</span>
            </div>
            <div class="price-row total">
                <span>Total:</span>
                <span>₹${pricing.total}</span>
            </div>
        </div>
    `;
    
    if (pricing.savings > 0) {
        html += `<div class="savings-badge">🎉 You saved ₹${pricing.savings}!</div>`;
    }
    
    summaryDiv.innerHTML = html;
}

// Close modal
function closeProductModal() {
    document.getElementById('productModal').style.display = 'none';
}

// Add to cart from modal
function addToCartFromModal() {
    // Show checkout modal instead of simple alert
    openCheckoutModal();
}

// ===================================
// TECHNICAL DATA SHEET DOWNLOAD
// ===================================

function downloadTechnicalSheet() {
    if (!currentProduct.technicalSheet) {
        alert('Technical sheet not available for this product.');
        return;
    }
    
    // In production, this would download the actual PDF
    // For demo, we'll show a message
    const confirmed = confirm(
        `Download Technical Sheet\n\n` +
        `Product: ${currentProduct.name}\n` +
        `File: ${currentProduct.technicalSheet}\n` +
        `Size: ${currentProduct.sheetSize}\n\n` +
        `This will download the technical specifications and installation guide.\n\n` +
        `Click OK to proceed.`
    );
    
    if (confirmed) {
        // Simulate download
        // In production: window.open(currentProduct.technicalSheet, '_blank');
        alert('✓ Technical sheet download started!\n\nNote: In production, this would download the actual PDF file.');
    }
}

// ===================================
// BUNDLE BUILDER
// ===================================

// Select wardrobe size
function selectWardrobe(doors) {
    // Remove previous selection
    document.querySelectorAll('.wardrobe-option').forEach(opt => {
        opt.classList.remove('selected');
    });
    
    // Add selection to clicked option
    event.target.closest('.wardrobe-option').classList.add('selected');
    
    // Calculate bundle items
    const hingesQty = doors * 3;
    const handlesQty = doors;
    const locksQty = 1;
    
    selectedBundle = {
        doors: doors,
        items: [
            { product: products.find(p => p.name === 'Door Hinges'), qty: hingesQty },
            { product: products.find(p => p.name === 'Cabinet Handles'), qty: handlesQty },
            { product: products.find(p => p.name === 'Security Locks'), qty: locksQty }
        ]
    };
    
    renderBundleSummary();
}

// Render bundle summary
function renderBundleSummary() {
    const summary = document.getElementById('bundleSummary');
    const itemsDiv = document.getElementById('bundleItems');
    
    let total = 0;
    const itemsHtml = selectedBundle.items.map((item, index) => {
        const itemTotal = item.product.price * item.qty;
        total += itemTotal;
        
        return `
            <div class="bundle-item">
                <div class="bundle-item-info">
                    <h5>${item.product.name}</h5>
                    <p>₹${item.product.price} × ${item.qty} = ₹${itemTotal}</p>
                </div>
                <div class="bundle-item-qty">
                    <input type="number" class="bundle-qty-input" value="${item.qty}" 
                           min="1" onchange="updateBundleQty(${index}, this.value)">
                </div>
            </div>
        `;
    }).join('');
    
    itemsDiv.innerHTML = itemsHtml;
    document.getElementById('bundlePrice').textContent = '₹' + total;
    summary.style.display = 'block';
}

// Update bundle quantity
function updateBundleQty(index, newQty) {
    selectedBundle.items[index].qty = parseInt(newQty);
    renderBundleSummary();
}

// Add bundle to cart
function addBundleToCart() {
    const total = selectedBundle.items.reduce((sum, item) => 
        sum + (item.product.price * item.qty), 0
    );
    
    const itemsList = selectedBundle.items.map(item => 
        `${item.qty}× ${item.product.name}`
    ).join(', ');
    
    alert(`Bundle added to cart!\n\nItems: ${itemsList}\nTotal: ₹${total}`);
}

// ===================================
// CHECKOUT WITH GST
// ===================================

function openCheckoutModal() {
    const pricing = calculatePrice(currentProduct.price, currentQuantity);
    
    const checkoutModal = document.getElementById('checkoutModal');
    const checkoutBody = document.getElementById('checkoutBody');
    
    checkoutBody.innerHTML = `
        <div class="checkout-header">
            <h2>Checkout</h2>
        </div>
        
        <div class="checkout-summary">
            <h3>Order Summary</h3>
            <div class="summary-item">
                <span>${currentProduct.name}</span>
                <span>₹${currentProduct.price} × ${currentQuantity}</span>
            </div>
            <div class="summary-item total">
                <span>Subtotal</span>
                <span>₹${pricing.total}</span>
            </div>
            ${pricing.savings > 0 ? `
                <div class="summary-savings">
                    🎉 You saved ₹${pricing.savings}!
                </div>
            ` : ''}
        </div>
        
        <div class="gst-section">
            <div class="gst-header">
                <label for="gstInput">GST Number (Optional)</label>
                <span class="info-icon" title="Enter your GSTIN to claim Input Tax Credit (ITC) on this purchase">ℹ️</span>
            </div>
            <input 
                type="text" 
                id="gstInput" 
                class="gst-input" 
                placeholder="22AAAAA0000A1Z5" 
                maxlength="15"
                oninput="validateGST(this.value)"
            >
            <div id="gstValidation" class="gst-validation"></div>
            <div id="gstBenefit" class="gst-benefit" style="display: none;">
                ✓ You are eligible for Input Tax Credit (ITC)
            </div>
        </div>
        
        <div class="checkout-actions">
            <button class="btn-secondary" onclick="closeCheckoutModal()">Continue Shopping</button>
            <button class="btn-primary" onclick="completeOrder()">Place Order</button>
        </div>
    `;
    
    checkoutModal.style.display = 'block';
}

function closeCheckoutModal() {
    document.getElementById('checkoutModal').style.display = 'none';
    closeProductModal();
}

// Validate GST Number (GSTIN format)
function validateGST(value) {
    const gstInput = document.getElementById('gstInput');
    const validation = document.getElementById('gstValidation');
    const benefit = document.getElementById('gstBenefit');
    
    // Remove spaces and convert to uppercase
    value = value.replace(/\s/g, '').toUpperCase();
    gstInput.value = value;
    
    if (value.length === 0) {
        validation.innerHTML = '';
        benefit.style.display = 'none';
        isGstValid = false;
        gstNumber = '';
        return;
    }
    
    // GSTIN format: 2 digits (state) + 10 chars (PAN) + 1 digit + 1 char + 1 char
    const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    
    if (value.length < 15) {
        validation.innerHTML = '<span class="validation-pending">⏳ Enter 15 characters</span>';
        benefit.style.display = 'none';
        isGstValid = false;
        gstNumber = '';
    } else if (gstRegex.test(value)) {
        validation.innerHTML = '<span class="validation-success">✓ Valid GST Number</span>';
        benefit.style.display = 'block';
        isGstValid = true;
        gstNumber = value;
    } else {
        validation.innerHTML = '<span class="validation-error">✗ Invalid GST format</span>';
        benefit.style.display = 'none';
        isGstValid = false;
        gstNumber = '';
    }
}

// Complete order
function completeOrder() {
    const pricing = calculatePrice(currentProduct.price, currentQuantity);
    
    let orderSummary = `Order Placed Successfully! 🎉\n\n`;
    orderSummary += `Product: ${currentProduct.name}\n`;
    orderSummary += `Quantity: ${currentQuantity}\n`;
    orderSummary += `Total: ₹${pricing.total}\n`;
    
    if (isGstValid && gstNumber) {
        orderSummary += `\nGST Number: ${gstNumber}\n`;
        orderSummary += `✓ Eligible for Input Tax Credit\n`;
    }
    
    orderSummary += `\nYour order will be processed shortly.`;
    
    alert(orderSummary);
    closeCheckoutModal();
}

// ===================================
// BRAND DIRECTORY
// ===================================

function renderBrandDirectory() {
    const container = document.getElementById('brandDirectory');
    if (!container) return;
    
    container.innerHTML = trustedBrands.map(brand => `
        <div class="brand-item" onclick="filterByBrand('${brand.name}')" title="View ${brand.name} products">
            <div class="brand-logo-placeholder">${brand.name}</div>
        </div>
    `).join('');
}

function filterByBrand(brandName) {
    // Clear existing filters
    clearAllFilters();
    
    // Filter products by brand
    const filtered = products.filter(p => p.brand === brandName);
    renderProducts(filtered);
    
    // Scroll to products
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
    
    // Show active filter
    const activeFilters = document.getElementById('activeFilters');
    activeFilters.innerHTML = `<div class="filter-tag">Brand: ${brandName} <button onclick="clearAllFilters(); applyFilters();">×</button></div>`;
}

// ===================================
// WHATSAPP INTEGRATION
// ===================================

function openWhatsApp(event) {
    event.preventDefault();
    
    const phoneNumber = '919876543210'; // Replace with your WhatsApp number
    let message = 'Hi, I want a quote for ';
    
    // If on product page
    if (currentProduct) {
        message += `${currentProduct.name} (${currentQuantity} units)`;
    } else {
        message += 'hardware products from Shineflo';
    }
    
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// ===================================
// CONTACT FORM
// ===================================

function handleSubmit(event) {
    event.preventDefault();
    const btn = event.target.querySelector('button[type="submit"]');
    btn.textContent = 'Sending…'; 
    btn.disabled = true;
    
    setTimeout(() => {
        btn.textContent = '✓ Message Sent!';
        btn.style.background = '#12976a';
        setTimeout(() => { 
            btn.textContent = 'Send Message'; 
            btn.disabled = false; 
            btn.style.background = ''; 
            event.target.reset();
        }, 3000);
    }, 1800);
}

// ===================================
// SMOOTH SCROLLING
// ===================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ===================================
// INITIALIZE ON PAGE LOAD
// ===================================

window.addEventListener('DOMContentLoaded', () => {
    renderProducts(products);
    updatePriceLabel();
    renderBrandDirectory();
});
