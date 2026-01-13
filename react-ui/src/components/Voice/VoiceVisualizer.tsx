/**
 * Voice Visualizer Component
 *
 * Animated circle showing voice status (listening/speaking).
 */

import type { VoiceStatus } from '@/types';

interface VoiceVisualizerProps {
  status: VoiceStatus;
  isRecording: boolean;
  audioLevel?: number; // 0-1
  onClick?: () => void;
}

export function VoiceVisualizer({
  status,
  isRecording,
  audioLevel = 0,
  onClick,
}: VoiceVisualizerProps) {
  const getClassName = (): string => {
    const classes = ['voice-visualizer'];

    if (status === 'ai_speaking') {
      classes.push('speaking');
    } else if (isRecording) {
      classes.push('recording');
    }

    return classes.join(' ');
  };

  return (
    <div
      className={getClassName()}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`Voice status: ${status}`}
      style={{
        // Optional: scale based on audio level
        transform: isRecording ? `scale(${1 + audioLevel * 0.1})` : undefined,
      }}
    >
      <span className="mic-icon">🎙️</span>
    </div>
  );
}
