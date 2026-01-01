# Project Context for AI Agents

> This file provides essential context for AI agents working on this codebase.
> Read this first to understand the project before making changes.

---

## Project Overview

**TeleLife Conversational AI POC** is a voice-based automation system for Protective Life Insurance. It conducts structured underwriting interviews through an AI agent capable of phone conversations.

**Key Constraint**: This is an 8-week POC (Dec 17, 2025 - Feb 11, 2026) with limited scope. Focus only on the defined scenarios.

---

## What We're Building

A voice agent that can:
1. Answer phone calls (via Azure Communication Services)
2. Conduct structured medical interviews
3. Navigate branching question logic
4. Handle ambiguous responses
5. Generate interview summaries

---

## POC Scope Limitations

**In Scope** (20 questions, 3 scenarios):
- Blood Pressure screening
- Diabetes/Respiratory screening
- Cardiovascular screening

**Out of Scope**:
- Full 5,000 question questionnaire
- Real customer data
- Production deployment
- Integration with Protective systems

---

## Existing Code Overview

```
acs-voice-test/
├── server.py              # Main Quart app (DO NOT restructure)
├── app/
│   └── handler/
│       ├── acs_event_handler.py    # Call handling
│       └── acs_media_handler.py    # Voice streaming (CORE)
├── QuestionList.json      # Current questionnaire (EXPAND THIS)
├── static/                # Web client for testing
└── requirements.txt       # Python dependencies
```

---

## Key Technical Patterns

### Voice Streaming Flow
```
Phone Call → ACS → WebSocket → Voice Handler → Azure Voice Live → GPT-4o → TTS → Caller
```

### Session Configuration (acs_media_handler.py:23-60)
The session config controls VAD, noise suppression, voice, etc. Modify carefully.

### Questionnaire Format (QuestionList.json)
```json
{
  "Q1": {
    "text": "Question text",
    "type": "choice|text|date",
    "choices": ["Option1", "Option2"],  // for choice type
    "meta": {"section": "...", "subsection": "..."},
    "next": "Q2"  // or conditional object
  }
}
```

---

## Environment Requirements

```bash
# Required environment variables
AZURE_VOICE_LIVE_API_KEY=...
AZURE_VOICE_LIVE_ENDPOINT=...
VOICE_LIVE_MODEL=gpt-4o-mini
ACS_CONNECTION_STRING=...
AZURE_VOICELIVE_PROJECT_NAME=...
AZURE_VOICELIVE_AGENT_NAME=...
```

---

## Important Files to Read First

1. `/.agent-os/product/mission-lite.md` - What we're building
2. `/.agent-os/product/tech-stack.md` - Technologies used
3. `/.agent-os/tasks/active-sprint.md` - Current work
4. `/acs-voice-test/server.py` - Entry point
5. `/acs-voice-test/app/handler/acs_media_handler.py` - Core voice logic

---

## Coding Guidelines for This Project

1. **Preserve existing patterns** - Match the coding style in acs_media_handler.py
2. **Use async/await** - This is an async Quart app
3. **Log appropriately** - Use the existing logging pattern
4. **Keep changes minimal** - POC has limited time
5. **Test locally first** - Use web client before phone testing
6. **Document decisions** - Update decisions.md for significant choices

---

## Common Tasks

### Adding a new question type
1. Update QuestionList.json schema
2. Add validation in validators.py
3. Update question_flow.py to handle type

### Modifying voice behavior
1. Edit session_config() in acs_media_handler.py
2. Test with web client first
3. Validate VAD behavior

### Adding a new endpoint
1. Add route in server.py
2. Keep async pattern
3. Log entry and exit

---

## Testing Instructions

### Web Client Testing
```bash
cd acs-voice-test
uv run server.py
# Open http://127.0.0.1:8000
```

### Phone Testing (requires DevTunnel)
```bash
devtunnel login
devtunnel create --allow-anonymous
devtunnel port create -p 8000
devtunnel host
# Update .env with tunnel URL
```

---

## Stakeholder Context

- **Lauren** - Process Owner, needs demo Jan 5th walkthrough
- **Dustin Dew** - SME for questionnaire validation
- **Lars Boeing** - Project sponsor
- **Heath Jackson** - Protective technical contact

---

## Timeline Reminders

- **Dec 17**: POC kickoff
- **Jan 5**: Lauren walkthrough (if available)
- **Jan 14**: End of Sprint 2 (first iteration)
- **Jan 28**: End of Sprint 3 (testing complete)
- **Feb 11**: Final demo and executive summary
