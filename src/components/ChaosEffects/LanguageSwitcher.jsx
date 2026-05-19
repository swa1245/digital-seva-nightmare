import React, { useState, useEffect } from 'react';
import { playCursedSound } from '../../hooks/useChaos';
import { usePopup } from '../Popups/PopupManager';

export const LanguageSwitcher = () => {
  const { addPopup } = usePopup();
  const [currentLang, setCurrentLang] = useState('en');

  // Trigger random translation disruptions!
  useEffect(() => {
    const langTimer = setInterval(() => {
      if (Math.random() < 0.22) {
        const langs = ['hi', 'wingdings', 'broken'];
        const chosen = langs[Math.floor(Math.random() * langs.length)];
        setCurrentLang(chosen);
        playCursedSound('error');

        // Restore to english after 4 seconds of confusion
        setTimeout(() => {
          setCurrentLang('en');
          playCursedSound('laser');
        }, 4000);
      }
    }, 16000);

    return () => clearInterval(langTimer);
  }, []);

  const handleManualChange = (e) => {
    const val = e.target.value;
    setCurrentLang(val);
    playCursedSound('laser');
    
    if (val !== 'en') {
      addPopup('confirm', {
        customMessage: "TRANSLATION FEE AGREEMENT: Selecting non-English portal scripts incurs a 75 INR/min digitization fee. Add to billing invoice?"
      });
    }
  };

  return (
    <div style={{
      background: '#ffffc0',
      borderBottom: '2px solid #000',
      padding: '4px 10px',
      fontSize: '11px',
      fontFamily: 'sans-serif',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '8px'
    }}>
      <div style={{ fontWeight: 'bold', color: '#c00' }}>
        🌍 TRANSLATION ENGINES: {currentLang === 'en' ? 'ENGLISH (USA)' : currentLang === 'hi' ? 'broken HINDI (हिन्दी)' : currentLang === 'wingdings' ? 'WINGDINGS SYMBOLS (¥€$%@)' : 'BROKEN GLITCH TRANSLATION'}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
        <span style={{ fontWeight: 'bold' }}>Translate Seva Portal:</span>
        <select 
          value={currentLang}
          onChange={handleManualChange}
          style={{
            fontSize: '10px',
            fontFamily: 'monospace',
            padding: '2px'
          }}
        >
          <option value="en">ENGLISH (DEFAULT US)</option>
          <option value="hi">HINDI (हिन्दी LATINIZED)</option>
          <option value="wingdings">WINGDINGS CODE (¥€$%@)</option>
          <option value="broken">BROKEN TRANSLATE (GLITCH)</option>
        </select>
      </div>

      {currentLang !== 'en' && (
        <style>{`
          /* Inject cursed translation style classes on elements when active! */
          body h1, body h2, body h3, body label, body button, body span, body td {
            font-family: ${currentLang === 'wingdings' ? '"Courier New", monospace' : 'inherit'};
            font-style: ${currentLang === 'broken' ? 'italic' : 'normal'};
            text-transform: ${currentLang === 'broken' ? 'lowercase' : 'none'};
            color: ${currentLang === 'hi' ? '#ff8c00' : 'inherit'};
          }
        `}</style>
      )}
    </div>
  );
};

export default LanguageSwitcher;
