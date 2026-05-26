import React, { useState, useRef, useMemo } from 'react';
import NextSectionButton from './NextSectionButton';
import { motion, AnimatePresence } from 'framer-motion';

// Stable petals
function Petals({ active }) {
  const petals = useMemo(() =>
    Array.from({ length: 18 }, (_, i) => ({
      id: i,
      x: 5 + (i * 90 / 18),
      delay: (i * 0.42) % 5,
      duration: 4 + (i % 5),
      size: 5 + (i % 6),
      rotate: i * 43,
      color: i % 3 === 0
        ? 'rgba(212,175,55,0.7)'
        : i % 3 === 1
          ? 'rgba(183,110,121,0.65)'
          : 'rgba(245,245,245,0.35)',
    })), []);

  if (!active) return null;
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
      {petals.map(p => (
        <motion.div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: -16,
            width: p.size,
            height: p.size * 1.4,
            borderRadius: '60% 0 60% 0',
            background: p.color,
            filter: 'blur(0.4px)',
          }}
          animate={{ y: [0, 600], rotate: [p.rotate, p.rotate + 540], opacity: [0, 1, 1, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'linear' }}
        />
      ))}
    </div>
  );
}

function InvitationCard({ petalsActive }) {
  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden border border-gold/35"
      style={{
        background: 'linear-gradient(160deg, #1c1800 0%, #0c0c00 60%, #0f0d00 100%)',
        boxShadow: '0 32px 100px rgba(0,0,0,0.8), 0 0 0 1px rgba(212,175,55,0.07), inset 0 1px 0 rgba(212,175,55,0.14)',
      }}
    >
      <Petals active={petalsActive} />
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-gold/75 to-transparent" />

      {[
        ['top-4 left-4', 'from-gold/65 to-transparent', 'from-gold/65 to-transparent'],
        ['top-4 right-4 rotate90', 'from-transparent to-gold/65', 'from-gold/65 to-transparent'],
        ['bottom-4 left-4 rotate270', 'from-gold/65 to-transparent', 'from-transparent to-gold/65'],
        ['bottom-4 right-4 rotate180', 'from-transparent to-gold/65', 'from-transparent to-gold/65'],
      ].map(([pos, hg, vg], i) => (
        <div key={i} className={`absolute ${pos} w-8 h-8 pointer-events-none`}>
          <div className={`absolute top-0 left-0 w-full h-px bg-gradient-to-r ${hg}`} />
          <div className={`absolute top-0 left-0 h-full w-px bg-gradient-to-b ${vg}`} />
        </div>
      ))}

      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 30% at 50% 0%, rgba(212,175,55,0.1) 0%, transparent 100%)' }}
      />

      <div className="relative z-10 px-6 py-8 sm:px-8 sm:py-10">
        <div className="text-center mb-5">
          <motion.span
            animate={{ textShadow: ['0 0 10px rgba(212,175,55,0.4)', '0 0 35px rgba(212,175,55,1)', '0 0 10px rgba(212,175,55,0.4)'] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-gold text-3xl sm:text-4xl block"
          >✞</motion.span>
        </div>

        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-gradient-to-l from-gold/30 to-transparent" />
          <span className="text-gold/40 text-[8px] uppercase tracking-[0.45em] font-sans whitespace-nowrap">Holy Matrimony</span>
          <div className="flex-1 h-px bg-gradient-to-r from-gold/30 to-transparent" />
        </div>

        <div className="text-center space-y-4">
          <p className="text-silk/40 font-sans text-[10px] uppercase tracking-[0.2em]">Together with their families</p>
          <div>
            <h3 className="font-serif text-xl sm:text-2xl text-silk" style={{ textShadow: '0 0 25px rgba(212,175,55,0.18)' }}>
              Daniel Raju Puli
            </h3>
            <div className="flex items-center justify-center gap-3 my-3">
              <div className="w-8 h-px bg-gold/30" />
              <motion.span animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2.5, repeat: Infinity }}
                className="font-serif italic text-gold text-lg sm:text-xl">{'&'}</motion.span>
              <div className="w-8 h-px bg-gold/30" />
            </div>
            <h3 className="font-serif text-xl sm:text-2xl text-silk" style={{ textShadow: '0 0 25px rgba(212,175,55,0.18)' }}>
              Jyothi Sampangi
            </h3>
          </div>
          <div className="w-14 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent mx-auto" />
          <p className="text-silk/55 font-serif italic text-sm leading-relaxed">
            joyfully invite you to share in the celebration of their marriage
          </p>
          <p className="text-silk/30 font-sans text-[11px] leading-relaxed">
            as they are united in holy matrimony<br />before God, family, and friends
          </p>
          <div className="w-14 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent mx-auto" />

          <div className="rounded-xl border border-gold/15 overflow-hidden" style={{ background: 'rgba(212,175,55,0.03)' }}>
            {[
              { label: 'Date', value: 'Friday, 5th June 2026' },
              { label: 'Time', value: '10:45 AM onwards' },
              { label: 'Venue', value: 'Shabari A/C Function Hall', sub: 'Kothuru, Bonakal Road, Khammam' },
            ].map((item, i, arr) => (
              <div key={i} className={`px-4 py-3 ${i < arr.length - 1 ? 'border-b border-gold/10' : ''}`}>
                <p className="text-gold/35 text-[8px] uppercase tracking-[0.35em] font-sans mb-0.5">{item.label}</p>
                <p className="font-serif text-silk text-sm sm:text-base leading-snug">{item.value}</p>
                {item.sub && <p className="text-silk/35 text-[10px] font-sans mt-0.5">{item.sub}</p>}
              </div>
            ))}
          </div>
          {/* Officiating pastors */}
          <div className="rounded-xl border border-gold/12 px-4 py-3" style={{ background: 'rgba(212,175,55,0.02)' }}>
            <p className="text-gold/35 text-[8px] uppercase tracking-[0.35em] font-sans mb-2 text-center">Solemnized By</p>
            <div className="flex flex-col items-center gap-1">
              <p className="font-serif text-silk/70 text-sm leading-snug">Rev. Pastor Komaravelli Yehoshuva</p>
              <div className="w-6 h-px bg-gold/20" />
              <p className="font-serif text-silk/70 text-sm leading-snug">Rev. Pastor Komaravelli David</p>
            </div>
          </div>

          <p className="text-silk/30 font-serif italic text-xs">Reception to follow at the function hall</p>
        </div>

        <div className="flex items-center gap-3 mt-6">
          <div className="flex-1 h-px bg-gradient-to-l from-gold/25 to-transparent" />
          <span className="text-gold/40">✦</span>
          <div className="flex-1 h-px bg-gradient-to-r from-gold/25 to-transparent" />
        </div>
      </div>

      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-gold/75 to-transparent" />
    </div>
  );
}

