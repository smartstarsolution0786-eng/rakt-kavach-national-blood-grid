# Cloudflare Pages Deployment & Environment Setup Guide

## Production Build Configuration

This repository is configured for seamless deployment to **Cloudflare Pages** with Supabase integration.

### Build Output
- **Build Command**: `pnpm run build:cloudflare`
- **Output Directory**: `artifacts/rakt-kavach/dist/public`
- **Node.js Version**: 20.x (recommended)

---

## Required Environment Variables for Cloudflare Pages

Set these in your **Cloudflare Pages Project Settings**:

### Supabase Configuration (Required)
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

**How to obtain these values:**
1. Navigate to your Supabase project: https://app.supabase.com/
2. Go to **Settings** → **API**
3. Copy your **Project URL** and **anon (public) key**
4. Add them to Cloudflare Pages environment variables

### Optional Environment Variables
```
# Sentry Error Tracking
VITE_SENTRY_DSN=

# Analytics
VITE_ANALYTICS_ID=

# Custom API Base
VITE_API_BASE_URL=
```

---

## Deployment Instructions

### Step 1: Connect Repository to Cloudflare Pages
1. Log in to Cloudflare Dashboard
2. Go to **Pages** → **Create a project**
3. Select **Connect to Git** → Choose your GitHub repository
4. Select **main** branch

### Step 2: Configure Build Settings
- **Framework preset**: None (custom)
- **Build command**: `pnpm run build:cloudflare`
- **Build output directory**: `artifacts/rakt-kavach/dist/public`
- **Root directory**: (leave empty)

### Step 3: Set Environment Variables
In Cloudflare Pages **Settings** → **Environment variables**:
- Add `VITE_SUPABASE_URL`
- Add `VITE_SUPABASE_ANON_KEY`
- Set for **Production** environment

### Step 4: Configure Custom Domain
1. Go to **Settings** → **Custom domains**
2. Add your domain: `rakthkavach.in`
3. Follow DNS configuration steps provided by Cloudflare

### Step 5: Deploy
- Push changes to `main` branch
- Cloudflare Pages will automatically trigger a build
- Monitor build status in Pages dashboard

---

## Build Process Details

### pnpm Configuration (.npmrc)
```
auto-install-peers=false
strict-peer-dependencies=false
frozen-lockfile=false
prefer-frozen-lockfile=false
shamefully-hoist=false
node-linker=node-modules
recursive-install=true
```

**Why these settings?**
- `frozen-lockfile=false`: Allows flexible installation in Cloudflare's ephemeral environment
- `node-linker=node-modules`: Compatible with Cloudflare's build cache
- `recursive-install=true`: Properly resolves monorepo workspace dependencies

### Build Script (build:cloudflare)
```bash
pnpm --config.shamefully-hoist=true install && pnpm run typecheck && pnpm -r --filter="./artifacts/rakt-kavach" run build
```

**Steps:**
1. Install dependencies with shamefully-hoist enabled (flattens node_modules)
2. Run TypeScript type checking across the monorepo
3. Build only the `artifacts/rakt-kavach` package
4. Output to `artifacts/rakt-kavach/dist/public`

### Vite Configuration (vite.config.ts)
- **Base path**: Configured with sensible defaults
- **Port**: Defaults to 5173 for local development
- **Output**: `dist/public` for Cloudflare Pages compatibility
- **strictPort**: `false` (prevents port conflicts in cloud environments)
- **fs.strict**: `false` (allows file access in build environments)

---

## Troubleshooting

### Build Fails with "ERR_PNPM_NO_LOCKFILE"
✅ **Fixed by**: `frozen-lockfile=false` in `.npmrc`

### Monorepo Workspace Not Detected
✅ **Fixed by**: `pnpm-workspace.yaml` configuration + `build:cloudflare` script

### TypeScript Errors in Build
✅ **Fixed by**: Running `pnpm run typecheck` before build

### Supabase Connection Failed
✅ **Check**: Environment variables set in Cloudflare Pages dashboard
✅ **Verify**: `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are correct

### Custom Domain Not Resolving
✅ **Check**: Cloudflare DNS configuration matches your registrar
✅ **Verify**: Domain is added to Cloudflare Pages custom domains list

---

## Local Development

### Setup
```bash
# Install dependencies
pnpm install

# Set environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase credentials
```

### Development Server
```bash
cd artifacts/rakt-kavach
PORT=5173 BASE_PATH=/ pnpm dev
```

### Build Locally
```bash
pnpm run build:cloudflare
```

### Preview Production Build
```bash
cd artifacts/rakt-kavach
PORT=5173 BASE_PATH=/ pnpm serve
```

---

## Monitoring & Maintenance

### Check Build Logs
1. Cloudflare Pages Dashboard → Your project
2. Go to **Deployments** tab
3. Click on any deployment to view logs

### Monitor Performance
1. Cloudflare Dashboard → **Analytics & Logs**
2. Track page load times and error rates

### Redeploy
Simply push to `main` branch:
```bash
git push origin main
```

Cloudflare Pages will automatically rebuild and deploy.

---

## Support & Resources

- 📚 [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- 🚀 [Supabase Documentation](https://supabase.com/docs)
- 📦 [pnpm Monorepo Guide](https://pnpm.io/workspaces)
- ⚡ [Vite Configuration](https://vitejs.dev/config/)

---

**Last Updated**: 2026-08-06
**Status**: ✅ Production Ready
