// ============================================================
// ai-chat-widget.js
// Abdalrhman Mohammed — AI Portfolio Assistant (isolated widget)
// Fully self-contained: drop this one file into any page and
// add <abdalrhman-ai-chat></abdalrhman-ai-chat> to the HTML.
// Does not read or modify anything else on the page.
// ============================================================

// Avatar is embedded as Base64 so it never depends on a file path
// or folder structure — it will always render correctly.
const AVATAR_DATA_URI = "avatar.jpeg";
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
