export interface SettlementCase {
  caseType: string;
  injuryType: string;
  jurisdiction: string;
  insuranceCarrier: string;
  medicalExpenses: number;
  lostWages: number;
  nonEconomicDamages: number;
  totalSettlement: number;
  timeToSettlement: number; // in days
  litigated: boolean;
  yearSettled: number;
  keyFactors: string[];
}

// Sample historical settlement data
export const settlementData: SettlementCase[] = [
  {
    caseType: "auto_accident",
    injuryType: "whiplash",
    jurisdiction: "California",
    insuranceCarrier: "State Farm",
    medicalExpenses: 15000,
    lostWages: 5000,
    nonEconomicDamages: 30000,
    totalSettlement: 50000,
    timeToSettlement: 180,
    litigated: false,
    yearSettled: 2023,
    keyFactors: ["clear liability", "complete treatment", "good documentation"]
  },
  {
    caseType: "auto_accident",
    injuryType: "back_injury",
    jurisdiction: "Texas",
    insuranceCarrier: "Allstate",
    medicalExpenses: 35000,
    lostWages: 12000,
    nonEconomicDamages: 75000,
    totalSettlement: 122000,
    timeToSettlement: 270,
    litigated: true,
    yearSettled: 2023,
    keyFactors: ["disputed liability", "surgery required", "permanent impairment"]
  },
  {
    caseType: "slip_and_fall",
    injuryType: "fracture",
    jurisdiction: "New York",
    insuranceCarrier: "Travelers",
    medicalExpenses: 28000,
    lostWages: 8500,
    nonEconomicDamages: 42000,
    totalSettlement: 78500,
    timeToSettlement: 210,
    litigated: false,
    yearSettled: 2022,
    keyFactors: ["shared liability", "full recovery", "commercial property"]
  },
  {
    caseType: "auto_accident",
    injuryType: "tbi",
    jurisdiction: "Florida",
    insuranceCarrier: "Progressive",
    medicalExpenses: 95000,
    lostWages: 45000,
    nonEconomicDamages: 350000,
    totalSettlement: 490000,
    timeToSettlement: 420,
    litigated: true,
    yearSettled: 2023,
    keyFactors: ["clear liability", "objective findings", "expert testimony", "life care plan"]
  },
  {
    caseType: "medical_malpractice",
    injuryType: "surgical_error",
    jurisdiction: "Illinois",
    insuranceCarrier: "The Doctors Company",
    medicalExpenses: 125000,
    lostWages: 60000,
    nonEconomicDamages: 500000,
    totalSettlement: 685000, 
    timeToSettlement: 540,
    litigated: true,
    yearSettled: 2022,
    keyFactors: ["clear standard of care violation", "permanent injury", "multiple experts"]
  },
  {
    caseType: "product_liability",
    injuryType: "burn",
    jurisdiction: "Pennsylvania",
    insuranceCarrier: "CNA",
    medicalExpenses: 75000,
    lostWages: 25000,
    nonEconomicDamages: 200000,
    totalSettlement: 300000,
    timeToSettlement: 365,
    litigated: true,
    yearSettled: 2023,
    keyFactors: ["design defect", "scarring", "recalled product"]
  },
  {
    caseType: "auto_accident",
    injuryType: "soft_tissue",
    jurisdiction: "Georgia",
    insuranceCarrier: "GEICO",
    medicalExpenses: 8500,
    lostWages: 3000,
    nonEconomicDamages: 12000,
    totalSettlement: 23500,
    timeToSettlement: 150,
    litigated: false,
    yearSettled: 2023,
    keyFactors: ["minor impact", "full recovery", "gap in treatment"]
  },
  {
    caseType: "premises_liability",
    injuryType: "back_injury",
    jurisdiction: "Ohio",
    insuranceCarrier: "Liberty Mutual",
    medicalExpenses: 42000,
    lostWages: 18000,
    nonEconomicDamages: 65000,
    totalSettlement: 125000,
    timeToSettlement: 300,
    litigated: false,
    yearSettled: 2022,
    keyFactors: ["hazardous condition", "prior complaints", "aggravation of pre-existing condition"]
  }
];

