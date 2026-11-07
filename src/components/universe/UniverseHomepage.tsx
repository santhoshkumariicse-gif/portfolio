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
      {/* 1. Ambient High-Key Technical Space Dust Particles */}
      <Stars
        radius={220}
        depth={60}
        count={1200}
        factor={3.0}
        saturation={0}
        fade
        speed={isWarping ? 7 : 0.8}
      />

      {/* 2. Central Cinematic Automotive Sculpture - Carbon Black & Racing Red Precision Core */}
      <group ref={planetGroupRef}>
        {/* Core Sphere - Satin Carbon Black */}
        <mesh>
          <sphereGeometry args={[14, 32, 32]} />
          <meshStandardMaterial
            color="#171B20"
            roughness={0.4}
            metalness={0.8}
          />
        </mesh>

        {/* Precision Obsidian Black Continental Geometry Wireframe */}
        <mesh>
          <sphereGeometry args={[14.25, 24, 24]} />
          <meshStandardMaterial
            color="#090B0E"
            emissive="#090B0E"
            emissiveIntensity={0.2}
            wireframe
            transparent
            opacity={0.3}
          />
        </mesh>

        {/* Ice Grey Rim Atmosphere with Subtle Crimson Depth */}
        <mesh ref={atmosphereRef}>
          <sphereGeometry args={[15.2, 32, 32]} />
          <meshStandardMaterial
            color="#C9D0D8"
            emissive="#A9081A"
            emissiveIntensity={0.4}
            transparent
            opacity={0.25}
            side={THREE.BackSide}
          />
        </mesh>

        {/* Precision Telemetry Orbital Ring - Obsidian & Racing Red */}
        <mesh ref={ringRef} rotation={[Math.PI / 3.2, 0, 0]}>
          <ringGeometry args={[18, 22, 64]} />
          <meshStandardMaterial
            color="#090B0E"
            emissive="#E10620"
            emissiveIntensity={0.7}
            side={THREE.DoubleSide}
            transparent
            opacity={0.35}
            wireframe
          />
        </mesh>
      </group>

      {/* High-Key Automotive Studio Telemetry Lighting */}
      <directionalLight position={[0, 40, 20]} intensity={1.4} color="#FFFFFF" />
      <pointLight position={[35, 30, 45]} color="#FFFFFF" intensity={2.2} distance={140} />
      <pointLight position={[-35, -20, -45]} color="#E10620" intensity={1.6} distance={140} />
      <ambientLight intensity={1.2} color="#DCE2E8" />
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
    <div className="relative w-full h-screen bg-[#DCE2E8] overflow-hidden select-none font-mono">
      {/* 1. Main 3D WebGL Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 12, 48], fov: 50, near: 0.1, far: 600 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        >
          <color attach="background" args={['#DCE2E8']} />
          <fog attach="fog" args={['#DCE2E8', 40, 260]} />
          <CinematicPlanet isWarping={isWarping} />
        </Canvas>
      </div>

      {/* 2. Vignette and Ambient Radial Overlay */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(201,208,216,0.65)_100%)]" />

      {/* 2b. Subtle Ambient Telemetry Orbital Ring */}
      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center opacity-25">
        <svg
          viewBox="0 0 800 800"
          className="w-[85vw] max-w-[700px] h-auto animate-[spin_120s_linear_infinite]"
        >
          <circle cx="400" cy="400" r="380" fill="none" stroke="#87919D" strokeWidth="0.8" strokeDasharray="6 12" opacity="0.4" />
          <circle cx="400" cy="400" r="300" fill="none" stroke="#090B0E" strokeWidth="1" strokeDasharray="24 16" opacity="0.3" />
          <circle cx="400" cy="400" r="220" fill="none" stroke="#E10620" strokeWidth="1" opacity="0.35" />
        </svg>
      </div>

      {/* 3. Top Clean Light Automotive Header Bar */}
      <header className="pointer-events-auto absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 sm:px-8 py-3.5 sm:py-4 border-b border-[rgba(9,11,14,0.12)] bg-[#F2F4F7]/90 backdrop-blur-md shadow-sm">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-[#E10620] shadow-[0_0_8px_#E10620]" />
          <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-[#090B0E] uppercase">
            SANTHOSH KUMAR M <span className="text-[#626C78] hidden sm:inline">· 2026 PORTFOLIO</span>
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Audio Mute Button */}
          <button
            type="button"
            onClick={toggleMute}
            className={`p-2 rounded-lg border text-xs transition-all backdrop-blur-md shadow-sm ${
              !isMuted
                ? 'bg-[#E10620]/15 border-[#E10620] text-[#E10620]'
                : 'bg-[#F2F4F7] border-[rgba(9,11,14,0.12)] text-[#626C78] hover:text-[#090B0E] hover:border-[#E10620]'
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
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F2F4F7] border border-[rgba(9,11,14,0.14)] text-[#090B0E] text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider shadow-sm">
              <Sparkles className="w-3 h-3 text-[#E10620]" />
              <span>INTERACTIVE 3D PRESENTATION</span>
            </div>

            {/* Developer Identity Heading */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-[#090B0E] uppercase font-sans leading-none drop-shadow-sm">
              SANTHOSH KUMAR M
            </h1>

            {/* Subheading / Profession from Resume */}
            <div className="text-xs sm:text-sm font-mono text-[#171B20] font-bold tracking-widest uppercase">
              CYBERSECURITY ENTHUSIAST · COMPUTER SCIENCE ENGINEERING STUDENT
            </div>

            {/* Clear, Non-Redundant Recruiter Narrative */}
            <p className="text-xs sm:text-sm md:text-base text-[#626C78] font-sans max-w-lg leading-relaxed">
              B.E. Computer Science student at Gnanamani College of Technology (GPA: 7.2, Exp. 2027). Specializing in web application security, vulnerability assessment, and Python automation.
            </p>

            {/* Primary Action CTA: VIEW JOURNEY */}
            <div className="flex items-center justify-center pt-2 sm:pt-3 w-full max-w-xs">
              <button
                type="button"
                onClick={handleViewJourney}
                className="w-full px-8 py-3.5 bg-[#E10620] hover:bg-[#FF3548] text-white rounded-xl font-bold text-xs sm:text-sm uppercase tracking-widest shadow-[0_4px_24px_rgba(225,6,32,0.35)] hover:shadow-[0_4px_32px_rgba(255,53,72,0.5)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2.5 border border-[#FF3548]"
                title="Launch the 3D Highway Experience"
              >
                <Play className="w-4 h-4 fill-current text-white" />
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
            className="pointer-events-auto absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#DCE2E8]/95 backdrop-blur-xl p-6 text-center select-none"
          >
            {/* Warp Telemetry & Title Display */}
            <div className="relative max-w-xl w-full flex flex-col items-center space-y-6">
              {/* Status Telemetry */}
              <div className="flex items-center gap-2 text-[#E10620] text-xs font-black tracking-widest uppercase animate-pulse">
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
                <h2 className="text-3xl sm:text-5xl font-black text-[#090B0E] tracking-widest uppercase font-sans drop-shadow-[0_0_30px_rgba(225,6,32,0.35)]">
                  THE ROAD OF SANTHOSH
                </h2>
                <div className="text-xs sm:text-sm text-[#171B20] font-mono tracking-widest font-bold">
                  POWERED BY SAN AI // INITIALIZING KM 0
                </div>
              </motion.div>

              {/* Sequential Road Luminaire Activation Progress Bar */}
              <div className="w-full max-w-md bg-black/10 h-2.5 rounded-full overflow-hidden border border-[rgba(9,11,14,0.12)]">
                <div
                  className="h-full bg-gradient-to-r from-[#A9081A] via-[#E10620] to-[#FF3548] transition-all duration-75 shadow-[0_0_12px_#E10620]"
                  style={{ width: `${warpProgress}%` }}
                />
              </div>

              <div className="text-[10px] text-[#626C78] tracking-wider font-mono">
                SEQUENTIAL LUMINAIRE IGNITION: {warpProgress}%
              </div>

              {/* Skip Transition Button */}
              <button
                type="button"
                onClick={handleSkipTransition}
                className="mt-4 px-4 py-1.5 bg-[#F2F4F7] hover:bg-[#C9D0D8] text-[#090B0E] rounded-lg text-xs font-bold uppercase tracking-wider border border-[rgba(9,11,14,0.12)] transition-all flex items-center gap-1.5 shadow-sm"
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
