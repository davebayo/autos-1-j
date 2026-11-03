'use client';

import React, { useEffect, useRef } from 'react';
import { useAtmosphere } from '@/lib/use-atmosphere';

interface WeatherCanvasProps {
  location?: 'Lagos' | 'Vaughan';
  className?: string;
}

export function WeatherCanvas({ location = 'Lagos', className = '' }: WeatherCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { weather } = useAtmosphere(location);
  const isVisible = useRef(true);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      isVisible.current = entry.isIntersecting;
    });

    if (canvasRef.current) {
      observer.observe(canvasRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Responsive canvas
    const resize = () => {
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
      }
    };
    window.addEventListener('resize', resize);
    resize();

    // Particle system
    interface Particle {
      x: number;
      y: number;
      vy: number;
      vx: number;
      size: number;
      opacity: number;
    }

    let particles: Particle[] = [];
    const MAX_PARTICLES = 100;

    const createParticles = () => {
      particles = [];
      if (weather.condition === 'clear') return;

      for (let i = 0; i < MAX_PARTICLES; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vy: weather.condition === 'rain' ? Math.random() * 5 + 5 : Math.random() * 2 + 1,
          vx: Math.random() * 2 - 1,
          size: weather.condition === 'snow' ? Math.random() * 3 + 1 : Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.5 + 0.2,
        });
      }
    };

    createParticles();

    let animationFrameId: number;

    const render = () => {
      if (!isVisible.current) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (weather.condition === 'clear') {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.fillStyle = weather.condition === 'snow' ? 'white' : 'rgba(255, 255, 255, 0.6)';

      particles.forEach((p) => {
        ctx.beginPath();
        if (weather.condition === 'rain') {
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x + p.vx, p.y + p.size * 5);
          ctx.strokeStyle = `rgba(255, 255, 255, ${p.opacity})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        } else {
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.globalAlpha = p.opacity;
          ctx.fill();
        }

        p.y += p.vy;
        p.x += p.vx;

        if (p.y > canvas.height) {
          p.y = 0;
          p.x = Math.random() * canvas.width;
        }
      });
      ctx.globalAlpha = 1.0;

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [weather.condition]);

  // Get color grading class based on time of day
  const getColorGradingClass = () => {
    switch (weather.timeOfDay) {
      case 'DUSK':
        return 'mix-blend-overlay opacity-30 bg-[#FFB085]';
      case 'NIGHT':
        return 'mix-blend-multiply opacity-50 bg-[#0A1A3A]';
      default: // day
        return 'mix-blend-overlay opacity-10 bg-[#E0F7FA]';
    }
  };

  return (
    <div className={`relative w-full h-full ${className}`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 block w-full h-full pointer-events-none"
      />

      {/* Color Grading Overlay */}
      <div className={`absolute inset-0 pointer-events-none transition-colors duration-1000 ${getColorGradingClass()}`} />

      {/* Headlight Beams (only visible at dusk/night) */}
      {(weather.timeOfDay === 'DUSK' || weather.timeOfDay === 'NIGHT') && (
        <div className="absolute inset-0 pointer-events-none z-10 opacity-70">
          <svg viewBox="0 0 1000 1000" preserveAspectRatio="none" className="w-full h-full">
            <defs>
              <linearGradient id="beamGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(255, 255, 255, 0.4)" />
                <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
              </linearGradient>
            </defs>
            <polygon points="400,600 0,1000 200,1000 500,600" fill="url(#beamGrad)" />
            <polygon points="600,600 500,1000 1000,1000 800,600" fill="url(#beamGrad)" />
          </svg>
        </div>
      )}
    </div>
  );
}
