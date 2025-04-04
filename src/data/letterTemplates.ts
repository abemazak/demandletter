// This file is kept for backward compatibility
// Import the reorganized templates
import { letterTemplates as templates } from './templates';

// Re-export for backward compatibility
export const letterTemplates = templates;
export default letterTemplates;

export const commonPhrases = {
  medical_terms: [
    "cervical strain",
    "lumbar sprain",
    "contusion",
    "soft tissue injury",
    "musculoskeletal trauma",
    "disc herniation",
    "radiculopathy",
    "post-traumatic headaches",
    "myofascial pain syndrome",
    "traumatic brain injury"
  ],
  treatment_descriptions: [
    "physical therapy",
    "chiropractic care",
    "pain management",
    "rehabilitation exercises",
    "prescribed medication",
    "epidural steroid injections",
    "surgical intervention",
    "cognitive behavioral therapy",
    "occupational therapy",
    "diagnostic imaging"
  ],
  negotiation_tones: {
    professional: [
      "We respectfully request your careful consideration of this claim.",
      "A fair and timely resolution benefits all parties involved.",
      "We look forward to working with you towards an equitable resolution."
    ],
    assertive: [
      "The evidence of liability in this matter is compelling and well-documented.",
      "Given the clear facts of this case, we anticipate your prompt and fair response.",
      "The settlement value of this claim is substantial, as similar cases have demonstrated."
    ],
    litigation_ready: [
      "While we prefer to resolve this matter amicably, we are fully prepared to litigate if necessary.",
      "Our client has authorized litigation should a fair settlement not be reached within the specified timeframe.",
      "The litigation value of this claim would likely exceed our current demand."
    ],
    jurisdictional: [
      "Under [STATE] collateral source rule, we reject any attempt to reduce damages by [AMOUNT] [[9]].",
      "As [JURISDICTION] follows the discovery rule, our filing is timely despite delayed symptom onset [[10]]."
    ]
  },
  settlement_guidelines: {
    multipliers: {
      minor: "1-2x medical specials for minor injuries with complete recovery",
      moderate: "2-3x medical specials for significant injuries with good recovery",
      severe: "3-5x medical specials for severe injuries with ongoing symptoms", 
      permanent: "5-10x medical specials for permanent disabilities or disfigurement"
    },
    insurance_tactics: {
      delay: "We understand that delay tactics are common, but they will not serve to reduce the value of this claim.",
      low_offer: "Initial offers that do not adequately account for all damages will only delay resolution and potentially increase costs.",
      pre_existing: "The 'eggshell plaintiff' doctrine establishes that you take the plaintiff as you find them, pre-existing conditions notwithstanding."
    },
    insurance_practices: [
      "Your reliance on [COMPANY] internal guidelines contradicts [STATE] Supreme Court rulings in [CASE] [[9]].",
      "We invoke the 'bad faith' doctrine under [STATUTE] should unreasonable settlement delays continue [[4]]."
    ]
  },
  statutory_citations: {
    federal: [
      "Pursuant to 42 U.S.C. §1983...",
      "Under FDA regulations 21 CFR §[NUMBER]...",
      "Violating CPSC safety guidelines published in..."
    ],
    state: [
      "As established in [STATE] Civil Code §[NUMBER]...",
      "The [STATE] Supreme Court held in [CASE] that...",
      "Per [STATE] Pattern Jury Instruction [NUMBER]..."
    ],
    general: [
      "Per [STATE] Code §[SECTION], this claim is timely filed within the 2-year limitations period [[10]].",
      "Pursuant to [FEDERAL/STATE] Rule of Evidence [NUMBER], we demand preservation of [DOCUMENTS/EVIDENCE]"
    ]
  },
  expert_analysis: {
    medical: [
      "Board-certified [SPECIALTY] expert Dr. [NAME] concludes in their [DATE] report that...",
      "The life care plan developed by [NAME] outlines $[AMOUNT] in future medical needs."
    ],
    economic: [
      "Forensic economist [NAME] projects lifetime earnings loss at $[AMOUNT] using [METHODOLOGY].",
      "Actuarial tables from [SOURCE] establish work-life expectancy of [NUMBER] additional years."
    ]
  },
  procedural_phrases: {
    venue: [
      "Venue is proper in [COURT] pursuant to [STATUTE] as [PERCENTAGE]% of events occurred within this jurisdiction.",
      "Forum selection clauses designating [VENUE] are unenforceable under [STATE] law for [CLAIM_TYPE] claims."
    ],
    service: [
      "Process was properly served on [AGENT] at [ADDRESS] pursuant to Rule [NUMBER] on [DATE].",
      "We request waiver of service under Rule 4(d) to avoid unnecessary service costs of approximately $[AMOUNT]."
    ],
    choice_of_law: [
      "The [STATE] significant relationship test mandates applying [STATE] substantive law to this dispute.",
      "The contractual choice of law provision designating [STATE] law is unenforceable due to [PUBLIC_POLICY]."
    ]
  },
  technological_evidence: {
    digital_forensics: [
      "Metadata analysis of [FILE] confirms unauthorized modification on [DATE] by user [ID].",
      "Deleted [DATA_TYPE] recovered through forensic examination of [DEVICE] contradicts testimony regarding [ISSUE]."
    ],
    electronic_communications: [
      "Email thread from [DATE] contains admissions by [PERSON] acknowledging [FACT] contrary to current position.",
      "Text messages between [PARTIES] on [DATE] demonstrate prior knowledge of [CONDITION] before transaction."
    ],
    surveillance: [
      "Security footage from [LOCATION] clearly captures [ACTION] disproving defendant's account of events.",
      "Geolocation data from [DEVICE] places [PERSON] at [LOCATION] during [TIMEFRAME] contradicting alibi testimony."
    ]
  },
  enhanced_injury_descriptions: {
    catastrophic: [
      "Spinal cord injury at [LEVEL] resulting in paraplegia/quadriplegia (ASIA Impairment Scale [LEVEL])",
      "Third-degree burns covering [PERCENTAGE]% of body surface area requiring skin grafting",
      "Traumatic amputation of [LIMB] with documented phantom limb pain syndrome"
    ],
    psychological: [
      "Diagnosed PTSD with [SYMPTOMS] confirmed by MMPI-3 testing administered by Dr. [NAME]",
      "Major depressive disorder directly attributable to accident-related disabilities per DSM-5 criteria"
    ]
  },
  enhanced_damages: {
    punitive: [
      "Gross negligence warrants punitive damages under [STATE] Civil Code §[NUMBER] requiring clear and convincing evidence of [CONDUCT]",
      "The reckless disregard for safety shown by [ACTION] justifies punitive assessment at [MULTIPLIER]x compensatory damages"
    ],
    hedonic: [
      "Loss of life's pleasures is calculated at $[AMOUNT] using the [METHOD] valuation method endorsed in [CASE]",
      "Inability to engage in pre-accident activities like [EXAMPLES] constitutes separate compensable damage under [DOCTRINE]"
    ]
  },
  discovery_phrases: {
    preservation: [
      "This letter serves as formal notice to preserve all [MATERIALS] under FRCP 37(e) sanctions risk",
      "Failure to retain [EVIDENCE_TYPE] may result in adverse inference instructions at trial"
    ],
    requests: [
      "We demand immediate production of [DOCUMENTS] per [STATE] Civil Rule [NUMBER]",
      "Your insured must make available for inspection the [OBJECT] at [LOCATION] within [DAYS] days"
    ]
  }
};

