/**
 * Transcript List Component
 *
 * Displays voice conversation transcript with timestamps.
 * Supports streaming text display and auto-scroll.
 */

import { useEffect, useRef } from 'react';
import type { Message } from '@/types';

interface TranscriptListProps {
  messages: Message[];
  streamingText?: string;
  isStreaming?: boolean;
}

export function TranscriptList({ messages, streamingText = '', isStreaming = false }: TranscriptListProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change or streaming text updates
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages, streamingText]);

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  if (messages.length === 0 && !isStreaming) {
    return (
      <div className="transcript-container" ref={containerRef}>
        <div className="transcript-empty">
          Transcripts will appear here when you start talking...
        </div>
      </div>
    );
  }

  return (
    <div className="transcript-container" ref={containerRef}>
      {messages.map((message) => (
        <div
          key={message.id}
          className={`transcript-message ${message.role}`}
        >
          <div className="transcript-label">
            {message.role === 'user' ? 'You:' : 'AI:'}
          </div>
          <div className="transcript-text">{message.content}</div>
          <div className="transcript-time">{formatTime(message.timestamp)}</div>
        </div>
      ))}

      {/* Show streaming AI response */}
      {isStreaming && streamingText && (
        <div className="transcript-message ai streaming">
          <div className="transcript-label">AI:</div>
          <div className="transcript-text">
            {streamingText}
            <span className="typing-cursor">▊</span>
          </div>
        </div>
      )}
    </div>
  );
}
