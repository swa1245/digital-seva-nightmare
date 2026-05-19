import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePopup } from '../../components/Popups/PopupManager';
import { playCursedSound } from '../../hooks/useChaos';
import { Shield, RefreshCw } from 'lucide-react';

import BreathingForm from '../../components/ChaosEffects/BreathingForm';
import ButtonDodge from '../../components/ChaosEffects/ButtonDodge';


const LoginPage = ({ handleShiftButton }) => {
  const navigate = useNavigate();
  const { addPopup } = usePopup();

  // Credentials states
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [terms, setTerms] = useState(false);
  const [captchaInput, setCaptchaInput] = useState('');
  
  // Fake captcha generations
  const [captchaCode, setCaptchaCode] = useState(() => Math.random().toString(36).substr(2, 6).toUpperCase());

  const handleRefreshCaptcha = () => {
    setCaptchaCode(Math.random().toString(36).substr(2, 6).toUpperCase());
    playCursedSound('laser');
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    playCursedSound('beep');

    if (!username || !password) {
      addPopup('confirm', {
        customMessage: 'CRITICAL ERROR: Input credentials cannot be empty! Proceed at your own structural peril?'
      });
      return;
    }

    if (!terms) {
      addPopup('confirm', {
        customMessage: 'REGULATORY COMPLIANCE MANDATE: You must agree to give away your digital soul to continue. Accept?'
      });
      return;
    }

    if (captchaInput.trim().toUpperCase() !== captchaCode) {
      playCursedSound('error');
      alert('AUTHENTICATION EXCEPTION: Captcha text matching failed. Captcha has regenerated.');
      handleRefreshCaptcha();
      setCaptchaInput('');
      return;
    }

    // Delay submission to simulate 2009 slow server request
    addPopup('busy', {
      customMessage: 'Verifying with Department Central Database... Please do not close browser or blink.'
    });

    setTimeout(() => {
      // Trigger "Are you sure you want to log in?" dialog
      addPopup('confirm', {
        customMessage: 'Are you sure that you are the real citizen registered under this username?',
        onConfirm: () => {
          navigate('/application');
        }
      });
    }, 2000);
  };

  return (
    <div className="login-page-container">
      {/* Upper Blinking Warning Banner */}
      <div className="ugly-ad-banner" style={{ width: '100%', maxWidth: '440px' }}>
        <div className="ad-headline">🚨 URGENT PORTAL UPDATE 🚨</div>
        <div className="ad-subtext">
          Portal maintenance scheduled daily from 12:00 AM to 11:59 PM. Please expect delays.
        </div>
      </div>

      <BreathingForm>
        <div className="login-dialog-box">
          <div className="login-titlebar">
            <span>🔐 SECURE CITIZEN LOGIN (V3.4.1-PROD)</span>
            <span style={{ fontSize: '10px', color: '#ffcc00' }}>🇮🇳 Govt. Verified</span>
          </div>

        <form onSubmit={handleFormSubmit} className="login-inner-content">
          <div className="login-welcome-banner">
            <h3>WELCOME TO DIGITAL SEVA SIMULATOR</h3>
            <p>Under Bureaucracy & Permit Allocation Division</p>
          </div>

          {/* Username Group */}
          <div className="input-group">
            <label htmlFor="username">
              Citizen ID / Aadhaar Number <span className="req-asterisk">*</span>
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. 1234-5678-9012"
              maxLength={14}
            />
          </div>

          {/* Password Group */}
          <div className="input-group">
            <label htmlFor="password">
              Digital Pin / Birthplace Password <span className="req-asterisk">*</span>
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="•••••••••••••"
            />
          </div>

          {/* Skew Captcha display box */}
          <div className="captcha-container">
            <div className="captcha-title">Anti-Robot Human Verification</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
              <div className="captcha-display">{captchaCode}</div>
              <button
                type="button"
                onClick={handleRefreshCaptcha}
                style={{
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  color: 'blue',
                }}
                title="Regenerate noise grid"
              >
                <RefreshCw size={18} />
              </button>
            </div>
            <input
              type="text"
              className="captcha-input"
              value={captchaInput}
              onChange={(e) => setCaptchaInput(e.target.value)}
              placeholder="Enter matching text"
              required
            />
          </div>

          {/* Mandatory terms agreements */}
          <label className="terms-checkbox">
            <input
              type="checkbox"
              checked={terms}
              onChange={(e) => {
                playCursedSound('beep');
                setTerms(e.target.checked);
              }}
            />
            <span>
              I hereby agree to the terms of service, which include accepting infinite loading bars, unexpected redirects, random popup interruptions, and sharing my desktop audio details for validation purposes.
            </span>
          </label>

          {/* Action trigger button */}
          <div className="login-actions">
            <div className="btn-submit-container">
              <ButtonDodge threshold={65}>
                <button
                  type="submit"
                  className="cursed-btn-login"
                  onMouseEnter={handleShiftButton}
                >
                  Enter Portal
                </button>
              </ButtonDodge>
            </div>

            <div className="forgot-links">
              <a
                href="#forgot-fingerprint"
                onClick={(e) => {
                  e.preventDefault();
                  addPopup('support', {
                    customMessage: 'Fingerprint retrieval system is offline. Please submit an ink signature in triplicate copy to nearest desk #12.'
                  });
                }}
              >
                Forgot Fingerprint?
              </a>
              <a
                href="#request-forms"
                onClick={(e) => {
                  e.preventDefault();
                  addPopup('confirm', {
                    customMessage: 'Request physical print form? Delivery takes 6-8 weeks via Indian Post. Charge is 499 INR.'
                  });
                }}
              >
                Get PDF via Mail
              </a>
            </div>
          </div>
        </form>
      </div>
    </BreathingForm>

      <div style={{ marginTop: '15px', color: '#ffeb3b', fontSize: '10px', display: 'flex', gap: '5px', alignItems: 'center' }}>
        <Shield size={12} />
        <span>TLS 1.0 Encrypted. Recommended Browser: Internet Explorer 8.0</span>
      </div>
    </div>
  );
};

export default LoginPage;
