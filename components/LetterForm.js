import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from '../styles/Form.module.css';

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

const formGroupVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 35
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

// US States for dropdown
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

// Common accident types
const accidentTypes = [
  'Rear-end Collision', 
  'T-bone/Side Impact', 
  'Head-on Collision', 
  'Multi-vehicle Collision',
  'Single Vehicle Accident', 
  'Sideswipe', 
  'Rollover', 
  'Hit and Run', 
  'Parking Lot Accident',
  'Low-speed Collision', 
  'Highway Accident', 
  'Construction Zone Accident', 
  'Intersection Accident',
  'Merging Accident', 
  'Lane Change Accident', 
  'Road Rage Incident', 
  'Distracted Driving Accident',
  'Drunk Driving Accident', 
  'Texting While Driving', 
  'Drowsy Driving Accident', 
  'Speeding Accident',
  'Weather-related Accident (Rain)', 
  'Weather-related Accident (Snow/Ice)', 
  'Weather-related Accident (Fog)',
  'Defective Vehicle Part', 
  'Tire Blowout', 
  'Road Hazard Accident', 
  'Pothole Accident',
  'Animal Crossing Accident', 
  'Pedestrian Accident',
  'Bicycle Accident',
  'Motorcycle Accident',
  'Commercial Truck Accident',
  'Bus Accident',
  'Rideshare (Uber/Lyft) Accident',
  'Delivery Vehicle Accident',
  'Work Zone/Construction Accident',
  'Underride Accident',
  'Jackknife Accident',
  'Vehicle Rollaway Accident'
];

