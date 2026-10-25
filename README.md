# Abdalrhman Mohammed — Portfolio

A lightweight, responsive portfolio built with plain HTML, CSS and JavaScript.
No build step, no framework. The AI chat assistant uses one small serverless
function (`api/chat.js`) so the API key is never exposed.

## Files

| File | What it does |
|---|---|
| `index.html` | Home page |
| `scope.html` + `scope.js` | Project detail page (opens from "View Full Scope") |
| `workflows.html` + `workflows.js` | Workflows page |
| `data.js` | **All home-page and project content** |
| `workflows-data.js` | **All content of the Workflows page** |
| `common.js` | Shared code (background, links, project images) |
| `app.js` | Home page rendering |
| `styles.css` | Styling for every page |
| `ai-chat-widget.js` | The chat bubble (add `<abdalrhman-ai-chat api="...">` to a page) |
| `api/chat.js` | Chat backend, deployed by Vercel (key lives in Vercel settings) |

## Add or change a project

Edit `data.js`. For the image, upload the PNG next to `index.html` and write
only its file name, for example `image: "task-manager.png"`.
If the file is not there yet, the site shows a clean workflow preview instead
of a broken image, and switches to your image as soon as you upload it.

## Add a workflow

Open `workflows-data.js`, copy one workflow object, paste it after the last one
and edit it. The instructions are at the top of that file.

## Chat assistant

- The API key is set in Vercel: Project, Settings, Environment Variables,
  `OPENROUTER_API_KEY`. Redeploy after changing it.
- Check it any time in the browser:
  - `https://YOUR-SITE.vercel.app/api/chat` shows whether the key is set.
  - `https://YOUR-SITE.vercel.app/api/chat?test=1` tries each model once and
    shows the exact error if one fails.
- Free OpenRouter models change over time. To change the model list without
  editing code, add the Vercel variable `OPENROUTER_MODELS`
  (comma separated, best first), for example `openai/gpt-4o-mini,openrouter/free`.
- When project content on the site changes, update the `KNOWLEDGE` text inside
  `api/chat.js` too, so the assistant knows about it.

## Before sharing the site

Replace the placeholder social URLs in `data.js` (`linkedin`, `github`, `upwork`).
Links that still contain `your-...` are hidden automatically.
