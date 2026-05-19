import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playCursedSound } from '../../hooks/useChaos';
import styles from './LoadingLottery.module.scss';

const LOTTERY_MESSAGES = [
  "Verifying resident emotional compliance...",
  "Routing documents via government carrier pigeons...",
  "Downloading digital patriotism assets (12MB)...",
  "Calibrating desk #12 tea drinking speed ratio...",
  "Applying 2009 Netscape browser compatibility hacks...",
  "Encrypting biometric files in 8-bit WAV formats...",
  "Requesting physical signatures from mainframe sub-registers..."
];

export const LoadingLottery = ({ triggerInterval = 50000 }) => {
  const [isActive, setIsActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState(LOTTERY_MESSAGES[0]);

  useEffect(() => {
    const mainTimer = setInterval(() => {
      // 20% chance to intercept user navigation with a lottery load
      if (Math.random() < 0.25) {
        setIsActive(true);
        setProgress(0);
        setMessage(LOTTERY_MESSAGES[Math.floor(Math.random() * LOTTERY_MESSAGES.length)]);
        playCursedSound('error');
      }
    }, triggerInterval);

    return () => clearInterval(mainTimer);
  }, [triggerInterval]);

  useEffect(() => {
    if (!isActive) return;

    let progressTimer;
    const animateBar = () => {
      setProgress(prev => {
        if (prev >= 100) {
          setTimeout(() => {
            setIsActive(false);
          }, 800);
          return 100;
        }

        // Randomly slide BACKWARD to frustrate them!
        let next = prev;
        const rand = Math.random();
        if (rand < 0.22 && prev > 15) {
          next -= Math.floor(Math.random() * 12) + 2; // backward jump!
          playCursedSound('dialup');
        } else {
          next += Math.floor(Math.random() * 14) + 3; // forward jump
        }

        // Random message shifts
        if (Math.random() < 0.25) {
          setMessage(LOTTERY_MESSAGES[Math.floor(Math.random() * LOTTERY_MESSAGES.length)]);
        }

        progressTimer = setTimeout(animateBar, Math.random() * 600 + 300);
        return Math.max(0, Math.min(next, 100));
      });
    };

    progressTimer = setTimeout(animateBar, 500);
    return () => clearTimeout(progressTimer);
  }, [isActive]);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div 
          className={styles.lotteryBackdrop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className={styles.dialogXP}>
            <div className={styles.header}>
              <span>🔄 MAINFRAME ENCRYPTION HANDSHAKE</span>
            </div>
            
            <div className={styles.body}>
              <div className={styles.spinnerWrapper}>
                <div className={styles.loadingEmblem}>☸️</div>
              </div>
              
              <div className={styles.contentText}>
                <h4>PORTAL PIPELINE HANDSHAKE</h4>
                <p className={styles.messageBox}>
                  "{message}"
                </p>
                
                <div className={styles.progressHolder}>
                  <motion.div 
                    className={styles.barFill} 
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.2 }}
                  />
                  <span className={styles.percentText}>{progress}% Compiled</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingLottery;
