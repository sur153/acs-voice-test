/**
 * Session Context
 *
 * Provides unified WebSocket session management across all components.
 * Handles connection lifecycle, message routing, and state management.
 */

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import { createWebSocket, MockWebSocket } from '@/services/mockWebSocket';
import { config } from '@/services/config';
import type {
  ConnectionStatus,
  VoiceStatus,
  InteractionMode,
  Message,
  IncomingMessage,
} from '@/types';

// =============================================================================
// Context Types
// =============================================================================

interface SessionContextValue {
  // Connection
  connectionStatus: ConnectionStatus;
  connect: () => void;
  disconnect: () => void;

  // Session lifecycle
  sessionStarted: boolean;
  startSession: () => void;

  // Messaging
  sendTextMessage: (text: string) => void;
  sendAudioData: (data: ArrayBuffer) => void;
  sendSessionStart: () => void;

  // State
  voiceStatus: VoiceStatus;
  currentMode: InteractionMode;
  setCurrentMode: (mode: InteractionMode) => void;

  // Conversation
  messages: Message[];
  streamingText: string;
  isStreaming: boolean;

  // Callbacks for components to subscribe to events
  onTranscriptDelta: (callback: (text: string) => void) => () => void;
  onAudioData: (callback: (data: ArrayBuffer) => void) => () => void;
}

const SessionContext = createContext<SessionContextValue | null>(null);

// =============================================================================
// Provider Component
// =============================================================================

interface SessionProviderProps {
  children: ReactNode;
}

