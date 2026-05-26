import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import NextSectionButton from './NextSectionButton';

const families = [
  {
    side: "Groom's Family",
    members: [
      { name: 'Mr. Satyam Puli', relation: 'Father of the Groom' },
      { name: 'Mrs. Esther Puli', relation: 'Mother of the Groom' },
      { name: 'Mr. Pal Ratnam Puli', relation: 'Brother of the Groom' },
    ],
  },
  {
    side: "Bride's Family",
    members: [
      { name: 'Mr. Gangaram Sampangi', relation: 'Father of the Bride' },
      { name: 'Mrs. Shantha Sampangi', relation: 'Mother of the Bride' },
      { name: 'Mr. Chandrashekar Sampangi', relation: 'Brother of the Bride' },
      { name: 'Mrs. Nagalaxmi Sampangi', relation: "Brother's Wife" },
      {
        name: 'Master Mokshith Sampangi',
        relation: 'Son of Mr. Chandrashekar and Mrs. Nagalaxmi'
      }
    ],
  },
];

function FlipMember({ member, delay }) {
  const [flipped, setFlipped] = useState(false);
  const initials = member.name.split(' ').filter(w => w.length > 1).map(w => w[0]).join('');
  return (
    <div
      className="flex-1 border-b border-gold/[0.07] last:border-0 cursor-pointer select-none"
      style={{ perspective: '800px', minHeight: 68 }}
      onClick={() => setFlipped(f => !f)}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformStyle: 'preserve-3d', position: 'relative', height: '100%', minHeight: 68 }}
      >
        {/* Front */}
        <div
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-2 py-3"
        >
          <p className="font-serif text-silk text-sm sm:text-base leading-snug">{member.name}</p>
          <p className="text-gold/45 text-[9px] uppercase tracking-[0.25em] font-sans mt-1">{member.relation}</p>
          <p className="text-gold/18 text-[7px] font-sans mt-1.5 tracking-widest">tap ✦</p>
        </div>
        {/* Back */}
        <div
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-2 py-3"
        >
          <motion.span
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-gold text-xl block leading-none"
          >✞</motion.span>
          <p className="text-gold font-serif text-lg mt-1.5 leading-none">{initials}</p>
          <div className="w-8 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent my-1.5" />
          <p className="text-silk/35 font-serif italic text-[10px]">Blessed</p>
        </div>
      </motion.div>
    </div>
  );
}

function FamilyCard({ family, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full"
    >
      {/* Glow */}
      <div className="absolute -inset-1.5 rounded-2xl pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.07) 0%, transparent 65%)' }}
      />

      <div
        className="relative rounded-2xl border border-gold/22 overflow-hidden h-full flex flex-col"
        style={{ background: 'linear-gradient(160deg, #181500 0%, #0d0d0d 100%)', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}
      >
        <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

        {/* Corner accents */}
        {[['top-3 left-3'], ['top-3 right-3 rotate90'], ['bottom-3 left-3 rotate270'], ['bottom-3 right-3 rotate180']].map(([pos], i) => (
          <div key={i} className={`absolute ${pos} w-5 h-5 pointer-events-none`}>
            <div className={`absolute top-0 left-0 w-full h-px bg-gold/35 ${i === 1 || i === 3 ? 'origin-right' : ''}`} />
            <div className={`absolute top-0 left-0 h-full w-px bg-gold/35 ${i === 2 || i === 3 ? 'origin-bottom' : ''}`} />
          </div>
        ))}

        <div className="p-6 flex flex-col flex-1">
          {/* Header */}
          <div className="text-center mb-5">
            <motion.span
              animate={{ textShadow: ['0 0 8px rgba(212,175,55,0.3)', '0 0 20px rgba(212,175,55,0.7)', '0 0 8px rgba(212,175,55,0.3)'] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-gold text-xl block mb-2"
            >✞</motion.span>
            <h3 className="font-serif text-lg sm:text-xl text-gold gold-glow">{family.side}</h3>
            <div className="w-10 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent mx-auto mt-2.5" />
          </div>

          {/* Members — flip cards */}
          <div className="flex flex-col flex-1">
            {family.members.map((member, i) => (
              <FlipMember key={i} member={member} delay={index * 0.15 + i * 0.08 + 0.35} />
            ))}
          </div>
        </div>

        <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      </div>
    </motion.div>
  );
}

export default function Families() {
  return (
    <section id="families" className="py-16 flex flex-col items-center bg-obsidian relative overflow-hidden px-5">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(212,175,55,0.04) 0%, transparent 100%)' }}
      />

      <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        className="text-gold/40 uppercase tracking-[0.5em] text-[9px] font-sans font-light mb-3">
        Two Families, One Faith
      </motion.p>
      <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="text-gold font-serif text-2xl sm:text-3xl md:text-4xl mb-2 gold-glow text-center">
        Our Families
      </motion.h2>
      <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
        className="text-silk/30 font-serif italic text-sm mb-12 text-center">
        United in love, bound by grace
      </motion.p>

      {/* Cards grid — stacks on mobile, side-by-side on desktop with equal heights */}
      <div className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 md:gap-0 items-stretch">
        <FamilyCard family={families[0]} index={0} />

        {/* Center divider — desktop */}
        <div className="hidden md:flex flex-col items-center justify-center px-6 self-stretch">
          {/* Top line */}
          <div className="w-px flex-1 bg-gradient-to-b from-transparent via-gold/35 to-gold/35" />
          {/* Heart symbol with lines */}
          <div className="flex flex-col items-center gap-2 my-3 flex-shrink-0">
            <div className="w-px h-6 bg-gradient-to-b from-gold/35 to-gold/60" />
            <motion.div
              animate={{ scale: [1, 1.12, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-11 h-11 rounded-full border border-gold/40 flex items-center justify-center"
              style={{ background: 'radial-gradient(circle, #1a1800 0%, #0d0d0d 100%)', boxShadow: '0 0 14px rgba(212,175,55,0.15)' }}
            >
              <Heart className="w-4 h-4 text-gold" fill="rgba(212,175,55,0.3)" />
            </motion.div>
            <div className="w-px h-6 bg-gradient-to-b from-gold/60 to-gold/35" />
          </div>
          {/* Bottom line */}
          <div className="w-px flex-1 bg-gradient-to-b from-gold/35 via-gold/35 to-transparent" />
        </div>

        {/* Mobile heart divider */}
        <div className="flex md:hidden items-center gap-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
          <div className="w-9 h-9 rounded-full border border-gold/30 flex items-center justify-center flex-shrink-0"
            style={{ background: 'radial-gradient(circle, #1a1800 0%, #0d0d0d 100%)' }}>
            <Heart className="w-3.5 h-3.5 text-gold" fill="rgba(212,175,55,0.22)" />
          </div>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent via-gold/30 to-transparent" />
        </div>

        <FamilyCard family={families[1]} index={1} />
      </div>

      <NextSectionButton nextId="venue" label="Find the Venue" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />
    </section>
  );
}