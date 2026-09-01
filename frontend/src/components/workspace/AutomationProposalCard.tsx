import React, { useState } from 'react';
import {
  Workflow,
  Sparkles,
  ArrowDown,
  Clock,
  CheckCircle2,
  SlidersHorizontal,
  Mail,
  FileText,
  Calendar,
  Layers,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import type { AutomationProposal } from '../../types/assistant';
import { useAssistant } from '../../context/AssistantContext';

interface AutomationProposalCardProps {
  proposal: AutomationProposal;
}

export const AutomationProposalCard: React.FC<AutomationProposalCardProps> = ({ proposal }) => {
  const { deployAutomation } = useAssistant();
  const [isModifying, setIsModifying] = useState(false);
  const [editedSchedule, setEditedSchedule] = useState(proposal.schedule);

  const handleDeploy = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#8b5cf6', '#a855f7', '#6366f1', '#ec4899'],
    });
    deployAutomation(proposal);
  };

  const getServiceIcon = (service: string) => {
    switch (service) {
      case 'gmail':
        return <Mail className="w-3.5 h-3.5 text-red-400" />;
      case 'gemini':
        return <Sparkles className="w-3.5 h-3.5 text-purple-400" />;
      case 'docs':
        return <FileText className="w-3.5 h-3.5 text-blue-400" />;
      case 'calendar':
        return <Calendar className="w-3.5 h-3.5 text-indigo-400" />;
      default:
        return <Layers className="w-3.5 h-3.5 text-emerald-400" />;
    }
  };

  const isDeployed = proposal.status === 'deployed';

  return (
    <div className="w-full max-w-xl rounded-2xl bg-[#0F111D]/90 backdrop-blur-xl border border-purple-500/30 overflow-hidden shadow-2xl transition-all duration-300 my-4 animate-in fade-in zoom-in-95">
      {/* Header Badge */}
      <div className="bg-gradient-to-r from-purple-950/70 via-purple-900/40 to-indigo-950/50 px-4 py-2.5 border-b border-purple-500/20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-purple-600/30 border border-purple-400/40 flex items-center justify-center">
            <Workflow className="w-3 h-3 text-purple-300" />
          </div>
          <span className="text-[11px] font-extrabold tracking-wider uppercase text-purple-300 font-mono">
            AI UNDERSTANDS
          </span>
        </div>
        {isDeployed && (
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-[10px] font-bold text-emerald-400">
            <CheckCircle2 className="w-3 h-3" />
            <span>ACTIVE AUTOMATION</span>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="p-5 space-y-4">
        <div>
          <h4 className="text-sm font-bold text-white mb-1">
            "I can create this automation for you."
          </h4>
          <p className="text-xs text-zinc-400 leading-relaxed">
            {proposal.description}
          </p>
        </div>

        {/* Step Sequence Visualizer */}
        <div className="space-y-2 py-1">
          {proposal.steps.map((step, idx) => (
            <React.Fragment key={step.id}>
              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-purple-500/30 transition-colors">
                <div className="w-6 h-6 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center shrink-0">
                  {getServiceIcon(step.service)}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-semibold text-zinc-200">
                    {step.label}
                  </span>
                  <span className="text-[11px] text-zinc-400 truncate">
                    {step.action}
                  </span>
                </div>
              </div>
              {idx < proposal.steps.length - 1 && (
                <div className="flex justify-center py-0.5">
                  <ArrowDown className="w-3.5 h-3.5 text-purple-500/60" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Schedule Badge */}
        <div className="flex items-center justify-between p-2.5 rounded-xl bg-purple-950/25 border border-purple-500/20">
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-purple-400" />
            <span className="text-xs font-medium text-zinc-300">Schedule:</span>
          </div>
          {isModifying ? (
            <input
              type="text"
              value={editedSchedule}
              onChange={(e) => setEditedSchedule(e.target.value)}
              className="bg-purple-900/40 border border-purple-400/40 rounded px-2 py-0.5 text-xs text-white outline-none"
            />
          ) : (
            <span className="text-xs font-semibold text-purple-300 font-mono">
              {editedSchedule}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        {!isDeployed ? (
          <div className="flex items-center justify-end gap-2.5 pt-2">
            <button
              onClick={() => setIsModifying(!isModifying)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.09] border border-white/[0.08] text-xs font-medium text-zinc-300 hover:text-white transition-all"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>{isModifying ? 'Done' : 'Modify'}</span>
            </button>

            <button
              onClick={handleDeploy}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-xs font-bold text-white shadow-lg shadow-purple-950/60 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Create Automation</span>
            </button>
          </div>
        ) : (
          <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-center">
            <p className="text-xs font-medium text-emerald-300">
              ⚡ Automation successfully configured and active in your n8n workflow.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
