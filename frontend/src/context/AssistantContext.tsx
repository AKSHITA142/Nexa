import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type {
  NavSection,
  ChatMessage,
  ConversationThread,
  ToolCallExecution,
  AutomationProposal,
} from '../types/assistant';
import { N8nService, DEFAULT_WEBHOOK_URL } from '../services/n8nService';

interface AssistantContextType {
  currentView: NavSection;
  setCurrentView: (view: NavSection) => void;
  isWorkspaceActive: boolean;
  setIsWorkspaceActive: (active: boolean) => void;
  activeConversation: ConversationThread | null;
  recentConversations: ConversationThread[];
  isProcessing: boolean;
  activeToolExecution: ToolCallExecution | null;
  webhookUrl: string;
  setWebhookUrl: (url: string) => void;
  webhookStatus: 'connected' | 'offline' | 'checking';
  unreadNotifications: number;
  isListeningVoice: boolean;
  voiceTranscript: string;
  startVoiceInput: () => void;
  stopVoiceInput: () => void;
  sendMessage: (
    content: string,
    attachments?: { type: 'url' | 'file'; name: string; value: string }[]
  ) => Promise<void>;
  startNewChat: () => void;
  selectConversation: (id: string) => void;
  deployAutomation: (proposal: AutomationProposal) => void;
  dismissAutomation: (proposalId: string) => void;
}

const INITIAL_CONVERSATIONS: ConversationThread[] = [
  {
    id: 'conv-1',
    title: 'Plan my trip to Goa for 3 days with budget hotels and activities',
    summary: 'Curated 3-day itinerary covering North & South Goa stays, beach shacks, and budget tracking.',
    timestamp: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
    timeAgo: '2h ago',
    category: 'Travel & Planning',
    messages: [
      {
        id: 'm-1-1',
        role: 'user',
        content: 'Plan my trip to Goa for 3 days with budget hotels and activities',
        timestamp: new Date(Date.now() - 2 * 3600 * 1000).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      },
      {
        id: 'm-1-2',
        role: 'assistant',
        content: `Here is a curated 3-day itinerary for your trip to Goa with budget-friendly stays and activities:

### Day 1: North Goa — Vibes & Coastline
- **Morning**: Check into a boutique guesthouse in Anjuna or Vagator (~₹1,800/night).
- **Afternoon**: Relax at Ozran Beach and grab lunch at a local beach shack.
- **Evening**: Sunset at Chapora Fort followed by dinner at German Bakery.

### Day 2: Culture & Water Sports
- **Morning**: Water sports at Calangute/Baga (kayaking & parasailing).
- **Afternoon**: Explore Latin Quarter (Fontainhas) in Panjim for Portuguese architecture.
- **Evening**: Cruise along Mandovi River with Goan folk music.

### Day 3: South Goa — Serenity & Heritage
- **Morning**: Visit Palolem Beach and Silent Noise party point.
- **Afternoon**: Fresh seafood thali in Margao.
- **Evening**: Cabo de Rama cliff viewpoint before heading to the airport.

Would you like me to save these notes to **Google Docs** or add key reminders to your **Google Calendar**?`,
        timestamp: new Date(Date.now() - 2 * 3600 * 1000 + 4000).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
        toolCalls: [
          {
            id: 't-1-1',
            name: 'SerpApi Search',
            category: 'search',
            description: 'Searched current Goa budget guesthouses & local guides',
            status: 'completed',
            result: '5 verified options indexed',
          },
        ],
      },
    ],
  },
  {
    id: 'conv-2',
    title: 'Summarize today\'s important emails and send me the report',
    summary: 'Scanned 14 Gmail inbox messages, flagged 3 urgent action items, and drafted daily report.',
    timestamp: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
    timeAgo: '1d ago',
    category: 'Email & Triage',
    messages: [
      {
        id: 'm-2-1',
        role: 'user',
        content: 'Summarize today\'s important emails and send me the report',
        timestamp: 'Yesterday 10:15 AM',
      },
      {
        id: 'm-2-2',
        role: 'assistant',
        content: `I scanned your Gmail inbox and identified **3 high-priority emails** out of 14 new messages:

1. **Client Proposal Feedback** (from *Alex Sterling*)
   - Key Action: Final contract adjustments needed by 4 PM.
2. **Weekly Architecture Review** (from *Tech Lead*)
   - Decision: Gemini 3.5 Flash approved for production agent node.
3. **Cloud Invoice Alert** (from *Google Cloud*)
   - Amount: $42.50 due next Monday.

I have compiled these into a structured summary document in your Google Docs folder.`,
        timestamp: 'Yesterday 10:16 AM',
        toolCalls: [
          {
            id: 't-2-1',
            name: 'Get many messages in Gmail',
            category: 'gmail',
            description: 'Scanned unread inbox messages via Gmail OAuth API',
            status: 'completed',
          },
          {
            id: 't-2-2',
            name: 'Create a document in Google Docs',
            category: 'docs',
            description: 'Saved "Daily Executive Summary - Sep 01" to Google Docs',
            status: 'completed',
          },
        ],
      },
    ],
  },
  {
    id: 'conv-3',
    title: 'Analyze my GitHub repo and suggest improvements',
    summary: 'Examined repository architecture, code cleanliness, and recommended CI/CD automation.',
    timestamp: new Date(Date.now() - 48 * 3600 * 1000).toISOString(),
    timeAgo: '2d ago',
    category: 'Code & Engineering',
    messages: [
      {
        id: 'm-3-1',
        role: 'user',
        content: 'Analyze my GitHub repo and suggest improvements',
        timestamp: '2 days ago',
      },
      {
        id: 'm-3-2',
        role: 'assistant',
        content: `I performed a structural analysis of the repository:

### 🌟 Strengths:
- Clean decoupling between the n8n LangChain agent flow and the client API triggers.
- Robust credential handling across Google OAuth2 modules.

### 💡 Key Recommendations:
1. **Response Streaming**: Add SSE (Server-Sent Events) on the n8n respond node for token-by-token streaming.
2. **Context Memory Caching**: Add Redis or Supabase vector storage for cross-session knowledge retrieval.
3. **Frontend Integration**: Implement a command-center interface with interactive confirmation gates for destructive tasks.`,
        timestamp: '2 days ago',
        toolCalls: [
          {
            id: 't-3-1',
            name: 'Repository Inspector',
            category: 'search',
            description: 'Analyzed directory tree and dependencies',
            status: 'completed',
          },
        ],
      },
    ],
  },
];

