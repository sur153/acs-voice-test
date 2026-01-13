/**
 * Voice Controls Component
 *
 * Start/Stop buttons for voice recording.
 */

interface VoiceControlsProps {
  isRecording: boolean;
  onStartRecording: () => void;
  onStopRecording: () => void;
  disabled?: boolean;
}

export function VoiceControls({
  isRecording,
  onStartRecording,
  onStopRecording,
  disabled,
}: VoiceControlsProps) {
  return (
    <div className="voice-buttons">
      <button
        type="button"
        className="voice-btn start"
        onClick={onStartRecording}
        disabled={disabled || isRecording}
      >
        Start Talking
      </button>
      <button
        type="button"
        className="voice-btn stop"
        onClick={onStopRecording}
        disabled={disabled || !isRecording}
      >
        Stop
      </button>
    </div>
  );
}