// New negotiation strategy additions
export const negotiationStrategies = {
  anchor_demands: {
    moderate: "Initial demand set at [MULTIPLIER]x specials to establish negotiation range",
    aggressive: "Anchor high with [MULTIPLIER]x specials anticipating downward adjustment",
    conservative: "Reasonable opener at [MULTIPLIER]x supported by comparable verdict reports"
  },
  mediator_references: [
    "Retired Judge [NAME] of [FIRM] has availability for private mediation next month",
    "We propose utilizing the [ORGANIZATION]'s dispute resolution services per their expedited schedule"
  ],
  structured_settlements: [
    "Consider periodic payments through [COMPANY] rated A+ by AM Best for long-term security",
    "Structured settlement annuities may provide tax advantages under IRC §104(a)(2)"
  ],
  risk_assessment: {
    liability_spectrum: "Our liability analysis rates exposure from [LOW_PERCENTAGE]% to [HIGH_PERCENTAGE]% with [MOST_LIKELY]% most probable.",
    verdict_potential: "Recent jury verdicts for similar cases range from $[LOW_AMOUNT] to $[HIGH_AMOUNT] with mean of $[AVERAGE].",
    cost_benefit: "Litigation expenses through trial estimated at $[AMOUNT] making settlement at/below that threshold economically rational."
  },
  timing_considerations: [
    "Pre-litigation resolution offers [ADVANTAGES] including [TAX_BENEFITS] and avoidance of [PUBLICITY_ISSUES].",
    "Resolution before [PROCEDURAL_MILESTONE] preserves [RESOURCES] and avoids [DISCLOSURES] required by [RULE]."
  ],
  alternative_resolutions: {
    apology: "Our client seeks a formal acknowledgment of [ERROR/HARM] in addition to monetary compensation.",
    policy_changes: "Implementing [SPECIFIC_REFORMS] would significantly enhance settlement valuation.",
    creative_terms: "Non-monetary terms including [BENEFITS/ACCOMMODATIONS] could supplement reduced financial compensation."
  }
};

