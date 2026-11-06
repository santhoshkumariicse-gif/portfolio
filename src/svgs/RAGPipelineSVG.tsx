import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface RAGPipelineSVGProps {
  className?: string;
}

export const RAGPipelineSVG: React.FC<RAGPipelineSVGProps> = ({ className = '' }) => {
  const shouldReduceMotion = useReducedMotion();

  const stages = [
    { id: 'docs', label: 'SOURCE CORPUS', sub: 'Markdown / Specs', x: 65, y: 110, w: 90, h: 48 },
    { id: 'chunk', label: 'CHUNK & EMBED', sub: 'Overlap: 50 tokens', x: 195, y: 110, w: 95, h: 48 },
    { id: 'vector', label: 'VECTOR INDEX', sub: 'HNSW / Cosine Sim', x: 335, y: 110, w: 95, h: 48, isIndex: true },
    { id: 'prompt', label: 'CONTEXT AUGMENT', sub: 'Top-K Retrieval', x: 475, y: 110, w: 100, h: 48 },
    { id: 'guard', label: 'GUARDRAIL / LLM', sub: 'Grounding Verification', x: 625, y: 110, w: 105, h: 48, isLLM: true }
  ];

  return (
    <div className={`w-full overflow-hidden select-none ${className}`}>
      <svg
        viewBox="0 0 740 220"
        className="w-full h-auto max-h-[260px]"
        role="img"
        aria-labelledby="rag-arch-title rag-arch-desc"
      >
        <title id="rag-arch-title">RAG (Retrieval-Augmented Generation) Architecture</title>
        <desc id="rag-arch-desc">
          Technical blueprint showing end-to-end RAG architecture: raw document ingestion, chunking with embedding generation, vector store nearest-neighbor index, augmented context injection, and guardrail-validated LLM inference.
        </desc>

        <defs>
          <pattern id="rag-grid-pat" width="16" height="16" patternUnits="userSpaceOnUse">
            <path d="M 16 0 L 0 0 0 16" fill="none" stroke="rgba(240, 240, 233, 0.04)" strokeWidth="0.75" />
          </pattern>
        </defs>

        <rect width="740" height="220" fill="url(#rag-grid-pat)" />

        {/* Blueprint Header */}
        <line x1="20" y1="20" x2="180" y2="20" stroke="var(--accent)" strokeWidth="1.5" />
        <text x="20" y="14" fill="var(--muted)" fontFamily="var(--mono)" fontSize="9" letterSpacing="0.1em">
          PIPELINE.RAG.V3 // GROUNDED CONTEXT RETRIEVAL
        </text>
        <text x="720" y="14" textAnchor="end" fill="var(--muted)" fontFamily="var(--mono)" fontSize="9" letterSpacing="0.1em">
          METRIC: COSINE_SIM &gt;= 0.82
        </text>

        {/* Query Vector injection path from top */}
        <path
          d="M 335 45 L 335 86"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="1.2"
          strokeDasharray="3 3"
        />
        <text x="335" y="38" textAnchor="middle" fill="var(--accent)" fontFamily="var(--mono)" fontSize="8.5">
          USER QUERY VECTOR ↓
        </text>

        {/* Horizontal Pipeline Traces */}
        <line x1="110" y1="110" x2="147" y2="110" stroke="rgba(199, 255, 69, 0.4)" strokeWidth="1.5" />
        <line x1="242" y1="110" x2="287" y2="110" stroke="rgba(199, 255, 69, 0.4)" strokeWidth="1.5" />
        <line x1="382" y1="110" x2="425" y2="110" stroke="rgba(199, 255, 69, 0.4)" strokeWidth="1.5" />
        <line x1="525" y1="110" x2="572" y2="110" stroke="rgba(199, 255, 69, 0.4)" strokeWidth="1.5" />

        {/* Dynamic Packet Flow */}
        {!shouldReduceMotion && (
          <>
            <motion.circle
              r="2.8"
              fill="var(--accent)"
              animate={{
                cx: [65, 195, 335, 475, 625],
                cy: [110, 110, 110, 110, 110]
              }}
              transition={{
                duration: 4.2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
            <motion.circle
              r="2"
              fill="var(--accent)"
              animate={{
                cx: [335, 335],
                cy: [45, 86]
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: 'easeIn'
              }}
            />
          </>
        )}

        {/* Pipeline Nodes */}
        {stages.map((stage) => {
          const isHighlight = stage.isIndex || stage.isLLM;
          return (
            <g key={stage.id}>
              <rect
                x={stage.x - stage.w / 2}
                y={stage.y - stage.h / 2}
                width={stage.w}
                height={stage.h}
                fill={isHighlight ? '#1D211C' : '#131512'}
                stroke={isHighlight ? 'var(--accent)' : 'rgba(240, 240, 233, 0.15)'}
                strokeWidth={isHighlight ? 1.5 : 1}
              />
              <circle cx={stage.x - stage.w / 2} cy={stage.y} r="2.5" fill="var(--accent)" />
              <circle cx={stage.x + stage.w / 2} cy={stage.y} r="2.5" fill="var(--accent)" />

              <text
                x={stage.x}
                y={stage.y - 4}
                textAnchor="middle"
                fill={isHighlight ? 'var(--accent)' : 'var(--primary-text)'}
                fontFamily="var(--mono)"
                fontSize="9"
                fontWeight="700"
                letterSpacing="0.04em"
              >
                {stage.label}
              </text>
              <text
                x={stage.x}
                y={stage.y + 11}
                textAnchor="middle"
                fill="var(--secondary-text)"
                fontFamily="var(--mono)"
                fontSize="8"
              >
                {stage.sub}
              </text>
            </g>
          );
        })}

        {/* Vector Similarity Footnote */}
        <g opacity="0.65">
          <text x="335" y="165" textAnchor="middle" fill="var(--muted)" fontFamily="var(--mono)" fontSize="8">
            ANN Search: 1536-dim embeddings
          </text>
          <text x="625" y="165" textAnchor="middle" fill="var(--muted)" fontFamily="var(--mono)" fontSize="8">
            Citation check + zero hallucination gate
          </text>
        </g>
      </svg>
    </div>
  );
};
