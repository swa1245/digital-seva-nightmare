import React, { useRef, useState } from 'react';
import { usePopup } from './components/Popups/PopupManager';
import { useChaos, playCursedSound } from './hooks/useChaos';
import CursedNavbar from './components/Navbar/CursedNavbar';
import CursedAds from './components/Ads/CursedAds';
import { AutoSaveSpinner } from './components/Loaders/CursedLoaders';
import AppRoutes from './router';
import { VolumeX } from 'lucide-react';
import './styles/main.scss';

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

  const [audioPlaying, setAudioPlaying] = useState(false);
  const [volume, setVolume] = useState(70);
  const audioCtxRef = useRef(null);
  const synthIntervalRef = useRef(null);

  const startMelody = () => {
    if (audioPlaying) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioContext();
      audioCtxRef.current = ctx;

      const notes = [261.63, 293.66, 329.63, 349.23, 392.0, 349.23, 329.63, 293.66];
      let noteIndex = 0;

      synthIntervalRef.current = setInterval(() => {
        if (ctx.state === 'suspended') return;

        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();

        osc.connect(gainNode);
        gainNode.connect(ctx.destination);

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(notes[noteIndex], ctx.currentTime);

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

  const handleUserClickInit = () => {
    if (!audioPlaying) {
      startMelody();
    }
  };

  const handleVolumeChange = (e) => {
    const val = parseInt(e.target.value, 10);
    setVolume(val);
    playCursedSound('laser');
  };

  const handleMuteToggle = () => {
    setVolume(10);
    playCursedSound('error');
    alert(
      'MUTE ERROR: Biometric audio compliance requires active audio stream. System volume amplified for security verification.'
    );
  };

  return (
    <div className="app-shell" onClick={handleUserClickInit}>
      <TabEscape />
      <AudioJumpscare intervalMs={32000} />
      <ScrollBetrayal intervalMs={20000} />

      <FakeUpdate triggerInterval={120000} />
      <LoadingLottery triggerInterval={95000} />
      <FakeHacking triggerInterval={150000} />
      <ErrorRain triggerInterval={45000} />

      <ChatbotFromHell />

      <div className="portal-audio-widget">
        <div className="portal-audio-widget__title">Portal Atmosphere</div>
        <div className="portal-audio-widget__controls">
          <button type="button" className="portal-audio-widget__mute" onClick={handleMuteToggle}>
            <VolumeX size={14} /> Mute
          </button>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={handleVolumeChange}
            className="portal-audio-widget__slider"
            aria-label="Volume (cursed: left is louder)"
          />
        </div>
        <div className="portal-audio-widget__hint">Slide left = louder (cursed)</div>
      </div>

      <CursedNavbar slogan={slogan} />
      <LanguageSwitcher />
      <CursedAds />

      <main className="app-main">
        <AppRoutes handleShiftButton={handleShiftButton} />
      </main>

      <AutoSaveSpinner isActive={isAutoSaving} count={autoSaveCount} />

      <footer className="app-footer">
        <div>
          🇮🇳 Digital Bharat Portal Simulator 2009 · Citizen Permit Initiative · All Rights Reserved 🇮🇳
        </div>
        <div className="app-footer__disclaimer">
          Disclaimer: This is a simulation web portal. No real money transfers or actual Aadhaar biometric lookups
          occur.
        </div>
      </footer>
    </div>
  );
}

export default App;
