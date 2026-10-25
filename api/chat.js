// ============================================================
// api/chat.js — Vercel serverless function.
// ============================================================

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

// أسرع وأثبت نماذج مجانية على OpenRouter
const DEFAULT_MODELS = [
  "google/gemini-2.0-flash-exp:free",
  "meta-llama/llama-3.3-70b-instruct:free",
  "qwen/qwen-2.5-coder-32b-instruct:free",
  "openrouter/free"
];

const CUSTOM_MODELS = (process.env.OPENROUTER_MODELS || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);
const MODEL_LIST = CUSTOM_MODELS.length ? CUSTOM_MODELS : DEFAULT_MODELS;

const KNOWLEDGE = `
ABOUT
Name: Abdalrhman Mohammed
Title: Agentic AI & Automation Developer
Contact: WhatsApp / phone +20 104 067 0522 | Email: Alkrnz279@gmail.com

SUMMARY
Automation-focused developer who builds AI agents, workflow automations and RAG-based systems that turn repetitive business processes into intelligent, self-running operations.

TECHNICAL SKILLS
- Agents & AI frameworks: LangChain, CrewAI, OpenAI APIs, Vector Databases, RAG
- Workflow & automation: n8n, Webhooks, REST APIs, end-to-end automation pipeline design
- Core engineering: Python, JavaScript, Google Workspace APIs, PDF & document data extraction
- Tools: Notion, Git, VS Code, ChatGPT and Claude for AI-assisted development

PORTFOLIO PROJECTS
1. AI HR Candidate Screening System (n8n, AI processing, Google Sheets, PDF extraction)
2. AI Clinical Triage & Notion System (n8n, Notion API, LLM triage, Telegram bot)
3. AI-Powered Task Manager (n8n + Microsoft To Do, LLM via OpenRouter, Telegram)
4. AI Product Knowledge Assistant: RAG with Supabase (n8n, Supabase, pgvector, OpenAI)
`;

const SYSTEM_PROMPT = `
You are the AI assistant on Abdalrhman Mohammed's portfolio website. Speak about him in the third person ("Abdalrhman").
Answer briefly (1 to 3 sentences) and politely from the information below.
If asked in Arabic, reply in warm Egyptian Arabic. If in English, reply in friendly professional English.

${KNOWLEDGE}
`;

async function callOpenRouter(model, messages, maxTokens = 300) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 12000); // Timeout 12s

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://abdalrhman-portofolio.vercel.app",
        "X-Title": "Abdalrhman AI Assistant",
      },
      body: JSON.stringify({ model, messages, temperature: 0.5, max_tokens: maxTokens }),
      signal: controller.signal,
    });

    const raw = await response.text();
    let data = {};
    try { data = JSON.parse(raw); } catch (_) {}

    if (!response.ok || data.error) {
      throw new Error(data?.error?.message || `HTTP ${response.status}`);
    }

    const reply = data.choices?.[0]?.message?.content;
    if (typeof reply !== "string" || !reply.trim()) {
      throw new Error("Empty reply");
    }
    return reply.trim();
  } finally {
    clearTimeout(timer);
  }
}

function cleanHistory(history) {
  if (!Array.isArray(history)) return [];
  return history
    .filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
    .slice(-6)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 1000) }));
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  if (!OPENROUTER_API_KEY) {
    return res.status(500).json({ error: "Missing API Key" });
  }

  let body = req.body;
  if (typeof body === "string") {
    try { body = JSON.parse(body); } catch (_) { body = {}; }
  }

  const message = typeof body?.message === "string" ? body.message.trim().slice(0, 1000) : "";
  if (!message) {
    return res.status(400).json({ error: "Missing message" });
  }

  const messages = [
    { role: "system", content: SYSTEM_PROMPT },
    ...cleanHistory(body.history),
    { role: "user", content: message },
  ];

  for (const model of MODEL_LIST) {
    try {
      const reply = await callOpenRouter(model, messages);
      return res.status(200).json({ reply });
    } catch (err) {
      console.log(`Failed ${model}:`, err.message);
    }
  }

  return res.status(502).json({
    error: "The assistant is temporarily unavailable. You can reach Abdalrhman directly on WhatsApp or by email.",
  });
}
