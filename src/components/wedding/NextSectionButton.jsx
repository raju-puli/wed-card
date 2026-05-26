import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function NextSectionButton({ nextId, label = 'Continue' }) {
  const handleClick = () => {
    const el = document.getElementById(nextId);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="flex justify-center pt-4 pb-10">
      <motion.button
        onClick={handleClick}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex flex-col items-center gap-2.5 group cursor-pointer select-none"
        aria-label={label}
      >
        <span className="text-gold/35 text-[8px] uppercase tracking-[0.5em] font-sans group-hover:text-gold/70 transition-colors duration-300">
          {label}
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="w-11 h-11 rounded-full border border-gold/25 flex items-center justify-center group-hover:border-gold/60 group-hover:shadow-[0_0_18px_rgba(212,175,55,0.2)] transition-all duration-300"
          style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.08) 0%, rgba(212,175,55,0.02) 100%)' }}
        >
          <ChevronDown className="w-5 h-5 text-gold/50 group-hover:text-gold transition-colors duration-300" />
        </motion.div>
      </motion.button>
    </div>
  );
}