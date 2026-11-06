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
  lastAction: CommandResult['action'] | null;
  clearLastAction: () => void;
  setActiveZoneId: (zoneId: string) => void;
  sendMessage: (text: string) => void;
  toggleListening: () => void;
  toggleMute: () => void;
  toggleExpand: () => void;
  interruptSpeech: () => void;
  speakText: (text: string) => void;
  announce: (text: string) => void;
}

const SanAIContext = createContext<SanAIContextType | null>(null);

export const SanAIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AIAssistantState>('idle');
  const [isMuted, setIsMuted] = useState(true); // Default muted to respect browser autoplay policies
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeZoneId, setActiveZoneId] = useState('origin-coast');
  const [lastAction, setLastAction] = useState<CommandResult['action'] | null>(null);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: 'greeting-01',
      sender: 'san-ai',
      text: "Greetings. I am SAN AI, Santhosh's interactive digital copilot. How may I assist your exploration of the Developer Universe today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  // Load available speech synthesis voices
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    const updateVoices = () => {
      const available = window.speechSynthesis.getVoices();
      if (available.length > 0) {
        setVoices(available);
      }
    };

    updateVoices();
    window.speechSynthesis.onvoiceschanged = updateVoices;

    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const interruptSpeech = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setState(prev => (prev === 'speaking' ? 'idle' : prev));
    }
  }, []);

  const speakText = useCallback((text: string) => {
    if (isMuted || typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.05;
    utterance.pitch = 1.0;

    // Prefer high quality English voice if found
    if (voices.length > 0) {
      const preferred = voices.find(v =>
        (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha') || v.name.includes('David') || v.name.includes('Zira')) &&
        v.lang.startsWith('en')
      ) || voices.find(v => v.lang.startsWith('en'));

      if (preferred) {
        utterance.voice = preferred;
      }
    }

    utterance.onstart = () => setState('speaking');
    utterance.onend = () => setState('idle');
    utterance.onerror = () => setState('idle');

    window.speechSynthesis.speak(utterance);
  }, [isMuted, voices]);

  const announce = useCallback((text: string) => {
    const aiMsg: AIMessage = {
      id: `ai-ann-${Date.now()}`,
      sender: 'san-ai',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, aiMsg]);
    speakText(text);
  }, [speakText]);

  const clearLastAction = useCallback(() => {
    setLastAction(null);
  }, []);

  const sendMessage = useCallback((text: string) => {
    if (!text.trim()) return;

    // Interrupt any ongoing speech synthesis first
    interruptSpeech();

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

      if (result.action) {
        setLastAction(result.action);
        if (result.action.type === 'navigate_zone') {
          setActiveZoneId(result.action.target);
        }
      }

      speakText(result.text);
    }, 350);
  }, [interruptSpeech, speakText]);

  const toggleListening = useCallback(() => {
    if (typeof window === 'undefined') return;

    // Interrupt voice playback immediately when listening starts
    interruptSpeech();

    // Check for Web Speech Recognition API
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      const errNotice: AIMessage = {
        id: `err-${Date.now()}`,
        sender: 'san-ai',
        text: "Web Speech recognition is not supported in this browser environment. Please type commands directly in this terminal.",
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
  }, [interruptSpeech, sendMessage]);

  return (
    <SanAIContext.Provider
      value={{
        state,
        messages,
        isMuted,
        isExpanded,
        activeZoneId,
        lastAction,
        clearLastAction,
        setActiveZoneId,
        sendMessage,
        toggleListening,
        toggleMute: () => setIsMuted(prev => !prev),
        toggleExpand: () => setIsExpanded(prev => !prev),
        interruptSpeech,
        speakText,
        announce
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
