import React, { useState } from 'react';
import { Bell, Sparkles, Plus, ChevronDown } from 'lucide-react';
import { useAssistant } from '../../context/AssistantContext';

export const TopBar: React.FC = () => {
  const {
    unreadNotifications,
    startNewChat,
    webhookStatus,
    setCurrentView,
  } = useAssistant();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="h-16 w-full flex items-center justify-end px-8 gap-3.5 z-10 select-none">
      {/* Webhook Status Indicator */}
      <div
        onClick={() => setCurrentView('settings')}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.07] text-xs cursor-pointer hover:border-purple-500/40 transition-colors"
        title={`Webhook status: ${webhookStatus}`}
      >
        <span
          className={`w-2 h-2 rounded-full ${
            webhookStatus === 'connected'
              ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]'
              : webhookStatus === 'checking'
              ? 'bg-amber-400 animate-pulse'
              : 'bg-indigo-400 shadow-[0_0_8px_#818cf8]'
          }`}
        />
        <span className="text-zinc-400 font-medium text-[11px]">
          {webhookStatus === 'connected'
            ? 'n8n Active'
            : webhookStatus === 'checking'
            ? 'Connecting...'
            : 'Agent Ready'}
        </span>
      </div>

      {/* Notifications Button */}
      <div className="relative">
        <button
          onClick={() => setShowNotifications(!showNotifications)}
          className="relative p-2.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-zinc-300 hover:text-white transition-all duration-200"
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4" />
          {unreadNotifications > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-purple-600 border border-[#0A0B10] text-[10px] font-bold text-white flex items-center justify-center shadow-lg shadow-purple-900/50">
              {unreadNotifications}
            </span>
          )}
        </button>

        {/* Notifications Popover */}
        {showNotifications && (
          <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-[#11131c] border border-purple-500/25 shadow-2xl p-4 space-y-3 z-50 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-2">
              <h5 className="text-xs font-bold text-white">System Notifications</h5>
              <span className="text-[10px] text-purple-400 font-medium">6 unread</span>
            </div>
            <div className="space-y-2 text-xs">
              <div className="p-2 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                <p className="text-zinc-200 font-medium">Calendar Event Created</p>
                <p className="text-[11px] text-zinc-400">Meeting with Rahul synced for tomorrow 3:00 PM</p>
              </div>
              <div className="p-2 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                <p className="text-zinc-200 font-medium">Finance Tracker Updated</p>
                <p className="text-[11px] text-zinc-400">Expense appended to Google Sheet finance_tracking</p>
              </div>
              <div className="p-2 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                <p className="text-zinc-200 font-medium">Gemini 3.5 Flash-lite Connected</p>
                <p className="text-[11px] text-zinc-400">Agent memory window set to 15 turns</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Sparkle Quick Action */}
      <button
        onClick={startNewChat}
        className="p-2.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-purple-400 hover:text-purple-300 transition-all duration-200"
        title="Start Fresh Context"
      >
        <Sparkles className="w-4 h-4" />
      </button>

      {/* "+ New" Dropdown Pill */}
      <div className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-purple-950/80 via-purple-900/60 to-indigo-950/80 hover:from-purple-900/90 hover:to-indigo-900/90 border border-purple-500/40 text-purple-200 hover:text-white text-xs font-semibold shadow-[0_0_15px_rgba(147,51,234,0.2)] transition-all duration-200"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New</span>
          <ChevronDown className="w-3 h-3 ml-0.5 opacity-70" />
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 rounded-xl bg-[#11131c] border border-purple-500/30 shadow-2xl p-1.5 space-y-1 z-50 animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => {
                startNewChat();
                setIsDropdownOpen(false);
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-zinc-200 hover:bg-purple-600/20 hover:text-white transition-colors text-left"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>New Conversation</span>
            </button>
            <button
              onClick={() => {
                setCurrentView('automations');
                setIsDropdownOpen(false);
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-zinc-200 hover:bg-purple-600/20 hover:text-white transition-colors text-left"
            >
              <Plus className="w-3.5 h-3.5 text-indigo-400" />
              <span>New Automation</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
