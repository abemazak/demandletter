import React from 'react';
import styles from '../styles/Form.module.css';
import { recommendationEngine } from '../data/strategyGuide';

interface StrategyRecommendationsProps {
  caseType: string;
  injuryType: string;
  hasPreExisting: boolean;
  medicalExpenses: number;
  liabilityStrength: string;
  insuranceCompany: string;
  includeVisuals: boolean;
}

const StrategyRecommendations: React.FC<StrategyRecommendationsProps> = ({
  caseType,
  injuryType,
  hasPreExisting,
  medicalExpenses,
  liabilityStrength,
  insuranceCompany,
  includeVisuals
}) => {
  // Convert liability strength to numeric value (0-1)
  const getLiabilityScore = () => {
    switch (liabilityStrength) {
      case 'clear_fault': return 0.9;
      case 'shared_fault': return 0.6;
      case 'negligence': return 0.7;
      default: return 0.5;
    }
  };
  
  // Calculate liability strength score
  const liabilityScore = getLiabilityScore();
  
  // Estimate severity based on injury type
  const getInjurySeverity = () => {
    if (injuryType === 'tbi') return 'Severe/Permanent';
    if (injuryType === 'fracture') return 'Moderate';
    if (injuryType === 'back_injury') return 'Moderate';
    return 'Minor';
  };
  
  const injurySeverity = getInjurySeverity();
  
  // Get recommended multiplier
  const multiplierRecommendation = recommendationEngine.recommendMultiplier(
    injuryType,
    injurySeverity === 'Severe/Permanent',
    3, // Assuming 3 months of treatment as default
    injuryType === 'fracture' || medicalExpenses > 20000
  );
  
  // Get recommended tone
  const toneRecommendation = recommendationEngine.recommendTone(
    liabilityScore,
    injurySeverity,
    insuranceCompany,
    false // Not approaching SOL by default
  );
  
  // Get anticipated defenses
  const anticipatedDefenses = recommendationEngine.anticipateDefenses(
    caseType,
    injuryType,
    hasPreExisting,
    false // No gap in treatment by default
  );
  
  // Get recommended visuals
  const recommendedVisuals = recommendationEngine.recommendVisuals(
    caseType,
    injuryType,
    medicalExpenses,
    includeVisuals
  );
  
  return (
    <div className={styles.strategyContainer}>
      <h2>Strategic Recommendations</h2>
      
      <div className={styles.strategySection}>
        <h3>Liability Strategy</h3>
        <div className={styles.strategyStrength}>
          <div className={styles.strengthBar}>
            <div 
              className={styles.strengthFill} 
              style={{ width: `${liabilityScore * 100}%` }}
            />
          </div>
          <span>{Math.round(liabilityScore * 100)}% Strength</span>
        </div>
        <p>{liabilityScore > 0.7 
          ? "Emphasize clear liability with confident language" 
          : "Balance liability arguments with focus on damages"}</p>
      </div>
      
      <div className={styles.strategySection}>
        <h3>Damages Multiplier</h3>
        <p className={styles.recommendationHighlight}>{multiplierRecommendation.range}</p>
        <p>{multiplierRecommendation.recommendation}</p>
      </div>
      
      <div className={styles.strategySection}>
        <h3>Communication Tone</h3>
        <p className={styles.recommendationHighlight}>{toneRecommendation.toneType}</p>
        <p className={styles.exampleText}>"{toneRecommendation.examples[0]}"</p>
      </div>
      
      <div className={styles.strategySection}>
        <h3>Anticipated Defenses</h3>
        <ul className={styles.defenseList}>
          {anticipatedDefenses.map((defense, index) => (
            <li key={index}>
              <span className={styles.defenseItem}>{defense}</span>
              <p className={styles.counterStrategy}>
                {getCounterStrategy(defense, injuryType, hasPreExisting)}
              </p>
            </li>
          ))}
        </ul>
      </div>
      
      {includeVisuals && (
        <div className={styles.strategySection}>
          <h3>Recommended Visuals</h3>
          <ul className={styles.visualsList}>
            {recommendedVisuals.map((visual, index) => (
              <li key={index}>{visual}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

// Helper function to provide counter-strategies for common defenses
function getCounterStrategy(defense: string, injuryType: string, hasPreExisting: boolean): string {
  switch (defense) {
    case 'Comparative negligence':
      return "Emphasize defendant's primary fault and provide evidence of client's reasonable actions";
    
    case 'Pre-existing condition caused symptoms':
      return "Include specific medical documentation showing change in symptoms after incident";
    
    case 'Degenerative conditions not accident-related':
      return "Highlight absence of treatment before incident and doctor's causation statement";
    
    case 'Gap in treatment indicates lack of serious injury':
      return "Explain reasons for gap and document continued symptoms during period";
    
    case 'Excessive treatment for minor injuries':
      return "Include medical necessity statements and treatment authorization documentation";
    
    default:
      return "Provide clear factual evidence to counter this defense";
  }
}

export default StrategyRecommendations; 