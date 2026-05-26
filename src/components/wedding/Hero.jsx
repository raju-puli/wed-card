import React from 'react';
import NextSectionButton from './NextSectionButton';
import { motion } from 'framer-motion';

const stagger = (i) => ({ duration: 0.9, delay: 0.3 + i * 0.18, ease: [0.22, 1, 0.36, 1] });

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Deep layered background */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 40%, #1a1500 0%, #0a0a0a 70%)' }} />

      {/* Ambient gold orb */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.12, 0.22, 0.12] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(212,175,55,1) 0%, transparent 70%)' }}
      />

      {/* Top ornament */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.1 }}
        className="absolute top-8 md:top-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
      >
        <div className="w-32 md:w-48 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
        <div className="w-16 md:w-24 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center w-full max-w-xl">
        {/* Cross */}
        <motion.div
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.span
            animate={{ textShadow: ['0 0 8px rgba(212,175,55,0.3)', '0 0 35px rgba(212,175,55,0.7)', '0 0 8px rgba(212,175,55,0.3)'] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            className="text-gold text-5xl md:text-6xl leading-none block"
          >✞</motion.span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="text-gold/45 uppercase text-[9px] md:text-[11px] font-sans font-light mt-5 mb-8 tracking-[0.45em]"
        >
          You are cordially invited
        </motion.p>

        {/* Framed name block */}
        <div className="relative w-full px-4">
          {/* Animated border frame */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="absolute inset-0 pointer-events-none"
          >
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 1, ease: 'easeOut' }}
              className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent origin-left"
            />
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 1, ease: 'easeOut' }}
              className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent origin-right"
            />
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.8, delay: 1.2, ease: 'easeOut' }}
              className="absolute left-0 top-4 bottom-4 w-px bg-gradient-to-b from-transparent via-gold/40 to-transparent origin-top"
            />
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.8, delay: 1.2, ease: 'easeOut' }}
              className="absolute right-0 top-4 bottom-4 w-px bg-gradient-to-b from-transparent via-gold/40 to-transparent origin-bottom"
            />
            {/* Corner dots */}
            {[['top-0 left-0', 'rounded-br'], ['top-0 right-0', 'rounded-bl'], ['bottom-0 left-0', 'rounded-tr'], ['bottom-0 right-0', 'rounded-tl']].map(([pos, r], i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5 + i * 0.05 }}
                className={`absolute ${pos} w-1.5 h-1.5 bg-gold/60 ${r}`}
              />
            ))}
          </motion.div>

          <div className="py-10 md:py-12 px-6">
            {/* Daniel */}
            <motion.h1
              initial={{ opacity: 0, y: 35, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={stagger(5)}
              className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-silk leading-none"
              style={{ textShadow: '0 0 60px rgba(212,175,55,0.2)' }}
            >
              Daniel Raju Puli
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.3 }}
              className="text-gold/40 font-sans text-[9px] md:text-[10px] tracking-[0.3em] uppercase mt-2"
            >
              M.Sc Computer Science
            </motion.p>

            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.9, delay: 1.4 }}
              className="flex items-center gap-3 my-5 md:my-6 justify-center"
            >
              <div className="flex-1 h-px bg-gradient-to-l from-gold/60 to-transparent max-w-[80px]" />
              <motion.span
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="font-serif italic text-gold text-3xl md:text-4xl leading-none"
                style={{ textShadow: '0 0 20px rgba(212,175,55,0.5)' }}
              >{'&'}</motion.span>
              <div className="flex-1 h-px bg-gradient-to-r from-gold/60 to-transparent max-w-[80px]" />
            </motion.div>

            {/* Jyothi */}
            <motion.h1
              initial={{ opacity: 0, y: 35, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={stagger(8)}
              className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-silk leading-none"
              style={{ textShadow: '0 0 60px rgba(212,175,55,0.2)' }}
            >
              Jyothi Sampangi
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 2.0 }}
              className="text-gold/40 font-sans text-[9px] md:text-[10px] tracking-[0.3em] uppercase mt-2"
            >
              M.Sc Physical Chemistry <br /> Ph.D Scholar
            </motion.p>
          </div>
        </div>

        {/* Blessed tagline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.1 }}
          className="font-serif italic text-silk/35 text-sm md:text-base mt-6 mb-10"
        >
          "Two souls, one divine promise"
        </motion.p>

      </div>

      <NextSectionButton nextId="scratch-date" label="Explore" />
    </section>
  );
}