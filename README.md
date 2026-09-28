# Abdalrhman Mohammed — Portfolio

A lightweight, responsive, single-page portfolio built with plain HTML, CSS and JavaScript.

## Why this version?

It has no build step and no framework dependency, so it is very easy to edit and deploy for free.

## Files

- `index.html` — page structure
- `styles.css` — UI/UX and responsive styling
- `app.js` — rendering, animations, canvas background and interactions
- `data.js` — **all editable portfolio content**

## Edit your information

Open `data.js` and change:

- LinkedIn
- GitHub
- Upwork
- profile image
- projects
- video URLs
- live demo URLs
- project GitHub URLs
- skills

## Adding a project video

In `data.js`, change:

```js
video: ""
```

to something like:

```js
video: "videos/my-project-demo.mp4"
```

Then create:

```text
videos/
  my-project-demo.mp4
```

## Run locally

You can simply open `index.html`.

For a better local experience, use VS Code + Live Server.

## Free deployment

This project can be deployed on GitHub Pages, Netlify, Vercel, or Firebase Hosting.

No backend is required for the current portfolio.

## Important

Replace placeholder social URLs before publishing:

- `https://linkedin.com/in/your-profile`
- `https://github.com/your-username`
- `https://upwork.com/freelancers/~your-id`