export function SessionProvider({ children }: SessionProviderProps) {
  // Connection state
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('disconnected');
  const wsRef = useRef<WebSocket | MockWebSocket | null>(null);
  const reconnectAttempts = useRef(0);
  const reconnectTimeout = useRef<ReturnType<typeof setTimeout>>();

  // Session lifecycle state
  const [sessionStarted, setSessionStarted] = useState(false);

  // Voice state
  const [voiceStatus, setVoiceStatus] = useState<VoiceStatus>('idle');
  const [currentMode, setCurrentMode] = useState<InteractionMode>('chat');
  const currentModeRef = useRef<InteractionMode>(currentMode);

  // Keep ref in sync with state
  useEffect(() => {
    currentModeRef.current = currentMode;
  }, [currentMode]);

  // Conversation state
  const [messages, setMessages] = useState<Message[]>([]);
  const [streamingText, setStreamingText] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);

  // Event subscribers
  const transcriptCallbacks = useRef<Set<(text: string) => void>>(new Set());
  const audioCallbacks = useRef<Set<(data: ArrayBuffer) => void>>(new Set());

  // Generate unique message IDs
  const generateId = () => `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  // ---------------------------------------------------------------------------
  // Message Handling
  // ---------------------------------------------------------------------------

  const handleMessage = useCallback((event: MessageEvent) => {
    // Use ref to get current mode (avoids stale closure)
    const mode = currentModeRef.current;

    // Handle binary audio data
    if (event.data instanceof ArrayBuffer) {
      console.log('[Session] Received binary audio data, mode:', mode, 'size:', event.data.byteLength, 'callbacks:', audioCallbacks.current.size);
      // Always play audio when we receive it (session has started means we want audio)
      setVoiceStatus('ai_speaking');
      if (audioCallbacks.current.size > 0) {
        audioCallbacks.current.forEach((cb) => cb(event.data));
      } else {
        console.warn('[Session] No audio callbacks registered to play audio!');
      }
      return;
    }

    // Handle JSON messages
    try {
      const message: IncomingMessage = JSON.parse(event.data);
      console.log('[Session] Received message:', message.Kind);

      switch (message.Kind) {
        case 'TranscriptDelta':
          setIsStreaming(true);
          setStreamingText((prev) => prev + message.Text);
          if (mode === 'voice') {
            setVoiceStatus('ai_speaking');
          }
          transcriptCallbacks.current.forEach((cb) => cb(message.Text));
          break;

        case 'TranscriptDone':
          setIsStreaming(false);
          setMessages((prev) => [
            ...prev,
            {
              id: generateId(),
              role: 'ai',
              content: message.Text,
              timestamp: new Date(),
              mode: mode,
            },
          ]);
          setStreamingText('');
          break;

        case 'UserTranscription':
          setMessages((prev) => [
            ...prev,
            {
              id: generateId(),
              role: 'user',
              content: message.Text,
              timestamp: new Date(),
              mode: 'voice',
              inputMethod: 'voice',
            },
          ]);
          break;

        case 'ResponseDone':
          if (mode === 'voice') {
            setVoiceStatus('listening');
          }
          break;

        case 'StopAudio':
          if (mode === 'voice') {
            setVoiceStatus('listening');
          }
          break;

        case 'Pong':
          // Keep-alive acknowledged
          break;
      }
    } catch (e) {
      console.error('[Session] Failed to parse message:', e);
    }
  }, []);

  // ---------------------------------------------------------------------------
  // Connection Management
  // ---------------------------------------------------------------------------

  const connect = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      return;
    }

    setConnectionStatus('connecting');

    const ws = createWebSocket(config.wsUrl);
    wsRef.current = ws;

    // Handle native WebSocket
    if (ws instanceof WebSocket) {
      ws.binaryType = 'arraybuffer';

      ws.onopen = () => {
        setConnectionStatus('connected');
        reconnectAttempts.current = 0;
        if (currentModeRef.current === 'voice') {
          setVoiceStatus('listening');
        }
      };

      ws.onmessage = handleMessage;

      ws.onclose = () => {
        setConnectionStatus('disconnected');
        setVoiceStatus('idle');
        attemptReconnect();
      };

      ws.onerror = () => {
        setConnectionStatus('error');
      };
    }
    // Handle MockWebSocket
    else {
      ws.onStatus((status) => {
        if (status === 'open') {
          setConnectionStatus('connected');
          reconnectAttempts.current = 0;
          if (currentModeRef.current === 'voice') {
            setVoiceStatus('listening');
          }
        } else if (status === 'close') {
          setConnectionStatus('disconnected');
          setVoiceStatus('idle');
        } else if (status === 'error') {
          setConnectionStatus('error');
        }
      });

      ws.onMessage((data) => {
        handleMessage({ data } as MessageEvent);
      });
    }
  }, [handleMessage]);

  const disconnect = useCallback(() => {
    if (reconnectTimeout.current) {
      clearTimeout(reconnectTimeout.current);
    }
    wsRef.current?.close();
    wsRef.current = null;
    setConnectionStatus('disconnected');
    setVoiceStatus('idle');
  }, []);

  // Start session - user explicitly begins the application
  // Defaults to voice mode for natural conversation experience
  const startSession = useCallback(() => {
    console.log('[Session] startSession called, connectionStatus:', connectionStatus);
    setSessionStarted(true);
    setCurrentMode('voice');
    // Ensure connection is established
    if (connectionStatus !== 'connected') {
      console.log('[Session] Not connected, initiating connection...');
      connect();
    } else {
      console.log('[Session] Already connected, session started');
    }
  }, [connectionStatus, connect]);

  const attemptReconnect = useCallback(() => {
    if (reconnectAttempts.current >= config.reconnect.maxAttempts) {
      setConnectionStatus('error');
      return;
    }

    const delay = Math.min(
      config.reconnect.initialDelay * Math.pow(config.reconnect.backoffMultiplier, reconnectAttempts.current),
      config.reconnect.maxDelay
    );

    setConnectionStatus('reconnecting');
    reconnectAttempts.current++;

    reconnectTimeout.current = setTimeout(() => {
      connect();
    }, delay);
  }, [connect]);

  // ---------------------------------------------------------------------------
  // Sending Messages
  // ---------------------------------------------------------------------------

  const sendTextMessage = useCallback((text: string) => {
    if (!wsRef.current || connectionStatus !== 'connected') {
      console.warn('[Session] Cannot send - not connected');
      return;
    }

    // Add user message to conversation with inputMethod
    setMessages((prev) => [
      ...prev,
      {
        id: generateId(),
        role: 'user',
        content: text,
        timestamp: new Date(),
        mode: currentModeRef.current,
        inputMethod: 'chat',
      },
    ]);

    // Send via WebSocket
    const message = JSON.stringify({ type: 'text_input', text });
    wsRef.current.send(message);
  }, [connectionStatus]);

  const sendAudioData = useCallback((data: ArrayBuffer) => {
    if (!wsRef.current || connectionStatus !== 'connected') {
      return;
    }
    wsRef.current.send(data);
  }, [connectionStatus]);

  // Send session start trigger - prompts AI to introduce itself
  // This doesn't add to conversation history (AI response will be added via TranscriptDone)
  const sendSessionStart = useCallback(() => {
    if (!wsRef.current || connectionStatus !== 'connected') {
      console.warn('[Session] Cannot send session_start - not connected');
      return;
    }
    console.log('[Session] Sending session_start trigger');
    const message = JSON.stringify({ type: 'session_start' });
    wsRef.current.send(message);
  }, [connectionStatus]);

  // ---------------------------------------------------------------------------
  // Event Subscriptions
  // ---------------------------------------------------------------------------

  const onTranscriptDelta = useCallback((callback: (text: string) => void) => {
    transcriptCallbacks.current.add(callback);
    return () => {
      transcriptCallbacks.current.delete(callback);
    };
  }, []);

  const onAudioData = useCallback((callback: (data: ArrayBuffer) => void) => {
    audioCallbacks.current.add(callback);
    return () => {
      audioCallbacks.current.delete(callback);
    };
  }, []);

  // ---------------------------------------------------------------------------
  // Auto-connect on mount
  // ---------------------------------------------------------------------------

  useEffect(() => {
    connect();
    return () => {
      disconnect();
    };
  }, []);

  // ---------------------------------------------------------------------------
  // Cleanup on unmount
  // ---------------------------------------------------------------------------

  useEffect(() => {
    return () => {
      if (reconnectTimeout.current) {
        clearTimeout(reconnectTimeout.current);
      }
    };
  }, []);

  // ---------------------------------------------------------------------------
  // Context Value
  // ---------------------------------------------------------------------------

  const value: SessionContextValue = {
    connectionStatus,
    connect,
    disconnect,
    sessionStarted,
    startSession,
    sendTextMessage,
    sendAudioData,
    sendSessionStart,
    voiceStatus,
    currentMode,
    setCurrentMode,
    messages,
    streamingText,
    isStreaming,
    onTranscriptDelta,
    onAudioData,
  };

  return (
    <SessionContext.Provider value={value}>
      {children}
    </SessionContext.Provider>
  );
}

// =============================================================================
// Hook
// =============================================================================

export function useSession(): SessionContextValue {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
}