const AssistantContext = createContext<AssistantContextType | undefined>(undefined);

export const AssistantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<NavSection>('home');
  const [isWorkspaceActive, setIsWorkspaceActive] = useState<boolean>(false);
  const [activeConversation, setActiveConversation] = useState<ConversationThread | null>(null);
  const [recentConversations, setRecentConversations] = useState<ConversationThread[]>(() => {
    const saved = localStorage.getItem('nexora_conversations');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse cached conversations', e);
      }
    }
    return INITIAL_CONVERSATIONS;
  });

  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [activeToolExecution] = useState<ToolCallExecution | null>(null);
  const [webhookUrl, setWebhookUrlState] = useState<string>(() => {
    return localStorage.getItem('nexora_webhook_url') || DEFAULT_WEBHOOK_URL;
  });
  const [webhookStatus, setWebhookStatus] = useState<'connected' | 'offline' | 'checking'>('checking');
  const [unreadNotifications] = useState<number>(6);

  // Voice recognition state
  const [isListeningVoice, setIsListeningVoice] = useState<boolean>(false);
  const [voiceTranscript, setVoiceTranscript] = useState<string>('');
  const [speechRecognitionInstance, setSpeechRecognitionInstance] = useState<any>(null);

  // Save conversations to localStorage
  useEffect(() => {
    localStorage.setItem('nexora_conversations', JSON.stringify(recentConversations));
  }, [recentConversations]);

  // Set webhook URL helper
  const setWebhookUrl = (url: string) => {
    setWebhookUrlState(url);
    N8nService.getInstance().setWebhookUrl(url);
  };

  // Test webhook connectivity
  const checkWebhookHealth = useCallback(async () => {
    setWebhookStatus('checking');
    try {
      const res = await fetch(webhookUrl, {
        method: 'OPTIONS',
      }).catch(() => null);
      if (res) {
        setWebhookStatus('connected');
      } else {
        setWebhookStatus('offline');
      }
    } catch {
      setWebhookStatus('offline');
    }
  }, [webhookUrl]);

  useEffect(() => {
    checkWebhookHealth();
  }, [checkWebhookHealth]);

  // Web Speech API initialization
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        let interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            setVoiceTranscript((prev) => prev + ' ' + event.results[i][0].transcript);
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error', event);
        setIsListeningVoice(false);
      };

      recognition.onend = () => {
        setIsListeningVoice(false);
      };

      setSpeechRecognitionInstance(recognition);
    }
  }, []);

  const startVoiceInput = () => {
    if (speechRecognitionInstance) {
      setVoiceTranscript('');
      setIsListeningVoice(true);
      try {
        speechRecognitionInstance.start();
      } catch (e) {
        console.warn('Recognition already started', e);
      }
    } else {
      alert('Speech recognition is not supported in this browser. Please use Google Chrome or Edge.');
    }
  };

  const stopVoiceInput = () => {
    if (speechRecognitionInstance) {
      setIsListeningVoice(false);
      speechRecognitionInstance.stop();
    }
  };

  const startNewChat = () => {
    setActiveConversation(null);
    setIsWorkspaceActive(false);
    setCurrentView('home');
  };

  const selectConversation = (id: string) => {
    const found = recentConversations.find((c) => c.id === id);
    if (found) {
      setActiveConversation(found);
      setIsWorkspaceActive(true);
      setCurrentView('home');
    }
  };

  const sendMessage = async (
    content: string,
    attachments?: { type: 'url' | 'file'; name: string; value: string }[]
  ) => {
    if (!content.trim()) return;

    const userMsgId = `usr-${Date.now()}`;
    const userMsg: ChatMessage = {
      id: userMsgId,
      role: 'user',
      content: content.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      attachments,
    };

    let targetConv: ConversationThread;

    if (activeConversation) {
      targetConv = {
        ...activeConversation,
        messages: [...activeConversation.messages, userMsg],
      };
    } else {
      const newId = `conv-${Date.now()}`;
      targetConv = {
        id: newId,
        title: content.length > 50 ? `${content.substring(0, 47)}...` : content,
        summary: 'Active workflow task',
        timestamp: new Date().toISOString(),
        timeAgo: 'Just now',
        messages: [userMsg],
      };
    }

    setActiveConversation(targetConv);
    setIsWorkspaceActive(true);
    setIsProcessing(true);

    // Call n8n service
    const n8n = N8nService.getInstance();
    const result = await n8n.sendMessage(content, targetConv.messages);

    const assistantMsgId = `asst-${Date.now()}`;
    const assistantMsg: ChatMessage = {
      id: assistantMsgId,
      role: 'assistant',
      content: result.output,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      toolCalls: result.toolCalls,
      automationProposal: result.automationProposal,
    };

    const finalConv: ConversationThread = {
      ...targetConv,
      messages: [...targetConv.messages, assistantMsg],
    };

    setActiveConversation(finalConv);
    setIsProcessing(false);

    // Update recent conversations list
    setRecentConversations((prev) => {
      const filtered = prev.filter((c) => c.id !== finalConv.id);
      return [finalConv, ...filtered];
    });
  };

  const deployAutomation = (proposal: AutomationProposal) => {
    if (!activeConversation) return;

    const updatedMessages = activeConversation.messages.map((m) => {
      if (m.automationProposal?.id === proposal.id) {
        return {
          ...m,
          automationProposal: {
            ...m.automationProposal,
            status: 'deployed' as const,
          },
        };
      }
      return m;
    });

    const updatedConv = {
      ...activeConversation,
      messages: updatedMessages,
    };

    setActiveConversation(updatedConv);
    setRecentConversations((prev) =>
      prev.map((c) => (c.id === updatedConv.id ? updatedConv : c))
    );
  };

  const dismissAutomation = (proposalId: string) => {
    if (!activeConversation) return;

    const updatedMessages = activeConversation.messages.map((m) => {
      if (m.automationProposal?.id === proposalId) {
        return {
          ...m,
          automationProposal: undefined,
        };
      }
      return m;
    });

    const updatedConv = {
      ...activeConversation,
      messages: updatedMessages,
    };

    setActiveConversation(updatedConv);
  };

  return (
    <AssistantContext.Provider
      value={{
        currentView,
        setCurrentView,
        isWorkspaceActive,
        setIsWorkspaceActive,
        activeConversation,
        recentConversations,
        isProcessing,
        activeToolExecution,
        webhookUrl,
        setWebhookUrl,
        webhookStatus,
        unreadNotifications,
        isListeningVoice,
        voiceTranscript,
        startVoiceInput,
        stopVoiceInput,
        sendMessage,
        startNewChat,
        selectConversation,
        deployAutomation,
        dismissAutomation,
      }}
    >
      {children}
    </AssistantContext.Provider>
  );
};

export const useAssistant = (): AssistantContextType => {
  const context = useContext(AssistantContext);
  if (!context) {
    throw new Error('useAssistant must be used within an AssistantProvider');
  }
  return context;
};
