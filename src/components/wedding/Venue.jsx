import React from 'react';
import NextSectionButton from './NextSectionButton';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Clock, Building2 } from 'lucide-react';

export default function Venue() {
  return (
    <section id="venue" className="py-16 flex flex-col items-center bg-charcoal relative overflow-hidden px-6">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(212,175,55,0.04) 0%, transparent 100%)' }}
      />

      <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        className="text-gold/40 uppercase tracking-[0.5em] text-[9px] md:text-[10px] font-sans font-light mb-3">
        Find Us Here
      </motion.p>
      <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="text-gold font-serif text-2xl md:text-4xl mb-12 gold-glow text-center">
        The Venue
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-2xl"
      >
        {/* Info card */}
        <div className="rounded-2xl border border-gold/20 p-5 md:p-6 mb-4 relative overflow-hidden"
          style={{ background: 'linear-gradient(160deg, #161400 0%, #0d0d0d 100%)', boxShadow: '0 10px 40px rgba(0,0,0,0.4)' }}
        >
          {/* Top shine */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
          <div className="absolute top-3 left-3 w-5 h-5 border-t border-l border-gold/40" />
          <div className="absolute top-3 right-3 w-5 h-5 border-t border-r border-gold/40" />
          <div className="absolute bottom-3 left-3 w-5 h-5 border-b border-l border-gold/40" />
          <div className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-gold/40" />

          <div className="flex flex-col sm:flex-row sm:items-center gap-5 relative z-10">
            <div className="flex items-start gap-4 flex-1">
              <div className="w-11 h-11 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0">
                <Building2 className="w-5 h-5 text-gold" />
              </div>
              <div className="flex-1 space-y-2">
                <div>
                  <p className="text-silk font-serif text-lg md:text-xl">Shabari A/C Function Hall</p>
                  <p className="text-silk/40 text-xs font-sans">Kothuru, Bonakal Road</p>
                  <p className="text-silk/40 text-xs font-sans">Khammam, Telangana</p>
                </div>
                <div className="flex flex-wrap gap-4 pt-0.5">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-gold/50" />
                    <span className="text-silk/45 text-xs font-sans">10:45 AM onwards</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-gold/50" />
                    <span className="text-silk/45 text-xs font-sans">5th June 2026</span>
                  </div>
                </div>
              </div>
            </div>
            <a
              href="https://share.google/DJEWgt0oS71W3ehVB"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 px-5 rounded-xl border border-gold/30 bg-gold/8 text-gold hover:bg-gold/15 transition-all duration-300 text-sm font-sans whitespace-nowrap"
            >
              <Navigation className="w-4 h-4" />
              Get Directions
            </a>
          </div>
        </div>

        {/* Map */}
        <div className="rounded-2xl overflow-hidden border border-gold/20"
          style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}
        >
          <iframe
            src="https://maps.google.com/maps?q=Shabari+AC+Function+Hall+Khammam+Telangana&amp;output=embed&amp;z=15"
            width="100%" height="320"
            style={{ border: 0, filter: 'invert(0.85) hue-rotate(180deg) saturate(0.2) brightness(0.7)', display: 'block' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Wedding Venue Map"
          />
        </div>
      </motion.div>

      <NextSectionButton nextId="footer" label="Share the Joy" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />
    </section>
  );
}