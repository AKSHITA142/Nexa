import React from 'react';
import { MessageSquare, ChevronRight } from 'lucide-react';
import { useAssistant } from '../../context/AssistantContext';

export const RecentConversations: React.FC = () => {
  const { recentConversations, selectConversation, setCurrentView } = useAssistant();

  return (
    <div className="w-full max-w-4xl mx-auto space-y-3 pt-4 select-none">
      {/* Section Header */}
      <div className="flex items-center justify-between px-2">
        <h3 className="text-sm font-semibold text-zinc-200">
          Your recent conversations
        </h3>
        <button
          onClick={() => setCurrentView('activity')}
          className="flex items-center gap-1 text-xs font-medium text-purple-400 hover:text-purple-300 transition-colors"
        >
          <span>View all</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Conversations Container Card */}
      <div className="rounded-2xl bg-[#0E1019]/80 backdrop-blur-md border border-white/[0.06] divide-y divide-white/[0.05] overflow-hidden shadow-lg">
        {recentConversations.slice(0, 3).map((conv) => (
          <div
            key={conv.id}
            onClick={() => selectConversation(conv.id)}
            className="flex items-center justify-between p-3.5 sm:px-5 hover:bg-[#141724]/90 transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-3.5 min-w-0 pr-4">
              <div className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center shrink-0 group-hover:border-purple-500/40 group-hover:bg-purple-950/30 transition-colors">
                <MessageSquare className="w-3.5 h-3.5 text-zinc-400 group-hover:text-purple-300 transition-colors" />
              </div>
              <span className="text-xs sm:text-sm font-normal text-zinc-300 group-hover:text-white truncate">
                {conv.title}
              </span>
            </div>
            <span className="text-[11px] text-zinc-500 shrink-0 font-medium font-mono">
              {conv.timeAgo}
            </span>
          </div>
        ))}

        {recentConversations.length === 0 && (
          <div className="p-8 text-center text-xs text-zinc-500">
            No recent conversations yet. Start by typing in the composer above!
          </div>
        )}
      </div>
    </div>
  );
};
