import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export const CinematicParallaxBackdrop: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  // Optimized lightweight particles (12 particles for 60fps performance)
  const particles = [
    { id: 1, x: '10%', y: '20%', size: 3, delay: 0, duration: 6 },
    { id: 2, x: '85%', y: '15%', size: 2.5, delay: 1, duration: 8 },
    { id: 3, x: '45%', y: '75%', size: 2, delay: 2, duration: 7 },
    { id: 4, x: '70%', y: '60%', size: 3.5, delay: 0.5, duration: 9 },
    { id: 5, x: '25%', y: '85%', size: 2, delay: 1.5, duration: 6.5 },
    { id: 6, x: '92%', y: '80%', size: 2.5, delay: 3, duration: 7.5 },
    { id: 7, x: '15%', y: '50%', size: 3, delay: 2.5, duration: 8.5 },
    { id: 8, x: '60%', y: '30%', size: 2, delay: 1.8, duration: 6.8 }
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
      {/* Radial Atmospheric Spotlight */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-[#C7FF45]/[0.07] via-transparent to-transparent rounded-full blur-3xl" />

      {/* Anime Cyber Circuit SVG Paths */}
      <svg
        className="absolute inset-0 w-full h-full opacity-20"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
      >
        <defs>
          <linearGradient id="circuitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C7FF45" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#00E5FF" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#C7FF45" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Diagonal Circuit Traces */}
        <path d="M-100 200 L300 200 L450 350 L800 350 L950 500 L1600 500" stroke="url(#circuitGrad)" strokeWidth="1" strokeDasharray="6 12" />
        <path d="M-50 450 L250 450 L350 350 L700 350 L850 200 L1500 200" stroke="url(#circuitGrad)" strokeWidth="0.75" strokeDasharray="4 8" />

        {/* Circuit Terminal Junction Points */}
        <circle cx="300" cy="200" r="3" fill="#C7FF45" />
        <circle cx="450" cy="350" r="3" fill="#00E5FF" />
        <circle cx="700" cy="350" r="2.5" fill="#C7FF45" />
        <circle cx="850" cy="200" r="3" fill="#00E5FF" />

        {/* Ambient Grid Lines */}
        <line x1="20%" y1="0" x2="20%" y2="100%" stroke="rgba(240,240,233,0.03)" strokeWidth="1" />
        <line x1="50%" y1="0" x2="50%" y2="100%" stroke="rgba(240,240,233,0.03)" strokeWidth="1" />
        <line x1="80%" y1="0" x2="80%" y2="100%" stroke="rgba(240,240,233,0.03)" strokeWidth="1" />
      </svg>

      {/* Floating Cyber Dust Particles */}
      {!shouldReduceMotion && particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-[#C7FF45]/40"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            boxShadow: '0 0 8px rgba(199,255,69,0.6)'
          }}
          animate={{
            y: [0, -25, 0],
            opacity: [0.2, 0.7, 0.2]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut'
          }}
        />
      ))}
    </div>
  );
};
