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
    {
      id: "hr-screening",
      title: "AI HR Candidate Screening System",
      tagline: "Autonomous resume parsing and applicant scoring pipeline",
      description: "An automated recruitment workflow that ingests CVs, parses structured candidate profiles, compares skills against strict job descriptions, and organizes qualified applicants directly into Google Sheets for rapid HR screening.",
      tech: ["n8n", "AI Processing", "Google Sheets", "PDF Extraction"],
      video: "",
      image: "cv-screening.png",
      liveDemo: "",
      github: ""
    },
    {
      id: "clinical-triage-system",
      title: "AI Clinical Triage & Notion System",
      tagline: "Intelligent healthcare request routing and clinical urgency sorting",
      description: "An automated clinical intake and triage workflow built with n8n and Notion. It evaluates patient complaints using structured AI and clinical red-flag rules, instantly routes emergencies to medical staff via Telegram, and organizes patient bookings in relational Notion databases.",
      tech: ["n8n", "Notion API", "LLM Triage", "Telegram Bot", "Structured Outputs"],
      video: "",
      image: "triage-system.png", // تم ربط الصورة المصممة للمشروع الثاني هنا بدقة
      liveDemo: "",
      github: ""
    },
    {
      id: "rag-assistant",
      title: "RAG Knowledge Base Assistant",
      tagline: "Private document query assistant with citation precision",
      description: "A document-driven semantic search agent allowing teams to securely converse with internal PDFs and technical manuals, returning grounded answers with verifiable inline references.",
      tech: ["Python", "RAG", "Vector DB", "Embeddings", "OpenAI"],
      video: "",
      image: "",
      liveDemo: "",
      github: ""
    },
    {
      id: "customer-support",
      title: "AI Customer Support Engine",
      tagline: "Self-operating ticket triage and automated response flow",
      description: "End-to-end user request handler that resolves routine client inquiries via vector search and routes complex escalation paths directly to human support representatives.",
      tech: ["n8n", "AI Agents", "APIs", "Chatbots", "CRM Integrations"],
      video: "",
      image: "",
      liveDemo: "",
      github: ""
    },
    {
      id: "workflow-orchestrator",
      title: "Multi-Step AI Workflow Orchestrator",
      tagline: "API data bridge converting raw data to structured insights",
      description: "Custom orchestration system binding multiple language models with external API webhooks to standardise raw data streams into formatted business summaries.",
      tech: ["Python", "n8n", "LLM Pipelines", "JSON Parsing", "APIs"],
      video: "",
      image: "",
      liveDemo: "",
      github: ""
    }
  ]
};
