/**
 * Mode Tabs Component
 *
 * Tab navigation between Chat, Voice, and Agent modes.
 */

import { useSession } from '@/contexts/SessionContext';
import type { InteractionMode } from '@/types';

interface TabConfig {
  mode: InteractionMode;
  icon: string;
  label: string;
}

const TABS: TabConfig[] = [
  { mode: 'chat', icon: '💬', label: 'Chat' },
  { mode: 'voice', icon: '🎙️', label: 'Voice' },
  { mode: 'agent', icon: '👤', label: 'Agent' },
];

export function ModeTabs() {
  const { currentMode, setCurrentMode, connectionStatus } = useSession();

  const handleModeChange = (mode: InteractionMode) => {
    if (mode === currentMode) return;
    setCurrentMode(mode);
  };

  return (
    <div className="mode-tabs">
      {TABS.map((tab) => (
        <button
          key={tab.mode}
          type="button"
          className={`mode-tab ${currentMode === tab.mode ? 'active' : ''}`}
          onClick={() => handleModeChange(tab.mode)}
          aria-selected={currentMode === tab.mode}
          role="tab"
        >
          <span className="tab-icon">{tab.icon}</span>
          <span className="tab-label">{tab.label}</span>
          <span
            className={`connection-dot ${connectionStatus === 'connected' ? 'connected' : ''}`}
            title={connectionStatus}
          />
        </button>
      ))}
    </div>
  );
}
