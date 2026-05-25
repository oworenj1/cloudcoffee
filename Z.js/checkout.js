// ============================================================
// CHECKOUT STATE
// ============================================================
let selectedPayment = "GCash";
let promoApplied = false;
let activePromo = {
  code: "",
  pct: 0,
  discount: 0
};

const VALID_PROMOS = {
  "CLOUD10":  10,
  "FIRSTCUP": 15,
  "CLOUDCUP": 20
};

function resetCheckoutForm() {
  document.getElementById("promoInput").value = activePromo.code || "";
  document.getElementById("promoHint").textContent = "";
  document.getElementById("baristaNote").value = "";
}

function renderCheckout() {
  const checkoutItems = document.getElementById("checkoutItems");
  checkoutItems.innerHTML = "";

  let subtotal = 0;
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

  const promoDiscount = activePromo.discount || 0;
  const total = Math.max(0, subtotal - promoDiscount);

  document.getElementById("checkoutSubtotal").textContent = formatPrice(subtotal);
  document.getElementById("checkoutTotal").textContent = formatPrice(total);

  if (promoDiscount > 0) {
    document.getElementById("discountRow").style.display = "flex";
    document.getElementById("checkoutDiscount").textContent = `-${formatPrice(promoDiscount)} (${activePromo.pct}% off)`;
  } else {
    document.getElementById("discountRow").style.display = "none";
  }

  document.querySelectorAll(".payment-card").forEach(card => {
    card.classList.toggle("active", card.dataset.method === selectedPayment);
  });
}

function selectPayment(method) {
  selectedPayment = method;
  renderCheckout();
}

function openCheckout() {
  resetCheckoutForm();
  renderCheckout();
  document.getElementById("checkoutOverlay").classList.add("active");
  document.getElementById("checkoutModal").classList.add("open");
}

function closeCheckout() {
  document.getElementById("checkoutOverlay").classList.remove("active");
  document.getElementById("checkoutModal").classList.remove("open");
}

function applyPromo(code) {
  const hint = document.getElementById("promoHint");
  if (!code) {
    hint.textContent = "Please enter a promo code.";
    hint.style.color = "#e74c3c";
    return;
  }
  const normalized = code.trim().toUpperCase();
  if (!VALID_PROMOS[normalized]) {
    hint.textContent = `❌ Code "${normalized}" is invalid. Try: CLOUD10, FIRSTCUP, or CLOUDCUP`;
    hint.style.color = "#e74c3c";
    return;
  }

  activePromo.code = normalized;
  activePromo.pct = VALID_PROMOS[normalized];
  activePromo.discount = Math.floor(cart.reduce((sum, i) => sum + i.unitPrice * i.qty, 0) * activePromo.pct / 100);
  promoApplied = true;

  document.getElementById("promoHint").textContent = `🎉 Promo "${normalized}" applied! You saved ${formatPrice(activePromo.discount)}.`;
  document.getElementById("promoHint").style.color = "#27ae60";
  renderCheckout();
}

document.getElementById("applyPromoBtn").addEventListener("click", () => {
  const code = document.getElementById("promoInput").value;
  applyPromo(code);
});

document.querySelectorAll(".payment-card").forEach(card => {
  card.addEventListener("click", () => selectPayment(card.dataset.method));
});

document.getElementById("confirmOrderBtn").addEventListener("click", () => {
  if (cart.length === 0) return;
  closeCheckout();
  showSuccess();
});

function showSuccess() {
  document.getElementById("orderNumber").textContent = "Order #" + generateOrderNumber();
  document.getElementById("successOverlay").classList.add("active");
  document.getElementById("successPopup").classList.add("open");
  document.body.style.overflow = "hidden";

  activePromo = { code: "", pct: 0, discount: 0 };
  cart = [];
  renderCart();
}

function closeSuccess() {
  document.getElementById("successOverlay").classList.remove("active");
  document.getElementById("successPopup").classList.remove("open");
  document.body.style.overflow = "";
}

document.getElementById("placeOrderBtn").addEventListener("click", () => {
  if (cart.length === 0) return;
  openCheckout();
});

document.getElementById("checkoutClose").addEventListener("click", closeCheckout);
document.getElementById("checkoutOverlay").addEventListener("click", closeCheckout);

document.getElementById("successClose").addEventListener("click", closeSuccess);
document.getElementById("successOverlay").addEventListener("click", closeSuccess);
