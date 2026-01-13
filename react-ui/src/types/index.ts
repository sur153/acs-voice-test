/**
 * TeleLife Type Definitions
 *
 * These types define the contract between the React UI and the backend.
 * Do not modify without coordinating with backend team.
 */

// =============================================================================
// Interaction Modes
// =============================================================================

export type InteractionMode = 'chat' | 'voice' | 'agent';

// =============================================================================
// WebSocket Messages - Outgoing (Client → Server)
// =============================================================================

export interface TextInputMessage {
  type: 'text_input';
  text: string;
}

export interface PingMessage {
  type: 'ping';
}

export type OutgoingMessage = TextInputMessage | PingMessage;

// Binary audio data is sent as ArrayBuffer, not JSON

// =============================================================================
// WebSocket Messages - Incoming (Server → Client)
// =============================================================================

export interface TranscriptDeltaMessage {
  Kind: 'TranscriptDelta';
  Text: string;
}

export interface TranscriptDoneMessage {
  Kind: 'TranscriptDone';
  Text: string;
}

export interface UserTranscriptionMessage {
  Kind: 'UserTranscription';
  Text: string;
}

export interface ResponseDoneMessage {
  Kind: 'ResponseDone';
}

export interface StopAudioMessage {
  Kind: 'StopAudio';
}

export interface PongMessage {
  Kind: 'Pong';
}

export type IncomingMessage =
  | TranscriptDeltaMessage
  | TranscriptDoneMessage
  | UserTranscriptionMessage
  | ResponseDoneMessage
  | StopAudioMessage
  | PongMessage;

// Binary audio data is received as ArrayBuffer

// =============================================================================
// Connection State
// =============================================================================

export type ConnectionStatus =
  | 'disconnected'
  | 'connecting'
  | 'connected'
  | 'reconnecting'
  | 'error';

export type VoiceStatus =
  | 'idle'           // Not started
  | 'listening'      // User can speak
  | 'ai_speaking'    // AI is responding
  | 'user_speaking'; // User is speaking (VAD detected)

// =============================================================================
// Conversation
// =============================================================================

export interface Message {
  id: string;
  role: 'user' | 'ai' | 'system';
  content: string;
  timestamp: Date;
  mode: InteractionMode;
  isStreaming?: boolean;
}

export interface ConversationState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}

// =============================================================================
// Audio
// =============================================================================

export interface AudioConfig {
  sampleRate: number;
  channelCount: number;
  echoCancellation: boolean;
  noiseSuppression: boolean;
  autoGainControl: boolean;
}

export const DEFAULT_AUDIO_CONFIG: AudioConfig = {
  sampleRate: 24000,
  channelCount: 1,
  echoCancellation: true,
  noiseSuppression: true,
  autoGainControl: true,
};

// =============================================================================
// Agent Queue
// =============================================================================

export interface AgentQueueState {
  position: number;
  estimatedWait: string;
  agentName: string | null;
  status: 'queued' | 'connecting' | 'connected' | 'disconnected';
}

// =============================================================================
// Application Progress
// =============================================================================

export interface ApplicationProgress {
  percentage: number;
  currentSection: string;
  sectionsCompleted: string[];
}

// =============================================================================
// Session State (for persistence)
// =============================================================================

export interface SessionState {
  conversationHistory: Message[];
  currentMode: InteractionMode;
  applicationProgress: ApplicationProgress;
  lastActivity: Date;
}

// =============================================================================
// Component Props
// =============================================================================

export interface ChatInputProps {
  onSendMessage: (text: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export interface VoiceVisualizerProps {
  status: VoiceStatus;
  audioLevel?: number; // 0-1
  onClick?: () => void;
}

export interface MessageBubbleProps {
  message: Message;
  isStreaming?: boolean;
}

export interface ModeTabsProps {
  activeMode: InteractionMode;
  onModeChange: (mode: InteractionMode) => void;
  connectionStatus: ConnectionStatus;
}
