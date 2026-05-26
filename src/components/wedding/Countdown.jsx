import React, { useState, useEffect } from 'react';
import NextSectionButton from './NextSectionButton';
import { motion } from 'framer-motion';

const WEDDING_DATE = new Date('2026-06-05T10:00:00').getTime();

function TimeCard({ value, label, index }) {
  const [prev, setPrev] = useState(value);
  const [flipping, setFlipping] = useState(false);

  useEffect(() => {
    if (value !== prev) {
      setFlipping(true);
      const t = setTimeout(() => { setPrev(value); setFlipping(false); }, 300);
      return () => clearTimeout(t);
    }
  }, [value, prev]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center gap-2.5"
    >
      <div className="relative w-[60px] h-[72px] sm:w-[72px] sm:h-[86px] md:w-20 md:h-24">
        {/* Card */}
        <div className="w-full h-full rounded-xl border border-gold/20 flex items-center justify-center relative overflow-hidden"
          style={{ background: 'linear-gradient(160deg, #1a1800 0%, #0d0d0d 100%)', boxShadow: '0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(212,175,55,0.08)' }}
        >
          {/* Top shine */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
          {/* Number */}
          <motion.span
            key={value}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="font-serif text-gold gold-glow text-2xl sm:text-3xl md:text-4xl tabular-nums"
            style={{ textShadow: '0 0 20px rgba(212,175,55,0.4)' }}
          >
            {String(value).padStart(2, '0')}
          </motion.span>
          {/* Fold line */}
          <div className="absolute top-1/2 left-0 right-0 h-px bg-black/40" />
          {/* Reflection */}
          <div className="absolute inset-0 rounded-xl pointer-events-none"
            style={{ background: 'linear-gradient(180deg, rgba(212,175,55,0.05) 0%, transparent 50%)' }}
          />
        </div>
        {/* Shadow */}
        <div className="absolute -bottom-2 left-2 right-2 h-3 rounded-full blur-md bg-black/40" />
        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-gold/40 rounded-tl-xl" />
        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-gold/40 rounded-tr-xl" />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-gold/40 rounded-bl-xl" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-gold/40 rounded-br-xl" />
      </div>
      <span className="text-[8px] md:text-[10px] uppercase tracking-[0.4em] text-silk/30 font-sans font-light">
        {label}
      </span>
    </motion.div>
  );
}

export default function Countdown() {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, WEDDING_DATE - Date.now());
      setTime({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff / 3600000) % 24),
        minutes: Math.floor((diff / 60000) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="countdown" className="py-16 flex flex-col items-center bg-obsidian relative overflow-hidden px-6">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 50% 60% at 50% 50%, rgba(212,175,55,0.05) 0%, transparent 100%)' }}
      />

      <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        className="text-gold/40 uppercase tracking-[0.5em] text-[9px] md:text-[10px] font-sans font-light mb-3">
        Counting Down To
      </motion.p>
      <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="text-gold font-serif text-2xl md:text-4xl mb-2 gold-glow text-center">
        Our Forever Begins
      </motion.h2>
      <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
        className="text-silk/30 font-serif italic text-sm mb-12">
        5th June, 2026
      </motion.p>

      {/* Tiles */}
      <div className="flex items-center gap-1.5 md:gap-3">
        <TimeCard value={time.days} label="Days" index={0} />
        <motion.span
          animate={{ opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="text-gold/40 font-serif text-3xl md:text-4xl mb-6 leading-none"
        >:</motion.span>
        <TimeCard value={time.hours} label="Hours" index={1} />
        <motion.span
          animate={{ opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
          className="text-gold/40 font-serif text-3xl md:text-4xl mb-6 leading-none"
        >:</motion.span>
        <TimeCard value={time.minutes} label="Mins" index={2} />
        <motion.span
          animate={{ opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="text-gold/40 font-serif text-3xl md:text-4xl mb-6 leading-none"
        >:</motion.span>
        <TimeCard value={time.seconds} label="Secs" index={3} />
      </div>

      {/* Bible verse */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.9 }}
        className="mt-16 max-w-lg text-center relative px-4"
      >
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-gold/20 text-4xl font-serif leading-none select-none">"</div>
        <p className="font-serif italic text-silk/55 text-base md:text-lg leading-loose">
          Therefore what God has joined together, let no one separate. The two will become one flesh. So they are no longer two, but one.
        </p>
        <p className="mt-5 text-gold/55 font-sans text-[10px] uppercase tracking-[0.35em]">Mark 10:8-9</p>
        <div className="mt-5 flex items-center justify-center gap-3">
          <div className="w-10 h-px bg-gradient-to-r from-transparent to-gold/30" />
          <span className="text-gold/40 text-base">✞</span>
          <div className="w-10 h-px bg-gradient-to-l from-transparent to-gold/30" />
        </div>
      </motion.div>

      <NextSectionButton nextId="invitation" label="View Invitation" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />
    </section>
  );
}