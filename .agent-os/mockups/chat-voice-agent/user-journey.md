# User Journey: Chat → Voice → Agent

## Context
- 77% of TeleLife applications are completed online
- Users start digitally, may need voice assistance, may escalate to human

## Journey Stages

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         APPLICANT JOURNEY                                │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌──────────┐      ┌──────────┐      ┌──────────┐                       │
│  │   CHAT   │ ──── │  VOICE   │ ──── │  AGENT   │                       │
│  │  (Text)  │      │  (Call)  │      │ (Human)  │                       │
│  └──────────┘      └──────────┘      └──────────┘                       │
│       │                 │                 │                              │
│       ▼                 ▼                 ▼                              │
│  • Quick Q&A       • Complex Qs       • Exceptions                      │
│  • Simple forms    • Clarifications   • Complaints                      │
│  • 77% users       • Accessibility    • Edge cases                      │
│  • Self-service    • Nuanced talk     • Final review                    │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

## Stage 1: Chat (Text-Based)

**Entry Point:** Landing page with chat widget
**User Actions:**
- Type questions about application
- Answer underwriting questions via text
- Upload documents if needed
- Request voice call if preferred

**AI Capabilities:**
- Answer FAQs instantly
- Guide through form completion
- Collect basic medical history
- Detect when voice might help

**Triggers to Voice:**
- User requests "Can I talk instead?"
- Complex medical scenario detected
- User shows frustration/confusion
- Accessibility need indicated

## Stage 2: Voice (AI Call)

**Entry Point:** User clicks "Switch to Voice" or AI suggests it
**Transition:**
- Context preserved (chat history transferred)
- Warm handoff: "I'll continue helping you by voice..."

**User Actions:**
- Speak naturally
- Answer complex questions verbally
- Provide nuanced medical details
- Request human if needed

**AI Capabilities:**
- Continue from chat context
- Handle complex branching questions
- Natural conversation flow
- Detect escalation signals

**Triggers to Agent:**
- User requests human explicitly
- Multiple failed understanding attempts
- Sensitive/emotional situation
- Policy exception needed
- User says "agent" or "human"

## Stage 3: Agent (Human)

**Entry Point:** Escalation from Voice or Chat
**Transition:**
- Full context passed to agent
- Summary of conversation displayed
- Agent sees chat + voice transcript

**Agent Capabilities:**
- Review full conversation history
- Handle exceptions
- Override AI decisions
- Complete complex cases
- Provide empathy for difficult situations

## UI Design Principles

### Mode Indicator
```
┌─────────────────────────────────────┐
│  [💬 Chat]  [🎙️ Voice]  [👤 Agent]  │
│      ●          ○           ○       │  ← Active mode highlighted
└─────────────────────────────────────┘
```

### Persistent Elements
- Conversation history visible across modes
- Progress indicator for underwriting
- Context never lost on mode switch

### Transition UX
- Smooth animation between modes
- Clear confirmation before switching
- "Continue where you left off" messaging

## Mockup Files

1. `mockup.html` - Interactive prototype
2. `user-journey.md` - This document
3. `design-notes.md` - Technical considerations
