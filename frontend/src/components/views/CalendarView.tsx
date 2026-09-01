import React from 'react';
import { Calendar as CalendarIcon, Clock, Plus } from 'lucide-react';
import { useAssistant } from '../../context/AssistantContext';

export const CalendarView: React.FC = () => {
  const { sendMessage } = useAssistant();

  const events = [
    {
      id: 'e-1',
      title: 'Strategy & Review Meeting with Rahul',
      time: 'Tomorrow · 3:00 PM – 3:30 PM',
      calendar: 'Personal_assistance',
      type: 'Google Meet',
      attendees: 'Akshita J., Rahul',
    },
    {
      id: 'e-2',
      title: 'n8n Workflow & LangChain Architecture Sync',
      time: 'Wednesday · 11:00 AM – 12:00 PM',
      calendar: 'Personal_assistance',
      type: 'Discussion',
      attendees: 'Engineering Team',
    },
    {
      id: 'e-3',
      title: 'Weekly Expense & Budget Audit',
      time: 'Friday · 5:00 PM – 5:30 PM',
      calendar: 'finance_tracking',
      type: 'Finance Review',
      attendees: 'Akshita J.',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 space-y-6 animate-in fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.06] pb-6">
        <div>
          <h1 className="text-2xl font-bold text-white font-['Outfit'] flex items-center gap-2.5">
            <CalendarIcon className="w-6 h-6 text-indigo-400" />
            <span>Google Calendar Manager</span>
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Connected to Google Calendar: <strong className="text-purple-300">Personal_assistance</strong>
          </p>
        </div>

        <button
          onClick={() =>
            sendMessage('Schedule a new meeting for tomorrow on my calendar')
          }
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white shadow-lg shadow-indigo-950/50 transition-all self-start"
        >
          <Plus className="w-4 h-4" />
          <span>Schedule with AI</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {events.map((ev) => (
          <div
            key={ev.id}
            className="p-5 rounded-2xl bg-[#0E1019]/90 border border-white/[0.06] hover:border-indigo-500/30 transition-all shadow-xl space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-[10px] font-mono text-indigo-300">
                {ev.calendar}
              </span>
              <span className="text-[10px] text-zinc-500 font-medium">Google Calendar API</span>
            </div>

            <div>
              <h3 className="text-sm font-bold text-white">{ev.title}</h3>
              <p className="text-xs text-indigo-300 mt-1 font-mono flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>{ev.time}</span>
              </p>
            </div>

            <div className="pt-2 border-t border-white/[0.05] text-xs text-zinc-400 space-y-1">
              <p className="text-[11px]">Attendees: {ev.attendees}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
