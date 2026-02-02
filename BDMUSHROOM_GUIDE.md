# 🍄 BDMushroom Developer & Deployment Guide

This document summarizes the configurations, optimizations, and deployment workflows implemented for the BDMushroom web application.

---

## 🛠️ 1. Environment & API Setup

### Local Environment (`.env`)
Ensure your `.env` file contains the following keys. Note the `VITE_` prefix which is required for the frontend to access them.
```env
VITE_WC_URL=https://api.bdmushroom.com
VITE_WC_KEY=your_consumer_key
VITE_WC_SECRET=your_consumer_secret
VITE_JWT_AUTH_URL=https://api.bdmushroom.com/wp-json/jwt-auth/v1/token
VITE_N8N_WEBHOOK_URL=https://your-n8n-webhook.com
```

### API Diagnostics
- Open the browser console to see the **"BD Mushroom API Initialization"** logs.
- If the API fails (CORS or Auth), the app automatically switches to **Offline Mode** and displays local mock data.

---

## 🌐 2. WordPress CORS Fix
To allow your local dev environment to communicate with the WordPress backend, add this to your WordPress `.htaccess` file:

```apache
<IfModule mod_headers.c>
    SetEnvIf Origin "^http(s)?://(.+\.)?(localhost:5173|localhost:8080)$" ORIGIN_SUB_DOMAIN=$0
    Header set Access-Control-Allow-Origin %{ORIGIN_SUB_DOMAIN}e env=ORIGIN_SUB_DOMAIN
    Header set Access-Control-Allow-Methods "GET, POST, OPTIONS, DELETE, PUT"
    Header set Access-Control-Allow-Headers "Origin, X-Requested-With, Content-Type, Accept, Authorization, X-WP-Nonce"
    Header set Access-Control-Allow-Credentials "true"
</IfModule>
```

---

## 📱 3. Mobile Optimization Highlights
- **Navbar**: Logo is left-aligned on mobile, center-aligned on desktop.
- **Menu Toggle**: The hamburger menu is now the "Green Stack Icon" on the right end for mobile.
- **Hero**: The heading now appears **above** the info box on mobile. The info box is **Green** on mobile and **Red** on desktop.
- **Product Grid**: Responsive columns (1 mobile, 2 tablet, 4 desktop).
- **Thumb-Friendly**: Buttons and touch targets are optimized (min 44px).
- **AI Chat**: Positioned higher on mobile to avoid blocking the "Add to Cart" or "Checkout" actions.

---

## 🚀 4. cPanel Deployment Workflow

### Step-by-Step Deployment
If you are using **Windows PowerShell**, use the `;` separator instead of `&&`.

1. **Build the production assets**:
   ```powershell
   npm run build
   ```

2. **Stage and Commit** (Force adding `dist` is required for cPanel):
   ```powershell
   git add .
   git add dist -f
   git commit -m "Production Build: $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
   ```

3. **Push to cPanel**:
   ```powershell
   git push origin main
   ```

4. **cPanel "Deploy" Button**:
   If the "Deploy" button in cPanel is grey/inactive, log into the **cPanel Terminal** and run:
   ```bash
   cd repositories/bdmushroom
   git reset --hard HEAD
   ```

---

## 📁 5. Key Configuration Files
- **`.cpanel.yml`**: Controls which files are moved to the public domain folder on deployment.
- **`public/.htaccess`**: Essential for React Router to work on Apache servers (prevents 404 on refresh).
- **`vite.config.ts`**: Uses `base: './'` for relative pathing on cPanel.
- **`src/lib/api.ts`**: Main API client configuration with fallback logic.
