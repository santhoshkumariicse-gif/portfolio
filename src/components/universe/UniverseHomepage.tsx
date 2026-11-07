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
      {/* 1. Deep Space Starfield with Neutral Pure Light Particles */}
      <Stars
        radius={220}
        depth={60}
        count={2800}
        factor={4.5}
        saturation={0}
        fade
        speed={isWarping ? 7 : 1.0}
      />

      {/* 2. Central Cinematic Planet - Obsidian Black & Racing Red Core */}
      <group ref={planetGroupRef}>
        {/* Planet Core Sphere - Obsidian Black */}
        <mesh>
          <sphereGeometry args={[14, 32, 32]} />
          <meshStandardMaterial
            color="#090B0E"
            roughness={0.7}
            metalness={0.85}
          />
        </mesh>

        {/* Digital Continental Wireframe with Controlled Racing Red Glow */}
        <mesh>
          <sphereGeometry args={[14.25, 24, 24]} />
          <meshStandardMaterial
            color="#E10620"
            emissive="#E10620"
            emissiveIntensity={0.65}
            wireframe
            transparent
            opacity={0.35}
          />
        </mesh>

        {/* Deep Crimson Atmospheric Rim */}
        <mesh ref={atmosphereRef}>
          <sphereGeometry args={[15.2, 32, 32]} />
          <meshStandardMaterial
            color="#E10620"
            emissive="#A9081A"
            emissiveIntensity={0.9}
            transparent
            opacity={0.15}
            side={THREE.BackSide}
          />
        </mesh>

        {/* Precision Telemetry Orbital Ring - Ice Grey */}
        <mesh ref={ringRef} rotation={[Math.PI / 3.2, 0, 0]}>
          <ringGeometry args={[18, 22, 64]} />
          <meshStandardMaterial
            color="#C9D0D8"
            emissive="#FF3548"
            emissiveIntensity={0.35}
            side={THREE.DoubleSide}
            transparent
            opacity={0.22}
            wireframe
          />
        </mesh>
      </group>

      {/* Motorsport Telemetry Cinematic Lighting: Signal Red & Steel Grey */}
      <pointLight position={[35, 25, 45]} color="#FF3548" intensity={3.0} distance={130} />
      <pointLight position={[-35, -20, -45]} color="#87919D" intensity={2.0} distance={130} />
      <ambientLight intensity={0.4} color="#171B20" />
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

  // Handle VIEW JOURNEY click: starts warp transition, then hands over to Highway
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
    <div className="relative w-full h-screen bg-[#090B0E] overflow-hidden select-none font-mono">
      {/* 1. Main 3D WebGL Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 12, 48], fov: 50, near: 0.1, far: 600 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        >
          <color attach="background" args={['#090B0E']} />
          <fog attach="fog" args={['#090B0E', 40, 260]} />
          <CinematicPlanet isWarping={isWarping} />
        </Canvas>
      </div>

      {/* 2. Vignette and Ambient Radial Overlay */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(9,11,14,0.9)_100%)]" />

      {/* 2b. Subtle Ambient Telemetry Orbital Ring */}
      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center opacity-15">
        <svg
          viewBox="0 0 800 800"
          className="w-[85vw] max-w-[700px] h-auto animate-[spin_120s_linear_infinite]"
        >
          <circle cx="400" cy="400" r="380" fill="none" stroke="#87919D" strokeWidth="0.8" strokeDasharray="6 12" opacity="0.3" />
          <circle cx="400" cy="400" r="300" fill="none" stroke="#C9D0D8" strokeWidth="1" strokeDasharray="24 16" opacity="0.25" />
          <circle cx="400" cy="400" r="220" fill="none" stroke="#E10620" strokeWidth="0.75" opacity="0.2" />
        </svg>
      </div>

      {/* 3. Top Clean Motorsport Header Bar */}
      <header className="pointer-events-auto absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 sm:px-8 py-3.5 sm:py-4 border-b border-[rgba(201,208,216,0.12)] bg-[#090B0E]/90 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-[#E10620] shadow-[0_0_8px_#E10620]" />
          <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-[#F2F4F7] uppercase">
            SANTHOSH KUMAR M <span className="text-[#87919D] hidden sm:inline">· 2026 PORTFOLIO</span>
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Audio Mute Button */}
          <button
            type="button"
            onClick={toggleMute}
            className={`p-2 rounded-lg border text-xs transition-all backdrop-blur-md ${
              !isMuted
                ? 'bg-[#E10620]/15 border-[#E10620] text-[#FF3548]'
                : 'bg-[#171B20] border-[rgba(201,208,216,0.12)] text-[#87919D] hover:text-[#F2F4F7]'
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
            {/* Technical Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E10620]/10 border border-[#E10620]/30 text-[#FF3548] text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider">
              <Sparkles className="w-3 h-3 text-[#E10620]" />
              <span>INTERACTIVE 3D PRESENTATION</span>
            </div>

            {/* Developer Identity Heading */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-[#F2F4F7] uppercase font-sans leading-none drop-shadow-2xl">
              SANTHOSH KUMAR M
            </h1>

            {/* Subheading / Profession from Resume */}
            <div className="text-xs sm:text-sm font-mono text-[#C9D0D8] font-bold tracking-widest uppercase">
              CYBERSECURITY ENTHUSIAST · COMPUTER SCIENCE ENGINEERING STUDENT
            </div>

            {/* Clear, Non-Redundant Recruiter Narrative */}
            <p className="text-xs sm:text-sm md:text-base text-[#C9D0D8] font-sans max-w-lg leading-relaxed">
              B.E. Computer Science student at Gnanamani College of Technology (GPA: 7.2, Exp. 2027). Specializing in web application security, vulnerability assessment, and Python automation.
            </p>

            {/* Primary Action CTA: VIEW JOURNEY */}
            <div className="flex items-center justify-center pt-2 sm:pt-3 w-full max-w-xs">
              <button
                type="button"
                onClick={handleViewJourney}
                className="w-full px-8 py-3.5 bg-[#E10620] hover:bg-[#FF3548] text-[#F2F4F7] rounded-xl font-bold text-xs sm:text-sm uppercase tracking-widest shadow-[0_0_24px_rgba(225,6,32,0.45)] hover:shadow-[0_0_36px_rgba(255,53,72,0.65)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2.5 border border-[#FF3548]"
                title="Launch the 3D Highway Experience"
              >
                <Play className="w-4 h-4 fill-current text-[#F2F4F7]" />
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
            className="pointer-events-auto absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#090B0E]/90 backdrop-blur-xl p-6 text-center select-none"
          >
            {/* Warp Telemetry & Title Display */}
            <div className="relative max-w-xl w-full flex flex-col items-center space-y-6">
              {/* Status Telemetry */}
              <div className="flex items-center gap-2 text-[#FF3548] text-xs font-black tracking-widest uppercase animate-pulse">
                <span className="w-2 h-2 rounded-full bg-[#E10620] shadow-[0_0_8px_#E10620]" />
                <span>SAN AI // ENGAGING HIGHWAY TELEMETRY</span>
              </div>

              {/* Grand Reveal Title */}
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="space-y-2"
              >
                <h2 className="text-3xl sm:text-5xl font-black text-[#F2F4F7] tracking-widest uppercase font-sans drop-shadow-[0_0_30px_rgba(225,6,32,0.6)]">
                  THE ROAD OF SANTHOSH
                </h2>
                <div className="text-xs sm:text-sm text-[#C9D0D8] font-mono tracking-widest font-bold">
                  POWERED BY SAN AI // INITIALIZING KM 0
                </div>
              </motion.div>

              {/* Sequential Road Luminaire Activation Progress Bar */}
              <div className="w-full max-w-md bg-white/10 h-2.5 rounded-full overflow-hidden border border-[rgba(201,208,216,0.12)]">
                <div
                  className="h-full bg-gradient-to-r from-[#A9081A] via-[#E10620] to-[#FF3548] transition-all duration-75 shadow-[0_0_12px_#E10620]"
                  style={{ width: `${warpProgress}%` }}
                />
              </div>

              <div className="text-[10px] text-[#87919D] tracking-wider font-mono">
                SEQUENTIAL LUMINAIRE IGNITION: {warpProgress}%
              </div>

              {/* Skip Transition Button */}
              <button
                type="button"
                onClick={handleSkipTransition}
                className="mt-4 px-4 py-1.5 bg-[#171B20] hover:bg-[#20252C] text-[#C9D0D8] hover:text-[#F2F4F7] rounded-lg text-xs font-bold uppercase tracking-wider border border-[rgba(201,208,216,0.12)] transition-all flex items-center gap-1.5"
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
