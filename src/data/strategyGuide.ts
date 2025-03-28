/**
 * Demand Letter Generation Strategy Guide
 * A comprehensive framework for creating effective demand letters
 */

export const strategyGuide = {
  caseStrategy: {
    liabilityPrioritization: {
      faultAnalysisHierarchy: [
        {
          label: "Primary Liability Indicators",
          description: "Core evidence establishing the defendant's fault",
          examples: [
            "Traffic law violations",
            "Documented unsafe actions",
            "Expert testimony on negligence"
          ]
        },
        {
          label: "Contributory Negligence Factors",
          description: "Elements that may reduce liability percentage",
          examples: [
            "Client actions that contributed to incident",
            "Failure to mitigate damages",
            "Pre-existing conditions"
          ]
        },
        {
          label: "Comparative Fault Percentages",
          description: "Jurisdiction-specific approach to shared fault",
          examples: [
            "Pure comparative negligence states",
            "Modified comparative fault (50/51% bar)",
            "Contributory negligence jurisdictions"
          ]
        }
      ],
      weightedScoring: {
        description: "System for prioritizing strongest arguments",
        factors: [
          { label: "Direct Evidence", weight: 10 },
          { label: "Expert Testimony", weight: 9 },
          { label: "Physical Evidence", weight: 8 },
          { label: "Witness Statements", weight: 7 },
          { label: "Circumstantial Evidence", weight: 5 }
        ]
      }
    },
    evidenceCompilation: {
      documentaryEvidence: {
        policeReports: [
          "Narrative analysis",
          "Officer observations",
          "Diagram/accident scene details",
          "Citations issued",
          "Weather and road conditions"
        ],
        witnessStatements: [
          "Credibility assessment",
          "Corroborating evidence",
          "Potential deposition value",
          "Relationship to parties",
          "Consistency across accounts"
        ],
        expertAnalysis: [
          "Accident reconstruction reports",
          "Medical expert opinions",
          "Technical damage assessments",
          "Vocational rehabilitation experts",
          "Life care planners"
        ]
      }
    }
  },
  
  negotiationLeverage: {
    communicationTone: {
      toneSpectrum: [
        {
          type: "Factual and measured",
          bestFor: "Strong evidence cases, sophisticated insurance adjusters",
          example: "As the documented evidence clearly establishes, liability in this matter is not reasonably in dispute."
        },
        {
          type: "Professionally urgent",
          bestFor: "Cases approaching SOL, clear liability with disputed damages",
          example: "Given the approaching statutory deadline and the clear liability established by multiple witnesses, we require a prompt and reasonable response."
        },
        {
          type: "Strategically empathetic",
          bestFor: "Cases with emotional components, significant injuries",
          example: "While we understand the need for thorough evaluation, our client continues to suffer both physically and emotionally, making a prompt resolution in everyone's best interest."
        }
      ],
      languageTechniques: [
        "Use precise legal terminology",
        "Employ confident but non-antagonistic phrasing",
        "Demonstrate comprehensive case preparation",
        "Include strategic citation of applicable case law",
        "Balance assertiveness with professionalism"
      ]
    },
    preemptiveDefense: {
      preExistingConditions: {
        medicalChronology: [
          "Clear timeline of pre and post-accident conditions",
          "Expert medical linkage analysis",
          "Quantifiable impairment progression documentation",
          "Treatment frequency comparison",
          "New vs. aggravated symptoms"
        ],
        defenseAnticipation: [
          "Identify potential medical contestation points",
          "Prepare comprehensive medical nexus arguments",
          "Address gaps in treatment proactively",
          "Discuss degenerative conditions versus acute trauma",
          "Prepare for IME challenges"
        ]
      },
      commonDefenseStrategies: {
        liability: [
          "Comparative negligence",
          "Sudden emergency",
          "Unavoidable accident",
          "Third-party liability"
        ],
        causation: [
          "Pre-existing conditions",
          "Degenerative conditions",
          "Gaps in treatment",
          "Subsequent accidents",
          "Unrelated medical issues"
        ],
        damages: [
          "Treatment excessiveness",
          "Unreasonable medical charges",
          "Malingering",
          "Failure to mitigate",
          "Speculative future damages"
        ]
      }
    }
  },
  
  settlementCalculation: {
    nonEconomicDamages: {
      multiplierRanges: [
        {
          severity: "Minor Injuries",
          range: "1.5 - 3x economic damages",
          examples: [
            "Soft tissue injuries with full recovery",
            "Minor sprains and strains",
            "Temporary pain without long-term impact"
          ]
        },
        {
          severity: "Moderate Injuries",
          range: "3 - 5x economic damages",
          examples: [
            "Fractures requiring casting",
            "Injuries requiring physical therapy",
            "Temporary disability with recovery"
          ]
        },
        {
          severity: "Severe/Permanent Injuries",
          range: "5 - 10x economic damages",
          examples: [
            "Traumatic brain injuries",
            "Spinal injuries with lasting impact",
            "Permanent disability or disfigurement"
          ]
        }
      ],
      adjustmentFactors: [
        "Impact on quality of life",
        "Long-term medical implications",
        "Emotional and psychological trauma",
        "Loss of consortium",
        "Loss of enjoyment of life"
      ]
    },
    insurerPatternAnalysis: {
      dataPoints: [
        "Historical settlement databases",
        "Carrier-specific negotiation trends",
        "Regional compensation benchmarks",
        "Adjuster authority levels by carrier",
        "Pre-litigation vs. litigation values"
      ],
      carrierTendencies: {
        conservative: [
          "State Farm",
          "Allstate",
          "Farmers"
        ],
        moderate: [
          "Liberty Mutual",
          "USAA",
          "Travelers"
        ],
        liberal: [
          "GEICO",
          "Progressive",
          "Nationwide"
        ]
      }
    }
  },
  
  documentation: {
    medical: {
      medicalChronology: {
        essentialRecords: [
          "Emergency room records",
          "Ambulance/EMS records",
          "Diagnostic imaging reports",
          "Surgical reports",
          "Physical therapy notes",
          "Specialist evaluations",
          "Primary care documentation"
        ],
        causationElements: [
          "Direct causation evidence",
          "Treatment progression",
          "Future medical necessity projections",
          "Physician causation statements",
          "Expert medical opinions"
        ]
      }
    },
    economic: {
      lossQuantification: {
        incomeDisruption: [
          "Detailed pay stubs",
          "Employer verification letters",
          "Lost opportunity cost calculations",
          "Self-employment documentation",
          "Performance reviews and advancement history"
        ],
        futureImpact: [
          "Vocational rehabilitation assessments",
          "Reduced earning capacity projections",
          "Long-term care cost estimations",
          "Life care plans",
          "Economic loss reports"
        ]
      }
    }
  },
  
  presentationTactics: {
    visualStrategies: {
      graphicElements: [
        "Annotated medical imaging",
        "Chronological timelines",
        "Comparative lifestyle infographics",
        "Before/after photographs",
        "Medical illustration of injuries"
      ],
      technologyIntegration: [
        "AI-powered damage assessment tools",
        "Interactive documentation platforms",
        "Digital settlement platforms",
        "Data visualization software",
        "Settlement projection calculators"
      ]
    },
    narrativeHumanization: {
      emotionalResonance: [
        "Client lifestyle before/after comparisons",
        "Impactful personal quotes",
        "Qualitative life disruption descriptions",
        "Family impact statements",
        "Daily activity modifications"
      ],
      effectiveApproaches: [
        "Focus on concrete activities rather than general statements",
        "Use specific examples rather than emotional language",
        "Include photographs where appropriate",
        "Avoid exaggeration while conveying reality",
        "Balance emotional appeal with factual foundation"
      ]
    }
  },
  
  communicationProtocols: {
    letterComposition: {
      structuralElements: [
        {
          section: "Introduction",
          purpose: "Identify parties and incident",
          keyComponents: [
            "Client identification",
            "Incident date and location",
            "Initial claim statement",
            "Brief liability overview"
          ]
        },
        {
          section: "Liability Analysis",
          purpose: "Establish legal responsibility",
          keyComponents: [
            "Applicable law",
            "Evidence summary",
            "Liability explanation",
            "Rebuttals to anticipated defenses"
          ]
        },
        {
          section: "Damages Presentation",
          purpose: "Quantify and justify compensation",
          keyComponents: [
            "Medical treatment summary",
            "Economic damages calculation",
            "Non-economic damages justification",
            "Future damages projection"
          ]
        },
        {
          section: "Demand and Conclusion",
          purpose: "State demand and expectations",
          keyComponents: [
            "Specific demand amount",
            "Response timeline",
            "Settlement authority notation",
            "Litigation alternative statement"
          ]
        }
      ],
      rebuttalDesign: [
        "Anticipate defense arguments",
        "Provide preemptive counterarguments",
        "Cite specific legal/medical evidence",
        "Address causation challenges directly",
        "Neutralize comparative fault assertions"
      ]
    },
    credibilityMaintenance: {
      strategicRestraint: [
        "Fact-based argumentation",
        "Conservative damage estimations",
        "Professional, measured tone",
        "Accurate citation of legal principles",
        "Reasonable settlement demands"
      ],
      redFlags: [
        "Excessive damages without foundation",
        "Emotional or threatening language",
        "Misstatements of law or evidence",
        "Ignoring causation problems",
        "Unreasonable demands or deadlines"
      ]
    }
  },
  
  technologyIntegration: {
    aiTools: [
      {
        name: "Claims Intelligence Platforms",
        uses: [
          "Predictive settlement ranges",
          "Comparable case analysis",
          "Jurisdiction-specific valuation",
          "Litigation risk assessment"
        ]
      },
      {
        name: "Automated Documentation Analysis",
        uses: [
          "Medical record summarization",
          "Treatment gap identification",
          "Causation strength assessment",
          "Liability evidence extraction"
        ]
      },
      {
        name: "Predictive Settlement Modeling",
        uses: [
          "Carrier-specific settlement patterns",
          "Adjuster behavior analysis",
          "Optimal demand calculation",
          "Settlement timing recommendations"
        ]
      }
    ],
    recommendedImplementation: [
      "Start with basic visual enhancements",
      "Add data-driven settlement calculations",
      "Implement case comparison tools",
      "Develop AI-assisted letter generation",
      "Create negotiation strategy recommendations"
    ]
  }
};

