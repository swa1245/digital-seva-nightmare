import React, { createContext, useContext, useState, useCallback } from 'react';
import { X, ShieldAlert, PhoneCall, HelpCircle, HardDrive, RefreshCw } from 'lucide-react';
import { playCursedSound } from '../../hooks/useChaos';

const PopupContext = createContext(null);

export const usePopup = () => {
  const context = useContext(PopupContext);
  if (!context) throw new Error('usePopup must be used within a PopupProvider');
  return context;
};

export const PopupProvider = ({ children }) => {
  const [popups, setPopups] = useState([]);

  const addPopup = useCallback((type, customProps = {}) => {
    const id = Date.now() + Math.random().toString(36).substr(2, 9);
    // Random offsets to make windows look messy and stacked
    const x = Math.floor(Math.random() * 40) - 20;
    const y = Math.floor(Math.random() * 40) - 20;

    setPopups(prev => [
      ...prev,
      {
        id,
        type,
        x,
        y,
        ...customProps
      }
    ]);
    playCursedSound('error');
  }, []);

  const closePopup = useCallback((id) => {
    setPopups(prev => prev.filter(p => p.id !== id));
    playCursedSound('laser');
  }, []);

  const clearAllPopups = useCallback(() => {
    setPopups([]);
  }, []);

  return (
    <PopupContext.Provider value={{ popups, addPopup, closePopup, clearAllPopups }}>
      {children}
      <PopupRenderer />
    </PopupContext.Provider>
  );
};

const PopupRenderer = () => {
  const { popups, closePopup } = usePopup();

  if (popups.length === 0) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none', zIndex: 9999 }}>
      {popups.map((popup) => (
        <PopupInstance key={popup.id} popup={popup} onClose={() => closePopup(popup.id)} />
      ))}
    </div>
  );
};

