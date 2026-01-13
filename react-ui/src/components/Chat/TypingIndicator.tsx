/**
 * Typing Indicator Component
 *
 * Animated dots showing AI is processing/typing.
 */

export function TypingIndicator() {
  return (
    <div className="message ai">
      <div className="typing-indicator">
        <div className="typing-dot" />
        <div className="typing-dot" />
        <div className="typing-dot" />
      </div>
    </div>
  );
}
