/**
 * Conversation Mode Component
 *
 * Unified chat and voice interaction in a single view.
 * Users can toggle between typing and speaking seamlessly.
 */

import { useState, useCallback, useEffect, useRef } from 'react';
import { useSession } from '@/contexts/SessionContext';
import { useAudio, useMicrophone } from '@/hooks';
import { UnifiedMessageList } from './UnifiedMessageList';
import { ModeToggle } from './ModeToggle';
import type { InputMethod } from '@/types';

export function ConversationMode() {
  const {
    messages,
    streamingText,
    isStreaming,
    voiceStatus,
    connectionStatus,
    sessionStarted,
    sendTextMessage,
    sendAudioData,
    sendSessionStart,
    onAudioData,
    setCurrentMode,
  } = useSession();

  // Local state for input mode (chat vs voice)
  const [inputMode, setInputMode] = useState<InputMethod>('voice'); // Default to voice
  const [textInput, setTextInput] = useState('');

  // Track if auto-start has already run (prevent double-trigger)
  const hasAutoStarted = useRef(false);

  // Audio playback hook
  const { initAudio, playAudio, stopPlayback } = useAudio();

  // Microphone capture hook
  const { startMicrophone, stopMicrophone, isRecording, error } = useMicrophone({
    onAudioData: sendAudioData,
  });

  // Subscribe to audio data from WebSocket and play it
  useEffect(() => {
    const unsubscribe = onAudioData((data: ArrayBuffer) => {
      playAudio(data);
    });
    return unsubscribe;
  }, [onAudioData, playAudio]);

  // Auto-start voice mode when session begins
  // This triggers the AI to introduce itself via voice
  useEffect(() => {
    console.log('[ConversationMode] Effect check - sessionStarted:', sessionStarted, 'connectionStatus:', connectionStatus, 'hasAutoStarted:', hasAutoStarted.current);

    const autoStartVoice = async () => {
      // Only run once when session starts and connection is ready
      if (!sessionStarted) {
        console.log('[ConversationMode] Skipping - session not started');
        return;
      }
      if (connectionStatus !== 'connected') {
        console.log('[ConversationMode] Skipping - not connected, status:', connectionStatus);
        return;
      }
      if (hasAutoStarted.current) {
        console.log('[ConversationMode] Skipping - already auto-started');
        return;
      }

      hasAutoStarted.current = true;
      console.log('[ConversationMode] Auto-starting voice session');

      try {
        // Initialize audio context (required for playback)
        console.log('[ConversationMode] Initializing audio...');
        await initAudio();

        // Start microphone for voice input
        console.log('[ConversationMode] Starting microphone...');
        await startMicrophone();

        // Small delay to ensure audio is ready before AI speaks
        await new Promise(resolve => setTimeout(resolve, 100));

        // Send trigger to backend - AI will introduce itself
        console.log('[ConversationMode] Sending session_start trigger...');
        sendSessionStart();
        console.log('[ConversationMode] session_start sent successfully');
      } catch (err) {
        console.error('[ConversationMode] Auto-start failed:', err);
        // Fall back to chat mode if voice fails
        setInputMode('chat');
      }
    };

    autoStartVoice();
  }, [sessionStarted, connectionStatus, initAudio, startMicrophone, sendSessionStart]);

  // Sync with session context mode
  useEffect(() => {
    setCurrentMode(inputMode === 'voice' ? 'voice' : 'chat');
  }, [inputMode, setCurrentMode]);

  // Handle mode toggle
  const handleModeChange = useCallback(async (mode: InputMethod) => {
    if (mode === inputMode) return;

    // Stop microphone if switching away from voice
    if (inputMode === 'voice' && isRecording) {
      stopMicrophone();
      stopPlayback();
    }

    setInputMode(mode);
  }, [inputMode, isRecording, stopMicrophone, stopPlayback]);

  // Handle text message send
  const handleSendText = useCallback(() => {
    if (!textInput.trim()) return;
    sendTextMessage(textInput.trim());
    setTextInput('');
  }, [textInput, sendTextMessage]);

  // Handle key press in text input
  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendText();
    }
  }, [handleSendText]);

  // Handle start recording
  const handleStartRecording = useCallback(async () => {
    try {
      await initAudio();
      await startMicrophone();
    } catch (err) {
      console.error('[ConversationMode] Failed to start recording:', err);
    }
  }, [initAudio, startMicrophone]);

  // Handle stop recording
  const handleStopRecording = useCallback(() => {
    stopMicrophone();
    stopPlayback();
  }, [stopMicrophone, stopPlayback]);

  // Get voice status text
  const getVoiceStatusText = (): string => {
    if (error) return `Error: ${error}`;
    if (!isRecording) return 'Click mic to start speaking';
    switch (voiceStatus) {
      case 'ai_speaking':
        return 'AI Assistant is speaking...';
      case 'user_speaking':
        return 'Listening to you...';
      case 'listening':
        return 'Listening... speak now';
      default:
        return 'Ready to listen';
    }
  };

  const isDisabled = connectionStatus !== 'connected';

  return (
    <div className="conversation-mode">
      {/* Unified message list */}
      <UnifiedMessageList
        messages={messages}
        streamingText={streamingText}
        isStreaming={isStreaming}
      />

      {/* Input area */}
      <div className="conversation-input-area">
        {/* Mode toggle */}
        <ModeToggle
          activeMode={inputMode}
          onModeChange={handleModeChange}
          disabled={isDisabled}
        />

        {/* Chat input (shown when chat mode active) */}
        {inputMode === 'chat' && (
          <div className="chat-input-container">
            <div className="input-wrapper">
              <textarea
                className="text-input"
                placeholder="Type your message..."
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isDisabled}
                rows={1}
              />
              <button
                className="action-btn send"
                onClick={handleSendText}
                disabled={isDisabled || !textInput.trim()}
                aria-label="Send message"
              >
                ➤
              </button>
            </div>
          </div>
        )}

        {/* Voice controls (shown when voice mode active) - Compact inline design */}
        {inputMode === 'voice' && (
          <div className="voice-input-compact">
            <div className="voice-status-indicator">
              {isRecording ? (
                <span className={`status-dot ${voiceStatus === 'ai_speaking' ? 'speaking' : 'recording'}`} />
              ) : null}
              <span className="voice-status-text-compact">{getVoiceStatusText()}</span>
            </div>
            <button
              className={`mic-button ${isRecording ? 'recording' : ''} ${voiceStatus === 'ai_speaking' ? 'ai-speaking' : ''}`}
              onClick={isRecording ? handleStopRecording : handleStartRecording}
              disabled={isDisabled}
              aria-label={isRecording ? 'Stop recording' : 'Start recording'}
            >
              {isRecording ? (
                voiceStatus === 'ai_speaking' ? '🔊' : '⏹️'
              ) : (
                '🎙️'
              )}
            </button>
          </div>
        )}

        {/* Quick actions */}
        <div className="quick-actions">
          <button className="quick-action" disabled={isDisabled}>
            ❓ Help
          </button>
          <button
            className="quick-action agent-btn"
            onClick={() => setCurrentMode('agent')}
            disabled={isDisabled}
          >
            👤 Talk to Agent
          </button>
        </div>
      </div>
    </div>
  );
}
