# ProtectiveTeleLife Project Architecture

## Overview
Voice-based AI questionnaire system for insurance applications using Azure Communication Services (ACS) and Azure AI Foundry agents.

## Project Structure

```
/Users/user/Python Projects/ProtectiveTeleLife/
├── acs-agent/              # Agent Configuration Repository (GitHub: sur153/acs-agent)
├── acs-voice-test/         # Main Voice Application (GitHub: sur153/acs-voice-test)
├── docs/                   # Documentation
└── PROJECT_ARCHITECTURE.md # This file
```

---

## Repository 1: acs-agent (Agent Configuration)

**Repository**: https://github.com/sur153/acs-agent.git
**Location**: `/Users/user/Python Projects/ProtectiveTeleLife/acs-agent`

### Purpose
Defines and deploys the AI agent's **behavior, instructions, and tools** to Azure AI Foundry. This is the "brain" configuration.

### Key Files

| File | Purpose | When Used |
|------|---------|-----------|
| `agent.py` | **Production agent creator** - Creates `my-voic-agent` with full instructions | Run once or when updating agent behavior |
| `main.py` | **Test agent creator** - Creates `my-voic-agent-test` for testing | Development/testing |
| `QuestionListCopy.json` | TeleLife questionnaire data (Q1-Q10+) | Uploaded to vector store for agent to query |
| `requirements.txt` | Python dependencies: `azure-ai-projects`, `azure-identity`, `openai` | Installation |

### Agent Configuration Details

**Agent Name**: `my-voic-agent` (production)
**Model**: GPT-4o (configured via `AZURE_AI_MODEL_DEPLOYMENT_NAME` env var)

**Tools Connected**:
1. **MCP Tool**: `voicemcpserver`
   - URL: `https://voice-mcp-server-csg4e6dqh3f5ezf6.eastus2-01.azurewebsites.net/cosmos/`
   - Purpose: Submit collected data to Cosmos DB
   - Approval: `never` (auto-approved)

2. **File Search Tool**: Vector store with `QuestionListCopy.json`
   - Allows agent to query question structure
   - Enables dynamic question loading (Q1, Q2, etc.)

**Agent Instructions** (Summary):
- Voice-based questionnaire assistant
- Single agent handling: greeting, question flow, speech normalization, confirmation, validation, retries, branching, silence handling
- Greeting: "Hello! I'm here to help collect a few details from you." (once only)
- Question flow: Load via tool → Ask → Normalize → Confirm → Validate → Store → Next
- Silence handling: 3 retries with increasing urgency, then end conversation
- Final submission: Summary → Submit to Cosmos DB via MCP tool → Stop

### How to Update Agent

```bash
cd "/Users/user/Python Projects/ProtectiveTeleLife/acs-agent"

# Set environment variables in .env:
# AZURE_AI_PROJECT_ENDPOINT=...
# AZURE_AI_MODEL_DEPLOYMENT_NAME=...

# Update instructions in agent.py (lines 74-218)

# Deploy to Azure AI Foundry
python agent.py
```

---

## Repository 2: acs-voice-test (Voice Application)

**Repository**: https://github.com/sur153/acs-voice-test.git
**Location**: `/Users/user/Python Projects/ProtectiveTeleLife/acs-voice-test`

### Purpose
Handles **audio input/output, WebSocket connections, and UI** for voice conversations. This is the "body" that connects users to the agent.

### Key Files

#### Server
| File | Purpose | Key Functions |
|------|---------|---------------|
| `server.py` | Quart (async Flask) web server | `/` (UI), `/web/ws` (WebSocket), `/acs/*` (phone calls) |
| `app/handler/acs_media_handler.py` | Manages WebSocket to Azure Voice Live API | `connect()`, `_receiver_loop()`, `_sender_loop()` |
| `app/handler/acs_event_handler.py` | Handles ACS phone call events | `process_incoming_call()`, `process_callback_events()` |
| `user_functions.py` | Custom functions for agent | `submit_support_ticket()` |

