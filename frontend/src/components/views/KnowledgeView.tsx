import React from 'react';
import { Database, FileText, FileSpreadsheet, Search } from 'lucide-react';
import { useAssistant } from '../../context/AssistantContext';

export const KnowledgeView: React.FC = () => {
  const { sendMessage } = useAssistant();

  const documents = [
    {
      title: 'finance_tracking (Google Sheets)',
      url: 'https://docs.google.com/spreadsheets/d/1Q2BuEEIWn_ql58JvZFeCHSIA4VDwAa1lSEgK9SoQIYc/edit',
      type: 'Google Sheets',
      updated: 'Today',
      icon: FileSpreadsheet,
      color: 'text-emerald-400',
    },
    {
      title: 'Personal Assistant Notes & Briefings (Google Docs)',
      url: '#',
      type: 'Google Docs',
      updated: 'Yesterday',
      icon: FileText,
      color: 'text-blue-400',
    },
    {
      title: 'Live Web Index & Search Cache',
      url: '#',
      type: 'SerpApi Engine',
      updated: 'Continuous',
      icon: Search,
      color: 'text-purple-400',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 space-y-6 animate-in fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.06] pb-6">
        <div>
          <h1 className="text-2xl font-bold text-white font-['Outfit'] flex items-center gap-2.5">
            <Database className="w-6 h-6 text-purple-400" />
            <span>Knowledge Bases & Documents</span>
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Data stores, spreadsheets, and document hubs connected to your assistant.
          </p>
        </div>

        <button
          onClick={() => sendMessage('Summarize the contents of my finance_tracking spreadsheet')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-bold text-white shadow-lg shadow-purple-950/50 self-start"
        >
          <Search className="w-4 h-4" />
          <span>Query Knowledge</span>
        </button>
      </div>

      <div className="space-y-3">
        {documents.map((doc, idx) => {
          const Icon = doc.icon;
          return (
            <div
              key={idx}
              className="flex items-center justify-between p-4 rounded-2xl bg-[#0E1019]/90 border border-white/[0.06] hover:border-purple-500/30 transition-all shadow-md"
            >
              <div className="flex items-center gap-3.5 min-w-0 pr-4">
                <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center shrink-0">
                  <Icon className={`w-4 h-4 ${doc.color}`} />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs sm:text-sm font-bold text-white truncate">{doc.title}</h4>
                  <p className="text-[11px] text-zinc-400">{doc.type} · Synced {doc.updated}</p>
                </div>
              </div>

              <button
                onClick={() => sendMessage(`Read and analyze data from ${doc.title}`)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-purple-600/30 text-xs font-medium text-purple-300 hover:text-white border border-white/[0.08] transition-colors"
              >
                <span>Inspect</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
