# Ramalingaiah KR — Portfolio

React + Vite. All content lives in `src/data.js`; layout code rarely needs touching.

## Run locally

```bash
npm install
npm run dev
```

## Deploy to GitHub Pages

Push to `main`. The workflow in `.github/workflows/deploy.yml` builds and
publishes automatically.

First-time setup, once per repo:

1. Push the code to GitHub.
2. Go to **Settings → Pages**.
3. Under **Source**, choose **GitHub Actions** (not "Deploy from a branch").
4. Push again, or run the workflow by hand from the **Actions** tab.

The site appears at `https://<user>.github.io/<repo>/` — or at
`https://<user>.github.io/` if the repo is named `<user>.github.io`.

### About the base path

Vite needs to know the sub-path the site is served from. `vite.config.js`
derives it from `GITHUB_REPOSITORY`, which Actions sets automatically, so both
repo layouts work with no edit. Locally and on Netlify it falls back to `/`.

If you ever deploy a build made on your own machine, set it explicitly:

```bash
GITHUB_REPOSITORY=user/repo npm run build
```

## Deploy to Netlify

Still works unchanged — `netlify.toml` is committed, base resolves to `/`.
