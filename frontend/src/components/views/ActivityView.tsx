import React from 'react';
import { Activity as ActivityIcon, MessageSquare, ArrowRight } from 'lucide-react';
import { useAssistant } from '../../context/AssistantContext';

export const ActivityView: React.FC = () => {
  const { recentConversations, selectConversation } = useAssistant();

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 space-y-6 animate-in fade-in">
      <div className="border-b border-white/[0.06] pb-6">
        <h1 className="text-2xl font-bold text-white font-['Outfit'] flex items-center gap-2.5">
          <ActivityIcon className="w-6 h-6 text-purple-400" />
          <span>Activity & Conversation History</span>
        </h1>
        <p className="text-sm text-zinc-400 mt-1">
          Complete audit trail of requests, workflows executed, and agent transcripts.
        </p>
      </div>

      <div className="space-y-3">
        {recentConversations.map((conv) => (
          <div
            key={conv.id}
            onClick={() => selectConversation(conv.id)}
            className="flex items-center justify-between p-4 rounded-2xl bg-[#0E1019]/90 border border-white/[0.06] hover:border-purple-500/40 hover:bg-[#141724] transition-all cursor-pointer group shadow-lg"
          >
            <div className="flex items-start gap-4 min-w-0 pr-4">
              <div className="w-9 h-9 rounded-xl bg-purple-950/40 border border-purple-500/20 group-hover:border-purple-400/50 flex items-center justify-center shrink-0">
                <MessageSquare className="w-4 h-4 text-purple-300" />
              </div>
              <div className="space-y-1 min-w-0">
                <h4 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors truncate">
                  {conv.title}
                </h4>
                <p className="text-xs text-zinc-400 line-clamp-1 leading-relaxed">
                  {conv.summary}
                </p>
                <div className="flex items-center gap-3 text-[10px] text-zinc-500 font-mono">
                  <span>{conv.messages.length} messages</span>
                  <span>·</span>
                  <span>{conv.timeAgo}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity">
              <span>Resume</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
