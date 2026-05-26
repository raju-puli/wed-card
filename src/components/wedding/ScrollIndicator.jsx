import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function ScrollIndicator() {
  const [pct, setPct] = useState(0);
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      const top = window.scrollY;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const p = h > 0 ? (top / h) * 100 : 0;
      setPct(p);
      if (top > 80) setShowHint(false);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const r = 16;
  const circ = 2 * Math.PI * r;

  return (
    <>
      {/* Circular progress — right side */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-3">
        <div className="relative w-10 h-10">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 40 40">
            <circle cx="20" cy="20" r={r} fill="none" stroke="rgba(212,175,55,0.1)" strokeWidth="1.5" />
            <motion.circle
              cx="20" cy="20" r={r}
              fill="none"
              stroke="url(#goldGrad)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray={circ}
              strokeDashoffset={circ - (pct / 100) * circ}
              style={{ transition: 'stroke-dashoffset 0.2s ease' }}
            />
            <defs>
              <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#D4AF37" />
                <stop offset="100%" stopColor="#F0D060" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-gold/50 text-[10px] leading-none">✞</span>
          </div>
        </div>

        {/* Section dots */}
        <div className="flex flex-col gap-1.5">
          {Array.from({ length: 7 }, (_, i) => {
            const threshold = (i / 6) * 100;
            const active = pct >= threshold - 5;
            return (
              <motion.div
                key={i}
                animate={{ scale: active ? 1.4 : 1 }}
                transition={{ duration: 0.2 }}
                className="rounded-full"
                style={{
                  width: active ? 5 : 3,
                  height: active ? 5 : 3,
                  background: active ? '#D4AF37' : 'rgba(212,175,55,0.2)',
                  transition: 'width 0.2s, height 0.2s, background 0.2s',
                }}
              />
            );
          })}
        </div>
      </div>

      {/* No duplicate scroll hint here — Hero section has its own */}
    </>
  );
}