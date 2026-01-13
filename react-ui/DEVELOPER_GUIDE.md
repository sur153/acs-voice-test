# TeleLife Omnichannel UI - Developer Guide

## Overview

Build a React application with three communication modes (Chat, Voice, Agent) that share a unified WebSocket session. Users can seamlessly switch between modes without losing context.

---

## ASCII Wireframes

### Overall Layout Structure

```
┌─────────────────────────────────────────────────────────────┐
│                        HEADER                                │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  [Logo] TeleLife        [Connection Status: ●]      │    │
│  └─────────────────────────────────────────────────────┘    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│                      MODE TABS                              │
│  ┌─────────────┬─────────────┬─────────────┐               │
│  │    Chat     │    Voice    │    Agent    │               │
│  │    [●]      │    [●]      │    [●]      │               │
│  └─────────────┴─────────────┴─────────────┘               │
│         ▲              Status indicators                    │
│         └── Active tab highlighted                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│                                                             │
│                    CONTENT AREA                             │
│              (Changes based on mode)                        │
│                                                             │
│                                                             │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                       FOOTER                                │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  Protective Life Insurance | Secure Connection 🔒   │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

---

### Chat Mode

```
┌─────────────────────────────────────────────────────────────┐
│  [Logo] TeleLife                    Connected [●]           │
├─────────────────────────────────────────────────────────────┤
│  ┌───────────┐ ┌───────────┐ ┌───────────┐                 │
│  │   Chat    │ │   Voice   │ │   Agent   │                 │
│  │  [ACTIVE] │ │    [●]    │ │    [●]    │                 │
│  └───────────┘ └───────────┘ └───────────┘                 │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  MESSAGE HISTORY (scrollable)                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                                                     │   │
│  │  ┌──────────────────────────────┐                   │   │
│  │  │ Hello! How can I help you    │  ← AI Message     │   │
│  │  │ with your insurance today?   │    (left-aligned) │   │
│  │  └──────────────────────────────┘                   │   │
│  │                                                     │   │
│  │                   ┌──────────────────────────────┐  │   │
│  │   User Message →  │ I want to check my policy   │  │   │
│  │   (right-aligned) │ status                       │  │   │
│  │                   └──────────────────────────────┘  │   │
│  │                                                     │   │
│  │  ┌──────────────────────────────┐                   │   │
│  │  │ I can help with that. Let me │  ← AI Streaming   │   │
│  │  │ look up your policy...█      │    (typing indicator)│
│  │  └──────────────────────────────┘                   │   │
│  │                                                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  INPUT AREA                                                 │
│  ┌─────────────────────────────────────────────┐ ┌──────┐  │
│  │ Type your message...                        │ │ Send │  │
│  └─────────────────────────────────────────────┘ └──────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Chat Mode Features:**
- Messages displayed in bubbles (AI left, User right)
- Auto-scroll to latest message
- Streaming text with typing indicator (█ cursor)
- Enter key or Send button to submit
- Input disabled while AI is responding

---

### Voice Mode

```
┌─────────────────────────────────────────────────────────────┐
│  [Logo] TeleLife                    Connected [●]           │
├─────────────────────────────────────────────────────────────┤
│  ┌───────────┐ ┌───────────┐ ┌───────────┐                 │
│  │   Chat    │ │   Voice   │ │   Agent   │                 │
│  │    [●]    │ │  [ACTIVE] │ │    [●]    │                 │
│  └───────────┘ └───────────┘ └───────────┘                 │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│                    VOICE INTERFACE                          │
│                                                             │
│              ┌─────────────────────────┐                    │
│              │                         │                    │
│              │    VOICE VISUALIZER     │                    │
│              │                         │                    │
│              │    ╭─────────────────╮  │                    │
│              │    │   ◉ ◉ ◉ ◉ ◉    │  │  ← Animated bars   │
│              │    │   █ █ █ █ █    │  │    when speaking   │
│              │    │   █ █ █ █ █    │  │                    │
│              │    │   █ █ █ █ █    │  │                    │
│              │    ╰─────────────────╯  │                    │
│              │                         │                    │
│              └─────────────────────────┘                    │
│                                                             │
│              ┌─────────────────────────┐                    │
│              │  "Listening... speak    │  ← Status text     │
│              │        now"             │    (changes)       │
│              └─────────────────────────┘                    │
│                                                             │
│  TRANSCRIPT AREA                                            │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ User: I'd like to know about my premium             │   │
│  │ AI: Your current premium is $150/month. Would you   │   │
│  │     like me to explain the breakdown?               │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              [ End Voice Session ]                  │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Voice Mode States:**

```
STATE 1: Idle (Not started)
┌─────────────────────┐
│   ○ ○ ○ ○ ○        │  ← Empty circles
│   [ Start Voice ]   │
└─────────────────────┘

