// ===============================
// Portfolio content — edit this file
// ===============================

const portfolioData = {
  personal: {
    name: "Abdalrhman Mohammed",
    role: "Agentic AI Developer",
    email: "Alkrnz279@gmail.com",
    whatsapp: "https://wa.me/201040670522?text=Hello%20Abdalrhman,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project.",
    linkedin: "https://linkedin.com/in/your-profile",
    github: "https://github.com/your-username",
    upwork: "https://upwork.com/freelancers/~your-id",
    avatar: ""
  },

  highlights: [
    "Agentic AI", "AI Agents", "Workflow Automation", "AI Chatbots",
    "Python", "n8n", "APIs", "RAG"
  ],

  skills: [
    {
      title: "Agents & AI Frameworks",
      icon: "✦",
      items: ["LangChain", "CrewAI", "OpenAI APIs", "Vector DBs", "RAG"]
    },
    {
      title: "Workflow & Automation",
      icon: "⌁",
      items: ["n8n", "Webhooks", "REST APIs", "Workflow Design", "Integrations"]
    },
    {
      title: "Core Engineering",
      icon: "⌘",
      items: ["Python", "JavaScript", "Google APIs", "PDF Processing", "Document AI"]
    }
  ],

  projects: [
    {
      title: "AI HR Candidate Screening System",
      number: "01",
      tagline: "Automated CV screening from submission to shortlist.",
      description: "An autonomous recruitment workflow that parses CVs, extracts structured candidate data, evaluates applicants against target criteria, and logs ranked profiles into Google Sheets.",
      tech: ["n8n", "AI Processing", "Google Sheets", "PDF Parsing", "Webhooks"],
      video: "",
      image: "",
      github: "",
      liveDemo: "",
      scope: {
        overview: "An end-to-end recruitment automation that removes manual CV screening from the hiring process, from the moment a candidate applies to the moment a shortlist lands in the recruiter's inbox.",
        problem: "HR teams spend hours manually opening CVs, extracting details, and comparing candidates against job requirements — a repetitive process that slows hiring and introduces inconsistent evaluation.",
        approach: [
          "Capture incoming CVs via a webhook from the application form",
          "Parse each PDF/DOCX and extract structured candidate data (skills, experience, education)",
          "Score and rank candidates against the target job criteria using AI evaluation",
          "Push ranked, structured profiles into a live Google Sheet for the hiring team"
        ],
        outcome: "Recruiters review a ready-made shortlist instead of raw applications, cutting screening time and making evaluation consistent across every candidate.",
        timeline: "Typical build: 3–5 days"
      }
    },
    {
      title: "AI Notification & Human-in-the-Loop Agent",
      number: "02",
      tagline: "An assistant that knows when a human needs to step in.",
      description: "An intelligent assistant that interprets user triggers, aggregates background context, and invokes automated high-priority alerts when human oversight is required.",
      tech: ["Python", "LLMs", "Gradio", "REST APIs", "Automations"],
      video: "",
      image: "",
      github: "",
      liveDemo: "",
      scope: {
        overview: "A monitoring agent that watches incoming events, decides which ones genuinely need a human, and escalates only those — instead of flooding a team with alerts.",
        problem: "Fully automated systems miss edge cases that need judgment, while fully manual monitoring wastes people's time on routine, low-priority events.",
        approach: [
          "Ingest triggers and events from connected sources in real time",
          "Aggregate relevant background context for each event",
          "Use an LLM to classify severity and decide whether human review is required",
          "Send high-priority alerts automatically through the team's existing channels"
        ],
        outcome: "The team is only pulled in when it actually matters, reducing alert fatigue while keeping a human in control of critical decisions.",
        timeline: "Typical build: 4–6 days"
      }
    },
    {
      title: "RAG Knowledge Base Assistant",
      number: "03",
      tagline: "Ask private documents questions and get grounded answers.",
      description: "A semantic search assistant that lets users query private documentation and retrieve relevant context for accurate, context-aware responses.",
      tech: ["Python", "RAG", "Vector Databases", "Embeddings", "OpenAI API"],
      video: "",
      image: "",
      github: "",
      liveDemo: "",
      scope: {
        overview: "A retrieval-augmented assistant that turns a company's private documents into a searchable knowledge base employees or customers can simply ask questions of.",
        problem: "Answers are often buried across scattered documents, PDFs, and wikis, and generic AI chatbots hallucinate when they don't have access to a business's actual private data.",
        approach: [
          "Chunk and embed the document set into a vector database",
          "Build a retrieval pipeline that pulls the most relevant passages for each query",
          "Ground the LLM's response strictly in the retrieved context",
          "Expose the assistant through a simple chat interface"
        ],
        outcome: "Users get accurate, source-grounded answers from private documentation in seconds, instead of manually searching through files.",
        timeline: "Typical build: 4–7 days"
      }
    },
    {
      title: "AI Customer Support Automation Engine",
      number: "04",
      tagline: "Automate routine support while keeping humans in control.",
      description: "An end-to-end support agent handling routine inquiries, querying knowledge sources, generating responses, and escalating complex conversations to human support.",
      tech: ["n8n", "AI Agents", "Chatbots", "Webhooks", "CRM Integration"],
      video: "",
      image: "",
      github: "",
      liveDemo: "",
      scope: {
        overview: "A support agent that resolves common customer questions automatically and hands off anything complex to a human, connected directly to the business's CRM.",
        problem: "Support teams spend most of their time on repetitive, low-complexity questions, leaving less time for the conversations that actually need a human touch.",
        approach: [
          "Route incoming customer messages through an AI agent",
          "Query knowledge sources and CRM data to answer routine inquiries",
          "Generate accurate, on-brand responses automatically",
          "Detect complexity and escalate edge cases to a human agent with full context"
        ],
        outcome: "Routine tickets get resolved instantly around the clock, and human agents focus only on conversations that genuinely need them.",
        timeline: "Typical build: 5–8 days"
      }
    },
    {
      title: "Multi-Step AI Workflow Orchestrator",
      number: "05",
      tagline: "Connect models, APIs, and data into one intelligent pipeline.",
      description: "A scalable workflow connecting AI models, external APIs, and data stores to process unstructured information into actionable business intelligence.",
      tech: ["Python", "n8n", "LLM Orchestration", "JSON Parsing", "APIs"],
      video: "",
      image: "",
      github: "",
      liveDemo: "",
      scope: {
        overview: "A multi-step pipeline that chains several AI models and external APIs together, turning messy unstructured input into clean, structured business data.",
        problem: "Business-critical information often arrives unstructured and scattered across different tools, making it hard to act on without manual data entry.",
        approach: [
          "Ingest unstructured data from multiple sources into a single pipeline",
          "Orchestrate several AI models and API calls in sequence",
          "Parse and normalize the output into a consistent structured format",
          "Deliver the processed data directly into the business's existing tools"
        ],
        outcome: "Unstructured information becomes ready-to-use business intelligence automatically, removing hours of manual data handling.",
        timeline: "Typical build: 5–9 days"
      }
    }
  ]
};
