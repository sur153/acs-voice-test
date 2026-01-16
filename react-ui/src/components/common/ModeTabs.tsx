/**
 * Mode Tabs Component
 *
 * Tab navigation between Conversation (unified chat/voice) and Agent modes.
 */

import { useSession } from '@/contexts/SessionContext';
import type { InteractionMode } from '@/types';

type TabMode = 'conversation' | 'agent';

interface TabConfig {
  tabMode: TabMode;
  sessionMode: InteractionMode; // Mode to set in session
  icon: string;
  label: string;
}

const TABS: TabConfig[] = [
  { tabMode: 'conversation', sessionMode: 'chat', icon: '💬', label: 'Conversation' },
  { tabMode: 'agent', sessionMode: 'agent', icon: '👤', label: 'Agent' },
];

export function ModeTabs() {
  const { currentMode, setCurrentMode, connectionStatus } = useSession();

  // Map session mode to tab mode
  const getActiveTab = (): TabMode => {
    if (currentMode === 'agent') return 'agent';
    return 'conversation'; // Both 'chat' and 'voice' map to conversation tab
  };

  const handleModeChange = (tab: TabConfig) => {
    if (getActiveTab() === tab.tabMode) return;
    setCurrentMode(tab.sessionMode);
  };

  const activeTab = getActiveTab();

  return (
    <div className="mode-tabs">
      {TABS.map((tab) => (
        <button
          key={tab.tabMode}
          type="button"
          className={`mode-tab ${activeTab === tab.tabMode ? 'active' : ''}`}
          onClick={() => handleModeChange(tab)}
          aria-selected={activeTab === tab.tabMode}
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