// Expanded insurance tactics
export const insuranceResponses = {
  adjuster_tactics: {
    delay: "Requesting duplicative documentation already provided in [DATE] submission",
    misrepresentation: "Misstating policy limits despite declarations page showing $[AMOUNT]",
    coercion: "Pressuring client directly to settle during treatment against counsel advice"
  },
  bad_faith: [
    "Failure to conduct reasonable investigation as required by [STATE] Insurance Code §[NUMBER]",
    "Unreasonable claims handling practices documented in [NUMBER] prior DOI complaints"
  ],
  coverage_arguments: {
    reservation_of_rights: "Your ROR letter dated [DATE] improperly cites exclusion [SECTION] which is inapplicable because [REASONS].",
    duty_to_defend: "The allegations potentially fall within coverage triggering defense obligations per [STATE] four-corners rule.",
    policy_ambiguities: "The undefined term '[TERM]' must be construed against the drafter under well-established principles."
  },
  excess_exposure: [
    "We hereby notify you that demand exceeds policy limits, creating personal exposure for your insured.",
    "Failure to tender limits may constitute rejection of reasonable settlement opportunity under Stowers doctrine.",
    "Time-limited demand expires on [DATE], after which full verdict potential will be pursued regardless of policy limits."
  ],
  industry_standards: [
    "Your position contradicts NAIC Model Unfair Claims Settlement Practices Act adopted in [STATE].",
    "Claims handling fails to meet standards established by [INSURER]'s own published claims manual.",
    "Industry best practices as outlined by [AUTHORITY] require [PROCEDURE] for [SITUATION]."
  ]
};

// Additional legal doctrine references
export const legalDoctrines = {
  liability: [
    "Res ipsa loquitur applies as the [INSTRUMENTALITY] was under defendant's exclusive control",
    "Negligence per se established through violation of [STATUTE] designed to prevent this harm type"
  ],
  damages: [
    "Collateral source rule prohibits reducing awards by insurance payments per [CASE]",
    "The avoidable consequences doctrine limits recovery for post-accident negligence in [AREA]"
  ],
  causation: {
    but_for: "But-for causation is established through [EXPERT]'s testimony eliminating alternative causes including [ALTERNATIVES].",
    substantial_factor: "Multiple causes contributed to harm, with defendant's conduct constituting a substantial factor under [STATE] law.",
    loss_of_chance: "Even if not solely responsible for outcome, defendant's negligence reduced survival/recovery probability by [PERCENTAGE]%."
  },
  damages_limitations: {
    mitigation: "Plaintiff took reasonable steps to minimize damages by [ACTIONS] promptly following the incident.",
    economic_loss_rule: "Pure economic losses are recoverable in this context under the [EXCEPTION] exception recognized in [CASE].",
    speculative: "Future damages are not speculative but calculable with reasonable certainty using [METHODOLOGY]."
  },
  procedural_defenses: {
    limitations: "The discovery rule tolls limitations because [CONDITION] was not reasonably discoverable until [DATE].",
    immunity: "The discretionary function exception does not apply where [ENTITY] violated mandatory [REGULATIONS].",
    preemption: "The [FEDERAL_LAW] savings clause expressly preserves state law remedies for [TYPE] claims."
  }
};

