// ===============================
// scope.html only — single project detail page
// ===============================

function getRequestedProject() {
  const id = new URLSearchParams(location.search).get("project");
  return portfolioData.projects.find(p => p.id === id) || portfolioData.projects[0];
}

function renderScopePage() {
  const project = getRequestedProject();
  const s = project.scope || {};
  const p = portfolioData.personal;

  document.title = `${project.title} — Scope — ${p.name}`;

  $("#scopeTitle").textContent = project.title;
  $("#scopeTagline").textContent = project.tagline;
  $("#scopeDescription").textContent = project.description;

  $("#scopeTech").innerHTML = project.tech.map(t => `<span>${t}</span>`).join("");

  $("#scopeIdealFor").innerHTML = (s.idealFor || []).map(item => `
    <div class="ideal-card"><span class="ideal-dot"></span>${item}</div>
  `).join("");

  $("#scopeDeliverables").innerHTML = (s.deliverables || []).map(item => `
    <li><span class="check">✓</span>${item}</li>
  `).join("");

  $("#scopeApproach").innerHTML = (s.approach || []).map((step, i) => `
    <div class="approach-step">
      <span class="approach-index">${String(i + 1).padStart(2, "0")}</span>
      <p>${step}</p>
    </div>
  `).join("");

  $("#scopeTimeline").textContent = s.timeline || "Timeline scoped per project";
  $("#scopeFormat").textContent = s.format || "Fully documented handover";

  $("#scopeMedia").innerHTML = projectMedia(project).replace('<div class="project-media">', '<div class="project-media scope-project-media">');

  const actions = [];
  if (project.liveDemo) actions.push(`<a class="button button-primary" href="${project.liveDemo}" target="_blank" rel="noopener">Live Demo ↗</a>`);
  if (project.github) actions.push(`<a class="button button-secondary" href="${project.github}" target="_blank" rel="noopener">GitHub ↗</a>`);
  actions.push(`<a class="button button-secondary" data-link="whatsapp">Discuss This Build ↗</a>`);
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
