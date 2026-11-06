import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { CommandProcessor, CommandResult } from './CommandProcessor';

export type AIAssistantState = 'idle' | 'listening' | 'processing' | 'speaking' | 'navigation' | 'error';

export interface AIMessage {
  id: string;
  sender: 'user' | 'san-ai';
  text: string;
  timestamp: string;
}

interface SanAIContextType {
  state: AIAssistantState;
  messages: AIMessage[];
  isMuted: boolean;
  isExpanded: boolean;
  activeZoneId: string;
  setActiveZoneId: (zoneId: string) => void;
  sendMessage: (text: string) => void;
  toggleListening: () => void;
  toggleMute: () => void;
  toggleExpand: () => void;
  speakText: (text: string) => void;
}

const SanAIContext = createContext<SanAIContextType | null>(null);

export const SanAIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AIAssistantState>('idle');
  const [isMuted, setIsMuted] = useState(true); // Default muted so no unprompted audio plays
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeZoneId, setActiveZoneId] = useState('origin-coast');
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: 'greeting-01',
      sender: 'san-ai',
      text: "Welcome to Santhosh Kumar's Digital Universe. I am SAN AI, your personal guide. How may I help you explore?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  // Clean up speech synthesis on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const speakText = useCallback((text: string) => {
    if (isMuted || typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.05;
    utterance.pitch = 1.0;

    utterance.onstart = () => setState('speaking');
    utterance.onend = () => setState('idle');
    utterance.onerror = () => setState('idle');

    window.speechSynthesis.speak(utterance);
  }, [isMuted]);

  const sendMessage = useCallback((text: string) => {
    if (!text.trim()) return;

    const userMsg: AIMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setState('processing');

    setTimeout(() => {
      const result: CommandResult = CommandProcessor.process(text);

      const aiMsg: AIMessage = {
        id: `ai-${Date.now()}`,
        sender: 'san-ai',
        text: result.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
      setState(result.action?.type === 'navigate_zone' ? 'navigation' : 'idle');

      if (result.action?.type === 'navigate_zone') {
        setActiveZoneId(result.action.target);
      }

      speakText(result.text);
    }, 400);
  }, [speakText]);

  const toggleListening = useCallback(() => {
    if (typeof window === 'undefined') return;

    // Check for Web Speech API
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      const errNotice: AIMessage = {
        id: `err-${Date.now()}`,
        sender: 'san-ai',
        text: "Web Speech recognition is not supported in this browser. Please use text commands instead.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errNotice]);
      setState('error');
      setTimeout(() => setState('idle'), 3000);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => setState('listening');
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        sendMessage(transcript);
      };
      recognition.onerror = () => setState('idle');
      recognition.onend = () => setState('idle');

      recognition.start();
    } catch {
      setState('idle');
    }
  }, [sendMessage]);

  return (
    <SanAIContext.Provider
      value={{
        state,
        messages,
        isMuted,
        isExpanded,
        activeZoneId,
        setActiveZoneId,
        sendMessage,
        toggleListening,
        toggleMute: () => setIsMuted(prev => !prev),
        toggleExpand: () => setIsExpanded(prev => !prev),
        speakText
      }}
    >
      {children}
    </SanAIContext.Provider>
  );
};

export const useSanAI = (): SanAIContextType => {
  const context = useContext(SanAIContext);
  if (!context) {
    throw new Error('useSanAI must be used within a SanAIProvider');
  }
  return context;
};

