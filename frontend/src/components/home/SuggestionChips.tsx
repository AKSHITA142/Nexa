import React from 'react';
import {
  MessageSquare,
  Calendar,
  Workflow,
  Search,
  FileCode,
  Sparkles,
} from 'lucide-react';
import { useAssistant } from '../../context/AssistantContext';

interface SuggestionItem {
  id: string;
  action: string;
  target: string;
  icon: React.ComponentType<{ className?: string }>;
  prompt: string;
  accentBg: string;
  accentIcon: string;
}

const SUGGESTIONS: SuggestionItem[] = [
  {
    id: 'sug-1',
    action: 'Summarize',
    target: 'this website',
    icon: MessageSquare,
    prompt: 'Summarize this website and highlight the core capabilities and key takeaways.',
    accentBg: 'bg-purple-950/40 border-purple-500/30 group-hover:border-purple-400/50',
    accentIcon: 'text-purple-400 group-hover:text-purple-300',
  },
  {
    id: 'sug-2',
    action: 'Schedule',
    target: 'a meeting tomorrow',
    icon: Calendar,
    prompt: 'Schedule a meeting with Rahul tomorrow at 3 PM on my Google Calendar.',
    accentBg: 'bg-indigo-950/40 border-indigo-500/30 group-hover:border-indigo-400/50',
    accentIcon: 'text-indigo-400 group-hover:text-indigo-300',
  },
  {
    id: 'sug-3',
    action: 'Create an automation',
    target: 'for my emails',
    icon: Workflow,
    prompt: 'Create an automation that summarizes my important emails every morning at 8:00 AM.',
    accentBg: 'bg-emerald-950/40 border-emerald-500/30 group-hover:border-emerald-400/50',
    accentIcon: 'text-emerald-400 group-hover:text-emerald-300',
  },
  {
    id: 'sug-4',
    action: 'Research',
    target: 'this topic',
    icon: Search,
    prompt: 'Research the latest advancements in AI agents, LangChain tools, and n8n automations.',
    accentBg: 'bg-pink-950/40 border-pink-500/30 group-hover:border-pink-400/50',
    accentIcon: 'text-pink-400 group-hover:text-pink-300',
  },
  {
    id: 'sug-5',
    action: 'Analyze',
    target: 'my GitHub repo',
    icon: FileCode,
    prompt: 'Analyze my GitHub repo structure and suggest performance and architecture improvements.',
    accentBg: 'bg-amber-950/40 border-amber-500/30 group-hover:border-amber-400/50',
    accentIcon: 'text-amber-400 group-hover:text-amber-300',
  },
];

export const SuggestionChips: React.FC = () => {
  const { sendMessage } = useAssistant();

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4 pt-3 select-none">
      {/* Centered Try asking me to... */}
      <div className="flex items-center justify-center gap-2 text-center">
        <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-sparkle" />
        <span className="text-xs font-medium text-zinc-400">
          Try asking me to...
        </span>
      </div>

      {/* Suggestion Cards Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 px-2">
        {SUGGESTIONS.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => sendMessage(item.prompt)}
              className={`group flex items-start gap-3 p-3 rounded-2xl bg-[#0E1019]/80 backdrop-blur-md border border-white/[0.06] hover:bg-[#141724]/90 hover:border-purple-500/40 hover:shadow-[0_4px_20px_rgba(147,51,234,0.12)] transition-all duration-200 text-left`}
            >
              <div
                className={`w-8 h-8 rounded-xl ${item.accentBg} flex items-center justify-center shrink-0 transition-colors`}
              >
                <Icon className={`w-4 h-4 ${item.accentIcon} transition-transform group-hover:scale-110`} />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-semibold text-zinc-200 group-hover:text-white truncate">
                  {item.action}
                </span>
                <span className="text-[11px] text-zinc-400 truncate">
                  {item.target}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
