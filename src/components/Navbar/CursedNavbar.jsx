import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { ShieldAlert, HelpCircle } from 'lucide-react';

const CursedNavbar = ({ slogan }) => {
  // Annoying clock running backward!
  const [fakeTime, setFakeTime] = useState('');

  useEffect(() => {
    let baseTime = new Date('May 19, 2009 12:00:00');
    const interval = setInterval(() => {
      // Subtract 1 second instead of adding!
      baseTime = new Date(baseTime.getTime() - 1000);
      setFakeTime(baseTime.toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {/* Primary National Bureaucracy Header */}
      <header className="gov-header">
        <div className="emblem-container">
          <div className="emblem-img spinning" style={{ fontSize: '42px', userSelect: 'none' }}>
            ☸️
          </div>
          <div>
            <h1 className="gov-title">GOVERNMENT OF BHARAT</h1>
            <p className="gov-subtitle">National Digital Seva & Permit Allotment Hub (NSWMDCISSP)</p>
          </div>
          <div className="emblem-img spinning" style={{ fontSize: '42px', userSelect: 'none' }}>
            ☸️
          </div>
        </div>
      </header>

      {/* Scrolling Digital News Ticker */}
      <div className="marquee-ticker">
        <div className="marquee-content">
          🚨 WELCOME TO THE DIGITAL SEVA HUB SIMULATOR. PLEASE DO NOT PRESS BACKSPACE KEY OR SUBMIT BRIBES IN CHAT. 🚨
          PORTAL VERSION V3.4.1 (COMPATIBLE WITH INTERNET EXPLORER 8+ AND OPERA MINI). 🚨
          TOTAL ONLINE APPLICATION QUEUE: 42,912 CITIZENS. 🚨
        </div>
      </div>

      {/* Blinking Slogan Banner */}
      <div className="slogan-ticker">
        🇮🇳 {slogan} 🇮🇳
      </div>

      {/* Primary Navigation System */}
      <nav className="cursed-navbar">
        <NavLink to="/login" className={({ isActive }) => isActive ? 'active' : ''}>
          🔐 CITIZEN LOGIN
        </NavLink>
        <NavLink to="/application" className={({ isActive }) => isActive ? 'active' : ''}>
          📝 FILL APPLICATION #420
        </NavLink>
        <NavLink to="/payment" className={({ isActive }) => isActive ? 'active' : ''}>
          💳 GATEWAY & PAYMENT
        </NavLink>

        {/* Cursed backward running clock widget */}
        <div style={{
          color: '#0f0',
          fontFamily: 'monospace',
          background: '#000',
          border: '1px double #0f0',
          padding: '2px 8px',
          fontSize: '11px',
          display: 'flex',
          alignItems: 'center',
          gap: '5px'
        }}>
          <span>⏳ SECURE XP-TIME:</span>
          <span style={{ fontWeight: 'bold' }}>{fakeTime || '12:00:00 PM'}</span>
        </div>
      </nav>
    </div>
  );
};

export default CursedNavbar;
