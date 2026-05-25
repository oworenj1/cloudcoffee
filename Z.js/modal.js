
// ============================================================
// MODAL STATE
// ============================================================
let currentProduct  = null;
let selectedSize     = "";
let selectedSweetness = "Regular";
let selectedIce      = "Normal Ice";
let selectedAddons   = [];
let modalQty         = 1;

// Tracks whether we're editing an existing cart item (null = new item)
let editingCartId = null;


// ============================================================
// OPEN PRODUCT MODAL
// ============================================================
function openProductModal(product, existingItem = null) {
  currentProduct = product;

  if (existingItem) {
    // Pre-fill state from the cart item being edited
    editingCartId     = existingItem.cartId;
    selectedSize      = existingItem.size;
    selectedSweetness = existingItem.sweetness || "Regular";
    selectedIce       = existingItem.ice       || "Normal Ice";
    selectedAddons    = [...existingItem.addons];
    modalQty          = existingItem.qty;
  } else {
    // Fresh defaults for a new item
    editingCartId     = null;
    selectedSize      = Object.keys(product.prices)[0];
    selectedSweetness = "Regular";
    selectedIce       = "Normal Ice";
    selectedAddons    = [];
    modalQty          = 1;
  }

  populateModalData(product);
  openModal();
}


// ============================================================
// POPULATE MODAL CONTENT
// ============================================================
function populateModalData(product) {
  // Basic info
  document.getElementById("modalImage").src        = product.image;
  document.getElementById("modalImage").alt        = product.name;
  document.getElementById("modalName").textContent         = product.name;
  document.getElementById("modalDescription").textContent  = product.description;
  document.getElementById("modalCalories").textContent     = "🔥 " + product.calories;
  document.getElementById("aboutDrinkBox").textContent     = product.about;

  const catLabels = {
    hot: "🔥 Hot Beverage", iced: "🧊 Iced Beverage",
    tea: "🍵 Tea", blended: "🥤 Blended", pastry: "🥐 Pastry"
  };
  document.getElementById("modalCategoryBadge").textContent = catLabels[product.category] || "";

  // Button label changes when editing
  document.getElementById("addToCartBtn").textContent =
    editingCartId !== null ? "💾 Save Changes" : "Add to Cart";

  // --- SIZE PILLS ---
  const sizePills = document.getElementById("sizePills");
  sizePills.innerHTML = "";
  Object.keys(product.prices).forEach(size => {
    const btn = document.createElement("button");
    btn.className  = "pill" + (size === selectedSize ? " active" : "");
    btn.dataset.size = size;
    btn.textContent  = `${size} — ${formatPrice(product.prices[size])}`;
    btn.addEventListener("click", () => {
      document.querySelectorAll("#sizePills .pill").forEach(p => p.classList.remove("active"));
      btn.classList.add("active");
      selectedSize = size;
      updateModalPrice();
    });
    sizePills.appendChild(btn);
  });

  // Hide size group for single-price non-standard sizes
  const sizeKeys = Object.keys(product.prices);
  document.getElementById("sizeGroup").style.display =
    (sizeKeys.length <= 1 && !["Small","Medium","Large"].includes(sizeKeys[0])) ? "none" : "";

  // Hide sweetness for pastries
  document.getElementById("sweetnessGroup").style.display =
    product.category === "pastry" ? "none" : "";

  // Show ice level only for iced / blended
  document.getElementById("iceGroup").style.display =
    (product.category === "iced" || product.category === "blended") ? "" : "none";

  // --- SWEETNESS PILLS (clone to clear old listeners) ---
  document.querySelectorAll("[data-sweet]").forEach(pill => {
    pill.classList.toggle("active", pill.dataset.sweet === selectedSweetness);
    const clone = pill.cloneNode(true);
    pill.parentNode.replaceChild(clone, pill);
  });
  document.querySelectorAll("[data-sweet]").forEach(pill => {
    pill.addEventListener("click", () => {
      document.querySelectorAll("[data-sweet]").forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      selectedSweetness = pill.dataset.sweet;
    });
  });

  // --- ICE PILLS (clone to clear old listeners) ---
  document.querySelectorAll("[data-ice]").forEach(pill => {
    pill.classList.toggle("active", pill.dataset.ice === selectedIce);
    const clone = pill.cloneNode(true);
    pill.parentNode.replaceChild(clone, pill);
  });
  document.querySelectorAll("[data-ice]").forEach(pill => {
    pill.addEventListener("click", () => {
      document.querySelectorAll("[data-ice]").forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      selectedIce = pill.dataset.ice;
    });
  });

  // --- ADD-ONS ---
  const addonsGrid = document.getElementById("addonsGrid");
  addonsGrid.innerHTML = "";

  if (product.addons && product.addons.length > 0) {
    product.addons.forEach(addonKey => {
      const addon = addonCatalog[addonKey];
      if (!addon) return;

      const item = document.createElement("div");
      item.className   = "addon-item" + (selectedAddons.includes(addonKey) ? " selected" : "");
      item.dataset.key = addonKey;
      item.innerHTML   = `
        <span>${addon.emoji}</span>
        <div style="flex:1;">
          <div style="font-weight:600;">${addon.label}</div>
          <div style="font-size:11px;color:var(--accent);">+${formatPrice(addon.price)}</div>
        </div>
      `;
      item.addEventListener("click", () => {
        const idx = selectedAddons.indexOf(addonKey);
        if (idx === -1) {
          selectedAddons.push(addonKey);
          item.classList.add("selected");
        } else {
          selectedAddons.splice(idx, 1);
          item.classList.remove("selected");
        }
        updateModalPrice();
      });
      addonsGrid.appendChild(item);
    });
  } else {
    addonsGrid.innerHTML =
      '<p style="font-size:13px;color:var(--text-light);grid-column:span 2;">No add-ons available.</p>';
  }

  // Initial qty display & price
  document.getElementById("qtyDisplay").textContent = modalQty;
  updateModalPrice();
}


