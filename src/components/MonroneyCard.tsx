'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface MonroneyCardProps {
  title: string;
  subtitle?: string;
  badge?: string;
  badgeColor?: 'emerald' | 'amber';
  children: React.ReactNode;
  className?: string;
}

export function MonroneyCard({
  title,
  subtitle,
  badge,
  badgeColor = 'amber',
  children,
  className = ''
}: MonroneyCardProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={`bg-white text-black border border-gray-300 p-6 shadow-xl relative overflow-hidden ${className}`}
      whileHover={shouldReduceMotion ? {} : { scale: 1.01, rotateY: 1, rotateX: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{ perspective: 1000 }}
    >
      {/* Technical Grid Background */}
      <div className="absolute inset-0 pointer-events-none opacity-5"
           style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
      </div>

      {/* Header */}
      <div className="border-b-2 border-black pb-4 mb-4 flex justify-between items-start relative z-10">
        <div>
          <h2 className="font-sans font-bold text-2xl uppercase tracking-tighter">{title}</h2>
          {subtitle && <p className="font-mono text-sm text-gray-600 mt-1">{subtitle}</p>}
        </div>

        {badge && (
          <div className={`px-3 py-1 font-mono text-xs font-bold uppercase ${badgeColor === 'amber' ? 'bg-modfem-signalAmber text-black' : 'bg-modfem-racingEmerald text-black'}`}>
            {badge}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 font-mono text-sm">
        {children}
      </div>

      {/* Corner crosshairs */}
      <div className="absolute top-2 left-2 text-black/30 font-mono text-xs">+</div>
      <div className="absolute top-2 right-2 text-black/30 font-mono text-xs">+</div>
      <div className="absolute bottom-2 left-2 text-black/30 font-mono text-xs">+</div>
      <div className="absolute bottom-2 right-2 text-black/30 font-mono text-xs">+</div>
    </motion.div>
  );
}
