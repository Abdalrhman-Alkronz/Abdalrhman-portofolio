// ===============================
// Shared logic used by index.html and scope.html
// ===============================

const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

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

  const socials = [
    ["LinkedIn", p.linkedin, "in"],
    ["GitHub", p.github, "gh"],
    ["Upwork", p.upwork, "up"],
    ["WhatsApp", p.whatsapp, "wa"]
  ];

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

function flowPlaceholder(project) {
  const nodes = project.tech.slice(0, 4).map((t, i) =>
    `<div class="flow-node"><b>${String(i + 1).padStart(2, "0")}</b><span>${t}</span></div>`
  ).join('<span class="flow-link"></span>');
  return `
    <div class="flow">
      <div class="flow-chain">${nodes}</div>
      <p class="flow-note"><span class="pulse"></span> Demo preview loading</p>
    </div>`;
}

function projectMedia(project) {
  let body;
  if (project.video) {
    body = `<video controls preload="metadata" src="${project.video}" playsinline></video>`;
  } else if (project.image) {
    body = `<img src="${project.image}" alt="${project.title}" loading="lazy">`;
  } else {
    body = flowPlaceholder(project);
  }
  return `
    <div class="project-media">
      <div class="frame-bar"><i></i><i></i><i></i><span>${project.title}</span></div>
      <div class="frame-body">${body}</div>
    </div>`;
}

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

function setupCanvas() {
  const canvas = $("#neural-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let width, height, particles;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const count = Math.min(65, Math.max(25, Math.floor((width * height) / 22000)));
    particles = Array.from({ length: count }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - .5) * .18,
      vy: (Math.random() - .5) * .18,
      r: i % 7 === 0 ? 1.5 : .8
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    const maxDist = Math.min(140, width * .15);

    for (const p of particles) {
      if (!reducedMotion) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -20 || p.x > width + 20) p.vx *= -1;
        if (p.y < -20 || p.y > height + 20) p.vy *= -1;
      }
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(88, 245, 194, .35)";
      ctx.fill();
    }

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i], b = particles[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxDist) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(88, 245, 194, ${0.08 * (1 - dist / maxDist)})`;
          ctx.lineWidth = .7;
          ctx.stroke();
        }
      }
    }
    if (!reducedMotion) requestAnimationFrame(draw);
  }

  window.addEventListener("resize", resize, { passive: true });
  resize();
  draw();
}

function initCommon() {
  setLinks();
  setupMobileMenu();
  setupReveal();
  setupCanvas();
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}
