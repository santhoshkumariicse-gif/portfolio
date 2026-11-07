import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useSanAI } from './SanAIProvider';
import {
  Send,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  X,
  Minimize2,
  Terminal,
  Compass
} from 'lucide-react';

export const AIConversationPanel: React.FC = () => {
  const {
    state,
    messages,
    isMuted,
    isExpanded,
    activeZoneId,
    sendMessage,
    toggleListening,
    toggleMute,
    toggleExpand,
    interruptSpeech
  } = useSanAI();

  const [inputVal, setInputVal] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (isExpanded) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isExpanded]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    sendMessage(inputVal);
    setInputVal('');
  };

  const quickPrompts = [
    'Hey SAN',
    'Introduce Santhosh',
    'Start Guided Tour',
    'Enter Free Roam',
    'Show Skills',
    'Open Projects',
    'Explain LorryBook',
    'Show Education',
    'Show Achievements',
    'Go to Contact'
  ];

  return (
    <AnimatePresence>
      {isExpanded && (
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-4 right-4 z-50 w-[94vw] sm:w-[420px] max-h-[580px] h-[82vh] flex flex-col rounded-sm bg-[#07120D]/95 border border-[#00E676]/40 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.95)] overflow-hidden"
          role="dialog"
          aria-label="SAN AI Interactive Assistant"
        >
          {/* Top Emerald Accent Edge */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#00E676] via-[#39FF88] to-[#00BFA5]" />

          {/* Panel Header */}
          <div className="p-3.5 bg-black/50 border-b border-[#00E676]/20 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00E676] animate-pulse" />
              <div>
                <span className="font-mono text-xs font-bold text-[#39FF88] block">
                  SAN AI // JARVIS COPILOT
                </span>
                <span className="font-mono text-[9px] text-[#91A99A] flex items-center gap-1">
                  <Compass className="w-2.5 h-2.5 text-[#00E676]" />
                  <span>ZONE: {activeZoneId.toUpperCase()}</span>
                </span>
              </div>
            </div>

            {/* Controls: Mute, Stop Speaking, Minimize, Close */}
            <div className="flex items-center gap-1.5 text-[var(--secondary-text)]">
              {state === 'speaking' && (
                <button
                  type="button"
                  onClick={interruptSpeech}
                  className="px-2 py-0.5 rounded text-[9px] font-mono bg-[#FF3366]/20 border border-[#FF3366]/40 text-[#FF3366] hover:bg-[#FF3366]/30 flex items-center gap-1"
                  title="Stop speaking"
                  aria-label="Stop speech playback"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF3366] animate-ping" />
                  <span>HALT</span>
                </button>
              )}

              <button
                type="button"
                onClick={toggleMute}
                className="p-1.5 hover:text-[#00E676] hover:bg-white/5 rounded transition-colors"
                title={isMuted ? 'Unmute voice synthesis' : 'Mute voice synthesis'}
                aria-label={isMuted ? 'Unmute voice' : 'Mute voice'}
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#00E676]" />}
              </button>

              <button
                type="button"
                onClick={toggleExpand}
                className="p-1.5 hover:text-white hover:bg-white/5 rounded transition-colors"
                title="Minimize assistant window"
                aria-label="Minimize"
              >
                <Minimize2 className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={toggleExpand}
                className="p-1.5 hover:text-white hover:bg-white/5 rounded transition-colors"
                title="Close assistant window"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 font-sans text-xs">
            {messages.map((m) => {
              const isAi = m.sender === 'san-ai';
              return (
                <div
                  key={m.id}
                  className={`flex flex-col ${isAi ? 'items-start' : 'items-end'}`}
                >
                  <div className="flex items-center gap-1.5 mb-1 text-[9px] font-mono text-[var(--muted)]">
                    <span>{isAi ? 'SAN AI' : 'VISITOR'}</span>
                    <span>·</span>
                    <span>{m.timestamp}</span>
                  </div>

                  <div
                    className={`p-3 rounded-sm max-w-[85%] leading-relaxed ${
                      isAi
                        ? 'bg-[#0A1710] border border-[#00E676]/30 text-[#E7F5EC]'
                        : 'bg-[#00E676]/15 border border-[#00E676]/40 text-[#E7F5EC]'
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              );
            })}

            {state === 'processing' && (
              <div className="flex items-center gap-2 text-xs font-mono text-[#39FF88] p-2 bg-white/5 rounded">
                <span className="w-2 h-2 rounded-full bg-[#00E676] animate-ping" />
                <span>Processing query against verified knowledge base...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Command Chips */}
          <div className="px-3 py-2 bg-black/50 border-t border-white/5 flex items-center gap-1.5 overflow-x-auto select-none">
            {quickPrompts.map((prompt, i) => (
              <button
                key={i}
                type="button"
                onClick={() => sendMessage(prompt)}
                className="px-2 py-0.5 whitespace-nowrap rounded-sm bg-white/5 border border-white/10 hover:border-[#00E676] hover:text-[#39FF88] text-[10px] font-mono text-[#91A99A] transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input & Voice Controls */}
          <form onSubmit={handleSend} className="p-3 bg-black/70 border-t border-[#00E676]/20 flex items-center gap-2">
            <button
              type="button"
              onClick={toggleListening}
              className={`p-2.5 rounded-sm border transition-all ${
                state === 'listening'
                  ? 'bg-[#00E676] text-[#030806] border-[#39FF88] shadow-[0_0_12px_rgba(0,230,118,0.6)]'
                  : 'bg-white/5 border-white/15 text-[#91A99A] hover:text-[#00E676] hover:border-[#00E676]'
              }`}
              title="Click to speak (voice command)"
              aria-label="Toggle voice input"
            >
              {state === 'listening' ? <Mic className="w-4 h-4 animate-pulse text-[#030806]" /> : <MicOff className="w-4 h-4" />}
            </button>

            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder={state === 'listening' ? 'Listening to speech...' : 'Ask SAN AI about Santhosh...'}
              className="flex-1 min-h-[38px] px-3 bg-[#0A1710] border border-[#00E676]/30 rounded-sm text-xs font-sans text-white focus:outline-none focus:border-[#39FF88] placeholder:text-[#536B5E]"
            />

            <button
              type="submit"
              disabled={!inputVal.trim()}
              className="p-2.5 bg-[#00E676] text-[#030806] rounded-sm disabled:opacity-30 disabled:pointer-events-none hover:bg-[#39FF88] font-bold transition-all shadow-[0_0_12px_rgba(0,230,118,0.4)]"
              aria-label="Send message"
            >
              <Send className="w-4 h-4 text-[#030806]" />
            </button>
          </form>

          {/* Footer Telemetry Bar */}
          <div className="px-3 py-1 bg-black/90 text-[8px] font-mono text-[#536B5E] flex items-center justify-between border-t border-white/5">
            <span className="flex items-center gap-1">
              <Terminal className="w-2.5 h-2.5 text-[#00E676]" />
              <span>LOCAL KNOWLEDGE ENGINE // NO DATA EXPOSURE</span>
            </span>
            <span>VERIFIED PORTFOLIO DATA</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
