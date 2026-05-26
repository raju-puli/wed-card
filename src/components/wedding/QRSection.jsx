import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { motion } from 'framer-motion';
import { Copy, Check, Share2 } from 'lucide-react';

export default function QRSection() {
  const [copied, setCopied] = useState(false);
  const [borderAngle, setBorderAngle] = useState(0);
  const url = window.location.href;

  useEffect(() => {
    const id = setInterval(() => setBorderAngle(a => (a + 1.5) % 360), 16);
    return () => clearInterval(id);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }).catch(() => { });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: 'Daniel Raju & Jyothi — Wedding Invitation', url }).catch(() => { });
    } else {
      handleCopy();
    }
  };

  // Animated conic border
  const conicBg = `conic-gradient(from ${borderAngle}deg, rgba(212,175,55,0.9) 0deg, rgba(183,110,121,0.6) 90deg, rgba(212,175,55,0.2) 180deg, rgba(212,175,55,0.9) 360deg)`;

  return (
    <section className="py-20 md:py-28 flex flex-col items-center bg-charcoal relative overflow-hidden px-6">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(212,175,55,0.05) 0%, transparent 100%)' }}
      />

      <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        className="text-gold/40 uppercase tracking-[0.5em] text-[9px] md:text-[10px] font-sans font-light mb-3">
        Spread the Joy
      </motion.p>
      <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="text-gold font-serif text-2xl md:text-4xl mb-3 gold-glow text-center">
        Scan {'&'} Share
      </motion.h2>
      <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
        className="text-silk/30 font-serif italic text-sm mb-12 text-center">
        Share this invitation with those you love
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center gap-7"
      >
        {/* Animated border frame */}
        <div className="relative p-[2px] rounded-3xl" style={{ background: conicBg }}>
          {/* Inner card */}
          <div className="relative rounded-3xl overflow-hidden"
            style={{
              background: 'linear-gradient(160deg, #1a1600 0%, #0d0d0d 100%)',
              boxShadow: 'inset 0 0 40px rgba(212,175,55,0.04)',
            }}
          >
            {/* Corner ornaments */}
            {[['top-4 left-4', 'from-gold/60 to-transparent', 'from-gold/60 to-transparent'],
            ['top-4 right-4', 'from-transparent to-gold/60', 'from-gold/60 to-transparent'],
            ['bottom-4 left-4', 'from-gold/60 to-transparent', 'from-transparent to-gold/60'],
            ['bottom-4 right-4', 'from-transparent to-gold/60', 'from-transparent to-gold/60'],
            ].map(([pos, hg, vg], i) => (
              <div key={i} className={`absolute ${pos} w-6 h-6 pointer-events-none`}>
                <div className={`absolute top-0 left-0 w-full h-px bg-gradient-to-r ${hg}`} />
                <div className={`absolute top-0 left-0 h-full w-px bg-gradient-to-b ${vg}`} />
              </div>
            ))}

            <div className="p-6 flex flex-col items-center">
              {/* Real scannable QR code */}
              <div className="relative p-3 rounded-xl" style={{ background: '#0d0d0d', border: '1px solid rgba(212,175,55,0.25)' }}>
                <QRCodeSVG
                  value={url}
                  size={180}
                  bgColor="#0d0d0d"
                  fgColor="#D4AF37"
                  level="M"
                  includeMargin={false}
                />
                {/* Center monogram */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-11 h-11 rounded-full flex flex-col items-center justify-center"
                    style={{ background: 'rgba(10,10,10,0.95)', border: '1px solid rgba(212,175,55,0.5)', boxShadow: '0 0 14px rgba(212,175,55,0.3)' }}>
                    <span className="text-gold text-xs leading-none">✞</span>
                    <span className="text-gold font-serif italic text-[8px] mt-0.5">D·J</span>
                  </div>
                </div>
              </div>
              {/* Label */}
              <div className="mt-3 text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <div className="w-8 h-px bg-gradient-to-r from-transparent to-gold/40" />
                  <span className="text-gold/50 text-[8px] uppercase tracking-[0.4em] font-sans">Daniel Raju {'&'} Jyothi</span>
                  <div className="w-8 h-px bg-gradient-to-l from-transparent to-gold/40" />
                </div>
                <p className="text-silk/20 text-[8px] font-sans tracking-widest">5 · 6 · 2026 · Khammam</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
          <motion.button
            whileHover={{ scale: 1.03, boxShadow: '0 0 25px rgba(212,175,55,0.2)' }}
            whileTap={{ scale: 0.97 }}
            onClick={handleShare}
            className="flex items-center justify-center gap-2.5 py-3 px-6 rounded-full border border-gold/50 text-gold text-sm font-sans tracking-wide transition-all duration-300 flex-1"
            style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.1) 0%, rgba(212,175,55,0.03) 100%)' }}
          >
            <Share2 className="w-4 h-4" />
            Share
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleCopy}
            className="flex items-center justify-center gap-2.5 py-3 px-6 rounded-full border text-sm font-sans tracking-wide transition-all duration-300 flex-1"
            style={{
              borderColor: copied ? 'rgba(212,175,55,0.7)' : 'rgba(212,175,55,0.25)',
              color: copied ? '#D4AF37' : 'rgba(245,245,245,0.45)',
              background: copied ? 'rgba(212,175,55,0.08)' : 'transparent',
            }}
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied!' : 'Copy Link'}
          </motion.button>
        </div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />
    </section>
  );
}