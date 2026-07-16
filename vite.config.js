import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/**
 * Work out the base path automatically.
 *
 * The white-screen-on-deploy problem is always this setting. The rules:
 *   - Netlify / custom domain / user site  -> "/"
 *   - GitHub Pages project repo            -> "/<repo-name>/"
 *
 * GitHub Actions sets GITHUB_REPOSITORY to "owner/repo", so we can derive it
 * rather than hardcode it. Everywhere else falls back to "/".
 */
function resolveBase() {
  const repoSlug = process.env.GITHUB_REPOSITORY;
  if (!repoSlug) return "/"; // local dev, Netlify

  const [owner, repo] = repoSlug.split("/");

  // A "<user>.github.io" repo is served from the domain root.
  if (repo.toLowerCase() === `${owner.toLowerCase()}.github.io`) return "/";

  return `/${repo}/`;
}

export default defineConfig({
  base: resolveBase(),
  plugins: [react()],
});