// New specialized area-specific terms
export const specializedTerminology = {
  medical_negligence: {
    standards_of_care: [
      "Accepted practices within the [SPECIALTY] community require [PROCEDURE] when [CONDITION] presents.",
      "Clinical practice guidelines published by [ORGANIZATION] establish [PROTOCOL] as standard intervention."
    ],
    causation_terms: [
      "Differential diagnosis methodology excluded [ALTERNATIVES] as potential causes.",
      "To a reasonable degree of medical probability, the [OUTCOME] directly resulted from [ACTION/INACTION]."
    ]
  },
  business_litigation: {
    contract_interpretation: [
      "The integration clause in §[SECTION] bars consideration of extrinsic evidence regarding [TERM].",
      "Course of dealing between parties demonstrates shared understanding that [TERM] meant [INTERPRETATION]."
    ],
    valuation_methodologies: [
      "Business value calculated using [METHOD] yields enterprise value of $[AMOUNT] before discounting.",
      "Applying appropriate marketability discount of [PERCENTAGE]% based on [FACTORS]."
    ]
  },
  scientific_evidence: {
    methodology: [
      "Testing protocol adhered to peer-reviewed standards published in [JOURNAL].",
      "Error rate for this analytical technique is established at [PERCENTAGE]% with confidence interval of [RANGE]."
    ],
    causation_analysis: [
      "Bradford Hill criteria analysis strongly supports causal relationship between [EXPOSURE] and [OUTCOME].",
      "Epidemiological studies demonstrate relative risk of [NUMBER] (95% CI: [RANGE]) exceeding litigation threshold."
    ]
  }
};

// Expert witness categories and qualifications
export const expertWitnesses = {
  medical: {
    specialties: [
      "Board-certified in [SPECIALTY] with [NUMBER] years clinical practice focusing on [CONDITION].",
      "Faculty appointment at [INSTITUTION] medical school with [NUMBER] peer-reviewed publications on [TOPIC]."
    ],
    testimony_experience: [
      "Qualified as expert in [NUMBER] cases in [NUMBER] jurisdictions regarding similar [ISSUES].",
      "Testimony withstood Daubert challenges in [CASE] where methodology was specifically upheld."
    ]
  },
  financial: {
    qualifications: [
      "Certified Public Accountant with specialized forensic accounting certification (CFF) and [NUMBER] years experience.",
      "Former [REGULATOR] with direct regulatory oversight experience of [INDUSTRY] compliance issues."
    ],
    analysis_methods: [
      "Cash flow reconstruction using [METHODOLOGY] revealed $[AMOUNT] in undisclosed [ASSETS/INCOME].",
      "Business valuation performed using multiple approaches (market, income, asset) with appropriate weighting."
    ]
  },
  engineering: {
    credentials: [
      "Licensed Professional Engineer in [NUMBER] states specializing in [SPECIALTY] with [CREDENTIALS].",
      "Published author of industry standards adopted by [ORGANIZATION] for [PROCESS/STRUCTURE]."
    ],
    inspection_findings: [
      "Non-destructive testing using [TECHNOLOGY] identified [DEFECTS] not visible during visual inspection.",
      "Computer modeling using [SOFTWARE] demonstrates [COMPONENT] failure under [CONDITIONS] well below design specifications."
    ]
  }
};

// Settlement documentation templates
export const settlementDocuments = {
  release_provisions: {
    standard: [
      "Releasor forever discharges all claims, known and unknown, arising from the incident occurring on [DATE].",
      "This settlement encompasses all claims including those which may not yet be apparent or diagnosed."
    ],
    limited: [
      "This release specifically excludes any claims related to [ISSUE] which are expressly preserved.",
      "Released claims are limited to those specifically enumerated in paragraph [NUMBER] and no others."
    ],
    confidentiality: [
      "All terms including settlement amount shall remain strictly confidential except as required by law.",
      "Permitted disclosures limited to [SPECIFIC_PARTIES] and only on need-to-know basis for [PURPOSES]."
    ]
  },
  indemnification: [
    "Releasor agrees to satisfy all liens and subrogation interests and hold Releasee harmless from such claims.",
    "Indemnification obligation extends to Medicare/Medicaid interests pursuant to MSP provisions."
  ],
  tax_provisions: [
    "Parties acknowledge allocation of $[AMOUNT] to non-taxable physical injury damages under 26 U.S.C. §104(a)(2).",
    "No tax reporting forms shall be issued for amounts designated as [CATEGORY] under applicable IRS regulations."
  ]
};

