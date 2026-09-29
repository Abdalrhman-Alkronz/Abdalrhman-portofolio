// ===============================
// index.html only — home page rendering
// ===============================

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
        <a class="scope-trigger" href="scope.html?project=${project.id}">View Full Scope <span>↗</span></a>
      </div>
      ${projectMedia(project)}
    </article>
  `).join("");
}

renderHighlights();
renderSkills();
renderProjects();
initCommon();
