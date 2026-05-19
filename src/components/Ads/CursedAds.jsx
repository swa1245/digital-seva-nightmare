import React from 'react';
import { usePopup } from '../Popups/PopupManager';
import { playCursedSound } from '../../hooks/useChaos';

const CursedAds = () => {
  const { addPopup } = usePopup();

  const handleClaimClick = (e) => {
    e.preventDefault();
    playCursedSound('laser');
    addPopup('confirm', {
      customMessage: 'CONGRATULATIONS! You have been selected for the Free Student Laptop Scheme. Processing fee: 499 INR. Add to checkout?'
    });
  };

  return (
    <>
      {/* Floating Ad Left */}
      <div className="floating-ad float-left">
        <div className="ad-title">🎁 GOVT SCHEME LAPTOP 🎁</div>
        <p className="ad-desc">
          Get a free Intel Core 2 Duo government-approved desktop computer!
        </p>
        <button onClick={handleClaimClick} className="ad-btn">
          CLAIM FREE NOW!
        </button>
      </div>

      {/* Floating Ad Right */}
      <div className="floating-ad float-right" style={{ backgroundColor: '#ff00ff', borderColor: '#ffff00' }}>
        <div className="ad-title" style={{ color: '#ffff00' }}>🐍 EXOTIC SPELL TRICK 🐍</div>
        <p className="ad-desc" style={{ color: '#fff' }}>
          Lose 14 Kgs of digital weight in 4 minutes using this simple tea recipe.
        </p>
        <button onClick={() => {
          playCursedSound('error');
          addPopup('virus');
        }} className="ad-btn" style={{ background: '#ff0000' }}>
          WATCH FREE VIDEO
        </button>
      </div>
    </>
  );
};

export default CursedAds;
