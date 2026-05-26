import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Share2, Copy, Check, Sparkles } from 'lucide-react';
import icon from "@/logo.png";
import QRCode from 'qrcode.react';

// Modern Pixel-Style QR Code with custom rendering
function ModernPixelQR() {
  const qrValue = "https://raju-puli.github.io/wed-card/";
  const [isHovered, setIsHovered] = useState(false);

  // Custom QR code with pixelated styling using canvas
  const qrRef = React.useRef < HTMLDivElement > (null);

  return (
    <div className="relative p-4 flex justify-center items-center">
      <motion.div
        className="relative"
        animate={isHovered ? { scale: 1.02 } : { scale: 1 }}
        transition={{ duration: 0.3 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        {/* Animated gradient ring behind QR */}
        <motion.div
          className="absolute -inset-3 rounded-2xl opacity-60 blur-xl"
          animate={{
            background: [
              'radial-gradient(circle, rgba(212,175,55,0.4) 0%, rgba(212,175,55,0) 70%)',
              'radial-gradient(circle, rgba(212,175,55,0.7) 0%, rgba(212,175,55,0) 70%)',
              'radial-gradient(circle, rgba(212,175,55,0.4) 0%, rgba(212,175,55,0) 70%)',
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Main QR Code with modern pixel styling */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
          {/* Gradient border */}
          <div className="absolute inset-0 rounded-2xl p-[2px] bg-gradient-to-br from-gold via-rose-gold to-gold" />

          <div className="relative bg-gradient-to-br from-[#0a0a0a] to-[#141414] p-3 rounded-2xl">
            <QRCode
              value={qrValue}
              size={200}
              bgColor="#0a0a0a"
              fgColor="#D4AF37"
              level="H"
              includeMargin={false}
              imageSettings={{
                src: icon,
                x: undefined,
                y: undefined,
                height: 42,
                width: 42,
                excavate: true,
              }}
              renderAs="canvas"
            />

            {/* Pixel decoration overlay */}
            <div className="absolute inset-0 pointer-events-none rounded-2xl overflow-hidden">
              <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-gold/60 rounded-tl-md" />
              <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-gold/60 rounded-tr-md" />
              <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-gold/60 rounded-bl-md" />
              <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-gold/60 rounded-br-md" />
            </div>

            {/* Pixel particles effect */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-gold/30"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  borderRadius: '1px',
                }}
                animate={{
                  y: [0, -8, 0],
                  x: [0, (Math.random() - 0.5) * 10, 0],
                  opacity: [0, 0.8, 0],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </div>

        {/* Interactive scan indicator */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-2xl overflow-hidden"
          animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
          initial={false}
        >
          <motion.div
            className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent"
            animate={{
              top: ['0%', '100%'],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </motion.div>
      </motion.div>

      {/* Modern pixel label */}
      {/* <motion.div
        className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-sm px-3 py-1 rounded-full border border-gold/30"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-2.5 h-2.5 text-gold" />
          <span className="text-gold/80 text-[9px] font-sans tracking-wider">SCAN TO RSVP</span>
          <Sparkles className="w-2.5 h-2.5 text-gold" />
        </div>
      </motion.div> */}
    </div>
  );
}

export default function Footer() {
  const [copied, setCopied] = useState(false);
  const [borderAngle, setBorderAngle] = useState(0);
  const url = typeof window !== 'undefined' ? window.location.href : '';

  useEffect(() => {
    const id = setInterval(() => setBorderAngle(a => (a + 1.2) % 360), 16);
    return () => clearInterval(id);
  }, []);

  const conicBg = `conic-gradient(from ${borderAngle}deg, rgba(212,175,55,0.85) 0deg, rgba(183,110,121,0.55) 90deg, rgba(212,175,55,0.15) 180deg, rgba(212,175,55,0.85) 360deg)`;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Daniel Raju & Jyothi — Wedding Invitation',
        text: 'You are invited to the wedding of Daniel Raju & Jyothi! 5th June 2026, Khammam.',
        url,
      }).catch(() => { });
    } else {
      handleCopy();
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }).catch(() => { });
  };

  return (
    <footer
      id="footer"
      className="relative pt-20 pb-12 flex flex-col items-center px-5 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0d0d0d 0%, #07060000 100%)' }}
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/35 to-transparent" />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(212,175,55,0.07) 0%, transparent 70%)' }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="flex flex-col items-center text-center w-full max-w-xs relative z-10"
      >
        {/* Monogram disc */}
        <div className="relative mb-7">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            className="absolute -inset-5 rounded-full border border-dashed border-gold/15"
          />
          <div className="absolute -inset-3 rounded-full border border-gold/20" />
          <div className="w-20 h-20 rounded-full border border-gold/45 flex flex-col items-center justify-center"
            style={{ background: 'radial-gradient(circle, #1e1a00 0%, #0d0d0d 100%)', boxShadow: '0 0 30px rgba(212,175,55,0.18)' }}
          >
            <span className="text-gold/70 font-serif italic text-xs mt-0.5">
              <img src={icon} alt="icon" width={60} loading='lazy' />
            </span>
          </div>
        </div>

        {/* Names */}
        <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-silk mb-1"
          style={{ textShadow: '0 0 40px rgba(212,175,55,0.2)' }}>
          Daniel Raju {'&'} Jyothi
        </h3>
        <p className="text-gold/40 font-serif italic text-sm mb-5">5th June 2026</p>

        <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent mb-6" />

        {/* Bible verse */}
        <p className="text-silk/40 font-serif italic text-sm sm:text-base leading-relaxed">
          "Therefore what God has joined together,<br />let no one separate."
        </p>
        <p className="text-gold/40 font-serif text-xs mt-2 mb-8">— Mark 10:9</p>

        <p className="text-silk/20 font-sans text-[9px] uppercase tracking-[0.4em] mb-8">
          Thank you for celebrating with us
        </p>

        {/* ── MODERN PIXEL QR with rotating border ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-8 w-full"
        >
          <div className="relative p-[3px] rounded-2xl mx-auto" style={{ background: conicBg, width: 'fit-content' }}>
            <div className="rounded-2xl overflow-hidden relative"
              style={{ background: 'linear-gradient(145deg, #181400 0%, #0d0d0d 100%)' }}
            >
              {/* Modern pixel corner accents */}
              <div className="absolute top-0 left-0 w-10 h-10 z-10 pointer-events-none">
                <div className="absolute top-1 left-1 w-3 h-3 bg-gold/30" />
                <div className="absolute top-1 left-5 w-1 h-1 bg-gold/50" />
                <div className="absolute top-5 left-1 w-1 h-1 bg-gold/50" />
              </div>
              <div className="absolute top-0 right-0 w-10 h-10 z-10 pointer-events-none">
                <div className="absolute top-1 right-1 w-3 h-3 bg-gold/30" />
                <div className="absolute top-1 right-5 w-1 h-1 bg-gold/50" />
                <div className="absolute top-5 right-1 w-1 h-1 bg-gold/50" />
              </div>
              <div className="absolute bottom-0 left-0 w-10 h-10 z-10 pointer-events-none">
                <div className="absolute bottom-1 left-1 w-3 h-3 bg-gold/30" />
                <div className="absolute bottom-1 left-5 w-1 h-1 bg-gold/50" />
                <div className="absolute bottom-5 left-1 w-1 h-1 bg-gold/50" />
              </div>
              <div className="absolute bottom-0 right-0 w-10 h-10 z-10 pointer-events-none">
                <div className="absolute bottom-1 right-1 w-3 h-3 bg-gold/30" />
                <div className="absolute bottom-1 right-5 w-1 h-1 bg-gold/50" />
                <div className="absolute bottom-5 right-1 w-1 h-1 bg-gold/50" />
              </div>

              <ModernPixelQR />

              {/* Modern footer text */}
              <div className="pb-4 text-center relative z-10">
                <div className="flex items-center justify-center gap-3 mb-1">
                  <div className="w-8 h-px bg-gradient-to-r from-transparent to-gold/40" />
                  <span className="text-gold/60 text-[9px] uppercase tracking-[0.3em] font-sans font-light">Digital Invitation</span>
                  <div className="w-8 h-px bg-gradient-to-l from-transparent to-gold/40" />
                </div>
                <p className="text-silk/20 text-[8px] font-sans tracking-wider">5 · 6 · 2026 · Khammam</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Share & Copy buttons */}
        <div className="flex gap-3 w-full mb-12">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleShare}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-full border border-gold/45 text-gold text-sm font-sans tracking-wide transition-all duration-300 backdrop-blur-sm"
            style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.1) 0%, rgba(212,175,55,0.03) 100%)' }}
          >
            <Share2 className="w-4 h-4" />
            Share
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleCopy}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-full border text-sm font-sans tracking-wide transition-all duration-300 backdrop-blur-sm"
            style={{
              borderColor: copied ? 'rgba(212,175,55,0.65)' : 'rgba(212,175,55,0.22)',
              color: copied ? '#D4AF37' : 'rgba(245,245,245,0.42)',
              background: copied ? 'rgba(212,175,55,0.08)' : 'transparent',
            }}
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied!' : 'Copy Link'}
          </motion.button>
        </div>

        <div className="flex items-center gap-1.5 text-silk/15 text-[9px] font-sans">
          <span>Crafted with</span>
          <Heart className="w-3 h-3 text-rose fill-rose opacity-50" />
          <span>{'&'} Faith</span>
        </div>
      </motion.div>
    </footer>
  );
}