const portfolioData = {
  personal: {
    name: "Abdalrhman Mohammed",
    role: "Agentic AI & Automation Developer",
    email: "Alkrnz279@gmail.com",
    whatsapp: "https://wa.me/201040670522?text=Hello%20Abdalrhman,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project.",
    linkedin: "https://linkedin.com/in/your-profile",
    github: "https://github.com/your-username",
    upwork: "https://upwork.com/freelancers/~your-id",
    avatar: "avatar.jpeg"
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
      image: "",
      liveDemo: "",
      github: "",
      scope: {
        idealFor: [
          "Recruiters buried under dozens of CVs per role",
          "Agencies screening candidates for multiple clients at once",
          "Startups without a dedicated HR team",
          "Companies hiring on a recurring, repeatable basis"
        ],
        deliverables: [
          "End-to-end n8n workflow, fully configured and documented",
          "CV parsing pipeline with structured data extraction",
          "Automated scoring against your own job criteria",
          "Live, ranked shortlist synced to Google Sheets"
        ],
        approach: [
          "Capture incoming CVs through a webhook connected to the application form",
          "Parse each file and extract structured candidate data",
          "Score and rank applicants against the target job criteria",
          "Sync the ranked shortlist into a live Google Sheet for the hiring team"
        ],
        timeline: "5–10 days",
        format: "Source workflow + setup walkthrough"
      }
    },
    {
      id: "notification-agent",
      title: "AI Notification & Decision Agent",
      tagline: "Context-aware alert system with human-in-the-loop fallback",
      description: "An intelligent event assistant that reads unstructured incoming data, compiles surrounding context, and triggers automated alerts through messaging channels when critical human validation or action is required.",
      tech: ["Python", "LLMs", "Gradio", "APIs", "Automations"],
      video: "",
      image: "",
      liveDemo: "",
      github: "",
      scope: {
        idealFor: [
          "Operations teams drowning in low-priority notifications",
          "Support desks that need to triage before escalating",
          "Businesses running unattended automations that occasionally need a human",
          "Teams tired of checking every alert manually"
        ],
        deliverables: [
          "Event ingestion pipeline for your existing data sources",
          "LLM-based severity classification logic",
          "Automated escalation through WhatsApp, Slack or email",
          "A lightweight Gradio dashboard for manual review"
        ],
        approach: [
          "Ingest incoming triggers and events in real time",
          "Aggregate the relevant context around each event",
          "Classify severity and decide whether a human is needed",
          "Escalate only what matters through your team's existing channels"
        ],
        timeline: "6–9 days",
        format: "Source code + deployment guide"
      }
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
      github: "",
      scope: {
        idealFor: [
          "Teams with knowledge scattered across PDFs and wikis",
          "Support teams that field the same questions repeatedly",
          "Companies wary of generic chatbots hallucinating answers",
          "Anyone who wants to 'talk' to their own documentation"
        ],
        deliverables: [
          "Document ingestion and chunking pipeline",
          "Vector database configured with your content",
          "Retrieval-grounded chat interface with inline citations",
          "Guardrails to prevent answers outside the source material"
        ],
        approach: [
          "Chunk and embed your document set into a vector database",
          "Build a retrieval pipeline that surfaces the most relevant passages",
          "Ground every response strictly in the retrieved context",
          "Expose the assistant through a simple, branded chat interface"
        ],
        timeline: "6–10 days",
        format: "Hosted or self-hosted, your choice"
      }
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
      github: "",
      scope: {
        idealFor: [
          "Support teams overloaded with repetitive tickets",
          "E-commerce brands needing 24/7 first response",
          "Businesses that already have a CRM but no automation layer",
          "Teams wanting to cut response time without hiring"
        ],
        deliverables: [
          "AI agent connected to your CRM and knowledge base",
          "Automated responses for routine, repeatable inquiries",
          "Clear escalation rules for complex conversations",
          "Full conversation logs for quality review"
        ],
        approach: [
          "Route incoming messages through the AI agent",
          "Query your CRM and knowledge base to answer routine questions",
          "Generate accurate, on-brand responses automatically",
          "Escalate anything complex to a human with full context attached"
        ],
        timeline: "7–12 days",
        format: "Integrated into your existing CRM"
      }
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
      github: "",
      scope: {
        idealFor: [
          "Businesses juggling data across multiple disconnected tools",
          "Teams manually copying data between systems every week",
          "Operations leads who need structured reports, not raw exports",
          "Anyone chaining more than one AI model into a single process"
        ],
        deliverables: [
          "Multi-step orchestration pipeline across your tools",
          "Standardized, structured output format",
          "Error handling and monitoring on every step",
          "Documentation for extending the pipeline later"
        ],
        approach: [
          "Ingest unstructured data from every connected source",
          "Orchestrate the AI models and API calls in the right sequence",
          "Parse and normalize the output into a consistent structure",
          "Deliver the processed data straight into your existing tools"
        ],
        timeline: "7–14 days",
        format: "Source workflow + architecture diagram"
      }
    }
  ]
};
