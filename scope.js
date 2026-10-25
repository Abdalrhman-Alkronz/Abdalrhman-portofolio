// ===============================
// scope.html only — single project detail page
// Every section is optional: if a project has no data for it,
// the section simply doesn't appear.
// ===============================

function getRequestedProject() {
  const id = new URLSearchParams(location.search).get("project");
  return portfolioData.projects.find(p => p.id === id) || portfolioData.projects[0];
}

function scopeBlock(title, inner) {
  return inner ? `<div class="scope-block"><h4>${title}</h4>${inner}</div>` : "";
}

function renderScopePage() {
  const project = getRequestedProject();
  const s = project.scope || {};
  const p = portfolioData.personal;

  document.title = `${project.title} — ${p.name}`;
  $("#scopeTitle").textContent = project.title;
  $("#scopeTagline").textContent = project.tagline;

  $("#scopeMedia").innerHTML = projectMedia(project)
    .replace('<div class="project-media">', '<div class="project-media scope-project-media">');

  const steps = (s.steps || []).map((step, i) => {
    const t = typeof step === "string" ? { text: step } : step;
    return `
      <div class="approach-step">
        <span class="approach-index">${String(i + 1).padStart(2, "0")}</span>
        <p>${t.title ? `<strong>${t.title}.</strong> ` : ""}${t.text}</p>
      </div>`;
  }).join("");

  const highlights = (s.highlights || []).map(item =>
    `<div class="ideal-card"><span class="ideal-dot"></span>${item}</div>`
  ).join("");

  $("#scopeSections").innerHTML = [
    scopeBlock("Overview", `<p>${project.description}</p>`),
    scopeBlock("The Problem", s.problem ? `<p>${s.problem}</p>` : ""),
    scopeBlock("How It Works",
      (s.intro ? `<p class="scope-intro">${s.intro}</p>` : "") +
      (steps ? `<div class="approach-list">${steps}</div>` : "")),
    scopeBlock("Key Highlights", highlights ? `<div class="ideal-grid">${highlights}</div>` : ""),
    s.note ? `<div class="scope-note"><strong>Note</strong><p>${s.note}</p></div>` : "",
    scopeBlock("Tech Stack", `<div class="project-tech">${project.tech.map(t => `<span>${t}</span>`).join("")}</div>`)
  ].join("");

  // Side card
  $("#scopeSnapshot").innerHTML = (s.snapshot || []).map(([label, value]) =>
    `<div class="summary-row"><span>${label}</span><strong>${value}</strong></div>`
  ).join("");

  const delivers = (s.delivers || []).map(item =>
    `<li><span class="check">✓</span>${item}</li>`
  ).join("");
  $("#scopeDelivers").innerHTML = delivers
    ? `<h4>What It Delivers</h4><ul class="deliverables-list">${delivers}</ul>`
    : "";

  const actions = [];
  if (project.liveDemo) actions.push(`<a class="button button-primary" href="${project.liveDemo}" target="_blank" rel="noopener">Live Demo ↗</a>`);
  if (project.github) actions.push(`<a class="button button-secondary" href="${project.github}" target="_blank" rel="noopener">GitHub ↗</a>`);
  actions.push(`<a class="button ${actions.length ? "button-secondary" : "button-primary"}" data-link="whatsapp">Discuss This Build ↗</a>`);
  $("#scopeActions").innerHTML = actions.join("");

  const list = portfolioData.projects;
  const idx = list.findIndex(item => item.id === project.id);
  const next = list[(idx + 1) % list.length];
  $("#scopeNext").innerHTML = `
    <span>Next project</span>
    <a href="scope.html?project=${next.id}">${next.title} <span>↗</span></a>
  `;
}

renderScopePage();
initCommon();
