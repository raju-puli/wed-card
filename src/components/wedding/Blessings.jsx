import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const blessings = [
  {
    name: 'Pastor James',
    relation: 'Family Pastor',
    message: '"May the Lord bless this beautiful union and fill your home with His eternal grace and love."',
  },
  {
    name: 'Uncle David & Aunt Mary',
    relation: 'Family',
    message: '"Two hearts united in Christ — what a beautiful testimony of God\'s faithfulness. Praying for a blessed journey ahead."',
  },
  {
    name: 'Sarah & John',
    relation: 'Best Friends',
    message: '"From the moment we saw you together, we knew God had written your love story. Congratulations!"',
  },
];

export default function Blessings() {
  return (
    <section className="py-20 md:py-28 flex flex-col items-center px-6 bg-obsidian relative">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-gold/40 uppercase tracking-[0.5em] text-[9px] md:text-[10px] font-sans font-light mb-3"
      >
        Words of Love
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-gold font-serif text-2xl md:text-3xl mb-12 gold-glow"
      >
        Blessings
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 w-full max-w-4xl">
        {blessings.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
            className="bg-white/5 backdrop-blur-xl border border-gold/15 rounded-2xl p-6 md:p-8 relative group hover:border-gold/30 transition-all duration-500"
          >
            <Quote className="w-5 h-5 text-gold/30 mb-4" />
            <p className="text-silk/70 font-serif text-sm md:text-base italic leading-relaxed mb-6">
              {item.message}
            </p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center">
                <span className="text-gold font-serif text-sm">{item.name[0]}</span>
              </div>
              <div>
                <p className="text-silk text-sm font-sans">{item.name}</p>
                <p className="text-silk/30 text-[10px] font-sans uppercase tracking-wider">{item.relation}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
    </section>
  );
}