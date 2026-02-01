---
description: Deploying to cPanel
---

### Prerequisites
1. Ensure your cPanel account has **Git Version Control** enabled.
2. Ensure you have SSH access if you plan to build on the server.

### Deployment Workflow (Commit Build)
This is the recommended way if your cPanel server doesn't have Node.js or if you want faster deployments.

1. **Build the project locally**:
   ```bash
   npm run build
   ```
2. **Remove `dist` from `.gitignore` temporarily** (or use `git add dist -f`):
   ```bash
   git add dist -f
   git commit -m "Build: Production assets"
   ```
3. **Push to cPanel's remote repo**:
   ```bash
   git push origin main
   ```

### cPanel Configuration
The project is already configured with:
- `vite.config.ts`: `base: './'` for relative asset paths.
- `public/.htaccess`: Handles React Router (SPA) routing on Apache.
- `.cpanel.yml`: Automatically moves files from `dist` to your domain folder on push.

### Folder Structure
- `/src`: Local development files.
- `/public`: Static assets and `.htaccess`.
- `/dist`: (Generated) Production-ready files for cPanel.
- `.env`: Local development variables.
- `.env.production`: Production variables used during `npm run build`.
