/**
 * Agent Mode Component
 *
 * Human agent escalation with queue display.
 */

import { useState, useEffect } from 'react';

export function AgentMode() {
  const [queuePosition, setQueuePosition] = useState(2);
  const [agentName, setAgentName] = useState<string | null>(null);
  const [status, setStatus] = useState<'queued' | 'connecting' | 'connected'>('queued');

  // Simulate queue countdown
  useEffect(() => {
    if (status !== 'queued') return;

    const interval = setInterval(() => {
      setQueuePosition((prev) => {
        if (prev <= 1) {
          setStatus('connecting');
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [status]);

  // Simulate agent connection
  useEffect(() => {
    if (status !== 'connecting') return;

    const timeout = setTimeout(() => {
      setAgentName('Sarah Johnson');
      setStatus('connected');
    }, 2000);

    return () => clearTimeout(timeout);
  }, [status]);

  const getStatusText = (): string => {
    switch (status) {
      case 'queued':
        return 'Please hold while we connect you...';
      case 'connecting':
        return 'Connecting to an agent...';
      case 'connected':
        return 'Connected';
      default:
        return '';
    }
  };

  const getEstimatedWait = (): string => {
    if (status === 'connected') return '';
    const minutes = Math.max(1, queuePosition);
    return `Estimated wait: ~${minutes} minute${minutes > 1 ? 's' : ''}`;
  };

  return (
    <div className="agent-mode">
      <div className="agent-content">
        <div className="agent-avatar">👤</div>

        <div className="agent-info">
          <div className="agent-name">
            {agentName || 'Connecting to Agent'}
          </div>
          <div className="agent-status">{getStatusText()}</div>
        </div>

        {status !== 'connected' && (
          <div className="queue-position">
            <div className="queue-label">Your position in queue</div>
            <div className="queue-number">{queuePosition}</div>
            <div className="queue-time">{getEstimatedWait()}</div>
          </div>
        )}

        {status === 'connected' && (
          <div className="agent-connected-message">
            <p>You are now connected with <strong>{agentName}</strong>.</p>
            <p>They can see your conversation history and will assist you directly.</p>
          </div>
        )}
      </div>
    </div>
  );
}
