'use client';

import React from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';
import { WeatherCanvas } from './WeatherCanvas';
import { useAtmosphere } from '@/lib/use-atmosphere';

import { AnimatePresence } from 'framer-motion';

interface DistressHeroProps {
  onOpenSpecSheet?: () => void;
  onWhatsAppClick?: () => void;
  vehicleName?: string;
  landedCost?: string;
  badge?: string;
  badgeColor?: 'emerald' | 'amber';
  activeVehicleIdx?: number;
  setActiveVehicleIdx?: (idx: number) => void;
  activeAngle?: 'front' | 'side';
  setActiveAngle?: (angle: 'front' | 'side') => void;
  totalVehicles?: number;
  imageUrl?: string;
}

export function DistressHero({
  onOpenSpecSheet,
  onWhatsAppClick,
  vehicleName = 'Canadian Vehicle Sourcing',
  landedCost,
  badge = 'DISTRESS SALE',
  badgeColor = 'amber',
  activeVehicleIdx = 0,
  setActiveVehicleIdx,
  activeAngle = 'front',
  setActiveAngle,
  totalVehicles = 1,
  imageUrl
}: DistressHeroProps) {
  const { scrollY } = useScroll();
  const { weather, cycleManualOverride } = useAtmosphere('Vaughan');

  const prefersReducedMotion = useReducedMotion();

  // Deceleration arrival on load (springs handled via motion component directly)
  // Re-acceleration on scroll (0-600px)
  const rawYOffset = useTransform(scrollY, [0, 600], [0, 32]);
  const yOffset = useSpring(rawYOffset, { stiffness: 100, damping: 20 });

  // Acceleration on scroll
  const rawScaleOffset = useTransform(scrollY, [0, 600], [1.0, 1.2]);
  const scaleOffset = useSpring(rawScaleOffset, { stiffness: 100, damping: 20 });
  const opacityOffset = useTransform(scrollY, [0, 600], [1, 0]);
  const headlightOpacity = useTransform(scrollY, [0, 300], [0, 1]);

  // Framer Motion arrival mechanics
  const heroArrivalVariants = {
    hidden: { scale: prefersReducedMotion ? 1 : 1.15, y: prefersReducedMotion ? 0 : 50, opacity: 0, rotateX: prefersReducedMotion ? 0 : 0.5 },
    visible: { scale: 1, y: 0, opacity: 1, rotateX: 0, transition: { type: 'spring' as const, stiffness: 50, damping: 20, duration: 1.5 } }
  };

  return (
    <div className="relative w-full h-screen bg-[#0A0B0D] overflow-hidden text-white font-sans border-b border-white/10 flex items-center justify-center">
      {/* Background Weather Layer */}
      <div className="absolute inset-0 z-0 opacity-50">
        <WeatherCanvas location="Vaughan" />
      </div>

      {/* Grid Overlay / Split Glass HUD */}
      <div className="absolute inset-0 z-10 pointer-events-none"
           style={{
             backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.08) 1px, transparent 1px)',
             backgroundSize: '40px 40px',
             backgroundPosition: 'center center'
           }}
      />

      {/* Split Glass Layout */}
      <div className="relative z-20 w-full max-w-7xl mx-auto h-full grid grid-cols-1 md:grid-cols-2">
        {/* Left Side: Telemetry / Context */}
        <motion.div
          className="flex flex-col justify-center px-8 md:px-12 border-r border-white/10 bg-black/40 backdrop-blur-sm"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 20, duration: 1.8 }}
          style={{ y: yOffset, opacity: opacityOffset }}
        >
          <div className="mb-4 flex items-center gap-4">
            <span className={`font-mono text-xs uppercase tracking-widest px-2 py-1 border ${badgeColor === 'amber' ? 'text-[#F59E0B] bg-[#F59E0B]/10 border-[#F59E0B]/30' : 'text-[#10B981] bg-[#10B981]/10 border-[#10B981]/30'}`}>{badge}</span>
            <span className="font-mono text-xs uppercase tracking-widest text-[#10B981]">Modfem Autos Canada</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter leading-tight mb-6" dangerouslySetInnerHTML={{ __html: vehicleName.replace(' ', '<br/>') }}>
          </h1>
          <p className="font-mono text-sm text-gray-400 mb-8 max-w-sm">
            High-trust concierge for Nigerians. Inspect, acquire, and ship from Canada with transparent landed costs.
          </p>
          {landedCost && (
            <div className="font-mono text-xl md:text-2xl text-[#10B981] bg-black/50 p-2 inline-block border border-white/10 mb-8">
              LANDED TOTAL: {landedCost}
            </div>
          )}

          <div className="flex flex-col xl:flex-row gap-4">
            {onOpenSpecSheet && (
              <button onClick={onOpenSpecSheet} className="bg-white hover:bg-gray-200 text-black font-mono font-bold text-sm px-6 py-3 transition-colors uppercase">
                View Monroney Spec Sheet
              </button>
            )}
            {onWhatsAppClick && (
              <button onClick={onWhatsAppClick} className="bg-[#10B981] hover:bg-[#10B981]/80 text-black border border-[#10B981] font-mono font-bold text-sm px-6 py-3 transition-colors uppercase">
                SECURE ON WHATSAPP
              </button>
            )}
            {!onWhatsAppClick && !onOpenSpecSheet && (
              <>
                <button className="bg-[#10B981] hover:bg-emerald-600 text-black font-mono font-bold text-sm px-6 py-3 transition-colors uppercase">
                  Start Sourcing
                </button>
                <button className="border border-white/20 hover:border-white/50 text-white font-mono font-bold text-sm px-6 py-3 transition-colors uppercase">
                  Track Order
                </button>
              </>
            )}
          </div>

          {/* Weather/Time Pill (Telemetry Dock) */}
          <div className="mt-12 inline-flex items-center gap-4 bg-black/60 border border-white/10 p-2 backdrop-blur-md cursor-pointer" onClick={cycleManualOverride} title="Click to cycle time of day">
            <div className="flex flex-col">
              <span className="font-mono text-[10px] text-gray-500 uppercase">Atmosphere</span>
              <span className="font-mono text-xs text-white uppercase">{weather.condition} / {weather.temperature}°C</span>
            </div>
            <div className="w-px h-6 bg-white/20" />
            <div className="flex flex-col">
              <span className="font-mono text-[10px] text-gray-500 uppercase">Time of Day</span>
              <span className="font-mono text-xs text-[#F59E0B] uppercase">{weather.timeOfDay}</span>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Hero Vehicle Display */}
        <motion.div
          className="flex flex-col justify-center items-center relative overflow-hidden"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 20, duration: 1.8, delay: 0.2 }}
          style={{ y: yOffset, opacity: opacityOffset }}
        >
          {/* Mockup or Vehicle image */}
          <motion.div
            className="relative w-full h-[60%] flex items-center justify-center p-8"
            variants={heroArrivalVariants}
            initial="hidden"
            animate="visible"
            style={{ perspective: 1000, scale: scaleOffset, y: yOffset }}
          >
            <AnimatePresence mode="wait">
              {imageUrl && (
                <motion.img
                  key={imageUrl}
                  src={imageUrl}
                  alt="Hero Vehicle"
                  className="object-contain w-full h-full drop-shadow-2xl z-20"
                  initial={{ opacity: 0, x: 50, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -50, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />
              )}
            </AnimatePresence>
            {/* Headlight Flares */}
            <motion.div
              className="absolute inset-0 pointer-events-none z-30"
              style={{ opacity: headlightOpacity }}
            >
              <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-white/20 blur-3xl rounded-full mix-blend-screen" />
              <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-white/20 blur-3xl rounded-full mix-blend-screen" />
            </motion.div>
            {/* Status indicators */}
            <div className="absolute top-1/4 right-8 z-30 font-mono text-xs text-white/50 flex flex-col gap-2 items-end">
               <div className="flex items-center gap-2">
                 <span>ENGINE OK</span>
                 <div className="w-2 h-2 rounded-full bg-[#10B981] shadow-[0_0_8px_#10B981]" />
               </div>
               <div className="flex items-center gap-2">
                 <span>CLEAR TITLE</span>
                 <div className="w-2 h-2 rounded-full bg-[#10B981] shadow-[0_0_8px_#10B981]" />
               </div>
            </div>
          </motion.div>

          {/* Controls for the right pane */}
          <div className="absolute bottom-12 right-12 z-30 flex items-center gap-8">
            {/* Angle Toggle */}
            {setActiveAngle && activeAngle && (
              <div className="flex bg-black/60 border border-white/10 backdrop-blur-md p-1">
                <button
                  onClick={() => setActiveAngle('front')}
                  className={`px-4 py-2 font-mono text-xs uppercase transition-colors ${activeAngle === 'front' ? 'bg-[#10B981] text-black font-bold' : 'text-white/50 hover:text-white'}`}
                >
                  Front // 01
                </button>
                <button
                  onClick={() => setActiveAngle('side')}
                  className={`px-4 py-2 font-mono text-xs uppercase transition-colors ${activeAngle === 'side' ? 'bg-[#10B981] text-black font-bold' : 'text-white/50 hover:text-white'}`}
                >
                  Side // 02
                </button>
              </div>
            )}

            {/* Vehicle Selection Indicators */}
            {setActiveVehicleIdx && totalVehicles > 1 && (
              <div className="flex gap-2">
                {Array.from({ length: totalVehicles }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveVehicleIdx(idx)}
                    className={`w-3 h-3 transition-all ${idx === activeVehicleIdx ? 'bg-[#10B981] shadow-[0_0_8px_#10B981]' : 'bg-white/20 hover:bg-white/40 border-radius-0'}`}
                    aria-label={`Select vehicle ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Corner crosshairs for the right pane */}
          <div className="absolute top-4 left-4 text-white/30 font-mono text-xs">+</div>
          <div className="absolute top-4 right-4 text-white/30 font-mono text-xs">+</div>
          <div className="absolute bottom-4 left-4 text-white/30 font-mono text-xs">+</div>
          <div className="absolute bottom-4 right-4 text-white/30 font-mono text-xs">+</div>
        </motion.div>
      </div>
    </div>
  );
}
