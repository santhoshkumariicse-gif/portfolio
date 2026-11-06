import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  IdleAvatarSvg,
  ThinkingAvatarSvg,
  CodingAvatarSvg,
  AchievementAvatarSvg,
  ExploringAvatarSvg,
  FutureAvatarSvg
} from '../svgs/character';

export type AvatarExpression = 'idle' | 'thinking' | 'coding' | 'achievement' | 'exploring' | 'future';

export interface AnimeAvatarProps {
  expression: AvatarExpression;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  scene?: string;
  interactionEnabled?: boolean;
  animationEnabled?: boolean;
  className?: string;
  onPoseChange?: (expression: AvatarExpression) => void;
  showControls?: boolean;
}

const sizeClasses: Record<NonNullable<AnimeAvatarProps['size']>, string> = {
  sm: 'w-28 h-36 md:w-36 md:h-44',
  md: 'w-48 h-60 md:w-56 md:h-72',
  lg: 'w-64 h-80 md:w-80 md:h-[400px]',
  xl: 'w-72 h-96 md:w-96 md:h-[480px]'
};

const expressionLabels: Record<AvatarExpression, { title: string; desc: string }> = {
  idle: { title: 'IDLE', desc: 'Ready for input & scanning environment' },
  thinking: { title: 'THINKING', desc: 'Analyzing architecture & problem spaces' },
  coding: { title: 'CODING', desc: 'Deploying solutions & active test suites' },
  achievement: { title: 'ACHIEVEMENT', desc: 'Milestones passed & directives achieved' },
  exploring: { title: 'EXPLORING', desc: 'Investigating tools, skills & tech graph' },
  future: { title: 'FUTURE', desc: 'Horizon scanning & upcoming engineering goals' }
};

export const AnimeAvatar: React.FC<AnimeAvatarProps> = ({
  expression,
  size = 'lg',
  scene,
  interactionEnabled = false,
  animationEnabled = true,
  className = '',
  onPoseChange,
  showControls = false
}) => {
  const [currentExpression, setCurrentExpression] = useState<AvatarExpression>(expression);
  const shouldReduceMotion = useReducedMotion();

  // Sync state if controlled expression prop changes
  React.useEffect(() => {
    setCurrentExpression(expression);
  }, [expression]);

  const handleSelectExpression = (newExp: AvatarExpression) => {
    setCurrentExpression(newExp);
    onPoseChange?.(newExp);
  };

  const renderSvg = (exp: AvatarExpression) => {
    switch (exp) {
      case 'idle':
        return <IdleAvatarSvg className="w-full h-full drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]" />;
      case 'thinking':
        return <ThinkingAvatarSvg className="w-full h-full drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]" />;
      case 'coding':
        return <CodingAvatarSvg className="w-full h-full drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]" />;
      case 'achievement':
        return <AchievementAvatarSvg className="w-full h-full drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]" />;
      case 'exploring':
        return <ExploringAvatarSvg className="w-full h-full drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]" />;
      case 'future':
        return <FutureAvatarSvg className="w-full h-full drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]" />;
      default:
        return <IdleAvatarSvg className="w-full h-full drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]" />;
    }
  };

  const floatTransition = shouldReduceMotion || !animationEnabled
    ? undefined
    : {
        y: [0, -6, 0],
        transition: {
          duration: 4.5,
          repeat: Infinity,
          ease: 'easeInOut' as const
        }
      };

  return (
    <div
      className={`relative flex flex-col items-center justify-center select-none ${className}`}
      data-scene={scene}
    >
      {/* Outer Hologram Pedestal Ring */}
      <div className="absolute -bottom-4 w-3/4 h-8 bg-gradient-to-t from-[#C7FF45]/10 to-transparent rounded-full blur-md pointer-events-none" />

      {/* Main Avatar Motion Container */}
      <motion.div
        animate={floatTransition}
        className={`relative ${sizeClasses[size]} transition-all duration-300`}
        whileHover={interactionEnabled ? { scale: 1.02 } : undefined}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentExpression}
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="w-full h-full flex items-center justify-center"
          >
            {renderSvg(currentExpression)}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Optional Interactive Expression Switcher (HUD Style) */}
      {(showControls || interactionEnabled) && (
        <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5 p-1.5 rounded bg-[#131512]/90 border border-white/10 backdrop-blur-md z-10 shadow-lg">
          {(['idle', 'thinking', 'exploring', 'coding', 'achievement', 'future'] as AvatarExpression[]).map((exp) => (
            <button
              key={exp}
              onClick={() => handleSelectExpression(exp)}
              className={`px-2 py-0.5 text-[10px] font-mono tracking-wider uppercase rounded transition-colors ${
                currentExpression === exp
                  ? 'bg-[#C7FF45] text-[#0A0B09] font-bold shadow-[0_0_8px_rgba(199,255,69,0.4)]'
                  : 'text-[#9BA195] hover:text-[#F0F0E9] hover:bg-white/5'
              }`}
              title={expressionLabels[exp].desc}
            >
              {exp}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
