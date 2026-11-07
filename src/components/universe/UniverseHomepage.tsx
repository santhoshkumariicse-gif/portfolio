import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Volume2, VolumeX, FastForward, Sparkles } from 'lucide-react';
import { AICore, AIConversationPanel, useSanAI } from '../../ai';
import { SoundFX } from '../../utils/SoundFX';

interface CinematicPlanetProps {
  isWarping: boolean;
}

const CinematicPlanet: React.FC<CinematicPlanetProps> = ({ isWarping }) => {
  const planetGroupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (planetGroupRef.current) {
      planetGroupRef.current.rotation.y += delta * 0.12;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.06;
    }
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y -= delta * 0.04;
    }

    // Camera orbital sway
    if (!isWarping) {
      const t = state.clock.elapsedTime * 0.25;
      state.camera.position.x = Math.sin(t) * 14;
      state.camera.position.y = 12 + Math.cos(t * 0.8) * 3;
      state.camera.position.z = 48 + Math.cos(t) * 6;
      state.camera.lookAt(0, 0, 0);
    } else {
      // Rapid forward warp acceleration
      state.camera.position.z = THREE.MathUtils.damp(state.camera.position.z, -120, 2.5, delta);
      if ('fov' in state.camera) {
        const perspCam = state.camera as THREE.PerspectiveCamera;
        perspCam.fov = THREE.MathUtils.damp(perspCam.fov, 110, 3, delta);
        perspCam.updateProjectionMatrix();
      }
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* 1. Deep Space Starfield with Subtle Green-Tint Particles */}
      <Stars
        radius={220}
        depth={60}
        count={2800}
        factor={5}
        saturation={0.4}
        fade
        speed={isWarping ? 7 : 1.0}
      />

      {/* 2. Central Cinematic Planet - Green + Black JARVIS Core */}
      <group ref={planetGroupRef}>
        {/* Planet Core Sphere */}
        <mesh>
          <sphereGeometry args={[14, 32, 32]} />
          <meshStandardMaterial
            color="#030806"
            roughness={0.65}
            metalness={0.85}
          />
        </mesh>

        {/* Digital Continental Wireframe with Emerald Glow */}
        <mesh>
          <sphereGeometry args={[14.25, 24, 24]} />
          <meshStandardMaterial
            color="#00E676"
            emissive="#00E676"
            emissiveIntensity={0.9}
            wireframe
            transparent
            opacity={0.45}
          />
        </mesh>

        {/* Deep Emerald Atmospheric Glow */}
        <mesh ref={atmosphereRef}>
          <sphereGeometry args={[15.2, 32, 32]} />
          <meshStandardMaterial
            color="#39FF88"
            emissive="#00E676"
            emissiveIntensity={1.3}
            transparent
            opacity={0.18}
            side={THREE.BackSide}
          />
        </mesh>

        {/* Holographic Concentric Orbital Ring */}
        <mesh ref={ringRef} rotation={[Math.PI / 3.2, 0, 0]}>
          <ringGeometry args={[18, 22, 64]} />
          <meshStandardMaterial
            color="#00BFA5"
            emissive="#00BFA5"
            emissiveIntensity={0.8}
            side={THREE.DoubleSide}
            transparent
            opacity={0.35}
            wireframe
          />
        </mesh>
      </group>

      {/* Emerald and Teal Cinematic Lighting */}
      <pointLight position={[35, 25, 45]} color="#00E676" intensity={3.8} distance={130} />
      <pointLight position={[-35, -20, -45]} color="#39FF88" intensity={2.4} distance={130} />
      <ambientLight intensity={0.35} color="#07120D" />
    </group>
  );
};

export interface UniverseHomepageProps {
  onViewJourney: () => void;
  onExplorePortfolio2D?: () => void;
}

