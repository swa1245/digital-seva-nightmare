import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playCursedSound } from '../../hooks/useChaos';

export const TabEscape = () => {
  const [isEscaped, setIsEscaped] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [originalTitle] = useState(() => document.title);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Tab hidden! Escaping deserter identified!
        document.title = "🚨 DESERTER DETECTED: RETURN NOW! 🇮🇳";
        playCursedSound('error');
      } else {
        // Returned to tab, slap them with a penalty lock overlay!
        document.title = originalTitle;
        setIsEscaped(true);
        setCountdown(5);
        playCursedSound('error');
      }
    };

    const handleMouseLeave = (e) => {
      // If mouse goes off the top border (attempting to close or change url)
      if (e.clientY < 0) {
        document.title = "⚠️ AADHAAR SESSION TERMINATION LOCK ACTIVE";
      }
    };

    const handleMouseEnter = () => {
      document.title = originalTitle;
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [originalTitle]);

  useEffect(() => {
    if (!isEscaped) return;

    if (countdown <= 0) {
      setIsEscaped(false);
      playCursedSound('laser');
      return;
    }

    const timer = setTimeout(() => {
      setCountdown(prev => prev - 1);
      playCursedSound('beep');
    }, 1000);

    return () => clearTimeout(timer);
  }, [isEscaped, countdown]);

  return (
    <AnimatePresence>
      {isEscaped && (
        <motion.div
          style={{
            position: 'fixed',
            top: 0, left: 0,
            width: '100vw', height: '100vh',
            backgroundColor: 'rgba(139,0,0,0.95)', // Blood red overlay
            color: '#fff',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 100005,
            pointerEvents: 'auto',
            textAlign: 'center',
            padding: '20px',
            fontFamily: 'Impact, sans-serif'
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div style={{
            background: '#d4d0c8',
            border: '4px double #ff0000',
            boxShadow: '10px 10px 0px rgba(0,0,0,0.8)',
            padding: '25px',
            maxWidth: '450px',
            color: '#000'
          }}>
            <h3 style={{ color: '#ff0000', fontSize: '22px', marginBottom: '15px' }}>
              🇮🇳 CITIZEN DESERTION IDENTIFIED
            </h3>
            <p style={{ fontFamily: 'Georgia, serif', fontSize: '13px', lineHeight: '1.4', marginBottom: '20px', fontWeight: 'bold' }}>
              You temporarily focused away from the secure Digital Seva Permitting session. Under regulatory Paragraph 49B, abandoning active draft files triggers re-authentication delay gates.
            </p>
            
            <div style={{
              background: '#000',
              color: '#0f0',
              fontFamily: 'monospace',
              padding: '10px',
              fontSize: '18px',
              fontWeight: 'bold',
              border: '2px dashed #0f0',
              marginBottom: '15px'
            }}>
              LOCK DOWN ACTIVE: {countdown}s
            </div>

            <p style={{ fontSize: '10px', color: '#555', fontFamily: 'sans-serif' }}>
              *Please remain focused on your screen biometric area. Lock will lift automatically.
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TabEscape;
