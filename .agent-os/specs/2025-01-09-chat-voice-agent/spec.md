# Spec: Chat-Voice-Agent Omnichannel UI

**Created:** 2025-01-09
**Status:** Implementation
**Branch:** feature/chat-voice-agent

## Overview

Redesign the TeleLife landing page to support three interaction modes (Chat, Voice, Agent) while preserving all existing voice functionality. Enable the 77% of online applicants to start with chat and seamlessly switch modes as needed.

## User Stories

### 1. Online Applicant Starting with Chat
As an applicant completing my application online, I want to start with text chat so that I can quickly answer questions without speaking.

### 2. Switching to Voice for Complex Questions
As an applicant answering complex medical questions, I want to switch to voice so that I can explain nuanced details more naturally.

### 3. Escalating to Human Agent
As an applicant with exceptional circumstances, I want to speak with a human agent so that my unique situation can be handled properly.

## Scope

### In Scope
1. New unified UI with mode tabs (Chat/Voice/Agent)
2. Chat mode with text input and AI responses
3. Voice mode preserving ALL existing functionality
4. Agent escalation UI with queue display
5. Mode switching with visual feedback
6. Conversation history visible across modes

### Out of Scope (Future)
- Backend chat API (will simulate for now)
- Agent routing/dashboard
- Audio bridge to agent
- Persistent conversation storage

## Implementation Phases

### Phase 1: Setup & Backup
- Create feature branch: `feature/chat-voice-agent`
- Backup existing `index.html` → `index.original.html`
- Verify rollback works

### Phase 2: UI Shell
- Create new `index.html` with mode tabs structure
- Voice mode as default (to verify existing works)
- Empty chat/agent placeholders

### Phase 3: Voice Integration
- Migrate ALL existing JavaScript to new UI
- Ensure WebSocket, audio, transcripts work exactly as before
- Test voice functionality thoroughly

### Phase 4: Chat Mode
- Add chat input area
- Message bubble display
- Quick action buttons
- Simulated AI responses (demo mode)

### Phase 5: Agent Escalation
- Agent mode UI
- Queue position display
- Simulated connection flow

### Phase 6: Polish & Test
- Mode switching animations
- System messages for transitions
- Cross-mode testing
- Session context update

## Rollback Strategy

```
feature/chat-voice-agent  ← New implementation
     │
     ├── index.original.html  ← Original backup
     │
feature/task-tracker-setup  ← Previous stable
     │
main  ← Clean slate
```

**To rollback:**
```bash
# Option 1: Restore backup
cp index.original.html index.html

# Option 2: Checkout previous branch
git checkout feature/task-tracker-setup

# Option 3: Reset to main
git checkout main
```

## Success Criteria

- [ ] All existing voice functionality works unchanged
- [ ] Can type chat messages and see responses
- [ ] Can switch between all three modes
- [ ] Conversation history preserved on switch
- [ ] No console errors
- [ ] Responsive on mobile
