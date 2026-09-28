const $ = (selector, parent = document) => parent.querySelector(selector); const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

function setLinks() {
  const p = portfolioData.personal;
  $$('[data-link="whatsapp"]').forEach(el => el.href = p.whatsapp);   $$
('[data-link="email"]').forEach(el => el.href = `mailto:${p.email}`);

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

function projectActions(project) {
  const actions = [];
  if (project.liveDemo) actions.push(`<a href="${project.liveDemo}" target="_blank" rel="noopener">Live Demo ↗</a>`);
  if (project.github) actions.push(`<a href="${project.github}" target="_blank" rel="noopener">GitHub ↗</a>`);
  if (actions.length) return `<div class="project-actions">${actions.join("")}</div>`;
  return `<span class="project-status"><span class="pulse"></span> Active Case Study</span>`;
}

function renderProjects() {
  $("#projectsList").innerHTML = portfolioData.projects.map(project => `
    <article class="project reveal">
      <div class="project-info">
        <h3>${project.title}</h3>
        <p class="project-tagline">${project.tagline}</p>
        <p class="project-description">${project.description}</p>
        <div class="project-tech">
          ${project.tech.map(t => `<span>${t}</span>`).join("")}
        </div>
        ${projectActions(project)}
      </div>
      ${projectMedia(project)}
    </article>
  `).join("");
}

function setupMobileMenu() {
  const toggle = $("#menuToggle");
  const links = $("#navLinks");
  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  $$("#navLinks a").forEach(a => a.addEventListener("click", () => {     links.classList.remove("open");     toggle.setAttribute("aria-expanded", "false");   })); }  function setupReveal() {   const observer = new IntersectionObserver((entries) => {     entries.forEach(entry => {       if (entry.isIntersecting) {         entry.target.classList.add("visible");         observer.unobserve(entry.target);       }     });   }, { threshold: 0.12 });    $$
(".reveal").forEach(el => observer.observe(el));
}

function setupCanvas() {
  const canvas = $("#neural-canvas");
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

setLinks();
renderHighlights();
renderSkills();
renderProjects();
setupMobileMenu();
setupReveal();
setupCanvas();
$("#year").textContent = new Date().getFullYear();