STATE 2: Listening (User can speak)
┌─────────────────────┐
│   ● ● ● ● ●        │  ← Pulsing animation
│   "Listening...     │
│    speak now"       │
└─────────────────────┘

STATE 3: AI Speaking
┌─────────────────────┐
│   █ █ █ █ █        │  ← Active bars animation
│   "AI is            │     (varying heights)
│    speaking..."     │
└─────────────────────┘

STATE 4: User Speaking (Barge-in)
┌─────────────────────┐
│   ▓ ▓ ▓ ▓ ▓        │  ← Different color
│   "You are          │
│    speaking..."     │
└─────────────────────┘
```

---

### Agent Mode

```
┌─────────────────────────────────────────────────────────────┐
│  [Logo] TeleLife                    Connected [●]           │
├─────────────────────────────────────────────────────────────┤
│  ┌───────────┐ ┌───────────┐ ┌───────────┐                 │
│  │   Chat    │ │   Voice   │ │   Agent   │                 │
│  │    [●]    │ │    [●]    │ │  [ACTIVE] │                 │
│  └───────────┘ └───────────┘ └───────────┘                 │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│                    AGENT QUEUE                              │
│                                                             │
│              ┌─────────────────────────┐                    │
│              │                         │                    │
│              │     QUEUE POSITION      │                    │
│              │                         │                    │
│              │    ┌───────────────┐    │                    │
│              │    │               │    │                    │
│              │    │      #3       │    │  ← Large number    │
│              │    │               │    │                    │
│              │    └───────────────┘    │                    │
│              │                         │                    │
│              │   "You are #3 in        │                    │
│              │    queue"               │                    │
│              │                         │                    │
│              │   Estimated wait:       │                    │
│              │   ~5 minutes            │                    │
│              │                         │                    │
│              └─────────────────────────┘                    │
│                                                             │
│              ┌─────────────────────────┐                    │
│              │  ████████░░░░░░░░░░░░░  │  ← Progress bar    │
│              │       Loading...        │                    │
│              └─────────────────────────┘                    │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ While you wait, you can continue chatting with      │   │
│  │ our AI assistant in Chat mode.                      │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              [ Cancel Request ]                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Agent Mode States:**

```
STATE 1: Not in Queue
┌─────────────────────────┐
│  Need human assistance? │
│  [ Request Agent ]      │
└─────────────────────────┘

STATE 2: In Queue (Waiting)
┌─────────────────────────┐
│       #3 in queue       │
│   Est. wait: ~5 min     │
│   ████████░░░░░░░░░░    │
│   [ Cancel Request ]    │
└─────────────────────────┘

STATE 3: Agent Connected
┌─────────────────────────┐
│   ● Agent Connected     │
│   Speaking with: Sarah  │
│   Duration: 02:35       │
│   [ End Call ]          │
└─────────────────────────┘
```

---

### Connection Status Indicator

```
┌──────────────────────────────────────┐
│  CONNECTION STATES                   │
├──────────────────────────────────────┤
│  ● Connected      (Green)            │
│  ● Connecting...  (Yellow, pulsing)  │
│  ● Reconnecting...(Orange, pulsing)  │
│  ● Disconnected   (Red)              │
│  ● Error          (Red, with icon)   │
└──────────────────────────────────────┘
```

---

### Mobile Responsive Layout (< 768px)

