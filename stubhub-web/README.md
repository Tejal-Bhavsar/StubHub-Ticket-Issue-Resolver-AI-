# StubHub Resolution Agent

This is an AI-powered dispute resolution system for StubHub, built with Next.js and powered by a local LLM (Ollama).

## 🚀 Deployment (Docker)

The easiest way to host this project is using Docker. This bundles the frontend and the AI server together.

### Prerequisites
- Docker and Docker Compose installed.

### Start the Application
Run the following command in the project root:

```bash
docker-compose up -d --build
```

**Note:** The first startup will take a few minutes as it automatically downloads the `llama3` model for Ollama.

Access the application at: `http://localhost:3000`

---

## 🛠 Local Development

### 1. Requirements
- Node.js 20+
- [Ollama](https://ollama.com/) installed and running locally.
- Run `ollama pull llama3` to get the required model.

### 2. Run the App
```bash
cd stubhub-web
npm install
npm run dev
```

## ✨ Features
- **AI Dispute Resolution**: Analyzes buyer/seller messages and makes fair decisions.
- **Rich UI**: Interactive chat interface with clear status labels and icons.
- **Deep Context**: Integrates with mock order, seller, and buyer data to inform decisions.
- **Local Privacy**: All AI processing happens locally on your machine via Ollama.
