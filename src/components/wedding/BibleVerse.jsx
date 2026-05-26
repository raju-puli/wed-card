import React from 'react';
import { motion } from 'framer-motion';

export default function BibleVerse() {
  return (
    <section className="py-20 md:py-28 flex flex-col items-center px-6 bg-charcoal relative overflow-hidden">
      {/* Decorative glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full opacity-10"
        style={{ background: 'radial-gradient(ellipse, rgba(183,110,121,0.4) 0%, transparent 70%)' }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="max-w-2xl text-center relative z-10"
      >
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-16 h-[1px] bg-gold/40 mx-auto mb-8"
        />

        <p className="text-gold/40 uppercase tracking-[0.5em] text-[9px] md:text-[10px] font-sans font-light mb-8">
          A Sacred Word
        </p>

        <motion.blockquote
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="font-serif text-xl md:text-2xl lg:text-3xl text-silk/90 leading-relaxed italic"
        >
          "Love is patient, love is kind. It does not envy, it does not boast, it is not proud.
          It does not dishonor others, it is not self-seeking, it is not easily angered,
          it keeps no record of wrongs."
        </motion.blockquote>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 text-gold font-serif text-sm md:text-base tracking-wide"
        >
          — 1 Corinthians 13:4-5
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="w-16 h-[1px] bg-gold/40 mx-auto mt-8"
        />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
          className="mt-6 text-gold text-2xl"
        >
          ✞
        </motion.div>
      </motion.div>
    </section>
  );
}