```
┌───────────────────────┐
│ [Logo]        [●]     │
├───────────────────────┤
│ ┌─────┬─────┬─────┐   │
│ │Chat │Voice│Agent│   │
│ └─────┴─────┴─────┘   │
├───────────────────────┤
│                       │
│    CONTENT AREA       │
│    (Full width)       │
│                       │
│                       │
│                       │
│                       │
│                       │
├───────────────────────┤
│ ┌─────────────┐┌────┐ │
│ │ Message...  ││Send│ │
│ └─────────────┘└────┘ │
└───────────────────────┘
```

---

## High-Level Task List

### Phase 1: Project Setup (Foundation)

- [ ] **1.1** Initialize React project with Vite and TypeScript
  ```bash
  npm create vite@latest telelife-ui -- --template react-ts
  ```
- [ ] **1.2** Install dependencies
  - React 18
  - TypeScript
  - CSS/Styling solution (Tailwind or CSS modules)
- [ ] **1.3** Set up project structure
  ```
  src/
  ├── components/
  │   ├── common/        # Shared components
  │   ├── Chat/          # Chat mode components
  │   ├── Voice/         # Voice mode components
  │   └── Agent/         # Agent mode components
  ├── contexts/          # React contexts
  ├── services/          # WebSocket, API services
  ├── hooks/             # Custom hooks
  ├── types/             # TypeScript interfaces
  └── styles/            # Global styles
  ```
- [ ] **1.4** Configure environment variables
  - `VITE_WS_URL` - WebSocket endpoint
  - `VITE_USE_MOCK` - Toggle mock service

---

### Phase 2: Core Infrastructure

- [ ] **2.1** Define TypeScript interfaces
  - Message types (user, ai, system)
  - WebSocket message protocol
  - Connection states
  - Voice states
  - Session state

- [ ] **2.2** Create WebSocket service
  - Connection management
  - Auto-reconnection with exponential backoff
  - Message parsing and routing
  - Error handling

- [ ] **2.3** Create Mock WebSocket service (for development)
  - Simulate connection lifecycle
  - Mock AI responses with streaming
  - Configurable delays

- [ ] **2.4** Create Session Context
  - Unified state for all modes
  - WebSocket connection handling
  - Message history management
  - Mode switching logic

---

### Phase 3: Common Components

- [ ] **3.1** Header component
  - Logo/branding
  - Connection status indicator
  - Status animations (pulsing, etc.)

- [ ] **3.2** Mode tabs component
  - Three tabs: Chat, Voice, Agent
  - Active state highlighting
  - Per-tab status indicators
  - Click handlers for mode switching

- [ ] **3.3** Footer component
  - Branding text
  - Security indicator

- [ ] **3.4** Loading/Spinner components
  - Connection loading
  - Message sending indicator

---

### Phase 4: Chat Mode

- [ ] **4.1** Message list component
  - Display message history
  - Differentiate AI vs User messages
  - Auto-scroll to bottom on new messages
  - Timestamp display (optional)

- [ ] **4.2** Message bubble component
  - AI messages (left-aligned, different color)
  - User messages (right-aligned, different color)
  - Streaming indicator for in-progress messages

- [ ] **4.3** Chat input component
  - Text input field
  - Send button
  - Enter key submission
  - Disable during AI response
  - Character limit (optional)

- [ ] **4.4** Streaming text handler
  - Accumulate TranscriptDelta messages
  - Display typing indicator
  - Finalize on TranscriptDone

---

### Phase 5: Voice Mode

- [ ] **5.1** Voice visualizer component
  - Animated bars/circles
  - Different animations per state:
    - Idle: Static
    - Listening: Gentle pulse
    - AI Speaking: Active animation
    - User Speaking: Different color/animation

- [ ] **5.2** Voice status display
  - Dynamic status text
  - State-based messaging:
    - "Click to start"
    - "Listening... speak now"
    - "AI is speaking..."
    - "You are speaking..."

- [ ] **5.3** Voice transcript component
  - Show recent exchanges
  - Real-time updates
  - Scrollable history

- [ ] **5.4** Voice control buttons
  - Start/Stop voice session
  - Mute toggle (optional)

- [ ] **5.5** Voice state management
  - Handle TranscriptDelta (AI speaking)
  - Handle TranscriptDone
  - Handle ResponseDone (back to listening)
  - Handle StopAudio (barge-in)

---

### Phase 6: Agent Mode

