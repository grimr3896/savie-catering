'use client';
import React from 'react';

const SimpleCateringBackground = () => {
  const particles = Array.from({ length: 15 });

  return (
    <div className="fixed inset-0 -z-10 h-full w-full overflow-hidden bg-background">
      {/* Grid Overlay */}
      <div
        className="absolute inset-0 h-full w-full"
        style={{
          backgroundImage:
            'linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)',
          backgroundSize: '4rem 4rem',
          opacity: 0.05,
        }}
      />

      {/* Floating Orbs */}
      <div className="absolute top-[-10rem] left-[-10rem] h-96 w-96 rounded-full bg-primary/10 blur-3xl animate-float" style={{ animationDelay: '0s' }} />
      <div className="absolute bottom-[-5rem] right-[-5rem] h-80 w-80 rounded-full bg-primary/10 blur-3xl animate-float-slow" style={{ animationDelay: '-5s' }} />
      <div className="absolute top-[10rem] right-[10rem] h-64 w-64 rounded-full bg-primary/10 blur-3xl animate-float-slower" style={{ animationDelay: '-10s' }} />
      <div className="absolute bottom-[5rem] left-[5rem] h-48 w-48 rounded-full bg-primary/10 blur-3xl animate-float" style={{ animationDelay: '-15s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-72 w-72 rounded-full bg-primary/10 blur-3xl animate-float-slow" style={{ animationDelay: '-20s' }} />

      {/* Particle Effects */}
      {particles.map((_, i) => (
        <div
          key={`particle-${i}`}
          className="absolute h-1 w-1 rounded-full bg-primary/50 animate-float-particle"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * -20}s`,
            animationDuration: `${10 + Math.random() * 20}s`,
          }}
        />
      ))}
    </div>
  );
};

export default SimpleCateringBackground;
