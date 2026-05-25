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

function saveOrderToHistory() {
  const subtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.qty, 0);
  const promoDiscount = activePromo.discount || 0;
  const total = Math.max(0, subtotal - promoDiscount);

  const order = {
    id: generateOrderNumber(),
    date: new Date().toLocaleString(),
    items: cart.map(item => ({
      name: item.name,
      qty: item.qty,
      unitPrice: item.unitPrice,
      size: item.size,
      sweetness: item.sweetness,
      ice: item.ice,
      addons: item.addons
    })),
    subtotal: subtotal,
    promoCode: activePromo.code || "None",
    promoDiscount: promoDiscount,
    total: total,
    paymentMethod: selectedPayment,
    baristaNote: document.getElementById("baristaNote").value || "None"
  };

  let orders = [];
  const stored = localStorage.getItem("orderHistory");
  if (stored) {
    try {
      orders = JSON.parse(stored);
    } catch (e) {
      orders = [];
    }
  }

  orders.unshift(order);
  localStorage.setItem("orderHistory", JSON.stringify(orders));
}

function showSuccess() {
  const orderNum = generateOrderNumber();
  document.getElementById("orderNumber").textContent = "Order #" + orderNum;
  document.getElementById("successOverlay").classList.add("active");
  document.getElementById("successPopup").classList.add("open");
  document.body.style.overflow = "hidden";

  saveOrderToHistory();

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

function openOrderHistory() {
  renderOrderHistory();
  document.getElementById("historyOverlay").classList.add("active");
  document.getElementById("historyModal").classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeOrderHistory() {
  document.getElementById("historyOverlay").classList.remove("active");
  document.getElementById("historyModal").classList.remove("open");
  document.body.style.overflow = "";
}

function renderOrderHistory() {
  const content = document.getElementById("historyContent");
  const empty = document.getElementById("historyEmpty");

  let orders = [];
  const stored = localStorage.getItem("orderHistory");
  if (stored) {
    try {
      orders = JSON.parse(stored);
    } catch (e) {
      orders = [];
    }
  }

  if (orders.length === 0) {
    content.innerHTML = `
      <div class="history-empty">
        <span>☁️</span>
        <p>No orders yet.</p>
        <small>Your orders will appear here!</small>
      </div>
    `;
    return;
  }

  content.innerHTML = orders.map((order, idx) => {
    const itemsList = order.items.map(item => {
      const meta = [item.size];
      if (item.sweetness && item.sweetness !== "Regular") meta.push(item.sweetness);
      if (item.ice) meta.push(item.ice);
      if (item.addons && item.addons.length > 0) meta.push("+" + item.addons.join(", "));
      return `<div class="history-item-line">${item.qty}x ${item.name} - ${meta.join(" · ")}</div>`;
    }).join("");

    return `
      <div class="history-order-card">
        <div class="history-order-header">
          <div>
            <strong>Order #${order.id}</strong>
            <small>${order.date}</small>
          </div>
          <div class="history-order-total">${formatPrice(order.total)}</div>
        </div>
        <div class="history-order-items">${itemsList}</div>
        <div class="history-order-meta">
          <span>💳 ${order.paymentMethod}</span>
          ${order.promoDiscount > 0 ? `<span>🎉 ${order.promoCode} (-${formatPrice(order.promoDiscount)})</span>` : ""}
        </div>
      </div>
    `;
  }).join("");
}

document.getElementById("historyBtn").addEventListener("click", openOrderHistory);
document.getElementById("historyClose").addEventListener("click", closeOrderHistory);
document.getElementById("historyOverlay").addEventListener("click", closeOrderHistory);
