import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePopup } from '../../components/Popups/PopupManager';
import { playCursedSound } from '../../hooks/useChaos';
import { HelpCircle, AlertTriangle, FileText, CheckCircle2 } from 'lucide-react';

import ReverseFormLogic from '../../components/ChaosEffects/ReverseFormLogic';
import ButtonDodge from '../../components/ChaosEffects/ButtonDodge';
import CursedTooltips from '../../components/ChaosEffects/CursedTooltips';


const STATE_DATA = {
  "Delhi": {
    "New Delhi": ["Chanakyapuri", "Connaught Place", "Vasant Vihar"],
    "South Delhi": ["Saket", "Hauz Khas", "Mehrauli"]
  },
  "Maharashtra": {
    "Mumbai City": ["Colaba", "Fort", "Dharavi"],
    "Pune": ["Shivajinagar", "Kothrud", "Hadapsar"]
  },
  "Karnataka": {
    "Bangalore Urban": ["Indiranagar", "Koramangala", "HSR Layout"],
    "Mysore": ["Gokulam", "Vidyaranyapuram", "Hebbal"]
  }
};

const ApplicationPage = ({ handleShiftButton }) => {
  const navigate = useNavigate();
  const { addPopup } = usePopup();

  // Form states
  const [formData, setFormData] = useState({
    fullName: '',
    fatherName: '',
    motherName: '',
    email: '',
    mobile: '',
    birthMark: '',
    bribeConcent: false,
    horizontalAgree: false,
    aadhaarUpload: null
  });

  // Dropdown cascade states
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedTehsil, setSelectedTehsil] = useState('');

  // Progress level state (intentional jumps and drops)
  const [formProgress, setFormProgress] = useState(40); // Start at 40% arbitrarily!

  useEffect(() => {
    // Dynamically calculate fake progress level based on loaded fields
    let score = 40;
    if (formData.fullName) score += 15;
    if (formData.email) score -= 10; // Input drops progress! Incredibly annoying.
    if (selectedState) score += 20;
    if (selectedTehsil) score -= 15; // Drops again!
    if (formData.horizontalAgree) score += 30;
    
    // Cap progress bar values between 5% and 95%
    const finalProgress = Math.max(5, Math.min(score, 95));
    setFormProgress(finalProgress);
  }, [formData, selectedState, selectedTehsil]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Play annoying synth click
    playCursedSound('beep');
  };

  const handleStateChange = (e) => {
    const val = e.target.value;
    setSelectedState(val);
    setSelectedDistrict('');
    setSelectedTehsil('');
    playCursedSound('beep');

    if (val === 'Delhi') {
      addPopup('confirm', {
        customMessage: 'ALERT: Applying from capital territory incurs a 15% Digital Governance Surcharge. Proceed?'
      });
    }
  };

  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
    setSelectedTehsil('');
    playCursedSound('beep');
  };

  const handleTehsilChange = (e) => {
    setSelectedTehsil(e.target.value);
    playCursedSound('beep');
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    playCursedSound('beep');

    // Validations (some visible, some frustratingly hidden)
    if (!formData.fullName || !formData.fatherName) {
      alert('VALIDATION REJECTION: Missing mandatory genealogical heritage details (Father/Mother or Applicant name).');
      return;
    }

    if (!selectedTehsil) {
      addPopup('support', {
        customMessage: 'TERRITORIAL CODE ERROR: Tehsil jurisdiction was left unassigned. Please dial support desk to verify local pin configuration.'
      });
      return;
    }

    if (!formData.horizontalAgree) {
      addPopup('confirm', {
        customMessage: 'WARNING: You failed to scroll to the extreme right of the purple container to consent to digital terms. Please check the agreement box before trying to file again.'
      });
      return;
    }

    // Delayed submit confirmation triggers
    addPopup('confirm', {
      customMessage: 'STEP 1 of 3: Are you completely certain all information matches your official physical passport issued prior to 2012?',
      onConfirm: () => {
        addPopup('confirm', {
          customMessage: 'STEP 2 of 3: Inaccurately filing digital paperwork constitutes a punishable civil offense under Code 99B. Do you accept liability?',
          onConfirm: () => {
            addPopup('confirm', {
              customMessage: 'STEP 3 of 3: Confirm final file submission to the digital queue? No corrections can be made without manual filing in New Delhi.',
              onConfirm: () => {
                // Mock delay
                addPopup('busy', {
                  customMessage: 'Encrypting documents and generating billing receipts... Please hold still.'
                });
                setTimeout(() => {
                  navigate('/payment');
                }, 2000);
              }
            });
          }
        });
      }
    });
  };

  return (
    <div className="app-page-container">
      {/* Main Form Area */}
      <form onSubmit={handleFormSubmit} className="main-application-form">
        <div className="form-section-title">
          <span>📝 PUBLIC FORM #420-A: PERMIT REQUEST CARD</span>
          <span style={{ fontSize: '11px', color: '#ffea00' }}>Form Progress: {formProgress}%</span>
        </div>

        {/* Annoying backwards Progress Bar widget */}
        <div className="cursed-progress-container" style={{ width: '100%', margin: '10px 0 20px 0' }}>
          <div className="progress-bar-fill" style={{ width: `${formProgress}%` }}></div>
          <span className="progress-percentage">Citizen Compliancy Ratio: {formProgress}%</span>
        </div>

        {/* Section 1: Demographics */}
        <div style={{ padding: '5px', border: '1px solid #777', marginBottom: '15px' }}>
          <h4 style={{ margin: '5px 0', fontFamily: 'Impact', color: '#000080' }}>SECTION I: APPLICANT BIOGRAPHY</h4>
          
          <div className="form-grid-ugly">
            <div className="form-field">
              <label>
                Full Name (Must match Birth Record precisely) <span className="req">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="e.g. Swaraj Patil"
                required
              />
            </div>

            <div className="form-field">
              <label>
                Father's Legal Surnames <span className="req">*</span>
              </label>
              <input
                type="text"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleInputChange}
                placeholder="Father's full name"
                required
              />
            </div>

            <div className="form-field">
              <label>
                Mother's Maiden Middle Name
              </label>
              <input
                type="text"
                name="motherName"
                value={formData.motherName}
                onChange={handleInputChange}
                placeholder="Mother's maiden name"
              />
            </div>

            <div className="form-field">
              <label>
                Email Address (For billing cess) <span className="req">*</span>
              </label>
              <span className="instruction-note">Warning: Typing your email reduces form progress by 10%.</span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="swaraj@example.com"
                required
              />
            </div>

            <div className="form-field">
              <label>
                Mobile Number (Biometric SMS)
              </label>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                placeholder="+91 XXXXX XXXXX"
                maxLength={13}
              />
            </div>

            <div className="form-field">
              <label>
                Unique Identifying Birthmark
              </label>
              <input
                type="text"
                name="birthMark"
                value={formData.birthMark}
                onChange={handleInputChange}
                placeholder="e.g. Mole on left elbow"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Cascading Dropdowns */}
        <div style={{ padding: '5px', border: '1px solid #777', marginBottom: '15px' }}>
          <h4 style={{ margin: '5px 0', fontFamily: 'Impact', color: '#000080' }}>SECTION II: GEOGRAPHIC DOMICILE</h4>
          <span style={{ fontSize: '11px', fontStyle: 'italic', display: 'block', marginBottom: '8px' }}>
            Note: Selecting a State locks the District. Changing Districts deletes your Tehsil preferences.
          </span>

          <div className="form-grid-ugly">
            <div className="form-field">
              <label>Select State jurisdiction <span className="req">*</span></label>
              <select value={selectedState} onChange={handleStateChange} required>
                <option value="">-- CHOOSE UNION COMPLIANT STATE --</option>
                {Object.keys(STATE_DATA).map(st => (
                  <option key={st} value={st}>{st.toUpperCase()}</option>
                ))}
              </select>
            </div>

            {selectedState && (
              <div className="form-field">
                <label>Select District administrative hub <span className="req">*</span></label>
                <select value={selectedDistrict} onChange={handleDistrictChange} required>
                  <option value="">-- SELECT REGISTERED HUB --</option>
                  {Object.keys(STATE_DATA[selectedState]).map(dist => (
                    <option key={dist} value={dist}>{dist}</option>
                  ))}
                </select>
              </div>
            )}

            {selectedDistrict && (
              <div className="form-field full-width">
                <div className="dropdown-nesting-box">
                  <span className="nested-label">DEPARTMENT TEHSIL JURISDICTION SELECTOR:</span>
                  <select value={selectedTehsil} onChange={handleTehsilChange} required>
                    <option value="">-- CHOOSE LOCAL DIVISION OFFICE --</option>
                    {STATE_DATA[selectedState][selectedDistrict].map(teh => (
                      <option key={teh} value={teh}>{teh.toUpperCase()}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Section 3: Cursed Scroll Agreement */}
        <div style={{ padding: '5px', border: '1px solid #777', marginBottom: '15px' }}>
          <h4 style={{ margin: '5px 0', fontFamily: 'Impact', color: '#000080' }}>SECTION III: COMPLIANCE CHECKBOX</h4>
          <span style={{ fontSize: '11px', display: 'block', color: 'red', fontWeight: 'bold' }}>
            Scroll to the extreme right of this purple container to locate and check the checkbox.
          </span>

          <div className="forced-horizontal-scroll">
            <div className="scroll-content-container">
              <label className="required-checkbox-label">
                <span>
                  &gt;&gt; [SCROLL RIGHT...] I solemnly declare that I have checked the correct Tehsil office and accept that Digital India Cess is non-refundable. I consent to giving 100% data access.
                </span>
                <input
                  type="checkbox"
                  name="horizontalAgree"
                  checked={formData.horizontalAgree}
                  onChange={handleInputChange}
                />
              </label>
            </div>
          </div>
        </div>

        {/* Section 4: Cursed Reversed Demographics */}
        <ReverseFormLogic />

        {/* Action Actions */}
        <div style={{ display: 'flex', justifyContent: 'center', minHeight: '60px', padding: '10px 0' }}>
          <CursedTooltips>
            <ButtonDodge threshold={70}>
              <button
                type="submit"
                className="cursed-btn-login"
                style={{ width: 'auto', minWidth: '280px', background: '#e67e22', border: '3px solid #d35400' }}
                onMouseEnter={handleShiftButton}
              >
                VALIDATE & CONTINUE TO BILLING
              </button>
            </ButtonDodge>
          </CursedTooltips>
        </div>
      </form>

      {/* Side Column Information & Slogans */}
      <div className="side-column">
        <div className="gov-instruction-panel">
          <h4>CITIZEN MANDATES</h4>
          <ul>
            <li>Please ensure browser is Zoomed to 100% for Captcha scanning.</li>
            <li>Uploading files larger than 12KB will crash the central mainframe queue.</li>
            <li>In case of transaction timeout, do not consult bank. Wait 48 working hours.</li>
          </ul>
        </div>

        {/* Fake Ad inside application */}
        <div className="ugly-ad-banner" style={{ cursor: 'pointer' }} onClick={() => addPopup('support')}>
          <div className="ad-headline">💰 NEED QUICK PASS? 💰</div>
          <div className="ad-subtext">Skip the digital queue instantly for only 9,999 INR! Click to speed up processing time.</div>
          <span className="ad-close-hint">Ad #12</span>
        </div>
      </div>
    </div>
  );
};

export default ApplicationPage;
