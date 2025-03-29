import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from '../styles/Form.module.css';

// Comprehensive list of injury types organized by categories
const injuryTypes = {
  "Head & Brain": [
    { value: "tbi", label: "Traumatic Brain Injury (TBI)" },
    { value: "concussion", label: "Concussion" },
    { value: "post_concussion", label: "Post-Concussion Syndrome" },
    { value: "skull_fracture", label: "Skull Fracture" },
    { value: "brain_contusion", label: "Brain Contusion" },
    { value: "diffuse_axonal", label: "Diffuse Axonal Injury" },
    { value: "intracranial_hematoma", label: "Intracranial Hematoma" },
    { value: "facial_laceration", label: "Facial Laceration" },
    { value: "facial_fracture", label: "Facial Bone Fracture" },
    { value: "facial_disfigurement", label: "Facial Disfigurement" }
  ],
  "Neck & Spine": [
    { value: "whiplash", label: "Whiplash" },
    { value: "herniated_disc_cervical", label: "Cervical Herniated Disc" },
    { value: "cervical_strain", label: "Cervical Strain/Sprain" },
    { value: "cervical_fracture", label: "Cervical Fracture" },
    { value: "thoracic_vertebrae_fracture", label: "Thoracic Vertebrae Fracture" },
    { value: "lumbar_vertebrae_fracture", label: "Lumbar Vertebrae Fracture" },
    { value: "herniated_disc_lumbar", label: "Lumbar Herniated Disc" },
    { value: "spinal_cord_injury", label: "Spinal Cord Injury" },
    { value: "spinal_stenosis", label: "Spinal Stenosis" },
    { value: "spondylolisthesis", label: "Spondylolisthesis" },
    { value: "spinal_fusion", label: "Spinal Fusion Surgery Required" },
    { value: "paralysis", label: "Paralysis" },
    { value: "quadriplegia", label: "Quadriplegia" },
    { value: "paraplegia", label: "Paraplegia" }
  ],
  "Upper Extremities": [
    { value: "shoulder_dislocation", label: "Shoulder Dislocation" },
    { value: "rotator_cuff", label: "Rotator Cuff Tear" },
    { value: "labrum_tear", label: "Labrum Tear" },
    { value: "broken_clavicle", label: "Broken Clavicle" },
    { value: "humerus_fracture", label: "Humerus Fracture" },
    { value: "ulna_fracture", label: "Ulna Fracture" },
    { value: "radius_fracture", label: "Radius Fracture" },
    { value: "wrist_fracture", label: "Wrist Fracture" },
    { value: "hand_fracture", label: "Hand Fracture" },
    { value: "finger_fracture", label: "Finger Fracture" },
    { value: "dislocated_elbow", label: "Dislocated Elbow" },
    { value: "torn_bicep", label: "Torn Bicep" },
    { value: "carpal_tunnel", label: "Carpal Tunnel Syndrome" },
    { value: "tendonitis", label: "Tendonitis" },
    { value: "upper_limb_amputation", label: "Upper Limb Amputation" }
  ],
  "Lower Extremities": [
    { value: "hip_fracture", label: "Hip Fracture" },
    { value: "hip_dislocation", label: "Hip Dislocation" },
    { value: "broken_femur", label: "Broken Femur" },
    { value: "patellar_fracture", label: "Patellar (Kneecap) Fracture" },
    { value: "torn_acl", label: "Torn ACL" },
    { value: "torn_mcl", label: "Torn MCL" },
    { value: "torn_meniscus", label: "Torn Meniscus" },
    { value: "tibia_fracture", label: "Tibia Fracture" },
    { value: "fibula_fracture", label: "Fibula Fracture" },
    { value: "ankle_fracture", label: "Ankle Fracture" },
    { value: "foot_fracture", label: "Foot Fracture" },
    { value: "toe_fracture", label: "Toe Fracture" },
    { value: "achilles_rupture", label: "Achilles Tendon Rupture" },
    { value: "plantar_fasciitis", label: "Plantar Fasciitis" },
    { value: "lower_limb_amputation", label: "Lower Limb Amputation" }
  ],
  "Chest & Torso": [
    { value: "rib_fracture", label: "Rib Fracture" },
    { value: "pneumothorax", label: "Pneumothorax (Collapsed Lung)" },
    { value: "hemothorax", label: "Hemothorax (Blood in Chest Cavity)" },
    { value: "pulmonary_contusion", label: "Pulmonary Contusion" },
    { value: "cardiac_contusion", label: "Cardiac Contusion" },
    { value: "sternum_fracture", label: "Sternum Fracture" },
    { value: "myocardial_infarction", label: "Myocardial Infarction (Heart Attack)" },
    { value: "diaphragm_rupture", label: "Diaphragm Rupture" },
    { value: "pelvic_fracture", label: "Pelvic Fracture" },
    { value: "sacral_fracture", label: "Sacral Fracture" }
  ],
  "Internal Injuries": [
    { value: "liver_laceration", label: "Liver Laceration" },
    { value: "spleen_rupture", label: "Spleen Rupture" },
    { value: "kidney_damage", label: "Kidney Damage" },
    { value: "pancreatic_injury", label: "Pancreatic Injury" },
    { value: "bowel_perforation", label: "Bowel Perforation" },
    { value: "internal_bleeding", label: "Internal Bleeding" },
    { value: "abdominal_trauma", label: "Abdominal Trauma" },
    { value: "bladder_injury", label: "Bladder Injury" },
    { value: "gastrointestinal_injury", label: "Gastrointestinal Injury" },
    { value: "hernia", label: "Hernia" }
  ],
  "Soft Tissue": [
    { value: "soft_tissue", label: "Soft Tissue Injury" },
    { value: "muscle_strain", label: "Muscle Strain" },
    { value: "ligament_sprain", label: "Ligament Sprain" },
    { value: "contusion", label: "Contusion (Bruising)" },
    { value: "laceration", label: "Laceration" },
    { value: "abrasion", label: "Abrasion" },
    { value: "bursitis", label: "Bursitis" },
    { value: "tendinitis", label: "Tendinitis" },
    { value: "nerve_damage", label: "Nerve Damage" },
    { value: "hematoma", label: "Hematoma" }
  ],
  "Burns": [
    { value: "first_degree_burn", label: "First-Degree Burn" },
    { value: "second_degree_burn", label: "Second-Degree Burn" },
    { value: "third_degree_burn", label: "Third-Degree Burn" },
    { value: "fourth_degree_burn", label: "Fourth-Degree Burn" },
    { value: "chemical_burn", label: "Chemical Burn" },
    { value: "electrical_burn", label: "Electrical Burn" },
    { value: "thermal_burn", label: "Thermal Burn" },
    { value: "radiation_burn", label: "Radiation Burn" },
    { value: "inhalation_injury", label: "Inhalation Injury" },
    { value: "burn_scarring", label: "Burn Scarring & Disfigurement" }
  ],
  "Psychological": [
    { value: "ptsd", label: "Post-Traumatic Stress Disorder (PTSD)" },
    { value: "anxiety", label: "Anxiety Disorder" },
    { value: "depression", label: "Depression" },
    { value: "insomnia", label: "Insomnia" },
    { value: "emotional_distress", label: "Emotional Distress" },
    { value: "adjustment_disorder", label: "Adjustment Disorder" },
    { value: "panic_attacks", label: "Panic Attacks" },
    { value: "phobia", label: "Phobia (Accident-Related)" },
    { value: "loss_of_enjoyment", label: "Loss of Enjoyment of Life" },
    { value: "cognitive_impairment", label: "Cognitive Impairment" }
  ],
  "Sensory": [
    { value: "hearing_loss", label: "Hearing Loss" },
    { value: "tinnitus", label: "Tinnitus (Ringing in Ears)" },
    { value: "vision_impairment", label: "Vision Impairment" },
    { value: "blindness", label: "Blindness" },
    { value: "loss_of_smell", label: "Loss of Smell (Anosmia)" },
    { value: "loss_of_taste", label: "Loss of Taste" },
    { value: "balance_disorders", label: "Balance Disorders" },
    { value: "vertigo", label: "Vertigo" },
    { value: "eye_injury", label: "Eye Injury" },
    { value: "ear_injury", label: "Ear Injury" }
  ],
  "Chronic Conditions": [
    { value: "chronic_pain", label: "Chronic Pain" },
    { value: "complex_regional_pain", label: "Complex Regional Pain Syndrome" },
    { value: "fibromyalgia", label: "Fibromyalgia" },
    { value: "neuropathy", label: "Neuropathy" },
    { value: "chronic_headaches", label: "Chronic Headaches" },
    { value: "migraine", label: "Migraine" },
    { value: "reflex_sympathetic_dystrophy", label: "Reflex Sympathetic Dystrophy" },
    { value: "arthritis", label: "Post-Traumatic Arthritis" },
    { value: "fatigue_syndrome", label: "Chronic Fatigue Syndrome" },
    { value: "temporomandibular", label: "Temporomandibular Joint Disorder (TMJ)" }
  ],
  "Other": [
    { value: "other_injury", label: "Other - Custom Injury Type" }
  ]
};

