import React, { useState } from 'react';
import {
  Settings,
  X,
  Cpu,
  CheckCircle2,
  RefreshCw,
} from 'lucide-react';
import { useAssistant } from '../../context/AssistantContext';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const {
    webhookUrl,
    setWebhookUrl,
    webhookStatus,
  } = useAssistant();

  const [inputUrl, setInputUrl] = useState(webhookUrl);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<'success' | 'failed' | null>(null);

  if (!isOpen) return null;

  const handleSave = () => {
    setWebhookUrl(inputUrl);
    onClose();
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in">
      <div className="w-full max-w-xl rounded-2xl bg-[#0D0F19] border border-purple-500/30 shadow-2xl p-6 space-y-5">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-purple-950/60 border border-purple-400/30 flex items-center justify-center">
              <Settings className="w-4 h-4 text-purple-300" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Application & n8n Settings</h3>
              <p className="text-[11px] text-zinc-400">
                Configure your n8n webhook connection and backend integration
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-zinc-400 hover:text-white p-1">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4">
          {/* Webhook URL Input */}
          <div>
            <label className="text-xs font-semibold text-zinc-200 mb-1.5 flex items-center justify-between">
              <span>n8n Webhook Endpoint URL</span>
              <span
                className={`text-[10px] font-mono font-medium ${
                  webhookStatus === 'connected' ? 'text-emerald-400' : 'text-zinc-400'
                }`}
              >
                ● Status: {webhookStatus}
              </span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                placeholder="http://localhost:5678/webhook-test/..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] focus:border-purple-500 text-xs font-mono text-white placeholder-zinc-500 outline-none"
              />
              <button
                type="button"
                onClick={handleTestConnection}
                disabled={testing}
                className="px-3.5 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] text-xs font-medium text-zinc-300 hover:text-white flex items-center gap-1.5 shrink-0"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${testing ? 'animate-spin' : ''}`} />
                <span>Test</span>
              </button>
            </div>
            {testResult === 'success' && (
              <p className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Webhook responded successfully!
              </p>
            )}
            {testResult === 'failed' && (
              <p className="text-[11px] text-amber-400 mt-1">
                Webhook offline or unreachable. The assistant will use intelligent local agent fallback.
              </p>
            )}
          </div>

          {/* Model & Architecture Info Card */}
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
            <h4 className="text-xs font-bold text-zinc-200 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-purple-400" />
              <span>Active Agent Configuration</span>
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                <span className="text-[10px] text-zinc-500 block">LLM Engine</span>
                <span className="font-semibold text-zinc-200">Gemini 3.5 Flash-lite</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                <span className="text-[10px] text-zinc-500 block">Memory Window</span>
                <span className="font-semibold text-zinc-200">15 Turns Buffer</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                <span className="text-[10px] text-zinc-500 block">Timezone</span>
                <span className="font-semibold text-zinc-200">Asia/Kolkata (IST)</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                <span className="text-[10px] text-zinc-500 block">Connected Tools</span>
                <span className="font-semibold text-purple-300">7 Active Google APIs</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-white/[0.08]">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.08] text-xs font-medium text-zinc-300"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-bold text-white shadow-lg shadow-purple-950/50"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};
