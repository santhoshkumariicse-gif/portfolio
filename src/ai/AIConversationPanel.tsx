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
    'Show Skills',
    'Open Projects',
    'Explain LorryBook',
    'Show Education',
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
          className="fixed bottom-4 right-4 z-50 w-[94vw] sm:w-[420px] max-h-[580px] h-[82vh] flex flex-col rounded-xl bg-[#171B20]/95 border border-[rgba(201,208,216,0.12)] backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.95)] overflow-hidden"
          role="dialog"
          aria-label="SAN AI Interactive Assistant"
        >
          {/* Top Racing Red Accent Edge */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#A9081A] via-[#E10620] to-[#FF3548]" />

          {/* Panel Header */}
          <div className="p-3.5 bg-[#20252C] border-b border-[rgba(201,208,216,0.12)] flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E10620] animate-pulse shadow-[0_0_8px_#E10620]" />
              <div>
                <span className="font-mono text-xs font-bold text-[#FF3548] block">
                  SAN AI // COPILOT TELEMETRY
                </span>
                <span className="font-mono text-[9px] text-[#87919D] flex items-center gap-1">
                  <Compass className="w-2.5 h-2.5 text-[#E10620]" />
                  <span>ZONE: {activeZoneId.toUpperCase()}</span>
                </span>
              </div>
            </div>

            {/* Controls: Mute, Stop Speaking, Minimize, Close */}
            <div className="flex items-center gap-1.5 text-[#87919D]">
              {state === 'speaking' && (
                <button
                  type="button"
                  onClick={interruptSpeech}
                  className="px-2 py-0.5 rounded text-[9px] font-mono bg-[#E10620]/20 border border-[#E10620]/40 text-[#FF3548] hover:bg-[#E10620]/30 flex items-center gap-1"
                  title="Stop speaking"
                  aria-label="Stop speech playback"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E10620] animate-ping" />
                  <span>HALT</span>
                </button>
              )}

              <button
                type="button"
                onClick={toggleMute}
                className="p-1.5 hover:text-[#FF3548] hover:bg-white/5 rounded transition-colors"
                title={isMuted ? 'Unmute voice synthesis' : 'Mute voice synthesis'}
                aria-label={isMuted ? 'Unmute voice' : 'Mute voice'}
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#FF3548]" />}
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
          <div className="flex-1 p-4 overflow-y-auto space-y-3 font-sans text-xs custom-scrollbar">
            {messages.map((m) => {
              const isAi = m.sender === 'san-ai';
              return (
                <div
                  key={m.id}
                  className={`flex flex-col ${isAi ? 'items-start' : 'items-end'}`}
                >
                  <div className="flex items-center gap-1.5 mb-1 text-[9px] font-mono text-[#87919D]">
                    <span>{isAi ? 'SAN AI' : 'VISITOR'}</span>
                    <span>·</span>
                    <span>{m.timestamp}</span>
                  </div>

                  <div
                    className={`p-3 rounded-xl max-w-[85%] leading-relaxed ${
                      isAi
                        ? 'bg-[#20252C] border border-[rgba(201,208,216,0.12)] text-[#F2F4F7]'
                        : 'bg-[#E10620]/15 border border-[#E10620]/30 text-[#F2F4F7]'
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              );
            })}

            {state === 'processing' && (
              <div className="flex items-center gap-2 text-xs font-mono text-[#FF3548] p-2 bg-white/5 rounded">
                <span className="w-2 h-2 rounded-full bg-[#E10620] animate-ping" />
                <span>Processing query against verified knowledge base...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Command Chips */}
          <div className="px-3 py-2 bg-[#090B0E]/80 border-t border-[rgba(201,208,216,0.08)] flex items-center gap-1.5 overflow-x-auto select-none">
            {quickPrompts.map((prompt, i) => (
              <button
                key={i}
                type="button"
                onClick={() => sendMessage(prompt)}
                className="px-2.5 py-1 whitespace-nowrap rounded-md bg-[#20252C] border border-[rgba(201,208,216,0.12)] hover:border-[#E10620] hover:text-[#FF3548] text-[10px] font-mono text-[#87919D] transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input & Voice Controls */}
          <form onSubmit={handleSend} className="p-3 bg-[#090B0E] border-t border-[rgba(201,208,216,0.12)] flex items-center gap-2">
            <button
              type="button"
              onClick={toggleListening}
              className={`p-2.5 rounded-lg border transition-all ${
                state === 'listening'
                  ? 'bg-[#E10620] text-[#F2F4F7] border-[#FF3548] shadow-[0_0_12px_rgba(225,6,32,0.6)]'
                  : 'bg-[#171B20] border-[rgba(201,208,216,0.12)] text-[#87919D] hover:text-[#FF3548] hover:border-[#E10620]'
              }`}
              title="Click to speak (voice command)"
              aria-label="Toggle voice input"
            >
              {state === 'listening' ? <Mic className="w-4 h-4 animate-pulse text-white" /> : <MicOff className="w-4 h-4" />}
            </button>

            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder={state === 'listening' ? 'Listening to speech...' : 'Ask SAN AI about Santhosh...'}
              className="flex-1 min-h-[38px] px-3 bg-[#171B20] border border-[rgba(201,208,216,0.12)] rounded-lg text-xs font-sans text-white focus:outline-none focus:border-[#FF3548] placeholder:text-[#626C78]"
            />

            <button
              type="submit"
              disabled={!inputVal.trim()}
              className="p-2.5 bg-[#E10620] text-white rounded-lg disabled:opacity-30 disabled:pointer-events-none hover:bg-[#FF3548] font-bold transition-all shadow-[0_0_12px_rgba(225,6,32,0.4)] border border-[#FF3548]"
              aria-label="Send message"
            >
              <Send className="w-4 h-4 text-white" />
            </button>
          </form>

          {/* Footer Telemetry Bar */}
          <div className="px-3 py-1 bg-[#090B0E] text-[8px] font-mono text-[#626C78] flex items-center justify-between border-t border-[rgba(201,208,216,0.08)]">
            <span className="flex items-center gap-1">
              <Terminal className="w-2.5 h-2.5 text-[#FF3548]" />
              <span>LOCAL KNOWLEDGE ENGINE // NO DATA EXPOSURE</span>
            </span>
            <span>VERIFIED PORTFOLIO DATA</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