export const recommendationEngine = {
  /**
   * Calculates liability strength based on evidence factors
   */
  calculateLiabilityStrength(
    directEvidence: number,
    expertTestimony: number,
    physicalEvidence: number,
    witnessStatements: number,
    circumstantialEvidence: number
  ): { score: number; recommendation: string } {
    const weights = strategyGuide.caseStrategy.liabilityPrioritization.weightedScoring.factors;
    
    const directWeight = weights.find(w => w.label === "Direct Evidence")?.weight || 10;
    const expertWeight = weights.find(w => w.label === "Expert Testimony")?.weight || 9;
    const physicalWeight = weights.find(w => w.label === "Physical Evidence")?.weight || 8;
    const witnessWeight = weights.find(w => w.label === "Witness Statements")?.weight || 7;
    const circumstantialWeight = weights.find(w => w.label === "Circumstantial Evidence")?.weight || 5;
    
    const totalPossible = directWeight + expertWeight + physicalWeight + witnessWeight + circumstantialWeight;
    
    const score = (
      (directEvidence * directWeight) +
      (expertTestimony * expertWeight) +
      (physicalEvidence * physicalWeight) +
      (witnessStatements * witnessWeight) +
      (circumstantialEvidence * circumstantialWeight)
    ) / totalPossible;
    
    let recommendation = "";
    if (score >= 0.8) {
      recommendation = "Use assertive liability language with clear fault position";
    } else if (score >= 0.6) {
      recommendation = "Present strong liability position while addressing potential weaknesses";
    } else if (score >= 0.4) {
      recommendation = "Balance liability discussion with focus on damages and causation";
    } else {
      recommendation = "Focus on damages while presenting best liability arguments";
    }
    
    return { score, recommendation };
  },
  
  /**
   * Recommends a multiplier range based on injury severity
   */
  recommendMultiplier(
    injuryType: string,
    hasPermenantImpact: boolean,
    treatmentDuration: number, // in months
    requiresSurgery: boolean
  ): { range: string; recommendation: string } {
    let severity = "Minor";
    
    if (hasPermenantImpact || 
        injuryType === "tbi" || 
        injuryType.includes("spinal")) {
      severity = "Severe/Permanent";
    } else if (requiresSurgery || 
               treatmentDuration > 6 || 
               injuryType === "fracture" ||
               injuryType === "back_injury") {
      severity = "Moderate";
    }
    
    const multiplierInfo = strategyGuide.settlementCalculation.nonEconomicDamages.multiplierRanges.find(
      m => m.severity === severity + " Injuries"
    );
    
    let recommendation = "";
    if (severity === "Severe/Permanent") {
      recommendation = "Use a multiplier of 5-10x given the permanent nature of these injuries";
    } else if (severity === "Moderate") {
      recommendation = "Apply a multiplier of 3-5x based on the significant treatment required";
    } else {
      recommendation = "Consider a multiplier of 1.5-3x appropriate for these injuries";
    }
    
    return {
      range: multiplierInfo?.range || "1.5 - 3x economic damages",
      recommendation
    };
  },
  
  /**
   * Recommends a communication tone based on case factors
   */
  recommendTone(
    liabilityStrength: number,
    injurySeverity: string,
    insuranceCarrier: string,
    approachingStatuteOfLimitations: boolean
  ): { toneType: string; examples: string[] } {
    let toneType = "Factual and measured";
    
    if (approachingStatuteOfLimitations || liabilityStrength > 0.8) {
      toneType = "Professionally urgent";
    }
    
    if (injurySeverity === "Severe/Permanent") {
      toneType = "Strategically empathetic";
    }
    
    const conservatives = strategyGuide.settlementCalculation.insurerPatternAnalysis.carrierTendencies.conservative;
    if (conservatives.includes(insuranceCarrier)) {
      // With conservative carriers, always lean toward factual
      toneType = "Factual and measured";
    }
    
    const toneInfo = strategyGuide.negotiationLeverage.communicationTone.toneSpectrum.find(
      t => t.type === toneType
    );
    
    return {
      toneType,
      examples: [toneInfo?.example || "As the evidence clearly establishes..."]
    };
  },
  
  /**
   * Suggests defense anticipation strategies based on case factors
   */
  anticipateDefenses(
    caseType: string,
    injuryType: string,
    hasPreExisting: boolean,
    hasGapInTreatment: boolean
  ): string[] {
    const anticipatedDefenses: string[] = [];
    
    // Liability defenses
    if (caseType === "auto_accident") {
      anticipatedDefenses.push("Comparative negligence");
    } else if (caseType === "premises_liability") {
      anticipatedDefenses.push("Open and obvious condition");
      anticipatedDefenses.push("Lack of notice of dangerous condition");
    } else if (caseType === "medical_malpractice") {
      anticipatedDefenses.push("Alternative causes for poor outcome");
      anticipatedDefenses.push("Known complication");
    }
    
    // Causation defenses
    if (hasPreExisting) {
      anticipatedDefenses.push("Pre-existing condition caused symptoms");
      anticipatedDefenses.push("Degenerative conditions not accident-related");
    }
    
    if (hasGapInTreatment) {
      anticipatedDefenses.push("Gap in treatment indicates lack of serious injury");
      anticipatedDefenses.push("Intervening cause during treatment gap");
    }
    
    // Damages defenses
    if (injuryType === "soft_tissue" || injuryType === "whiplash") {
      anticipatedDefenses.push("Excessive treatment for minor injuries");
    }
    
    return anticipatedDefenses;
  },
  
  /**
   * Recommends visual elements based on case type
   */
  recommendVisuals(
    caseType: string,
    injuryType: string,
    medicalExpenses: number,
    includeTimeline: boolean
  ): string[] {
    const recommendations: string[] = [];
    
    if (includeTimeline) {
      recommendations.push("Treatment timeline showing progression and frequency");
    }
    
    if (injuryType.includes("fracture") || injuryType === "tbi" || injuryType.includes("spinal")) {
      recommendations.push("Annotated medical imaging highlighting injury");
    }
    
    if (medicalExpenses > 10000) {
      recommendations.push("Damages breakdown chart showing proportion of economic/non-economic damages");
    }
    
    if (caseType === "auto_accident") {
      recommendations.push("Accident scene diagram or photographs");
    } else if (caseType === "premises_liability") {
      recommendations.push("Property condition photographs");
    }
    
    return recommendations;
  }
}; 