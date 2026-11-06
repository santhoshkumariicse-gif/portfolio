import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface NeuralArchitectureSVGProps {
  className?: string;
  isInteractive?: boolean;
}

export const NeuralArchitectureSVG: React.FC<NeuralArchitectureSVGProps> = ({
  className = '',
  isInteractive = true
}) => {
  const shouldReduceMotion = useReducedMotion();

  // Blueprint coordinate stages
  const layers = [
    { id: 'input', label: 'INPUT TOKENS', sub: 'seq_len: 512', x: 70, y: 110, w: 90, h: 48 },
    { id: 'pos', label: 'POS ENCODING', sub: 'sin/cos embeddings', x: 200, y: 110, w: 95, h: 48 },
    { id: 'mha', label: 'ATTENTION CORE', sub: '8-head self-attn', x: 340, y: 110, w: 105, h: 54, isCore: true },
    { id: 'ffn', label: 'FEED FORWARD', sub: 'GELU + projection', x: 490, y: 110, w: 95, h: 48 },
    { id: 'latent', label: 'LATENT EMBED', sub: 'd_model: 768', x: 625, y: 110, w: 85, h: 48 }
  ];

  return (
    <div className={`w-full overflow-hidden select-none ${className}`}>
      <svg
        viewBox="0 0 740 220"
        className="w-full h-auto max-h-[260px]"
        role="img"
        aria-labelledby="neural-arch-title neural-arch-desc"
      >
        <title id="neural-arch-title">Transformer & Neural Feature Architecture</title>
        <desc id="neural-arch-desc">
          Technical blueprint showing transformer pipeline stages: tokenized input vectors, positional encoding, multi-head self-attention matrix, feed-forward network, and latent vector representation.
        </desc>

        <defs>
          <pattern id="neural-grid-pat" width="16" height="16" patternUnits="userSpaceOnUse">
            <path d="M 16 0 L 0 0 0 16" fill="none" stroke="rgba(240, 240, 233, 0.04)" strokeWidth="0.75" />
          </pattern>
          <linearGradient id="neural-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(199, 255, 69, 0.15)" />
            <stop offset="50%" stopColor="rgba(199, 255, 69, 0.5)" />
            <stop offset="100%" stopColor="rgba(199, 255, 69, 0.15)" />
          </linearGradient>
        </defs>

        <rect width="740" height="220" fill="url(#neural-grid-pat)" />

        {/* Blueprint Framing & Technical Annotation */}
        <line x1="20" y1="20" x2="160" y2="20" stroke="var(--accent)" strokeWidth="1.5" />
        <text x="20" y="14" fill="var(--muted)" fontFamily="var(--mono)" fontSize="9" letterSpacing="0.1em">
          SYS.MODEL.TRANSFORMER_V2 // LATENT TENSOR PIPELINE
        </text>
        <text x="720" y="14" textAnchor="end" fill="var(--muted)" fontFamily="var(--mono)" fontSize="9" letterSpacing="0.1em">
          PRECISION: FP16
        </text>

        {/* Residual Skip Connection Trace */}
        <path
          d="M 115 86 L 115 48 L 490 48 L 490 86"
          fill="none"
          stroke="rgba(199, 255, 69, 0.3)"
          strokeWidth="1.2"
          strokeDasharray="4 3"
        />
        <text x="300" y="42" textAnchor="middle" fill="var(--accent)" fontFamily="var(--mono)" fontSize="8.5">
          + RESIDUAL SKIP TRACE
        </text>

        {/* Inter-layer Flow Traces */}
        <line x1="115" y1="110" x2="200" y2="110" stroke="rgba(199, 255, 69, 0.4)" strokeWidth="1.5" />
        <line x1="247" y1="110" x2="340" y2="110" stroke="rgba(199, 255, 69, 0.4)" strokeWidth="1.5" />
        <line x1="392" y1="110" x2="490" y2="110" stroke="rgba(199, 255, 69, 0.4)" strokeWidth="1.5" />
        <line x1="537" y1="110" x2="625" y2="110" stroke="rgba(199, 255, 69, 0.4)" strokeWidth="1.5" />

        {/* Dynamic Tensor Packet Motion */}
        {!shouldReduceMotion && (
          <>
            <motion.circle
              r="2.8"
              fill="var(--accent)"
              animate={{
                cx: [70, 200, 340, 490, 665],
                cy: [110, 110, 110, 110, 110]
              }}
              transition={{
                duration: 3.8,
                repeat: Infinity,
                ease: 'linear'
              }}
            />
            <motion.circle
              r="2.2"
              fill="rgba(240, 240, 233, 0.8)"
              animate={{
                cx: [115, 115, 490, 490],
                cy: [86, 48, 48, 86]
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          </>
        )}

        {/* Layer Blocks */}
        {layers.map((layer) => {
          const isCore = layer.isCore;
          return (
            <g
              key={layer.id}
              className={`transition-transform duration-200 ${isInteractive ? 'cursor-default' : ''}`}
            >
              {/* Box Outline */}
              <rect
                x={layer.x - layer.w / 2}
                y={layer.y - layer.h / 2}
                width={layer.w}
                height={layer.h}
                fill={isCore ? '#1D211C' : '#131512'}
                stroke={isCore ? 'var(--accent)' : 'rgba(240, 240, 233, 0.15)'}
                strokeWidth={isCore ? 1.5 : 1}
              />

              {/* Pin points */}
              <circle cx={layer.x - layer.w / 2} cy={layer.y} r="2.5" fill="var(--accent)" />
              <circle cx={layer.x + layer.w / 2} cy={layer.y} r="2.5" fill="var(--accent)" />

              {/* Content */}
              <text
                x={layer.x}
                y={layer.y - 4}
                textAnchor="middle"
                fill={isCore ? 'var(--accent)' : 'var(--primary-text)'}
                fontFamily="var(--mono)"
                fontSize="9"
                fontWeight="700"
                letterSpacing="0.05em"
              >
                {layer.label}
              </text>
              <text
                x={layer.x}
                y={layer.y + 11}
                textAnchor="middle"
                fill="var(--secondary-text)"
                fontFamily="var(--mono)"
                fontSize="8"
              >
                {layer.sub}
              </text>
            </g>
          );
        })}

        {/* Matrix Visualization Accents under Attention Core */}
        <g opacity="0.6">
          <rect x="315" y="155" width="50" height="28" fill="#171A16" stroke="rgba(199, 255, 69, 0.2)" strokeWidth="0.8" />
          <line x1="315" y1="169" x2="365" y2="169" stroke="rgba(240, 240, 233, 0.1)" strokeWidth="0.8" />
          <line x1="340" y1="155" x2="340" y2="183" stroke="rgba(240, 240, 233, 0.1)" strokeWidth="0.8" />
          <text x="340" y="198" textAnchor="middle" fill="var(--muted)" fontFamily="var(--mono)" fontSize="7.5">
            Q × K^T / √d_k
          </text>
        </g>
      </svg>
    </div>
  );
};

