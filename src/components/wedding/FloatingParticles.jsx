import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

export default function FloatingParticles() {
  const particles = useMemo(() => Array.from({ length: 25 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2.5 + 0.5,
    dur: Math.random() * 10 + 8,
    delay: Math.random() * 5,
    ox: Math.random() * 40 - 20,
    opacity: Math.random() * 0.25 + 0.05,
  })), []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[5] overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size,
            background: `radial-gradient(circle, rgba(212,175,55,${p.opacity * 2}) 0%, transparent 70%)` }}
          animate={{ y: [0, -90, 0], x: [0, p.ox, 0], opacity: [p.opacity, p.opacity * 3, p.opacity] }}
          transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}