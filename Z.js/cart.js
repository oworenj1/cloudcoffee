// ============================================================
// CART STATE
// ============================================================
let cart = [];
let cartIdCounter = 0;


// ============================================================
// UTILITY
// ============================================================
function formatPrice(amount) {
  return "₱" + amount.toLocaleString();
}

function getBasePrice(product) {
  return Object.values(product.prices)[0];
}

function generateOrderNumber() {
  return "CC-" + Math.floor(10000 + Math.random() * 90000);
}


// ============================================================
// RENDER CART SIDEBAR
// ============================================================
function renderCart() {
  const cartItems  = document.getElementById("cartItems");
  const cartFooter = document.getElementById("cartFooter");
  const cartCount  = document.getElementById("cartCount");

  // --- Update badge count ---
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  cartCount.textContent = totalQty;
  cartCount.classList.toggle("visible", totalQty > 0);

  // --- Empty state ---
  if (cart.length === 0) {
    cartItems.innerHTML = `
      <div id="cartEmpty" class="cart-empty">
        <span>☁️</span>
        <p>Your cart is empty.</p>
        <small>Add some drinks to get started!</small>
        <button class="cart-empty-btn" onclick="scrollToMenu()">View Menu</button>

      </div>
    `;
    cartFooter.style.display = "none";
    renderCartTotal();
    return;
  }

  // Remove empty placeholder if it exists
  const existingEmpty = document.getElementById("cartEmpty");
  if (existingEmpty) existingEmpty.remove();

  cartFooter.style.display = "block";
  cartItems.innerHTML = "";

  // --- Render each item ---
  cart.forEach(item => {
    const addonLabels = item.addons
      .map(addon => addonCatalog[addon]?.label || addon)
      .join(", ");

    const metaParts = [];
    if (item.size) metaParts.push(item.size);
    if (item.sweetness && item.sweetness !== "Regular") metaParts.push(item.sweetness);
    if (item.ice) metaParts.push(item.ice);
    if (addonLabels) metaParts.push("+" + addonLabels);

    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <img class="cart-item-img" src="${item.image}" alt="${item.name}" />
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-meta">${metaParts.join(" · ")}</div>
        <div class="cart-item-qty-label">Qty: <strong>${item.qty}</strong></div>
        <div class="cart-item-actions">
          <button class="cart-edit-btn"   data-id="${item.cartId}">✏ Edit</button>
          <button class="cart-remove-btn" data-id="${item.cartId}">🗑 Remove</button>
        </div>
      </div>
      <div class="cart-item-price">${formatPrice(item.unitPrice * item.qty)}</div>
    `;
    cartItems.appendChild(div);
  });

  // --- Remove button listeners ---
  document.querySelectorAll(".cart-remove-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = Number(btn.dataset.id);
      cart = cart.filter(item => item.cartId !== id);
      renderCart();
      if (cart.length === 0) closeCartSidebar();
    });
  });

  // --- Edit button listeners ---
  document.querySelectorAll(".cart-edit-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const id       = Number(btn.dataset.id);
      const cartItem = cart.find(item => item.cartId === id);
      if (!cartItem) return;

      const product = products.find(p => p.id === cartItem.productId);
      if (!product) return;

      // openProductModal lives in modal.js — pass the existing item for pre-fill
      openProductModal(product, cartItem);
    });
  });

  renderCartTotal();
}


// ============================================================
// CART TOTAL
// ============================================================
function renderCartTotal() {
  const subtotal = cart.reduce((sum, item) => sum + (item.unitPrice * item.qty), 0);
  document.getElementById("cartSubtotal").textContent = formatPrice(subtotal);
}


// ============================================================
// OPEN / CLOSE CART SIDEBAR
// ============================================================
function openCart() {
  document.getElementById("cartSidebar").classList.add("open");
  document.getElementById("cartOverlay").classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeCartSidebar() {
  document.getElementById("cartSidebar").classList.remove("open");
  document.getElementById("cartOverlay").classList.remove("active");
  document.body.style.overflow = "";
}


// ============================================================
// CART EVENT LISTENERS
// ============================================================
document.getElementById("cartBtn").addEventListener("click", openCart);
document.getElementById("cartClose").addEventListener("click", closeCartSidebar);
document.getElementById("cartOverlay").addEventListener("click", closeCartSidebar);

