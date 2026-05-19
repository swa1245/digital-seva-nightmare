import React, { useState, useEffect } from 'react';
import { usePopup } from '../../components/Popups/PopupManager';
import { playCursedSound } from '../../hooks/useChaos';
import { ShieldCheck, Printer, AlertOctagon, DownloadCloud, FileSignature } from 'lucide-react';

import ConfirmationHell from '../../components/ChaosEffects/ConfirmationHell';
import DownloadTrap from '../../components/ChaosEffects/DownloadTrap';


const PaymentPage = () => {
  const { addPopup } = usePopup();
  const [paymentMethod, setPaymentMethod] = useState('');
  const [transactionState, setTransactionState] = useState('idle'); // idle, processing, success
  const [fakeProgress, setFakeProgress] = useState(0);
  const [confirmHellOpen, setConfirmHellOpen] = useState(false);


  // Fluctuating transaction progress loop
  useEffect(() => {
    if (transactionState !== 'processing') return;

    let currentVal = 0;
    const interval = setInterval(() => {
      // Intentionally erratic progress values to induce maximum panic!
      const randomShift = Math.floor(Math.random() * 35) - 15; // can go backward!
      currentVal += randomShift;
      
      if (currentVal < 0) currentVal = 5;
      if (currentVal >= 99) {
        clearInterval(interval);
        setFakeProgress(100);
        setTimeout(() => {
          setTransactionState('success');
          playCursedSound('beep');
        }, 1000);
      } else {
        setFakeProgress(currentVal);
        playCursedSound('dialup');
      }
    }, 600);

    return () => clearInterval(interval);
  }, [transactionState]);

  const handlePayClick = (e) => {
    e.preventDefault();
    if (!paymentMethod) {
      addPopup('confirm', {
        customMessage: 'PAYMENT GATEWAY RULE: You must select an official digitized bank gateway to transfer cash. Continue?'
      });
      return;
    }

    // Trigger the Multi-layered Confirmation Hell series!
    setConfirmHellOpen(true);
  };


  const handlePrint = () => {
    playCursedSound('laser');
    window.print();
  };

  const handleDownloadPDF = () => {
    playCursedSound('laser');
    addPopup('confirm', {
      customMessage: 'PDF DOWNLOAD MODULE OFFLINE: The digital download server is busy. Please print screen, sign with a red ink pen, and scan it back at 300 DPI to proceed.'
    });
  };

  if (transactionState === 'processing') {
    return (
      <div className="cursed-blocker" style={{ background: '#300000' }}>
        <div className="govt-spinner"></div>
        <div className="loader-header">🏦 CONTACTING BANKING SOVEREIGN HUB...</div>
        
        {/* Blinking severe warning alert */}
        <div className="payment-processing-overlay">
          <div className="danger-warning">🛑 CAUTION: SECURE TUNNEL IN PROGRESS 🛑</div>
          <div className="instruction">
            DO NOT click BACK button. DO NOT click REFRESH. DO NOT close browser tab.<br />
            Moving your mouse during bank authentication may result in double-debiting CESS fine of 500 INR!
          </div>
        </div>

        {/* Cursed backward progress bar */}
        <div className="cursed-progress-container">
          <div className="progress-bar-fill" style={{ width: `${fakeProgress}%`, background: 'red' }}></div>
          <span className="progress-percentage">Secure Bank handshake: {fakeProgress}%</span>
        </div>

        <div className="loader-subtext">SSL 3.0 Handshake: Routing via Desk #12 server mainframe...</div>
      </div>
    );
  }

  if (transactionState === 'success') {
    return (
      <div className="payment-page-container" style={{ maxWidth: '800px' }}>
        <div className="ugly-ad-banner" style={{ background: '#005f00', border: '3px solid #00ff00' }}>
          <div className="ad-headline" style={{ color: '#00ff00' }}>⭐ APPLICANT SUCCESSFUL ⭐</div>
          <div className="ad-subtext" style={{ color: '#fff' }}>
            YOUR PERMIT HAS BEEN GRANTED UNDER SECTION 420A OF DIGITAL BUREAUCRACY ACT.
          </div>
        </div>

        {/* High-fidelity certificate card */}
        <div className="certificate-container" id="printable-cert">
          <div className="certificate-watermark">APPROVED</div>
          <div className="cert-header">GOVERNMENT OF BHARAT</div>
          <div className="cert-sub">DEPARTMENT OF DIGITAL PAPERWORK & CITIZEN SIMULATION</div>
          
          <div style={{ margin: '20px 0' }}>
            <FileSignature size={60} style={{ color: '#000080', margin: '0 auto' }} />
          </div>

          <div className="cert-body">
            <p>This certifies that compliant citizen applicant</p>
            <p className="applicant-name">SWARAJ PATIL</p>
            <p>
              has successfully navigated all dark UX obstacles, bypassed moving submit buttons, completed Skew captchas, scrolled across hidden horizontal checkbox bars, and paid all mandatory digital CESS fees.
            </p>
            <p style={{ marginTop: '15px', fontWeight: 'bold' }}>
              GRANTED TEMPORARY PERMIT REGULATION NO: <span style={{ color: 'red', fontFamily: 'monospace' }}>GP-2009-SEC420-OK99</span>
            </p>
          </div>

          <div className="cert-signatures">
            <div className="signature-line">
              <div className="sig-name">Babuji Prasad</div>
              <div>Sub-Assistant Registrar</div>
            </div>
            <div className="signature-line">
              <div className="sig-name">Gov. Bot 2009</div>
              <div>Mainframe Terminal Operator</div>
            </div>
          </div>
        </div>

        {/* Action controllers */}
        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', margin: '25px 0' }}>
          <button onClick={handlePrint} className="cursed-btn-login" style={{ width: 'auto', background: '#3b5998', color: '#fff', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Printer size={16} /> Print Certificate
          </button>
          <button onClick={handleDownloadPDF} className="cursed-btn-login" style={{ width: 'auto', background: '#e67e22', color: '#fff', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <DownloadCloud size={16} /> Download PDF
          </button>
        </div>

        {/* Client side file generator download trap */}
        <DownloadTrap />
      </div>
    );
  }

  return (
    <div className="payment-page-container">
      <div className="payment-box">
        <div className="payment-header">
          <span>💳 BILLING GATEWAY DEPT #12</span>
          <span>Dues Pending: 2,654.89 INR</span>
        </div>

        <div style={{ padding: '15px' }}>
          <h3 style={{ fontFamily: 'Impact', color: '#c00', marginBottom: '10px' }}>CITIZEN INVOICE BREAKDOWN</h3>
          
          <table className="invoice-table">
            <thead>
              <tr>
                <th>Charge Description</th>
                <th>Fee Classification</th>
                <th>Amount (INR)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Base Portal Application Fee</td>
                <td>Standard Base</td>
                <td>200.00</td>
              </tr>
              <tr>
                <td>Digital India Convenience Cess Surcharge</td>
                <td>Mandatory Central</td>
                <td>1,500.00</td>
              </tr>
              <tr>
                <td>Swachh Bharat Digitization Surcharge (12%)</td>
                <td>Cess Tax</td>
                <td>204.89</td>
              </tr>
              <tr>
                <td>Late Filing Desk #12 Admin Penalty</td>
                <td>Regulatory Fine</td>
                <td>750.00</td>
              </tr>
              <tr className="total-row">
                <td colSpan={2}>Grand Total Surcharge Sump:</td>
                <td>2,654.89</td>
              </tr>
            </tbody>
          </table>

          {/* Secure Trust Marks */}
          <div className="secure-seals">
            <span className="seal">🛡️ 100% CESS SECURED</span>
            <span className="seal">🇮🇳 APPROVED FOR BANK TRANSFER</span>
            <span className="seal">🔐 SSL v2.0 CERTIFIED</span>
          </div>

          <form onSubmit={handlePayClick} style={{ padding: '10px', border: '1px solid #999', background: '#eaeaea' }}>
            <h4 style={{ fontFamily: 'sans-serif', fontSize: '12px', fontWeight: 'bold', marginBottom: '10px', color: '#000080' }}>
              CHOOSE SECURE ELECTRONIC ROUTE:
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', margin: '10px 0', fontSize: '13px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="radio"
                  name="payMethod"
                  value="sbi"
                  checked={paymentMethod === 'sbi'}
                  onChange={(e) => {
                    setPaymentMethod(e.target.value);
                    playCursedSound('beep');
                  }}
                />
                <span>State Bank of Digital Bureaucracy (NetBanking)</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="radio"
                  name="payMethod"
                  value="tea"
                  checked={paymentMethod === 'tea'}
                  onChange={(e) => {
                    setPaymentMethod(e.target.value);
                    playCursedSound('beep');
                  }}
                />
                <span>Bank of Local Tea Stall (Direct Biometric Deduct)</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="radio"
                  name="payMethod"
                  value="piggy"
                  checked={paymentMethod === 'piggy'}
                  onChange={(e) => {
                    setPaymentMethod(e.target.value);
                    playCursedSound('beep');
                  }}
                />
                <span>National Piggybank Registry (Aadhaar Direct Draw)</span>
              </label>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
              <button type="submit" className="cursed-btn-login" style={{ background: '#27ae60', border: '3px solid #2196f3' }}>
                INITIATE digital billing TRANSACTION (2,654.89 INR)
              </button>
            </div>
          </form>
        </div>
      </div>

      <div style={{ marginTop: '15px', color: '#ffc107', fontStyle: 'italic', fontSize: '11px', display: 'flex', gap: '8px', alignItems: 'center' }}>
        <AlertOctagon size={14} />
        <span>Warning: Double transaction billing is automated for slow network connections. Please remain calm.</span>
      </div>

      {/* Confirmation Hell sequence overlay */}
      <ConfirmationHell
        isOpen={confirmHellOpen}
        onConfirm={() => {
          setConfirmHellOpen(false);
          setTransactionState('processing');
          playCursedSound('error');
        }}
        onCancel={() => setConfirmHellOpen(false)}
      />
    </div>
  );
};

export default PaymentPage;

