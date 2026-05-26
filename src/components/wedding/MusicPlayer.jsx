import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

// Christian wedding instrumental — royalty-free, reliable CDN
const MUSIC_URL = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3';

export default function MusicPlayer({ shouldPlay }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio(MUSIC_URL);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (shouldPlay && audioRef.current && !isPlaying) {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  }, [shouldPlay]);

  const toggle = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2.5, duration: 0.5 }}
      onClick={toggle}
      className="fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full bg-charcoal/80 backdrop-blur-xl border border-gold/30 flex items-center justify-center text-gold hover:border-gold/60 transition-all gold-box-glow"
    >
      {isPlaying ? (
        <div className="flex items-center gap-[2px]">
          {[1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className="w-[2px] bg-gold rounded-full"
              animate={{ height: [4, 12, 4] }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.1,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      ) : (
        <VolumeX className="w-5 h-5" />
      )}
    </motion.button>
  );
}