export default function LetterForm({ onLetterGenerated }) {
  const [formData, setFormData] = useState({
    clientName: '',
    clientState: '',
    insuranceCompany: '',
    accidentDate: '',
    accidentLocation: '',
    accidentState: '',
    accidentType: '',
    customAccidentType: '',
    injuryDescription: '',
    medicalTreatment: '',
    medicalBills: '',
    lostWages: '',
    painSuffering: '',
    demandAmount: '',
    priorInjuries: '',
    preExistingConditions: '',
    witnessInformation: '',
    policeReport: false,
    policeReportNumber: '',
    faultAdmission: false,
    liabilityArgument: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [focusedField, setFocusedField] = useState(null);
  const [showMoreAccidentTypes, setShowMoreAccidentTypes] = useState(false);
  const [showCustomAccidentType, setShowCustomAccidentType] = useState(false);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: type === 'checkbox' ? checked : value
    }));
    
    // Show custom accident type input if "Other" is selected
    if (id === 'accidentType' && value === 'Other') {
      setShowCustomAccidentType(true);
    } else if (id === 'accidentType' && value !== 'Other') {
      setShowCustomAccidentType(false);
    }
  };

  const handleFocus = (field) => {
    setFocusedField(field);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  const toggleMoreAccidentTypes = () => {
    setShowMoreAccidentTypes(!showMoreAccidentTypes);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      // Process form data
      const processedData = { ...formData };
      if (formData.accidentType === 'Other') {
        processedData.accidentType = formData.customAccidentType;
      }
      
      const response = await fetch('/api/generate-letter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(processedData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate letter');
      }
      
      if (data.success) {
        onLetterGenerated(data.letter);
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

  return (
    <motion.div 
      className={styles.formContainer}
      variants={formContainerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <form className={styles.form} onSubmit={handleSubmit}>
        <motion.div 
          className={styles.formGroup}
          variants={formGroupVariants}
        >
          <h2>Client Information</h2>
          <div className={styles.formRow}>
            <motion.label 
              htmlFor="clientName"
              animate={{
                color: focusedField === 'clientName' ? 'var(--secondary-color)' : 'var(--text-primary)'
              }}
            >
              Client Full Name*
            </motion.label>
            <motion.input 
              type="text" 
              id="clientName" 
              value={formData.clientName}
              onChange={handleChange}
              onFocus={() => handleFocus('clientName')}
              onBlur={handleBlur}
              required
              whileFocus={{
                borderColor: 'var(--secondary-color)',
                boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.4)'
              }}
            />
          </div>
          
          <div className={styles.formRow}>
            <motion.label 
              htmlFor="clientState"
              animate={{
                color: focusedField === 'clientState' ? 'var(--secondary-color)' : 'var(--text-primary)'
              }}
            >
              State of Residence*
            </motion.label>
            <motion.select
              id="clientState" 
              value={formData.clientState}
              onChange={handleChange}
              onFocus={() => handleFocus('clientState')}
              onBlur={handleBlur}
              required
              whileFocus={{
                borderColor: 'var(--secondary-color)',
                boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.4)'
              }}
            >
              <option value="">Select State</option>
              {usStates.map((state) => (
                <option key={`client-${state}`} value={state}>{state}</option>
              ))}
            </motion.select>
          </div>
          
          <div className={styles.formRow}>
            <motion.label 
              htmlFor="insuranceCompany"
              animate={{
                color: focusedField === 'insuranceCompany' ? 'var(--secondary-color)' : 'var(--text-primary)'
              }}
            >
              Insurance Company Name*
            </motion.label>
            <motion.input 
              type="text" 
              id="insuranceCompany" 
              value={formData.insuranceCompany}
              onChange={handleChange}
              onFocus={() => handleFocus('insuranceCompany')}
              onBlur={handleBlur}
              required
              whileFocus={{
                borderColor: 'var(--secondary-color)',
                boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.4)'
              }}
            />
          </div>
        </motion.div>

        <motion.div 
          className={styles.formGroup}
          variants={formGroupVariants}
        >
          <h2>Accident Details</h2>
          <div className={styles.formRow}>
            <motion.label 
              htmlFor="accidentDate"
              animate={{
                color: focusedField === 'accidentDate' ? 'var(--secondary-color)' : 'var(--text-primary)'
              }}
            >
              Date of Accident*
            </motion.label>
            <motion.input 
              type="date" 
              id="accidentDate" 
              value={formData.accidentDate}
              onChange={handleChange}
              onFocus={() => handleFocus('accidentDate')}
              onBlur={handleBlur}
              required
              whileFocus={{
                borderColor: 'var(--secondary-color)',
                boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.4)'
              }}
            />
          </div>
          
          <div className={styles.formRow}>
            <motion.label 
              htmlFor="accidentLocation"
              animate={{
                color: focusedField === 'accidentLocation' ? 'var(--secondary-color)' : 'var(--text-primary)'
              }}
            >
              Location of Accident*
            </motion.label>
            <motion.input 
              type="text" 
              id="accidentLocation" 
              value={formData.accidentLocation}
              onChange={handleChange}
              onFocus={() => handleFocus('accidentLocation')}
              onBlur={handleBlur}
              required
              whileFocus={{
                borderColor: 'var(--secondary-color)',
                boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.4)'
              }}
              placeholder="Street address, intersection, or landmark"
            />
          </div>
          
          <div className={styles.formRow}>
            <motion.label 
              htmlFor="accidentState"
              animate={{
                color: focusedField === 'accidentState' ? 'var(--secondary-color)' : 'var(--text-primary)'
              }}
            >
              State Where Accident Occurred*
            </motion.label>
            <motion.select
              id="accidentState" 
              value={formData.accidentState}
              onChange={handleChange}
              onFocus={() => handleFocus('accidentState')}
              onBlur={handleBlur}
              required
              whileFocus={{
                borderColor: 'var(--secondary-color)',
                boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.4)'
              }}
            >
              <option value="">Select State</option>
              {usStates.map((state) => (
                <option key={`accident-${state}`} value={state}>{state}</option>
              ))}
            </motion.select>
          </div>
          
          <div className={styles.formRow}>
            <motion.label 
              htmlFor="accidentType"
              animate={{
                color: focusedField === 'accidentType' ? 'var(--secondary-color)' : 'var(--text-primary)'
              }}
            >
              Type of Accident*
            </motion.label>
            <motion.select
              id="accidentType" 
              value={formData.accidentType}
              onChange={handleChange}
              onFocus={() => handleFocus('accidentType')}
              onBlur={handleBlur}
              required
              whileFocus={{
                borderColor: 'var(--secondary-color)',
                boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.4)'
              }}
            >
              <option value="">Select Accident Type</option>
              {accidentTypes.slice(0, showMoreAccidentTypes ? accidentTypes.length : 10).map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
              <option value="Other">Other (Specify)</option>
            </motion.select>
            
            {!showMoreAccidentTypes && (
              <motion.button
                type="button"
                className={styles.moreOptionsButton}
                onClick={toggleMoreAccidentTypes}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Show More Options
              </motion.button>
            )}
            
            {showMoreAccidentTypes && (
              <motion.button
                type="button"
                className={styles.moreOptionsButton}
                onClick={toggleMoreAccidentTypes}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Show Fewer Options
              </motion.button>
            )}
          </div>
          
          {showCustomAccidentType && (
            <motion.div 
              className={styles.formRow}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.label 
                htmlFor="customAccidentType"
                animate={{
                  color: focusedField === 'customAccidentType' ? 'var(--secondary-color)' : 'var(--text-primary)'
                }}
              >
                Specify Accident Type*
              </motion.label>
              <motion.input 
                type="text" 
                id="customAccidentType" 
                value={formData.customAccidentType}
                onChange={handleChange}
                onFocus={() => handleFocus('customAccidentType')}
                onBlur={handleBlur}
                required={formData.accidentType === 'Other'}
                whileFocus={{
                  borderColor: 'var(--secondary-color)',
                  boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.4)'
                }}
              />
            </motion.div>
          )}
          
          <div className={styles.formRow}>
            <motion.label 
              htmlFor="policeReport"
              animate={{
                color: focusedField === 'policeReport' ? 'var(--secondary-color)' : 'var(--text-primary)'
              }}
            >
              Was a Police Report Filed?
            </motion.label>
            <div className={styles.checkbox}>
              <motion.input 
                type="checkbox" 
                id="policeReport" 
                checked={formData.policeReport}
                onChange={handleChange}
                onFocus={() => handleFocus('policeReport')}
                onBlur={handleBlur}
              />
              <span>Yes, a police report was filed</span>
            </div>
          </div>
          
          {formData.policeReport && (
            <motion.div 
              className={styles.formRow}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.label 
                htmlFor="policeReportNumber"
                animate={{
                  color: focusedField === 'policeReportNumber' ? 'var(--secondary-color)' : 'var(--text-primary)'
                }}
              >
                Police Report Number
              </motion.label>
              <motion.input 
                type="text" 
                id="policeReportNumber" 
                value={formData.policeReportNumber}
                onChange={handleChange}
                onFocus={() => handleFocus('policeReportNumber')}
                onBlur={handleBlur}
                whileFocus={{
                  borderColor: 'var(--secondary-color)',
                  boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.4)'
                }}
              />
            </motion.div>
          )}
          
          <div className={styles.formRow}>
            <motion.label 
              htmlFor="faultAdmission"
              animate={{
                color: focusedField === 'faultAdmission' ? 'var(--secondary-color)' : 'var(--text-primary)'
              }}
            >
              Did the other party admit fault?
            </motion.label>
            <div className={styles.checkbox}>
              <motion.input 
                type="checkbox" 
                id="faultAdmission" 
                checked={formData.faultAdmission}
                onChange={handleChange}
                onFocus={() => handleFocus('faultAdmission')}
                onBlur={handleBlur}
              />
              <span>Yes, the other party admitted fault</span>
            </div>
          </div>
          
          <div className={styles.formRow}>
            <motion.label 
              htmlFor="witnessInformation"
              animate={{
                color: focusedField === 'witnessInformation' ? 'var(--secondary-color)' : 'var(--text-primary)'
              }}
            >
              Witness Information
            </motion.label>
            <motion.textarea 
              id="witnessInformation" 
              rows="2" 
              value={formData.witnessInformation}
              onChange={handleChange}
              onFocus={() => handleFocus('witnessInformation')}
              onBlur={handleBlur}
              placeholder="Names and contact information of witnesses (if any)"
              whileFocus={{
                borderColor: 'var(--secondary-color)',
                boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.4)'
              }}
            ></motion.textarea>
          </div>
          
          <div className={styles.formRow}>
            <motion.label 
              htmlFor="liabilityArgument"
              animate={{
                color: focusedField === 'liabilityArgument' ? 'var(--secondary-color)' : 'var(--text-primary)'
              }}
            >
              Liability Argument
            </motion.label>
            <motion.textarea 
              id="liabilityArgument" 
              rows="3" 
              value={formData.liabilityArgument}
              onChange={handleChange}
              onFocus={() => handleFocus('liabilityArgument')}
              onBlur={handleBlur}
              placeholder="Explain why the other party is at fault"
              whileFocus={{
                borderColor: 'var(--secondary-color)',
                boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.4)'
              }}
            ></motion.textarea>
          </div>
          
          <div className={styles.formRow}>
            <motion.label 
              htmlFor="injuryDescription"
              animate={{
                color: focusedField === 'injuryDescription' ? 'var(--secondary-color)' : 'var(--text-primary)'
              }}
            >
              Description of Injuries*
            </motion.label>
            <motion.textarea 
              id="injuryDescription" 
              rows="3" 
              value={formData.injuryDescription}
              onChange={handleChange}
              onFocus={() => handleFocus('injuryDescription')}
              onBlur={handleBlur}
              required
              whileFocus={{
                borderColor: 'var(--secondary-color)',
                boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.4)'
              }}
            ></motion.textarea>
          </div>
        </motion.div>

        <motion.div 
          className={styles.formGroup}
          variants={formGroupVariants}
        >
          <h2>Medical History</h2>
          <div className={styles.formRow}>
            <motion.label 
              htmlFor="preExistingConditions"
              animate={{
                color: focusedField === 'preExistingConditions' ? 'var(--secondary-color)' : 'var(--text-primary)'
              }}
            >
              Pre-existing Conditions
            </motion.label>
            <motion.textarea 
              id="preExistingConditions" 
              rows="2" 
              value={formData.preExistingConditions}
              onChange={handleChange}
              onFocus={() => handleFocus('preExistingConditions')}
              onBlur={handleBlur}
              placeholder="List any pre-existing conditions that might be relevant"
              whileFocus={{
                borderColor: 'var(--secondary-color)',
                boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.4)'
              }}
            ></motion.textarea>
          </div>
          
          <div className={styles.formRow}>
            <motion.label 
              htmlFor="priorInjuries"
              animate={{
                color: focusedField === 'priorInjuries' ? 'var(--secondary-color)' : 'var(--text-primary)'
              }}
            >
              Prior Injuries
            </motion.label>
            <motion.textarea 
              id="priorInjuries" 
              rows="2" 
              value={formData.priorInjuries}
              onChange={handleChange}
              onFocus={() => handleFocus('priorInjuries')}
              onBlur={handleBlur}
              placeholder="List any prior injuries to the same body parts"
              whileFocus={{
                borderColor: 'var(--secondary-color)',
                boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.4)'
              }}
            ></motion.textarea>
          </div>
          
          <div className={styles.formRow}>
            <motion.label 
              htmlFor="medicalTreatment"
              animate={{
                color: focusedField === 'medicalTreatment' ? 'var(--secondary-color)' : 'var(--text-primary)'
              }}
            >
              Medical Treatment Received*
            </motion.label>
            <motion.textarea 
              id="medicalTreatment" 
              rows="3" 
              value={formData.medicalTreatment}
              onChange={handleChange}
              onFocus={() => handleFocus('medicalTreatment')}
              onBlur={handleBlur}
              required
              placeholder="List all medical treatments, providers, and dates"
              whileFocus={{
                borderColor: 'var(--secondary-color)',
                boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.4)'
              }}
            ></motion.textarea>
          </div>
        </motion.div>
        
        <motion.div 
          className={styles.formGroup}
          variants={formGroupVariants}
        >
          <h2>Damages</h2>
          <div className={styles.formRow}>
            <motion.label 
              htmlFor="medicalBills"
              animate={{
                color: focusedField === 'medicalBills' ? 'var(--secondary-color)' : 'var(--text-primary)'
              }}
            >
              Medical Bills Total ($)*
            </motion.label>
            <motion.input 
              type="number" 
              id="medicalBills" 
              min="0" 
              step="0.01" 
              value={formData.medicalBills}
              onChange={handleChange}
              onFocus={() => handleFocus('medicalBills')}
              onBlur={handleBlur}
              required
              whileFocus={{
                borderColor: 'var(--secondary-color)',
                boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.4)'
              }}
            />
          </div>
          
          <div className={styles.formRow}>
            <motion.label 
              htmlFor="lostWages"
              animate={{
                color: focusedField === 'lostWages' ? 'var(--secondary-color)' : 'var(--text-primary)'
              }}
            >
              Lost Wages ($)
            </motion.label>
            <motion.input 
              type="number" 
              id="lostWages" 
              min="0" 
              step="0.01" 
              value={formData.lostWages}
              onChange={handleChange}
              onFocus={() => handleFocus('lostWages')}
              onBlur={handleBlur}
              whileFocus={{
                borderColor: 'var(--secondary-color)',
                boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.4)'
              }}
            />
          </div>
          
          <div className={styles.formRow}>
            <motion.label 
              htmlFor="painSuffering"
              animate={{
                color: focusedField === 'painSuffering' ? 'var(--secondary-color)' : 'var(--text-primary)'
              }}
            >
              Pain and Suffering Description
            </motion.label>
            <motion.textarea 
              id="painSuffering" 
              rows="3"
              value={formData.painSuffering}
              onChange={handleChange}
              onFocus={() => handleFocus('painSuffering')}
              onBlur={handleBlur}
              placeholder="Describe how the injuries have affected daily life, emotional state, etc."
              whileFocus={{
                borderColor: 'var(--secondary-color)',
                boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.4)'
              }}
            ></motion.textarea>
          </div>
          
          <div className={styles.formRow}>
            <motion.label 
              htmlFor="demandAmount"
              animate={{
                color: focusedField === 'demandAmount' ? 'var(--secondary-color)' : 'var(--text-primary)'
              }}
            >
              Demand Amount ($)*
            </motion.label>
            <motion.input 
              type="number" 
              id="demandAmount" 
              min="0" 
              step="0.01" 
              value={formData.demandAmount}
              onChange={handleChange}
              onFocus={() => handleFocus('demandAmount')}
              onBlur={handleBlur}
              required
              whileFocus={{
                borderColor: 'var(--secondary-color)',
                boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.4)'
              }}
            />
          </div>
        </motion.div>

        <div className={styles.buttonRow}>
          <motion.button 
            type="submit" 
            className={styles.submitButton}
            disabled={isLoading}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            {isLoading ? (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: {
                    duration: 0.3,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }
                }}
              >
                Generating...
              </motion.span>
            ) : 'Generate Letter'}
          </motion.button>
        </div>
        
        {error && (
          <motion.div 
            className={styles.error}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            Error: {error}. Please try again.
          </motion.div>
        )}
      </form>
    </motion.div>
  );
} 