const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

function setLinks() {
  const p = portfolioData.personal;
  $$('[data-link="whatsapp"]').forEach(el => el.href = p.whatsapp);
  $$('[data-link="email"]').forEach(el => el.href = `mailto:${p.email}`);

  const socials = [
    ["LinkedIn", p.linkedin, "in"],
    ["GitHub", p.github, "gh"],
    ["Upwork", p.upwork, "up"],
    ["WhatsApp", p.whatsapp, "wa"]
  ];

  $("#socials").innerHTML = socials.map(([label, href, icon]) =>
    `<a href="${href}" target="_blank" rel="noopener" aria-label="${label}">${icon}</a>`
  ).join("");

  if (p.avatar) {
    $("#avatar").innerHTML = `<img src="${p.avatar}" alt="${p.name}">`;
  }
}

function renderHighlights() {
  $("#heroTech").innerHTML = portfolioData.highlights
    .map(item => `<span>${item}</span>`)
    .join("");
}

function renderSkills() {
  $("#skillsGrid").innerHTML = portfolioData.skills.map(skill => `
    <article class="skill-card reveal">
      <div class="skill-icon">${skill.icon}</div>
      <h3>${skill.title}</h3>
      <div class="skill-tags">
        ${skill.items.map(item => `<span>${item}</span>`).join("")}
      </div>
    </article>
  `).join("");
}

function flowPlaceholder(project) {
  const nodes = project.tech.slice(0, 4).map(t =>
    `<div class="flow-node"><b></b><span>${t}</span></div>`
  ).join('<span class="flow-link"></span>');
  return `
    <div class="flow">
      <div class="flow-chain">${nodes}</div>
      <p class="flow-note"><span class="pulse"></span> Demo video coming soon</p>
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

function projectActions(project) {
  const actions = [];
  if (project.liveDemo) actions.push(`<a href="${project.liveDemo}" target="_blank" rel="noopener">Live Demo ↗</a>`);
  if (project.github) actions.push(`<a href="${project.github}" target="_blank" rel="noopener">GitHub ↗</a>`);
  if (actions.length) return `<div class="project-actions">${actions.join("")}</div>`;
  return `<span class="project-status"><span class="pulse"></span> Case study in progress</span>`;
}

function scopeTrigger(index) {
  return `<button type="button" class="scope-trigger" data-scope-index="${index}">View Full Scope <span>↗</span></button>`;
}

function renderProjects() {
  $("#projectsList").innerHTML = portfolioData.projects.map((project, i) => `
    <article class="project reveal">
      <div class="project-info">
        <h3>${project.title}</h3>
        <p class="project-tagline">${project.tagline}</p>
        <p class="project-description">${project.description}</p>
        <div class="project-tech">
          ${project.tech.map(t => `<span>${t}</span>`).join("")}
        </div>
        ${projectActions(project)}
        ${scopeTrigger(i)}
      </div>
      ${projectMedia(project)}
    </article>
  `).join("");
}

function ensureScopeModal() {
  if ($("#scopeModal")) return $("#scopeModal");
  const modal = document.createElement("div");
  modal.id = "scopeModal";
  modal.className = "scope-modal";
  modal.innerHTML = `
    <div class="scope-backdrop" data-close></div>
    <div class="scope-panel" role="dialog" aria-modal="true" aria-labelledby="scopeTitle">
      <button type="button" class="scope-close" data-close aria-label="Close">✕</button>
      <div class="scope-content"></div>
    </div>`;
  document.body.appendChild(modal);
  modal.addEventListener("click", (e) => {
    if (e.target.closest("[data-close]")) closeScope();
  });
  return modal;
}

function openScope(project) {
  const modal = ensureScopeModal();
  const s = project.scope || {};
  $(".scope-content", modal).innerHTML = `
    <span class="scope-kicker">Project Scope</span>
    <h3 id="scopeTitle">${project.title}</h3>
    ${s.overview ? `<p class="scope-overview">${s.overview}</p>` : ""}
    ${s.problem ? `<div class="scope-block"><h4>The Problem</h4><p>${s.problem}</p></div>` : ""}
    ${s.approach && s.approach.length ? `<div class="scope-block"><h4>Approach</h4><ol>${s.approach.map(a => `<li>${a}</li>`).join("")}</ol></div>` : ""}
    ${s.outcome ? `<div class="scope-block"><h4>Outcome</h4><p>${s.outcome}</p></div>` : ""}
    <div class="scope-block"><h4>Tech Stack</h4><div class="scope-tech">${project.tech.map(t => `<span>${t}</span>`).join("")}</div></div>
    ${s.timeline ? `<div class="scope-timeline"><span class="pulse"></span> ${s.timeline}</div>` : ""}
  `;
  document.body.classList.add("scope-open");
  requestAnimationFrame(() => modal.classList.add("open"));
}

function closeScope() {
  const modal = $("#scopeModal");
  if (!modal) return;
  modal.classList.remove("open");
  document.body.classList.remove("scope-open");
}

function setupScopeTriggers() {
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".scope-trigger");
    if (btn) openScope(portfolioData.projects[Number(btn.dataset.scopeIndex)]);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeScope();
  });
}

function setupMobileMenu() {
  const toggle = $("#menuToggle");
  const links = $("#navLinks");
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
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  $$(".reveal").forEach(el => observer.observe(el));
}

function setupCanvas() {
  const canvas = $("#neural-canvas");
  const ctx = canvas.getContext("2d");
  let width, height, particles, raf;
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

    const count = Math.min(75, Math.max(28, Math.floor((width * height) / 19000)));
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
    const maxDist = Math.min(145, width * .16);

    for (const p of particles) {
      if (!reducedMotion) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -20 || p.x > width + 20) p.vx *= -1;
        if (p.y < -20 || p.y > height + 20) p.vy *= -1;
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(93, 255, 204, .35)";
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
          ctx.strokeStyle = `rgba(63, 214, 184, ${0.09 * (1 - dist / maxDist)})`;
          ctx.lineWidth = .7;
          ctx.stroke();
        }
      }
    }

    if (!reducedMotion) raf = requestAnimationFrame(draw);
  }

  window.addEventListener("resize", resize, { passive: true });
  resize();
  draw();
}

setLinks();
renderHighlights();
renderSkills();
renderProjects();
setupScopeTriggers();
setupMobileMenu();
setupReveal();
setupCanvas();
$("#year").textContent = new Date().getFullYear();
