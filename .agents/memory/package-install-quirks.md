---
name: Package installation quirks
description: Replit workspace package-manager and registry constraints encountered while building the web artifact.
---

The workspace runtime may bootstrap the pnpm version declared in the root `packageManager` field, so that version must match the installed pnpm runtime before workflows can start. In this environment, package installation succeeds through the local Replit package firewall registry rather than the public npm registry.

**Why:** The public registry returned authorization errors and the mismatched pnpm version repeatedly attempted a failed bootstrap, preventing workflow startup.

**How to apply:** Check the root pnpm version declaration and the artifact `.npmrc` before installing dependencies or diagnosing a workflow that fails before Vite starts.