export const UniverseHomepage: React.FC<UniverseHomepageProps> = ({
  onViewJourney
}) => {
  const [isWarping, setIsWarping] = useState(false);
  const [warpProgress, setWarpProgress] = useState(0);
  const { announce, isMuted, toggleMute } = useSanAI();

  // Handle the VIEW JOURNEY click: starts warp transition, then hands over to Highway
  const handleViewJourney = () => {
    if (isWarping) return;
    setIsWarping(true);
    SoundFX.playWarp();
    announce("Welcome to The Road of Santhosh. Initiating interactive portfolio journey.");

    // Animate progress bar across 2.4s
    const startTime = Date.now();
    const duration = 2400;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setWarpProgress(pct);

      if (elapsed >= duration) {
        clearInterval(interval);
        onViewJourney();
      }
    }, 40);
  };

  const handleSkipTransition = () => {
    SoundFX.playClick();
    onViewJourney();
  };

  return (
    <div className="relative w-full h-screen bg-[#030806] overflow-hidden select-none font-mono">
      {/* 1. Main 3D WebGL Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 12, 48], fov: 50, near: 0.1, far: 600 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        >
          <color attach="background" args={['#030806']} />
          <fog attach="fog" args={['#030806', 40, 260]} />
          <CinematicPlanet isWarping={isWarping} />
        </Canvas>
      </div>

      {/* 2. Vignette and Ambient Radial Overlay */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(3,8,6,0.88)_100%)]" />

      {/* 2b. Ambient Technical Orbital Ring (Subtle & Non-Intrusive) */}
      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center opacity-15">
        <svg
          viewBox="0 0 800 800"
          className="w-[85vw] max-w-[700px] h-auto animate-[spin_120s_linear_infinite]"
        >
          <circle cx="400" cy="400" r="380" fill="none" stroke="#00E676" strokeWidth="0.8" strokeDasharray="6 12" opacity="0.3" />
          <circle cx="400" cy="400" r="300" fill="none" stroke="#39FF88" strokeWidth="1" strokeDasharray="24 16" opacity="0.25" />
          <circle cx="400" cy="400" r="220" fill="none" stroke="#00BFA5" strokeWidth="0.75" opacity="0.2" />
        </svg>
      </div>

      {/* 3. Top Clean Header Bar */}
      <header className="pointer-events-auto absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 sm:px-8 py-3.5 sm:py-4 border-b border-white/10 bg-[#030806]/85 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-[#00E676]" />
          <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-[#E7F5EC] uppercase">
            SANTHOSH KUMAR M <span className="text-[#39FF88] hidden sm:inline">· 2026 PORTFOLIO</span>
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Audio Mute Button */}
          <button
            type="button"
            onClick={toggleMute}
            className={`p-2 rounded-lg border text-xs transition-all backdrop-blur-md ${
              !isMuted
                ? 'bg-[#00E676]/20 border-[#00E676] text-[#00E676]'
                : 'bg-black/50 border-white/10 text-[#91A99A] hover:text-[#E7F5EC]'
            }`}
            title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
            aria-label={isMuted ? 'Unmute Sound' : 'Mute Sound'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* 4. Center Presentation Hero */}
      {!isWarping && (
        <main className="pointer-events-auto absolute inset-0 z-20 flex flex-col items-center justify-center p-4 sm:p-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl w-full flex flex-col items-center space-y-4 sm:space-y-5"
          >
            {/* Professional Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00E676]/10 border border-[#00E676]/30 text-[#39FF88] text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider">
              <Sparkles className="w-3 h-3 text-[#00E676]" />
              <span>INTERACTIVE 3D PRESENTATION</span>
            </div>

            {/* Developer Identity Heading */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-[#E7F5EC] uppercase font-sans leading-none drop-shadow-2xl">
              SANTHOSH KUMAR M
            </h1>

            {/* Subheading / Profession from Resume */}
            <div className="text-xs sm:text-sm font-mono text-[#39FF88] font-bold tracking-widest uppercase">
              CYBERSECURITY ENTHUSIAST · COMPUTER SCIENCE ENGINEERING STUDENT
            </div>

            {/* Clear, Non-Redundant Narrative Summary */}
            <p className="text-xs sm:text-sm md:text-base text-slate-300 font-sans max-w-lg leading-relaxed">
              B.E. Computer Science student at Gnanamani College of Technology (GPA: 7.2, Exp. 2027). Specializing in web application security, vulnerability assessment, and Python automation.
            </p>

            {/* Primary Action CTA: VIEW JOURNEY */}
            <div className="flex items-center justify-center pt-2 sm:pt-3 w-full max-w-xs">
              <button
                type="button"
                onClick={handleViewJourney}
                className="w-full px-8 py-3.5 bg-[#00E676] hover:bg-[#39FF88] text-[#030806] rounded-xl font-bold text-xs sm:text-sm uppercase tracking-widest shadow-[0_0_30px_rgba(0,230,118,0.5)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2.5"
                title="Launch the 3D Highway Experience"
              >
                <Play className="w-4 h-4 fill-current text-[#030806]" />
                <span>VIEW JOURNEY</span>
              </button>
            </div>
          </motion.div>
        </main>
      )}

      {/* 5. CINEMATIC TRANSITION SEQUENCE (Active upon clicking VIEW JOURNEY) */}
      <AnimatePresence>
        {isWarping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-auto absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/85 backdrop-blur-xl p-6 text-center select-none"
          >
            {/* Warp Speed Streak Lines & Glowing Flare */}
            <div className="relative max-w-xl w-full flex flex-col items-center space-y-6">
              {/* Status Telemetry */}
              <div className="flex items-center gap-2 text-[#00E676] text-xs font-black tracking-widest uppercase animate-pulse">
                <span className="w-2 h-2 rounded-full bg-[#00E676]" />
                <span>SAN AI // ENGAGING GREEN HIGHWAY SPEEDWAY BUS</span>
              </div>

              {/* Grand Cinematic Reveal Title */}
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="space-y-2"
              >
                <h2 className="text-3xl sm:text-5xl font-black text-white tracking-widest uppercase font-sans drop-shadow-[0_0_35px_rgba(0,230,118,0.85)]">
                  THE ROAD OF SANTHOSH
                </h2>
                <div className="text-xs sm:text-sm text-[#39FF88] font-mono tracking-widest font-bold">
                  POWERED BY SAN AI // INITIALIZING KM 0
                </div>
              </motion.div>

              {/* Sequential Road Luminaire Activation Progress Bar */}
              <div className="w-full max-w-md bg-white/10 h-2.5 rounded-full overflow-hidden border border-[#00E676]/30">
                <div
                  className="h-full bg-gradient-to-r from-[#00E676] via-[#39FF88] to-[#00BFA5] transition-all duration-75 shadow-[0_0_15px_#39FF88]"
                  style={{ width: `${warpProgress}%` }}
                />
              </div>

              <div className="text-[10px] text-[#91A99A] tracking-wider">
                SEQUENTIAL LUMINAIRE IGNITION: {warpProgress}%
              </div>

              {/* Skip Transition Button */}
              <button
                type="button"
                onClick={handleSkipTransition}
                className="mt-4 px-4 py-1.5 bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white rounded-lg text-xs font-bold uppercase tracking-wider border border-white/20 transition-all flex items-center gap-1.5"
              >
                <span>Skip Transition</span>
                <FastForward className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 6. Floating SAN AI Core in Top Right */}
      <div className="fixed top-20 right-4 sm:right-8 z-30 pointer-events-auto">
        <AICore size={76} />
      </div>

      {/* 7. SAN AI Interactive Dialogue Panel */}
      <AIConversationPanel />
    </div>
  );
};