// A flat list of all injury types for search/filtering
const allInjuryTypes = Object.values(injuryTypes).flat();

const InjuryTypeDropdown = ({ onSelect, currentValue }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [customInjuryType, setCustomInjuryType] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const triggerRef = useRef(null);
  const dropdownRef = useRef(null);
  const [portalElement, setPortalElement] = useState(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
  const [scrollPosition, setScrollPosition] = useState(0);
  
  // Setup portal element on mount
  useEffect(() => {
    // Don't create portal element on server
    if (typeof document !== 'undefined') {
      const el = document.createElement('div');
      el.style.position = 'absolute';
      el.style.top = '0';
      el.style.left = '0';
      el.style.width = '100%';
      el.style.height = '0';
      el.style.overflow = 'visible';
      el.style.pointerEvents = 'none';
      el.style.zIndex = '9999';
      document.body.appendChild(el);
      setPortalElement(el);
      
      return () => {
        document.body.removeChild(el);
      };
    }
  }, []);

  // Save scroll position before opening dropdown
  useEffect(() => {
    const handleScroll = () => {
      if (!dropdownOpen) {
        setScrollPosition(window.scrollY);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [dropdownOpen]);

  // Check if current value is custom
  useEffect(() => {
    // If currentValue doesn't match any predefined injury types
    if (currentValue && !allInjuryTypes.some(type => type.value === currentValue)) {
      setCustomInjuryType(currentValue);
      setShowCustomInput(true);
    } else if (currentValue === 'other_injury') {
      setShowCustomInput(true);
    } else {
      setShowCustomInput(false);
    }
  }, [currentValue]);

  // Update dropdown position when it opens
  useEffect(() => {
    if (dropdownOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width
      });
      
      // Prevent page from scrolling to top when dropdown opens
      window.scrollTo(0, scrollPosition);
    }
  }, [dropdownOpen, scrollPosition]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target) &&
        triggerRef.current && 
        !triggerRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  // Close dropdown on ESC key press
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener('keydown', handleEscKey);
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [dropdownOpen]);

  // Get selected injury type label
  const getSelectedInjuryTypeLabel = () => {
    if (showCustomInput && customInjuryType) {
      return customInjuryType;
    }
    
    const selectedType = allInjuryTypes.find(type => type.value === currentValue);
    return selectedType ? selectedType.label : 'Select Injury Type';
  };

  // Filter injury types based on search or selected category
  const getFilteredInjuryTypes = () => {
    if (searchValue) {
      return allInjuryTypes.filter(
        type => type.label.toLowerCase().includes(searchValue.toLowerCase())
      );
    }
    
    if (selectedCategory) {
      return injuryTypes[selectedCategory] || [];
    }
    
    return [];
  };

  // Handle injury type selection
  const handleInjuryTypeSelect = (injuryTypeValue) => {
    if (injuryTypeValue === 'other_injury') {
      setShowCustomInput(true);
      // Don't close the dropdown yet
    } else {
      setShowCustomInput(false);
      onSelect(injuryTypeValue);
      setDropdownOpen(false);
    }
  };

  // Handle custom injury type submission
  const handleCustomInjuryTypeSubmit = (e) => {
    e.preventDefault();
    if (customInjuryType.trim()) {
      onSelect(customInjuryType.trim());
      setDropdownOpen(false);
    }
  };

  // Toggle dropdown without scrolling to top
  const toggleDropdown = () => {
    // Capture current scroll position
    setScrollPosition(window.scrollY);
    
    // Use setTimeout to allow the scroll position to be captured
    setTimeout(() => {
      setDropdownOpen(!dropdownOpen);
    }, 0);
  };

  // Dropdown trigger
  const renderTrigger = () => (
    <div 
      className={styles.caseTypeDisplay}
      onClick={toggleDropdown}
      ref={triggerRef}
    >
      <span>{getSelectedInjuryTypeLabel()}</span>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="16" 
        height="16" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className={dropdownOpen ? styles.arrowUp : styles.arrowDown}
      >
        <path d="M6 9l6 6 6-6"></path>
      </svg>
    </div>
  );

  // Dropdown content
  const renderDropdown = () => {
    if (!dropdownOpen || !portalElement) return null;

    return createPortal(
      <div 
        className={styles.caseTypesPortal}
        style={{
          position: 'absolute',
          top: `${dropdownPosition.top}px`,
          left: `${dropdownPosition.left}px`,
          width: `${dropdownPosition.width}px`,
          pointerEvents: 'auto'
        }}
        ref={dropdownRef}
      >
        <div className={`${styles.caseTypesPopout} ${styles.injuryTypeSelect}`}>
          {showCustomInput ? (
            <div className={styles.customCaseTypeContainer}>
              <h3>Enter Custom Injury Type</h3>
              <form onSubmit={handleCustomInjuryTypeSubmit}>
                <p style={{ 
                  fontSize: '0.9rem', 
                  color: 'var(--text-secondary)',
                  marginBottom: '15px',
                  lineHeight: '1.4'
                }}>
                  Please specify the exact injury type for your demand letter. 
                  This will be used throughout the document.
                </p>
                
                <div style={{ marginBottom: '15px' }}>
                  <label 
                    htmlFor="customInjuryType" 
                    style={{ 
                      display: 'block', 
                      marginBottom: '8px',
                      fontSize: '0.9rem',
                      color: 'var(--text-primary)',
                      fontWeight: '500'
                    }}
                  >
                    Injury Type Name:
                  </label>
                  <input
                    id="customInjuryType"
                    type="text"
                    placeholder="E.g., Flexor Tendon Injury, Myofascial Pain Syndrome, etc."
                    value={customInjuryType}
                    onChange={(e) => setCustomInjuryType(e.target.value)}
                    className={styles.customCaseTypeInput}
                    autoFocus
                    style={{ marginBottom: '5px' }}
                  />
                  {customInjuryType && customInjuryType.length < 3 && (
                    <div style={{ 
                      color: 'var(--accent-color)', 
                      fontSize: '0.8rem',
                      marginTop: '5px'
                    }}>
                      Injury type should be at least 3 characters long
                    </div>
                  )}
                </div>
                
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '8px',
                    fontSize: '0.9rem',
                    color: 'var(--text-primary)',
                    fontWeight: '500'
                  }}>
                    Common Custom Injury Types:
                  </label>
                  <div style={{ 
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '8px'
                  }}>
                    {[
                      'Compartment Syndrome',
                      'Vestibular Injury',
                      'Neuroma',
                      'Dystonia',
                      'Reflex Sympathetic Dystrophy',
                      'Occipital Neuralgia'
                    ].map(suggestion => (
                      <button
                        key={suggestion}
                        type="button"
                        onClick={() => setCustomInjuryType(suggestion)}
                        style={{
                          background: 'rgba(18, 18, 18, 0.7)',
                          border: '1px solid var(--border-color)',
                          borderRadius: 'var(--border-radius)',
                          padding: '6px 12px',
                          fontSize: '0.85rem',
                          color: customInjuryType === suggestion 
                            ? 'var(--secondary-color)' 
                            : 'var(--text-secondary)',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          borderColor: customInjuryType === suggestion 
                            ? 'var(--secondary-color)' 
                            : 'var(--border-color)'
                        }}
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div style={{ 
                  backgroundColor: 'rgba(157, 0, 255, 0.05)',
                  padding: '10px 15px',
                  borderRadius: 'var(--border-radius)',
                  marginBottom: '15px',
                  fontSize: '0.85rem',
                  borderLeft: '3px solid var(--secondary-color)'
                }}>
                  <strong>Tips:</strong>
                  <ul style={{ 
                    margin: '5px 0 0 0',
                    paddingLeft: '20px',
                    color: 'var(--text-secondary)'
                  }}>
                    <li>Use medical terminology when applicable</li>
                    <li>Be specific about the type and location</li>
                    <li>Use proper case (Title Case preferred)</li>
                  </ul>
                </div>
                
                <div className={styles.customCaseTypeButtons}>
                  <button 
                    type="submit" 
                    className={styles.submitCustomType}
                    disabled={!customInjuryType.trim() || customInjuryType.length < 3}
                  >
                    Submit
                  </button>
                  <button 
                    type="button" 
                    className={styles.cancelCustomType}
                    onClick={() => {
                      setShowCustomInput(false);
                      setCustomInjuryType('');
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <>
              <div className={`${styles.caseTypeSearch} ${styles.injuryTypeSearch}`}>
                <input
                  type="text"
                  placeholder="Search injury types..."
                  value={searchValue}
                  onChange={(e) => {
                    setSearchValue(e.target.value);
                    setSelectedCategory('');
                  }}
                  onClick={(e) => e.stopPropagation()}
                  autoFocus
                />
              </div>
              
              <div className={`${styles.caseTypeCategories} ${styles.injuryTypeCategories}`}>
                {Object.keys(injuryTypes).map(category => (
                  <button
                    key={category}
                    type="button"
                    className={`${styles.categoryButton} ${selectedCategory === category ? styles.activeCategory : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCategory(prev => prev === category ? '' : category);
                      setSearchValue('');
                    }}
                  >
                    {category}
                  </button>
                ))}
              </div>
              
              <div className={`${styles.caseTypeList} ${styles.injuryTypeList}`}>
                {selectedCategory && (
                  <div
                    className={`${styles.caseTypeOption} ${styles.injuryTypeOption} ${styles.customOptionButton}`}
                    style={{
                      backgroundColor: 'rgba(157, 0, 255, 0.1)', 
                      borderBottom: '1px solid var(--border-color)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontWeight: '500'
                    }}
                    onClick={() => {
                      setShowCustomInput(true);
                      setCustomInjuryType('');
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 5v14M5 12h14"></path>
                    </svg>
                    Create Custom Injury Type
                  </div>
                )}
                {getFilteredInjuryTypes().map(type => (
                  <div
                    key={type.value}
                    className={`${styles.caseTypeOption} ${styles.injuryTypeOption} ${currentValue === type.value ? styles.selectedInjuryType : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleInjuryTypeSelect(type.value);
                    }}
                  >
                    {type.label}
                  </div>
                ))}
                
                {getFilteredInjuryTypes().length === 0 && searchValue && (
                  <div className={styles.noResults}>
                    <p>No matching injury types found</p>
                    <button 
                      className={styles.createCustomType}
                      onClick={() => {
                        setCustomInjuryType(searchValue);
                        setShowCustomInput(true);
                      }}
                    >
                      Create "{searchValue}" as custom injury type
                    </button>
                  </div>
                )}
                
                {getFilteredInjuryTypes().length === 0 && !searchValue && !selectedCategory && (
                  <div className={styles.selectPrompt}>Select a category or search for injury types</div>
                )}
                
                {/* Add custom injury type button at the bottom */}
                {searchValue && getFilteredInjuryTypes().length > 0 && (
                  <div
                    className={`${styles.caseTypeOption} ${styles.injuryTypeOption} ${styles.customOptionButton}`}
                    style={{
                      backgroundColor: 'rgba(157, 0, 255, 0.05)',
                      marginTop: '10px', 
                      borderTop: '1px solid var(--border-color)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontWeight: '500',
                      padding: '15px 20px'
                    }}
                    onClick={() => {
                      setShowCustomInput(true);
                      setCustomInjuryType(searchValue);
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 5v14M5 12h14"></path>
                    </svg>
                    Create Custom Injury Type
                  </div>
                )}
                
                {!searchValue && !selectedCategory && (
                  <div
                    className={`${styles.caseTypeOption} ${styles.injuryTypeOption} ${styles.customOptionButton}`}
                    style={{
                      backgroundColor: 'rgba(157, 0, 255, 0.05)',
                      marginTop: '10px', 
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontWeight: '500',
                      padding: '15px 20px',
                      textAlign: 'center',
                      justifyContent: 'center'
                    }}
                    onClick={() => {
                      setShowCustomInput(true);
                      setCustomInjuryType('');
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 5v14M5 12h14"></path>
                    </svg>
                    Create Custom Injury Type
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>,
      portalElement
    );
  };

  return (
    <div className={styles.caseTypeSelector}>
      {renderTrigger()}
      {renderDropdown()}
    </div>
  );
};

export default InjuryTypeDropdown; 