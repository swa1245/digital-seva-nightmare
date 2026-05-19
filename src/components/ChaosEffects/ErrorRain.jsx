import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playCursedSound } from '../../hooks/useChaos';
import styles from './ErrorRain.module.scss';

const ERROR_MESSAGES = [
  "Mainframe memory dump failed.",
  "Biometric eyeball mismatch registered.",
  "Aadhaar card details uploaded in lowercase.",
  "Citizen patience levels below 10%.",
  "Tea cup missing on desk #4.",
  "SSL handshake dropped because server is drinking chai.",
  "Administrative signature printed on wrong bond paper.",
  "Surcharge rate increased by 0.5% mid-click."
];

export const ErrorRain = ({ triggerInterval = 20000 }) => {
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    // Periodically spawn a random background error
    const spawnTimer = setInterval(() => {
      if (Math.random() < 0.4) {
        spawnSingleError();
      }
    }, triggerInterval);

    return () => clearInterval(spawnTimer);
  }, [triggerInterval]);

  const spawnSingleError = (coords = null) => {
    playCursedSound('error');
    
    // Choose random location on screen if not specified
    const x = coords ? coords.x : Math.floor(Math.random() * (window.innerWidth - 300));
    const y = coords ? coords.y : Math.floor(Math.random() * (window.innerHeight - 200));
    
    const id = Date.now() + Math.random().toString(36).substr(2, 9);
    const msg = ERROR_MESSAGES[Math.floor(Math.random() * ERROR_MESSAGES.length)];

    setErrors(prev => [...prev, { id, x, y, msg }]);
  };

  const handleClose = (id, currentX, currentY) => {
    // Remove the current error
    setErrors(prev => prev.filter(e => e.id !== id));
    playCursedSound('laser');

    // 30% chance to spawn two new errors in its place!
    if (Math.random() < 0.35) {
      setTimeout(() => {
        spawnSingleError({ x: Math.max(10, currentX - 60), y: Math.max(10, currentY + 30) });
        spawnSingleError({ x: Math.min(window.innerWidth - 320, currentX + 80), y: Math.min(window.innerHeight - 220, currentY - 50) });
      }, 300);
    }
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none', width: '100vw', height: '100vh', zIndex: 99998 }}>
      <AnimatePresence>
        {errors.map(err => (
          <motion.div
            key={err.id}
            className={styles.xpErrorBox}
            style={{ left: err.x, top: err.y }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', damping: 15 }}
          >
            <div className={styles.titlebar}>
              <span className={styles.titleText}>⚠️ DIGITAL SYSTEM EXCEPTION</span>
              <button 
                className={styles.closeBtn} 
                onClick={() => handleClose(err.id, err.x, err.y)}
              >
                X
              </button>
            </div>
            
            <div className={styles.body}>
              <span className={styles.errorSign}>❌</span>
              <div className={styles.messageContent}>
                <h4>ERROR CODE: 0x00000420</h4>
                <p>{err.msg}</p>
              </div>
            </div>

            <div className={styles.footer}>
              <button 
                className={styles.okBtn}
                onClick={() => handleClose(err.id, err.x, err.y)}
              >
                OK
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ErrorRain;
