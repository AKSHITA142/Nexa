import React, { useState } from 'react';
import { AssistantProvider, useAssistant } from './context/AssistantContext';
import { Sidebar } from './components/layout/Sidebar';
import { TopBar } from './components/layout/TopBar';
import { HeroGreeting } from './components/home/HeroGreeting';
import { AICommandComposer } from './components/home/AICommandComposer';
import { SuggestionChips } from './components/home/SuggestionChips';
import { RecentConversations } from './components/home/RecentConversations';
import { WorkspaceView } from './components/workspace/WorkspaceView';
import { AutomationsView } from './components/views/AutomationsView';
import { AgentsView } from './components/views/AgentsView';
import { CalendarView } from './components/views/CalendarView';
import { KnowledgeView } from './components/views/KnowledgeView';
import { TemplatesView } from './components/views/TemplatesView';
import { ActivityView } from './components/views/ActivityView';
import { SettingsView } from './components/views/SettingsView';
import { UrlModal } from './components/modals/UrlModal';
import { TemplateModal } from './components/modals/TemplateModal';
import { SettingsModal } from './components/modals/SettingsModal';

const AppContent: React.FC = () => {
  const { currentView, isWorkspaceActive } = useAssistant();
  const [isUrlModalOpen, setIsUrlModalOpen] = useState(false);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  const renderMainContent = () => {
    // If a conversation is active, transition to focused workspace state
    if (isWorkspaceActive) {
      return <WorkspaceView />;
    }

    switch (currentView) {
      case 'home':
      case 'ai-command':
        return (
          <div className="flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] px-4 pb-12 space-y-7 animate-in fade-in duration-300">
            <HeroGreeting />
            <AICommandComposer
              onOpenUrlModal={() => setIsUrlModalOpen(true)}
              onOpenTemplateModal={() => setIsTemplateModalOpen(true)}
            />
            <SuggestionChips />
            <RecentConversations />
          </div>
        );
      case 'automations':
        return <AutomationsView />;
      case 'agents':
        return <AgentsView />;
      case 'calendar':
        return <CalendarView />;
      case 'knowledge':
        return <KnowledgeView />;
      case 'templates':
        return <TemplatesView />;
      case 'activity':
        return <ActivityView />;
      case 'settings':
        return <SettingsView />;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#07080C] text-[#F3F4F6] font-sans antialiased overflow-x-hidden">
      {/* Left Navigation Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <TopBar />
        <main className="flex-1 overflow-y-auto">
          {renderMainContent()}
        </main>
      </div>

      {/* Modals */}
      <UrlModal
        isOpen={isUrlModalOpen}
        onClose={() => setIsUrlModalOpen(false)}
      />
      <TemplateModal
        isOpen={isTemplateModalOpen}
        onClose={() => setIsTemplateModalOpen(false)}
      />
      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
      />
    </div>
  );
};

export function App() {
  return (
    <AssistantProvider>
      <AppContent />
    </AssistantProvider>
  );
}

export default App;
