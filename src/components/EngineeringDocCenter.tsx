import React, { useState } from 'react';
import { Copy, Check, FileCode, Layers, ShieldCheck, Database } from 'lucide-react';

interface DocTopic {
  id: string;
  category: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  summary: string;
  codeSnippet?: string;
  points: string[];
}

export const EngineeringDocCenter: React.FC = () => {
  const [selectedTopicId, setSelectedTopicId] = useState<string>('arch-principles');
  const [copied, setCopied] = useState(false);

  const topics: DocTopic[] = [
    {
      id: 'arch-principles',
      category: 'System Architecture',
      title: 'Decoupled Client-Server & Boundary Isolation',
      icon: Layers,
      summary: 'Separation of concerns between client interface, RESTful API layer, and database storage.',
      points: [
        'Client-side state remains ephemeral; server-side APIs enforce authoritative state transitions.',
        'Network boundaries reject unvalidated payloads before executing business operations.',
        'Stateless JWT tokens encode cryptographically signed claims, minimizing session lookups.'
      ],
      codeSnippet: `# FastAPI Route Handler Standard\n@router.post("/items", response_model=ItemResponse, status_code=status.HTTP_201_CREATED)\nasync def create_item(\n    payload: ItemCreateSchema,\n    user: User = Depends(get_current_authenticated_user)\n):\n    return await service.persist_item(payload, user_id=user.id)`
    },
    {
      id: 'db-modeling',
      category: 'Database Design',
      title: 'Relational Schemas, Constraints & Prepared Queries',
      icon: Database,
      summary: 'Relational design in PostgreSQL with foreign key constraints, indexes, and connection pooling.',
      points: [
        'Foreign key constraints and unique indexes prevent duplicate records at the engine level.',
        'Connection pooling via asyncpg/SQLAlchemy limits idle socket resource exhaustion.',
        'Parameterized query execution guarantees complete defense against SQL injection.'
      ],
      codeSnippet: `-- Prepared Schema Standard with Foreign Keys\nCREATE TABLE orders (\n    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,\n    amount NUMERIC(10, 2) NOT NULL CHECK (amount > 0),\n    created_at TIMESTAMPTZ DEFAULT NOW()\n);\nCREATE INDEX idx_orders_user ON orders(user_id);`
    },
    {
      id: 'sec-threat-model',
      category: 'Security Decisions',
      title: 'Defense-in-Depth & OWASP Top 10 Mitigation',
      icon: ShieldCheck,
      summary: 'Establishing multiple concentric rings of defensive verification across the application perimeter.',
      points: [
        'Input normalization strips control characters and adversarial overrides.',
        'Context-aware escaping and strict Content-Security-Policy mitigate reflected and DOM XSS.',
        'Least-privilege API authorization gates destructive endpoints behind role validation.'
      ],
      codeSnippet: `# Pydantic Input Boundary Sanitizer\nclass UserRegistrationSchema(BaseModel):\n    username: constr(strip_whitespace=True, regex="^[a-zA-Z0-9_]{3,20}$")\n    email: EmailStr\n    password: constr(min_length=8)\n    class Config:\n        anystr_strip_whitespace = True`
    },
    {
      id: 'testing-strategy',
      category: 'Testing & Auditing',
      title: 'Lab Auditing, Type Checking & CI Gates',
      icon: FileCode,
      summary: 'Ensuring software correctness through strict static typing, unit testing, and sandbox audits.',
      points: [
        'TypeScript in strict mode guarantees null/undefined safety at compile time.',
        'Ethical lab testing on DVWA / PortSwigger verifies real-world countermeasure effectiveness.',
        'Automated GitHub Actions workflows validate builds before deployment to GitHub Pages.'
      ],
      codeSnippet: `// GitHub Actions Build & Type Check Gate\nname: Build Gate\nrun: |\n  npx tsc --noEmit\n  npm run build`
    }
  ];

  const currentTopic = topics.find((t) => t.id === selectedTopicId) || topics[0];
  const Icon = currentTopic.icon;

  const handleCopyCode = async () => {
    if (!currentTopic.codeSnippet) return;
    try {
      await navigator.clipboard.writeText(currentTopic.codeSnippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Non-critical
    }
  };

  return (
    <section id="engineering" className="py-20 md:py-28 border-b border-[var(--border)] bg-[#131512]">
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="font-[var(--mono)] text-xs font-bold text-[var(--accent)] tracking-widest uppercase">
              Docs // Engineering Documentation
            </span>
            <span className="px-2 py-0.5 text-[0.65rem] font-[var(--mono)] uppercase tracking-wider font-bold bg-[var(--raised)] border border-[var(--border)] text-[var(--secondary-text)]">
              Architecture &amp; Standards
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[var(--primary-text)]">
            Decisions,{' '}
            <span className="font-[var(--serif)] italic font-normal text-[var(--accent)]">
              documented.
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[var(--secondary-text)] max-w-[640px] leading-relaxed">
            Architectural standards, database modeling rules, and security decisions applied across my developer internships and lab projects.
          </p>
        </div>

        {/* Documentation 2-Column Split View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Topic Selector Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-2 font-[var(--mono)] text-xs">
            {topics.map((t) => {
              const isActive = t.id === selectedTopicId;
              const TopicIcon = t.icon;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setSelectedTopicId(t.id)}
                  className={`w-full p-4 text-left border transition-all flex items-start gap-3 ${
                    isActive
                      ? 'border-[var(--accent)] bg-[var(--surface)] text-[var(--primary-text)] font-bold'
                      : 'border-[var(--border)] bg-[var(--surface-subtle)] text-[var(--secondary-text)] hover:text-[var(--primary-text)] hover:border-[var(--border-strong)]'
                  }`}
                >
                  <TopicIcon
                    className={`w-4 h-4 mt-0.5 shrink-0 ${
                      isActive ? 'text-[var(--accent)]' : 'text-[var(--muted)]'
                    }`}
                  />
                  <div>
                    <span className="text-[0.68rem] text-[var(--muted)] uppercase tracking-wider block">
                      {t.category}
                    </span>
                    <span className="text-xs font-semibold leading-snug block mt-0.5">
                      {t.title}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Topic Deep Dive Card (8 cols) */}
          <div className="lg:col-span-8 bg-[var(--surface)] border border-[var(--border-strong)] p-6 md:p-8">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-[var(--border)]">
              <div className="flex items-center gap-2.5">
                <Icon className="w-5 h-5 text-[var(--accent)]" />
                <span className="font-[var(--mono)] text-xs uppercase tracking-wider text-[var(--accent)] font-bold">
                  {currentTopic.category}
                </span>
              </div>
              <span className="px-2 py-0.5 bg-[var(--raised)] border border-[var(--border)] text-[0.68rem] font-[var(--mono)] text-[var(--secondary-text)]">
                STANDARD SPECIFICATION
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-[var(--primary-text)]">
              {currentTopic.title}
            </h3>

            <p className="mt-3 text-sm text-[var(--secondary-text)] leading-relaxed">
              {currentTopic.summary}
            </p>

            {/* Core Implementation Rules */}
            <div className="mt-6 space-y-2.5">
              <span className="text-xs font-[var(--mono)] uppercase tracking-wider text-[var(--muted)] block">
                Engineering Guidelines:
              </span>
              {currentTopic.points.map((pt, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-[var(--secondary-text)]">
                  <span className="text-[var(--accent)] font-bold font-[var(--mono)]">0{i + 1}.</span>
                  <p className="leading-relaxed">{pt}</p>
                </div>
              ))}
            </div>

            {/* Code Snippet Box */}
            {currentTopic.codeSnippet && (
              <div className="mt-6 border border-[var(--border)] bg-[#0A0B09] overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2 bg-[#171A16] border-b border-[var(--border)] text-[0.7rem] font-[var(--mono)] text-[var(--muted)]">
                  <span>REFERENCE IMPLEMENTATION</span>
                  <button
                    type="button"
                    onClick={handleCopyCode}
                    className="hover:text-[var(--accent)] flex items-center gap-1.5 transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[var(--accent)]" />
                        <span className="text-[var(--accent)]">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-4 text-xs font-[var(--mono)] text-[var(--primary-text)] overflow-x-auto leading-relaxed">
                  {currentTopic.codeSnippet}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
