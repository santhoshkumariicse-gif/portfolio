import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Layers, Volume2, VolumeX, FastForward, Compass, Sparkles } from 'lucide-react';
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
      {/* 1. Deep Space Starfield */}
      <Stars
        radius={220}
        depth={60}
        count={3200}
        factor={6}
        saturation={0.6}
        fade
        speed={isWarping ? 8 : 1.2}
      />

      {/* 2. Central Cinematic Planet */}
      <group ref={planetGroupRef}>
        {/* Planet Core Sphere */}
        <mesh>
          <sphereGeometry args={[14, 32, 32]} />
          <meshStandardMaterial
            color="#070908"
            roughness={0.5}
            metalness={0.8}
          />
        </mesh>

        {/* Digital Continental Wireframe with Crimson Glow */}
        <mesh>
          <sphereGeometry args={[14.25, 24, 24]} />
          <meshStandardMaterial
            color="#FF1E40"
            emissive="#FF1E40"
            emissiveIntensity={0.85}
            wireframe
            transparent
            opacity={0.4}
          />
        </mesh>

        {/* Deep Crimson Atmospheric Glow */}
        <mesh ref={atmosphereRef}>
          <sphereGeometry args={[15.2, 32, 32]} />
          <meshStandardMaterial
            color="#FF1E40"
            emissive="#FF1E40"
            emissiveIntensity={1.4}
            transparent
            opacity={0.15}
            side={THREE.BackSide}
          />
        </mesh>

        {/* Holographic Concentric Orbital Ring */}
        <mesh ref={ringRef} rotation={[Math.PI / 3.2, 0, 0]}>
          <ringGeometry args={[18, 22, 64]} />
          <meshStandardMaterial
            color="#00E5FF"
            emissive="#00E5FF"
            emissiveIntensity={0.9}
            side={THREE.DoubleSide}
            transparent
            opacity={0.35}
            wireframe
          />
        </mesh>
      </group>

      {/* Red and Cyan Cinematic Lighting */}
      <pointLight position={[35, 25, 45]} color="#FF1E40" intensity={3.5} distance={120} />
      <pointLight position={[-35, -20, -45]} color="#00E5FF" intensity={2.2} distance={120} />
      <ambientLight intensity={0.35} color="#0E1210" />
    </group>
  );
};

export interface UniverseHomepageProps {
  onViewJourney: () => void;
  onExplorePortfolio2D: () => void;
}

