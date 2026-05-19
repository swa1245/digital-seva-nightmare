import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertOctagon, RefreshCw } from 'lucide-react';
import { playCursedSound } from '../../hooks/useChaos';
import styles from './FakeUpdate.module.scss';

const FAKE_MESSAGES = [
  "Initialising government security protocols...",
  "Scanning resident biometric credentials...",
  "Verifying compliancy index with Central Hub...",
  "Compiling tax cess surcharge directories...",
  "Applying regulatory delays (Section 12)...",
  "Almost there! Do not turn off your router...",
  "Finalising digital bureaucracy optimization..."
];

export const FakeUpdate = ({ triggerInterval = 45000 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(FAKE_MESSAGES[0]);
  const [isStuck, setIsStuck] = useState(false);

  useEffect(() => {
    const mainTimer = setInterval(() => {
      // 20% chance to trigger update banner periodically
      if (Math.random() < 0.25) {
        setIsVisible(true);
        setProgress(0);
        setIsStuck(false);
        playCursedSound('error');
      }
    }, triggerInterval);

    return () => clearInterval(mainTimer);
  }, [triggerInterval]);

  useEffect(() => {
    if (!isVisible) return;

    let progressTimer;
    const updateProgress = () => {
      setProgress(prev => {
        if (prev >= 99) {
          setIsStuck(true);
          setCurrentMessage("Update halted: Mainframe queue full (Surcharge unpaid). Please click Restart.");
          return 99; // Stuck at 99%
        }
        
        // Random message swaps
        if (Math.random() < 0.3) {
          const idx = Math.floor(Math.random() * FAKE_MESSAGES.length);
          setCurrentMessage(FAKE_MESSAGES[idx]);
        }

        const increment = Math.floor(Math.random() * 8) + 2;
        progressTimer = setTimeout(updateProgress, Math.random() * 800 + 200);
        return Math.min(prev + increment, 99);
      });
    };

    progressTimer = setTimeout(updateProgress, 500);
    return () => clearTimeout(progressTimer);
  }, [isVisible]);

  const handleRestart = () => {
    playCursedSound('laser');
    // 15% chance it completes instantly, 85% chance it hard refreshes the page!
    if (Math.random() < 0.15) {
      setIsVisible(false);
      setProgress(0);
      setIsStuck(false);
      alert("SUCCESS: Update compiled with 0 warning blocks! Thank you for your patriotism.");
    } else {
      window.location.reload();
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className={styles.fullscreenOverlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className={styles.xpUpdateWindow}>
            <div className={styles.titlebar}>
              <span className={styles.titletext}>
                <AlertOctagon size={14} className={styles.pulseIcon} /> CRITICAL GOVERNMENT SYSTEM UPGRADE
              </span>
            </div>

            <div className={styles.body}>
              <div className={styles.warningBox}>
                <span className={styles.warningEmblem}>🚨</span>
                <div>
                  <h4>MANDATORY PROTOCOL: UPDATE SECURITY ENGINE</h4>
                  <p>
                    Your current browser session uses outdated bureaucratic modules. Access to form permits will be blocked until security update V9.8 completes.
                  </p>
                </div>
              </div>

              <div className={styles.progressSection}>
                <div className={styles.statusMsg}>{currentMessage}</div>
                
                <div className={styles.progressBar}>
                  <motion.div 
                    className={styles.progressFill}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className={styles.percentage}>{progress}%</span>
                </div>
              </div>
            </div>

            <div className={styles.footer}>
              {isStuck && (
                <button className={styles.actionBtn} onClick={handleRestart}>
                  <RefreshCw size={12} className={styles.spinIcon} /> Restart Portal Session
                </button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default FakeUpdate;
