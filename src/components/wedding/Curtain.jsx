import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import icon from "@/logo.png";

export default function Curtain({ isOpen, onOpen }) {
  const [clicked, setClicked] = useState(false);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        dur: Math.random() * 6 + 5,
        delay: Math.random() * 4,
      }))
    );
  }, []);

  const handleClick = () => {
    if (clicked) return;
    setClicked(true);
    setTimeout(onOpen, 1800);
  };

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] overflow-hidden cursor-pointer select-none"
          onClick={handleClick}
        >
          {/* ── LEFT PANEL ── */}
          <motion.div
            initial={{ x: 0 }}
            animate={clicked ? { x: '-100%' } : {}}
            transition={{ duration: 1.6, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-y-0 left-0 w-1/2 overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #0d0d0d 0%, #111107 100%)' }}
          >
            {/* Pinstripe fabric */}
            <div className="absolute inset-0 opacity-[0.06]"
              style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent 0px, transparent 16px, rgba(212,175,55,1) 16px, rgba(212,175,55,1) 17px)' }}
            />
            {/* Diagonal sheen */}
            <motion.div
              animate={clicked ? {} : { x: ['-100%', '200%'] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'linear', delay: 1 }}
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(105deg, transparent 40%, rgba(212,175,55,0.04) 50%, transparent 60%)' }}
            />
            {/* Right-edge gold seam */}
            <div className="absolute right-0 top-0 bottom-0 w-px"
              style={{ background: 'linear-gradient(180deg, transparent, #D4AF37 20%, #D4AF37 80%, transparent)' }}
            />
            {/* Vertical label */}
            <div className="absolute right-6 top-1/2 -translate-y-1/2 -rotate-90 origin-center
                            text-gold/30 uppercase tracking-[0.6em] text-[8px] whitespace-nowrap font-sans font-light">
              Unveil the Union
            </div>
          </motion.div>

          {/* ── RIGHT PANEL ── */}
          <motion.div
            initial={{ x: 0 }}
            animate={clicked ? { x: '100%' } : {}}
            transition={{ duration: 1.6, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-y-0 right-0 w-1/2 overflow-hidden"
            style={{ background: 'linear-gradient(225deg, #0d0d0d 0%, #111107 100%)' }}
          >
            <div className="absolute inset-0 opacity-[0.06]"
              style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent 0px, transparent 16px, rgba(212,175,55,1) 16px, rgba(212,175,55,1) 17px)' }}
            />
            <motion.div
              animate={clicked ? {} : { x: ['-100%', '200%'] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'linear', delay: 1.5 }}
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(105deg, transparent 40%, rgba(212,175,55,0.04) 50%, transparent 60%)' }}
            />
            {/* Left-edge gold seam */}
            <div className="absolute left-0 top-0 bottom-0 w-px"
              style={{ background: 'linear-gradient(180deg, transparent, #D4AF37 20%, #D4AF37 80%, transparent)' }}
            />
            <div className="absolute left-6 top-1/2 -translate-y-1/2 rotate-90 origin-center
                            text-gold/30 uppercase tracking-[0.6em] text-[8px] whitespace-nowrap font-sans font-light">
              Unveil the Union
            </div>
          </motion.div>

          {/* ── FLOATING PARTICLES ── */}
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full bg-gold pointer-events-none"
              style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
              animate={{ y: [0, -60, 0], opacity: [0.1, 0.35, 0.1] }}
              transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
            />
          ))}

          {/* ── CENTER SEAL ── */}
          <AnimatePresence>
            {!clicked && (
              <motion.div
                initial={{ opacity: 0, scale: 0.7, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.5, y: -20 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className="absolute inset-0 flex flex-col items-center justify-center gap-7 pointer-events-none z-10"
              >
                {/* Outer pulsing rings */}
                <div className="relative flex items-center justify-center">
                  <motion.div
                    animate={{ scale: [1, 1.12, 1], opacity: [0.15, 0.35, 0.15] }}
                    transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute w-52 h-52 md:w-64 md:h-64 rounded-full border border-gold/20"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.08, 1], opacity: [0.2, 0.45, 0.2] }}
                    transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                    className="absolute w-40 h-40 md:w-52 md:h-52 rounded-full border border-gold/30"
                  />

                  {/* Main seal disc */}
                  <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border border-gold/60 flex items-center justify-center"
                    style={{ background: 'radial-gradient(circle, #1a1a0a 0%, #0d0d0d 100%)', boxShadow: '0 0 40px rgba(212,175,55,0.2), inset 0 0 30px rgba(212,175,55,0.05)' }}
                  >
                    {/* Rotating conic halo */}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                      className="absolute inset-0 rounded-full"
                      style={{ background: 'conic-gradient(from 0deg, transparent 0%, rgba(212,175,55,0.18) 25%, transparent 50%, rgba(212,175,55,0.18) 75%, transparent 100%)' }}
                    />
                    {/* Inner circle */}
                    <div className="relative z-10 flex flex-col items-center gap-1">
                      {/* <motion.span
                        animate={{ opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-gold text-4xl md:text-5xl leading-none"
                        style={{ textShadow: '0 0 20px rgba(212,175,55,0.6)' }}
                      >✞</motion.span> */}
                      {/* <span className="text-gold font-serif italic text-lg md:text-2xl tracking-widest"
                        style={{ textShadow: '0 0 10px rgba(212,175,55,0.4)' }}>
                        R {'&'} J
                      </span> */}
                      <span className="text-gold font-serif italic text-lg md:text-2xl tracking-widest"
                        style={{ textShadow: '0 0 10px rgba(212,175,55,0.4)' }}>
                        <img src={icon} alt="icon" width={100} loading='lazy' />
                      </span>
                    </div>
                  </div>
                </div>

                {/* Label + CTA */}
                <div className="flex flex-col items-center gap-3">
                  <div className="flex items-center gap-4">
                    <motion.div
                      animate={{ scaleX: [0.3, 1, 0.3] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                      className="w-10 h-px bg-gradient-to-r from-transparent to-gold/50"
                    />
                    <p className="text-gold/50 text-[9px] md:text-[10px] uppercase tracking-[0.5em] font-sans font-light">
                      Wedding Invitation
                    </p>
                    <motion.div
                      animate={{ scaleX: [0.3, 1, 0.3] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
                      className="w-10 h-px bg-gradient-to-l from-transparent to-gold/50"
                    />
                  </div>
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                    className="flex items-center gap-2 text-gold text-[10px] md:text-xs uppercase tracking-[0.4em] font-sans"
                  >
                    <span>✦</span>
                    <span>Tap to Open</span>
                    <span>✦</span>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── GOLD CENTER SEAM — fades before panels finish sliding ── */}
          <motion.div
            className="absolute top-1/2 left-0 right-0 h-px -translate-y-1/2 pointer-events-none"
            style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.5) 20%, rgba(212,175,55,1) 50%, rgba(212,175,55,0.5) 80%, transparent 100%)' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}