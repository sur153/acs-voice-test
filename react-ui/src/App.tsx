/**
 * TeleLife Application
 *
 * Main application component with mode tabs and content areas.
 */

import { SessionProvider, useSession } from '@/contexts/SessionContext';
import { Header } from '@/components/common/Header';
import { ModeTabs } from '@/components/common/ModeTabs';
import { ChatMode } from '@/components/Chat/ChatMode';
import { VoiceMode } from '@/components/Voice/VoiceMode';
import { AgentMode } from '@/components/Agent/AgentMode';
import './styles/global.css';

function AppContent() {
  const { currentMode } = useSession();

  return (
    <div className="app">
      <Header />

      <main className="main-container">
        <div className="chat-container">
          <ModeTabs />

          <div className="mode-content-wrapper">
            {currentMode === 'chat' && <ChatMode />}
            {currentMode === 'voice' && <VoiceMode />}
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
