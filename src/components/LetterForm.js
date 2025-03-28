import { useState } from 'react';
import styles from '../styles/Form.module.css';
import dynamic from 'next/dynamic';

// Dynamically import StrategyRecommendations to avoid SSR issues
const StrategyRecommendations = dynamic(() => import('./StrategyRecommendations'), { ssr: false });

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
    includeVisuals: true
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [suggestedDemand, setSuggestedDemand] = useState(null);
  const [showStrategy, setShowStrategy] = useState(false);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: type === 'checkbox' ? checked : value
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
      const response = await fetch('/api/generate-letter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
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
  
  const toggleStrategyView = () => {
    setShowStrategy(!showStrategy);
  };
  
  // Check if we have enough information to show strategies
  const canShowStrategy = formData.caseType && formData.injuryType && formData.medicalBills;
  
  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <div className={styles.formGroup}>
          <h2>Client & Case Information</h2>
          
          <div className={styles.formRow}>
            <label htmlFor="clientName">Client Name</label>
            <input
              type="text"
              id="clientName"
              value={formData.clientName}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className={styles.formRow}>
            <label htmlFor="insuranceCompany">Insurance Company</label>
            <input
              type="text"
              id="insuranceCompany"
              value={formData.insuranceCompany}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className={styles.formRow}>
            <label htmlFor="jurisdiction">Jurisdiction (State)</label>
            <input
              type="text"
              id="jurisdiction"
              value={formData.jurisdiction}
              onChange={handleChange}
              placeholder="e.g. California"
            />
          </div>
          
          <div className={styles.formRow}>
            <label htmlFor="caseType">Case Type</label>
            <select
              id="caseType"
              value={formData.caseType}
              onChange={handleChange}
              required
            >
              <option value="auto_accident">Auto Accident</option>
              <option value="slip_and_fall">Slip and Fall</option>
              <option value="premises_liability">Premises Liability</option>
              <option value="medical_malpractice">Medical Malpractice</option>
              <option value="product_liability">Product Liability</option>
            </select>
          </div>
        </div>
        
        <div className={styles.formGroup}>
          <h2>Accident Details</h2>
          
          <div className={styles.formRow}>
            <label htmlFor="accidentDate">Date of Accident</label>
            <input
              type="date"
              id="accidentDate"
              value={formData.accidentDate}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className={styles.formRow}>
            <label htmlFor="accidentLocation">Location of Accident</label>
            <input
              type="text"
              id="accidentLocation"
              value={formData.accidentLocation}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className={styles.formRow}>
            <label htmlFor="liabilityStrength">Liability Strength</label>
            <select
              id="liabilityStrength"
              value={formData.liabilityStrength}
              onChange={handleChange}
            >
              <option value="clear_fault">Clear Liability</option>
              <option value="shared_fault">Shared Liability</option>
              <option value="negligence">Negligence-Based</option>
            </select>
          </div>
        </div>
        
        <div className={styles.formGroup}>
          <h2>Injury Information</h2>
          
          <div className={styles.formRow}>
            <label htmlFor="injuryType">Primary Injury Type</label>
            <select
              id="injuryType"
              value={formData.injuryType}
              onChange={handleChange}
              required
            >
              <option value="soft_tissue">Soft Tissue</option>
              <option value="whiplash">Whiplash</option>
              <option value="back_injury">Back Injury</option>
              <option value="fracture">Fracture</option>
              <option value="tbi">Traumatic Brain Injury</option>
            </select>
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
            <div className={styles.checkboxRow}>
              <input
                type="checkbox"
                id="hasPreExisting"
                checked={formData.hasPreExisting}
                onChange={handleChange}
              />
              <label htmlFor="hasPreExisting">Pre-existing conditions?</label>
            </div>
          </div>
        </div>
        
        <div className={styles.formGroup}>
          <h2>Damages</h2>
          
          <div className={styles.formRow}>
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
          
          <div className={styles.formRow}>
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
            <div className={styles.demandAmountRow}>
              <div>
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
            <div className={styles.checkboxRow}>
              <input
                type="checkbox"
                id="includeVisuals"
                checked={formData.includeVisuals}
                onChange={handleChange}
              />
              <label htmlFor="includeVisuals">Include visual elements (timelines, charts)</label>
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
        
        <div className={styles.buttonRow}>
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Generating...' : 'Generate Document'}
          </button>
        </div>
        
        {error && <div className={styles.error}>{error}</div>}
      </form>
      
      {showStrategy && canShowStrategy && (
        <StrategyRecommendations
          caseType={formData.caseType}
          injuryType={formData.injuryType}
          hasPreExisting={formData.hasPreExisting}
          medicalExpenses={parseFloat(formData.medicalBills) || 0}
          liabilityStrength={formData.liabilityStrength}
          insuranceCompany={formData.insuranceCompany}
          includeVisuals={formData.includeVisuals}
        />
      )}
    </div>
  );
} 