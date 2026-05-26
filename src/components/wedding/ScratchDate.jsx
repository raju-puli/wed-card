import React, { useRef, useEffect, useState, useCallback } from 'react';
import NextSectionButton from './NextSectionButton';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

function ScratchCircle({ value, label, onComplete, delay = 0 }) {
  const canvasRef = useRef(null);
  const [isDone, setIsDone] = useState(false);
  const [progress, setProgress] = useState(0);
  const isDrawing = useRef(false);
  const clearedPixels = useRef(0);
  const SIZE = 96;
  const totalArea = Math.PI * (SIZE / 2) * (SIZE / 2);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.save();
    ctx.beginPath();
    ctx.arc(SIZE / 2, SIZE / 2, SIZE / 2, 0, Math.PI * 2);
    ctx.clip();
    // Rich gold gradient
    const g = ctx.createRadialGradient(SIZE * 0.35, SIZE * 0.3, 2, SIZE / 2, SIZE / 2, SIZE / 2);
    g.addColorStop(0, '#F0D060');
    g.addColorStop(0.4, '#D4AF37');
    g.addColorStop(0.8, '#B8960F');
    g.addColorStop(1, '#8B6F00');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, SIZE, SIZE);
    // Fine crosshatch
    ctx.strokeStyle = 'rgba(0,0,0,0.07)';
    ctx.lineWidth = 0.5;
    for (let i = 0; i < SIZE; i += 6) {
      ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, SIZE); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(SIZE, i); ctx.stroke();
    }
    // Hint
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.font = 'bold 8px Montserrat, sans-serif';
    ctx.textAlign = 'center';
    ctx.letterSpacing = '2px';
    ctx.fillText('✦ SCRATCH ✦', SIZE / 2, SIZE / 2 + 3);
    ctx.restore();
  }, []);

  const getPos = (e) => {
    const r = canvasRef.current.getBoundingClientRect();
    const sx = canvasRef.current.width / r.width;
    const sy = canvasRef.current.height / r.height;
    const cx = e.touches ? e.touches[0].clientX : e.clientX;
    const cy = e.touches ? e.touches[0].clientY : e.clientY;
    return { x: (cx - r.left) * sx, y: (cy - r.top) * sy };
  };

  const scratch = useCallback((e) => {
    if (isDone || !isDrawing.current) return;
    e.preventDefault();
    const ctx = canvasRef.current.getContext('2d');
    const { x, y } = getPos(e);
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 18, 0, Math.PI * 2);
    ctx.fill();
    clearedPixels.current += Math.PI * 22 * 22;
    const p = Math.min(100, (clearedPixels.current / totalArea) * 100);
    setProgress(p);
    if (p >= 50) {
      setIsDone(true);
      ctx.clearRect(0, 0, SIZE, SIZE);
      onComplete();
    }
  }, [isDone, onComplete, totalArea]);

  const start = (e) => { isDrawing.current = true; scratch(e); };
  const end = () => { isDrawing.current = false; };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center gap-4"
    >
      <div className="relative select-none" style={{ width: SIZE, height: SIZE }}>
        {/* Glow ring beneath */}
        <motion.div
          animate={isDone ? { scale: 1.2, opacity: 0 } : { scale: [1, 1.06, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={isDone ? { duration: 0.6 } : { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -inset-2 rounded-full border border-gold/40 pointer-events-none"
        />

        {/* Revealed content */}
        <div
          className="absolute inset-0 rounded-full flex flex-col items-center justify-center"
          style={{ background: 'radial-gradient(circle, #1e1800 0%, #0d0d0d 100%)', border: '1px solid rgba(212,175,55,0.3)' }}
        >
          <AnimatePresence>
            {isDone && (
              <motion.div
                initial={{ scale: 0, opacity: 0, rotate: -20 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="flex flex-col items-center"
              >
                <span className="font-serif text-gold gold-glow text-4xl md:text-5xl leading-none"
                  style={{ textShadow: '0 0 30px rgba(212,175,55,0.8)' }}>
                  {value}
                </span>
              </motion.div>
            )}
            {!isDone && (
              <span className="font-serif text-gold/10 text-4xl md:text-5xl leading-none">{value}</span>
            )}
          </AnimatePresence>
        </div>

        {/* Canvas */}
        <canvas
          ref={canvasRef}
          width={SIZE} height={SIZE}
          onMouseDown={start} onMouseUp={end} onMouseLeave={end} onMouseMove={scratch}
          onTouchStart={start} onTouchEnd={end} onTouchMove={scratch}
          className={`absolute inset-0 w-full h-full rounded-full scratch-cursor transition-opacity duration-700 ${isDone ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        />

        {/* Progress arc (thin stroke below canvas) */}
        {!isDone && (
          <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox={`0 0 ${SIZE} ${SIZE}`}>
            <circle cx={SIZE/2} cy={SIZE/2} r={SIZE/2 - 1} fill="none"
              stroke="rgba(212,175,55,0.15)" strokeWidth="2" />
            <circle cx={SIZE/2} cy={SIZE/2} r={SIZE/2 - 1} fill="none"
              stroke="rgba(212,175,55,0.6)" strokeWidth="2"
              strokeDasharray={`${2 * Math.PI * (SIZE/2 - 1)}`}
              strokeDashoffset={`${2 * Math.PI * (SIZE/2 - 1) * (1 - progress/100)}`}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 0.15s ease' }}
            />
          </svg>
        )}
      </div>

      <span className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-silk/40 font-sans font-light">
        {label}
      </span>
    </motion.div>
  );
}

export default function ScratchDate() {
  const [completed, setCompleted] = useState(0);
  const [celebrated, setCelebrated] = useState(false);

  const handleComplete = () => {
    setCompleted(prev => {
      const next = prev + 1;
      if (next >= 3 && !celebrated) {
        setCelebrated(true);
        const end = Date.now() + 3500;
        const colors = ['#D4AF37', '#F5F5F5', '#B76E79', '#C5A028'];
        const frame = () => {
          confetti({ particleCount: 5, angle: 60, spread: 60, origin: { x: 0, y: 0.6 }, colors });
          confetti({ particleCount: 5, angle: 120, spread: 60, origin: { x: 1, y: 0.6 }, colors });
          if (Date.now() < end) requestAnimationFrame(frame);
        };
        frame();
      }
      return next;
    });
  };

  return (
    <section id="scratch-date" className="py-16 flex flex-col items-center bg-charcoal relative overflow-hidden px-6">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(212,175,55,0.04) 0%, transparent 100%)' }}
      />

      <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        className="text-gold/40 uppercase tracking-[0.5em] text-[9px] md:text-[10px] font-sans font-light mb-3">
        Reveal
      </motion.p>
      <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="text-gold font-serif text-2xl md:text-4xl mb-2 gold-glow text-center">
        The Day Ordained
      </motion.h2>
      <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
        className="text-silk/25 text-xs font-sans mb-14 text-center tracking-wider">
        Scratch each circle to unveil our wedding date
      </motion.p>

      <div className="flex gap-8 md:gap-16 relative z-10 flex-wrap justify-center">
        <ScratchCircle value="05" label="Day" onComplete={handleComplete} delay={0} />
        <ScratchCircle value="JUN" label="Month" onComplete={handleComplete} delay={0.15} />
        <ScratchCircle value="2026" label="Year" onComplete={handleComplete} delay={0.3} />
      </div>

      <AnimatePresence>
        {celebrated && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 18 }}
            className="mt-12 flex flex-col items-center gap-3 text-center px-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-gold/50" />
              <span className="text-gold/55 text-[9px] uppercase tracking-[0.4em] font-sans">Save the Date</span>
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-gold/50" />
            </div>
            <p className="text-gold font-serif italic text-3xl sm:text-4xl gold-glow">5th June, 2026</p>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold/35 to-transparent" />
            <div className="flex flex-col items-center gap-0.5">
              <p className="text-silk/50 font-serif text-base sm:text-lg">Shabari A/C Function Hall</p>
              <p className="text-silk/30 font-sans text-xs tracking-wide">Kothuru, Bonakal Road, Khammam</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <NextSectionButton nextId="countdown" label="Count Down" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />
    </section>
  );
}