// ============================================================
// PRICE CALCULATION
// ============================================================
function calcModalPrice() {
  if (!currentProduct) return 0;
  const base       = currentProduct.prices[selectedSize] || getBasePrice(currentProduct);
  const addonsTotal = selectedAddons.reduce((sum, key) =>
    sum + (addonCatalog[key] ? addonCatalog[key].price : 0), 0);
  return (base + addonsTotal) * modalQty;
}

function updateModalPrice() {
  document.getElementById("modalPriceTotal").textContent = formatPrice(calcModalPrice());
  document.getElementById("qtyDisplay").textContent      = modalQty;
}


// ============================================================
// OPEN / CLOSE MODAL
// ============================================================
function openModal() {
  document.getElementById("modalOverlay").classList.add("active");
  document.getElementById("productModal").classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  document.getElementById("modalOverlay").classList.remove("active");
  document.getElementById("productModal").classList.remove("open");
  document.body.style.overflow = "";
}


// ============================================================
// QUANTITY CONTROLS
// ============================================================
document.getElementById("qtyMinus").addEventListener("click", () => {
  if (modalQty > 1) { modalQty--; updateModalPrice(); }
});
document.getElementById("qtyPlus").addEventListener("click", () => {
  if (modalQty < 10) { modalQty++; updateModalPrice(); }
});


// ============================================================
// ADD TO CART or SAVE EDIT if editing
// ============================================================
document.getElementById("addToCartBtn").addEventListener("click", () => {
  if (!currentProduct) return;

  const base = currentProduct.prices[selectedSize] || getBasePrice(currentProduct);
  const addonsTotal = selectedAddons.reduce((sum, key) =>
    sum + (addonCatalog[key] ? addonCatalog[key].price : 0), 0);
  const unitPrice = base + addonsTotal;

  // ── EDITING an existing cart item ──
  if (editingCartId !== null) {
    saveEditedItem(unitPrice);
    return;
  }

  // ── ADDING a new cart item ──
  const item = {
    cartId:    ++cartIdCounter,
    productId: currentProduct.id,
    name:      currentProduct.name,
    image:     currentProduct.image,
    category:  currentProduct.category,
    size:      selectedSize,
    sweetness: selectedSweetness,
    ice: (currentProduct.category === "iced" || currentProduct.category === "blended")
         ? selectedIce : null,
    addons:    [...selectedAddons],
    qty:       modalQty,
    unitPrice: unitPrice
  };

  cart.push(item);
  closeModal();
  renderCart();
  openCart();
});


// ============================================================
// SAVE EDITED ITEM
// ============================================================
function saveEditedItem(unitPrice) {
  const idx = cart.findIndex(item => item.cartId === editingCartId);
  if (idx === -1) { closeModal(); return; }

  cart[idx] = {
    ...cart[idx],
    productId: currentProduct.id,
    size:      selectedSize,
    sweetness: selectedSweetness,
    ice: (currentProduct.category === "iced" || currentProduct.category === "blended")
         ? selectedIce : null,
    addons:    [...selectedAddons],
    qty:       modalQty,
    unitPrice: unitPrice
  };

  editingCartId = null;
  renderCart();
  closeModal();
  openCart();
}


// ============================================================
// MODAL EVENT LISTENERS
// ============================================================
document.getElementById("modalOverlay").addEventListener("click", closeModal);
document.getElementById("modalClose").addEventListener("click", closeModal);