#### Client
| File | Purpose | Key Features |
|------|---------|--------------|
| `static/index.html` | Web UI for voice interaction | Microphone capture, audio playback, real-time transcripts |
| `static/audio-processor.js` | AudioWorklet for audio playback | Ring buffer, PCM audio processing |

#### Configuration
| File | Purpose |
|------|---------|
| `.env` | Environment variables (API keys, endpoints) |
| `QuestionList.json` | Question data (served via MCP tool) |
| `requirements.txt` | Python dependencies |

### Audio Format Specifications

**WebSocket Audio**:
- Sample Rate: 24000 Hz
- Format: PCM 16-bit Int16
- Channels: Mono
- Transport: Binary WebSocket frames

**Voice Activity Detection (VAD) Settings** (in `acs_media_handler.py:session_config()`):
```python
"turn_detection": {
    "type": "azure_semantic_vad",
    "threshold": 0.5,                    # Voice detection sensitivity
    "prefix_padding_ms": 200,            # Audio before speech
    "silence_duration_ms": 200,          # Silence before response
    "remove_filler_words": True,
    "end_of_utterance_detection": {
        "model": "semantic_detection_v1",
        "threshold": 0.03,               # Sentence completion confidence
        "timeout": 1.2,                  # Max time for utterance
    }
}
```

### How to Run

```bash
cd "/Users/user/Python Projects/ProtectiveTeleLife/acs-voice-test"

# Install dependencies
uv pip install -r requirements.txt

# Start server
uv run server.py

# Open browser
open http://127.0.0.1:8000
```

### Current Features (Merged to Main)

**PR #1**: VAD latency optimizations
**PR #2**: Real-time transcript display
- User transcripts (green styling)
- AI transcripts (blue styling)
- Streaming transcripts with audio-synced reveal
- Auto-scroll to latest message

---

## How the System Works Together

### Architecture Flow

```
┌─────────────────────────────────────────────────────────────┐
│ 1. Agent Definition (acs-agent/agent.py)                    │
│    Run once to create/update agent configuration            │
└────────────────────────┬────────────────────────────────────┘
                         │ Deploys to
                         ▼
┌─────────────────────────────────────────────────────────────┐
│ Azure AI Foundry                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ Agent: my-voic-agent                                    │ │
│ │ - Instructions (340 lines)                              │ │
│ │ - Tools: MCP (Cosmos DB) + FileSearch (Questions)      │ │
│ └─────────────────────────────────────────────────────────┘ │
└────────────────────────┬────────────────────────────────────┘
                         │ Connected by
                         ▼
┌─────────────────────────────────────────────────────────────┐
│ 2. Voice Application (acs-voice-test/server.py)            │
│    Runs continuously                                         │
└────────────────────────┬────────────────────────────────────┘
                         │ WebSocket /web/ws
                         ▼
┌─────────────────────────────────────────────────────────────┐
│ Azure Voice Live API                                         │
│ - Real-time voice streaming (24kHz PCM)                     │
│ - Connects client audio <-> agent                           │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│ 3. Web Client (static/index.html)                          │
│    User's browser with microphone + speakers                │
└─────────────────────────────────────────────────────────────┘
```

### Message Flow Example

1. **User speaks**: "My name is Ravi"
2. **Browser** → Audio bytes → **WebSocket** → **acs_media_handler.py**
3. **acs_media_handler.py** → Base64 audio → **Azure Voice Live API**
4. **Azure Voice Live** → **my-voic-agent** (processes with instructions)
5. **Agent**: Normalizes "Ravi" → Calls MCP tool to get next question → Generates response
6. **Azure Voice Live** → Audio + Transcript → **acs_media_handler.py**
7. **acs_media_handler.py** → Browser receives:
   - Binary audio frames
   - JSON: `{"Kind": "TranscriptDelta", "Text": "I understood..."}`
   - JSON: `{"Kind": "TranscriptDone", "Text": "...R-A-V-I. Is that correct?"}`
