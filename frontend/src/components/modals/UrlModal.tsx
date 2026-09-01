import React, { useState } from 'react';
import { Link, X, Sparkles } from 'lucide-react';
import { useAssistant } from '../../context/AssistantContext';

interface UrlModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UrlModal: React.FC<UrlModalProps> = ({ isOpen, onClose }) => {
  const { sendMessage } = useAssistant();
  const [url, setUrl] = useState('');
  const [instruction, setInstruction] = useState('Summarize the key points, actions, and structure of this URL');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    let finalUrl = url.trim();
    if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
      finalUrl = `https://${finalUrl}`;
    }

    sendMessage(`${instruction}: ${finalUrl}`, [
      { type: 'url', name: finalUrl.replace(/^https?:\/\//, ''), value: finalUrl },
    ]);

    setUrl('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in">
      <div className="w-full max-w-lg rounded-2xl bg-[#0D0F19] border border-purple-500/30 shadow-2xl p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-purple-950/60 border border-purple-400/30 flex items-center justify-center">
              <Link className="w-4 h-4 text-purple-300" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Ingest & Summarize URL</h3>
              <p className="text-[11px] text-zinc-400">Add any webpage, documentation or article</p>
            </div>
          </div>
          <button onClick={onClose} className="text-zinc-400 hover:text-white p-1">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
              Target URL
            </label>
            <input
              type="url"
              required
              placeholder="https://example.com/article"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] focus:border-purple-500 text-xs text-white placeholder-zinc-500 outline-none"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
              Assistant Instruction
            </label>
            <input
              type="text"
              value={instruction}
              onChange={(e) => setInstruction(e.target.value)}
              placeholder="e.g. Summarize and extract action items"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] focus:border-purple-500 text-xs text-white placeholder-zinc-500 outline-none"
            />
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.08] text-xs font-medium text-zinc-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 text-xs font-bold text-white shadow-lg shadow-purple-950/50"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Process with Agent</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
