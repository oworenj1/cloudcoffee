// ============================================================
// CHECKOUT STATE
// ============================================================
let selectedPayment = "GCash";
let promoApplied    = false;

// Valid promo codes: key = code, value = discount %
const VALID_PROMOS = {
  "CLOUD10":  10,
  "FIRSTCUP": 15,
  "CLOUDCUP": 20
};


// ============================================================
// OPEN CHECKOUT
// ============================================================
function openCheckout() {
  renderCheckout();
  document.getElementById("checkoutOverlay").classList.add("active");
  document.getElementById("checkoutModal").classList.add("open");
}


// ============================================================
// CLOSE CHECKOUT
// ============================================================
function closeCheckout() {
  document.getElementById("checkoutOverlay").classList.remove("active");
  document.getElementById("checkoutModal").classList.remove("open");
}


// ============================================================
// RENDER CHECKOUT CONTENT
// ============================================================
function renderCheckout() {
  const checkoutItems = document.getElementById("checkoutItems");
  checkoutItems.innerHTML = "";

  let subtotal = 0;

  // --- Build order summary ---
  cart.forEach(item => {
    const total = item.unitPrice * item.qty;
    subtotal += total;

    const metaParts = [item.size];
    if (item.sweetness && item.sweetness !== "Regular") metaParts.push(item.sweetness);
    if (item.ice) metaParts.push(item.ice);
    if (item.addons.length > 0) {
      const addonLabels = item.addons.map(k => addonCatalog[k]?.label || k).join(", ");
      metaParts.push("+" + addonLabels);
    }

    const div = document.createElement("div");
    div.className = "checkout-item";
    div.innerHTML = `
      <img class="checkout-item-img" src="${item.image}" alt="${item.name}"
        onerror="this.style.opacity='0.3';" />
      <div style="flex:1;">
        <div class="checkout-item-name">${item.qty}x ${item.name}</div>
        <div class="checkout-item-meta">${metaParts.join(" · ")}</div>
      </div>
      <div class="checkout-item-price">${formatPrice(total)}</div>
    `;
    checkoutItems.appendChild(div);
  });

  // --- Reset promo state ---
  promoApplied = false;
  document.getElementById("discountRow").style.display   = "none";
  document.getElementById("checkoutSubtotal").textContent = formatPrice(subtotal);
  document.getElementById("checkoutTotal").textContent    = formatPrice(subtotal);

  // --- Loyalty points ---
  const points = Math.floor(subtotal);
  document.getElementById("loyaltyPoints").textContent =
    `You'll earn ${points.toLocaleString()} CloudPoints from this order!`;

  // --- Payment method highlight ---
  document.querySelectorAll(".payment-card").forEach(card => {
    card.classList.toggle("active", card.dataset.method === selectedPayment);
  });

  // --- Reset inputs ---
  document.getElementById("promoInput").value    = "";
  document.getElementById("promoHint").textContent = "";
  document.getElementById("baristaNote").value   = "";
}


// ============================================================
// PAYMENT METHOD SELECTION
// ============================================================
document.getElementById("paymentGrid").addEventListener("click", (e) => {
  const card = e.target.closest(".payment-card");
  if (!card) return;
  document.querySelectorAll(".payment-card").forEach(c => c.classList.remove("active"));
  card.classList.add("active");
  selectedPayment = card.dataset.method;
});


// ============================================================
// PROMO CODE
// ============================================================
document.getElementById("applyPromoBtn").addEventListener("click", () => {
  const hint = document.getElementById("promoHint");

  if (promoApplied) {
    hint.textContent  = "✅ Promo already applied!";
    hint.style.color  = "var(--accent)";
    return;
  }

  const code = document.getElementById("promoInput").value.trim().toUpperCase();

  if (VALID_PROMOS[code]) {
    const discountPct = VALID_PROMOS[code];
    const subtotal    = cart.reduce((sum, i) => sum + i.unitPrice * i.qty, 0);
    const discount    = Math.floor(subtotal * discountPct / 100);
    const finalTotal  = subtotal - discount;

    document.getElementById("checkoutDiscount").textContent = `-${formatPrice(discount)} (${discountPct}% off)`;
    document.getElementById("checkoutTotal").textContent    = formatPrice(finalTotal);
    document.getElementById("discountRow").style.display    = "flex";

    hint.textContent = `🎉 Promo "${code}" applied! You saved ${formatPrice(discount)}.`;
    hint.style.color = "#27ae60";
    promoApplied = true;

  } else if (code === "") {
    hint.textContent = "Please enter a promo code.";
    hint.style.color = "#e74c3c";
  } else {
    hint.textContent = `❌ Code "${code}" is invalid. Try: CLOUD10, FIRSTCUP, or CLOUDCUP`;
    hint.style.color = "#e74c3c";
  }
});


// ============================================================
// CONFIRM ORDER
// ============================================================
document.getElementById("confirmOrderBtn").addEventListener("click", () => {
  closeCheckout();
  closeCartSidebar();
  showSuccess();
});


// ============================================================
// SUCCESS POPUP
// ============================================================
function showSuccess() {
  document.getElementById("orderNumber").textContent = "Order #" + generateOrderNumber();
  document.getElementById("successOverlay").classList.add("active");
  document.getElementById("successPopup").classList.add("open");
  document.body.style.overflow = "hidden";

  // Clear the cart after placing order
  cart = [];
  renderCart();
}

function closeSuccess() {
  document.getElementById("successOverlay").classList.remove("active");
  document.getElementById("successPopup").classList.remove("open");
  document.body.style.overflow = "";
}


// ============================================================
// SUCCESS EVENT LISTENERS
// ============================================================
document.getElementById("placeOrderBtn").addEventListener("click", () => {
  if (cart.length === 0) return;
  openCheckout();
});

document.getElementById("checkoutClose").addEventListener("click", closeCheckout);
document.getElementById("checkoutOverlay").addEventListener("click", closeCheckout);

document.getElementById("successClose").addEventListener("click", closeSuccess);
document.getElementById("successOverlay").addEventListener("click", closeSuccess);
