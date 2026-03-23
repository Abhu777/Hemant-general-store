// =====================================================
// HEMANT GENERAL STORE - PERFECT NAVIGATION
// Click Home → Scroll to Home, Contact → Scroll to Contact
// =====================================================

// ✅ CORRECT PRODUCTS WITH WORKING IMAGES
const products = [
    { id: 1, name: "Aashirvaad Atta 10kg", price: 400,  category: "Grocery",image:"images/atta.jpg" },
    { id: 2, name: "Basmati Rice 5kg", price: 650,  category: "Grocery" },
    { id: 3, name: "Fortune Oil 1L", price: 145, category: "Kitchen" },
    { id: 4, name: "Amul Ghee 500g", price: 420,  category: "Kitchen" },
    { id: 5, name: "Colgate Toothpaste",  category: "Personal Care" },
    { id: 6, name: "Lifebuoy Soap 4pc", category: "Personal Care" },
    { id: 7, name: "Parle-G Biscuits", price: 95,  category: "Snacks" },
    { id: 8, name: "Amul Milk Powder", price: 220,  category: "Dairy" },
    { id: 9, name: "Surf Excel 1kg", price: 185,  category: "Household" },
    { id: 10, name: "Tata Salt 1kg", price: 25,  category: "Kitchen" }
];

let cart = [];

// =====================================================
// 🔥 PERFECT NAVIGATION SYSTEM
// =====================================================
function navigateToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
        
        // Close mobile menu after navigation
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
        }
        
        // Add active class to clicked nav item
        updateActiveNav(sectionId);
    }
}

function updateActiveNav(activeSection) {
    // Remove active class from all nav links
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active class to current section link
    const activeLink = document.querySelector(`.nav-menu a[href="#${activeSection}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

// =====================================================
// INITIALIZATION
// =====================================================
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    updateCartCount();
    setupNavigation();
    setupEventListeners();
});

// =====================================================
// NAVIGATION SETUP
// =====================================================
function setupNavigation() {
    // Navigation links
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('href').substring(1); // Remove #
            navigateToSection(sectionId);
        });
    });
    
    // Logo click goes to home
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', () => navigateToSection('home'));
    }
}

// =====================================================
// PRODUCT FUNCTIONS (SAME AS BEFORE)
function loadProducts() {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;
    
    productsGrid.innerHTML = products.map(product => createProductCard(product)).join('');
}

function createProductCard(product) {
    return `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" 
                     onerror="this.src='https://via.placeholder.com/300x250/2c5530/ffffff?text=${product.name}'"
                     loading="lazy">
                <span class="product-category">${product.category}</span>
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="product-price">₹${product.price}</div>
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    <i class="fas fa-cart-plus"></i> Add Cart
                </button>
            </div>
        </div>
    `;
}

// =====================================================
// CART FUNCTIONS
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({...product, quantity: 1});
    }
    
    updateCartCount();
    showNotification(`${product.name} added! ✅`);
}

function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountEl = document.querySelector('.cart-count');
    if (cartCountEl) cartCountEl.textContent = totalItems || '';
}

function openCart() {
    document.getElementById('cartModal').style.display = 'block';
    renderCart();
}

function closeCart() {
    document.getElementById('cartModal').style.display = 'none';
}

function renderCart() {
    const cartItemsEl = document.getElementById('cartItems');
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    if (cart.length === 0) {
        cartItemsEl.innerHTML = '<p style="text-align:center;padding:2rem;">Cart empty</p>';
    } else {
        cartItemsEl.innerHTML = cart.map(item => `
            <div class="cart-item">
                <span>${item.name} x${item.quantity}</span>
                <button onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        `).join('');
    }
    
    document.getElementById('cartTotal').textContent = total.toFixed(2);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    renderCart();
}

// =====================================================
// UTILITY FUNCTIONS
function callStore() {
    window.location.href = 'tel:+9198160123456'; // YOUR NUMBER
}

function placeOrder() {
    if (cart.length === 0) return alert('Cart empty!');
    alert('✅ Order placed! We will call you.');
    cart = [];
    closeCart();
    updateCartCount();
}

// =====================================================
// NOTIFICATION
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position:fixed;top:20px;right:20px;background:#27ae60;color:white;
        padding:1rem 2rem;border-radius:10px;z-index:9999;
        animation: slideIn 0.5s ease;
    `;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}

// =====================================================
// EVENT LISTENERS
function setupEventListeners() {
    window.onclick = (e) => {
        if (e.target.id === 'cartModal') closeCart();
    };
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeCart();
    });
}

// Make functions global
window.navigateToSection = navigateToSection;
window.addToCart = addToCart;
window.openCart = openCart;
window.closeCart = closeCart;
window.removeFromCart = removeFromCart;
window.callStore = callStore;
window.placeOrder = placeOrder;