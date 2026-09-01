import React from 'react';
import {
  Workflow,
  Plus,
  Play,
  Clock,
  CheckCircle2,
  Mail,
  Calendar,
  DollarSign,
} from 'lucide-react';
import { useAssistant } from '../../context/AssistantContext';

export const AutomationsView: React.FC = () => {
  const { sendMessage } = useAssistant();

  const automations = [
    {
      id: 'auto-1',
      title: 'Morning Email Executive Briefing',
      description: 'Scans Gmail inbox for priority messages, generates a synthesis with Gemini, and records action points in Docs.',
      schedule: 'Every day at 8:00 AM IST',
      status: 'Active',
      service: 'Gmail + Gemini',
      icon: Mail,
      accent: 'text-red-400 border-red-500/20 bg-red-950/20',
    },
    {
      id: 'auto-2',
      title: 'Daily Meeting Calendar Sync',
      description: 'Fetches today’s schedule from Google Calendar (Personal_assistance) and delivers a morning agenda breakdown.',
      schedule: 'Every day at 7:30 AM IST',
      status: 'Active',
      service: 'Google Calendar',
      icon: Calendar,
      accent: 'text-indigo-400 border-indigo-500/20 bg-indigo-950/20',
    },
    {
      id: 'auto-3',
      title: 'Expense & Budget Reconciliation',
      description: 'Categorizes receipts and transactions into finance_tracking Google Sheet with automated calculator totals.',
      schedule: 'On Demand & Weekly',
      status: 'Active',
      service: 'Google Sheets + Calc',
      icon: DollarSign,
      accent: 'text-emerald-400 border-emerald-500/20 bg-emerald-950/20',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 space-y-6 animate-in fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.06] pb-6">
        <div>
          <h1 className="text-2xl font-bold text-white font-['Outfit'] flex items-center gap-2.5">
            <Workflow className="w-6 h-6 text-purple-400" />
            <span>Automations Hub</span>
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Manage your background agent workflows, schedule triggers, and connected n8n nodes.
          </p>
        </div>

        <button
          onClick={() =>
            sendMessage(
              'Create a new automation that monitors my emails and calendar events'
            )
          }
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-bold text-white shadow-lg shadow-purple-950/50 transition-all self-start"
        >
          <Plus className="w-4 h-4" />
          <span>New Automation</span>
        </button>
      </div>

      {/* Automations Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {automations.map((auto) => {
          const Icon = auto.icon;
          return (
            <div
              key={auto.id}
              className="p-5 rounded-2xl bg-[#0E1019]/90 border border-white/[0.06] hover:border-purple-500/30 transition-all shadow-xl flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className={`w-9 h-9 rounded-xl border flex items-center justify-center ${auto.accent}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-[10px] font-bold text-emerald-400">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>{auto.status}</span>
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-white">{auto.title}</h3>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                    {auto.description}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-white/[0.05] space-y-3">
                <div className="flex items-center gap-2 text-xs text-zinc-400">
                  <Clock className="w-3.5 h-3.5 text-purple-400" />
                  <span className="font-mono text-[11px]">{auto.schedule}</span>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] text-purple-300 font-mono">
                    {auto.service}
                  </span>
                  <button
                    onClick={() =>
                      sendMessage(`Trigger immediate execution for ${auto.title}`)
                    }
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.05] hover:bg-purple-600/30 hover:text-white border border-white/[0.08] text-[11px] font-medium text-zinc-300 transition-colors"
                  >
                    <Play className="w-3 h-3" />
                    <span>Run Now</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
