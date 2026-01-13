/**
 * Message Bubble Component
 *
 * Displays a single message in the conversation.
 */

import type { Message } from '@/types';

interface MessageBubbleProps {
  message: Message;
  isStreaming?: boolean;
}

export function MessageBubble({ message, isStreaming }: MessageBubbleProps) {
  const isUser = message.role === 'user';
  const isSystem = message.role === 'system';

  if (isSystem) {
    return (
      <div className="message system">
        <div className="message-bubble">{message.content}</div>
      </div>
    );
  }

  return (
    <div className={`message ${isUser ? 'user' : 'ai'}`}>
      <div className={`message-bubble ${isStreaming ? 'streaming' : ''}`}>
        {message.content}
        {isStreaming && <span className="cursor" />}
      </div>
      <div className="message-meta">
        {isUser ? 'You' : 'AI Assistant'}
      </div>
    </div>
  );
}
