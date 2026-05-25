
// ============================================================
// RENDER FEATURED PRODUCTS  (Fan Favorites section)
// ============================================================
function renderFeatured() {
  const grid = document.getElementById("featuredGrid");
  if (!grid) return;

  const featuredProducts = products.filter(p => p.featured);
  grid.innerHTML = "";
  featuredProducts.forEach((product, i) => {
    grid.appendChild(createProductCard(product, i * 0.1));
  });
}


// ============================================================
// RENDER MENU PRODUCTS  (Full menu section)
// ============================================================
function renderMenu(category = "all") {
  const grid = document.getElementById("menuGrid");
  if (!grid) return;

  grid.innerHTML = "";
  const filtered = category === "all"
    ? products
    : products.filter(p => p.category === category);

  filtered.forEach((product, i) => {
    grid.appendChild(createProductCard(product, i * 0.05));
  });
}

// Smoothly scroll to the menu section and optionally close cart sidebar
function scrollToMenu(category = "all") {
  renderMenu(category);
  // close cart sidebar if available
  try { if (typeof closeCartSidebar === 'function') closeCartSidebar(); } catch (e) {}
  const el = document.getElementById("menu");
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}


// ============================================================
//  PRODUCT CARD  
// ============================================================
function createProductCard(product, delay = 0) {
  const card = document.createElement("div");
  card.className = "product-card fade-in";
  card.style.animationDelay = delay + "s";

  const catLabels = {
    hot: "🔥 Hot", iced: "🧊 Iced",
    tea: "🍵 Tea", blended: "🥤 Blended", pastry: "🥐 Pastry"
  };

  const priceVals  = Object.values(product.prices);
  const priceLabel = priceVals.length > 1
    ? `from ${formatPrice(priceVals[0])}`
    : formatPrice(priceVals[0]);

  card.innerHTML = `
    <div class="card-image-wrap">
      <img src="${product.image}" alt="${product.name}" loading="lazy"
        onerror="this.style.opacity='0.4'; this.style.filter='blur(2px)';" />
      <span class="card-category-tag">${catLabels[product.category] || ""}</span>
    </div>
    <div class="card-body">
      <div class="card-name">${product.name}</div>
      <div class="card-price">${priceLabel}</div>
      <button class="card-add-btn">Customize & Add</button>
    </div>
  `;

  card.querySelector(".card-add-btn").addEventListener("click", (e) => {
    e.stopPropagation();
    openProductModal(product);
  });

  return card;
}


// ============================================================
// CATEGORY FILTER BUTTONS
// ============================================================
function initCategoryFilter() {
  const btns = document.querySelectorAll(".filter-btn");
  btns.forEach(btn => {
    btn.addEventListener("click", () => {
      btns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderMenu(btn.dataset.category);
    });
  });
}


// ============================================================
// SCROLL REVEAL  
// ============================================================
function revealOnScroll() {
  const elements = document.querySelectorAll(".product-card, .contact-card, .about-feat");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity    = "1";
        entry.target.style.transform  = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => {
    el.style.opacity    = "0";
    el.style.transform  = "translateY(20px)";
    el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    observer.observe(el);
  });
}


// ============================================================
// NAVBAR SCROLL EFFECT
// ============================================================
window.addEventListener("scroll", () => {
  document.getElementById("navbar")
    .classList.toggle("scrolled", window.scrollY > 20);
});


// ============================================================
// MOBILE HAMBURGER MENU
// ============================================================
document.getElementById("hamburger").addEventListener("click", () => {
  document.getElementById("navLinks").classList.toggle("open");
});

// Close nav links when a link is tapped
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    document.getElementById("navLinks").classList.remove("open");
  });
});


// ============================================================
// APP INIT — runs after the page is fully loaded
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
  renderFeatured();
  renderMenu("all");
  initCategoryFilter();
  renderCart();
  setTimeout(revealOnScroll, 100);
});
