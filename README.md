# Legal-Ease

Indian court case management platform with **live eCourts data**.

## What it is

A web app that scrapes real case data from `hcservices.ecourts.gov.in` using Playwright (a real Chromium browser), so it bypasses CORS restrictions and handles captchas. The frontend is served by the same Express server.

**Supported courts:** Madras HC (51 case types), Bombay HC, Delhi HC, Karnataka HC, Allahabad HC

**Features:**
- Live eCourts search: by case number, act, order date, cause list
- Captcha handling: image shown in browser, you type the answer
- Case tracking with real refresh
- PDF tools (merge, split, rotate, watermark, page numbers, compress, protect, etc.) — 100% local/browser-side
- AI Legal Assistant (Claude API, routed through backend)
- Role-based login (Judge, Lawyer, Litigant, Admin)

---

## Run locally

```bash
npm install
npx playwright install chromium
cp .env.example .env   # add your ANTHROPIC_API_KEY
npm start
# Open http://localhost:3000
```

---

## Deploy to Railway (free)

1. Push this folder to a GitHub repo
2. Go to railway.app → New Project → Deploy from GitHub repo
3. Add env var: ANTHROPIC_API_KEY = your-key
4. Deploy — Railway detects the Dockerfile automatically

---

## Environment variables

| Variable            | Required     | Notes                          |
|---------------------|--------------|-------------------------------|
| ANTHROPIC_API_KEY   | For AI only  | console.anthropic.com         |
| PORT                | No           | Defaults to 3000               |

---

## How captcha works

1. Playwright navigates to eCourts headlessly
2. Captcha image is extracted and sent to the browser as base64
3. You type the answer in the app UI
4. Server fills it in and returns real results
5. Cookies saved for 2 hours (no repeat captchas)

---

## Project structure

```
server.js          ← Express server (entry point)
scraper.js         ← Playwright scraper for eCourts  
session.js         ← Cookie persistence (2h sessions)
renderer/
  legal-ease.html  ← Frontend (served by Express)
Dockerfile         ← Railway/Render deployment
.env.example       ← Env var template
```
