import React, { useEffect } from 'react';
import { playCursedSound } from '../../hooks/useChaos';

export const AudioJumpscare = ({ intervalMs = 25000 }) => {

  const triggerUSBConnectedSound = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      
      // USB Connect sound: two rapid ascending chime pitches
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.type = 'sine';
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      
      // Pitch 1
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.start();
      
      // Pitch 2
      osc.frequency.setValueAtTime(1100, ctx.currentTime + 0.12);
      osc.stop(ctx.currentTime + 0.3);
    } catch (e) {
      console.warn("USB connect sound blocked", e);
    }
  };

  const triggerTypingClatter = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      
      // Spawn rapid typewriter click noises
      let time = ctx.currentTime;
      for (let i = 0; i < 8; i++) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(150 + Math.random() * 300, time);
        gain.gain.setValueAtTime(0.08, time);
        
        osc.start(time);
        osc.stop(time + 0.04);
        time += 0.08 + Math.random() * 0.08;
      }
    } catch (e) {
      console.warn("Typing audio blocked", e);
    }
  };

  const triggerRoboticVoiceAlert = () => {
    try {
      if ('speechSynthesis' in window) {
        const synth = window.speechSynthesis;
        const msgText = "WARNING CITIZEN: A temporary integrity mismatch was detected in your demographic bio-matrix. Please process digital cess fees immediately.";
        const utterance = new SpeechSynthesisUtterance(msgText);
        utterance.rate = 1.0;
        utterance.pitch = 0.6; // robotic pitch
        synth.speak(utterance);
      }
    } catch (e) {
      console.warn("Speech synthesis blocked", e);
    }
  };

  useEffect(() => {
    const jumpscareTimer = setInterval(() => {
      const chance = Math.random();
      
      if (chance < 0.25) {
        // USB connect sound
        triggerUSBConnectedSound();
      } else if (chance < 0.50) {
        // High pitch error buzzer
        playCursedSound('error');
      } else if (chance < 0.75) {
        // Keyboard typing clatter
        triggerTypingClatter();
      } else if (chance < 0.90) {
        // Scary robotic text-to-speech voice
        triggerRoboticVoiceAlert();
      }
    }, intervalMs);

    return () => clearInterval(jumpscareTimer);
  }, [intervalMs]);

  return (
    <span style={{ display: 'none', width: 0, height: 0 }} aria-hidden="true">
      🔊 Audio Jumpscare System Online
    </span>
  );
};

export default AudioJumpscare;
