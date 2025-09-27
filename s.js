const products = [
  {
    id: 1,
    name: 'Premium Dog Food',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 2,
    name: 'Vitamin Supplements',
    price: 15.5,
    image: 'https://images.unsplash.com/photo-1606813909352-9e8e3827e718?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 3,
    name: 'Chew Toys',
    price: 12.0,
    image: 'https://images.unsplash.com/photo-1560807707-8cc77767d783?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 4,
    name: 'Cat Accessories Set',
    price: 22.99,
    image: 'https://images.unsplash.com/photo-1590080877777-50a6c9b6f8a7?auto=format&fit=crop&w=500&q=80',
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