export const UniverseHomepage: React.FC<UniverseHomepageProps> = ({
  onViewJourney,
  onExplorePortfolio2D
}) => {
  const [isWarping, setIsWarping] = useState(false);
  const [warpProgress, setWarpProgress] = useState(0);
  const { announce, isMuted, toggleMute } = useSanAI();

  // Handle the VIEW JOURNEY click: starts warp transition, then hands over to Highway
  const handleViewJourney = () => {
    if (isWarping) return;
    setIsWarping(true);
    SoundFX.playWarp();
    announce("SAN AI online. Calibrating speedway telemetry. Ingressing into The Road of Santhosh.");

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
    <div className="relative w-full h-screen bg-[#050706] overflow-hidden select-none font-mono">
      {/* 1. Main 3D WebGL Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 12, 48], fov: 50, near: 0.1, far: 600 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        >
          <color attach="background" args={['#050706']} />
          <fog attach="fog" args={['#050706', 40, 260]} />
          <CinematicPlanet isWarping={isWarping} />
        </Canvas>
      </div>

      {/* 2. Vignette and Ambient Radial Overlay */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(5,7,6,0.85)_100%)]" />

      {/* 3. Top Cinematic Header Bar */}
      <header className="pointer-events-auto absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 sm:px-8 py-3.5 sm:py-5 border-b border-white/10 bg-[#050706]/70 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF1E40] animate-ping" />
          <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-[#FF1E40]">
            SAN AI // DEEP SPACE ORBITAL INGRESS
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Audio Mute Button */}
          <button
            type="button"
            onClick={toggleMute}
            className={`p-2 rounded-lg border text-xs transition-all backdrop-blur-md ${
              !isMuted
                ? 'bg-[#FF1E40]/20 border-[#FF1E40] text-[#FF1E40]'
                : 'bg-black/40 border-white/20 text-slate-400 hover:text-white'
            }`}
            title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
            aria-label={isMuted ? 'Unmute Sound' : 'Mute Sound'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Quick Skip to 2D HTML Portfolio */}
          <button
            type="button"
            onClick={onExplorePortfolio2D}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/20 bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white text-xs font-bold uppercase transition-all"
            title="Open standard 2D HTML Portfolio"
          >
            <Layers className="w-3.5 h-3.5 text-[#00E5FF]" />
            <span className="hidden sm:inline">2D Classic</span>
          </button>
        </div>
      </header>

      {/* 4. Center Cinematic Presentation Card */}
      {!isWarping && (
        <main className="pointer-events-auto absolute inset-0 z-20 flex flex-col items-center justify-center p-4 sm:p-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl w-full flex flex-col items-center space-y-4 sm:space-y-6"
          >
            {/* System Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF1E40]/10 border border-[#FF1E40]/40 text-[#FF1E40] text-[10px] sm:text-xs font-black uppercase tracking-widest">
              <Sparkles className="w-3 h-3 text-[#FF1E40]" />
              <span>ACT 00 // THE DEVELOPER UNIVERSE</span>
            </div>

            {/* Developer Identity Heading */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white uppercase font-sans leading-none drop-shadow-2xl">
              SANTHOSH KUMAR M
            </h1>

            {/* Subheading / Profession */}
            <div className="text-xs sm:text-sm md:text-base font-mono text-[#00E5FF] font-bold tracking-widest uppercase">
              FULL-STACK DEVELOPER & AI SYSTEMS ENGINEER
            </div>

            {/* Tagline */}
            <p className="text-sm sm:text-lg text-slate-300 font-sans italic max-w-xl leading-relaxed">
              "Building Ideas Into Practical Digital Solutions · Exploring the Developer Universe."
            </p>

            {/* Short Bio */}
            <p className="text-xs sm:text-sm text-slate-400 font-sans max-w-lg leading-relaxed hidden sm:block">
              Welcome to my interactive universe. Embark on a cinematic 3D journey through real software architectures, verified engineering credentials, and production milestones.
            </p>

            {/* Primary & Secondary Action CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-3 sm:pt-4 w-full max-w-md">
              {/* PRIMARY PROMINENT CTA: VIEW JOURNEY */}
              <button
                type="button"
                onClick={handleViewJourney}
                className="w-full sm:w-auto px-7 py-3.5 bg-[#FF1E40] hover:bg-[#FF3366] text-white rounded-xl font-black text-xs sm:text-sm uppercase tracking-widest shadow-[0_0_35px_rgba(255,30,64,0.6)] hover:shadow-[0_0_50px_rgba(255,30,64,0.8)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2.5 border border-[#FF1E40]"
                title="Launch the 3D Highway Experience"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>VIEW JOURNEY</span>
              </button>

              {/* SECONDARY CTA: EXPLORE PORTFOLIO */}
              <button
                type="button"
                onClick={onExplorePortfolio2D}
                className="w-full sm:w-auto px-5 py-3.5 bg-white/5 hover:bg-white/15 text-slate-200 hover:text-white rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider border border-white/20 transition-all flex items-center justify-center gap-2"
                title="Browse full 2D resume & portfolio"
              >
                <Compass className="w-4 h-4 text-[#00E5FF]" />
                <span>Explore Portfolio (2D)</span>
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
              <div className="flex items-center gap-2 text-[#00E5FF] text-xs font-black tracking-widest uppercase animate-pulse">
                <span className="w-2 h-2 rounded-full bg-[#00E5FF]" />
                <span>SAN AI // ENGAGING HIGHWAY SPEEDWAY BUS</span>
              </div>

              {/* Grand Cinematic Reveal Title */}
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="space-y-2"
              >
                <h2 className="text-3xl sm:text-5xl font-black text-white tracking-widest uppercase font-sans drop-shadow-[0_0_30px_rgba(255,30,64,0.8)]">
                  THE ROAD OF SANTHOSH
                </h2>
                <div className="text-xs sm:text-sm text-[#FFB347] font-mono tracking-widest font-bold">
                  POWERED BY SAN AI // INITIALIZING KM 0
                </div>
              </motion.div>

              {/* Sequential Road Luminaire Activation Progress Bar */}
              <div className="w-full max-w-md bg-white/10 h-2 rounded-full overflow-hidden border border-white/20">
                <div
                  className="h-full bg-gradient-to-r from-[#FF1E40] via-[#FFB347] to-[#00E5FF] transition-all duration-75"
                  style={{ width: `${warpProgress}%` }}
                />
              </div>

              <div className="text-[10px] text-slate-400 tracking-wider">
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
