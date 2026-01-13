# TeleLife React UI

React implementation of the TeleLife omnichannel voice bot interface.

## Overview

This UI provides three interaction modes for life insurance applications:

- **Chat Mode**: Text-based conversation with streaming AI responses
- **Voice Mode**: Real-time speech interaction with Azure Voice Live API
- **Agent Mode**: Human agent escalation with queue management

## Getting Started

```bash
# Install dependencies
npm install

# Start development server (with mock backend)
npm run dev

# Build for production
npm run build

# Run tests
npm test
```

## Project Structure

```
src/
├── components/          # React components
│   ├── Chat/           # Chat mode components
│   ├── Voice/          # Voice mode components
│   ├── Agent/          # Agent mode components
│   └── common/         # Shared components
├── hooks/              # Custom React hooks
├── contexts/           # React context providers
├── services/           # API and WebSocket services
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── styles/             # Global styles
```

## Integration with Backend

When ready to connect to the real backend:

1. Set environment variable:
   ```
   VITE_WS_URL=ws://localhost:8000/web/ws
   VITE_USE_MOCK=false
   ```

2. Build and copy to backend static folder:
   ```bash
   npm run build
   cp -r dist/* ../acs-voice-test/static/
   ```

## WebSocket Message Protocol

### Outgoing Messages (Client → Server)

| Type | Format | Description |
|------|--------|-------------|
| Text Input | `{type: "text_input", text: "..."}` | Chat message |
| Audio Data | `ArrayBuffer` (binary) | Voice audio chunks |
| Ping | `{type: "ping"}` | Keep-alive |

### Incoming Messages (Server → Client)

| Kind | Format | Description |
|------|--------|-------------|
| TranscriptDelta | `{Kind: "TranscriptDelta", Text: "..."}` | Streaming AI text |
| TranscriptDone | `{Kind: "TranscriptDone", Text: "..."}` | Final AI response |
| UserTranscription | `{Kind: "UserTranscription", Text: "..."}` | User speech transcribed |
| ResponseDone | `{Kind: "ResponseDone"}` | AI finished responding |
| StopAudio | `{Kind: "StopAudio"}` | Stop audio playback (barge-in) |
| AudioData | `ArrayBuffer` (binary) | AI voice audio |

## Development Mode

The mock service simulates:
- WebSocket connection lifecycle
- Streaming text responses
- Simulated audio (uses Web Speech API for TTS)
- Response delays matching real API

Toggle mock mode in `src/services/config.ts`.

## Key Requirements

1. **Single WebSocket Connection**: Chat and Voice share one connection
2. **Session Persistence**: Context preserved across mode switches
3. **Streaming Display**: Show AI responses as they arrive
4. **Voice Status**: Toggle between "Listening" and "AI Speaking"
5. **Offline Handling**: Queue messages when disconnected

## Design Reference

See `docs/design-spec.md` for UI specifications and mockups.
