# Chat Widget — Setup Guide

## 0. Revoke the old API key first (urgent)
Go to openrouter.ai → API Keys → delete the key that starts with `sk-or-v1-1685f...`.
Create a brand new one. Never paste a real key into a file again — only into
environment variable settings (step 3 below).

## 1. Why this needs two separate places
- **GitHub Pages** (your current portfolio host) only serves static files —
  it cannot run server code or keep your API key secret.
- **Vercel** (free) can run the small `chat.js` backend and keep your key
  hidden from visitors.

So: the *site* stays on GitHub Pages, and the *API* moves to Vercel.

## 2. Deploy the API on Vercel
1. Create a new, separate GitHub repo (e.g. `abdalrhman-chat-api`).
2. Inside it, create a folder named exactly `api` and put `chat.js` inside it
   (path should be `api/chat.js`).
3. Push that repo to GitHub.
4. Go to vercel.com → sign in with GitHub → "Add New Project" → import that repo.
5. Click Deploy (no configuration needed — Vercel detects `/api` automatically).

## 3. Add your API key in Vercel (not in the code)
1. In your new Vercel project → Settings → Environment Variables.
2. Add a variable:
   - Name: `OPENROUTER_API_KEY`
   - Value: your new key from step 0
3. Redeploy the project once (Deployments tab → ⋯ → Redeploy) so the
   variable takes effect.

## 4. Get your live API URL
After deployment, Vercel gives you a URL like:
`https://abdalrhman-chat-api.vercel.app`

Your chat endpoint is that URL + `/api/chat`, for example:
`https://abdalrhman-chat-api.vercel.app/api/chat`

## 5. Add the widget to your real portfolio site
In your actual `index.html` (and `scope.html` if you want it there too),
add these two lines right before `</body>`:

```html
<script type="module" src="ai-chat-widget.js"></script>
<abdalrhman-ai-chat api="https://abdalrhman-chat-api.vercel.app/api/chat"></abdalrhman-ai-chat>
```

Upload `ai-chat-widget.js` to the same repo as your portfolio (root level,
same place as your other `.js` files). You do **not** need to upload
`avatar.jpeg` again for the widget — the photo is already built into
`ai-chat-widget.js` itself.

## 6. Test it
Open your live GitHub Pages site (not a local file), hard-refresh
(Ctrl+Shift+R), and the chat bubble should appear above the WhatsApp
button. Ask it something about your projects to confirm it replies.

## If something breaks
Open the browser Console (F12) on your live site and check for a red
error. The two most common ones:
- **CORS error** → the Vercel URL in `api="..."` is wrong or not redeployed yet.
- **"Missing API key"** reply → the environment variable in step 3 wasn't saved or the project wasn't redeployed after adding it.
