/**
 * Chat Mode Component
 *
 * Text-based conversation interface with streaming responses.
 */

import { useRef, useEffect } from 'react';
import { useSession } from '@/contexts/SessionContext';
import { MessageBubble } from './MessageBubble';
import { ChatInput } from './ChatInput';
import { TypingIndicator } from './TypingIndicator';

export function ChatMode() {
  const {
    messages,
    streamingText,
    isStreaming,
    sendTextMessage,
    connectionStatus,
    setCurrentMode,
  } = useSession();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamingText]);

  const handleSendMessage = (text: string) => {
    // Handle special commands
    const lower = text.toLowerCase();
    if (lower.includes('voice') || lower.includes('speak')) {
      setCurrentMode('voice');
      return;
    }
    if (lower.includes('agent') || lower.includes('human')) {
      setCurrentMode('agent');
      return;
    }

    sendTextMessage(text);
  };

  // Filter messages for chat mode display
  const chatMessages = messages.filter(
    (msg) => msg.mode === 'chat' || msg.role === 'system'
  );

  return (
    <div className="chat-mode">
      <div className="conversation-area">
        {/* Welcome message if no messages */}
        {chatMessages.length === 0 && (
          <div className="welcome-messages">
            <MessageBubble
              message={{
                id: 'welcome-1',
                role: 'ai',
                content: "Hello! I'm your TeleLife application assistant. I'll help you complete your life insurance application today.",
                timestamp: new Date(),
                mode: 'chat',
              }}
            />
            <MessageBubble
              message={{
                id: 'welcome-2',
                role: 'ai',
                content: "You can type your responses here, or switch to voice anytime if you prefer speaking.",
                timestamp: new Date(),
                mode: 'chat',
              }}
            />
          </div>
        )}

        {/* Message list */}
        {chatMessages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}

        {/* Streaming message */}
        {isStreaming && streamingText && (
          <MessageBubble
            message={{
              id: 'streaming',
              role: 'ai',
              content: streamingText,
              timestamp: new Date(),
              mode: 'chat',
              isStreaming: true,
            }}
            isStreaming
          />
        )}

        {/* Typing indicator */}
        {isStreaming && !streamingText && <TypingIndicator />}

        <div ref={messagesEndRef} />
      </div>

      <ChatInput
        onSendMessage={handleSendMessage}
        disabled={connectionStatus !== 'connected'}
      />
    </div>
  );
}
