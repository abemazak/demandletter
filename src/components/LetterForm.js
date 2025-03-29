import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import styles from '../styles/Form.module.css';
import dynamic from 'next/dynamic';
import CaseTypeDropdown from './CaseTypeDropdown';
import InjuryTypeDropdown from './InjuryTypeDropdown';
import DocumentUpload from './DocumentUpload';

// Dynamically import StrategyRecommendations to avoid SSR issues
const StrategyRecommendations = dynamic(() => import('./StrategyRecommendations'), { ssr: false });

// Animation variants
const formContainerVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 35,
      staggerChildren: 0.05
    }
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.2
    }
  }
};

const buttonVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 25
    }
  },
  hover: {
    scale: 1.02,
    boxShadow: "0 5px 15px rgba(0,0,0,0.15)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 15
    }
  },
  tap: {
    scale: 0.98
  }
};

// US States for jurisdiction dropdown
const usStates = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 
  'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 
  'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 
  'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
  'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 
  'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 
  'Wisconsin', 'Wyoming', 'District of Columbia'
];

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
  ]
};

// A flat list of all case types for search/filtering
const allCaseTypes = Object.values(caseTypes).flat();

export default function LetterForm({ onLetterGenerated }) {
  const [formData, setFormData] = useState({
    clientName: '',
    insuranceCompany: '',
    accidentDate: '',
    accidentLocation: '',
    injuryDescription: '',
    medicalTreatment: '',
    medicalBills: '',
    lostWages: '',
    painSuffering: '',
    demandAmount: '',
    caseType: 'auto_accident',
    injuryType: 'soft_tissue',
    jurisdiction: '',
    liabilityStrength: 'clear_fault',
    hasPreExisting: false,
    preExistingDetails: '',
    includeVisuals: true,
    parsedDocuments: null
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [suggestedDemand, setSuggestedDemand] = useState(null);
  const [showStrategy, setShowStrategy] = useState(false);
  
  // Add this state to track if the liability dropdown is focused
  const [showLiabilityFactors, setShowLiabilityFactors] = useState(false);
  
  // Add these lines:
  const liabilityDropdownRef = useRef(null);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (liabilityDropdownRef.current && !liabilityDropdownRef.current.contains(event.target)) {
        setShowLiabilityFactors(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [liabilityDropdownRef]);
  
  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    console.log(`Updating ${id} to`, type === 'checkbox' ? checked : value); // Debug log

    setFormData(prevData => ({
      ...prevData,
      [id]: type === 'checkbox' ? checked : value
    }));
  };

  const handleCaseTypeSelect = (caseTypeValue) => {
    setFormData(prevData => ({
      ...prevData,
      caseType: caseTypeValue
    }));
  };

  const handleInjuryTypeSelect = (injuryTypeValue) => {
    setFormData(prevData => ({
      ...prevData,
      injuryType: injuryTypeValue
    }));
  };

  const handleCalculateDemand = async () => {
    if (!formData.medicalBills) {
      setError("Medical bills are required to calculate a suggested demand");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Use the same endpoint but only return the suggested amount
      const response = await fetch('/api/generate-letter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          calculateOnly: true
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to calculate demand');
      }
      
      setSuggestedDemand(data.suggestedDemandAmount);
      
      // Auto-fill the demand amount
      setFormData(prev => ({
        ...prev,
        demandAmount: data.suggestedDemandAmount.toString()
      }));
      
    } catch (err) {
      setError(err.message);
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      // Process form data
      const processedData = { ...formData };
      
      // Include parsed document data in API request
      if (formData.parsedDocuments) {
        processedData.documentData = formData.parsedDocuments;
      }
      
      const response = await fetch('/api/generate-letter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(processedData),
      });
      
      const data = await response.json();
      console.log("Full API response:", data);
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate letter');
      }
      
      if (data.success) {
        console.log("Letter content received:", data.letterContent ? "YES" : "NO");
        console.log("Letter field received:", data.letter ? "YES" : "NO");
        
        // Try both fields, ensure it's a string
        let letterToUse = data.letterContent || data.letter || '';
        
        // If the letter is empty but we know it was generated successfully, something is wrong with the content
        if (!letterToUse.trim() && data.success) {
          letterToUse = `
            <h2>DEMAND LETTER</h2>
            <p>The letter was generated successfully but couldn't be displayed properly.</p>
            <p>Please try downloading or printing the letter instead, or go back and generate again.</p>
            <p>Suggested demand amount: $${data.suggestedDemandAmount ? data.suggestedDemandAmount.toLocaleString() : '0'}</p>
          `;
        }
        
        onLetterGenerated(letterToUse);
      } else {
        throw new Error(data.error || 'An unknown error occurred');
      }
    } catch (err) {
      setError(err.message);
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  const toggleStrategyView = () => {
    setShowStrategy(!showStrategy);
  };
  
  // Check if we have enough information to show strategies
  const canShowStrategy = formData.caseType && formData.injuryType && formData.medicalBills;
  
  // Handle document upload completion
  const handleDocumentUpload = (parsedData) => {
    console.log('Received parsed document data:', parsedData);
    
    // Update form data with parsed documents
    setFormData(prevData => ({
      ...prevData,
      parsedDocuments: parsedData
    }));
    
    // Auto-fill form fields based on parsed document data
    autoFillFromDocuments(parsedData);
  };
  
  // Auto-fill form fields based on parsed documents
  const autoFillFromDocuments = (parsedData) => {
    const updatedFields = { ...formData };
    let hasUpdates = false;
    
    // Loop through each parsed document
    Object.entries(parsedData).forEach(([filename, docData]) => {
      // Skip documents with parsing errors
      if (docData.error) return;
      
      try {
        // Try to parse the extracted data if it's a string (JSON)
        const extractedData = typeof docData.extractedData === 'string' 
          ? JSON.parse(docData.extractedData)
          : docData.extractedData;
        
        // Based on document type, fill in corresponding form fields
        switch (docData.docType) {
          case 'medical':
            if (!updatedFields.injuryDescription && extractedData.diagnosis) {
              updatedFields.injuryDescription = extractedData.diagnosis;
              hasUpdates = true;
            }
            if (!updatedFields.medicalTreatment && extractedData.treatmentPlan) {
              updatedFields.medicalTreatment = extractedData.treatmentPlan;
              hasUpdates = true;
            }
            break;
            
          case 'billing':
            if (!updatedFields.medicalBills && extractedData.totalBilledAmount) {
              // Remove currency symbols and commas
              const amount = extractedData.totalBilledAmount.toString().replace(/[$,]/g, '');
              updatedFields.medicalBills = parseFloat(amount).toString();
              hasUpdates = true;
            }
            break;
            
          case 'insurance':
            if (!updatedFields.insuranceCompany && extractedData.insuranceCompanyName) {
              updatedFields.insuranceCompany = extractedData.insuranceCompanyName;
              hasUpdates = true;
            }
            break;
            
          case 'police':
            if (!updatedFields.accidentLocation && extractedData.locationOfIncident) {
              updatedFields.accidentLocation = extractedData.locationOfIncident;
              hasUpdates = true;
            }
            if (!updatedFields.accidentDate && extractedData.dateOfIncident) {
              // Format date if needed
              updatedFields.accidentDate = extractedData.dateOfIncident;
              hasUpdates = true;
            }
            break;
            
          case 'employment':
            if (!updatedFields.lostWages && extractedData.lostWagesInformation) {
              // Remove currency symbols and commas
              const amount = extractedData.lostWagesInformation.toString().replace(/[$,]/g, '');
              updatedFields.lostWages = parseFloat(amount).toString();
              hasUpdates = true;
            }
            break;
            
          default:
            // Handle generic document data
            break;
        }
      } catch (error) {
        console.error(`Error processing extracted data for ${filename}:`, error);
      }
    });
    
    // Update form data if any fields were changed
    if (hasUpdates) {
      setFormData(updatedFields);
    }
  };
  
  return (
    <div className="w-full max-w-4xl mx-auto">
      <motion.div 
        className={styles.formContainer}
        variants={formContainerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <h2>Client & Case Information</h2>
            
            <div className={styles.formGrid}>
              <div className={styles.formCol}>
                <label htmlFor="clientName">Client Name</label>
                <input
                  type="text"
                  id="clientName"
                  value={formData.clientName}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className={styles.formCol}>
                <label htmlFor="insuranceCompany">Insurance Company</label>
                <input
                  type="text"
                  id="insuranceCompany"
                  value={formData.insuranceCompany}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className={styles.formGrid}>
              <div className={styles.formCol}>
                <label htmlFor="jurisdiction">Jurisdiction (State)</label>
                <select
                  id="jurisdiction"
                  value={formData.jurisdiction}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select State</option>
                  {usStates.map((state) => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>
              
              <div className={styles.formCol}>
                <label htmlFor="caseType">Case Type</label>
                <CaseTypeDropdown 
                  currentValue={formData.caseType}
                  onSelect={handleCaseTypeSelect}
                />
              </div>
            </div>
          </div>
          
          <div className={styles.formGroup}>
            <h2>Accident Details</h2>
            
            <div className={styles.formGrid}>
              <div className={styles.formCol}>
                <label htmlFor="accidentDate">Date of Accident</label>
                <input
                  type="date"
                  id="accidentDate"
                  value={formData.accidentDate}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className={styles.formCol}>
                <label htmlFor="accidentLocation">Location of Accident</label>
                <input
                  type="text"
                  id="accidentLocation"
                  value={formData.accidentLocation}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className={styles.formRow} ref={liabilityDropdownRef}>
              <label htmlFor="liabilityStrength">Liability Strength</label>
              <div className={styles.liabilityDropdownContainer}>
                <select
                  id="liabilityStrength"
                  value={formData.liabilityStrength}
                  onChange={handleChange}
                  onClick={() => setShowLiabilityFactors(!showLiabilityFactors)}
                >
                  <option value="clear_fault">Clear Liability</option>
                  <option value="shared_fault">Shared Liability</option>
                  <option value="negligence">Negligence-Based</option>
                </select>
              </div>
              
              {showLiabilityFactors && (
                <div className={styles.liabilityFactors}>
                  <h3 className={styles.sectionSubheading}>Key Factors in Liability Strength</h3>
                  <ul className={styles.factorsList}>
                    <li className={formData.liabilityStrength === "clear_fault" ? styles.activeFactorItem : ""}>
                      <span className={styles.factorTitle}>Clear Fault</span> – Does the evidence show the defendant acted negligently or intentionally?
                    </li>
                    <li>
                      <span className={styles.factorTitle}>Supporting Evidence</span> – Are there witnesses, police reports, photos, videos, or expert testimony backing the claim?
                    </li>
                    <li className={formData.liabilityStrength === "negligence" ? styles.activeFactorItem : ""}>
                      <span className={styles.factorTitle}>Violation of Laws/Duties</span> – Did the defendant break a law or fail in a legal duty?
                    </li>
                    <li className={formData.liabilityStrength === "shared_fault" ? styles.activeFactorItem : ""}>
                      <span className={styles.factorTitle}>Comparative Negligence</span> – Could the plaintiff's own actions reduce liability?
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
          
          <div className={styles.formGroup}>
            <h2>Injury Information</h2>
            
            <div className={styles.formRow}>
              <label htmlFor="injuryType">Injury Type</label>
              <InjuryTypeDropdown 
                currentValue={formData.injuryType}
                onSelect={handleInjuryTypeSelect}
              />
            </div>
            
            <div className={styles.formRow}>
              <label htmlFor="injuryDescription">Injury Description</label>
              <textarea
                id="injuryDescription"
                value={formData.injuryDescription}
                onChange={handleChange}
                rows="4"
                required
                placeholder="Describe the injuries sustained..."
              />
            </div>
            
            <div className={styles.formRow}>
              <label htmlFor="medicalTreatment">Medical Treatment</label>
              <textarea
                id="medicalTreatment"
                value={formData.medicalTreatment}
                onChange={handleChange}
                rows="4"
                required
                placeholder="Describe the medical treatment received..."
              />
            </div>
            
            <div className={styles.formRow}>
              <div className={styles.checkboxContainer}>
                <input
                  type="checkbox"
                  id="hasPreExisting"
                  checked={formData.hasPreExisting}
                  onChange={handleChange}
                />
                <label htmlFor="hasPreExisting" className={styles.checkboxLabel}>Pre-existing conditions?</label>
              </div>
            </div>
            
            {formData.hasPreExisting && (
              <div className={styles.formRow}>
                <div className={styles.preExistingContainer}>
                  <label htmlFor="preExistingDetails">
                    <span className={styles.preExistingLabel}>Pre-existing Condition Details</span>
                    <span className={styles.preExistingHint}>Specify any relevant medical history that may affect this claim</span>
                  </label>
                  <textarea
                    id="preExistingDetails"
                    value={formData.preExistingDetails}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Describe any pre-existing conditions relevant to this case (e.g., prior injuries, chronic conditions, previous treatments)..."
                    className={styles.preExistingTextarea}
                  />
                </div>
              </div>
            )}
          </div>
          
          <div className={styles.formGroup}>
            <h2>Damages</h2>
            
            <div className={styles.formGrid}>
              <div className={styles.formCol}>
                <label htmlFor="medicalBills">Medical Bills ($)</label>
                <input
                  type="number"
                  id="medicalBills"
                  value={formData.medicalBills}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  required
                />
              </div>
              
              <div className={styles.formCol}>
                <label htmlFor="lostWages">Lost Wages ($)</label>
                <input
                  type="number"
                  id="lostWages"
                  value={formData.lostWages}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                />
              </div>
            </div>
            
            <div className={styles.formRow}>
              <label htmlFor="painSuffering">Pain and Suffering Description</label>
              <textarea
                id="painSuffering"
                value={formData.painSuffering}
                onChange={handleChange}
                rows="4"
                placeholder="Describe the pain and suffering experienced..."
              />
            </div>
            
            <div className={styles.formRow}>
              <div className={styles.demandRow}>
                <div className={styles.demandInput}>
                  <label htmlFor="demandAmount">Demand Amount ($)</label>
                  <input
                    type="number"
                    id="demandAmount"
                    value={formData.demandAmount}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    placeholder={suggestedDemand ? suggestedDemand.toString() : "Enter amount or calculate"}
                  />
                </div>
                <button 
                  type="button" 
                  onClick={handleCalculateDemand}
                  className={styles.calculateBtn}
                  disabled={!formData.medicalBills || isLoading}
                >
                  Calculate
                </button>
              </div>
              {suggestedDemand && (
                <div className={styles.suggestedDemand}>
                  Suggested demand: ${suggestedDemand.toLocaleString()}
                </div>
              )}
            </div>
          </div>
          
          <div className={styles.formGroup}>
            <h2>Letter Options</h2>
            <div className={styles.formRow}>
              <div className={styles.checkboxContainer}>
                <input
                  type="checkbox"
                  id="includeVisuals"
                  checked={formData.includeVisuals}
                  onChange={handleChange}
                />
                <label htmlFor="includeVisuals" className={styles.checkboxLabel}>Include visual elements (timelines, charts)</label>
              </div>
            </div>
          </div>
          
          {canShowStrategy && (
            <button 
              type="button" 
              onClick={toggleStrategyView} 
              className={styles.strategyToggle}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20V10"></path>
                <path d="M18 20V4"></path>
                <path d="M6 20v-6"></path>
              </svg>
              {showStrategy ? 'Hide Strategic Recommendations' : 'Show Strategic Recommendations'}
            </button>
          )}
          
          <DocumentUpload onUpload={handleDocumentUpload} />
          
          <motion.div 
            className={styles.buttonRow}
            variants={formContainerVariants}
          >
            <motion.button 
              type="submit"
              className={styles.submitButton}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className={styles.loadingSpinner}>Processing...</span>
              ) : (
                "Generate Demand Letter"
              )}
            </motion.button>
          </motion.div>
          
          {error && (
            <motion.div 
              className={styles.error}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {error}
            </motion.div>
          )}
        </form>
        
        {showStrategy && canShowStrategy && (
          <StrategyRecommendations
            caseType={formData.caseType}
            injuryType={formData.injuryType}
            hasPreExisting={formData.hasPreExisting}
            preExistingDetails={formData.preExistingDetails}
            medicalExpenses={parseFloat(formData.medicalBills) || 0}
            liabilityStrength={formData.liabilityStrength}
            insuranceCompany={formData.insuranceCompany}
            includeVisuals={formData.includeVisuals}
          />
        )}
      </motion.div>
    </div>
  );
} 