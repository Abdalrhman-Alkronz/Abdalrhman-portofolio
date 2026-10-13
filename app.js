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

// دالة عرض الوسائط التي كانت مفقودة وتتسبب في إخفاء الصور
function projectMedia(project) {
  if (project.image) {
    return `
      <div class="project-media">
        <div class="frame-bar">
          <i></i><i></i><i>icon</i>
          <span>${project.title}</span>
        </div>
        <div class="frame-body">
          <img src="${project.image}" alt="${project.title}" loading="lazy" />
        </div>
      </div>
    `;
  }
  
  if (project.video) {
    return `
      <div class="project-media">
        <div class="frame-bar">
          <i></i><i></i><i></i>
          <span>${project.title}</span>
        </div>
        <div class="frame-body">
          <video src="${project.video}" autoplay loop muted playsinline></video>
        </div>
      </div>
    `;
  }

  // الشكل الافتراضي لو مفيش صورة أو فيديو
  return `
    <div class="project-media">
      <div class="frame-bar">
        <i></i><i></i><i></i>
        <span>Workflow Preview</span>
      </div>
      <div class="frame-body">
        <div class="flow">
          <div class="flow-chain">
            <div class="flow-node"><b>AI</b>Input</div>
            <div class="flow-link"></div>
            <div class="flow-node"><b>n8n</b>Process</div>
            <div class="flow-link"></div>
            <div class="flow-node"><b>API</b>Output</div>
          </div>
        </div>
      </div>
    </div>
  `;
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

// التأكد من وجود دوال الـ highlights لو كانت متعرفة في ملف مشترك
if (typeof renderHighlights === 'function') renderHighlights();
renderSkills();
renderProjects();
if (typeof initCommon === 'function') initCommon();
