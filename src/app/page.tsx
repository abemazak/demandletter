"use client";

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './page.module.css';
import formStyles from '../styles/Form.module.css';
import { strategyGuide } from '../data/strategyGuide';
import Layout from '../components/Layout';

// Import components from src/components - only use dynamic imports
const LetterForm = dynamic(() => import('../components/LetterForm.js'), { ssr: false });
const GeneratedLetter = dynamic(() => import('../components/GeneratedLetter.js'), { ssr: false });

// Tabs for different sections
enum TabType {
  Generator = 'generator',
  StrategyGuide = 'strategy',
}

// Framer motion variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      duration: 0.5,
      staggerChildren: 0.1 
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { 
      type: "spring",
      stiffness: 300,
      damping: 24
    }
  },
  exit: {
    y: -20,
    opacity: 0,
    transition: {
      duration: 0.2
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      type: "spring",
      stiffness: 300,
      damping: 25
    }
  },
  hover: {
    scale: 1.02,
    boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 15
    }
  },
  tap: {
    scale: 0.98
  }
};

export default function Home() {
  const [generatedLetter, setGeneratedLetter] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>(TabType.Generator);

  const handleLetterGenerated = (letter: string) => {
    setGeneratedLetter(letter);
  };

  const handleBackToForm = () => {
    setGeneratedLetter(null);
  };
  
  const renderTab = (tab: TabType, label: string) => (
    <motion.button 
      className={`${styles.tabButton} ${activeTab === tab ? styles.activeTab : ''}`}
      onClick={() => setActiveTab(tab)}
      variants={cardVariants}
      whileHover="hover"
      whileTap="tap"
      initial="hidden"
      animate="visible"
    >
      {label}
    </motion.button>
  );
  
  const renderStrategyGuide = () => (
    <motion.div 
      className={formStyles.resultContainer}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.h1 variants={itemVariants} className={styles.title}>Demand Letter Strategy Guide</motion.h1>
      <motion.p variants={itemVariants} className={styles.subtitle}>Use this guide to craft more effective demand letters</motion.p>
      
      <motion.div 
        className={styles.strategyGuideContainer}
        variants={containerVariants}
      >
        {/* Case Strategy Section */}
        <motion.section 
          className={styles.strategySection}
          variants={itemVariants}
        >
          <h2>I. Case Strategy Framework</h2>
          
          <div className={styles.strategySubsection}>
            <h3>A. Liability Argument Prioritization</h3>
            
            <motion.div 
              className={styles.strategyBlock}
              variants={cardVariants}
              whileHover="hover"
            >
              <h4>Fault Analysis Hierarchy</h4>
              <ul>
                {strategyGuide.caseStrategy.liabilityPrioritization.faultAnalysisHierarchy.map((item, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <strong>{item.label}:</strong> {item.description}
                    <ul>
                      {item.examples.map((example, idx) => (
                        <motion.li 
                          key={idx}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: (index * 0.1) + (idx * 0.05) + 0.2 }}
                        >
                          {example}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div 
              className={styles.strategyBlock}
              variants={cardVariants}
              whileHover="hover"
            >
              <h4>Weighted Scoring System</h4>
              <p>{strategyGuide.caseStrategy.liabilityPrioritization.weightedScoring.description}</p>
              <ul className={styles.weightList}>
                {strategyGuide.caseStrategy.liabilityPrioritization.weightedScoring.factors.map((factor, index) => (
                  <motion.li 
                    key={index} 
                    className={styles.weightItem}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <span className={styles.weightLabel}>{factor.label}</span>
                    <span className={styles.weightBar}>
                      <motion.span 
                        className={styles.weightFill} 
                        initial={{ width: 0 }}
                        animate={{ width: `${(factor.weight / 10) * 100}%` }}
                        transition={{ 
                          delay: index * 0.1 + 0.3, 
                          duration: 0.8,
                          ease: "easeOut" 
                        }}
                      />
                    </span>
                    <span className={styles.weightValue}>{factor.weight}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
          
          <div className={styles.strategySubsection}>
            <h3>B. Evidence Compilation Strategy</h3>
            
            <div className={styles.strategyBlock}>
              <h4>Documentary Evidence Checklist</h4>
              
              <div className={styles.evidenceGroup}>
                <h5>Police Reports</h5>
                <ul>
                  {strategyGuide.caseStrategy.evidenceCompilation.documentaryEvidence.policeReports.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              
              <div className={styles.evidenceGroup}>
                <h5>Witness Statements</h5>
                <ul>
                  {strategyGuide.caseStrategy.evidenceCompilation.documentaryEvidence.witnessStatements.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              
              <div className={styles.evidenceGroup}>
                <h5>Expert Analysis</h5>
                <ul>
                  {strategyGuide.caseStrategy.evidenceCompilation.documentaryEvidence.expertAnalysis.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.section>
        
        {/* Negotiation Leverage Section */}
        <motion.section 
          className={styles.strategySection}
          variants={itemVariants}
        >
          <h2>II. Negotiation Leverage Optimization</h2>
          
          <div className={styles.strategySubsection}>
            <h3>A. Communication Tone Calibration</h3>
            
            <div className={styles.strategyBlock}>
              <h4>Tone Spectrum</h4>
              <div className={styles.toneCards}>
                {strategyGuide.negotiationLeverage.communicationTone.toneSpectrum.map((tone, index) => (
                  <div key={index} className={styles.toneCard}>
                    <h5>{tone.type}</h5>
                    <p><strong>Best for:</strong> {tone.bestFor}</p>
                    <div className={styles.toneExample}>
                      "{tone.example}"
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className={styles.strategyBlock}>
              <h4>Language Techniques</h4>
              <ul>
                {strategyGuide.negotiationLeverage.communicationTone.languageTechniques.map((technique, index) => (
                  <li key={index}>{technique}</li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className={styles.strategySubsection}>
            <h3>B. Preemptive Defense Challenge Mitigation</h3>
            
            <div className={styles.strategyBlock}>
              <h4>Pre-existing Condition Management</h4>
              
              <div className={styles.defenseGroup}>
                <h5>Medical Chronology Techniques</h5>
                <ul>
                  {strategyGuide.negotiationLeverage.preemptiveDefense.preExistingConditions.medicalChronology.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              
              <div className={styles.defenseGroup}>
                <h5>Defense Strategy Anticipation</h5>
                <ul>
                  {strategyGuide.negotiationLeverage.preemptiveDefense.preExistingConditions.defenseAnticipation.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.section>
        
        {/* Settlement Calculation Section */}
        <motion.section 
          className={styles.strategySection}
          variants={itemVariants}
        >
          <h2>III. Settlement Demand Architectural Design</h2>
          
          <div className={styles.strategySubsection}>
            <h3>A. Damages Calculation Methodology</h3>
            
            <div className={styles.strategyBlock}>
              <h4>Non-Economic Damages Multiplier</h4>
              
              <div className={styles.multiplierTable}>
                <div className={styles.multiplierHeader}>
                  <div>Severity</div>
                  <div>Range</div>
                  <div>Examples</div>
                </div>
                {strategyGuide.settlementCalculation.nonEconomicDamages.multiplierRanges.map((range, index) => (
                  <div key={index} className={styles.multiplierRow}>
                    <div>{range.severity}</div>
                    <div>{range.range}</div>
                    <div>
                      <ul>
                        {range.examples.map((example, idx) => (
                          <li key={idx}>{example}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>
      </motion.div>
    </motion.div>
  );

  return (
    <Layout title="HandyLaw">
      <motion.div 
        className={styles.main}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className={styles.header}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            className={styles.title}
            variants={itemVariants}
          >
            HandyLaw
          </motion.h1>
          <motion.p 
            className={styles.subtitle}
            variants={itemVariants}
          >
            Generate strategic, data-driven demand letters
          </motion.p>
        </motion.div>
        
        <motion.div 
          className={styles.disclaimer}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3 }}
        >
          This tool is designed for legal professionals. Always review generated content for accuracy and compliance with your jurisdiction's rules.
        </motion.div>
        
        <motion.div 
          className={styles.tabContainer}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {renderTab(TabType.Generator, 'Document Generator')}
          {renderTab(TabType.StrategyGuide, 'Strategy Guide')}
        </motion.div>
        
        <AnimatePresence mode="wait">
          {activeTab === TabType.Generator ? (
            !generatedLetter ? (
              <LetterForm key="form" onLetterGenerated={handleLetterGenerated} />
            ) : (
              <GeneratedLetter 
                key="letter"
                letter={generatedLetter} 
                onBack={handleBackToForm} 
              />
            )
          ) : (
            renderStrategyGuide()
          )}
        </AnimatePresence>
      </motion.div>
    </Layout>
  );
} 