// Professional standards references
export const ethicalStandards = {
  legal_ethics: [
    "Per [STATE] Rules of Professional Conduct Rule [NUMBER], counsel must disclose [INFORMATION].",
    "Settlement authority is limited by client's explicit instructions restricting concessions on [TERMS]."
  ],
  mediator_standards: [
    "Mediator disclosure of [RELATIONSHIP] required under Model Standards of Conduct for Mediators Standard III.",
    "Confidentiality of mediation communications protected under [STATE] ADR statute §[SECTION]."
  ],
  expert_obligations: [
    "Expert's opinion formulated independently of compensation arrangements as required by [RULE/STANDARD].",
    "Methodology adheres to [PROFESSIONAL_ORGANIZATION] ethical guidelines for forensic practice."
  ]
};

// Add these to the personal_injury section under letterTemplates
export const personalInjuryMedicalDocumentation = {
  doctor_opinions: {
    causation_statements: [
      "To a reasonable degree of medical certainty, the accident on [DATE] directly caused the patient's [DIAGNOSIS].",
      "The patient's [DIAGNOSIS] is, more likely than not, a direct result of the trauma sustained in the subject incident.",
      "After thorough review of all medical records, I find a clear causal link between the [DATE] accident and current symptoms.",
      "Absent this trauma, the patient would not have developed [CONDITION] as evidenced by pre-accident medical history."
    ],
    pre_existing_distinctions: [
      "While pre-existing [CONDITION] is present, the accident caused a distinct acute exacerbation requiring intervention.",
      "Imaging studies reveal new acute findings superimposed on chronic degenerative changes clearly attributable to trauma.",
      "The patient's asymptomatic [CONDITION] became persistently symptomatic only after this specific traumatic event.",
      "Medical literature supports that trauma like this commonly transforms dormant [CONDITION] into symptomatic pathology."
    ],
    treatment_necessity: [
      "All treatments rendered were reasonable, necessary, and directly related to injuries sustained in the subject accident.",
      "The surgical intervention became medically necessary only after failure of [NUMBER] weeks of conservative treatment.",
      "The frequency and duration of physical therapy was appropriate given the severity of [DIAGNOSIS] and patient response.",
      "Medical necessity for ongoing treatment is supported by objective findings including [SPECIFIC_FINDINGS]."
    ]
  },
  objective_testing: {
    imaging_results: [
      "MRI dated [DATE] reveals [FINDING] not present on comparison study from [PRE_ACCIDENT_DATE].",
      "CT scan confirms [FINDING] consistent with acute traumatic etiology rather than degenerative processes.",
      "Dynamic X-rays demonstrate abnormal motion at [VERTEBRAL_LEVEL] indicating ligamentous instability from trauma.",
      "Comparison of pre and post-accident imaging provides objective evidence of accident-related [PATHOLOGY]."
    ],
    diagnostic_procedures: [
      "EMG/NCS testing performed by Dr. [NAME] on [DATE] confirms [NERVE] radiculopathy consistent with [LEVEL] disc herniation.",
      "Diagnostic [JOINT] injection provided [PERCENTAGE]% pain relief, confirming this structure as the pain generator.",
      "Quantitative Functional Capacity Evaluation demonstrates consistent effort with valid sub-maximal findings.",
      "Neuropsychological testing reveals deficits in [COGNITIVE_DOMAINS] consistent with mild traumatic brain injury."
    ]
  }
};

