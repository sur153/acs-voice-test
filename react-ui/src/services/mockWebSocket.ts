/**
 * Mock WebSocket Service
 *
 * Simulates backend WebSocket behavior for development without backend.
 * Provides realistic delays, streaming responses, and audio simulation.
 */

import { config } from './config';
import type { IncomingMessage, OutgoingMessage } from '@/types';

type MessageHandler = (data: string | ArrayBuffer) => void;
type StatusHandler = (status: 'open' | 'close' | 'error') => void;

// Sample AI responses for the insurance application flow
const MOCK_RESPONSES: Record<string, string> = {
  default: "I'm here to help you with your life insurance application. What would you like to know?",
  greeting: "Hello! Thank you for choosing Protective Life. My name is Sarah, and I'll be helping you with your life insurance application today. Before we begin, I need to let you know that this conversation may be recorded for quality assurance. Do you consent to proceed?",
  consent: "Wonderful! Let's get started. I'll be asking you some questions about your personal information, health history, and lifestyle. This helps us find the best coverage for your needs. First, can you tell me your full legal name as it appears on your ID?",
  name: "Thank you. Let me make sure I have that right. Could you please spell your first name for me?",
  age: "Perfect, thank you. And what is your date of birth?",
  health: "I appreciate you sharing that. Now I'll ask a few questions about your health history. In the past 5 years, have you been diagnosed with or treated for any heart conditions, diabetes, or cancer?",
  lifestyle: "Thank you for that information. Do you currently use any tobacco products, including cigarettes, cigars, vaping, or chewing tobacco?",
  coverage: "Based on what you've told me, I can see several coverage options that might work well for you. Would you like me to explain the differences between term life and whole life insurance?",
};

function getResponse(input: string): string {
  const lower = input.toLowerCase();

  if (lower.includes('hello') || lower.includes('hi') || lower.includes('start')) {
    return MOCK_RESPONSES.greeting;
  }
  if (lower.includes('yes') && lower.includes('consent')) {
    return MOCK_RESPONSES.consent;
  }
  if (lower.match(/my name is|i am|i'm/)) {
    return MOCK_RESPONSES.name;
  }
  if (lower.match(/\d{1,2}\/\d{1,2}\/\d{2,4}|\d{4}/)) {
    return MOCK_RESPONSES.health;
  }
  if (lower.includes('no') && (lower.includes('condition') || lower.includes('health'))) {
    return MOCK_RESPONSES.lifestyle;
  }
  if (lower.includes('coverage') || lower.includes('policy') || lower.includes('insurance')) {
    return MOCK_RESPONSES.coverage;
  }

  return MOCK_RESPONSES.default;
}

export class MockWebSocket {
  private onMessageHandler: MessageHandler | null = null;
  private onStatusHandler: StatusHandler | null = null;
  private isConnected = false;
  private streamingTimeout: ReturnType<typeof setTimeout> | null = null;

  // Mirror WebSocket.readyState constants
  public static readonly CONNECTING = 0;
  public static readonly OPEN = 1;
  public static readonly CLOSING = 2;
  public static readonly CLOSED = 3;

  // Expose readyState for compatibility with WebSocket API
  get readyState(): number {
    return this.isConnected ? MockWebSocket.OPEN : MockWebSocket.CLOSED;
  }

  constructor() {
    // Simulate connection delay
    setTimeout(() => {
      this.isConnected = true;
      this.onStatusHandler?.('open');
    }, config.mock.connectionDelay);
  }

  onMessage(handler: MessageHandler): void {
    this.onMessageHandler = handler;
  }

  onStatus(handler: StatusHandler): void {
    this.onStatusHandler = handler;
  }

  send(data: string | ArrayBuffer): void {
    if (!this.isConnected) {
      console.warn('[MockWS] Cannot send - not connected');
      return;
    }

    // Handle binary audio data (just acknowledge it in mock)
    if (data instanceof ArrayBuffer) {
      // In mock mode, we don't process audio
      // Real backend would transcribe and respond
      return;
    }

    // Parse JSON message
    try {
      const message: OutgoingMessage = JSON.parse(data);

      if (message.type === 'ping') {
        this.sendResponse({ Kind: 'Pong' });
        return;
      }

      if (message.type === 'text_input') {
        this.simulateAIResponse(message.text);
      }
    } catch (e) {
      console.error('[MockWS] Failed to parse message:', e);
    }
  }

  close(): void {
    this.isConnected = false;
    if (this.streamingTimeout) {
      clearTimeout(this.streamingTimeout);
    }
    this.onStatusHandler?.('close');
  }

  private sendResponse(message: IncomingMessage): void {
    this.onMessageHandler?.(JSON.stringify(message));
  }

  private async simulateAIResponse(userInput: string): Promise<void> {
    const response = getResponse(userInput);

    // Simulate processing delay
    await this.delay(config.mock.responseDelay);

    // Stream the response character by character
    let currentText = '';
    for (const char of response) {
      currentText += char;
      this.sendResponse({
        Kind: 'TranscriptDelta',
        Text: char,
      });
      await this.delay(config.mock.streamingSpeed);
    }

    // Send completion
    this.sendResponse({
      Kind: 'TranscriptDone',
      Text: response,
    });

    // Simulate audio playback duration (roughly 100ms per word)
    const wordCount = response.split(' ').length;
    const audioDuration = wordCount * 100;

    // Use browser TTS if enabled
    if (config.mock.useSpeechSynthesis && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(response);
      utterance.rate = 1.0;
      utterance.onend = () => {
        this.sendResponse({ Kind: 'ResponseDone' });
      };
      window.speechSynthesis.speak(utterance);
    } else {
      // Just wait for estimated duration
      await this.delay(audioDuration);
      this.sendResponse({ Kind: 'ResponseDone' });
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => {
      this.streamingTimeout = setTimeout(resolve, ms);
    });
  }
}

// Factory function to create WebSocket (real or mock)
export function createWebSocket(url: string): WebSocket | MockWebSocket {
  if (config.useMock) {
    console.log('[WebSocket] Using mock service');
    return new MockWebSocket();
  }

  console.log('[WebSocket] Connecting to:', url);
  return new WebSocket(url);
}
