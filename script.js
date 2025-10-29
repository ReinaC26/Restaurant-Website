// =========================
// Navbar Highlight + Scroll Effect
// =========================
const links = document.querySelectorAll('.nav-links li a');
const currentPath = window.location.pathname;

links.forEach(link => {
  const linkPath = new URL(link.href).pathname;
  if (linkPath === currentPath) {
    link.classList.add('active');
  }
});

const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', function() {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

function toggleMenu() {
  document.querySelector('.nav-links').classList.toggle('active');
}

// Only apply cart color change on homepage
if (window.location.pathname === "/index.html" || window.location.pathname === "/") {
  window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    const cartIcon = document.querySelector('.cart-icon');
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
      cartIcon.src = "images/cart2.png";
    } else {
      navbar.classList.remove('scrolled');
      cartIcon.src = "images/cart1.png";
    }
  });
}

// =========================
// Homepage Slider
// =========================
const wrapper = document.querySelector('.slider-wrapper');
const slides = document.querySelectorAll('.slide');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');

let currentIndex = 0;
const totalSlides = slides.length;

function showSlide(index) {
  if (!wrapper || slides.length === 0) return;
  if (index < 0) currentIndex = totalSlides - 1;
  else if (index >= totalSlides) currentIndex = 0;
  else currentIndex = index;

  wrapper.style.transition = 'transform 0.5s ease-in-out';
  wrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
}

if (prev && next) {
  prev.addEventListener('click', () => showSlide(currentIndex - 1));
  next.addEventListener('click', () => showSlide(currentIndex + 1));
}

setInterval(() => showSlide(currentIndex + 1), 5000);
showSlide(0);


// =========================
// Shopping Cart Functionality
// =========================
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Add item to cart
function addToCart(name, price, image) {
  const existingItem = cart.find(item => item.name === name);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ name, price, image, quantity: 1 });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${name} added to cart!`);
}

// Display cart
function displayCart() {
  const cartContainer = document.getElementById("cart-container");
  const totalDiv = document.getElementById("cart-total"); 
  if (!cartContainer || !totalDiv) return;

  cartContainer.innerHTML = ""; // Clear previous items

  // Empty Cart button
  if (cart.length > 0) {
    const emptyBtn = document.createElement("button");
    emptyBtn.textContent = "Empty Cart";
    emptyBtn.classList.add("empty-cart-btn");
    emptyBtn.style.alignSelf = "flex-end";
    emptyBtn.addEventListener("click", () => {
      cart = [];
      localStorage.setItem("cart", JSON.stringify(cart));
      displayCart();
    });
    cartContainer.appendChild(emptyBtn);
  }

  let total = 0;

  if (cart.length === 0) {
    cartContainer.innerHTML += "<p>Your cart is empty.</p>";
    totalDiv.innerHTML = `<h3>Total: $0.00</h3>
                          <button class="checkout-btn">Proceed to Checkout</button>`;
    return;
  }

  cart.forEach(item => {
    const priceValue = parseFloat(item.price.replace('$', '')) * item.quantity;
    total += priceValue;

    const itemBox = document.createElement("div");
    itemBox.classList.add("cart-item");

    itemBox.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="cart-item-image">
      <div class="cart-details">
        <h3>${item.name}</h3>
        <p class="price">${item.price}</p>
        <div class="quantity-container">
          <label>Quantity:</label>
          <select class="quantity-dropdown">
            ${[...Array(10)].map((_, i) => 
              `<option value="${i + 1}" ${item.quantity === i + 1 ? "selected" : ""}>${i + 1}</option>`
            ).join("")}
          </select>
        </div>
      </div>
      <button class="remove-btn">Remove</button>
    `;

    // Remove item button
    itemBox.querySelector(".remove-btn").addEventListener("click", () => {
      cart = cart.filter(c => c.name !== item.name);
      localStorage.setItem("cart", JSON.stringify(cart));
      displayCart();
    });

    // Quantity change
    const dropdown = itemBox.querySelector(".quantity-dropdown");
    dropdown.addEventListener("change", (e) => {
      item.quantity = parseInt(e.target.value);
      localStorage.setItem("cart", JSON.stringify(cart));
      displayCart();
    });

    cartContainer.appendChild(itemBox);
  });

  // Update total
  totalDiv.innerHTML = `<h3>Total: $${total.toFixed(2)}</h3>
                        <button class="checkout-btn">Proceed to Checkout</button>`;
}

// DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  // Menu page Add to Cart buttons
  const addButtons = document.querySelectorAll(".add-to-cart");
  addButtons.forEach(button => {
    button.addEventListener("click", (e) => {
      const card = e.target.closest(".menu-card");
      const name = card.dataset.name;
      const price = `$${card.dataset.price}`;
      const image = card.dataset.image ? `images/${card.dataset.image}` : "images/default.jpg";
      addToCart(name, price, image);
    });
  });

  // Display cart if on cart page
  if (window.location.pathname.includes("shoppingCart.html")) {
    displayCart();
  }
});