// Helper functions for demand calculation
export function calculateDemandAmount(
  caseType: string,
  injuryType: string,
  medicalExpenses: number,
  lostWages: number,
  jurisdiction?: string,
  insuranceCarrier?: string,
  hasPreExisting: boolean = false
): number {
  // Filter similar cases
  const similarCases = settlementData.filter(settlement => 
    settlement.caseType === caseType && 
    settlement.injuryType === injuryType &&
    (jurisdiction ? settlement.jurisdiction === jurisdiction : true) &&
    (insuranceCarrier ? settlement.insuranceCarrier === insuranceCarrier : true)
  );
  
  if (similarCases.length === 0) {
    // Default multiplier if no similar cases
    const defaultMultipliers = {
      "soft_tissue": 1.5,
      "whiplash": 2,
      "back_injury": 3,
      "fracture": 3.5,
      "tbi": 5,
      "surgical_error": 4,
      "burn": 3.5
    };
    
    const multiplier = defaultMultipliers[injuryType as keyof typeof defaultMultipliers] || 2;
    return (medicalExpenses + lostWages) * multiplier;
  }
  
  // Calculate average multiplier from similar cases
  const avgMultiplier = similarCases.reduce((sum, curr) => {
    const caseMultiplier = curr.totalSettlement / (curr.medicalExpenses + curr.lostWages);
    return sum + caseMultiplier;
  }, 0) / similarCases.length;
  
  // Adjust multiplier for pre-existing conditions
  const adjustedMultiplier = hasPreExisting ? avgMultiplier * 0.85 : avgMultiplier;
  
  // Calculate recommended demand amount
  let demandAmount = (medicalExpenses + lostWages) * adjustedMultiplier;
  
  // Round to nearest $500
  return Math.ceil(demandAmount / 500) * 500;
}

export function getInsuranceCarrierTactics(carrierName: string): string[] {
  const carrierTactics: {[key: string]: string[]} = {
    "State Farm": [
      "Likely to make low initial offers",
      "Often disputes causation of injuries",
      "May delay settlement until close to trial"
    ],
    "Allstate": [
      "Known for 'deny, delay, defend' strategy",
      "Often challenges medical necessity of treatment",
      "May use computer software to evaluate claims"
    ],
    "GEICO": [
      "Quick to offer settlements on clear liability cases",
      "Often disputes soft tissue injury values",
      "May respond well to detailed medical documentation"
    ],
    "Progressive": [
      "Often makes quick, low offers hoping for acceptance",
      "May contact claimants directly to negotiate",
      "More likely to settle before litigation"
    ],
    "Liberty Mutual": [
      "Typically begins with offers below market value",
      "Often disputes the need for future treatment",
      "More likely to negotiate reasonably with firm deadlines"
    ],
    "Travelers": [
      "Generally professional in claim handling",
      "May focus on gaps in treatment or pre-existing conditions",
      "More likely to settle cases with strong liability evidence"
    ]
  };
  
  return carrierTactics[carrierName] || [
    "Evaluate initial offers carefully",
    "Document all communications",
    "Be prepared for standard delay tactics"
  ];
}

export function getJurisdictionSpecifics(jurisdiction: string): string[] {
  const jurisdictionInfo: {[key: string]: string[]} = {
    "California": [
      "Pure comparative negligence state",
      "Two-year statute of limitations",
      "No cap on non-economic damages for most cases"
    ],
    "Texas": [
      "Modified comparative fault (51% bar)",
      "Two-year statute of limitations",
      "Caps on punitive damages"
    ],
    "Florida": [
      "Pure comparative negligence state",
      "Four-year statute of limitations",
      "PIP state requiring serious injury threshold for pain and suffering"
    ],
    "New York": [
      "Pure comparative negligence state",
      "Three-year statute of limitations",
      "No-fault state with serious injury threshold"
    ],
    "Illinois": [
      "Modified comparative fault (51% bar)",
      "Two-year statute of limitations",
      "No caps on damages"
    ]
  };
  
  return jurisdictionInfo[jurisdiction] || [
    "Research specific statutes of limitations",
    "Verify comparative negligence standards",
    "Check for caps on non-economic damages"
  ];
} 