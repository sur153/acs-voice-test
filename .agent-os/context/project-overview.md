# Project Quick Reference

## Two Repositories - One System

### 1. acs-agent (Agent Configuration)
**Path**: `/Users/user/Python Projects/ProtectiveTeleLife/acs-agent`
**GitHub**: https://github.com/sur153/acs-agent.git
**Purpose**: Define AI agent's brain (instructions, tools, behavior)

**Key Files**:
- `agent.py` - Production agent creator (run once to deploy)
- `main.py` - Test agent creator
- `QuestionListCopy.json` - Question data

**Agent Details**:
- Name: `my-voic-agent`
- Tools: MCP (Cosmos DB), FileSearch (Questions)
- Instructions: 340 lines of voice questionnaire logic

### 2. acs-voice-test (Voice Application)
**Path**: `/Users/user/Python Projects/ProtectiveTeleLife/acs-voice-test`
**GitHub**: https://github.com/sur153/acs-voice-test.git
**Purpose**: Handle audio I/O, WebSocket, UI

**Key Files**:
- `server.py` - Quart web server
- `app/handler/acs_media_handler.py` - WebSocket to Azure Voice Live
- `static/index.html` - Web UI with transcripts
- `QuestionList.json` - Question data (served via MCP)

**Current Branch**: `main`
**Running Server**: http://127.0.0.1:8000 (if started)

---

## Quick Commands

### Run Voice App
```bash
cd "/Users/user/Python Projects/ProtectiveTeleLife/acs-voice-test"
uv run server.py
```

### Update Agent
```bash
cd "/Users/user/Python Projects/ProtectiveTeleLife/acs-agent"
python agent.py  # Updates my-voic-agent in Azure
```

### Git Operations
```bash
# Check status
git status

# Create feature branch
git checkout -b feature/my-feature

# Commit and push
git add .
git commit -m "feat: description"
git push -u origin feature/my-feature

# Create PR
gh pr create --title "..." --body "..."
```

---

## Architecture

```
User Browser
    ↕ WebSocket
acs-voice-test Server
    ↕ WebSocket
Azure Voice Live API
    ↕ Connects to
my-voic-agent (in Azure AI Foundry)
    ↕ Uses Tools
MCP Server (voicemcpserver) + Questions (FileSearch)
```

---

## Important Settings

### VAD Configuration
Location: `acs-voice-test/app/handler/acs_media_handler.py:session_config()`
- `threshold`: 0.5 (voice detection sensitivity)
- `silence_duration_ms`: 200 (ms of silence before responding)
- `end_of_utterance.timeout`: 1.2s (max utterance time)

### Audio Format
- Sample Rate: 24000 Hz
- Format: PCM 16-bit Int16
- Channels: Mono

---

## Development Notes

**Agent Changes**: Edit `acs-agent/agent.py` → Run it → Agent updates in Azure (no restart needed)

**App Changes**: Edit `acs-voice-test/*` → Restart server → Changes live

**Merged Features**:
- ✅ Real-time transcript display (user + AI)
- ✅ Streaming transcripts with audio-sync
- ✅ VAD latency optimizations

---

For complete documentation, see: `/Users/user/Python Projects/ProtectiveTeleLife/PROJECT_ARCHITECTURE.md`
