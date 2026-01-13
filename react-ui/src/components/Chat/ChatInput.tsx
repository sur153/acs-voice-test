/**
 * Chat Input Component
 *
 * Text input with auto-grow and quick action buttons.
 */

import { useState, useRef, type KeyboardEvent, type ChangeEvent } from 'react';
import { useSession } from '@/contexts/SessionContext';

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSendMessage, disabled }: ChatInputProps) {
  const [text, setText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { setCurrentMode } = useSession();

  const handleSubmit = () => {
    const trimmed = text.trim();
    if (!trimmed || disabled) return;

    onSendMessage(trimmed);
    setText('');

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);

    // Auto-grow textarea
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
  };

  return (
    <div className="input-area">
      <div className="input-wrapper">
        <textarea
          ref={textareaRef}
          className="text-input"
          placeholder="Type your message..."
          value={text}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          rows={1}
        />
        <button
          type="button"
          className="action-btn send"
          onClick={handleSubmit}
          disabled={disabled || !text.trim()}
          aria-label="Send message"
        >
          ➤
        </button>
      </div>

      <div className="quick-actions">
        <button
          type="button"
          className="quick-action"
          onClick={() => setCurrentMode('voice')}
        >
          🎙️ Switch to Voice
        </button>
        <button
          type="button"
          className="quick-action"
          onClick={() => setCurrentMode('agent')}
        >
          👤 Speak to Agent
        </button>
        <button
          type="button"
          className="quick-action"
          onClick={() => onSendMessage('I need help')}
        >
          ❓ Help
        </button>
      </div>
    </div>
  );
}
