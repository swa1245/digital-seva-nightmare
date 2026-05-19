import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { playCursedSound } from '../../hooks/useChaos';
import styles from './BreathingForm.module.scss';

export const BreathingForm = ({ children }) => {
  const [isTyping, setIsTyping] = useState(false);

  const handleInputFocus = () => {
    setIsTyping(true);
  };

  const handleInputBlur = () => {
    setIsTyping(false);
  };

  return (
    <motion.div
      className={styles.breathingFormWrapper}
      // Slowly sway form left/right
      animate={{
        x: [0, -12, 12, 0],
        y: [0, 6, -6, 0]
      }}
      transition={{
        repeat: Infinity,
        duration: 8,
        ease: 'easeInOut'
      }}
      onKeyDown={handleInputFocus}
      onKeyUp={handleInputBlur}
    >
      <div className={`${styles.innerCard} ${isTyping ? styles.focusedPulse : ''}`}>
        {children}
      </div>
    </motion.div>
  );
};

export default BreathingForm;
