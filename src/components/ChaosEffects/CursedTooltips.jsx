import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playCursedSound } from '../../hooks/useChaos';
import styles from './CursedTooltips.module.scss';

const TOOLTIP_QUOTES = [
  "Try believing in yourself.",
  "Button may or may not work depending on local humidity.",
  "Are you truly worthy of this digitised permit?",
  "Clicking this has a 12% probability of wiping your draft.",
  "Under Section 42, clicking constitutes a contract to buy desk tea.",
  "Do not proceed if your biometric card was issued on a Wednesday."
];

export const CursedTooltips = ({ children }) => {
  const [isActive, setIsActive] = useState(false);
  const [quote, setQuote] = useState(TOOLTIP_QUOTES[0]);

  const handleMouseEnter = () => {
    playCursedSound('laser');
    const rand = TOOLTIP_QUOTES[Math.floor(Math.random() * TOOLTIP_QUOTES.length)];
    setQuote(rand);
    setIsActive(true);
  };

  const handleMouseLeave = () => {
    setIsActive(false);
  };

  return (
    <div 
      className={styles.tooltipContainer}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}

      <AnimatePresence>
        {isActive && (
          <motion.div 
            className={styles.giantTooltip}
            initial={{ scale: 0, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0, y: 10 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          >
            <div className={styles.yellowPin}>📌 HELPFUL CITIZEN ADVICE:</div>
            <p className={styles.quoteBody}>"{quote}"</p>
            <div className={styles.warningSub}>
              *Compliance is mandatory. Useless tooltips are funded by tax surcharges.
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CursedTooltips;
