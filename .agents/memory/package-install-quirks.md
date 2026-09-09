---
name: Package installation quirks
description: Replit workspace package-manager and registry constraints encountered while building the web artifact.
---

The workspace runtime may bootstrap the pnpm version declared in the root `packageManager` field, so that version must match the installed pnpm runtime before workflows can start. In this environment, package installation succeeds through the local Replit package firewall registry rather than the public npm registry.

**Why:** The public registry returned authorization errors and the mismatched pnpm version repeatedly attempted a failed bootstrap, preventing workflow startup.

**How to apply:** Check the root pnpm version declaration before installing dependencies or diagnosing a workflow that fails before Vite starts. Keep deployment-facing artifacts free of Replit-internal registry overrides; use a pinned pnpm version in external install commands.

Vite can emit stale bundles if previously built assets are left under an artifact's `public/assets` directory; keep that directory reserved for real public assets and verify the final `dist/public/assets` output contains only the current build.

**Why:** Old bundles under `public/` are copied into static output and can be served alongside the active bundle, while an internal registry URL is not reachable from external CI providers.

**How to apply:** Remove generated bundles from `public/assets`, clean `dist/public` when diagnosing duplicate output, and use the artifact's pinned lockfile for GitHub/Vercel builds.