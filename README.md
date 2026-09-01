# ✦ NEXA — Autonomous AI Personal Assistant & Command Center

![NEXA Banner](https://img.shields.io/badge/NEXA-AI%20Assistant-9333EA?style=for-the-badge&logo=openai&logoColor=white)
![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![n8n](https://img.shields.io/badge/n8n.io-Workflow%20Automation-EA4B71?style=for-the-badge&logo=n8n&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Gemini_3.5_Flash-4285F4?style=for-the-badge&logo=google&logoColor=white)

**NEXA** is a futuristic, executive-grade AI Personal Assistant and Automation Command Center. Designed with an AI-first conversational interface, it seamlessly bridges human natural language with deep ecosystem integrations across Google Workspace, web intelligence, and automated background workflows.

---

## ✨ Key Features

- 🧠 **Multi-Tool Autonomous AI Agent**: Powered by **Google Gemini 3.5 Flash-lite** and **LangChain** inside n8n with 15-turn conversation buffer memory.
- 📅 **Google Calendar Management**: Natural language scheduling, conflict checks, and event lookups with strict timezone synchronization (Asia/Kolkata IST).
- ✉️ **Gmail Executive Automation**: Inbox scanning, intelligent summarization, and email drafting.
- 📊 **Expense & Finance Tracking**: Automated expense logging and real-time calculations directly into Google Sheets.
- 📝 **Google Docs & Tasks Integration**: Note creation, continuous document append, and structured task management.
- 🎙 **Real-Time Voice Input**: Native Web Speech API integration with an animated audio visualizer.
- 🔐 **Zero-Trust Passcode Security**: Dynamic client-side master passcode lock with a frosted glass background preview.
- 🎨 **Futuristic Glassmorphic UI**: Ultra-dark `#07080C` aesthetics, electric purple ambient glows, dynamic suggestion chips, and interactive automation flowcards.

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    NEXA Frontend UI                     │
│  (React 19 + TypeScript + Vite + Tailwind CSS + Lucide) │
└────────────────────────────┬────────────────────────────┘
                             │  HTTP POST / JSON
                             ▼
┌─────────────────────────────────────────────────────────┐
│                  n8n Automation Engine                  │
│       (LangChain Agent + Gemini 3.5 Flash-lite)         │
└──────┬──────────┬──────────┬──────────┬──────────┬──────┘
       │          │          │          │          │
       ▼          ▼          ▼          ▼          ▼
   Google     Google      Google     Google     SerpApi
  Calendar     Gmail      Sheets      Tasks      Search
```

---

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/AKSHITA142/Nexa.git
cd Nexa
```

### 2. Run the Frontend
```bash
cd frontend
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Connect n8n Backend
1. Start your local n8n container (`docker run -d -p 5678:5678 n8nio/n8n:latest`).
2. Import `Personal_Assistant_Workflow.json` into n8n.
3. Authenticate your Google OAuth credentials and click **Publish**.
4. In NEXA **Settings**, verify the webhook URL is connected.

---

## 🔒 Security & Privacy

- **Zero Hardcoded Secrets**: All credentials and master access passcodes are dynamically initialized and stored client-side in private local storage.
- **Session Protection**: 1-click lock button in the sidebar to secure sensitive emails and calendars from unauthorized access.

---

## 👩‍💻 Author

Developed by **[Akshita Jariwala](https://github.com/AKSHITA142)**
