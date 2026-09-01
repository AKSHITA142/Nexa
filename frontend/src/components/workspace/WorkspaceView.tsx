import React, { useEffect, useRef } from 'react';
import {
  ArrowLeft,
  Sparkles,
  User,
  Copy,
  Check,
  Link,
  FileText,
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useAssistant } from '../../context/AssistantContext';
import { ToolExecutionBadge } from './ToolExecutionBadge';
import { AutomationProposalCard } from './AutomationProposalCard';
import { AICommandComposer } from '../home/AICommandComposer';

export const WorkspaceView: React.FC = () => {
  const {
    activeConversation,
    isProcessing,
    startNewChat,
  } = useAssistant();

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [copiedMsgId, setCopiedMsgId] = React.useState<string | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConversation?.messages, isProcessing]);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMsgId(id);
    setTimeout(() => setCopiedMsgId(null), 2000);
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto px-4 py-3 relative">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] select-none shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={startNewChat}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-medium text-zinc-300 hover:text-white transition-all"
            title="Return to Home Screen"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>
          <div className="flex flex-col">
            <h2 className="text-sm font-bold text-white truncate max-w-md">
              {activeConversation?.title || 'Active Assistant Workspace'}
            </h2>
            <div className="flex items-center gap-2 text-[10px] text-zinc-400 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
              <span>Gemini 3.5 Flash & n8n Agent</span>
            </div>
          </div>
        </div>

        <button
          onClick={startNewChat}
          className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-purple-950/40 hover:bg-purple-900/60 border border-purple-500/30 text-xs font-semibold text-purple-300 hover:text-white transition-colors"
        >
          <Sparkles className="w-3 h-3" />
          <span>New Chat</span>
        </button>
      </div>

      {/* Messages Thread Container */}
      <div className="flex-1 overflow-y-auto py-6 space-y-6 pr-2">
        {activeConversation?.messages.map((msg) => {
          const isUser = msg.role === 'user';

          return (
            <div
              key={msg.id}
              className={`flex gap-3.5 ${
                isUser ? 'justify-end' : 'justify-start'
              } animate-in fade-in duration-200`}
            >
              {/* Assistant Avatar */}
              {!isUser && (
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-900 via-indigo-800 to-purple-600 border border-purple-400/30 flex items-center justify-center shrink-0 shadow-lg shadow-purple-950/50">
                  <Sparkles className="w-4 h-4 text-purple-200 fill-purple-300" />
                </div>
              )}

              {/* Message Content Bubble */}
              <div
                className={`flex flex-col max-w-2xl ${
                  isUser ? 'items-end' : 'items-start'
                }`}
              >
                {/* Attachments if user uploaded URL/files */}
                {msg.attachments && msg.attachments.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-2">
                    {msg.attachments.map((att, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-purple-950/50 border border-purple-500/30 text-[11px] text-purple-200"
                      >
                        {att.type === 'url' ? (
                          <Link className="w-3 h-3 text-purple-400" />
                        ) : (
                          <FileText className="w-3 h-3 text-purple-400" />
                        )}
                        <span className="font-mono">{att.name}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div
                  className={`p-4 rounded-2xl text-sm leading-relaxed ${
                    isUser
                      ? 'bg-gradient-to-tr from-purple-700 to-indigo-600 text-white rounded-tr-none shadow-lg shadow-purple-950/40'
                      : 'bg-[#0E1019]/90 backdrop-blur-md border border-white/[0.07] text-zinc-100 rounded-tl-none shadow-xl'
                  }`}
                >
                  <div className="prose prose-invert prose-sm max-w-none prose-p:leading-relaxed prose-pre:bg-[#07080d] prose-pre:border prose-pre:border-white/[0.08]">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                </div>

                {/* Tool Execution Badges */}
                {msg.toolCalls && msg.toolCalls.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2.5">
                    {msg.toolCalls.map((tool) => (
                      <ToolExecutionBadge key={tool.id} tool={tool} />
                    ))}
                  </div>
                )}

                {/* Dynamic Automation Proposal Card */}
                {msg.automationProposal && (
                  <AutomationProposalCard proposal={msg.automationProposal} />
                )}

                {/* Message Footer / Copy */}
                <div className="flex items-center gap-3 mt-1.5 px-1 text-[11px] text-zinc-500">
                  <span>{msg.timestamp}</span>
                  {!isUser && (
                    <button
                      onClick={() => copyToClipboard(msg.content, msg.id)}
                      className="hover:text-zinc-300 transition-colors flex items-center gap-1"
                      title="Copy response"
                    >
                      {copiedMsgId === msg.id ? (
                        <Check className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                      <span>{copiedMsgId === msg.id ? 'Copied' : 'Copy'}</span>
                    </button>
                  )}
                </div>
              </div>

              {/* User Avatar */}
              {isUser && (
                <div className="w-8 h-8 rounded-xl bg-white/[0.06] border border-white/[0.1] flex items-center justify-center shrink-0">
                  <User className="w-4 h-4 text-zinc-300" />
                </div>
              )}
            </div>
          );
        })}

        {/* Processing Indicator */}
        {isProcessing && (
          <div className="flex gap-3.5 justify-start animate-in fade-in duration-200">
            <div className="w-8 h-8 rounded-xl bg-purple-900/60 border border-purple-400/30 flex items-center justify-center shrink-0 animate-pulse">
              <Sparkles className="w-4 h-4 text-purple-300" />
            </div>
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#0E1019]/90 border border-purple-500/20 text-zinc-300 text-sm">
              <div className="flex gap-1.5">
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 rounded-full bg-violet-400 animate-bounce [animation-delay:0.4s]" />
              </div>
              <span className="text-xs text-zinc-400 font-mono">
                Executing workflow tools...
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Floating Bottom AI Composer in Workspace */}
      <div className="pt-2 shrink-0">
        <AICommandComposer compact={true} />
      </div>
    </div>
  );
};
