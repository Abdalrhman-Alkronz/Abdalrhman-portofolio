// ============================================================
// api/chat.js — deploy this on Vercel (NOT on GitHub Pages).
// GitHub Pages only serves static files and cannot run this.
// ============================================================

// 🔑 PASTE YOUR OPENROUTER API KEY HERE
// -------------------------------------------------------------
// Do NOT type the key into this file. Instead:
//   Vercel dashboard → your project → Settings → Environment
//   Variables → add a variable named exactly:
//     OPENROUTER_API_KEY = your-new-key
// This line below just reads it securely at runtime.
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

// Tried in order — if the first model fails or is rate-limited,
// the free fallback keeps the chatbot working instead of breaking.
const MODELS = ["openai/gpt-4o-mini", "meta-llama/llama-3.1-8b-instruct:free"];

// Lightweight in-memory context — this IS the "RAG" layer here.
// For a single CV-sized document, embedding the full text directly
// is simpler, faster, and more accurate than a vector database.
const CV_CONTEXT = `
Name: Abdalrhman Mohammed
Title: Agentic AI & Automation Developer
Contact: +20 104 067 0522 | Alkrnz279@gmail.com

SUMMARY:
Automation-focused developer specializing in building AI agents, workflow automations, and RAG-based systems that turn repetitive business processes into intelligent, self-running operations. Experienced in designing end-to-end pipelines connecting LLMs with real-world tools, APIs, and data sources — from autonomous multi-agent research systems to customer-facing chatbots.

TECHNICAL SKILLS:
- Agents & AI Frameworks: LangChain, CrewAI, OpenAI APIs, Vector Databases, RAG (Retrieval-Augmented Generation)
- Workflow & Automation: n8n, Webhooks, REST APIs, end-to-end automation pipeline design
- Core Engineering: Python, JavaScript, Google Workspace APIs, PDF & document data extraction
- Tools: Notion, Git, VS Code, ChatGPT & Claude

SOFT SKILLS:
Analytical problem-solving, clear client communication, self-directed learning, attention to detail, remote work discipline.

SELECTED PROJECTS:
1. AI HR Candidate Screening System — Autonomous recruitment workflow built in n8n that parses CVs, extracts candidate data, scores applicants, and logs shortlists to Google Sheets.
2. Multi-Agent Competitor Analysis System — CrewAI-based system using coordinated AI agents to research competitors and build consolidated business intelligence summaries.
3. Restaurant AI Chatbot — Conversational assistant handling customer inquiries, menu questions, and orders automatically.

CONTINUOUS LEARNING:
Currently building a GPT-style language model from scratch in PyTorch to deepen understanding of LLMs.
`;

const SYSTEM_PROMPT = `
You are Abdalrhman Mohammed's personal AI assistant on his portfolio website.
Answer only using the CV information provided below. Do not invent facts.

--- CV DATA ---
${CV_CONTEXT}
---------------

Behavior rules:
1. Be concise and polite — answer exactly what's asked, no padding or unnecessary length.
2. Language mirroring:
   - If the visitor writes in Arabic, reply in warm, polite Egyptian colloquial Arabic.
   - If the visitor writes in English, reply in professional, friendly English.
3. Only answer questions related to Abdalrhman, his skills, experience, and projects.
   For anything else, politely redirect to contacting him directly via WhatsApp or email.
`;

async function callOpenRouter(model, messages) {
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      // Update this to your real site URL once deployed — OpenRouter
      // uses it for attribution, and some providers require it.
      "HTTP-Referer": "https://your-username.github.io",
      "X-Title": "Abdalrhman AI Assistant",
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: 0.6,
      max_tokens: 280,
    }),
  });

  if (!response.ok) {
    throw new Error(`Model ${model} failed with status ${response.status}`);
  }

  const data = await response.json();
  const reply = data.choices?.[0]?.message?.content;
  if (!reply) throw new Error(`Model ${model} returned no content`);
  return reply;
}

export default async function handler(req, res) {
  // --- CORS: required because the widget (GitHub Pages) and this API
  // (Vercel) live on different domains. Without this, the browser
  // blocks the request entirely. ---
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  if (!OPENROUTER_API_KEY) {
    return res.status(500).json({
      error: "Missing API key. Set OPENROUTER_API_KEY in your Vercel project's Environment Variables.",
    });
  }

  const { message, history } = req.body || {};
  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "Missing 'message' in request body." });
  }

  const messages = [
    { role: "system", content: SYSTEM_PROMPT },
    ...(Array.isArray(history) ? history : []),
    { role: "user", content: message },
  ];

  for (const model of MODELS) {
    try {
      const reply = await callOpenRouter(model, messages);
      return res.status(200).json({ reply });
    } catch (err) {
      console.error(err.message);
      // try the next model in MODELS
    }
  }

  return res.status(502).json({
    error: "All models are currently unavailable. Please try again shortly.",
  });
}
