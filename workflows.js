// ===============================
// workflows.html only — renders workflows-data.js
// ===============================

const WF_ICONS = {
  clock:    '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  bolt:     '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
  webhook:  '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18"/>',
  form:     '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>',
  database: '<ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6"/><path d="M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/>',
  ai:       '<path d="M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"/>',
  branch:   '<circle cx="6" cy="5" r="2.5"/><circle cx="6" cy="19" r="2.5"/><circle cx="18" cy="9" r="2.5"/><path d="M6 7.5v9"/><path d="M18 11.5c0 4-6 3-12 5"/>',
  send:     '<path d="m22 2-7 20-4-9-9-4z"/><path d="M22 2 11 13"/>',
  mail:     '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  sheet:    '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18M9 4v16"/>',
  code:     '<path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 5l-4 14"/>',
  wait:     '<path d="M6 3h12M6 21h12M7 3v3c0 3 5 4 5 6s-5 3-5 6v3M17 3v3c0 3-5 4-5 6s5 3 5 6v3"/>',
  check:    '<circle cx="12" cy="12" r="9"/><path d="m8.5 12.5 2.5 2.5 4.5-5"/>',
  loop:     '<path d="M17 2l4 4-4 4"/><path d="M3 11V9a3 3 0 0 1 3-3h15"/><path d="M7 22l-4-4 4-4"/><path d="M21 13v2a3 3 0 0 1-3 3H3"/>',
  user:     '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>',
  filter:   '<path d="M3 5h18l-7 8v6l-4 2v-8z"/>'
};

function wfIcon(name) {
  const path = WF_ICONS[name] || WF_ICONS.bolt;
  return `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${path}</svg>`;
}

const wfLink = '<span class="wf-link"></span>';

function wfNode(n) {
  return `
    <div class="wf-node wf-${n.type || "app"}">
      <span class="wf-icon">${wfIcon(n.icon)}</span>
      <span class="wf-text"><strong>${n.label}</strong>${n.sub ? `<small>${n.sub}</small>` : ""}</span>
    </div>`;
}

function wfBranches(branches) {
  const lanes = branches.map(b => `
    <div class="wf-lane">
      <span class="wf-lane-label wf-tone-${b.tone || "gray"}">${b.label}</span>
      ${wfLink}
      ${b.nodes.map(wfNode).join(wfLink)}
    </div>`).join("");
  return `<div class="wf-branch">${lanes}</div>`;
}

function wfFlow(nodes) {
  const parts = [];
  nodes.forEach((n, i) => {
    parts.push(wfNode(n));
    if (n.branches) {
      parts.push(wfLink, wfBranches(n.branches));
    } else if (i < nodes.length - 1) {
      parts.push(wfLink);
    }
  });
  return parts.join("");
}

function wfList(items) {
  return items.map(item => `<li><span class="check">✓</span>${item}</li>`).join("");
}

function renderWorkflows() {
  const d = workflowsData;

  $("#wfKicker").textContent = d.intro.kicker;
  $("#wfTitle").textContent = d.intro.title;
  $("#wfText").textContent = d.intro.text;

  $("#wfList").innerHTML = d.workflows.map(w => `
    <article class="wf-card reveal" id="${w.id}">
      <header class="wf-head">
        <div class="wf-head-text">
          <h2>${w.title}</h2>
          <p class="wf-summary">${w.summary}</p>
        </div>
        <div class="wf-meta">
          ${w.status ? `<span class="wf-badge">${w.status}</span>` : ""}
          <div class="project-tech">${w.tools.map(t => `<span>${t}</span>`).join("")}</div>
        </div>
      </header>

      <div class="wf-canvas" tabindex="0" aria-label="${w.title} workflow diagram">
        <div class="wf-flow">${wfFlow(w.nodes)}</div>
      </div>
      <p class="wf-hint" hidden>Swipe sideways to see the full flow →</p>

      <div class="wf-info">
        <div>
          <h4>What It Does</h4>
          <ul class="deliverables-list">${wfList(w.does)}</ul>
        </div>
        <div>
          <h4>Design Choices</h4>
          <ul class="deliverables-list">${wfList(w.design)}</ul>
        </div>
      </div>
    </article>
  `).join("");
}

// Shrinks each diagram (down to 70%) so it fits the card; if it still does
// not fit, the canvas scrolls sideways and a small hint appears.
function fitFlows() {
  $$(".wf-canvas").forEach(canvas => {
    const flow = canvas.querySelector(".wf-flow");
    flow.style.zoom = 1;
    flow.style.minWidth = "0";
    const need = flow.offsetWidth;
    flow.style.minWidth = "";
    const cs = getComputedStyle(canvas);
    const avail = canvas.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    const k = need > avail ? Math.max(0.7, avail / need) : 1;
    flow.style.zoom = k;
    const hint = canvas.nextElementSibling;
    if (hint && hint.classList.contains("wf-hint")) hint.hidden = need * k <= avail + 1;
  });
}

renderWorkflows();
initCommon();
fitFlows();
let wfResizeTimer;
window.addEventListener("resize", () => { clearTimeout(wfResizeTimer); wfResizeTimer = setTimeout(fitFlows, 120); }, { passive: true });
window.addEventListener("load", fitFlows);
