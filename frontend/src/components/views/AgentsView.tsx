import React from 'react';
import {
  Bot,
  Calendar,
  Mail,
  FileSpreadsheet,
  FileText,
  CheckSquare,
  Search,
  Calculator,
} from 'lucide-react';
import { useAssistant } from '../../context/AssistantContext';

export const AgentsView: React.FC = () => {
  const { sendMessage } = useAssistant();

  const tools = [
    { name: 'Google Calendar API', desc: 'Create, fetch, and list events on Personal_assistance calendar', icon: Calendar, color: 'text-indigo-400' },
    { name: 'Gmail OAuth2 API', desc: 'Read inbox, filter threads, and send replies directly', icon: Mail, color: 'text-red-400' },
    { name: 'Google Sheets API', desc: 'Append and query expense rows in finance_tracking', icon: FileSpreadsheet, color: 'text-emerald-400' },
    { name: 'Calculator Tool', desc: 'High-precision mathematical computations and totals', icon: Calculator, color: 'text-amber-400' },
    { name: 'Google Docs API', desc: 'Create notes, update daily records, and retrieve documents', icon: FileText, color: 'text-blue-400' },
    { name: 'Google Tasks API', desc: 'Create, fetch, and delete tasks seamlessly', icon: CheckSquare, color: 'text-teal-400' },
    { name: 'SerpApi Search', desc: 'Live web scraping, research, and real-time knowledge retrieval', icon: Search, color: 'text-purple-400' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 space-y-6 animate-in fade-in">
      <div className="border-b border-white/[0.06] pb-6">
        <h1 className="text-2xl font-bold text-white font-['Outfit'] flex items-center gap-2.5">
          <Bot className="w-6 h-6 text-purple-400" />
          <span>AI Agent Architecture & Capabilities</span>
        </h1>
        <p className="text-sm text-zinc-400 mt-1">
          Direct inspection of the LangChain Agent loop, Gemini 3.5 Flash-lite model, and registered tools.
        </p>
      </div>

      {/* Main Agent Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#14122b] to-[#0d0f1a] border border-purple-500/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-purple-950/80 border border-purple-500/40 text-xs font-mono font-bold text-purple-300">
              LangChain Agent v3.1
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-xs font-mono font-bold text-emerald-300">
              ● Active
            </span>
          </div>
          <h2 className="text-lg font-bold text-white">Gemini 3.5 Flash-lite Executive Agent</h2>
          <p className="text-xs text-zinc-400 max-w-xl leading-relaxed">
            Autonomous decision-making agent trained with specific guidelines to infer intent, manage calendar schedules, summarize mail, track budgets, and maintain Google Docs notes.
          </p>
        </div>

        <button
          onClick={() => sendMessage('Give me a full capability report of all your tools and connected Google services')}
          className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-bold text-white shadow-lg shadow-purple-950/60 transition-all shrink-0"
        >
          Test Capabilities
        </button>
      </div>

      {/* Registered Tools Grid */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-zinc-200">Registered n8n Tools</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {tools.map((t, i) => {
            const Icon = t.icon;
            return (
              <div
                key={i}
                className="p-4 rounded-xl bg-[#0E1019]/90 border border-white/[0.06] hover:border-purple-500/30 transition-all space-y-2"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
                    <Icon className={`w-4 h-4 ${t.color}`} />
                  </div>
                  <h4 className="text-xs font-bold text-white">{t.name}</h4>
                </div>
                <p className="text-[11px] text-zinc-400 leading-relaxed">
                  {t.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
