import React, { useState, useEffect } from 'react';
import Curtain from '../components/wedding/Curtain';
import FloatingParticles from '../components/wedding/FloatingParticles';
import MusicPlayer from '../components/wedding/MusicPlayer';
import Hero from '../components/wedding/Hero';
import ScratchDate from '../components/wedding/ScratchDate';
import Countdown from '../components/wedding/Countdown';
import Invitation from '../components/wedding/Invitation';
import Families from '../components/wedding/Families';
import Venue from '../components/wedding/Venue';
import Footer from '../components/wedding/Footer';

export default function Home() {
  const [curtainOpen, setCurtainOpen] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    console.log('Home component mounted');
  }, []);

  const handleOpen = () => {
    console.log('Curtain opening...');
    setCurtainOpen(true);
    setTimeout(() => setContentVisible(true), 50);
  };

  return (
    <div className="min-h-screen bg-obsidian overflow-x-hidden">
      <Curtain isOpen={curtainOpen} onOpen={handleOpen} />

      {curtainOpen && <MusicPlayer shouldPlay={curtainOpen} />}
      {curtainOpen && <FloatingParticles />}

      {curtainOpen && (
        <main style={{ opacity: contentVisible ? 1 : 0, transition: 'opacity 0.6s ease' }}>
          <Hero />
          <ScratchDate />
          <Countdown />
          <Invitation />
          <Families />
          <Venue />
          <Footer />
        </main>
      )}
    </div>
  );
}