export const personalInjuryExpertWitnesses = {
  medical_specialists: [
    "Board-certified [SPECIALTY] physician with [NUMBER] years of clinical experience treating similar injuries",
    "Fellowship-trained [SUBSPECIALTY] specialist with academic appointment at [INSTITUTION]",
    "Treating physician who has managed patient's care from [DATE] through present with intimate knowledge of condition",
    "Independent medical examiner with balance of plaintiff/defense cases establishing neutrality and credibility"
  ],
  rehabilitation_experts: [
    "Certified Life Care Planner (CLCP) with specialized training in catastrophic injury cases",
    "Vocational Rehabilitation Counselor (CRC) with experience in [INDUSTRY]-specific job requirements and limitations",
    "Physical Medicine and Rehabilitation specialist detailing functional limitations and adaptive equipment needs",
    "Occupational therapist specializing in return-to-work programs and workplace accommodations"
  ],
  accident_reconstruction: [
    "Forensic engineer with [SPECIALTY] certification who analyzed vehicle dynamics and crash mechanics",
    "Accident reconstructionist who utilized [SOFTWARE] to create scaled simulation of collision forces",
    "Biomechanical expert correlating collision forces with specific injury patterns sustained",
    "Human factors specialist analyzing perception-reaction time and avoidability factors"
  ],
  economic_experts: [
    "PhD economist calculating present value of future earnings capacity diminution",
    "Forensic accountant who analyzed [CLIENT]'s business records to quantify revenue losses directly attributable to injury",
    "Certified public accountant with specialized training in personal injury economic analysis",
    "Labor market specialist familiar with [REGION] employment prospects for individuals with similar restrictions"
  ],
  medical_consultants: {
    causation_experts: [
      "Specialist in [FIELD] who can specifically address the defense IME's mischaracterization of injury causation",
      "Medical expert who can explain complex injury mechanism in terms jury can understand",
      "Physician experienced in distinguishing traumatic from degenerative findings on imaging studies",
      "Specialist who regularly publishes peer-reviewed research on [SPECIFIC_INJURY_TYPE]"
    ],
    treatment_specialists: [
      "Pain management physician documenting objective basis for chronic pain condition",
      "Rehabilitative specialist providing detailed functional capacity analysis",
      "Neuropsychologist who administered standardized testing confirming cognitive deficits",
      "Specialist in [FIELD] who can testify to future treatment needs and prognosis with reasonable certainty"
    ]
  }
};

// Add a new section for personal injury settlement evaluation
export const personalInjurySettlementFactors = {
  liability_strengths: [
    "Clear statutory violation providing negligence per se advantage",
    "Defendant's documented history of similar incidents establishing notice",
    "Incident captured on unambiguous video footage removing factual disputes",
    "Multiple independent witnesses corroborating client's version of events",
    "Defendant's admissions in [SOURCE] significantly limiting liability defenses"
  ],
  liability_challenges: [
    "Potential comparative negligence reducing recovery by approximately [PERCENTAGE]%",
    "Factual disputes regarding [SPECIFIC_ISSUE] creating trial uncertainty",
    "Challenging venue with historically conservative jury verdicts for similar cases",
    "Evidentiary issues regarding admissibility of [EVIDENCE] that might be excluded",
    "Multiple defendants creating attribution/apportionment complications"
  ],
  damages_strengths: [
    "Substantial documented medical expenses from reputable providers",
    "Strong objective diagnostic findings clearly linking injuries to trauma",
    "Permanent impairment rating of [PERCENTAGE]% by credible medical expert",
    "Consistent documentation of pain/limitations across multiple providers",
    "Compelling before/after witness testimony regarding lifestyle impact"
  ],
  damages_challenges: [
    "Gap in treatment from [DATE] to [DATE] potentially weakening causation argument",
    "Pre-existing degenerative conditions at injury site documented in prior records",
    "Minimal property damage potentially undermining claimed injury severity",
    "Surveillance evidence showing activities inconsistent with claimed limitations",
    "Client's poor compliance with recommended treatment protocols"
  ],
  client_factors: {
    strengths: [
      "Client presents as articulate, credible, and sympathetic",
      "No prior claims history suggesting pattern of litigation",
      "Exemplary pre-accident work/military/community service record",
      "Client's proactive efforts at rehabilitation despite limitations",
      "Documented attempts to return to work/normal activities despite pain"
    ],
    challenges: [
      "Client's prior criminal history potentially affecting credibility",
      "Problematic social media posts contradicting claimed limitations",
      "Prior claims history potentially suggesting pattern of litigation",
      "Client's confrontational demeanor potentially alienating jury",
      "Inconsistent statements about accident/injuries in various records"
    ]
  }
};

