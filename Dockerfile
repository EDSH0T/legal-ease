# Legal-Ease — Dockerfile
# Uses the official Playwright image which has all Chromium dependencies pre-installed.
# Deploy to Railway, Render, or any Docker-compatible host.

FROM mcr.microsoft.com/playwright/node:20-jammy

WORKDIR /app

# Copy dependency manifests first (layer cache)
COPY package*.json ./

# Install Node dependencies
RUN npm install --omit=dev

# Install Playwright's Chromium browser
RUN npx playwright install chromium

# Copy application source
COPY . .

# The app listens on $PORT (Railway sets this automatically; default 3000)
EXPOSE 3000

# Health check — Railway uses this to detect readiness
HEALTHCHECK --interval=30s --timeout=10s --start-period=20s --retries=3 \
  CMD node -e "fetch('http://localhost:'+process.env.PORT||3000+'/api/health').then(r=>r.ok?process.exit(0):process.exit(1)).catch(()=>process.exit(1))"

CMD ["node", "server.js"]
