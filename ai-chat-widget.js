// ============================================================
// ai-chat-widget.js
// Abdalrhman Mohammed — AI Portfolio Assistant (isolated widget)
// Fully self-contained: drop this one file into any page and
// add <abdalrhman-ai-chat></abdalrhman-ai-chat> to the HTML.
// Does not read or modify anything else on the page.
// ============================================================

// Avatar is embedded as Base64 so it never depends on a file path
// or folder structure — it will always render correctly.
const AVATAR_DATA_URI = "data:image/jpeg;base64,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";

class AbdalrhmanAiChat extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.history = [];
    this.isSending = false;
    this.isOpen = false;
  }

  connectedCallback() {
    const avatarUrl = this.getAttribute("avatar") || AVATAR_DATA_URI;
    // 🔗 Point this at your deployed backend (see chat.js / README notes).
    // A relative path like "/api/chat" only works if the widget and the
    // API live on the exact same domain. Since this portfolio is hosted
    // on GitHub Pages (static only) and the API runs on Vercel, this
    // MUST be the full Vercel URL, e.g.:
    // "https://abdalrhman-chat-api.vercel.app/api/chat"
    const apiEndpoint = this.getAttribute("api") || "/api/chat";

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          --accent: #58f5c2;
          --accent-2: #55d8ff;
          --bg-deep: #0b0f19;
          --bg-panel: #10161f;
          --text: #edf5f2;
          --muted: #9aa8a6;
          --line: rgba(255,255,255,.1);
          all: initial;
          font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
        }

        * { box-sizing: border-box; }

        .widget-root {
          position: fixed;
          bottom: 100px;
          right: 24px;
          z-index: 999999;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 14px;
        }

        .chat-button {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          border: 2px solid rgba(88,245,194,.35);
          box-shadow: 0 10px 28px rgba(0,0,0,.4), 0 0 24px rgba(88,245,194,.18);
          cursor: pointer;
          overflow: hidden;
          transition: transform .25s ease, box-shadow .25s ease;
          background: var(--bg-panel);
          padding: 0;
          position: relative;
        }
        .chat-button:hover {
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 14px 34px rgba(0,0,0,.45), 0 0 30px rgba(88,245,194,.3);
        }
        .chat-button img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .chat-button .ping {
          position: absolute;
          top: -2px;
          right: -2px;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: var(--accent);
          border: 2px solid var(--bg-deep);
          box-shadow: 0 0 10px var(--accent);
        }

        .chat-box {
          width: 360px;
          max-width: calc(100vw - 48px);
          height: 500px;
          max-height: 72vh;
          background: linear-gradient(160deg, rgba(19,26,37,.98), rgba(9,13,20,.99));
          border: 1px solid var(--line);
          border-radius: 20px;
          box-shadow: 0 30px 80px rgba(0,0,0,.5), 0 0 60px rgba(88,245,194,.08);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          transform-origin: bottom right;
          transform: scale(.92) translateY(12px);
          opacity: 0;
          pointer-events: none;
          transition: transform .28s cubic-bezier(.2,.9,.25,1), opacity .22s ease;
        }
        .chat-box.open {
          transform: scale(1) translateY(0);
          opacity: 1;
          pointer-events: auto;
        }

        .chat-header {
          background: linear-gradient(135deg, rgba(88,245,194,.14), rgba(85,216,255,.06));
          border-bottom: 1px solid var(--line);
          color: var(--text);
          padding: 14px 16px;
          display: flex;
          align-items: center;
          gap: 12px;
          flex-shrink: 0;
        }
        .chat-header img {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: 2px solid rgba(88,245,194,.4);
          object-fit: cover;
        }
        .chat-header .info { flex: 1; min-width: 0; }
        .chat-header .info h4 {
          margin: 0; font-size: 14px; font-weight: 700; color: var(--text);
        }
        .chat-header .info p {
          margin: 2px 0 0; font-size: 11.5px; color: var(--accent);
          display: flex; align-items: center; gap: 5px;
        }
        .chat-header .info p::before {
          content: ""; width: 6px; height: 6px; border-radius: 50%;
          background: var(--accent); box-shadow: 0 0 8px var(--accent);
          flex-shrink: 0;
        }
        .close-btn {
          background: none; border: none; color: var(--muted);
          font-size: 18px; cursor: pointer; line-height: 1;
          width: 28px; height: 28px; border-radius: 8px;
          display: grid; place-items: center; transition: .2s;
        }
        .close-btn:hover { color: var(--text); background: rgba(255,255,255,.06); }

        .chat-messages {
          flex: 1;
          padding: 16px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .chat-messages::-webkit-scrollbar { width: 6px; }
        .chat-messages::-webkit-scrollbar-thumb { background: rgba(255,255,255,.12); border-radius: 10px; }

        .message {
          max-width: 82%;
          padding: 10px 13px;
          border-radius: 14px;
          font-size: 13.5px;
          line-height: 1.55;
          word-break: break-word;
          animation: pop .25s ease;
        }
        @keyframes pop {
          from { opacity: 0; transform: translateY(6px) scale(.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .message.bot {
          align-self: flex-start;
          background: rgba(255,255,255,.045);
          border: 1px solid var(--line);
          color: var(--text);
          border-bottom-left-radius: 3px;
        }
        .message.user {
          align-self: flex-end;
          background: linear-gradient(135deg, var(--accent), var(--accent-2));
          color: #06130f;
          font-weight: 600;
          border-bottom-right-radius: 3px;
        }

        .typing-dots {
          align-self: flex-start;
          display: flex;
          gap: 4px;
          padding: 12px 14px;
          background: rgba(255,255,255,.045);
          border: 1px solid var(--line);
          border-radius: 14px;
          border-bottom-left-radius: 3px;
        }
        .typing-dots span {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--muted);
          animation: bounce 1.2s infinite ease-in-out;
        }
        .typing-dots span:nth-child(2) { animation-delay: .15s; }
        .typing-dots span:nth-child(3) { animation-delay: .3s; }
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); opacity: .5; }
          30% { transform: translateY(-5px); opacity: 1; }
        }

        .chat-input-area {
          padding: 12px;
          background: rgba(255,255,255,.02);
          border-top: 1px solid var(--line);
          display: flex;
          gap: 8px;
          flex-shrink: 0;
        }
        .chat-input-area input {
          flex: 1;
          border: 1px solid var(--line);
          background: rgba(255,255,255,.04);
          color: var(--text);
          padding: 10px 14px;
          border-radius: 999px;
          outline: none;
          font-size: 13.5px;
          font-family: inherit;
        }
        .chat-input-area input::placeholder { color: var(--muted); }
        .chat-input-area input:focus { border-color: rgba(88,245,194,.4); }
        .chat-input-area button {
          background: var(--accent);
          color: #07110e;
          border: none;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          cursor: pointer;
          font-weight: 800;
          flex-shrink: 0;
          display: grid;
          place-items: center;
          transition: transform .2s, opacity .2s;
        }
        .chat-input-area button:hover:not(:disabled) { transform: scale(1.06); }
        .chat-input-area button:disabled { opacity: .5; cursor: not-allowed; }

        @media (max-width: 480px) {
          .widget-root { right: 16px; bottom: 90px; }
          .chat-box { width: calc(100vw - 32px); height: 65vh; }
        }
      </style>

      <div class="widget-root">
        <div class="chat-box" id="chatBox">
          <div class="chat-header">
            <img src="${avatarUrl}" alt="Abdalrhman Mohammed">
            <div class="info">
              <h4>Abdalrhman Mohammed</h4>
              <p>AI Assistant · Online</p>
            </div>
            <button class="close-btn" id="closeBtn" aria-label="Close">✕</button>
          </div>
          <div class="chat-messages" id="chatMessages"></div>
          <div class="chat-input-area">
            <input type="text" id="userInput" placeholder="Ask about my projects, skills..." />
            <button id="sendBtn" aria-label="Send">➤</button>
          </div>
        </div>

        <button class="chat-button" id="toggleBtn" aria-label="Open chat">
          <img src="${avatarUrl}" alt="Chat">
          <span class="ping"></span>
        </button>
      </div>
    `;

    this.initEvents(apiEndpoint);
    this.appendMessage(
      "Hi! I'm Abdalrhman's AI assistant. Ask me anything about his skills, experience, or projects — أو اسألني بالعربي لو أسهل عليك 👋",
      "bot"
    );
  }

  initEvents(apiEndpoint) {
    const root = this.shadowRoot;
    const toggleBtn = root.getElementById("toggleBtn");
    const closeBtn = root.getElementById("closeBtn");
    const chatBox = root.getElementById("chatBox");
    const sendBtn = root.getElementById("sendBtn");
    const userInput = root.getElementById("userInput");

    const openChat = () => { chatBox.classList.add("open"); this.isOpen = true; userInput.focus(); };
    const closeChat = () => { chatBox.classList.remove("open"); this.isOpen = false; };
    const toggleChat = () => (this.isOpen ? closeChat() : openChat());

    toggleBtn.addEventListener("click", toggleChat);
    closeBtn.addEventListener("click", closeChat);

    const sendMessage = async () => {
      const text = userInput.value.trim();
      if (!text || this.isSending) return;

      this.isSending = true;
      sendBtn.disabled = true;
      userInput.disabled = true;

      this.appendMessage(text, "user");
      userInput.value = "";

      const typingEl = this.showTyping();

      try {
        const response = await fetch(apiEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: text, history: this.history }),
        });

        const data = await response.json();
        typingEl.remove();

        if (data.reply) {
          this.appendMessage(data.reply, "bot");
          this.history.push({ role: "user", content: text });
          this.history.push({ role: "assistant", content: data.reply });
          // Keep the context window light
          if (this.history.length > 12) this.history = this.history.slice(-12);
        } else {
          this.appendMessage("Sorry, something went wrong. Please try again in a moment.", "bot");
        }
      } catch (err) {
        typingEl.remove();
        this.appendMessage("Couldn't reach the assistant right now — please try again shortly.", "bot");
      } finally {
        this.isSending = false;
        sendBtn.disabled = false;
        userInput.disabled = false;
        userInput.focus();
      }
    };

    sendBtn.addEventListener("click", sendMessage);
    userInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !this.isSending) sendMessage();
    });
  }

  showTyping() {
    const root = this.shadowRoot;
    const chatMessages = root.getElementById("chatMessages");
    const el = document.createElement("div");
    el.className = "typing-dots";
    el.innerHTML = "<span></span><span></span><span></span>";
    chatMessages.appendChild(el);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return el;
  }

  appendMessage(text, className) {
    const root = this.shadowRoot;
    const chatMessages = root.getElementById("chatMessages");
    const msgDiv = document.createElement("div");
    msgDiv.className = `message ${className}`;
    msgDiv.innerText = text;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return msgDiv;
  }
}

customElements.define("abdalrhman-ai-chat", AbdalrhmanAiChat);
