/**
 * Service Configuration
 *
 * Environment-based configuration for development and production.
 */

export const config = {
  // WebSocket URL - set via environment variable in production
  wsUrl: import.meta.env.VITE_WS_URL || 'ws://localhost:8000/web/ws',

  // Use mock service for development without backend
  useMock: import.meta.env.VITE_USE_MOCK !== 'false',

  // Reconnection settings
  reconnect: {
    maxAttempts: 5,
    initialDelay: 1000,
    maxDelay: 30000,
    backoffMultiplier: 2,
  },

  // Audio settings
  audio: {
    sampleRate: 24000,
    channelCount: 1,
    bufferSize: 4096,
  },

  // Mock service settings (only used when useMock is true)
  mock: {
    responseDelay: 500,        // ms before AI starts responding
    streamingSpeed: 30,        // ms between characters
    connectionDelay: 800,      // ms to simulate connection
    useSpeechSynthesis: true,  // Use browser TTS for mock audio
  },
};

export type Config = typeof config;
