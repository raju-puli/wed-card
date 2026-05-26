import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Gallery({ images }) {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const openLightbox = (idx) => setSelectedIndex(idx);
  const closeLightbox = () => setSelectedIndex(null);
  const next = () => setSelectedIndex((prev) => (prev + 1) % images.length);
  const prev = () => setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <section className="py-20 md:py-28 flex flex-col items-center px-6 bg-obsidian relative">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-gold/40 uppercase tracking-[0.5em] text-[9px] md:text-[10px] font-sans font-light mb-3"
      >
        Moments
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-gold font-serif text-2xl md:text-3xl mb-12 gold-glow"
      >
        Our Gallery
      </motion.h2>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 w-full max-w-4xl">
        {images.map((img, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            whileHover={{ scale: 1.03 }}
            onClick={() => openLightbox(idx)}
            className="aspect-square rounded-xl overflow-hidden border border-gold/10 cursor-pointer relative group"
          >
            <img
              src={img}
              alt={`Gallery ${idx + 1}`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-obsidian/95 backdrop-blur-xl flex items-center justify-center"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-silk hover:bg-white/20 transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-silk hover:bg-white/20 transition-colors z-10"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-silk hover:bg-white/20 transition-colors z-10"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <motion.img
              key={selectedIndex}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              src={images[selectedIndex]}
              alt="Gallery preview"
              className="max-w-[90vw] max-h-[80vh] rounded-xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
    </section>
  );
}