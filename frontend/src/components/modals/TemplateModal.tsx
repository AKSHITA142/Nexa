import React from 'react';
import {
  LayoutTemplate,
  X,
  Mail,
  Calendar,
  DollarSign,
  FileCode,
  CheckSquare,
} from 'lucide-react';
import { useAssistant } from '../../context/AssistantContext';

interface TemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TEMPLATES = [
  {
    id: 't-1',
    title: 'Daily Morning Email Digest',
    description: 'Scan Gmail inbox for unread priority items, generate concise AI summary, and deliver briefing.',
    prompt: 'Create an automation that scans my Gmail inbox every morning at 8:00 AM, summarizes important emails, and sends me the report.',
    icon: Mail,
    category: 'Email & Triage',
    tag: 'Gmail + Gemini',
  },
  {
    id: 't-2',
    title: 'Google Calendar Meeting Scheduler',
    description: 'Check calendar availability, prevent conflicts, and schedule executive meetings automatically.',
    prompt: 'Schedule a meeting with Rahul tomorrow at 3:00 PM on my Google Calendar (Personal_assistance).',
    icon: Calendar,
    category: 'Calendar',
    tag: 'Google Calendar',
  },
  {
    id: 't-3',
    title: 'Expense & Budget Logger',
    description: 'Parse transaction details, calculate category balances, and append row to Google Sheets.',
    prompt: 'Add an expense of 450 rupees for lunch under food category in my finance_tracking Google Sheet.',
    icon: DollarSign,
    category: 'Finance',
    tag: 'Google Sheets',
  },
  {
    id: 't-4',
    title: 'Google Tasks Organizer',
    description: 'Create, update, and manage task lists directly inside your Google Tasks workflow.',
    prompt: 'Create 2 tasks in Google Tasks: 1. Review n8n webhook connection, 2. Deploy frontend production build.',
    icon: CheckSquare,
    category: 'Tasks',
    tag: 'Google Tasks',
  },
  {
    id: 't-5',
    title: 'GitHub Repository Architecture Audit',
    description: 'Inspect repository structure, detect optimization opportunities, and document suggestions.',
    prompt: 'Analyze my GitHub repository structure and suggest key architecture and performance improvements.',
    icon: FileCode,
    category: 'Engineering',
    tag: 'SerpApi + Search',
  },
];

export const TemplateModal: React.FC<TemplateModalProps> = ({ isOpen, onClose }) => {
  const { sendMessage } = useAssistant();

  if (!isOpen) return null;

  const handleSelectTemplate = (prompt: string) => {
    sendMessage(prompt);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in">
      <div className="w-full max-w-2xl rounded-2xl bg-[#0D0F19] border border-purple-500/30 shadow-2xl p-6 space-y-4 max-h-[85vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-purple-950/60 border border-purple-400/30 flex items-center justify-center">
              <LayoutTemplate className="w-4 h-4 text-purple-300" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Assistant Automation Templates</h3>
              <p className="text-[11px] text-zinc-400">
                Pre-configured workflows tailored to your n8n agent tools
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-zinc-400 hover:text-white p-1">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Template List */}
        <div className="overflow-y-auto space-y-2.5 pr-1 py-1">
          {TEMPLATES.map((tmpl) => {
            const Icon = tmpl.icon;
            return (
              <div
                key={tmpl.id}
                onClick={() => handleSelectTemplate(tmpl.prompt)}
                className="group flex items-start justify-between p-4 rounded-xl bg-white/[0.03] hover:bg-[#151726] border border-white/[0.06] hover:border-purple-500/40 transition-all cursor-pointer shadow-md"
              >
                <div className="flex items-start gap-3.5 min-w-0 pr-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-950/40 border border-purple-500/20 group-hover:border-purple-400/50 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-purple-300 group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-zinc-100 group-hover:text-white">
                        {tmpl.title}
                      </h4>
                      <span className="px-2 py-0.5 rounded-full bg-purple-950/60 border border-purple-500/30 text-[10px] font-mono text-purple-300">
                        {tmpl.tag}
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-400 leading-relaxed">
                      {tmpl.description}
                    </p>
                  </div>
                </div>

                <button className="shrink-0 px-3 py-1.5 rounded-lg bg-purple-600/30 group-hover:bg-purple-600 text-xs font-semibold text-purple-200 group-hover:text-white border border-purple-500/30 transition-all">
                  Use
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
