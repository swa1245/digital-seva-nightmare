import React, { useEffect, useRef, useState } from 'react';
import { usePopup } from './components/Popups/PopupManager';
import { useChaos, playCursedSound } from './hooks/useChaos';
import CursedNavbar from './components/Navbar/CursedNavbar';
import CursedAds from './components/Ads/CursedAds';
import { AutoSaveSpinner } from './components/Loaders/CursedLoaders';
import AppRoutes from './router';
import { Volume2, VolumeX, AlertOctagon } from 'lucide-react';
import './styles/main.scss';

// Import All 15 Cursed UX Add-ons (Global Components)
import TabEscape from './components/ChaosEffects/TabEscape';
import FakeUpdate from './components/ChaosEffects/FakeUpdate';
import ErrorRain from './components/ChaosEffects/ErrorRain';
import LoadingLottery from './components/ChaosEffects/LoadingLottery';
import FakeHacking from './components/ChaosEffects/FakeHacking';
import AudioJumpscare from './components/ChaosEffects/AudioJumpscare';
import ScrollBetrayal from './components/ChaosEffects/ScrollBetrayal';
import ChatbotFromHell from './components/ChaosEffects/ChatbotFromHell';
import LanguageSwitcher from './components/ChaosEffects/LanguageSwitcher';


function App() {
  const popupManager = usePopup();
  const { slogan, isAutoSaving, autoSaveCount, handleShiftButton } = useChaos(popupManager);
  
  // Retro audio background loop states
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [volume, setVolume] = useState(70); // 0 to 100
  const audioCtxRef = useRef(null);
  const synthIntervalRef = useRef(null);

  // Initialize Web Audio synthesised retro background melody
  const startMelody = () => {
    if (audioPlaying) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioContext();
      audioCtxRef.current = ctx;

      // Play an annoying continuous 2009 8-bit repeating chime
      const notes = [261.63, 293.66, 329.63, 349.23, 392.00, 349.23, 329.63, 293.66]; // C4 major up/down
      let noteIndex = 0;

      synthIntervalRef.current = setInterval(() => {
        if (ctx.state === 'suspended') return;
        
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        
        osc.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        osc.type = 'triangle'; // Retro console sound
        osc.frequency.setValueAtTime(notes[noteIndex], ctx.currentTime);
        
        // Cursed volume scaling: higher when slider is low!
        const scaledVol = (100 - volume) / 1000 + 0.01;
        gainNode.gain.setValueAtTime(scaledVol, ctx.currentTime);
        
        osc.start();
        osc.stop(ctx.currentTime + 0.35);
        
        noteIndex = (noteIndex + 1) % notes.length;
      }, 450);

      setAudioPlaying(true);
    } catch (err) {
      console.warn('Synth could not start', err);
    }
  };

  const stopMelody = () => {
    if (synthIntervalRef.current) {
      clearInterval(synthIntervalRef.current);
    }
    setAudioPlaying(false);
  };

  const handleUserClickInit = () => {
    if (!audioPlaying) {
      startMelody();
    }
  };

  const handleVolumeChange = (e) => {
    const val = parseInt(e.target.value);
    setVolume(val);
    playCursedSound('laser');
  };

  const handleMuteToggle = () => {
    // Intentionally setting volume to maximum on mute attempt! Cursed!
    setVolume(10); // 10 leads to 90% scaling!
    playCursedSound('error');
    alert('MUTE ERROR: Biometric audio compliance requires active audio stream. System volume amplified for security verification.');
  };

  return (
    <div onClick={handleUserClickInit} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Background Tab, Audio, and Scroll Interrupters */}
      <TabEscape />
      <AudioJumpscare intervalMs={32000} />
      <ScrollBetrayal intervalMs={20000} />
      
      {/* Random Screen Blocker overlays */}
      <FakeUpdate triggerInterval={120000} />
      <LoadingLottery triggerInterval={95000} />
      <FakeHacking triggerInterval={150000} />
      <ErrorRain triggerInterval={45000} />

      {/* Floating Helpers */}
      <ChatbotFromHell />

      {/* Background synth control widget */}
      <div style={{
        position: 'fixed',
        top: '15px',
        right: '15px',
        zIndex: 9999,
        background: '#fff8dc',
        border: '2px outset #8b0000',
        padding: '5px 10px',
        fontSize: '11px',
        fontFamily: 'Comic Sans MS',
        boxShadow: '-3px 3px 0px rgba(0,0,0,0.5)',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px'
      }}>
        <div style={{ fontWeight: 'bold', color: '#8b0000', textAlign: 'center' }}>
          🔊 PORTAL ATMOSPHERE
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <button onClick={handleMuteToggle} style={{ border: '1px solid #777', padding: '1px 3px', display: 'flex', alignItems: 'center' }}>
            <VolumeX size={12} /> Mute
          </button>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={handleVolumeChange}
            style={{ width: '60px', cursor: 'pointer' }}
          />
        </div>
        <div style={{ fontSize: '9px', color: '#666', textAlign: 'center' }}>
          Slide Left = Louder (Cursed)
        </div>
      </div>

      {/* Primary Navigation Banner */}
      <CursedNavbar slogan={slogan} />

      {/* Language Switcher bar directly below navbar */}
      <LanguageSwitcher />

      {/* Obnoxious ads */}
      <CursedAds />

      {/* Main Page View Content Container */}
      <main style={{ flex: 1 }}>
        <AppRoutes handleShiftButton={handleShiftButton} />
      </main>

      {/* Auto save corner notifier */}
      <AutoSaveSpinner isActive={isAutoSaving} count={autoSaveCount} />

      {/* Bottom Legal Slogan Banner */}
      <footer style={{
        background: '#000',
        color: '#c0c0c0',
        fontFamily: 'monospace',
        padding: '10px',
        fontSize: '10px',
        textAlign: 'center',
        borderTop: '3px solid #ff9933',
        marginTop: '30px'
      }}>
        <div>🇮🇳 DIGITAL BHARAT PORTAL SIMULATOR 2009. CITIZEN PERMIT INITIATIVE. ALL RIGHTS RESERVED. 🇮🇳</div>
        <div style={{ color: 'red', marginTop: '4px' }}>
          Disclaimer: This is a simulation web portal. No real money transfers or actual Aadhaar biometric lookups occur.
        </div>
      </footer>
    </div>
  );
}

export default App;
