// -------------------- PRODUCT DATA --------------------
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// -------------------- DOM ELEMENTS --------------------
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// -------------------- SESSION STORAGE --------------------
function initializeCart() {
  if (!window.sessionStorage.getItem("cart")) {
    window.sessionStorage.setItem("cart", JSON.stringify([]));
  }
}

function getCart() {
  return JSON.parse(window.sessionStorage.getItem("cart"));
}

function saveCart(cart) {
  window.sessionStorage.setItem("cart", JSON.stringify(cart));
}

// -------------------- RENDER PRODUCTS --------------------
function renderProducts() {
  productList.innerHTML = "";

  products.forEach(function (product) {
    const li = document.createElement("li");

    const btn = document.createElement("button");
    btn.textContent = "Add to Cart";
    btn.onclick = function () {
      addToCart(product.id);
    };

    li.textContent = `${product.name} - $${product.price} `;
    li.appendChild(btn);

    productList.appendChild(li);
  });
}

// -------------------- RENDER CART --------------------
function renderCart() {
  const cart = getCart();
  cartList.innerHTML = "";

  cart.forEach(function (item) {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
  });
}

// -------------------- ADD TO CART --------------------
function addToCart(productId) {
  const cart = getCart();
  const product = products.find(function (p) {
    return p.id === productId;
  });

  if (product) {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
    });

    saveCart(cart);
    renderCart();
  }
}

// -------------------- CLEAR CART --------------------
function clearCart() {
  saveCart([]); // IMPORTANT: tests expect empty array, not removeItem
  renderCart();
}

// -------------------- EVENT LISTENERS --------------------
clearCartBtn.onclick = clearCart;

// -------------------- INITIAL LOAD --------------------
initializeCart();
renderProducts();
renderCart();
