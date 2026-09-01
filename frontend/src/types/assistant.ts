export type NavSection =
  | 'home'
  | 'ai-command'
  | 'automations'
  | 'agents'
  | 'knowledge'
  | 'templates'
  | 'activity'
  | 'calendar'
  | 'settings';

export type ToolCategory =
  | 'calendar'
  | 'gmail'
  | 'sheets'
  | 'calculator'
  | 'docs'
  | 'tasks'
  | 'search'
  | 'system';

export interface ToolCallExecution {
  id: string;
  name: string;
  category: ToolCategory;
  description: string;
  status: 'running' | 'completed' | 'failed';
  result?: string;
}

export interface AutomationStep {
  id: string;
  label: string;
  service: 'gmail' | 'calendar' | 'gemini' | 'sheets' | 'docs' | 'tasks' | 'webhook';
  action: string;
}

export interface AutomationProposal {
  id: string;
  title: string;
  description: string;
  schedule: string;
  steps: AutomationStep[];
  status: 'draft' | 'confirmed' | 'executing' | 'deployed';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  toolCalls?: ToolCallExecution[];
  automationProposal?: AutomationProposal;
  attachments?: {
    type: 'url' | 'file';
    name: string;
    value: string;
  }[];
}

export interface ConversationThread {
  id: string;
  title: string;
  summary: string;
  timestamp: string;
  timeAgo: string;
  messages: ChatMessage[];
  category?: string;
}

export interface SuggestionPrompt {
  id: string;
  action: string;
  target: string;
  icon: string;
  prompt: string;
}

export interface WebhookConfig {
  url: string;
  apiKey?: string;
  useFallbackSimulation: boolean;
  timeoutMs: number;
}