// Adding detailed personal injury damages calculation methods
export const personalInjuryDamagesCalculation = {
  economic_formulas: {
    wage_loss: [
      "Average [TIMEFRAME] pre-injury earnings ($[AMOUNT]) multiplied by work days missed ([DAYS])",
      "Difference between pre-injury earnings ($[AMOUNT]/[PERIOD]) and reduced post-injury earnings ($[AMOUNT]/[PERIOD]) for [DURATION]",
      "Annualized salary ($[AMOUNT]) prorated for [PARTIAL/FULL] disability period of [DURATION]",
      "Commission-based income loss calculated using [TIMEFRAME] pre-injury average as baseline for projected earnings"
    ],
    future_earnings_loss: [
      "Reduction in earning capacity of $[AMOUNT]/year multiplied by [NUMBER] remaining work years with [DISCOUNT_RATE]% present value discount",
      "Vocational expert analysis of earnings differential between pre-injury occupation and post-injury vocational options",
      "Projected career advancement trajectory diminution calculated by economist based on industry standards",
      "Age-adjusted worklife expectancy reduction of [YEARS] multiplied by annual earnings capacity of $[AMOUNT]"
    ]
  },
  non_economic_approaches: {
    per_diem: [
      "Daily valuation of $[AMOUNT] for [DAYS] days of documented pain and suffering",
      "Tiered per diem calculation: $[AMOUNT_1]/day for acute phase ([DAYS] days) and $[AMOUNT_2]/day for recovery phase ([DAYS] days)",
      "Per diem anchored to meaningful metric like daily wage ($[AMOUNT]) or daily cost of care ($[AMOUNT])",
      "Separate per diem valuations for physical pain ($[AMOUNT]/day) and emotional suffering ($[AMOUNT]/day)"
    ],
    multiplier_methods: [
      "General damages calculated at [MULTIPLIER]× special damages ($[AMOUNT]) based on [JURISDICTION] patterns",
      "Injury-specific multiplier of [MULTIPLIER]× applied based on comparable cases involving [INJURY_TYPE]",
      "Graduated multiplier approach: [MULTIPLIER_1]× for past specials and [MULTIPLIER_2]× for future specials",
      "Severity-adjusted multiplier accounting for permanent impairment rating of [PERCENTAGE]%"
    ]
  }
};

// Adding specific personal injury defense counter-strategies
export const personalInjuryDefenseStrategies = {
  common_defenses: [
    "Independent Medical Examiner disputes injury causation, attributing findings to pre-existing conditions",
    "Biomechanical expert claims insufficient force in collision to cause claimed injuries",
    "Surveillance video allegedly showing activities inconsistent with claimed limitations",
    "Medical records review expert identifying inconsistent symptom reporting across providers",
    "Accident reconstructionist disputing liability and/or mechanism of injury"
  ],
  rebuttal_approaches: {
    low_impact_defense: [
      "Peer-reviewed literature by [AUTHOR] confirms low-impact collisions regularly cause [INJURY_TYPE]",
      "Client's [PHYSICAL_CHARACTERISTICS] create unique vulnerability to injury at lower forces",
      "Property damage photos fail to show energy-absorbing crash structures behind bumper cover",
      "Biomechanical analysis shows occupant experienced [FORCE] exceeding injury threshold despite minimal vehicle damage"
    ],
    surveillance_challenges: [
      "Surveillance represents only [NUMBER] hours out of [TOTAL] hours in surveillance period, showing cherry-picked moments",
      "Activities shown in surveillance are consistent with medical restrictions which limit [ACTIVITIES] but permit [ACTIVITIES]",
      "Surveillance shows client attempting activities but does not reveal pain experienced during/after efforts",
      "Pain specialist Dr. [NAME] confirms surveillance findings are consistent with patient's condition that features fluctuating symptoms"
    ]
  }
}; 