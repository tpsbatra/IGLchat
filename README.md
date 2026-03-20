# I Gift Life — Voice & Chat Assistant

A multilingual voice + text chatbot for organ donation awareness, powered by Claude AI.

## Project Structure

```
igiftlife-bot/
├── src/
│   ├── App.jsx          ← Main chatbot UI
│   └── main.jsx         ← React entry point
├── api/
│   └── chat.js          ← Vercel serverless function (keeps API key secret)
├── public/
│   ├── knowledge-base.xlsx  ← Your Q&A spreadsheet (all sheets auto-loaded)
│   └── logo.png             ← Your NGO logo (shown in header + bot avatar)
├── index.html
├── package.json
├── vite.config.js
└── .env.example
```

## Setup

### 1. Add your files to /public

- Replace `public/knowledge-base.xlsx` with your actual spreadsheet
  - Each sheet = one topic/category
  - Columns: **Question** | **Answer**
- Replace `public/logo.png` with your NGO logo

### 2. Get an Anthropic API Key

1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Create an account and go to **API Keys**
3. Click **Create Key** and copy it

### 3. Deploy to Vercel

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → Import from GitHub
3. In Vercel project settings → **Environment Variables**, add:
   ```
   ANTHROPIC_API_KEY = your_key_here
   ```
4. Click **Deploy** — done!

### Local Development

```bash
npm install
cp .env.example .env
# Add your API key to .env
npm run dev
```

## Features

- Voice input (Chrome/Edge) + text input
- Multilingual — auto-detects user language, responds in kind
- Loads KB automatically from /public/knowledge-base.xlsx
- Conversation memory — bot remembers context within a session
- Semantic matching — finds closest answer even if wording differs
- Suggested questions on startup
- Thumbs up/down feedback on each answer
- Contact details always visible
- Strict guardrails — only answers from KB, no medical/legal advice

## Contact

- Phone/WhatsApp: 9011032370
- Website: www.igiftlife.com
