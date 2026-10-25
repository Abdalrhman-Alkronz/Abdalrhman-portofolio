// ===============================
// Shared logic used by every page (index, scope, workflows)
// ===============================

const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

function isPlaceholderUrl(url) {
  return !url || /your-profile|your-username|your-id/i.test(url);
}

function setLinks() {
  const p = portfolioData.personal;

  $$('[data-link="whatsapp"]').forEach(el => {
    el.href = p.whatsapp;
    el.target = "_blank";
    el.rel = "noopener";
  });

  // Opens Gmail's compose window directly in a new tab, so it always works
  // even when the visitor has no local mail client configured.
  const gmailCompose = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(p.email)}&su=${encodeURIComponent("Project inquiry from your portfolio")}`;
  $$('[data-link="email"]').forEach(el => {
    el.href = gmailCompose;
    el.target = "_blank";
    el.rel = "noopener";
  });

  // Social icons: links that are still placeholders (your-username...) are
  // skipped automatically, so the footer never shows a dead link.
  const socials = [
    ["LinkedIn", p.linkedin, "in"],
    ["GitHub", p.github, "gh"],
    ["Upwork", p.upwork, "up"],
    ["WhatsApp", p.whatsapp, "wa"]
  ].filter(([, href]) => !isPlaceholderUrl(href));

  const socialsEl = $("#socials");
  if (socialsEl) {
    socialsEl.innerHTML = socials.map(([label, href, icon]) =>
      `<a href="${href}" target="_blank" rel="noopener" aria-label="${label}">${icon}</a>`
    ).join("");
  }

  if (p.avatar) {
    const heroAvatar = $("#avatar");
    if (heroAvatar) heroAvatar.innerHTML = `<img src="${p.avatar}" alt="${p.name}">`;

    const brandAvatar = $("#brandAvatar");
    if (brandAvatar) brandAvatar.innerHTML = `<img src="${p.avatar}" alt="${p.name}">`;
  }
}

function renderHighlights() {
  const el = $("#heroTech");
  if (el) el.innerHTML = portfolioData.highlights.map(item => `<span>${item}</span>`).join("");
}

// ---------- Project media (image / video / clean placeholder) ----------

function flowPlaceholder(project) {
  const nodes = project.tech.slice(0, 4).map(t => {
    const label = t.replace(/\s*\(.*\)/, "");
    return `<div class="flow-node"><b>${label.charAt(0).toUpperCase()}</b><span>${label}</span></div>`;
  }).join('<span class="flow-link"></span>');
  return `
    <div class="flow">
      <div class="flow-chain">${nodes}</div>
      <p class="flow-note"><span class="pulse"></span> Preview image coming soon</p>
    </div>`;
}

// Called by the <img onerror> below: if the image file is missing,
// swap in the placeholder instead of showing a broken-image icon.
function imageFallback(img) {
  const project = portfolioData.projects.find(p => p.id === img.dataset.pid);
  const body = img.closest(".frame-body");
  if (project && body) body.innerHTML = flowPlaceholder(project);
}

function projectMedia(project) {
  let body;
  if (project.video) {
    body = `<video controls preload="metadata" src="${project.video}" playsinline></video>`;
  } else if (project.image) {
    body = `<img src="${project.image}" alt="${project.title}" loading="lazy" data-pid="${project.id}" onerror="imageFallback(this)">`;
  } else {
    body = flowPlaceholder(project);
  }
  return `
    <div class="project-media">
      <div class="frame-bar"><i></i><i></i><i></i><span>${project.title}</span></div>
      <div class="frame-body">${body}</div>
    </div>`;
}

// ---------- Interactions ----------

function setupMobileMenu() {
  const toggle = $("#menuToggle");
  const links = $("#navLinks");
  if (!toggle || !links) return;
  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  $$("#navLinks a").forEach(a => a.addEventListener("click", () => {
    links.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }));
}

function setupReveal() {
  const targets = $$(".reveal");
  if (!targets.length) return;
  if (!("IntersectionObserver" in window)) {
    targets.forEach(el => el.classList.add("visible"));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  targets.forEach(el => observer.observe(el));
}

// Light-blue moving grid background (same on every page).
function setupCanvas() {
  const canvas = $("#neural-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let offset = 0;

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "rgba(186, 230, 253, 0.45)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let x = 0; x < canvas.width; x += 60) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
    }
    for (let y = offset; y < canvas.height; y += 40) {
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
    }
    ctx.stroke();
  }

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    draw();
  }

  function loop() {
    offset = (offset + 0.6) % 40;
    draw();
    requestAnimationFrame(loop);
  }

  window.addEventListener("resize", resize, { passive: true });
  resize();
  if (!reducedMotion) loop();
}

function initCommon() {
  setLinks();
  setupMobileMenu();
  setupReveal();
  setupCanvas();
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}
