import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from '../styles/Form.module.css';

// Comprehensive list of case types organized by categories
const caseTypes = {
  "Personal Injury": [
    { value: "auto_accident", label: "Auto Accident" },
    { value: "motorcycle_accident", label: "Motorcycle Accident" },
    { value: "truck_accident", label: "Commercial Truck Accident" },
    { value: "pedestrian_accident", label: "Pedestrian Accident" },
    { value: "bicycle_accident", label: "Bicycle Accident" },
    { value: "slip_and_fall", label: "Slip and Fall" },
    { value: "dog_bite", label: "Dog Bite/Animal Attack" },
    { value: "assault_battery", label: "Assault & Battery" },
    { value: "rideshare_accident", label: "Rideshare (Uber/Lyft) Accident" },
    { value: "boating_accident", label: "Boating Accident" }
  ],
  "Premises Liability": [
    { value: "premises_liability", label: "General Premises Liability" },
    { value: "inadequate_security", label: "Inadequate Security" },
    { value: "swimming_pool_accident", label: "Swimming Pool Accident" },
    { value: "amusement_park_injury", label: "Amusement Park Injury" },
    { value: "retail_store_injury", label: "Retail Store Injury" },
    { value: "elevator_accident", label: "Elevator/Escalator Accident" },
    { value: "parking_lot_accident", label: "Parking Lot Accident" },
    { value: "stairway_accident", label: "Stairway Accident" },
    { value: "restaurant_injury", label: "Restaurant Injury" },
    { value: "hotel_injury", label: "Hotel Injury" }
  ],
  "Medical": [
    { value: "medical_malpractice", label: "Medical Malpractice" },
    { value: "surgical_error", label: "Surgical Error" },
    { value: "misdiagnosis", label: "Misdiagnosis" },
    { value: "medication_error", label: "Medication Error" },
    { value: "birth_injury", label: "Birth Injury" },
    { value: "nursing_home_neglect", label: "Nursing Home Neglect/Abuse" },
    { value: "dental_malpractice", label: "Dental Malpractice" },
    { value: "hospital_acquired_infection", label: "Hospital-Acquired Infection" },
    { value: "medical_device_failure", label: "Medical Device Failure" },
    { value: "anesthesia_error", label: "Anesthesia Error" }
  ],
  "Product Liability": [
    { value: "product_liability", label: "General Product Liability" },
    { value: "defective_automobile", label: "Defective Automobile" },
    { value: "defective_medical_device", label: "Defective Medical Device" },
    { value: "dangerous_drugs", label: "Dangerous Drugs" },
    { value: "toxic_exposure", label: "Toxic Chemical Exposure" },
    { value: "food_poisoning", label: "Food Poisoning" },
    { value: "defective_household_product", label: "Defective Household Product" },
    { value: "defective_children_product", label: "Defective Children's Product" },
    { value: "defective_industrial_equipment", label: "Defective Industrial Equipment" },
    { value: "design_defect", label: "Design Defect" }
  ],
  "Workplace": [
    { value: "workers_compensation", label: "Workers' Compensation" },
    { value: "construction_accident", label: "Construction Accident" },
    { value: "industrial_accident", label: "Industrial Accident" },
    { value: "repetitive_stress_injury", label: "Repetitive Stress Injury" },
    { value: "toxic_exposure_workplace", label: "Workplace Toxic Exposure" },
    { value: "workplace_violence", label: "Workplace Violence" },
    { value: "wrongful_termination", label: "Wrongful Termination" },
    { value: "mining_accident", label: "Mining Accident" },
    { value: "farming_accident", label: "Agricultural/Farming Accident" },
    { value: "maritime_injury", label: "Maritime Injury (Jones Act)" }
  ],
  "Civil Rights & Discrimination": [
    { value: "discrimination", label: "Discrimination (General)" },
    { value: "racial_discrimination", label: "Racial Discrimination" },
    { value: "gender_discrimination", label: "Gender Discrimination" },
    { value: "age_discrimination", label: "Age Discrimination" },
    { value: "disability_discrimination", label: "Disability Discrimination" },
    { value: "sexual_harassment", label: "Sexual Harassment" },
    { value: "police_brutality", label: "Police Brutality/Misconduct" },
    { value: "false_arrest", label: "False Arrest/Imprisonment" },
    { value: "civil_rights_violation", label: "Civil Rights Violation" },
    { value: "education_discrimination", label: "Education Discrimination" }
  ],
  "Professional Liability": [
    { value: "legal_malpractice", label: "Legal Malpractice" },
    { value: "accounting_malpractice", label: "Accounting Malpractice" },
    { value: "architectural_malpractice", label: "Architectural Malpractice" },
    { value: "engineering_malpractice", label: "Engineering Malpractice" },
    { value: "insurance_bad_faith", label: "Insurance Bad Faith" },
    { value: "realtor_misconduct", label: "Realtor Misconduct" },
    { value: "financial_advisor_negligence", label: "Financial Advisor Negligence" },
    { value: "therapist_misconduct", label: "Therapist Misconduct" },
    { value: "clergy_misconduct", label: "Clergy Misconduct" },
    { value: "veterinary_malpractice", label: "Veterinary Malpractice" }
  ],
  "Catastrophic Injuries": [
    { value: "wrongful_death", label: "Wrongful Death" },
    { value: "brain_injury", label: "Traumatic Brain Injury" },
    { value: "spinal_cord_injury", label: "Spinal Cord Injury" },
    { value: "burn_injury", label: "Severe Burn Injury" },
    { value: "amputation", label: "Amputation" },
    { value: "disfigurement", label: "Disfigurement" },
    { value: "electrocution", label: "Electrocution" },
    { value: "aviation_accident", label: "Aviation Accident" },
    { value: "catastrophic_vehicle_accident", label: "Catastrophic Vehicle Accident" },
    { value: "railroad_accident", label: "Railroad Accident (FELA)" }
  ],
  "Environmental": [
    { value: "water_contamination", label: "Water Contamination" },
    { value: "air_pollution", label: "Air Pollution" },
    { value: "lead_poisoning", label: "Lead Poisoning" },
    { value: "asbestos_exposure", label: "Asbestos Exposure" },
    { value: "oil_spill", label: "Oil Spill Damage" },
    { value: "fracking_damage", label: "Fracking Damage" },
    { value: "chemical_release", label: "Chemical Release" },
    { value: "toxic_mold", label: "Toxic Mold" },
    { value: "pesticide_exposure", label: "Pesticide Exposure" },
    { value: "radiation_exposure", label: "Radiation Exposure" }
  ],
  "Mass Torts & Class Actions": [
    { value: "class_action", label: "Class Action" },
    { value: "mass_tort", label: "Mass Tort" },
    { value: "pharmaceutical_litigation", label: "Pharmaceutical Litigation" },
    { value: "consumer_fraud", label: "Consumer Fraud" },
    { value: "data_breach", label: "Data Breach" },
    { value: "securities_fraud", label: "Securities Fraud" },
    { value: "antitrust_violation", label: "Antitrust Violation" },
    { value: "employment_class_action", label: "Employment Class Action" },
    { value: "product_recall", label: "Product Recall" },
    { value: "multi_district_litigation", label: "Multi-District Litigation" }
  ],
  "Other": [
    { value: "other", label: "Other - Specify Custom Case Type" }
  ]
};

