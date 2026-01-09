# Design Notes: Chat → Voice → Agent Feature

## Technical Considerations

### Architecture Options

#### Option A: Single WebSocket, Multiple Modes
```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   React UI  │────▶│  WebSocket  │────▶│   Backend   │
│             │◀────│  (unified)  │◀────│  (FastAPI)  │
└─────────────┘     └─────────────┘     └─────────────┘
                           │
              ┌────────────┼────────────┐
              ▼            ▼            ▼
         Chat Mode    Voice Mode   Agent Mode
         (text ws)    (audio ws)   (text+notify)
```

**Pros:**
- Single connection, less overhead
- Seamless context preservation
- Simpler state management

**Cons:**
- Complex message routing
- Voice requires binary frames

#### Option B: Mode-Specific Connections
```
Chat:   /ws/chat   → Text messages only
Voice:  /ws/voice  → Audio + text transcripts
Agent:  /ws/agent  → Text + agent events
```

**Pros:**
- Cleaner separation of concerns
- Easier to scale independently
- Current voice implementation preserved

**Cons:**
- Need session sync across connections
- More complex frontend state

### Recommended: Hybrid Approach

1. **Keep existing voice WebSocket** (`/web/ws`) for audio
2. **Add chat WebSocket** (`/web/chat`) for text
3. **Share session via backend** (Redis/memory store)
4. **Agent mode reuses chat WS** with special message types

## Integration with Existing Code

### Current State (acs-voice-test)
```
/static/index.html     → Voice-only UI (to be replaced)
/static/audio-processor.js → Keep as-is
Backend endpoints:
  - /web/ws → Voice WebSocket (keep)
```

### New Structure
```
/static/
  index.html           → New unified UI (from mockup)
  audio-processor.js   → Keep existing
  app.js              → New: Mode switching logic
/api/
  chat.py             → New: Chat WebSocket handler
  session.py          → New: Session state management
  agent.py            → New: Agent queue/routing
```

## Session State Schema

```python
class ConversationSession:
    session_id: str
    user_id: Optional[str]
    current_mode: Literal["chat", "voice", "agent"]
    messages: List[Message]  # Full history
    underwriting_state: dict  # Current answers
    progress_percent: int
    started_at: datetime
    last_activity: datetime
    agent_id: Optional[str]  # If escalated

class Message:
    id: str
    mode: Literal["chat", "voice", "agent"]
    role: Literal["user", "ai", "agent", "system"]
    content: str
    timestamp: datetime
    audio_url: Optional[str]  # For voice messages
```

## Mode Transition Logic

### Chat → Voice
1. User clicks "Switch to Voice" or AI suggests it
2. Frontend requests microphone permission
3. Open voice WebSocket with session_id
4. Backend loads conversation context
5. AI: "Continuing from where we left off..."
6. Voice session inherits underwriting state

### Voice → Agent
1. User says "agent" or AI detects escalation need
2. Voice connection paused (not closed)
3. Agent queue WebSocket opened
4. Full transcript sent to agent dashboard
5. Agent connects, sees full context
6. Three-way audio bridge possible

### Agent → Chat/Voice
1. Agent can release back to AI
2. Notes added to conversation
3. User continues with AI (chat or voice)

## UI Components Needed

### 1. Mode Switcher
- Tab-style navigation
- Active mode indicator
- Disabled states for unavailable modes

### 2. Chat Interface
- Message bubbles (user/AI)
- Typing indicator
- Quick action buttons
- File upload (future)

### 3. Voice Interface
- Visual voice indicator (waveform)
- Real-time transcript
- Mute/unmute controls
- Switch to chat button

### 4. Agent Interface
- Queue position display
- Estimated wait time
- Agent info when connected
- Chat with agent

### 5. Shared Components
- Progress bar
- Conversation history (scrollable)
- Mode transition banners
- System messages

## Feasibility Assessment

| Aspect | Status | Notes |
|--------|--------|-------|
| Chat mode | Easy | Standard WebSocket text |
| Voice mode | Exists | Current implementation works |
| Agent queue | Medium | Needs queue system (Redis?) |
| Mode switching | Medium | Session sync required |
| Context preservation | Medium | Shared session store |
| Agent dashboard | New work | Separate app needed |
| Audio bridge | Complex | Future phase |

## Phased Implementation

### Phase 1: Chat + Voice (MVP)
- Add chat mode to existing UI
- Session state management
- Mode switching with context
- Keep existing voice backend

### Phase 2: Agent Escalation
- Agent queue system
- Agent dashboard (basic)
- Text-based agent chat
- Transcript handoff

### Phase 3: Enhanced Agent
- Audio bridge to agent
- Agent tools/CRM integration
- Analytics dashboard
- Quality monitoring

## Questions for Review

1. Should chat persist when switching to voice, or clear?
   - **Recommendation:** Persist - users want to see history

2. Can agent see real-time voice transcript?
   - **Recommendation:** Yes - helps them prepare

3. What triggers automatic voice suggestion?
   - Complex medical questions
   - Multiple clarification requests
   - User typing frustration signals (deletions, short answers)

4. How long to keep sessions active?
   - **Recommendation:** 30 min idle timeout, 24hr total max
