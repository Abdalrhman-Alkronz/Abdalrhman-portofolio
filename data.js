// ============================================================
// data.js — all editable portfolio content
// Project images: put the PNG next to index.html (same folder)
// and write only its file name, e.g.  image: "task-manager.png"
// If the file is missing, the site shows a clean workflow preview
// instead of a broken image, and switches to the image as soon
// as you upload it.
// ============================================================

const portfolioData = {
  personal: {
    name: "Abdalrhman Mohammed",
    role: "Agentic AI & Automation Developer",
    email: "Alkrnz279@gmail.com",
    whatsapp: "https://wa.me/201040670522?text=Hello%20Abdalrhman,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project.",
    linkedin: "https://linkedin.com/in/your-profile",
    github: "https://github.com/your-username",
    upwork: "https://upwork.com/freelancers/~your-id",
    avatar: "Semi_formal_01.jpeg"
  },

  highlights: [
    "Agentic AI", "AI Agents", "Workflow Automation",
    "AI Chatbots", "Python", "n8n", "APIs", "RAG"
  ],

  skills: [
    {
      icon: "🤖",
      title: "Agents & AI Frameworks",
      items: ["LangChain", "CrewAI", "OpenAI APIs", "Vector DBs", "RAG Systems"]
    },
    {
      icon: "⚡",
      title: "Workflow & Automation",
      items: ["n8n Workflows", "Webhooks", "REST APIs", "Automation Pipelines"]
    },
    {
      icon: "🛠️",
      title: "Core Engineering",
      items: ["Python", "JavaScript", "Google Workspace APIs", "PDF & Data Extraction"]
    }
  ],

  projects: [
    // ------------------------------------------------------------
    // 1) HR Candidate Screening
    // ------------------------------------------------------------
    {
      id: "hr-screening",
      title: "AI HR Candidate Screening System",
      tagline: "Autonomous resume parsing and applicant scoring pipeline",
      description: "An automated recruitment workflow that ingests CVs, parses structured candidate profiles, compares skills against strict job descriptions, and organizes qualified applicants directly into Google Sheets for rapid HR screening.",
      tech: ["n8n", "AI Processing", "Google Sheets", "PDF Extraction"],
      video: "",
      image: "cv-screening.png",
      liveDemo: "",
      github: "",
      scope: {
        problem: "Screening a stack of CVs by hand is slow and repetitive, and the result changes from one reviewer to the next.",
        steps: [
          { title: "Ingest", text: "Incoming CVs enter the workflow and are read automatically through PDF extraction." },
          { title: "Structure", text: "AI processing turns each CV into a clean, structured candidate profile." },
          { title: "Compare", text: "Each profile is compared against the strict requirements of the job description." },
          { title: "Organize", text: "Qualified applicants are organized in Google Sheets, ready for rapid HR screening." }
        ],
        highlights: [
          "Structured candidate profiles instead of raw files",
          "Skills compared against strict job-description criteria",
          "Results land directly in Google Sheets"
        ],
        delivers: [
          "Parsed, structured candidate profiles",
          "Qualified applicants organized in Google Sheets",
          "A faster, more consistent first screening"
        ],
        snapshot: [
          ["Built with", "n8n · Google Sheets"],
          ["Type", "Recruitment automation"]
        ]
      }
    },

    // ------------------------------------------------------------
    // 2) Clinical Triage & Notion
    // ------------------------------------------------------------
    {
      id: "clinical-triage-system",
      title: "AI Clinical Triage & Notion System",
      tagline: "Intelligent healthcare request routing and clinical urgency sorting",
      description: "An automated clinical intake and triage workflow built with n8n and Notion. It evaluates patient complaints using structured AI and clinical red-flag rules, instantly routes emergencies to medical staff via Telegram, and organizes patient bookings in relational Notion databases.",
      tech: ["n8n", "Notion API", "LLM Triage", "Telegram Bot", "Structured Outputs"],
      video: "",
      image: "triage-system.png",
      liveDemo: "",
      github: "",
      scope: {
        problem: "Clinics receive patient requests as free text — often informal, misspelled or incomplete — and staff have to read each one to decide what needs attention first.",
        steps: [
          { title: "Receive", text: "A patient request arrives through a Telegram bot or a webhook." },
          { title: "Classify", text: "AI extracts the symptoms, even from informal wording or spelling mistakes, and sorts the request into three urgency levels: RED (emergency), YELLOW (urgent) and GREEN (routine)." },
          { title: "Protect", text: "Clinical red-flag rules, such as chest pain or shortness of breath, trigger an instant safety flow: the patient is directed to the nearest emergency service and staff get a high-priority alert." },
          { title: "Record", text: "The patient file is found or created automatically in Notion, and the booking request is linked to it by phone number through Relations." },
          { title: "Alert", text: "Reception and nursing staff receive real-time alerts and appointment confirmations on Telegram." }
        ],
        highlights: [
          "Three urgency levels: RED, YELLOW and GREEN",
          "Instant emergency path for acute symptoms",
          "Notion relational databases with Relations and Rollups",
          "Structured AI output (JSON Schema) for reliable routing"
        ],
        note: "Demonstration project. The AI sorts and routes requests to help staff prioritize; it does not diagnose and is not a substitute for clinical judgment.",
        delivers: [
          "Every request classified as RED, YELLOW or GREEN",
          "Emergency cases escalated to staff immediately",
          "Patient files and bookings organized in linked Notion databases",
          "Live Telegram alerts and appointment confirmations for the team"
        ],
        snapshot: [
          ["Built with", "n8n · Notion API"],
          ["Channel", "Telegram Bot · Webhooks"],
          ["Type", "Clinical intake automation"]
        ]
      }
    },

    // ------------------------------------------------------------
    // 3) AI-Powered Task Manager
    // ------------------------------------------------------------
    {
      id: "ai-task-manager",
      title: "AI-Powered Task Manager",
      tagline: "Distribute monthly goals to your team and track progress automatically (n8n + Microsoft To Do)",
      description: "An automation system that converts a manager’s monthly goal into actionable tasks for each team member, while aggregating progress into a clear report—all without the need for manual follow-ups.",
      tech: ["n8n", "Microsoft To Do", "LLM via OpenRouter", "Structured Output", "Form Trigger", "Telegram", "JavaScript"],
      video: "",
      image: "task-manager.png",
      liveDemo: "",
      github: "",
      scope: {
        problem: "Managers often set a high-level monthly goal, then spend significant time breaking it down for the team and checking in on who has completed what. Meanwhile, employees frequently work from their mobile devices, meaning any cumbersome or complex tool is likely to be abandoned.",
        intro: "An n8n workflow integrated with Microsoft To Do — a tool the team already uses on their mobile devices.",
        steps: [
          { title: "Set the goal", text: "The manager enters the monthly goal into a designated list." },
          { title: "Distribute", text: "An AI model (LLM) analyzes the goal, assigns tasks to team members based on their roles, and automatically adds them to each person’s Microsoft To Do list." },
          { title: "Report", text: "Whenever the manager requests a progress report, the system compiles the status of all team tasks, calculates progress percentages via code, generates an analytical report, and sends it directly via Telegram." },
          { title: "Control", text: "The manager controls everything through a simple mobile interface: updating the monthly goal, clearing old tasks, or requesting a progress report." }
        ],
        highlights: [
          "Progress percentages are calculated with JavaScript, so the figures are exact. The AI only interprets the goal and drafts the analysis.",
          "The AI returns structured output (JSON), so tasks are created automatically without any manual intervention.",
          "Employees don’t need to learn a new tool. They keep using the Microsoft To Do app they already know."
        ],
        note: "A pilot project based on a hypothetical scenario for a company with 4 employees. It can be customized to suit your own team and industry.",
        delivers: [
          "Monthly goals broken into role-based tasks automatically",
          "Tasks created directly in each member’s Microsoft To Do",
          "On-demand progress report delivered on Telegram",
          "Exact progress figures calculated in code"
        ],
        snapshot: [
          ["Built with", "n8n · Microsoft To Do"],
          ["Interface", "Form + Telegram (mobile-first)"],
          ["Status", "Pilot (hypothetical scenario)"]
        ]
      }
    },

    // ------------------------------------------------------------
    // 4) AI Product Knowledge Assistant (RAG)
    // ------------------------------------------------------------
    {
      id: "product-knowledge-assistant",
      title: "AI Product Knowledge Assistant",
      tagline: "RAG with Supabase and Metadata",
      description: "An end-to-end Retrieval-Augmented Generation (RAG) system that turns a raw product catalog into a conversational assistant that answers customer questions accurately, using only the company's own data.",
      tech: ["n8n", "Supabase (PostgreSQL + pgvector)", "OpenAI Embeddings", "LLM via OpenRouter", "AI Agents", "JSON Schema"],
      video: "",
      image: "product-rag.png",
      liveDemo: "",
      github: "",
      scope: {
        problem: "A product catalog is hard to search in conversation, and a generic chatbot guesses when it does not know. Customers need answers that come only from the company’s own, current data.",
        steps: [
          { title: "Intelligent ingestion", text: "When a catalog file is uploaded, an LLM splits it into one self-contained chunk per product and returns it as strict, schema-validated JSON. Every product keeps its full details (name, description, price, branch, stock) together, so no product is ever cut in half." },
          { title: "Vector storage with metadata", text: "Each chunk is converted into an embedding and stored in Supabase (PostgreSQL with pgvector), alongside structured metadata such as the product code. This combines semantic search with precise, filterable attributes, so retrieval can be both meaning-aware and exact." },
          { title: "Automatic synchronization", text: "Whenever the source file changes, the workflow re-runs: outdated records are removed and fresh ones are inserted. The knowledge base never drifts out of date, and no manual re-indexing is needed." },
          { title: "Conversational AI agent", text: "Customers chat with an AI agent that queries the vector database as a tool, retrieves the most relevant products by semantic similarity, and answers in a tone and format defined by a custom system prompt." }
        ],
        highlights: [
          "Structured chunking by business entity (one product = one chunk) instead of arbitrary text splitting",
          "Schema-enforced LLM output for reliable, machine-readable data",
          "Semantic search over embeddings with metadata for traceability and filtering",
          "Self-updating pipeline that keeps the knowledge base consistent with the source file",
          "Fully automated, no-code-friendly orchestration with n8n"
        ],
        delivers: [
          "A raw product catalog turned into a conversational assistant",
          "Answers grounded only in the company's own data",
          "A knowledge base that updates itself when the file changes"
        ],
        snapshot: [
          ["Built with", "n8n · Supabase"],
          ["Retrieval", "Semantic search + metadata"],
          ["Type", "RAG assistant"]
        ]
      }
    }
  ]
};
