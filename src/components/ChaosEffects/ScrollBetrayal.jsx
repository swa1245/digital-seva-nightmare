import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playCursedSound } from '../../hooks/useChaos';

export const ScrollBetrayal = ({ intervalMs = 14000 }) => {
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    const scrollTimer = setInterval(() => {
      // 30% chance to betray their scroll position!
      if (Math.random() < 0.4) {
        const rand = Math.random();
        
        playCursedSound('laser');
        
        if (rand < 0.7) {
          // Scroll slightly upward
          window.scrollBy({ top: -180, behavior: 'smooth' });
          triggerToast("Viewport alignment reset: Correcting citizen posture index.");
        } else {
          // Scroll to completely random element height
          const scrollHeights = [0, document.body.scrollHeight / 3, document.body.scrollHeight / 2];
          const target = scrollHeights[Math.floor(Math.random() * scrollHeights.length)];
          window.scrollTo({ top: target, behavior: 'smooth' });
          triggerToast("Session draft security refreshed: Validating bottom section permits.");
        }
      }
    }, intervalMs);

    return () => clearInterval(scrollTimer);
  }, [intervalMs]);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500); // show for 3.5s
  };

  return (
    <AnimatePresence>
      {toastMessage && (
        <motion.div
          style={{
            position: 'fixed',
            top: '80px',
            right: '20px',
            backgroundColor: '#000080',
            color: '#00ff00',
            border: '2px dashed #00ff00',
            padding: '8px 15px',
            fontFamily: 'Courier New, monospace',
            fontSize: '11px',
            boxShadow: '4px 4px 0px rgba(0,0,0,0.6)',
            zIndex: 999999,
            maxWidth: '300px',
            textAlign: 'left'
          }}
          initial={{ x: 350, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 350, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 120 }}
        >
          <div style={{ fontWeight: 'bold', marginBottom: '4px', textDecoration: 'blink' }}>
            🔄 BIOMETRIC SIGNAL RE-ALIGNMENT
          </div>
          <p>{toastMessage}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollBetrayal;
