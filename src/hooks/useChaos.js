import { useState, useEffect, useCallback } from 'react';

// Web Audio API annoying sound generator
export const playCursedSound = (type = 'beep') => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'beep') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime); // High pitch beep
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } else if (type === 'laser') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(1200, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.3);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } else if (type === 'error') {
      // Annoying retro chord buzzer
      osc.type = 'square';
      osc.frequency.setValueAtTime(110, ctx.currentTime);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      osc.start();
      
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'square';
      osc2.frequency.setValueAtTime(115, ctx.currentTime);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      gain2.gain.setValueAtTime(0.2, ctx.currentTime);
      osc2.start();

      osc.stop(ctx.currentTime + 0.4);
      osc2.stop(ctx.currentTime + 0.4);
    } else if (type === 'dialup') {
      // Classic modem pitch
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(350, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(440, ctx.currentTime + 0.2);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    }
  } catch (err) {
    console.warn('Audio play blocked or unsupported', err);
  }
};

const GOVERNMENT_SLOGANS = [
  "DESH BADAL RAHA HAI, PERMIT LINE CHHOTI HO RAHI HAI! (Slogan #49B)",
  "DIGITAL BHARAT: ONE CARD, ONE NATION, ZERO CUSTOMER SERVICE.",
  "DO NOT BE IMPATIENT. PATIENCE IS A CIVIC DUTY UNDER SECTION 88(A).",
  "SAY NO TO BRIBES (OFFLINE). PLEASE SUBMIT DIGITALLY VIA SURCHARGE CHANNELS.",
  "SPEED LIMIT OF PERMIT DOWNLOAD IS CAPPED AT 25 KBPS FOR NATIONAL SECURITY.",
  "CLEAN INDIA, GREEN INDIA, FULLY LOADED JAVASCRIPT INDIA.",
  "SUPPORT DIGITAL INDIA: KEEP FILLING THE FORM. DO NOT EXIT THE TAB.",
  "AADHAAR IS SOLEMN STRENGTH. PLEASE RE-ENTER CAPTCHA NOW."
];

export const useChaos = (popupManager) => {
  const [slogan, setSlogan] = useState(GOVERNMENT_SLOGANS[0]);
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [autoSaveCount, setAutoSaveCount] = useState(0);

  // Rotate Slogans
  useEffect(() => {
    const timer = setInterval(() => {
      const idx = Math.floor(Math.random() * GOVERNMENT_SLOGANS.length);
      setSlogan(GOVERNMENT_SLOGANS[idx]);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  // Periodic Auto-Save blocker effect
  useEffect(() => {
    const timer = setInterval(() => {
      setIsAutoSaving(true);
      playCursedSound('dialup');
      setAutoSaveCount(prev => prev + 1);
      setTimeout(() => {
        setIsAutoSaving(false);
      }, 1500); // UI freeze illusion
    }, 12000); // trigger every 12s
    return () => clearInterval(timer);
  }, []);

  // Random annoying popups
  useEffect(() => {
    if (!popupManager) return;
    
    const triggerRandomPopup = () => {
      const popupTypes = ['support', 'virus', 'speedLimit', 'adhaarCons', 'busy'];
      const chosenType = popupTypes[Math.floor(Math.random() * popupTypes.length)];
      
      popupManager.addPopup(chosenType);
      playCursedSound('error');
    };

    const timer = setInterval(() => {
      // 25% chance to throw a popup every 15 seconds
      if (Math.random() < 0.3) {
        triggerRandomPopup();
      }
    }, 15000);

    return () => clearInterval(timer);
  }, [popupManager]);

  // Shifting button logic
  const handleShiftButton = useCallback((e) => {
    const btn = e.target;
    // Displace by random pixels (range -60px to 60px)
    const randomX = (Math.random() - 0.5) * 120;
    const randomY = (Math.random() - 0.5) * 80;
    btn.style.transform = `translate(${randomX}px, ${randomY}px)`;
    playCursedSound('laser');
    
    // Reset position after 1.5 seconds so they can actually click it if they are fast
    setTimeout(() => {
      btn.style.transform = 'translate(0, 0)';
    }, 1500);
  }, []);

  return {
    slogan,
    isAutoSaving,
    autoSaveCount,
    handleShiftButton
  };
};
