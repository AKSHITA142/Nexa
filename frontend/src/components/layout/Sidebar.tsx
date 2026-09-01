import React from 'react';
import {
  Home,
  Bot,
  Workflow,
  Sparkles,
  Database,
  LayoutTemplate,
  Activity,
  Calendar,
  Settings,
  ChevronDown,
  ArrowRight,
} from 'lucide-react';
import { useAssistant } from '../../context/AssistantContext';
import type { NavSection } from '../../types/assistant';

interface NavItem {
  id: NavSection;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'ai-command', label: 'AI Command', icon: Sparkles },
  { id: 'automations', label: 'Automations', icon: Workflow },
  { id: 'agents', label: 'Agents', icon: Bot },
  { id: 'knowledge', label: 'Knowledge', icon: Database },
  { id: 'templates', label: 'Templates', icon: LayoutTemplate },
  { id: 'activity', label: 'Activity', icon: Activity },
  { id: 'calendar', label: 'Calendar', icon: Calendar },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export const Sidebar: React.FC = () => {
  const { currentView, setCurrentView, startNewChat } = useAssistant();

  const handleNavClick = (viewId: NavSection) => {
    setCurrentView(viewId);
    if (viewId === 'home') {
      startNewChat();
    }
  };

  return (
    <aside className="w-64 min-h-screen bg-[#0A0B10]/95 backdrop-blur-xl border-r border-white/[0.06] flex flex-col justify-between p-4 select-none shrink-0 z-20">
      {/* Brand Header */}
      <div className="space-y-6">
        <div
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 px-3 py-2 cursor-pointer group"
        >
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-purple-600 via-indigo-500 to-violet-400 flex items-center justify-center shadow-lg shadow-purple-900/40 group-hover:scale-105 transition-transform duration-300">
            <Sparkles className="w-4 h-4 text-white fill-white" />
          </div>
          <span className="font-extrabold text-lg tracking-wider text-white font-['Outfit'] group-hover:text-purple-300 transition-colors">
            NEXA
          </span>
        </div>

        {/* Navigation List */}
        <nav className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-900/40 via-purple-600/25 to-indigo-900/20 text-white border border-purple-500/30 shadow-[0_0_15px_rgba(147,51,234,0.15)] font-semibold'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]'
                }`}
              >
                <Icon
                  className={`w-4 h-4 transition-colors ${
                    isActive ? 'text-purple-400' : 'text-zinc-400'
                  }`}
                />
                <span>{item.label}</span>
                {isActive && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_8px_#a855f7]" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="space-y-4 pt-4 border-t border-white/[0.06]">
        {/* Upgrade to Pro Card */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#16122c] to-[#0d0d17] border border-purple-500/20 p-4 shadow-xl">
          {/* Subtle cosmic circle graphic */}
          <div className="absolute -right-8 -bottom-8 w-28 h-28 rounded-full bg-gradient-to-tr from-purple-600/30 to-indigo-500/10 blur-xl pointer-events-none" />
          <div className="absolute -right-2 -bottom-2 w-16 h-16 rounded-full border border-purple-500/20 opacity-30 pointer-events-none" />

          <h4 className="text-sm font-bold text-white mb-1">Upgrade to Pro</h4>
          <p className="text-[11px] text-zinc-400 leading-relaxed mb-3">
            Unlock advanced features, priority support and more powerful models.
          </p>

          <button
            onClick={() => setCurrentView('settings')}
            className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-semibold text-white bg-purple-600/40 hover:bg-purple-600/60 border border-purple-500/30 transition-all duration-200 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]"
          >
            <span>Upgrade Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* User Profile Card */}
        <div className="flex items-center justify-between px-2 py-1.5 rounded-xl hover:bg-white/[0.04] transition-colors cursor-pointer group">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-900 to-indigo-700 border border-purple-400/40 flex items-center justify-center text-xs font-bold text-white shadow-inner">
                AJ
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[#0A0B10]" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-semibold text-zinc-200 group-hover:text-white transition-colors">
                Akshita J.
              </span>
              <span className="text-[10px] font-medium text-purple-400">
                Pro Plan
              </span>
            </div>
          </div>
          <ChevronDown className="w-4 h-4 text-zinc-500 group-hover:text-zinc-300 transition-colors" />
        </div>
      </div>
    </aside>
  );
};