const PopupInstance = ({ popup, onClose }) => {
  const { id, type, x, y, customTitle, customMessage, onConfirm } = popup;
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaCode, setCaptchaCode] = useState(() => Math.random().toString(36).substr(2, 5).toUpperCase());
  const [closeShift, setCloseShift] = useState({ x: 0, y: 0 });
  const [moveCount, setMoveCount] = useState(0);

  // Moving close button logic
  const handleCloseHover = () => {
    if (moveCount < 3) {
      // Displace button slightly to annoy them
      const rx = (Math.random() - 0.5) * 80;
      const ry = (Math.random() - 0.5) * 80;
      setCloseShift({ x: rx, y: ry });
      setMoveCount(prev => prev + 1);
      playCursedSound('laser');
    }
  };

  const resetCloseBtn = () => {
    setCloseShift({ x: 0, y: 0 });
  };

  const handleCaptchaSubmit = (e) => {
    e.preventDefault();
    if (captchaInput.trim().toUpperCase() === captchaCode) {
      onClose();
    } else {
      playCursedSound('error');
      setCaptchaCode(Math.random().toString(36).substr(2, 5).toUpperCase());
      setCaptchaInput('');
      alert('INCORRECT CAPTCHA! Security validation has reset.');
    }
  };

  // Drag simulation / random placement style
  const inlineStyle = {
    position: 'fixed',
    top: `calc(50% + ${y}px)`,
    left: `calc(50% + ${x}px)`,
    transform: 'translate(-50%, -50%)',
    pointerEvents: 'auto',
  };

  // Renders different types of cursed dialog boxes
  switch (type) {
    case 'virus':
      return (
        <div style={inlineStyle} className="winxp-popup virus-alert">
          <div className="popup-titlebar">
            <span className="title-text">
              <ShieldAlert size={14} color="red" /> VIRUS ALERT: MALICIOUS ACTIVITY
            </span>
            <div className="close-btn-container">
              <button
                className="winxp-close-btn"
                style={{ transform: `translate(${closeShift.x}px, ${closeShift.y}px)` }}
                onMouseEnter={handleCloseHover}
                onClick={onClose}
              >
                X
              </button>
            </div>
          </div>
          <div className="popup-body">
            <div className="popup-icon-content">
              <span className="popup-icon">☣️</span>
              <div className="popup-text">
                <h4>System Registry Corrupted!</h4>
                <p>
                  A non-compliant Indian Cyber Crime Bureau (ICCB) certificate was detected in your active browser session! Aadhaar biometric credentials may be compromised.
                </p>
                <strong style={{ color: 'red', display: 'block', marginBottom: '8px' }}>
                  Do not turn off your computer!
                </strong>
              </div>
            </div>
          </div>
          <div className="popup-footer">
            <button onClick={onClose}>Ignore Danger</button>
            <button className="reversed-btn-ok" onClick={() => {
              alert('Scanning... 0% completed. System scan has been put on Hold due to insufficient administrative permit. Please try paying fee first.');
              onClose();
            }}>
              Run Quick Scan (1000 INR)
            </button>
          </div>
        </div>
      );

    case 'support':
      return (
        <div style={inlineStyle} className="winxp-popup">
          <div className="popup-titlebar">
            <span className="title-text">
              <PhoneCall size={14} /> CITIZEN SUPPORT DIRECTORY
            </span>
            <button className="winxp-close-btn" onClick={onClose}>X</button>
          </div>
          <div className="popup-body">
            <div className="popup-icon-content">
              <span className="popup-icon">📞</span>
              <div className="popup-text">
                <h4>Confused? Need Immediate Bureaucratic Assistance?</h4>
                <p>
                  Our hotlines are open from 10:15 AM to 10:20 AM on alternating alternate Tuesdays.
                </p>
                <div style={{ background: '#000', color: '#0f0', padding: '8px', fontFamily: 'monospace', textAlign: 'center', fontSize: '14px', marginBottom: '10px' }}>
                  CALL SUPPORT: 1800-420-6969
                </div>
                <p style={{ fontSize: '10px', color: '#666' }}>
                  *Standard ISD/STD charges of 45 INR/min apply. Wait time may exceed 340 minutes.
                </p>
              </div>
            </div>
          </div>
          <div className="popup-footer">
            <button onClick={onClose}>Call Later</button>
            <button className="reversed-btn-ok" onClick={() => {
              alert('Initiating fake audio call... Connecting to Desk #4. Ringing...');
              onClose();
            }}>
              Dial Support Now
            </button>
          </div>
        </div>
      );

    case 'speedLimit':
      return (
        <div style={inlineStyle} className="winxp-popup">
          <div className="popup-titlebar">
            <span className="title-text">
              <HelpCircle size={14} /> SECURITY CHECK: PATIENCE CHECK
            </span>
            <button className="winxp-close-btn" onClick={onClose}>X</button>
          </div>
          <form onSubmit={handleCaptchaSubmit} className="popup-body">
            <div className="popup-icon-content">
              <span className="popup-icon">⚠️</span>
              <div className="popup-text">
                <h4>Biometric Speed Warning!</h4>
                <p>
                  Your cursor moved too fast! Please enter the security captcha code below to confirm you are not an automated hyper-active web crawler.
                </p>
                <div className="captcha-box">
                  <div className="captcha-text">{captchaCode}</div>
                  <input
                    type="text"
                    value={captchaInput}
                    onChange={(e) => setCaptchaInput(e.target.value)}
                    placeholder="Enter skews"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="popup-footer" style={{ border: 'none', padding: '5px 0 0 0' }}>
              <button type="submit" className="reversed-btn-ok">Validate Self</button>
            </div>
          </form>
        </div>
      );

    case 'adhaarCons':
      return (
        <div style={inlineStyle} className="winxp-popup">
          <div className="popup-titlebar">
            <span className="title-text">
              <HardDrive size={14} /> PRIVACY CONSENT PORTAL
            </span>
            <button className="winxp-close-btn" onClick={onClose}>X</button>
          </div>
          <div className="popup-body">
            <p style={{ fontWeight: 'bold', marginBottom: '8px' }}>
              Terms of Data Sharing agreement (Paragraph 12.1.9):
            </p>
            <div style={{ height: '80px', overflowY: 'scroll', border: '1px inset #808080', background: '#fff', padding: '5px', fontSize: '11px', fontFamily: 'serif', marginBottom: '10px' }}>
              I hereby authorize the Digital India Bureaucracy Division to sell, monetize, distribute, and auction my biometric details, home addresses, bank credentials, and favorite tea stall location to third-party telemarketing firms, insurance providers, and local credit agencies in exchange for processing my portal files. I understand that this consent is fully mandatory and irreversible.
            </div>
            <p style={{ fontSize: '11px', color: 'red' }}>
              *Unchecking this will result in immediate file deletion.
            </p>
          </div>
          <div className="popup-footer">
            <button onClick={() => {
              alert('Error: Opt-out disabled under standard regulatory mandates. Consent has been automatically granted.');
              onClose();
            }}>
              Refuse (Fines Apply)
            </button>
            <button className="reversed-btn-ok" onClick={onClose}>
              I Fully Consent
            </button>
          </div>
        </div>
      );

    case 'busy':
      return (
        <div style={inlineStyle} className="winxp-popup">
          <div className="popup-titlebar">
            <span className="title-text">
              <RefreshCw size={14} className="spinning" /> SERVICE OVERLOAD: WAIT QUEUE
            </span>
            <button className="winxp-close-btn" onClick={onClose}>X</button>
          </div>
          <div className="popup-body">
            <div style={{ textAlign: 'center', padding: '10px 0' }}>
              <p style={{ fontStyle: 'italic', marginBottom: '15px' }}>
                "Current queue status: 45,920 applicants ahead of you."
              </p>
              <div style={{ width: '100%', height: '14px', background: '#ccc', border: '1px solid #777', overflow: 'hidden' }}>
                <div style={{ width: '45%', height: '100%', background: 'blue', animation: 'bar-bounce 2s infinite ease-in-out' }}></div>
              </div>
              <style>{`
                @keyframes bar-bounce {
                  0% { transform: translateX(-100%); }
                  100% { transform: translateX(200%); }
                }
              `}</style>
            </div>
          </div>
          <div className="popup-footer">
            <button onClick={() => {
              alert('Refreshing connection. Please stand by for another 3 hours.');
              onClose();
            }}>
              Force Refresh
            </button>
            <button className="reversed-btn-ok" onClick={onClose}>
              Wait Patiently
            </button>
          </div>
        </div>
      );

    // Custom alerts
    case 'confirm':
      return (
        <div style={inlineStyle} className="winxp-popup">
          <div className="popup-titlebar">
            <span className="title-text">⚠️ ACTION CONFIRMATION</span>
            <button className="winxp-close-btn" onClick={onClose}>X</button>
          </div>
          <div className="popup-body">
            <p style={{ fontWeight: 'bold' }}>{customMessage || 'Are you absolutely sure you want to do this?'}</p>
          </div>
          <div className="popup-footer">
            {/* Reversed labels to trick users */}
            <button onClick={onClose}>OK</button>
            <button className="reversed-btn-ok" onClick={() => {
              if (onConfirm) onConfirm();
              onClose();
            }}>
              Cancel
            </button>
          </div>
        </div>
      );

    default:
      return (
        <div style={inlineStyle} className="winxp-popup">
          <div className="popup-titlebar">
            <span className="title-text">{customTitle || 'Portal Alert'}</span>
            <button className="winxp-close-btn" onClick={onClose}>X</button>
          </div>
          <div className="popup-body">
            <p>{customMessage || 'An unknown digital error occurred. Form saved automatically.'}</p>
          </div>
          <div className="popup-footer">
            <button onClick={onClose}>Acknowledge</button>
          </div>
        </div>
      );
  }
};
