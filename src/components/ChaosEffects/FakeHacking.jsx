import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playCursedSound } from '../../hooks/useChaos';
import styles from './FakeHacking.module.scss';

const HACKING_LOGS = [
  "INITIALISING PORTAL TERMINAL PROTOCOL...",
  "WARN: UNEXPECTED ROOT PRIVILEGES DETECTED ON PORT 8080",
  "DECRYPTING CITIZEN BIOMETRIC REGISTRY...",
  "CRITICAL: SECURITY ENVELOPE SECTOR #4 COMMITTED LEAK!",
  "REMOVING FILE: /Bureaucracy/Registrar/Bribe_Audit_Log.json",
  "REMOVING FILE: /Aadhaar/Biometrics/Fingerprint_Scans_Draft.db",
  "OVERCLOCKING CPU MAINFRAME DURATION RATIO [3400%]",
  "DOWNLOADING LOCAL INTERNET CAFE PASSWORD LIST...",
  "HACK COMPLETED: CITIZEN PATRIOTISM CONVERTED TO BITCOIN.",
  "CORRECTING HANDSHAKE OVERRIDE..."
];

export const FakeHacking = ({ triggerInterval = 85000 }) => {
  const [isActive, setIsActive] = useState(false);
  const [logs, setLogs] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const triggerTimer = setInterval(() => {
      // 10% chance to trigger hacking simulation
      if (Math.random() < 0.2) {
        setIsActive(true);
        setLogs([HACKING_LOGS[0]]);
        setCurrentIdx(1);
        playCursedSound('error');
      }
    }, triggerInterval);

    return () => clearInterval(triggerTimer);
  }, [triggerInterval]);

  useEffect(() => {
    if (!isActive) return;

    // Type logs one by one rapidly
    const logInterval = setInterval(() => {
      if (currentIdx < HACKING_LOGS.length) {
        setLogs(prev => [...prev, HACKING_LOGS[currentIdx]]);
        setCurrentIdx(prev => prev + 1);
        playCursedSound('beep');
      } else {
        clearInterval(logInterval);
        
        // Conclude hacking simulator
        setTimeout(() => {
          setIsActive(false);
          setLogs([]);
          setCurrentIdx(0);
          playCursedSound('laser');
          alert("MAINFRAME MESSAGE: False alarm. Probably. Re-routing citizen browser session.");
        }, 1500);
      }
    }, 600);

    return () => clearInterval(logInterval);
  }, [isActive, currentIdx]);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div 
          className={styles.hackingOverlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Pulsing red alarm frame */}
          <div className={styles.sirenOverlay} />

          <div className={styles.terminalBox}>
            <div className={styles.terminalHeader}>
              <span>⚠️ SYSTEM INTEGRITY EMERGENCY REPORT ⚠️</span>
            </div>
            
            <div className={styles.terminalBody}>
              <div className={styles.bigWarning}>
                SYSTEM BREACH IDENTIFIED IN SECTOR #12
              </div>
              
              <div className={styles.logWindow}>
                {logs.map((log, index) => (
                  <div key={index} className={styles.logLine}>
                    {`root@digital-seva:~$ `}
                    <span className={log.includes("CRITICAL") || log.includes("REMOVING") ? styles.redText : styles.greenText}>
                      {log}
                    </span>
                  </div>
                ))}
                <div className={styles.cursorBlink} />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FakeHacking;
