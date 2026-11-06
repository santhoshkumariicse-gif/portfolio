import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ShieldCheck, MapPin, GraduationCap, Sparkles } from 'lucide-react';
import { personalProfileData } from '../data/profile';

interface ProfilePortraitCardProps {
  className?: string;
  variant?: 'hero' | 'about';
}

export const ProfilePortraitCard: React.FC<ProfilePortraitCardProps> = ({
  className = '',
  variant = 'hero'
}) => {
  const shouldReduceMotion = useReducedMotion();
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div
      className={`relative group border border-[var(--border-strong)] bg-[var(--surface)] shadow-2xl transition-all duration-300 hover:border-[var(--active-border)] overflow-hidden ${className}`}
    >
      {/* Technical HUD Header Bar */}
      <div className="flex items-center justify-between px-3.5 py-2.5 bg-[rgba(19,21,18,0.92)] border-b border-[var(--border)] font-[var(--mono)] text-[0.66rem] tracking-wider uppercase text-[var(--secondary-text)]">
        <span className="flex items-center gap-1.5 font-bold text-[var(--primary-text)]">
          <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
          VERIFIED IDENTITY // {variant === 'hero' ? 'PORTRAIT' : 'PROFILE'}
        </span>
        <span className="text-[var(--accent)] font-semibold flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5" />
          AUTHENTIC
        </span>
      </div>

      {/* Main Image Container */}
      <div className="relative p-3 sm:p-4 bg-[var(--bg)] flex items-center justify-center">
        {/* Subtle SVG Grid & Corner Reticles */}
        <div className="absolute inset-2 pointer-events-none z-10">
          {/* Top-Left Corner */}
          <span className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[var(--accent)]" />
          {/* Top-Right Corner */}
          <span className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[var(--accent)]" />
          {/* Bottom-Left Corner */}
          <span className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[var(--accent)]" />
          {/* Bottom-Right Corner */}
          <span className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[var(--accent)]" />

          {/* Coordinate Watermark */}
          <span className="absolute bottom-1 right-2 font-[var(--mono)] text-[0.58rem] tracking-widest text-[var(--muted)] opacity-60">
            11.2189°N, 78.1674°E
          </span>
        </div>

        {/* Circular / Rounded Technical Portrait Frame */}
        <div className="relative w-full max-w-[340px] sm:max-w-[380px] aspect-[3/4] overflow-hidden border border-[var(--border)] bg-[#0C0E0B] shadow-[0_0_30px_rgba(199,255,69,0.08)] group-hover:shadow-[0_0_35px_rgba(199,255,69,0.18)] transition-shadow duration-500">
          {/* Loading Skeleton */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-[var(--surface-subtle)] animate-pulse flex items-center justify-center">
              <span className="font-[var(--mono)] text-xs text-[var(--muted)]">Loading portrait...</span>
            </div>
          )}

          {/* Actual Photograph */}
          <motion.img
            src={personalProfileData.photoUrl}
            alt="Santhosh Kumar M — Computer Science Engineering Student"
            onLoad={() => setImageLoaded(true)}
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 1.04 }}
            animate={{ opacity: imageLoaded ? 1 : 0, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.025]"
            loading="eager"
            decoding="async"
          />

          {/* Technical Scanline Vignette & Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,11,9,0.85)] via-transparent to-transparent pointer-events-none" />

          {/* Dynamic Telemetry Pill on bottom of image */}
          <div className="absolute bottom-3 left-3 right-3 z-20 flex flex-col gap-1 p-2.5 bg-[rgba(19,21,18,0.88)] backdrop-blur-md border border-[var(--border)] font-[var(--mono)]">
            <div className="flex items-center justify-between text-[0.66rem]">
              <span className="text-[var(--primary-text)] font-bold uppercase tracking-wider">
                {personalProfileData.name}
              </span>
              <span className="text-[var(--accent)] font-semibold flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5" />
                CSE // 2027
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[0.6rem] text-[var(--secondary-text)]">
              <GraduationCap className="w-3 h-3 text-[var(--accent)] shrink-0" />
              <span className="truncate">Gnanamani College of Technology</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Telemetry Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 px-3.5 py-2.5 bg-[rgba(19,21,18,0.92)] border-t border-[var(--border)] font-[var(--mono)] text-[0.64rem] tracking-wider">
        <span className="text-[var(--secondary-text)] flex items-center gap-1">
          <MapPin className="w-3 h-3 text-[var(--accent)]" />
          <span>Namakkal, Tamil Nadu, India</span>
        </span>
        <span className="text-[var(--accent)] font-bold truncate">
          DEV // FULL-STACK · ANDROID · AI
        </span>
      </div>
    </div>
  );
};
