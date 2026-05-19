import React, { useState } from 'react';
import { playCursedSound } from '../../hooks/useChaos';
import { AlertCircle } from 'lucide-react';

export const ReverseFormLogic = () => {
  const [phoneVal, setPhoneVal] = useState('');
  const [cityVal, setCityVal] = useState('');
  const [nameVal, setNameVal] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handlePhoneChange = (e) => {
    setPhoneVal(e.target.value);
    playCursedSound('beep');
  };

  const handleNameChange = (e) => {
    setNameVal(e.target.value);
    playCursedSound('beep');

    // Trigger fake vowel validation rule!
    const vowels = /[aeiouAEIOU]/;
    if (vowels.test(e.target.value)) {
      setErrorMsg("VALIDATION WARNING: Demographic Title must not contain alphabetical vowels (A, E, I, O, U) under local Desk #12 permit mandates.");
    } else {
      setErrorMsg("");
    }
  };

  return (
    <div style={{
      border: '3px dashed #ff00ff',
      background: '#fff0ff',
      padding: '15px',
      margin: '20px 0',
      fontFamily: 'Comic Sans MS',
      textAlign: 'left'
    }}>
      <h4 style={{ color: '#c00', fontFamily: 'Impact', margin: '0 0 10px 0', textTransform: 'uppercase' }}>
        ⚠️ SECTION IV: HIGH-SECURITY DEMOGRAPHICS (REVERSED CRITERIA)
      </h4>
      <p style={{ fontSize: '11px', color: '#555', fontStyle: 'italic', marginBottom: '12px' }}>
        Please follow the reversed verification guidelines below. Do not enter logical responses.
      </p>

      {/* Field 1: First Name asks for Phone */}
      <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '12px' }}>
        <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#000080' }}>
          Applicant First Name <span style={{ color: 'red' }}>*</span>
        </label>
        <span style={{ fontSize: '9px', color: '#ff0000' }}>Instruction: Enter your 10-digit mobile number here.</span>
        <input 
          type="text"
          value={phoneVal}
          onChange={handlePhoneChange}
          placeholder="e.g. +91 98765 43210"
          required
        />
      </div>

      {/* Field 2: Mobile Number asks for name */}
      <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '12px' }}>
        <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#000080' }}>
          Mobile Number (with Country Code) <span style={{ color: 'red' }}>*</span>
        </label>
        <span style={{ fontSize: '9px', color: '#ff0000' }}>Instruction: Enter your maternal grandmother's name (no vowels).</span>
        <input 
          type="text"
          value={nameVal}
          onChange={handleNameChange}
          placeholder="e.g. SMT S PTL"
          required
        />
      </div>

      {/* Field 3: City contains food */}
      <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '15px' }}>
        <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#000080' }}>
          Select Citizen Residential State/Union City <span style={{ color: 'red' }}>*</span>
        </label>
        <select 
          value={cityVal}
          onChange={(e) => {
            setCityVal(e.target.value);
            playCursedSound('beep');
          }}
          required
        >
          <option value="">-- CHOOSE MUNICIPALITY METRO AREA --</option>
          <option value="paneer">PANEER TIKKA METRO DIVISION</option>
          <option value="jamun">GULAB JAMUN REGULATORY CIRCLE</option>
          <option value="samosa">SAMOSA REGISTRAR OFFICE</option>
          <option value="pav">VADA PAV JUNCTION HUB</option>
        </select>
      </div>

      {errorMsg && (
        <div style={{
          display: 'flex',
          gap: '8px',
          background: '#ffcccc',
          border: '1px solid #ff0000',
          padding: '8px',
          fontSize: '11px',
          color: '#ff0000',
          fontFamily: 'Courier New, monospace',
          fontWeight: 'bold',
          alignItems: 'flex-start'
        }}>
          <AlertCircle size={16} style={{ flexShrink: 0 }} />
          <span>{errorMsg}</span>
        </div>
      )}
    </div>
  );
};

export default ReverseFormLogic;
