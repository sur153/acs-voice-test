/**
 * Mode Toggle Component
 *
 * Toggle switch between Chat and Voice input modes.
 * Visual indicator shows current mode.
 */

import type { InputMethod } from '@/types';

interface ModeToggleProps {
  activeMode: InputMethod;
  onModeChange: (mode: InputMethod) => void;
  disabled?: boolean;
}

export function ModeToggle({ activeMode, onModeChange, disabled = false }: ModeToggleProps) {
  return (
    <div className={`mode-toggle ${disabled ? 'disabled' : ''}`}>
      <button
        className={`toggle-option ${activeMode === 'chat' ? 'active' : ''}`}
        onClick={() => onModeChange('chat')}
        disabled={disabled}
        aria-pressed={activeMode === 'chat'}
      >
        <span className="toggle-icon">💬</span>
        <span className="toggle-label">Chat</span>
      </button>

      <div
        className="toggle-track"
        onClick={() => !disabled && onModeChange(activeMode === 'chat' ? 'voice' : 'chat')}
        role="switch"
        aria-checked={activeMode === 'voice'}
        tabIndex={disabled ? -1 : 0}
        onKeyDown={(e) => {
          if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            onModeChange(activeMode === 'chat' ? 'voice' : 'chat');
          }
        }}
      >
        <div
          className={`toggle-thumb ${activeMode === 'voice' ? 'right' : 'left'}`}
        />
      </div>

      <button
        className={`toggle-option ${activeMode === 'voice' ? 'active' : ''}`}
        onClick={() => onModeChange('voice')}
        disabled={disabled}
        aria-pressed={activeMode === 'voice'}
      >
        <span className="toggle-icon">🎙️</span>
        <span className="toggle-label">Voice</span>
      </button>
    </div>
  );
}
