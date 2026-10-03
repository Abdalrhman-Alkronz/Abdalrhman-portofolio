// ai-chat-widget.js

const OPENROUTER_API_KEY = "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";

// محتوى الـ CV المرفق لاستخدامه كـ Context
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

class AbdalrhmanAiChat extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.history = [];
  }

  connectedCallback() {
    const avatarUrl = this.getAttribute('avatar') || './avatar.jpeg';

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          --primary-color: #0084ff;
          --bg-color: #ffffff;
          --text-color: #1c1e21;
          --chat-bg: #f0f2f5;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .chat-widget-container {
          position: fixed;
          bottom: 25px;
          right: 25px;
          z-index: 999999;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }

        .chat-button {
          width: 65px;
          height: 65px;
          border-radius: 50%;
          border: 3px solid #ffffff;
          box-shadow: 0 4px 15px rgba(0,0,0,0.2);
          cursor: pointer;
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          background: #ffffff;
          padding: 0;
        }

        .chat-button:hover {
          transform: scale(1.08);
          box-shadow: 0 6px 20px rgba(0,0,0,0.3);
        }

        .chat-button img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .chat-box {
          display: none;
          width: 360px;
          height: 520px;
          max-width: 90vw;
          max-height: 80vh;
          background: var(--bg-color);
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
          flex-direction: column;
          overflow: hidden;
          margin-bottom: 15px;
          animation: slideUp 0.3s ease forwards;
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .chat-header {
          background: linear-gradient(135deg, #0084ff, #00c6ff);
          color: white;
          padding: 15px;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .chat-header img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 2px solid white;
        }

        .chat-header .info h4 {
          margin: 0;
          font-size: 16px;
        }

        .chat-header .info p {
          margin: 2px 0 0 0;
          font-size: 12px;
          opacity: 0.9;
        }

        .close-btn {
          margin-left: auto;
          background: none;
          border: none;
          color: white;
          font-size: 20px;
          cursor: pointer;
        }

        .chat-messages {
          flex: 1;
          padding: 15px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 10px;
          background: var(--chat-bg);
        }

        .message {
          max-width: 80%;
          padding: 10px 14px;
          border-radius: 14px;
          font-size: 14px;
          line-height: 1.4;
          word-break: break-word;
        }

        .message.bot {
          align-self: flex-start;
          background: white;
          color: var(--text-color);
          border-bottom-left-radius: 2px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .message.user {
          align-self: flex-end;
          background: var(--primary-color);
          color: white;
          border-bottom-right-radius: 2px;
        }

        .chat-input-area {
          padding: 12px;
          background: white;
          display: flex;
          gap: 8px;
          border-top: 1px solid #eee;
        }

        .chat-input-area input {
          flex: 1;
          border: 1px solid #ddd;
          padding: 10px 14px;
          border-radius: 20px;
          outline: none;
          font-size: 14px;
        }

        .chat-input-area button {
          background: var(--primary-color);
          color: white;
          border: none;
          padding: 10px 16px;
          border-radius: 20px;
          cursor: pointer;
          font-weight: bold;
        }

        .typing {
          font-style: italic;
          opacity: 0.6;
          font-size: 12px;
        }
      </style>

      <div class="chat-widget-container">
        <div class="chat-box" id="chatBox">
          <div class="chat-header">
            <img src="${avatarUrl}" alt="Avatar">
            <div class="info">
              <h4>عبد الرحمن محمد</h4>
              <p>مساعد الذكاء الاصطناعي الذكي</p>
            </div>
            <button class="close-btn" id="closeBtn">&times;</button>
          </div>
          <div class="chat-messages" id="chatMessages">
            <div class="message bot">أهلاً بك! أنا المساعد الذكي لعبد الرحمن. كيف أقدر أساعدك النهاردة؟</div>
          </div>
          <div class="chat-input-area">
            <input type="text" id="userInput" placeholder="اسأل أي سؤال عن عبد الرحمن..." />
            <button id="sendBtn">إرسال</button>
          </div>
        </div>

        <button class="chat-button" id="toggleBtn">
          <img src="${avatarUrl}" alt="Chat Icon">
        </button>
      </div>
    `;

    this.initEvents();
  }

  initEvents() {
    const shadow = this.shadowRoot;
    const toggleBtn = shadow.getElementById('toggleBtn');
    const closeBtn = shadow.getElementById('closeBtn');
    const chatBox = shadow.getElementById('chatBox');
    const sendBtn = shadow.getElementById('sendBtn');
    const userInput = shadow.getElementById('userInput');

    const toggleChat = () => {
      const isOpen = chatBox.style.display === 'flex';
      chatBox.style.display = isOpen ? 'none' : 'flex';
    };

    toggleBtn.addEventListener('click', toggleChat);
    closeBtn.addEventListener('click', toggleChat);

    const sendMessage = async () => {
      const text = userInput.value.trim();
      if (!text) return;

      this.appendMessage(text, 'user');
      userInput.value = '';

      const typingDiv = this.appendMessage('جاري التفكير...', 'bot typing');

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

      const messages = [
        { role: 'system', content: systemPrompt },
        ...this.history,
        { role: 'user', content: text }
      ];

      try {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
            'Content-Type': 'application/json',
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
        typingDiv.remove();

        const reply = data.choices?.[0]?.message?.content || "عذراً، حدث خطأ أثناء معالجة الطلب.";
        this.appendMessage(reply, 'bot');

        this.history.push({ role: 'user', content: text });
        this.history.push({ role: 'assistant', content: reply });

      } catch (err) {
        typingDiv.remove();
        console.error(err);
        this.appendMessage('تعذر الاتصال بالسيرفر. يرجى التحقق من الاتصال بالإنترنت.', 'bot');
      }
    };

    sendBtn.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') sendMessage();
    });
  }

  appendMessage(text, className) {
    const shadow = this.shadowRoot;
    const chatMessages = shadow.getElementById('chatMessages');
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${className}`;
    msgDiv.innerText = text;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return msgDiv;
  }
}

customElements.define('abdalrhman-ai-chat', AbdalrhmanAiChat);
