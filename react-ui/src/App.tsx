/**
 * TeleLife Application
 *
 * Main application component with unified conversation mode.
 * Combines chat and voice into single seamless experience.
 */

import { SessionProvider, useSession } from '@/contexts/SessionContext';
import { Header } from '@/components/common/Header';
import { ModeTabs } from '@/components/common/ModeTabs';
import { ConversationMode } from '@/components/Conversation';
import { AgentMode } from '@/components/Agent/AgentMode';
import { LandingScreen } from '@/components/Landing';
import './styles/global.css';

function AppContent() {
  const { currentMode, sessionStarted } = useSession();

  // Show ConversationMode for both 'chat' and 'voice' modes
  const isConversationMode = currentMode === 'chat' || currentMode === 'voice';

  // Show landing screen until user starts the session
  if (!sessionStarted) {
    return (
      <div className="app">
        <Header />

        <main className="main-container">
          <div className="chat-container landing-container">
            <LandingScreen />
          </div>
        </main>

        <footer className="footer">
          Powered by Azure AI • <a href="#">Privacy Policy</a>
        </footer>
      </div>
    );
  }

  return (
    <div className="app">
      <Header />

      <main className="main-container">
        <div className="chat-container">
          <ModeTabs />

          <div className="mode-content-wrapper">
            {isConversationMode && <ConversationMode />}
            {currentMode === 'agent' && <AgentMode />}
          </div>
        </div>
      </main>

      <footer className="footer">
        Powered by Azure AI • <a href="#">Privacy Policy</a>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <SessionProvider>
      <AppContent />
    </SessionProvider>
  );
}
