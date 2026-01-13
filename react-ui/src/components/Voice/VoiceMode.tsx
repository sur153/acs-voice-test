/**
 * Voice Mode Component
 *
 * Real-time voice interaction with visualizer and transcript display.
 * Handles microphone capture, audio playback, and WebSocket communication.
 */

import { useEffect, useCallback } from 'react';
import { useSession } from '@/contexts/SessionContext';
import { useAudio, useMicrophone } from '@/hooks';
import { VoiceVisualizer } from './VoiceVisualizer';
import { VoiceControls } from './VoiceControls';
import { TranscriptList } from './TranscriptList';

export function VoiceMode() {
  const {
    voiceStatus,
    messages,
    connectionStatus,
    sendAudioData,
    onAudioData,
    streamingText,
    isStreaming,
  } = useSession();

  // Audio playback hook
  const { initAudio, playAudio, stopPlayback } = useAudio();

  // Microphone capture hook
  const { startMicrophone, stopMicrophone, isRecording, error } = useMicrophone({
    onAudioData: sendAudioData,
  });

  // Filter messages for voice mode display
  const voiceMessages = messages.filter(
    (msg) => msg.mode === 'voice' || msg.role === 'system'
  );

  /**
   * Subscribe to audio data from WebSocket and play it
   */
  useEffect(() => {
    const unsubscribe = onAudioData((data: ArrayBuffer) => {
      playAudio(data);
    });
    return unsubscribe;
  }, [onAudioData, playAudio]);

  /**
   * Handle start recording - initialize audio and start microphone
   */
  const handleStartRecording = useCallback(async () => {
    try {
      // Initialize audio system (must be after user gesture)
      await initAudio();
      // Start microphone capture
      await startMicrophone();
    } catch (err) {
      console.error('[VoiceMode] Failed to start recording:', err);
    }
  }, [initAudio, startMicrophone]);

  /**
   * Handle stop recording - stop microphone but keep audio ready
   */
  const handleStopRecording = useCallback(() => {
    stopMicrophone();
    stopPlayback();
  }, [stopMicrophone, stopPlayback]);

  /**
   * Get status text based on current state
   */
  const getStatusText = (): string => {
    if (error) {
      return `Error: ${error}`;
    }
    if (connectionStatus !== 'connected') {
      return 'Connecting...';
    }
    if (!isRecording) {
      return 'Click Start Talking to begin';
    }
    switch (voiceStatus) {
      case 'ai_speaking':
        return 'AI is speaking...';
      case 'user_speaking':
        return 'Listening...';
      case 'listening':
        return 'Listening... speak now';
      default:
        return 'Ready';
    }
  };

  return (
    <div className="voice-mode">
      <div className="voice-area">
        <VoiceVisualizer
          status={voiceStatus}
          isRecording={isRecording}
        />
        <div className="voice-status">{getStatusText()}</div>
        <VoiceControls
          isRecording={isRecording}
          onStartRecording={handleStartRecording}
          onStopRecording={handleStopRecording}
          disabled={connectionStatus !== 'connected'}
        />
      </div>

      <TranscriptList
        messages={voiceMessages}
        streamingText={streamingText}
        isStreaming={isStreaming}
      />
    </div>
  );
}
