import React, { useState } from 'react';
import { Settings as SettingsIcon, Server, RefreshCw, CheckCircle2, Cpu } from 'lucide-react';
import { useAssistant } from '../../context/AssistantContext';

export const SettingsView: React.FC = () => {
  const { webhookUrl, setWebhookUrl, webhookStatus } = useAssistant();
  const [inputUrl, setInputUrl] = useState(webhookUrl);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<'success' | 'failed' | null>(null);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setWebhookUrl(inputUrl);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleTestConnection = async () => {
    setTesting(true);
    setTestResult(null);
    try {
      const res = await fetch(inputUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: 'ping_test' }),
      });
      if (res.ok) {
        setTestResult('success');
      } else {
        setTestResult('failed');
      }
    } catch {
      setTestResult('failed');
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 space-y-6 animate-in fade-in">
      <div className="border-b border-white/[0.06] pb-6">
        <h1 className="text-2xl font-bold text-white font-['Outfit'] flex items-center gap-2.5">
          <SettingsIcon className="w-6 h-6 text-purple-400" />
          <span>System & Webhook Configuration</span>
        </h1>
        <p className="text-sm text-zinc-400 mt-1">
          Manage your n8n webhook connection, LangChain model settings, and execution parameters.
        </p>
      </div>

      <div className="space-y-6">
        {/* Webhook Card */}
        <div className="p-6 rounded-2xl bg-[#0E1019]/90 border border-white/[0.06] space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Server className="w-4 h-4 text-purple-400" />
              <span>n8n Webhook Endpoint</span>
            </h3>
            <span
              className={`text-xs font-mono px-2.5 py-0.5 rounded-full ${
                webhookStatus === 'connected'
                  ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/30'
                  : 'bg-indigo-950/80 text-indigo-400 border border-indigo-500/30'
              }`}
            >
              ● Status: {webhookStatus}
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                placeholder="http://localhost:5678/webhook-test/fcff6a4d-b6b3-4385-9e1e-e88db4e08bf5"
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] focus:border-purple-500 text-xs font-mono text-white placeholder-zinc-500 outline-none"
              />
              <button
                type="button"
                onClick={handleTestConnection}
                disabled={testing}
                className="px-4 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] text-xs font-medium text-zinc-300 hover:text-white flex items-center gap-1.5 shrink-0"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${testing ? 'animate-spin' : ''}`} />
                <span>Test Webhook</span>
              </button>
            </div>

            {testResult === 'success' && (
              <p className="text-xs text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Webhook connection verified successfully!
              </p>
            )}
            {testResult === 'failed' && (
              <p className="text-xs text-amber-400">
                Webhook connection failed. The frontend will automatically use local agent fallback simulation for testing.
              </p>
            )}
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-bold text-white shadow-lg shadow-purple-950/50 transition-all"
            >
              {saved ? 'Saved Successfully!' : 'Save Webhook URL'}
            </button>
          </div>
        </div>

        {/* Security & Access Passcode Card */}
        <div className="p-6 rounded-2xl bg-[#0E1019]/90 border border-white/[0.06] space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="text-base">🔐</span>
              <span>Workspace Security & Passcode</span>
            </h3>
            <span className="text-xs text-purple-400 font-medium">Active Protection</span>
          </div>

          <p className="text-xs text-zinc-400">
            Set your secret passcode to prevent unauthorized access when sharing or accessing NEXA from another device.
          </p>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-300">Access Passcode</label>
            <div className="flex items-center gap-3">
              <input
                type="text"
                defaultValue={localStorage.getItem('nexa_access_code') || 'nexa142'}
                id="nexa-passcode-input"
                className="w-full max-w-sm px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white font-mono text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50"
              />
              <button
                type="button"
                onClick={() => {
                  const input = document.getElementById('nexa-passcode-input') as HTMLInputElement;
                  if (input && input.value.trim()) {
                    localStorage.setItem('nexa_access_code', input.value.trim());
                    alert('Passcode updated successfully!');
                  }
                }}
                className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-bold text-white shadow-md shadow-purple-950/50 transition-all shrink-0"
              >
                Update Passcode
              </button>
            </div>
          </div>
        </div>

        {/* System Diagnostics */}
        <div className="p-6 rounded-2xl bg-[#0E1019]/90 border border-white/[0.06] space-y-4 shadow-xl">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Cpu className="w-4 h-4 text-purple-400" />
            <span>Workflow & Agent Architecture</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
              <span className="text-zinc-500 text-[10px] block">LLM Engine</span>
              <span className="font-semibold text-zinc-200">Google Gemini 3.5 Flash-lite</span>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
              <span className="text-zinc-500 text-[10px] block">Context Memory</span>
              <span className="font-semibold text-zinc-200">Buffer Window (15 messages)</span>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
              <span className="text-zinc-500 text-[10px] block">Execution Timezone</span>
              <span className="font-semibold text-zinc-200">Asia/Kolkata (IST)</span>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
              <span className="text-zinc-500 text-[10px] block">Google Calendar ID</span>
              <span className="font-mono text-zinc-300 text-[11px]">Personal_assistance</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
