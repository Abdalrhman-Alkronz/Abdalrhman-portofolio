// api/chat.js

const OPENROUTER_API_KEY = "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";

// محتوى الـ CV المرفق لاستخدامه في الـ RAG Context
const CV_CONTEXT = `
Name: Abdalrhman Mohammed
Title: Agentic AI & Automation Developer
Contact: +20 104 067 0522 | Alkrnz279@gmail.com

SUMMARY:
Automation-focused developer specializing in building AI agents, workflow automations, and RAG-based systems that turn repetitive business processes into intelligent, self-running operations. Experienced in designing end-to-end pipelines connecting LLMs with real-world tools, APIs, and data sources.

TECHNICAL SKILLS:
- Agents & AI Frameworks: LangChain, CrewAI, OpenAI APIs, Vector Databases, RAG (Retrieval-Augmented Generation)
- Workflow & Automation: n8n, Webhooks, REST APIs, end-to-end automation pipeline design
- Core Engineering: Python, JavaScript, Google Workspace APIs, PDF & document data extraction
- Tools: Notion, Git, VS Code, ChatGPT & Claude

SOFT SKILLS:
Analytical problem-solving, Clear client communication, Self-directed learning, Attention to detail, Remote work discipline.

SELECTED PROJECTS:
1. AI HR Candidate Screening System: Autonomous recruitment workflow built in n8n that parses CVs, extracts candidate data, scores applicants, and logs shortlists to Google Sheets.
2. Multi-Agent Competitor Analysis System: CrewAI-based system using coordinated AI agents to research competitors and build consolidated business intelligence summaries.
3. Restaurant AI Chatbot: Conversational assistant handling customer inquiries, menu questions, and orders automatically.

CONTINUOUS LEARNING:
Currently building a GPT-style language model from scratch in PyTorch to deepen understanding of LLMs.
`;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message, history } = req.body;

  const systemPrompt = `
أنت المساعد الذكي الخاص بـ عبد الرحمن محمد (Abdalrhman Mohammed) - Agentic AI & Automation Developer.
مهمتك هي الإجابة عن الأسئلة المتعلقة بعبد الرحمن، مهاراته، خبراته، ومشاريعه بناءً فقط على معلومات الـ CV التالية:

--- CV DATA ---
${CV_CONTEXT}
--------------

قواعد مهمة للشخصية والرد:
1. كن مؤدباً، ودوداً، ومباشراً في إجابتك بدون إطالة أو إسهاب غير ضروري (على قد السؤال تماماً).
2. لغة الرد:
   - إذا سأل المستخدِم باللغة العربية، أجب بالعامية المصرية الودودة والمهذبة جداً.
   - إذا سأل المستخدِم باللغة الإنجليزية، أجب باللغة الإنجليزية الاحترافية واللطيفة.
3. لا تجب عن أي أسئلة خارجية ليس لها علاقة بعبد الرحمن أو مؤهلاته.
`;

  try {
    const messages = [
      { role: 'system', content: systemPrompt },
      ...(history || []),
      { role: 'user', content: message }
    ];

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY || OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://github.com/abdalrhman', // يمكن تعديله لدومين موقعك
        'X-Title': 'Abdalrhman AI Assistant'
      },
      body: JSON.stringify({
        model: 'openai/gpt-4o-mini',
        messages: messages,
        temperature: 0.7,
        max_tokens: 300
      })
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "عذراً، حدث خطأ أثناء معالجة الطلب.";

    return res.status(200).json({ reply });
  } catch (error) {
    console.error('Error in Chat Handler:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}