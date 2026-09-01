import React from 'react';
import { LayoutTemplate, Sparkles, Mail, Calendar, DollarSign, CheckSquare, FileCode } from 'lucide-react';
import { useAssistant } from '../../context/AssistantContext';

export const TemplatesView: React.FC = () => {
  const { sendMessage } = useAssistant();

  const templates = [
    {
      title: 'Daily Morning Email Digest',
      desc: 'Scan Gmail inbox for unread priority items, generate concise AI summary, and deliver morning report.',
      prompt: 'Create an automation that scans my Gmail inbox every morning at 8:00 AM, summarizes important emails, and sends me the report.',
      icon: Mail,
      tag: 'Gmail + Gemini',
    },
    {
      title: 'Google Calendar Meeting Scheduler',
      desc: 'Check calendar availability, prevent conflicts, and schedule executive meetings automatically.',
      prompt: 'Schedule a meeting with Rahul tomorrow at 3:00 PM on my Google Calendar (Personal_assistance).',
      icon: Calendar,
      tag: 'Google Calendar',
    },
    {
      title: 'Expense & Budget Logger',
      desc: 'Parse transaction details, calculate category balances, and append row to Google Sheets.',
      prompt: 'Add an expense of 450 rupees for lunch under food category in my finance_tracking Google Sheet.',
      icon: DollarSign,
      tag: 'Google Sheets',
    },
    {
      title: 'Google Tasks Organizer',
      desc: 'Create, update, and manage task lists directly inside your Google Tasks workflow.',
      prompt: 'Create 2 tasks in Google Tasks: 1. Review n8n webhook connection, 2. Deploy frontend production build.',
      icon: CheckSquare,
      tag: 'Google Tasks',
    },
    {
      title: 'GitHub Repository Architecture Audit',
      desc: 'Inspect repository structure, detect optimization opportunities, and document suggestions.',
      prompt: 'Analyze my GitHub repository structure and suggest key architecture and performance improvements.',
      icon: FileCode,
      tag: 'SerpApi + Search',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 space-y-6 animate-in fade-in">
      <div className="border-b border-white/[0.06] pb-6">
        <h1 className="text-2xl font-bold text-white font-['Outfit'] flex items-center gap-2.5">
          <LayoutTemplate className="w-6 h-6 text-purple-400" />
          <span>Workflow & Agent Templates</span>
        </h1>
        <p className="text-sm text-zinc-400 mt-1">
          Kickstart natural-language automation commands pre-tuned for your tools.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {templates.map((tmpl, idx) => {
          const Icon = tmpl.icon;
          return (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-[#0E1019]/90 border border-white/[0.06] hover:border-purple-500/40 transition-all flex flex-col justify-between space-y-4 shadow-xl"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-xl bg-purple-950/40 border border-purple-500/20 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-purple-300" />
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-purple-950/60 border border-purple-500/30 text-[10px] font-mono text-purple-300">
                    {tmpl.tag}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white">{tmpl.title}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">{tmpl.desc}</p>
              </div>

              <button
                onClick={() => sendMessage(tmpl.prompt)}
                className="w-full py-2 rounded-xl bg-purple-600/30 hover:bg-purple-600 text-xs font-semibold text-purple-200 hover:text-white border border-purple-500/30 transition-all flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Launch Template</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
