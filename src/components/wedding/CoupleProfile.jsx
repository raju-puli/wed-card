import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';

const profiles = [
  {
    name: 'Daniel Raju Puli',
    role: 'Groom',
    qualifications: [
      'M.Sc Computer Science',
      'Information Technology Professional',
    ],
    initial: 'P',
  },
  {
    name: 'Jyothi Sampangi',
    role: 'Bride',
    qualifications: [
      'M.Sc Physical Chemistry',
      'Ph.D Scholar (Pursuing)',
    ],
    initial: 'S',
  },
];

export default function CoupleProfile() {
  return (
    <section className="py-20 md:py-28 flex flex-col items-center bg-obsidian relative overflow-hidden px-6">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(212,175,55,0.04) 0%, transparent 100%)' }}
      />

      <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        className="text-gold/40 uppercase tracking-[0.5em] text-[9px] md:text-[10px] font-sans font-light mb-3">
        The Couple
      </motion.p>
      <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="text-gold font-serif text-2xl md:text-4xl mb-2 gold-glow text-center">
        Two Hearts, One Purpose
      </motion.h2>
      <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
        className="text-silk/30 font-serif italic text-sm mb-14 text-center">
        United in faith and purpose
      </motion.p>

      <div className="flex flex-col md:flex-row gap-8 md:gap-16 w-full max-w-2xl justify-center items-center">
        {profiles.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40, x: i === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, y: 0, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center text-center w-full max-w-xs"
          >
            {/* Avatar ring */}
            <div className="relative mb-6">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute -inset-3 rounded-full border border-dashed border-gold/20"
              />
              <div className="absolute -inset-1.5 rounded-full border border-gold/25" />
              <div className="w-20 h-20 rounded-full border border-gold/40 flex items-center justify-center"
                style={{ background: 'radial-gradient(circle, #1e1800 0%, #0d0d0d 100%)', boxShadow: '0 0 30px rgba(212,175,55,0.15)' }}>
                <span className="font-serif text-gold text-3xl">{p.initial}</span>
              </div>
            </div>

            {/* Name & role */}
            <p className="text-gold/50 text-[9px] uppercase tracking-[0.4em] font-sans mb-1">{p.role}</p>
            <h3 className="font-serif text-xl md:text-2xl text-silk mb-4"
              style={{ textShadow: '0 0 20px rgba(212,175,55,0.15)' }}>
              {p.name}
            </h3>

            {/* Qualification card — each row separate */}
            <div className="w-full rounded-xl border border-gold/20 overflow-hidden relative"
              style={{ background: 'linear-gradient(160deg, #161400 0%, #0d0d0d 100%)' }}>
              <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
              {p.qualifications.map((q, qi) => (
                <div key={qi} className={`flex items-center gap-3 px-4 py-3 ${qi < p.qualifications.length - 1 ? 'border-b border-gold/10' : ''}`}>
                  <div className="w-7 h-7 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="w-3.5 h-3.5 text-gold" />
                  </div>
                  <p className={`font-serif leading-snug ${qi === 0 ? 'text-silk text-sm' : 'text-gold/60 text-[11px]'}`}>{q}</p>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />
    </section>
  );
}