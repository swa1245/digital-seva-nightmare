import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playCursedSound } from '../../hooks/useChaos';

const CONFIRM_STEPS = [
  {
    title: "⚠️ STAGE 1/4: GENERAL VERIFICATION",
    message: "Are you absolutely, positively sure you want to perform this permit action? Any digital mistake may result in biometric termination.",
    okLabel: "Definitely Yes",
    cancelLabel: "Return to Safety"
  },
  {
    title: "❤️ STAGE 2/4: PSYCHOLOGICAL ALIGNMENT",
    message: "Are you emotionally prepared to commit these values to the digital registry? Please breathe in for 4 seconds before continuing.",
    okLabel: "I Agree Emotionally",
    cancelLabel: "Cancel Draft"
  },
  {
    title: "📋 STAGE 3/4: BUREAUCRATIC CERTIFICATION",
    message: "Do you solemnly swear that you have checked the alternate alternate desk #12 timings at New Delhi hub?",
    okLabel: "Absolutely",
    cancelLabel: "Return to Form"
  },
  {
    title: "🚨 STAGE 4/4: ABSOLUTE FINALITY Check",
    message: "This action is 100% permanent. Are you REALLY, TRULY, METAPHYSICALLY SURE you want to continue?",
    okLabel: "OK (Charge My Account)",
    cancelLabel: "Cancel Everything"
  }
];

export const ConfirmationHell = ({ isOpen, onConfirm, onCancel }) => {
  const [stepIdx, setStepIdx] = useState(0);

  if (!isOpen) return null;

  const handleNextStep = () => {
    playCursedSound('laser');
    if (stepIdx < CONFIRM_STEPS.length - 1) {
      setStepIdx(prev => prev + 1);
    } else {
      // Completed all steps!
      setStepIdx(0);
      onConfirm();
    }
  };

  const handleCancelClick = () => {
    playCursedSound('error');
    setStepIdx(0);
    onCancel();
    alert("TRANSACTION COMPLIANCE WARNING: Confirmation chain broken. Re-verify document details.");
  };

  const currentStep = CONFIRM_STEPS[stepIdx];

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0,
      width: '100vw', height: '100vh',
      backgroundColor: 'rgba(0,0,0,0.7)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 100002,
      pointerEvents: 'auto'
    }}>
      <motion.div
        style={{
          backgroundColor: '#d4d0c8',
          borderTop: '2px solid #fff',
          borderLeft: '2px solid #fff',
          borderRight: '2px solid #404040',
          borderBottom: '2px solid #404040',
          width: '90%',
          maxWidth: '400px',
          boxShadow: '8px 8px 0px rgba(0,0,0,0.7)',
          padding: '3px',
          fontFamily: 'Arial, sans-serif'
        }}
        initial={{ scale: 0.9, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 30 }}
      >
        <div style={{
          background: 'linear-gradient(90deg, #8b0000, #ff0000)',
          color: '#fff',
          fontWeight: 'bold',
          padding: '4px 8px',
          fontSize: '11px',
          letterSpacing: '1px',
          textAlign: 'left'
        }}>
          {currentStep.title}
        </div>

        <div style={{ padding: '20px 15px', textAlign: 'left', color: '#000' }}>
          <p style={{
            fontSize: '12px',
            lineHeight: '1.4',
            fontFamily: 'Georgia, serif',
            fontWeight: 'bold',
            marginBottom: '15px'
          }}>
            {currentStep.message}
          </p>
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '10px',
          padding: '8px 15px',
          borderTop: '1px solid #c0c0c0'
        }}>
          {/* Cursed: Cancel button is labeled as the positive one on some steps! Let's swap styles occasionally */}
          <button
            onClick={handleCancelClick}
            style={{
              backgroundColor: '#d4d0c8',
              borderTop: '2px solid #fff',
              borderLeft: '2px solid #fff',
              borderRight: '2px solid #404040',
              borderBottom: '2px solid #404040',
              padding: '4px 10px',
              fontSize: '11px',
              fontWeight: 'bold',
              cursor: 'help'
            }}
          >
            {currentStep.cancelLabel}
          </button>
          
          <button
            onClick={handleNextStep}
            style={{
              backgroundColor: '#ff00ff', // Annoying magenta for OK
              color: '#fff',
              borderTop: '2px solid #fff',
              borderLeft: '2px solid #fff',
              borderRight: '2px solid #404040',
              borderBottom: '2px solid #404040',
              padding: '4px 15px',
              fontSize: '11px',
              fontWeight: 'bold',
              cursor: 'crosshair'
            }}
          >
            {currentStep.okLabel}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ConfirmationHell;