// Envelope body — sits above the card, fades out after card is revealed
function Envelope({ flapOpen, onAnimationEnd }) {
  return (
    <div
      className="relative w-full rounded-2xl border border-gold/40 overflow-visible"
      style={{
        background: 'linear-gradient(155deg, #231d00 0%, #130f00 100%)',
        boxShadow: '0 24px 80px rgba(0,0,0,0.8), 0 0 50px rgba(212,175,55,0.08)',
        minHeight: 200,
      }}
    >
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-gold/65 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-gold/65 to-transparent" />

      {/* V-fold lines */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none opacity-25">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom right, transparent 49.5%, rgba(212,175,55,0.15) 50%, transparent 50.5%)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom left, transparent 49.5%, rgba(212,175,55,0.15) 50%, transparent 50.5%)' }} />
      </div>

      {/* Corner ornaments */}
      {[
        ['top-3 left-3', 'from-gold/55 to-transparent', 'from-gold/55 to-transparent'],
        ['top-3 right-3 rotate90', 'from-transparent to-gold/55', 'from-gold/55 to-transparent'],
        ['bottom-3 left-3 rotate270', 'from-gold/55 to-transparent', 'from-transparent to-gold/55'],
        ['bottom-3 right-3 rotate180', 'from-transparent to-gold/55', 'from-transparent to-gold/55'],
      ].map(([pos, hg, vg], i) => (
        <div key={i} className={`absolute ${pos} w-6 h-6 pointer-events-none`}>
          <div className={`absolute top-0 left-0 w-full h-px bg-gradient-to-r ${hg}`} />
          <div className={`absolute top-0 left-0 h-full w-px bg-gradient-to-b ${vg}`} />
        </div>
      ))}

      {/* Body text */}
      <div className="flex flex-col items-center justify-center py-12 px-6 gap-2">
        <motion.span
          animate={{ opacity: [0.5, 1, 0.5], textShadow: ['0 0 10px rgba(212,175,55,0.3)', '0 0 28px rgba(212,175,55,0.8)', '0 0 10px rgba(212,175,55,0.3)'] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          className="text-gold text-4xl mb-2 block leading-none"
        >✞</motion.span>
        <p className="font-serif text-gold/75 italic text-base tracking-wider">Daniel Raju {'&'} Jyothi</p>
        <div className="w-14 h-px bg-gradient-to-r from-transparent via-gold/45 to-transparent my-1" />
        <p className="font-sans text-silk/30 text-[10px] tracking-[0.4em] uppercase">5th June 2026</p>
        <p className="font-sans text-silk/18 text-[9px] tracking-[0.25em] uppercase">Shabari Hall · Khammam</p>
      </div>

      {/* Flap — animates open */}
      <motion.div
        animate={{ rotateX: flapOpen ? -172 : 0 }}
        transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
        onAnimationComplete={() => { if (flapOpen && onAnimationEnd) onAnimationEnd(); }}
        style={{
          transformStyle: 'preserve-3d',
          transformOrigin: 'top center',
          position: 'absolute',
          top: 0, left: 0, right: 0,
          zIndex: 30,
        }}
      >
        <div
          className="w-full pointer-events-none rounded-t-2xl"
          style={{
            height: 120,
            background: 'linear-gradient(175deg, #2e2500 0%, #1c1700 55%, #110f00 100%)',
            clipPath: 'polygon(0 0, 100% 0, 50% 88%)',
            borderBottom: '1px solid rgba(212,175,55,0.22)',
          }}
        >
          <div className="flex justify-center pt-4">
            <motion.div
              animate={{ boxShadow: ['0 0 8px rgba(212,175,55,0.2)', '0 0 22px rgba(212,175,55,0.55)', '0 0 8px rgba(212,175,55,0.2)'] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-10 h-10 rounded-full border border-gold/55 flex flex-col items-center justify-center"
              style={{ background: 'radial-gradient(circle, #302500 0%, #130f00 100%)' }}
            >
              <span className="text-gold text-sm leading-none">✞</span>
              <span className="text-gold/60 font-serif italic text-[7px]">D·J</span>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Invitation() {
  // stage: 'idle' | 'envelope' | 'flap' | 'card' | 'petals'
  const [stage, setStage] = useState('idle');
  const triggered = useRef(false);

  const onEnter = () => {
    if (triggered.current) return;
    triggered.current = true;
    setStage('envelope');
    setTimeout(() => setStage('flap'), 900);
    setTimeout(() => setStage('card'), 2100);
    setTimeout(() => setStage('petals'), 3200);
  };

  const flapOpen = ['flap', 'card', 'petals'].includes(stage);
  const cardVisible = ['card', 'petals'].includes(stage);
  const envelopeGone = stage === 'petals';
  const petalsActive = stage === 'petals';

  return (
    <section id="invitation" className="py-16 bg-charcoal relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 30%, rgba(183,110,121,0.07) 0%, transparent 100%)' }}
      />

      {/* Section header */}
      <motion.div
        onViewportEnter={onEnter}
        viewport={{ once: true, amount: 0.25 }}
        className="text-center px-6 mb-10"
      >
        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="text-gold/40 uppercase tracking-[0.5em] text-[9px] font-sans font-light mb-1"
        >
          With God's Blessings
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-gold font-serif text-2xl sm:text-3xl gold-glow"
        >
          Wedding Invitation
        </motion.h2>
      </motion.div>

      {/* Stage area */}
      <div className="flex justify-center px-5">
        <div className="relative w-full" style={{ maxWidth: 400 }}>

          {/* Envelope — exits upward when card appears */}
          <AnimatePresence>
            {stage !== 'idle' && !envelopeGone && (
              <motion.div
                key="envelope"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -40, opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className={cardVisible ? 'absolute inset-x-0 top-0 z-20' : 'relative z-20'}
                style={{ perspective: '1200px' }}
              >
                <Envelope flapOpen={flapOpen} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Invitation card — rises from below */}
          <AnimatePresence>
            {cardVisible && (
              <motion.div
                key="card"
                initial={{ y: 80, opacity: 0, scale: 0.96 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10"
              >
                {/* Subtle glow rings */}
                <div className="absolute -inset-3 rounded-3xl border border-gold/8 pointer-events-none" />
                <div className="absolute -inset-1 rounded-2xl border border-gold/12 pointer-events-none" />
                <InvitationCard petalsActive={petalsActive} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Placeholder height while envelope is shown alone */}
          {stage !== 'idle' && !cardVisible && !envelopeGone && (
            <div style={{ height: 260 }} />
          )}
        </div>
      </div>

      <NextSectionButton nextId="families" label="Our Families" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />
    </section>
  );
}