import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playCursedSound } from '../../hooks/useChaos';
import styles from './ChatbotFromHell.module.scss';

const BABUJI_QUOTES = [
  "I noticed you are filling a form! Did you know desk #12 closes for tea in 2 minutes?",
  "Please avoid clicking back button, or we will have to call support hotline #1800.",
  "Have you submitted your ink signatures in triplicate copies yet?",
  "Are you feeling emotionally patriotic today? Excellent.",
  "Your cursor is hovering near administrative input blocks. Proceed with caution."
];

export const ChatbotFromHell = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [quote, setQuote] = useState(BABUJI_QUOTES[0]);
  const [captchaInput, setCaptchaInput] = useState('');
  const [showComplianceCheck, setShowComplianceCheck] = useState(false);

  useEffect(() => {
    // Babuji speaks random wisdom every 18 seconds
    const talkTimer = setInterval(() => {
      if (isOpen && !showComplianceCheck) {
        const rand = BABUJI_QUOTES[Math.floor(Math.random() * BABUJI_QUOTES.length)];
        setQuote(rand);
        playCursedSound('laser');
      }
    }, 18000);

    return () => clearInterval(talkTimer);
  }, [isOpen, showComplianceCheck]);

  const handleCloseAttempt = () => {
    playCursedSound('error');
    setShowComplianceCheck(true);
  };

  const handleComplianceSubmit = (e) => {
    e.preventDefault();
    if (captchaInput.trim().toUpperCase() === 'CHAI') {
      playCursedSound('laser');
      setIsOpen(false);
      setShowComplianceCheck(false);
      setCaptchaInput('');
      
      // Auto-open again after 8 seconds of pure silence! Cursed!
      setTimeout(() => {
        setIsOpen(true);
        setQuote("I am back! Your profile draft has been saved. Did you miss my guidance?");
        playCursedSound('error');
      }, 8000);
    } else {
      playCursedSound('error');
      alert("WARNING: Incorrect bribe code! Babuji refuses to be closed.");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className={styles.babujiWrapper}
          initial={{ y: 350, scale: 0.8 }}
          animate={{ y: 0, scale: 1 }}
          exit={{ y: 350, scale: 0.8 }}
          transition={{ type: 'spring', stiffness: 100 }}
        >
          <div className={styles.speechBubble}>
            {!showComplianceCheck ? (
              <>
                <div className={styles.bubbleTitle}>Gov-Babuji Assistant:</div>
                <p className={styles.quoteText}>"{quote}"</p>
                <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                  <button onClick={() => {
                    setQuote("Excellent! Keep complying with local digital policies.");
                    playCursedSound('laser');
                  }} className={styles.miniBtn}>I Understand</button>
                  <button onClick={handleCloseAttempt} className={styles.miniBtn} style={{ background: '#e04040', color: '#fff' }}>Mute Babuji</button>
                </div>
              </>
            ) : (
              <form onSubmit={handleComplianceSubmit} className={styles.complianceForm}>
                <div className={styles.bubbleTitle} style={{ color: 'red' }}>⚠️ SECURITY BRACKET CESS WARNING</div>
                <p style={{ fontSize: '9px', marginBottom: '6px' }}>
                  Closing Gov-Babuji requires buying him a virtual hot tea. Type 'CHAI' below to confirm payment consent.
                </p>
                <input
                  type="text"
                  value={captchaInput}
                  onChange={(e) => setCaptchaInput(e.target.value)}
                  placeholder="Type CHAI"
                  style={{ width: '100%', fontSize: '11px', textAlign: 'center', textTransform: 'uppercase' }}
                  required
                />
                <div style={{ display: 'flex', gap: '5px', marginTop: '8px' }}>
                  <button type="submit" className={styles.miniBtn}>Accept Tea Cost</button>
                  <button type="button" onClick={() => setShowComplianceCheck(false)} className={styles.miniBtn}>Cancel Mute</button>
                </div>
              </form>
            )}
          </div>

          {/* Babuji Clipart Face Representation */}
          <div className={styles.avatarImg} onClick={() => {
            playCursedSound('laser');
            setQuote("Ouch! Please do not click my spectacles.");
          }}>
            👴🏽💬
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ChatbotFromHell;
