
let cart = [];
let total = 0;

// Show the selected screen
function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(screen => {
    screen.style.display = 'none';
  });
  document.getElementById(screenId).style.display = 'block';

  if (screenId === 'screen3') {
    document.getElementById('checkout-total').textContent = total.toFixed(2);
  }
}

// Add item to cart
function addToCart(productName, price) {

  const item = cart.find(item => item.name === productName);
  if (item) {
    item.quantity += 1;
    item.totalPrice += price;
  } else {
    cart.push({ name: productName, price: price, quantity: 1, totalPrice: price });
  }
  total += price;
  updateCartUI();
}


// Update Cart UI
function updateCartUI() {
  const cartList = document.getElementById('cart-list');
  cartList.innerHTML = ''; // Clear previous items
  cart.forEach(item => {
    const li = document.createElement('li');
    li.classList.add('list-group-item');
    li.innerHTML = `${item.name} - $${item.totalPrice.toFixed(2)} (x${item.quantity}) <button class="btn btn-danger btn-sm float-end" onclick="removeFromCart('${item.name}')">Remove</button>`;
    cartList.appendChild(li);
  });
  document.getElementById('total').textContent = total.toFixed(2);
}

// Remove item from cart
function removeFromCart(productName) {
  const item = cart.find(item => item.name === productName);
  if (item) {
    total -= item.totalPrice;
    cart = cart.filter(cartItem => cartItem.name !== productName);
    updateCartUI();
  }
}

// Filter products by category
function filterCategory(category) {
  const products = document.querySelectorAll('.product-item');
  products.forEach(product => {
    if (category === 'all' || product.dataset.category === category) {
      product.style.display = 'block';
    } else {
      product.style.display = 'none';
    }
  });
}

// Real-time search for products
function filterProducts() {
  const searchQuery = document.getElementById('search-bar').value.toLowerCase();
  const products = document.querySelectorAll('.product-item');
  products.forEach(product => {
    const productName = product.querySelector('.card-title').textContent.toLowerCase();
    if (productName.includes(searchQuery)) {
      product.style.display = 'block';
    } else {
      product.style.display = 'none';
    }
  });
}

function clearSearch() {
  document.getElementById('search-bar').value = '';
  filterProducts();
}

// Complete checkout and reset cart
function completeCheckout() {
  document.getElementById('final-total').textContent = total.toFixed(2);
  cart = [];
  total = 0;
  updateCartUI();
  showScreen('screen1');
}
