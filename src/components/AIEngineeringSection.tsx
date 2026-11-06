import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { AIAgentArchitectureSvg } from '../svgs/AIAgentArchitectureSvg';
import { RAGPipelineSVG } from '../svgs/RAGPipelineSVG';
import { NeuralArchitectureSVG } from '../svgs/NeuralArchitectureSVG';
import { ShieldAlert, Terminal as TerminalIcon, Send, RefreshCw, AlertTriangle } from 'lucide-react';

export const AIEngineeringSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState<'architecture' | 'owasp' | 'simulator'>('architecture');
  const [activeDiagram, setActiveDiagram] = useState<'agent' | 'rag' | 'neural'>('agent');

  // Simulated in-browser assistant state
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'assistant'; text: string; step?: string }>>([
    {
      sender: 'assistant',
      text: 'CyberCopilot Demo Simulation initialized. Explore Santhosh’s background, security concepts, or test prompt injection defenses below.',
      step: 'STATUS // READY [SIMULATION]'
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSimulatePrompt = (promptText: string) => {
    if (isProcessing) return;
    setInputVal('');
    setMessages((prev) => [...prev, { sender: 'user', text: promptText }]);
    setIsProcessing(true);

    const q = promptText.toLowerCase();
    setTimeout(() => {
      let reply = '';
      let stepNote = 'EVALUATION // RULE_MATCH';

      if (q.includes('prompt injection') || q.includes('ignore previous') || q.includes('system prompt')) {
        stepNote = 'OWASP LLM-01 // INJECTION DEFENSE TRIGGERED';
        reply = '🛡️ [SIMULATION DEFENSE ACTIVATED]: Adversarial prompt override detected. Input normalized and filtered against OWASP LLM-01 guardrails. Zero confidential system prompts or internal keys are exposed.';
      } else if (q.includes('stack') || q.includes('skills') || q.includes('technologies')) {
        stepNote = 'RAG LOOKUP // VERIFIED PROFILE KNOWLEDGE';
        reply = 'Santhosh specializes in Python automation, secure web development, defensive security evaluations (OWASP Top 10, SQLi, XSS), and studying emerging LLM guardrail patterns.';
      } else if (q.includes('education') || q.includes('college') || q.includes('degree')) {
        stepNote = 'ACADEMIC REGISTRY // VERIFIED FACT';
        reply = 'Santhosh is a B.E. Computer Science and Engineering student at Gnanamani College of Technology, Namakkal, India (Expected graduation: May 2027, GPA: 7.2/10).';
      } else {
        stepNote = 'SIMULATION // INTENT DISPATCH';
        reply = `Thank you for testing the interactive demo! This simulated agent evaluates prompts locally in your browser. For genuine project inquiries, email santhoshkumar160706@gmail.com directly.`;
      }

      setMessages((prev) => [...prev, { sender: 'assistant', text: reply, step: stepNote }]);
      setIsProcessing(false);
    }, 600);
  };

  const handleClearChat = () => {
    setMessages([
      {
        sender: 'assistant',
        text: 'Simulation memory reset. Select any prompt chip or type below.',
        step: 'STATUS // RESET'
      }
    ]);
  };

  return (
    <section id="ai-engineering" className="py-20 md:py-28 border-b border-[var(--border)]">
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6">
        {/* Section Head */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="font-[var(--mono)] text-xs font-bold text-[var(--accent)] tracking-widest uppercase">
              06 / AI Systems &amp; LLM Security
            </span>
            <span className="px-2 py-0.5 text-[0.65rem] font-[var(--mono)] uppercase tracking-wider font-bold bg-[var(--raised)] border border-[var(--border)] text-[var(--secondary-text)]">
              Defensive Architecture
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[var(--primary-text)]">
            Autonomous logic,{' '}
            <span className="font-[var(--serif)] italic font-normal text-[var(--accent)]">
              defended.
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[var(--secondary-text)] max-w-[620px] leading-relaxed">
            As applications integrate LLMs and autonomous agent workflows, securing inputs, mitigating prompt injections, and constraining tool permissions becomes vital.
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-[var(--border)] pb-4 mb-8 font-[var(--mono)] text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('architecture')}
            className={`min-h-[40px] px-4 py-2 border transition-colors ${
              activeTab === 'architecture'
                ? 'border-[var(--accent)] bg-[rgba(199,255,69,0.08)] text-[var(--accent)] font-bold'
                : 'border-[var(--border)] text-[var(--secondary-text)] hover:text-[var(--primary-text)]'
            }`}
          >
            01 // Agentic ReAct Architecture
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('owasp')}
            className={`min-h-[40px] px-4 py-2 border transition-colors ${
              activeTab === 'owasp'
                ? 'border-[var(--accent)] bg-[rgba(199,255,69,0.08)] text-[var(--accent)] font-bold'
                : 'border-[var(--border)] text-[var(--secondary-text)] hover:text-[var(--primary-text)]'
            }`}
          >
            02 // OWASP Top 10 for LLMs
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('simulator')}
            className={`min-h-[40px] px-4 py-2 border transition-colors ${
              activeTab === 'simulator'
                ? 'border-[var(--accent)] bg-[rgba(199,255,69,0.08)] text-[var(--accent)] font-bold'
                : 'border-[var(--border)] text-[var(--secondary-text)] hover:text-[var(--primary-text)]'
            }`}
          >
            03 // CyberCopilot Simulator (Demo)
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'architecture' && (
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
            <div className="lg:col-span-5 bg-[var(--surface)] border border-[var(--border)] p-6 md:p-8">
              <span className="font-[var(--mono)] text-xs font-bold text-[var(--accent)] tracking-wider block mb-2">
                REASONING + ACTING (ReAct)
              </span>
              <h3 className="text-xl font-bold text-[var(--primary-text)] mb-3">
                Constrained Agentic Workflows
              </h3>
              <p className="text-xs sm:text-sm text-[var(--secondary-text)] leading-relaxed mb-4">
                Rather than granting autonomous LLMs unconstrained bash or network access, secure agent engineering implements explicit planning gates, schema validation, and isolated tool execution sandboxes.
              </p>

              <div className="space-y-3 border-t border-[var(--border)] pt-4 text-xs font-[var(--mono)]">
                <div className="flex items-start gap-2">
                  <span className="text-[var(--accent)] font-bold">1.</span>
                  <span>Input intent validation &amp; semantic routing.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[var(--accent)] font-bold">2.</span>
                  <span>Deterministic vector retrieval with metadata filters.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[var(--accent)] font-bold">3.</span>
                  <span>Least-privilege tool execution with strict output formatting.</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 bg-[var(--surface)] border border-[var(--border)] p-4 md:p-6">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4 text-xs font-[var(--mono)]">
                <span className="text-[var(--accent)] font-bold">
                  {activeDiagram === 'agent' && 'SCHEMATIC // AGENTIC_REACT_PIPELINE'}
                  {activeDiagram === 'rag' && 'SCHEMATIC // GROUNDED_RAG_PIPELINE'}
                  {activeDiagram === 'neural' && 'SCHEMATIC // NEURAL_TRANSFORMER_CORE'}
                </span>
                
                {/* SVG Blueprint Switcher */}
                <div className="flex items-center gap-1 bg-[var(--raised)] p-0.5 border border-[var(--border)]">
                  <button
                    type="button"
                    onClick={() => setActiveDiagram('agent')}
                    className={`px-2.5 py-1 text-[0.7rem] transition-colors ${
                      activeDiagram === 'agent'
                        ? 'bg-[var(--accent)] text-[var(--bg)] font-bold'
                        : 'text-[var(--secondary-text)] hover:text-[var(--primary-text)]'
                    }`}
                  >
                    ReAct Loop
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveDiagram('rag')}
                    className={`px-2.5 py-1 text-[0.7rem] transition-colors ${
                      activeDiagram === 'rag'
                        ? 'bg-[var(--accent)] text-[var(--bg)] font-bold'
                        : 'text-[var(--secondary-text)] hover:text-[var(--primary-text)]'
                    }`}
                  >
                    RAG Pipeline
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveDiagram('neural')}
                    className={`px-2.5 py-1 text-[0.7rem] transition-colors ${
                      activeDiagram === 'neural'
                        ? 'bg-[var(--accent)] text-[var(--bg)] font-bold'
                        : 'text-[var(--secondary-text)] hover:text-[var(--primary-text)]'
                    }`}
                  >
                    Neural Attn
                  </button>
                </div>
              </div>

              {activeDiagram === 'agent' && <AIAgentArchitectureSvg />}
              {activeDiagram === 'rag' && <RAGPipelineSVG />}
              {activeDiagram === 'neural' && <NeuralArchitectureSVG />}
            </div>
          </motion.div>
        )}

        {activeTab === 'owasp' && (
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {[
              { id: 'LLM-01', title: 'Prompt Injection', defense: 'Direct/indirect prompt overriding mitigated through structured delimiters and semantic firewalls.' },
              { id: 'LLM-02', title: 'Insecure Output Handling', defense: 'Downstream HTML/SQL output sanitized prior to rendering or query concatenation.' },
              { id: 'LLM-06', title: 'Sensitive Info Disclosure', defense: 'PII masking and API key stripping on both input ingest and synthesized output.' },
              { id: 'LLM-07', title: 'Insecure Plugin Design', defense: 'Strict JSON schema validation and parameterized arguments for tool execution.' },
              { id: 'LLM-08', title: 'Excessive Agency', defense: 'Human-in-the-loop approvals for sensitive write actions and destructive API calls.' },
              { id: 'LLM-09', title: 'Overreliance', defense: 'Clear confidence telemetry and deterministic fallback pipelines when certainty is low.' }
            ].map((item) => (
              <div key={item.id} className="p-5 bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--active-border)] transition-colors">
                <div className="flex items-center justify-between font-[var(--mono)] text-xs mb-2">
                  <span className="text-[var(--accent)] font-bold">{item.id}</span>
                  <ShieldAlert className="w-4 h-4 text-[var(--accent)]" />
                </div>
                <h4 className="text-sm font-bold text-[var(--primary-text)] mb-2">{item.title}</h4>
                <p className="text-xs text-[var(--secondary-text)] leading-relaxed">{item.defense}</p>
              </div>
            ))}
          </motion.div>
        )}

        {activeTab === 'simulator' && (
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-[#080A08] border border-[var(--border-strong)]"
          >
            {/* Simulation Notice Disclaimer */}
            <div className="px-4 py-2 bg-[rgba(199,255,69,0.06)] border-b border-[var(--border)] flex items-center justify-between text-xs font-[var(--mono)] text-[var(--secondary-text)]">
              <span className="flex items-center gap-2 text-[var(--accent)] font-bold">
                <AlertTriangle className="w-4 h-4" />
                <span>IN-BROWSER DEMO SIMULATION ONLY</span>
              </span>
              <span className="text-[0.68rem] text-[var(--muted)] hidden sm:inline">
                No external LLM inference · Zero confidential data exposure
              </span>
            </div>

            {/* Terminal Header */}
            <div className="px-4 py-2.5 bg-[rgba(19,21,18,0.95)] border-b border-[var(--border)] flex items-center justify-between text-xs font-[var(--mono)]">
              <div className="flex items-center gap-2">
                <TerminalIcon className="w-4 h-4 text-[var(--accent)]" />
                <span className="text-[var(--primary-text)] font-bold">CyberCopilot Sandbox Simulator</span>
              </div>
              <button
                type="button"
                onClick={handleClearChat}
                className="text-[var(--muted)] hover:text-[var(--primary-text)] flex items-center gap-1 text-[0.7rem]"
                title="Reset simulation history"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            {/* Simulated Chat Feed */}
            <div className="p-4 sm:p-5 max-h-[300px] min-h-[200px] overflow-y-auto space-y-3 font-[var(--mono)] text-xs">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`p-3 max-w-[90%] ${
                    msg.sender === 'user'
                      ? 'ml-auto bg-[var(--raised)] border border-[var(--border-strong)] text-[var(--primary-text)]'
                      : 'mr-auto bg-[var(--surface)] border border-[var(--border)] text-[var(--secondary-text)] border-l-2 border-l-[var(--accent)]'
                  }`}
                >
                  {msg.step && (
                    <span className="text-[0.62rem] text-[var(--accent)] block font-bold mb-1">
                      {msg.step}
                    </span>
                  )}
                  <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                </div>
              ))}

              {isProcessing && (
                <div className="p-3 bg-[var(--surface)] border border-[var(--border)] border-l-2 border-l-[var(--accent)] mr-auto text-xs font-[var(--mono)] text-[var(--accent)] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-ping" />
                  <span>Evaluating input against guardrail rules...</span>
                </div>
              )}
            </div>

            {/* Preset Action Chips */}
            <div className="p-3 bg-[rgba(19,21,18,0.7)] border-t border-[var(--border)] flex flex-wrap gap-2 text-xs font-[var(--mono)]">
              <span className="text-[var(--muted)] self-center text-[0.7rem] mr-1">TEST SCENARIOS:</span>
              <button
                type="button"
                onClick={() => handleSimulatePrompt('Simulate prompt injection attack')}
                className="px-2.5 py-1 bg-[var(--surface)] border border-[var(--border)] text-[var(--accent)] hover:border-[var(--accent)] transition-colors text-[0.7rem]"
              >
                ⚡ Test Prompt Injection
              </button>
              <button
                type="button"
                onClick={() => handleSimulatePrompt("What is Santhosh's technical stack?")}
                className="px-2.5 py-1 bg-[var(--surface)] border border-[var(--border)] text-[var(--secondary-text)] hover:text-[var(--primary-text)] hover:border-[var(--accent)] transition-colors text-[0.7rem]"
              >
                🛡️ Query Tech Stack
              </button>
              <button
                type="button"
                onClick={() => handleSimulatePrompt('Summarize verified education and GPA')}
                className="px-2.5 py-1 bg-[var(--surface)] border border-[var(--border)] text-[var(--secondary-text)] hover:text-[var(--primary-text)] hover:border-[var(--accent)] transition-colors text-[0.7rem]"
              >
                🎓 Query Education
              </button>
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (inputVal.trim()) handleSimulatePrompt(inputVal.trim());
              }}
              className="p-3 bg-[#060706] border-t border-[var(--border)] flex items-center gap-2"
            >
              <span className="text-[var(--accent)] font-[var(--mono)] font-bold text-xs pl-2">
                demo@sec:~$
              </span>
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Type a query or prompt injection test..."
                className="flex-1 bg-transparent border-0 text-xs font-[var(--mono)] text-[var(--primary-text)] placeholder:text-[var(--muted)] focus:outline-none"
              />
              <button
                type="submit"
                disabled={isProcessing || !inputVal.trim()}
                className="min-h-[36px] min-w-[36px] grid place-items-center bg-[var(--accent)] text-[var(--bg)] font-bold hover:bg-[#D2FF5E] disabled:opacity-30 transition-all"
                aria-label="Send simulated prompt"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </div>
    </section>
  );
};
