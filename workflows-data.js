// ============================================================
// workflows-data.js — content for workflows.html
//
// HOW TO ADD A NEW WORKFLOW
// Copy one object inside `workflows: [ ... ]`, paste it after the
// last one (don't forget the comma between objects), and edit it.
//
// Node fields:
//   type : "trigger" | "ai" | "logic" | "app" | "output"   (sets the color)
//   icon : "clock" | "bolt" | "webhook" | "form" | "database" | "ai" |
//          "branch" | "send" | "mail" | "sheet" | "code" | "wait" |
//          "check" | "loop" | "user" | "filter"
//   label: node title        sub: small line under the title
//
// A node that has `branches: [...]` splits the flow into lanes.
// Lane tone: "green" | "amber" | "red" | "blue" | "gray"
// A branching node should be the LAST step of the flow.
//
// status: text of the small badge. Change it to "Production" once a
// workflow is real, or set it to "" to hide the badge.
// ============================================================

const workflowsData = {
  intro: {
    kicker: "WORKFLOWS",
    title: "Automation blueprints, node by node.",
    text: "A look at how I structure n8n workflows: the trigger, the logic, the AI step and the output. These are sample blueprints. Real workflows are added here as they ship."
  },

  workflows: [
    // ------------------------------------------------------------
    // 1) Appointment reminders
    // ------------------------------------------------------------
    {
      id: "appointment-reminders",
      title: "Appointment Reminder & No-Show Recovery",
      summary: "Every morning the workflow finds tomorrow’s appointments in Notion, asks each patient to confirm on Telegram, and keeps the schedule clean without anyone chasing replies by hand.",
      status: "Sample blueprint",
      tools: ["n8n", "Notion API", "Telegram", "Schedule Trigger"],
      nodes: [
        { type: "trigger", icon: "clock", label: "Schedule Trigger", sub: "Every day · 8:00" },
        { type: "app", icon: "database", label: "Notion · Get Appointments", sub: "Tomorrow’s bookings" },
        { type: "logic", icon: "loop", label: "Loop Over Patients", sub: "One at a time" },
        { type: "app", icon: "send", label: "Telegram · Send & Wait", sub: "Confirm / Cancel buttons" },
        {
          type: "logic", icon: "branch", label: "Switch", sub: "Patient reply",
          branches: [
            { label: "Confirmed", tone: "green", nodes: [
              { type: "app", icon: "database", label: "Notion · Mark Confirmed", sub: "Status updated" }
            ]},
            { label: "Cancelled", tone: "amber", nodes: [
              { type: "app", icon: "database", label: "Notion · Free the Slot", sub: "Slot reopened" },
              { type: "output", icon: "send", label: "Telegram · Offer Next Slot", sub: "To the waiting list" }
            ]},
            { label: "No reply", tone: "red", nodes: [
              { type: "output", icon: "user", label: "Telegram · Alert Reception", sub: "Call the patient" }
            ]}
          ]
        }
      ],
      does: [
        "Finds tomorrow’s appointments in Notion and messages each patient on Telegram.",
        "Patients confirm or cancel with one tap.",
        "A cancelled slot is reopened and offered to the next person on the list.",
        "Reception is alerted only when a patient does not reply."
      ],
      design: [
        "The loop handles one patient at a time, so a single failed message never blocks the rest.",
        "Notion stays the single source of truth for every appointment status.",
        "Staff handle exceptions only. Nobody chases replies manually."
      ]
    },

    // ------------------------------------------------------------
    // 2) Lead qualifier
    // ------------------------------------------------------------
    {
      id: "lead-qualifier",
      title: "AI Lead Qualifier to CRM",
      summary: "A website contact form feeds an AI step that reads the message, scores the lead as hot, warm or cold, and routes it to the right place: an instant alert, a CRM card, or a nurture list.",
      status: "Sample blueprint",
      tools: ["n8n", "LLM via OpenRouter", "Notion API", "Telegram", "Gmail", "Google Sheets"],
      nodes: [
        { type: "trigger", icon: "form", label: "Form Trigger", sub: "Website contact form" },
        { type: "ai", icon: "ai", label: "AI Agent · Qualify", sub: "Intent · budget · urgency" },
        { type: "logic", icon: "code", label: "Code · Validate JSON", sub: "Reject malformed output" },
        {
          type: "logic", icon: "branch", label: "Switch", sub: "Lead temperature",
          branches: [
            { label: "Hot", tone: "red", nodes: [
              { type: "output", icon: "send", label: "Telegram · Alert Owner", sub: "Immediately" },
              { type: "app", icon: "database", label: "Notion · Create CRM Card", sub: "Priority: high" }
            ]},
            { label: "Warm", tone: "amber", nodes: [
              { type: "app", icon: "database", label: "Notion · Create CRM Card", sub: "Priority: normal" },
              { type: "output", icon: "mail", label: "Gmail · Auto-reply", sub: "Next steps" }
            ]},
            { label: "Cold", tone: "blue", nodes: [
              { type: "app", icon: "sheet", label: "Sheets · Nurture List", sub: "Follow up later" }
            ]}
          ]
        }
      ],
      does: [
        "Reads the visitor’s message and extracts intent, budget and urgency.",
        "The AI returns strict JSON, so routing never depends on free text.",
        "Hot leads reach the owner on Telegram right away.",
        "Every lead ends up in the right place without manual sorting."
      ],
      design: [
        "A validation step rejects malformed AI output before it touches the CRM.",
        "All routing rules live in one Switch node, so they are easy to change.",
        "The same pattern works for clinics, agencies and online stores."
      ]
    }
  ]
};
