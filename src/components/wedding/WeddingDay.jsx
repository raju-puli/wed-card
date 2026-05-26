import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Calendar, Building2 } from 'lucide-react';

export default function WeddingDay() {
  return (
    <section className="py-20 md:py-28 flex flex-col items-center px-6 bg-obsidian relative">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-gold/40 uppercase tracking-[0.5em] text-[9px] md:text-[10px] font-sans font-light mb-3"
      >
        Join Us On
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-gold font-serif text-2xl md:text-3xl mb-12 gold-glow"
      >
        The Wedding Day
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-lg"
      >
        {/* Ceremony Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-gold/20 rounded-2xl p-8 md:p-10 gold-box-glow relative overflow-hidden">
          {/* Corner decorations */}
          <div className="absolute top-0 left-0 w-12 h-12 border-t border-l border-gold/30 rounded-tl-2xl" />
          <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-gold/30 rounded-tr-2xl" />
          <div className="absolute bottom-0 left-0 w-12 h-12 border-b border-l border-gold/30 rounded-bl-2xl" />
          <div className="absolute bottom-0 right-0 w-12 h-12 border-b border-r border-gold/30 rounded-br-2xl" />

          <div className="text-center mb-8">
            <Building2 className="w-8 h-8 text-gold mx-auto mb-4" />
            <h3 className="font-serif text-2xl text-silk gold-glow">Holy Matrimony</h3>
            <p className="text-silk/40 text-xs font-sans mt-1">A Sacred Christian Ceremony</p>
          </div>

          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                <Calendar className="w-4 h-4 text-gold" />
              </div>
              <div>
                <p className="text-silk/40 text-[10px] uppercase tracking-[0.2em] font-sans">Date</p>
                <p className="text-silk font-serif text-lg">5th June 2026</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                <Clock className="w-4 h-4 text-gold" />
              </div>
              <div>
                <p className="text-silk/40 text-[10px] uppercase tracking-[0.2em] font-sans">Time</p>
                <p className="text-silk font-serif text-lg">10:45 AM onwards</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-4 h-4 text-gold" />
              </div>
              <div>
                <p className="text-silk/40 text-[10px] uppercase tracking-[0.2em] font-sans">Venue</p>
                <p className="text-silk font-serif text-lg">Shabari A/C Function Hall</p>
                <p className="text-silk/50 text-xs font-sans mt-0.5">Kothuru, Bonakal Road, Khammam</p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="my-8 h-[1px] bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="https://share.google/DJEWgt0oS71W3ehVB"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg border border-gold/30 text-gold hover:bg-gold/10 transition-all text-sm font-sans"
            >
              <MapPin className="w-4 h-4" />
              Open in Maps
            </a>
            <a
              href="https://calendar.google.com/calendar/render?action=TEMPLATE&amp;text=Daniel+%26+Jyothi+Wedding&amp;dates=20260605T043000Z/20260605T133000Z&amp;details=Holy+Matrimony&amp;location=Shabari+AC+Function+Hall,+Khammam"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-gold/10 border border-gold/30 text-gold hover:bg-gold/20 transition-all text-sm font-sans"
            >
              <Calendar className="w-4 h-4" />
              Add to Calendar
            </a>
          </div>
        </div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
    </section>
  );
}