- [ ] **6.1** Queue display component
  - Large queue position number
  - "You are #X in queue" text
  - Estimated wait time

- [ ] **6.2** Progress indicator
  - Animated progress bar
  - Or spinning indicator

- [ ] **6.3** Request agent button
  - "Request Agent" when not in queue
  - "Cancel Request" when in queue

- [ ] **6.4** Agent connected view
  - Agent name display
  - Call duration timer
  - End call button

- [ ] **6.5** Queue state management
  - Request agent (send WebSocket message)
  - Handle queue updates
  - Handle agent connected
  - Handle agent disconnected

---

### Phase 7: Integration & Polish

- [ ] **7.1** Mode switching
  - Preserve message history across modes
  - Maintain WebSocket connection
  - Proper cleanup on mode change

- [ ] **7.2** Error handling
  - Connection error display
  - Reconnection UI
  - User-friendly error messages

- [ ] **7.3** Responsive design
  - Mobile layout (< 768px)
  - Tablet layout (768px - 1024px)
  - Desktop layout (> 1024px)

- [ ] **7.4** Accessibility
  - ARIA labels
  - Keyboard navigation
  - Screen reader support
  - Focus management

- [ ] **7.5** Performance optimization
  - Message list virtualization (for long histories)
  - Debounce input handlers
  - Memoize expensive components

---

### Phase 8: Testing & Documentation

- [ ] **8.1** Unit tests
  - Component rendering tests
  - Hook tests
  - Service tests

- [ ] **8.2** Integration tests
  - Mode switching flows
  - WebSocket message handling
  - User interaction flows

- [ ] **8.3** Documentation
  - Component API documentation
  - Setup instructions
  - Environment configuration guide

---

## WebSocket Message Protocol

### Messages FROM Server

```typescript
// AI is streaming text
{ Kind: 'TranscriptDelta', Text: 'H' }
{ Kind: 'TranscriptDelta', Text: 'e' }
{ Kind: 'TranscriptDelta', Text: 'l' }

// AI finished sending text (audio may still play)
{ Kind: 'TranscriptDone', Text: 'Hello! How can I help?' }

// AI completely finished responding
{ Kind: 'ResponseDone' }

// User interrupted AI (barge-in)
{ Kind: 'StopAudio' }

// Agent queue updates
{ Kind: 'QueueUpdate', Position: 3, EstimatedWait: 300 }
{ Kind: 'AgentConnected', AgentName: 'Sarah' }
{ Kind: 'AgentDisconnected' }
```

### Messages TO Server

```typescript
// Send chat message
{ Kind: 'UserMessage', Text: 'Hello', Mode: 'chat' }

// Start voice session
{ Kind: 'StartVoice' }

// Stop voice session
{ Kind: 'StopVoice' }

// Request human agent
{ Kind: 'RequestAgent' }

// Cancel agent request
{ Kind: 'CancelAgentRequest' }
```

---

## Color Palette (Suggested)

```
Primary Blue:     #007bff
Success Green:    #28a745
Warning Yellow:   #ffc107
Error Red:        #dc3545
AI Message BG:    #e8f4fd
User Message BG:  #007bff
Text Dark:        #333333
Text Light:       #666666
Border:           #e0e0e0
Background:       #f5f5f5
```

---

## Key Implementation Notes

1. **Single WebSocket Connection**: All three modes share ONE WebSocket connection. Don't create separate connections per mode.

2. **State Persistence**: Message history and session context persist when switching modes. User should be able to chat, switch to voice, and come back to chat with history intact.

3. **Voice Status Timing**:
   - `TranscriptDelta` → Set status to "AI is speaking"
   - `ResponseDone` → Set status back to "Listening"
   - `StopAudio` → User barged in, set status to "Listening"

4. **Streaming Text**: AI responses come character-by-character via `TranscriptDelta`. Accumulate them until `TranscriptDone`.

5. **Graceful Degradation**: If WebSocket disconnects, show reconnecting state and queue messages to send when reconnected.

---

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env`
4. Start development server: `npm run dev`
5. Open `http://localhost:3000`

Mock mode is enabled by default (`VITE_USE_MOCK=true`). Set to `false` to connect to real backend.
