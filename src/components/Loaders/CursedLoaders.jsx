import React from 'react';
import { RefreshCw } from 'lucide-react';

export const AutoSaveSpinner = ({ isActive, count }) => {
  if (!isActive) return null;

  return (
    <div className="autosave-spinner-box">
      <RefreshCw size={14} className="spinning" style={{ color: 'red' }} />
      <span>
        [DRAFT #{count}] Syncing Aadhaar draft...
      </span>
    </div>
  );
};
