import React from 'react';
import {
  Calendar,
  Mail,
  FileSpreadsheet,
  FileText,
  CheckSquare,
  Search,
  Calculator,
  CheckCircle2,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import type { ToolCallExecution } from '../../types/assistant';

interface ToolExecutionBadgeProps {
  tool: ToolCallExecution;
}

export const ToolExecutionBadge: React.FC<ToolExecutionBadgeProps> = ({ tool }) => {
  const getToolIcon = () => {
    switch (tool.category) {
      case 'calendar':
        return <Calendar className="w-3.5 h-3.5 text-indigo-400" />;
      case 'gmail':
        return <Mail className="w-3.5 h-3.5 text-red-400" />;
      case 'sheets':
        return <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />;
      case 'calculator':
        return <Calculator className="w-3.5 h-3.5 text-amber-400" />;
      case 'docs':
        return <FileText className="w-3.5 h-3.5 text-blue-400" />;
      case 'tasks':
        return <CheckSquare className="w-3.5 h-3.5 text-teal-400" />;
      case 'search':
        return <Search className="w-3.5 h-3.5 text-purple-400" />;
      default:
        return <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />;
    }
  };

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#090A10]/90 border border-white/[0.08] text-xs max-w-fit shadow-md">
      <div className="w-5 h-5 rounded-lg bg-white/[0.05] flex items-center justify-center">
        {getToolIcon()}
      </div>
      <div className="flex items-center gap-1.5">
        <span className="font-semibold text-zinc-200">{tool.name}</span>
        <span className="text-zinc-500 font-mono text-[10px]">·</span>
        <span className="text-zinc-400 text-[11px] truncate max-w-[220px]">
          {tool.description}
        </span>
      </div>
      <div className="ml-1 flex items-center">
        {tool.status === 'completed' ? (
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
        ) : tool.status === 'running' ? (
          <Loader2 className="w-3.5 h-3.5 text-purple-400 animate-spin" />
        ) : (
          <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
        )}
      </div>
    </div>
  );
};
