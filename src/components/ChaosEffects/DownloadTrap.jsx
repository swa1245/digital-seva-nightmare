import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { playCursedSound } from '../../hooks/useChaos';
import { usePopup } from '../Popups/PopupManager';

export const DownloadTrap = () => {
  const { addPopup } = usePopup();
  const [clickCount, setClickCount] = useState(0);

  const triggerDownloadFile = (filename, fileText) => {
    const blob = new Blob([fileText], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    playCursedSound('laser');
  };

  const handleDownload = (e) => {
    e.preventDefault();
    const nextClick = clickCount + 1;
    setClickCount(nextClick);

    if (nextClick === 1) {
      addPopup('confirm', {
        customMessage: "SECURE ROUTE CHECK: System registry detected missing security drivers. Download digital antivirus first?"
      });
      triggerDownloadFile(
        "digital_india_antivirus_registry.bat",
        "@echo off\necho Initiating digital antivirus registry optimization...\necho Complete! No real registry keys were harmed.\npause"
      );
    } else if (nextClick === 2) {
      addPopup('support', {
        customMessage: "BILLING ALERT: Surcharge tax receipt missing. Downloading tea expense declaration instead."
      });
      triggerDownloadFile(
        "maternal_heritage_bribe_surcharges.txt",
        "CITIZEN CHARGE SHEET RECORD:\nConvenience cess: 1500 INR\nChai allowance fine: 500 INR\nThank you for your digital patriotism."
      );
    } else {
      // Third time is the charm!
      addPopup('confirm', {
        customMessage: "SUCCESS: All bureaucratic obstacles cleared! Download official citizen permit key?"
      });
      triggerDownloadFile(
        "CITIZEN_PERMIT_SEC420_GRANTED.txt",
        "===============================================\nGOVERNMENT OF BHARAT - DIGITAL PERMIT CERTIFICATE\n===============================================\n\nCITIZEN VALIDATED: SWARAJ PATIL\nPERMIT CODE: GP-2009-SEC420-OK99\n\nStatus: FULLY COMPLIANT CITIZEN"
      );
      setClickCount(0); // Reset loop
    }
  };

  return (
    <div style={{
      border: '2px dotted #000080',
      background: '#e6f2ff',
      padding: '10px',
      margin: '15px 0',
      textAlign: 'center',
      fontFamily: 'monospace'
    }}>
      <div style={{ fontSize: '11px', fontWeight: 'bold', marginBottom: '8px', color: '#000080' }}>
        📥 SECURE CITIZEN DOCUMENT DISTRIBUTION MODULE
      </div>
      <button 
        onClick={handleDownload}
        className="cursed-btn-login"
        style={{
          background: '#008080',
          border: '2px solid #fff',
          width: 'auto',
          fontSize: '13px',
          padding: '5px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          margin: '0 auto'
        }}
      >
        <Download size={14} /> Download Compliancy Permit Draft (DOCX)
      </button>
      <span style={{ fontSize: '9px', color: '#666', display: 'block', marginTop: '5px' }}>
        *Attempt count: {clickCount} of 3 before official handshake completes.
      </span>
    </div>
  );
};

export default DownloadTrap;
