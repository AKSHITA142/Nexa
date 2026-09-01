import React, { useState, useRef, useEffect } from 'react';
import {
  Plus,
  Paperclip,
  Mic,
  MicOff,
  LayoutTemplate,
  Send,
  Link,
  X,
  FileText,
} from 'lucide-react';
import { useAssistant } from '../../context/AssistantContext';

interface Attachment {
  type: 'url' | 'file';
  name: string;
  value: string;
}

interface AICommandComposerProps {
  onOpenUrlModal?: () => void;
  onOpenTemplateModal?: () => void;
  compact?: boolean;
}

export const AICommandComposer: React.FC<AICommandComposerProps> = ({
  onOpenUrlModal,
  onOpenTemplateModal,
  compact = false,
}) => {
  const {
    sendMessage,
    isProcessing,
    isListeningVoice,
    voiceTranscript,
    startVoiceInput,
    stopVoiceInput,
  } = useAssistant();

  const [input, setInput] = useState('');
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlInputValue, setUrlInputValue] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Sync voice transcript to input
  useEffect(() => {
    if (voiceTranscript) {
      setInput((prev) => (prev ? `${prev} ${voiceTranscript}` : voiceTranscript));
    }
  }, [voiceTranscript]);

  const handleSend = async () => {
    if ((!input.trim() && attachments.length === 0) || isProcessing) return;
    const messageText = input;
    const currentAttachments = [...attachments];

    setInput('');
    setAttachments([]);
    if (isListeningVoice) {
      stopVoiceInput();
    }

    await sendMessage(messageText, currentAttachments);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setAttachments((prev) => [
        ...prev,
        {
          type: 'file',
          name: file.name,
          value: URL.createObjectURL(file),
        },
      ]);
    }
  };

  const handleAddUrl = () => {
    if (urlInputValue.trim()) {
      let finalUrl = urlInputValue.trim();
      if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
        finalUrl = `https://${finalUrl}`;
      }
      setAttachments((prev) => [
        ...prev,
        {
          type: 'url',
          name: finalUrl.replace(/^https?:\/\//, ''),
          value: finalUrl,
        },
      ]);
      setUrlInputValue('');
      setShowUrlInput(false);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className={`w-full max-w-4xl mx-auto transition-all duration-300 ${compact ? 'px-0' : 'px-4'}`}>
      <div className="relative rounded-2xl bg-[#0D0F18]/90 backdrop-blur-2xl border border-purple-500/25 composer-glow p-4 sm:p-5 transition-all duration-300">
        {/* Hidden File Input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          className="hidden"
        />

        {/* URL Quick Bar Overlay */}
        {showUrlInput && (
          <div className="mb-3 flex items-center gap-2 p-2 rounded-xl bg-purple-950/30 border border-purple-500/30 animate-in fade-in slide-in-from-top-1">
            <Link className="w-4 h-4 text-purple-400 shrink-0" />
            <input
              type="url"
              placeholder="Paste website or document URL..."
              value={urlInputValue}
              onChange={(e) => setUrlInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddUrl();
                }
              }}
              autoFocus
              className="w-full bg-transparent text-xs text-white placeholder-zinc-500 outline-none"
            />
            <button
              onClick={handleAddUrl}
              className="px-2.5 py-1 rounded-lg bg-purple-600 hover:bg-purple-500 text-[11px] font-semibold text-white transition-colors"
            >
              Add
            </button>
            <button
              onClick={() => setShowUrlInput(false)}
              className="p-1 text-zinc-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Attachment Chips */}
        {attachments.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {attachments.map((att, idx) => (
              <div
                key={idx}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-purple-900/30 border border-purple-500/30 text-xs text-purple-200"
              >
                {att.type === 'url' ? (
                  <Link className="w-3 h-3 text-purple-400" />
                ) : (
                  <FileText className="w-3 h-3 text-purple-400" />
                )}
                <span className="truncate max-w-[180px] font-mono text-[11px]">
                  {att.name}
                </span>
                <button
                  onClick={() => removeAttachment(idx)}
                  className="hover:text-white p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Main Textarea */}
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={
            isListeningVoice
              ? 'Listening to your voice...'
              : 'Ask me anything...'
          }
          rows={compact ? 2 : 3}
          className="w-full bg-transparent text-sm sm:text-base text-zinc-100 placeholder-zinc-500 outline-none resize-none leading-relaxed"
        />

        {/* Voice Visualizer Indicator when recording */}
        {isListeningVoice && (
          <div className="flex items-center gap-2 my-2 py-1 px-3 rounded-lg bg-purple-950/40 border border-purple-500/40 w-fit">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span className="text-xs text-purple-300 font-medium">Recording voice</span>
            <div className="flex items-center gap-0.5 ml-2 h-4">
              <span className="w-1 bg-purple-400 rounded-full animate-wave-1" />
              <span className="w-1 bg-purple-400 rounded-full animate-wave-2" />
              <span className="w-1 bg-purple-400 rounded-full animate-wave-3" />
              <span className="w-1 bg-purple-400 rounded-full animate-wave-4" />
            </div>
          </div>
        )}

        {/* Bottom Actions Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/[0.05]">
          {/* Action Chips */}
          <div className="flex flex-wrap items-center gap-2 select-none">
            {/* + Add URL */}
            <button
              type="button"
              onClick={() => {
                if (onOpenUrlModal) onOpenUrlModal();
                else setShowUrlInput(!showUrlInput);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-purple-500/30 text-xs font-medium text-zinc-300 hover:text-white transition-all duration-200"
            >
              <Plus className="w-3.5 h-3.5 text-zinc-400" />
              <span>Add URL</span>
            </button>

            {/* Upload File */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-purple-500/30 text-xs font-medium text-zinc-300 hover:text-white transition-all duration-200"
            >
              <Paperclip className="w-3.5 h-3.5 text-zinc-400" />
              <span>Upload File</span>
            </button>

            {/* Voice Input */}
            <button
              type="button"
              onClick={isListeningVoice ? stopVoiceInput : startVoiceInput}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium transition-all duration-200 ${
                isListeningVoice
                  ? 'bg-red-500/20 border-red-500/50 text-red-300 shadow-[0_0_15px_rgba(239,68,68,0.3)]'
                  : 'bg-white/[0.04] hover:bg-white/[0.08] border-white/[0.08] hover:border-purple-500/30 text-zinc-300 hover:text-white'
              }`}
            >
              {isListeningVoice ? (
                <MicOff className="w-3.5 h-3.5 text-red-400" />
              ) : (
                <Mic className="w-3.5 h-3.5 text-zinc-400" />
              )}
              <span>{isListeningVoice ? 'Stop' : 'Voice Input'}</span>
            </button>

            {/* Use Template */}
            <button
              type="button"
              onClick={onOpenTemplateModal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-purple-500/30 text-xs font-medium text-zinc-300 hover:text-white transition-all duration-200"
            >
              <LayoutTemplate className="w-3.5 h-3.5 text-zinc-400" />
              <span>Use Template</span>
            </button>
          </div>

          {/* Send / Execute Button */}
          <button
            type="button"
            disabled={(!input.trim() && attachments.length === 0) || isProcessing}
            onClick={handleSend}
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg ${
              input.trim() || attachments.length > 0
                ? 'bg-gradient-to-tr from-purple-600 via-violet-600 to-indigo-500 text-white shadow-purple-900/50 hover:scale-105 hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] cursor-pointer'
                : 'bg-white/[0.05] border border-white/[0.08] text-zinc-600 cursor-not-allowed'
            }`}
            aria-label="Send prompt"
          >
            <Send className="w-4 h-4 translate-x-px -translate-y-px" />
          </button>
        </div>
      </div>
    </div>
  );
};
