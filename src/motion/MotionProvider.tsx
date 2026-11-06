import React, { createContext, useContext, ReactNode } from 'react';
import { useReducedMotion } from 'framer-motion';

interface MotionContextType {
  shouldReduceMotion: boolean;
}

const MotionContext = createContext<MotionContextType>({
  shouldReduceMotion: false
});

export const MotionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const prefersReduced = useReducedMotion();
  const shouldReduceMotion = Boolean(prefersReduced);

  return (
    <MotionContext.Provider value={{ shouldReduceMotion }}>
      {children}
    </MotionContext.Provider>
  );
};

export const useAppMotion = (): MotionContextType => useContext(MotionContext);