8. **Browser** → Plays audio + displays streaming transcript synced to audio

---

## Development Workflow

### To Modify Agent Behavior
1. Edit `acs-agent/agent.py` (instructions, tools)
2. Run `python acs-agent/agent.py` to update Azure agent
3. No restart needed for `acs-voice-test` - connects to updated agent automatically

### To Modify Voice/UI Features
1. Edit files in `acs-voice-test/` (server, handlers, UI)
2. Commit to feature branch
3. Create PR to main
4. Restart server to pick up changes

### Branch Strategy (acs-voice-test)
- `main` - Production-ready code
- `feature/*` - New features
- `fix/*` - Bug fixes
- Create PR → Merge to main → Delete branch

---

## Environment Variables

### acs-agent/.env
```bash
AZURE_AI_PROJECT_ENDPOINT=https://v-foundryh2da.services.ai.azure.com/api/projects/voice-bot-projecth2da
AZURE_AI_MODEL_DEPLOYMENT_NAME=gpt-4o
```

### acs-voice-test/.env
```bash
AZURE_VOICE_LIVE_ENDPOINT=https://v-foundryh2da.cognitiveservices.azure.com/
AZURE_VOICE_LIVE_API_KEY=...
VOICE_LIVE_MODEL=gpt-4o-real-time
AZURE_VOICELIVE_AGENT_NAME=my-voic-agent
AZURE_VOICELIVE_PROJECT_NAME=voice-bot-projecth2da
ACS_CONNECTION_STRING=...
```

---

## Key Concepts

### MCP (Model Context Protocol)
- Standard for connecting AI agents to external tools/data sources
- `voicemcpserver` provides: question fetching + Cosmos DB submission
- Agent calls tools via natural language understanding (no explicit API calls in code)

### Voice Activity Detection (VAD)
- Azure's semantic VAD detects when user starts/stops speaking
- Tunable parameters control interruption behavior
- Balance: too sensitive = interrupts user, too lenient = slow responses

### Agent vs Application Separation
- **Agent**: Conversational logic, business rules, intelligence (Azure-hosted)
- **Application**: Infrastructure, audio I/O, WebSocket handling (self-hosted)
- Benefit: Update agent behavior without redeploying application

---

## Troubleshooting

### Agent repeating questions
- Issue: VAD settings too aggressive (silence_duration_ms too short)
- Solution: Increase `silence_duration_ms` and `end_of_utterance.timeout` in `session_config()`

### Transcription wrong language
- Issue: Auto-detection picking wrong language
- Solution: Set `input_audio_transcription.language = "en"` explicitly

### Agent not following instructions
- Issue: Instructions in Azure don't match code
- Solution: Re-run `agent.py` to sync latest instructions

### Server not picking up code changes
- Issue: Python process caches old code
- Solution: Restart server (kill process + `uv run server.py`)

---

## Future Planned Features

### Human Handoff (Planned)
- Detect when agent should transfer to human
- Display conversation summary
- Integration with ACS call transfer APIs

### Agent Improvements
- Better handling of spelling vs pronunciation
- Enhanced retry logic for validation failures
- Support for longer questionnaires (50+ questions)

---

## References

- Azure AI Foundry: https://ai.azure.com
- ACS Voice Test Repo: https://github.com/sur153/acs-voice-test
- Agent Config Repo: https://github.com/sur153/acs-agent
- Azure Voice Live API Docs: https://learn.microsoft.com/azure/ai-services/openai/realtime-audio
- MCP Protocol: https://modelcontextprotocol.io

---

**Last Updated**: 2025-12-30
**Primary Developer**: User (with Claude Code assistance)
**Project**: ProtectiveTeleLife Voice Questionnaire System
