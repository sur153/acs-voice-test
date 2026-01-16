/**
 * Unified Message List Component
 *
 * Displays all conversation messages (chat and voice) in a single
 * scrolling list with input method indicators.
 */

import { useEffect, useRef } from 'react';
import type { Message } from '@/types';

interface UnifiedMessageListProps {
  messages: Message[];
  streamingText?: string;
  isStreaming?: boolean;
}

export function UnifiedMessageList({
  messages,
  streamingText = '',
  isStreaming = false,
}: UnifiedMessageListProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change or streaming text updates
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamingText]);

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getInputMethodIcon = (message: Message): string => {
    if (message.role === 'ai') return '';
    if (message.inputMethod === 'voice') return '🎙️';
    return '💬';
  };

  // Show waiting state when no messages yet (AI intro is loading)
  if (messages.length === 0 && !isStreaming) {
    return (
      <div className="unified-message-list" ref={containerRef}>
        <div className="waiting-for-ai">
          <div className="waiting-avatar ai-badge">AI</div>
          <div className="waiting-text">
            <p>AI Assistant is connecting...</p>
            <div className="typing-indicator">
              <span className="typing-dot"></span>
              <span className="typing-dot"></span>
              <span className="typing-dot"></span>
            </div>
          </div>
        </div>
        <div ref={bottomRef} />
      </div>
    );
  }

  return (
    <div className="unified-message-list" ref={containerRef}>
      {messages.map((message) => (
        <div
          key={message.id}
          className={`unified-message ${message.role}`}
        >
          {message.role === 'ai' && (
            <div className="message-avatar ai-badge">AI</div>
          )}
          <div className="message-content">
            <div className="message-bubble">
              {message.content}
            </div>
            <div className="message-meta">
              <span className="message-time">{formatTime(message.timestamp)}</span>
              {message.role === 'user' && (
                <span className="message-input-method">
                  {getInputMethodIcon(message)}
                </span>
              )}
            </div>
          </div>
          {message.role === 'user' && (
            <div className="message-avatar user-avatar">👤</div>
          )}
        </div>
      ))}

      {/* Streaming AI response */}
      {isStreaming && streamingText && (
        <div className="unified-message ai streaming">
          <div className="message-avatar ai-badge">AI</div>
          <div className="message-content">
            <div className="message-bubble">
              {streamingText}
              <span className="typing-cursor">▊</span>
            </div>
          </div>
        </div>
      )}

      {/* Typing indicator when waiting for response */}
      {isStreaming && !streamingText && (
        <div className="unified-message ai">
          <div className="message-avatar ai-badge">AI</div>
          <div className="message-content">
            <div className="typing-indicator">
              <span className="typing-dot"></span>
              <span className="typing-dot"></span>
              <span className="typing-dot"></span>
            </div>
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}
