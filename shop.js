
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");
const header = document.getElementById("header");

// فتح / إغلاق القائمة
navToggle.addEventListener("click", (e) => {
  e.stopPropagation(); // منع غلقها عند الضغط على الزر نفسه
  navMenu.classList.toggle("show");
  navToggle.classList.toggle("active");
});

// إغلاق القائمة عند الضغط خارجها
document.addEventListener("click", (e) => {
  if (
    navMenu.classList.contains("show") &&
    !navMenu.contains(e.target) &&
    !navToggle.contains(e.target)
  ) {
    navMenu.classList.remove("show");
    navToggle.classList.remove("active");
  }
});

// Add background on scroll
window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 50);
});

const products = [
  {
    id: 1,
    name: 'Purina Fancy',
    price: 18.99,
    image: 'https://images-na.ssl-images-amazon.com/images/I/81PFKMYzzVL._AC_UL600_SR600,400_.jpg',
  },
  {
    id: 2,
    name: 'Wholesome Grains',
    price: 14.5,
    image: 'https://m.media-amazon.com/images/I/51OrCyAAcgL._AC_SX679_.jpg',
  },
  {
    id: 3,
    name: 'Sensible Seed Mix',
    price: 11.75,
    image: 'https://m.media-amazon.com/images/I/818LTMHif4L._AC_SY879_.jpg',
  },
  {
    id: 4,
    name: 'Dr. Elseys Cat Litter',
    price: 30.99,
    image: 'https://m.media-amazon.com/images/I/71gV7T7iW-L._AC_SY300_SX300_QL70_FMwebp_.jpg',
  },
   {
    id: 5,
    name: 'Basics Cat Tree',
    price: 40.99,
    image: 'https://m.media-amazon.com/images/I/71vod5IjZRL._AC_SX679_.jpg',
  },
   {
    id: 6,
    name: 'Active Rolling Ball ',
    price: 30.99,
    image: 'https://m.media-amazon.com/images/I/71UgGZXIRFL._AC_SX679_.jpg',
  },
   {
    id: 7,
    name: 'Bird Cage with Handle',
    price: 30.99,
    image: 'https://m.media-amazon.com/images/I/91HxBlXUYQL._AC_SX679_.jpg',
  },
   {
    id: 8,
    name: 'Alive Hamstermania',
    price: 5.99,
    image: 'https://m.media-amazon.com/images/I/81-IZL4kzoL._AC_SX679_.jpg',
  },
];

const productsGrid = document.getElementById('products-grid');
const cartItemsList = document.getElementById('cart-items');
const checkoutBtn = document.getElementById('checkout-btn');
const checkoutMsg = document.getElementById('checkout-message');

let cart = [];

function renderProducts() {
  productsGrid.innerHTML = '';
  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="product-image" />
      <div class="product-name">${product.name}</div>
      <div class="product-price">$${product.price.toFixed(2)}</div>
      <button class="btn-add" data-id="${product.id}">Add to Cart</button>
    `;

    productsGrid.appendChild(card);
  });
}

function renderCart() {
  cartItemsList.innerHTML = '';
  if (cart.length === 0) {
    cartItemsList.innerHTML = '<li>Your cart is empty.</li>';
    checkoutBtn.disabled = true;
    return;
  }
  checkoutBtn.disabled = false;

  cart.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${item.name} x${item.quantity}</span>
      <span>$${(item.price * item.quantity).toFixed(2)}</span>
      <button aria-label="Remove ${item.name}" data-id="${item.id}">&times;</button>
    `;
    cartItemsList.appendChild(li);
  });
}

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const existingItem = cart.find(item => item.id === productId);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({...product, quantity: 1});
  }
  renderCart();
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  renderCart();
}

productsGrid.addEventListener('click', e => {
  if (e.target.classList.contains('btn-add')) {
    const id = Number(e.target.getAttribute('data-id'));
    addToCart(id);
  }
});

cartItemsList.addEventListener('click', e => {
  if (e.target.tagName === 'BUTTON') {
    const id = Number(e.target.getAttribute('data-id'));
    removeFromCart(id);
  }
});

checkoutBtn.addEventListener('click', () => {
  if (cart.length === 0) return;
  cart = [];
  renderCart();
  checkoutMsg.style.display = 'block';
  setTimeout(() => {
    checkoutMsg.style.display = 'none';
  }, 4000);
});

renderProducts();
renderCart();