// A flat list of all case types for search/filtering
const allCaseTypes = Object.values(caseTypes).flat();

const CaseTypeDropdown = ({ onSelect, currentValue }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [customCaseType, setCustomCaseType] = useState('');
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
    // If currentValue doesn't match any predefined case types
    if (currentValue && !allCaseTypes.some(type => type.value === currentValue)) {
      setCustomCaseType(currentValue);
      setShowCustomInput(true);
    } else if (currentValue === 'other') {
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

  // Get selected case type label
  const getSelectedCaseTypeLabel = () => {
    if (showCustomInput && customCaseType) {
      return customCaseType;
    }
    
    const selectedType = allCaseTypes.find(type => type.value === currentValue);
    return selectedType ? selectedType.label : 'Select Case Type';
  };

  // Filter case types based on search or selected category
  const getFilteredCaseTypes = () => {
    if (searchValue) {
      return allCaseTypes.filter(
        type => type.label.toLowerCase().includes(searchValue.toLowerCase())
      );
    }
    
    if (selectedCategory) {
      return caseTypes[selectedCategory] || [];
    }
    
    return [];
  };

  // Handle case type selection
  const handleCaseTypeSelect = (caseTypeValue) => {
    if (caseTypeValue === 'other') {
      setShowCustomInput(true);
      // Don't close the dropdown yet
    } else {
      setShowCustomInput(false);
      onSelect(caseTypeValue);
      setDropdownOpen(false);
    }
  };

  // Handle custom case type submission
  const handleCustomCaseTypeSubmit = (e) => {
    e.preventDefault();
    if (customCaseType.trim()) {
      onSelect(customCaseType.trim());
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
      <span>{getSelectedCaseTypeLabel()}</span>
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
        <div className={styles.caseTypesPopout}>
          {showCustomInput ? (
            <div className={styles.customCaseTypeContainer}>
              <h3>Enter Custom Case Type</h3>
              <form onSubmit={handleCustomCaseTypeSubmit}>
                <p style={{ 
                  fontSize: '0.9rem', 
                  color: 'var(--text-secondary)',
                  marginBottom: '15px',
                  lineHeight: '1.4'
                }}>
                  Please specify the exact case type for your demand letter. 
                  This will be used throughout the document.
                </p>
                
                <div style={{ marginBottom: '15px' }}>
                  <label 
                    htmlFor="customCaseType" 
                    style={{ 
                      display: 'block', 
                      marginBottom: '8px',
                      fontSize: '0.9rem',
                      color: 'var(--text-primary)',
                      fontWeight: '500'
                    }}
                  >
                    Case Type Name:
                  </label>
                  <input
                    id="customCaseType"
                    type="text"
                    placeholder="E.g., Medical Device Failure, Vaccine Injury, etc."
                    value={customCaseType}
                    onChange={(e) => setCustomCaseType(e.target.value)}
                    className={styles.customCaseTypeInput}
                    autoFocus
                    style={{ marginBottom: '5px' }}
                  />
                  {customCaseType && customCaseType.length < 3 && (
                    <div style={{ 
                      color: 'var(--accent-color)', 
                      fontSize: '0.8rem',
                      marginTop: '5px'
                    }}>
                      Case type should be at least 3 characters long
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
                    Common Custom Case Types:
                  </label>
                  <div style={{ 
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '8px'
                  }}>
                    {[
                      'Vaccine Injury',
                      'COVID-19 Liability',
                      'ADA Violation',
                      'Cybersecurity Breach',
                      'Sexual Abuse',
                      'HIPAA Violation'
                    ].map(suggestion => (
                      <button
                        key={suggestion}
                        type="button"
                        onClick={() => setCustomCaseType(suggestion)}
                        style={{
                          background: 'rgba(18, 18, 18, 0.7)',
                          border: '1px solid var(--border-color)',
                          borderRadius: 'var(--border-radius)',
                          padding: '6px 12px',
                          fontSize: '0.85rem',
                          color: customCaseType === suggestion 
                            ? 'var(--secondary-color)' 
                            : 'var(--text-secondary)',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          borderColor: customCaseType === suggestion 
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
                    <li>Be specific and descriptive</li>
                    <li>Avoid abbreviations</li>
                    <li>Use proper case (Title Case preferred)</li>
                  </ul>
                </div>
                
                <div className={styles.customCaseTypeButtons}>
                  <button 
                    type="submit" 
                    className={styles.submitCustomType}
                    disabled={!customCaseType.trim() || customCaseType.length < 3}
                  >
                    Submit
                  </button>
                  <button 
                    type="button" 
                    className={styles.cancelCustomType}
                    onClick={() => {
                      setShowCustomInput(false);
                      setCustomCaseType('');
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <>
              <div className={styles.caseTypeSearch}>
                <input
                  type="text"
                  placeholder="Search case types..."
                  value={searchValue}
                  onChange={(e) => {
                    setSearchValue(e.target.value);
                    setSelectedCategory('');
                  }}
                  onClick={(e) => e.stopPropagation()}
                  autoFocus
                />
              </div>
              
              <div className={styles.caseTypeCategories}>
                {Object.keys(caseTypes).map(category => (
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
              
              <div className={styles.caseTypeList}>
                {selectedCategory && (
                  <div
                    className={`${styles.caseTypeOption} ${styles.customOptionButton}`}
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
                      setCustomCaseType('');
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 5v14M5 12h14"></path>
                    </svg>
                    Create Custom Case Type
                  </div>
                )}
                {getFilteredCaseTypes().map(type => (
                  <div
                    key={type.value}
                    className={`${styles.caseTypeOption} ${currentValue === type.value ? styles.selectedCaseType : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCaseTypeSelect(type.value);
                    }}
                  >
                    {type.label}
                  </div>
                ))}
                
                {getFilteredCaseTypes().length === 0 && searchValue && (
                  <div className={styles.noResults}>
                    <p>No matching case types found</p>
                    <button 
                      className={styles.createCustomType}
                      onClick={() => {
                        setCustomCaseType(searchValue);
                        setShowCustomInput(true);
                      }}
                    >
                      Create "{searchValue}" as custom case type
                    </button>
                  </div>
                )}
                
                {getFilteredCaseTypes().length === 0 && !searchValue && !selectedCategory && (
                  <div className={styles.selectPrompt}>Select a category or search for case types</div>
                )}
                
                {/* Add custom case type button at the bottom */}
                {searchValue && getFilteredCaseTypes().length > 0 && (
                  <div
                    className={`${styles.caseTypeOption} ${styles.customOptionButton}`}
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
                      setCustomCaseType(searchValue);
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 5v14M5 12h14"></path>
                    </svg>
                    Create Custom Case Type
                  </div>
                )}
                
                {!searchValue && !selectedCategory && (
                  <div
                    className={`${styles.caseTypeOption} ${styles.customOptionButton}`}
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
                      setCustomCaseType('');
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 5v14M5 12h14"></path>
                    </svg>
                    Create Custom Case Type
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

export default CaseTypeDropdown; 