/**
 * Landing Screen Component
 *
 * "Ready to Begin" screen shown before user starts the application.
 * Inspired by Protective Life's voice application prototype.
 */

import { useSession } from '@/contexts/SessionContext';

export function LandingScreen() {
  const { connectionStatus, startSession } = useSession();

  const isConnecting = connectionStatus === 'connecting' || connectionStatus === 'reconnecting';
  const isReady = connectionStatus === 'connected';
  const hasError = connectionStatus === 'error';

  const handleStart = () => {
    startSession();
  };

  return (
    <div className="landing-screen">
      <div className="landing-content">
        {/* Large Mic Icon */}
        <div className={`landing-mic-icon ${isConnecting ? 'connecting' : ''}`}>
          <span className="mic-symbol">🎙️</span>
        </div>

        {/* Heading */}
        <h1 className="landing-title">Ready to Begin</h1>

        {/* Description */}
        <p className="landing-description">
          This questionnaire will ask about your medical history using voice or chat interaction.
          Please ensure you are in a quiet environment and speak clearly.
        </p>

        {/* Connection Status */}
        {isConnecting && (
          <p className="landing-status connecting">Connecting to AI Assistant...</p>
        )}
        {hasError && (
          <p className="landing-status error">Connection error. Please try again.</p>
        )}

        {/* Start Button */}
        <button
          className="landing-start-btn"
          onClick={handleStart}
          disabled={!isReady && !hasError}
        >
          {isConnecting ? 'Connecting...' : 'Start Application'}
        </button>

        {/* Subtitle */}
        <p className="landing-subtitle">
          You can type or speak your answers at any time
        </p>
      </div>
    </div>
  );
}
