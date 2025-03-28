export const letterTemplates = {
  personal_injury: {
    intro: [
      "I am writing regarding the personal injury claim arising from the incident on [DATE].",
      "This correspondence concerns a personal injury claim stemming from an accident that occurred on [DATE].",
      "Please consider this formal demand for compensation regarding injuries sustained by our client on [DATE].",
      "I am writing regarding the personal injury claim arising from the incident on [DATE] in [JURISDICTION], where your insured's negligence directly caused [CLIENT]'s injuries [[9]].",
      "This formal demand concerns injuries sustained by [CLIENT] in a [INCIDENT_TYPE] on [DATE], which occurred due to the defendant's breach of duty under [STATE] law [[5]]."
    ],
    liability_arguments: {
      clear_fault: "The liability in this matter is clear and undisputed, as evidenced by [EVIDENCE].",
      shared_fault: "While there may be assertions of shared responsibility, the preponderance of evidence demonstrates that the primary liability rests with your insured, as [REASONING].",
      negligence: "Your insured's failure to exercise reasonable care directly caused this incident, specifically by [SPECIFIC_ACTION].",
      comparative_negligence: "While [OPPOSING_PARTY] alleges contributory fault, [EVIDENCE] shows their responsibility constitutes [PERCENTAGE]% liability under [STATE]'s comparative negligence statute [[9]].",
      statutory_violation: "Your insured's actions violated [TRAFFIC/SAFETY_CODE_SECTION], establishing negligence per se under [STATE] law [[9]]."
    },
    legal_precedents: {
      general: "Similar cases in this jurisdiction have consistently established liability under [LEGAL_DOCTRINE].",
      specific: "The court's ruling in [CASE_NAME] (20XX) established that [RELEVANT_HOLDING], which is directly applicable to the circumstances of this case.",
      proximate_cause: "The 'Palsgraf doctrine' applies here, as your insured's actions were a substantial factor in causing foreseeable harm [[9]].",
      expert_testimony: "As established in Daubert v. Merrell Dow, our expert's methodology meets federal reliability standards for [ISSUE] testimony [[7]]."
    },
    injury_descriptions: {
      whiplash: "The impact caused severe whiplash injury, resulting in persistent neck pain, stiffness, and reduced range of motion.",
      back_injury: "The accident resulted in significant back trauma, causing chronic lower back pain and limited mobility.",
      soft_tissue: "I sustained multiple soft tissue injuries, including sprains and contusions that have required extensive treatment.",
      fracture: "The collision resulted in a [LOCATION] fracture requiring [TREATMENT_TYPE], with hardware insertion and prolonged rehabilitation.",
      tbi: "The impact caused a traumatic brain injury resulting in cognitive impairments, including memory deficits, concentration difficulties, and mood disturbances documented by neurological assessment.",
      ptsd: "The trauma resulted in diagnosable PTSD with symptoms including [SYMPTOMS], corroborated by psychological evaluation [[6]].",
      chronic_pain: "Diagnosed with Complex Regional Pain Syndrome, confirmed by [TEST/EXPERT], causing permanent disability [[6]]."
    },
    pre_existing_conditions: [
      "While my client had a pre-existing [CONDITION], medical records clearly demonstrate that the accident on [DATE] substantially exacerbated this condition, necessitating additional treatment that would otherwise not have been required.",
      "Any pre-existing conditions were asymptomatic prior to this incident, as documented in the medical records from [PROVIDER]."
    ],
    medical_narratives: [
      "Initial emergency care was provided at [HOSPITAL], followed by ongoing treatment with Dr. [NAME] including physical therapy sessions.",
      "Treatment has included emergency medical care, diagnostic imaging (X-rays, MRI), and extensive physical therapy.",
      "Dr. [NAME]'s comprehensive evaluation concluded a direct causal relationship between the accident and the diagnosed injuries, with a [PERCENTAGE]% permanent impairment rating.",
      "Board-certified [SPECIALTY] Dr. [NAME] confirms causation through differential diagnosis, ruling out pre-existing factors [[7]].",
      "Functional Capacity Evaluation demonstrates [PERCENTAGE]% impairment under AMA Guidelines, 5th Edition [[6]]."
    ],
    damages_intro: [
      "The following represents a comprehensive breakdown of damages incurred:",
      "As a direct result of this incident, I have suffered the following damages:",
      "The economic and non-economic damages in this case are substantial and well-documented, as follows:"
    ],
    economic_damages: [
      "All medical expenses have been necessary, reasonable, and directly related to injuries sustained in this incident.",
      "Lost wages have been verified by employer documentation and represent actual income loss during the recovery period.",
      "Future medical expenses have been projected by [EXPERT] and include necessary [TREATMENT_TYPE] estimated at $[AMOUNT].",
      "Vocational expert [NAME] projects $[AMOUNT] lost earning capacity based on [CLIENT]'s pre-injury trajectory [[8]].",
      "Life Care Plan prepared by [EXPERT] details $[AMOUNT] in future medical needs including [TREATMENTS] [[6]]."
    ],
    pain_suffering_phrases: [
      "The injuries have significantly impacted my daily activities and quality of life.",
      "I have endured substantial physical pain and emotional distress.",
      "These injuries have resulted in ongoing discomfort and limitations in both professional and personal activities.",
      "The client's inability to engage in previously enjoyed activities such as [ACTIVITY] has caused considerable emotional distress beyond the physical pain.",
      "Using a conservative [MULTIPLIER]x multiplier based on similar cases in this jurisdiction, non-economic damages are calculated at $[AMOUNT]."
    ],
    lifestyle_impact: [
      "Prior to the accident, my client was [DESCRIPTION_OF_PRIOR_LIFESTYLE]. Now, even simple activities like [BASIC_ACTIVITY] cause significant pain and limitation.",
      "My client's role as [FAMILY_ROLE] has been severely compromised, requiring family members to assume responsibilities previously handled by my client."
    ],
    closing_statements: [
      "This demand represents a reasonable evaluation of the damages sustained.",
      "We believe this demand fairly represents the extent of injuries and damages suffered.",
      "This settlement demand takes into account all past and anticipated future damages.",
      "Given the clear liability and well-documented damages, we anticipate resolving this matter without the need for litigation.",
      "Should we be unable to reach a fair resolution within [TIMEFRAME], we are prepared to pursue all available legal remedies."
    ],
    counter_arguments: [
      "While you may contend that [POTENTIAL_DEFENSE_ARGUMENT], the evidence clearly establishes that [REBUTTAL].",
      "Any argument regarding [DEFENSE_ISSUE] is addressed by [EVIDENCE/DOCUMENTATION] which demonstrates [CONCLUSION]."
    ],
    settlement_guidelines: {
      statutory_caps: "Note that [STATE] does not impose caps on non-economic damages for this type of claim [[4]].",
      offer_evaluation: "Your initial offer fails to account for [SPECIFIC_DAMAGE], which is recoverable under [STATE] Civil Jury Instructions [SECTION]"
    }
  },
  property_damage: {
    intro: [
      "I am writing regarding the property damage claim arising from the incident on [DATE].",
      "This correspondence concerns significant property damage resulting from an incident that occurred on [DATE]."
    ],
    damage_descriptions: {
      vehicle: "The collision caused substantial damage to my [VEHICLE_YEAR] [VEHICLE_MAKE] [VEHICLE_MODEL], including [SPECIFIC_DAMAGES].",
      structure: "The incident resulted in significant damage to [PROPERTY_TYPE], requiring repairs to [SPECIFIC_ELEMENTS].",
      personal_property: "Numerous personal items were damaged beyond repair, including [ITEMS]."
    },
    valuation_statements: [
      "Independent appraisal by [APPRAISER] has valued the damage at $[AMOUNT].",
      "Repair estimates from [REPAIR_COMPANIES] consistently indicate necessary repairs costing $[AMOUNT].",
      "The diminished value of my property post-repair has been calculated at $[AMOUNT] by [EXPERT].",
      "Diminished value claim supported by [STATE] precedent allowing recovery beyond repair costs [[CASE]].",
      "Kelley Blue Book valuation shows pre-accident value of $[AMOUNT], post-accident salvage value $[AMOUNT]"
    ]
  },
  medical_malpractice: {
    intro: [
      "This demand concerns medical negligence that occurred on [DATE] at [FACILITY].",
      "I am writing regarding a medical malpractice claim arising from treatment provided on [DATE].",
      "This claim arises from deviations from the standard of care by [PROVIDER] on [DATE], falling below [SPECIALTY] norms in [JURISDICTION] [[9]].",
      "Notice of Intent to Sue is hereby provided pursuant to [STATE] Statute [SECTION], with expert affidavit from Dr. [NAME] [[10]]."
    ],
    standard_of_care: [
      "Dr. [EXPERT_NAME] has reviewed the medical records and confirms the standard of care was breached when [DESCRIPTION].",
      "The actions of [PROVIDER] fell below the accepted standard of care by [SPECIFIC_FAILURE].",
      "The [PROCEDURE] violated accepted practices as outlined in [AUTHORITY/TEXT], constituting medical negligence [[9]].",
      "Locality rule notwithstanding, national standards apply to [TELEHEALTH/BOARD_CERTIFIED] providers per [CASE_LAW] [[9]]."
    ],
    causation: [
      "This departure from the standard of care directly caused [INJURIES/OUTCOME] as confirmed by [EXPERT].",
      "Medical evidence clearly establishes a causal link between the negligent [PROCEDURE/TREATMENT] and the resulting [CONDITION].",
      "But-for the delayed diagnosis, [CONDITION] would have had [BETTER_PROGNOSIS] as shown by [EXPERT] [[7]].",
      "Res ipsa loquitur applies given the [INJURY_TYPE]'s clear indication of medical negligence [[9]]."
    ]
  },
  product_liability: {
    intro: [
      "This formal notice concerns injuries sustained due to a defective [PRODUCT_TYPE] manufactured/marketed by your client on [DATE].",
      "We are pursuing strict liability claims against your client for injuries caused by a dangerously defective product purchased on [DATE]."
    ],
    defect_types: {
      design: "The product's fundamental design violates [SAFETY_STANDARD] making it inherently dangerous for its intended use.",
      manufacturing: "Production records demonstrate quality control failures resulting in [SPECIFIC_DEFECT] that caused this incident.",
      warning: "Inadequate warnings failed to alert users to known risks of [SPECIFIC_HAZARD], directly contributing to the injuries."
    },
    corporate_liability: [
      "Internal memos from [DATE] prove your client had prior knowledge of this defect through [EVIDENCE_TYPE].",
      "Despite [NUMBER] similar incident reports, your client failed to initiate recalls or adequate consumer warnings."
    ]
  },
  wrongful_death: {
    statutory_beneficiaries: [
      "As surviving [RELATION] and estate representative, I am authorized under [STATE_CODE] § [NUMBER] to pursue this claim.",
      "This action is brought by statutory beneficiaries under the [STATE] Wrongful Death Act for the untimely death of [NAME]."
    ],
    damages_elements: {
      funeral: "Documented funeral/burial expenses total $[AMOUNT] as per invoices from [FUNERAL_HOME].",
      dependency: "Economic analysis by [ECONOMIST] calculates lost financial support at $[AMOUNT] based on decedent's [OCCUPATION] earnings.",
      consortium: "The surviving spouse and children have suffered irrevocable loss of care, companionship, and guidance valued at $[AMOUNT]."
    }
  },
  workplace_injury: {
    employer_liability: [
      "OSHA violation reports (Case #[NUMBER]) confirm your failure to maintain safe working conditions through [SPECIFIC_VIOLATION].",
      "Your employee training records show inadequate instruction on [SAFETY_PROTOCOL] required by [REGULATION]."
    ],
    exclusivity_rebuttal: [
      "This claim falls outside workers' compensation exclusivity due to intentional employer misconduct evidenced by [PROOF].",
      "The dual capacity doctrine applies as your role as [ALTERNATE_ROLE] creates separate liability beyond that of employer."
    ]
  },
  class_action: {
    intro: [
      "This correspondence serves as formal notice of our intent to pursue class certification under Rule 23 for [ISSUE].",
      "We represent a putative class of approximately [NUMBER] individuals harmed by [DEFENDANT]'s [CONDUCT]."
    ],
    class_criteria: {
      numerosity: "The proposed class exceeds [NUMBER] members across [JURISDICTION], making joinder impracticable.",
      commonality: "Common questions predominate including whether [DEFENDANT]'s [PRACTICE] violated [LAW/REGULATION].",
      typicality: "The named plaintiffs' experiences with [ISSUE] are representative of the broader class's injuries.",
      adequacy: "Our firm has successfully certified [NUMBER] similar class actions involving [SIMILAR_ISSUE]."
    },
    damages_calculations: [
      "Aggregate damages are conservatively calculated at $[AMOUNT] based on [METHODOLOGY].",
      "Individual class member recovery is estimated between $[MIN_AMOUNT] and $[MAX_AMOUNT] depending on [FACTORS]."
    ]
  },
  environmental_liability: {
    intro: [
      "This claim arises from the [CONTAMINANT] release at [LOCATION] on [DATE] affecting [AREA] properties.",
      "We represent [NUMBER] residents whose property and health have been impacted by [DEFENDANT]'s environmental violations."
    ],
    regulatory_violations: [
      "Environmental testing confirms levels exceeding EPA standards at [TIMES_OVER_LIMIT]× permissible limits.",
      "Your client failed to report the [INCIDENT] as required by [REGULATION] within the mandated [TIMEFRAME]."
    ],
    remediation_demands: {
      cleanup: "Professional remediation of all affected properties estimated at $[AMOUNT] by [EXPERT_FIRM].",
      monitoring: "Medical monitoring trust funded at $[AMOUNT] for [YEARS] years of health surveillance.",
      property_value: "Property value diminution averaging [PERCENTAGE]% according to [APPRAISER]'s market analysis."
    }
  },
  civil_rights: {
    intro: [
      "This Section 1983 claim arises from violations of my client's [CONSTITUTIONAL_RIGHT] rights on [DATE].",
      "We represent [CLIENT] regarding violations of Title [NUMBER] protections by [ENTITY] on [DATE]."
    ],
    rights_violations: {
      excessive_force: "Officer [NAME] employed disproportionate force as evidenced by [EVIDENCE] resulting in [INJURIES].",
      unlawful_detention: "Despite lacking probable cause as defined in [CASE], my client was detained for [TIME_PERIOD].",
      discrimination: "Statistical evidence shows [PROTECTED_CLASS] individuals face [PERCENTAGE]% higher rates of [ADVERSE_ACTION]."
    },
    municipal_liability: [
      "The [ENTITY]'s failure to train officers on [PROTOCOL] constitutes deliberate indifference under Canton v. Harris.",
      "Pattern and practice evidence includes [NUMBER] similar incidents in the past [TIMEFRAME]."
    ],
    qualified_immunity: [
      "The right to be free from [CONDUCT] was clearly established by [CIRCUIT] precedent in [CASE] ([YEAR]).",
      "No reasonable officer could have believed the conduct was lawful given the clearly established [STANDARD]."
    ]
  },
  employment_discrimination: {
    intro: [
      "This EEOC charge (No. [NUMBER]) concerns unlawful discrimination against [CLIENT] based on [PROTECTED_CLASS].",
      "Following exhaustion of administrative remedies, we present this demand regarding [TYPE] discrimination."
    ],
    discriminatory_acts: [
      "Despite superior qualifications including [CREDENTIALS], my client was passed over for [NUMBER] promotions.",
      "Performance evaluations show inconsistent standards applied to [CLIENT] compared to [COMPARATOR_GROUP]."
    ],
    harassment_details: {
      severity: "The hostile work environment included [INCIDENTS] occurring [FREQUENCY] over [TIMEFRAME].",
      reporting: "HR failed to take corrective action despite [NUMBER] formal complaints filed on [DATES].",
      retaliation: "Within [TIMEFRAME] of protected activity, adverse actions including [ACTIONS] were taken."
    },
    damages_framework: {
      backpay: "Wage differential of $[AMOUNT] calculated from [START_DATE] through [END_DATE].",
      frontpay: "Future earnings impact of $[AMOUNT] over [YEARS] years based on [METHODOLOGY].",
      compensatory: "Emotional distress damages supported by [PROVIDER]'s clinical assessment and testimony."
    }
  },
  intellectual_property: {
    copyright_claims: [
      "Our client's registered work (Reg. No. [NUMBER]) was willfully infringed through unauthorized [USE].",
      "Substantial similarity analysis by [EXPERT] confirms copying of protectable expression in [ELEMENTS]."
    ],
    trademark_violations: {
      infringement: "Consumer confusion is evidenced by [SURVEY] showing [PERCENTAGE]% mistaken association.",
      dilution: "Your client's use tarnishes our famous mark (Reg. No. [NUMBER]) through association with [NEGATIVE_CONTEXT]."
    },
    patent_infringement: [
      "Claim charts demonstrate each element of Patent No. [NUMBER] is practiced by your [PRODUCT/PROCESS].",
      "Willful infringement is established by pre-suit knowledge through [NOTIFICATION] on [DATE]."
    ],
    remedy_calculations: {
      injunctive: "Immediate cessation of all [ACTIVITY] and recall of infringing [ITEMS] from distribution.",
      damages: "Lost profits of $[AMOUNT] plus reasonable royalty calculated at [PERCENTAGE]% of [REVENUE_BASE].",
      enhanced: "Statutory enhancement to $[AMOUNT] per work infringed due to willfulness factors under [STATUTE]."
    }
  },
  consumer_protection: {
    intro: [
      "This claim arises under [STATE]'s Consumer Protection Act §[SECTION] regarding deceptive practices in [INDUSTRY].",
      "We represent a group of [NUMBER] consumers harmed by [COMPANY]'s unfair practices in marketing [PRODUCT/SERVICE]."
    ],
    deceptive_practices: [
      "Advertisements falsely claimed [CLAIM] when internal documents dated [DATE] acknowledged [REALITY].",
      "Material information about [ISSUE] was deliberately omitted from [COMMUNICATION_TYPE] to consumers."
    ],
    consumer_reliance: {
      materiality: "The misrepresentations concerned essential product characteristics including [FEATURES].",
      inducement: "Surveys show [PERCENTAGE]% of purchasers primarily relied on claims regarding [FEATURE]."
    },
    remedies_sought: {
      restitution: "Full refunds of $[AMOUNT] per affected consumer under [STATUTE] §[SECTION].",
      injunction: "Court order prohibiting future marketing claims regarding [SPECIFIC_CLAIMS].",
      statutory: "Treble damages of $[AMOUNT] permitted under [STATE] law for knowing violations."
    }
  },
  insurance_bad_faith: {
    intro: [
      "This first-party bad faith claim arises from [INSURER]'s handling of Claim No. [NUMBER] following [LOSS_EVENT].",
      "We represent [INSURED] regarding unreasonable claim delay and denial practices by [INSURER]."
    ],
    coverage_analysis: [
      "Policy provisions §[SECTION] explicitly cover [LOSS_TYPE] without applicable exclusions.",
      "Your strained interpretation of [TERM] contradicts reasonable expectations and contra proferentem principles."
    ],
    claims_handling_violations: {
      delay: "Despite complete documentation submitted on [DATE], no determination was made within statutory [TIMEFRAME].",
      investigation: "Your adjuster failed to interview key witnesses including [NAMES] or inspect [EVIDENCE].",
      denial_basis: "The denial letter dated [DATE] misrepresented policy provisions by [MISREPRESENTATION]."
    },
    statutory_violations: [
      "[STATE] Insurance Code §[SECTION] mandates [REQUIREMENT], which was violated by [ACTION/INACTION].",
      "Your handling constitutes [NUMBER] separate unfair claims practices under [REGULATION]."
    ],
    consequential_damages: {
      financial: "Loan interest of $[AMOUNT] incurred due to delayed payment for [REPAIRS/REPLACEMENT].",
      emotional: "Diagnosed anxiety requiring [TREATMENT] resulted from housing insecurity during claim processing."
    }
  },
  construction_defect: {
    intro: [
      "This claim concerns significant construction defects at [PROPERTY] constructed by [CONTRACTOR] in [YEAR].",
      "We represent the [OWNER/ASSOCIATION] regarding latent defects discovered on [DATE] at [LOCATION]."
    ],
    defect_categories: {
      structural: "Engineering analysis by [FIRM] identified [SPECIFIC_ISSUE] compromising structural integrity.",
      water_intrusion: "Moisture mapping shows extensive damage to [COMPONENTS] from improper [INSTALLATION].",
      code_violations: "Inspection revealed [NUMBER] violations of [BUILDING_CODE] §[SECTIONS] including [EXAMPLES]."
    },
    causation_evidence: [
      "Destructive testing confirmed defective [COMPONENT] installation contrary to manufacturer specifications.",
      "Construction documents show deviations from approved plans regarding [ELEMENT]."
    ],
    repair_methodology: {
      scope: "Remediation requires [SPECIFIC_REPAIRS] as detailed in [EXPERT]'s protocol dated [DATE].",
      cost: "Competitive bids from [CONTRACTORS] establish reasonable repair costs of $[AMOUNT].",
      relocation: "Temporary housing during repairs estimated at $[AMOUNT] for [TIMEFRAME]."
    }
  },
  probate_litigation: {
    will_contests: [
      "We challenge the purported Will dated [DATE] due to testator's documented cognitive impairment (MMSE score [SCORE]).",
      "Evidence of undue influence includes [RELATIONSHIP]'s isolation of decedent from family starting [DATE]."
    ],
    fiduciary_breaches: {
      self_dealing: "The trustee improperly transferred [ASSET] valued at $[AMOUNT] to [RELATED_ENTITY] without disclosure.",
      accounting_failures: "Despite [NUMBER] formal requests, no proper accounting has been provided for [TIMEFRAME].",
      investment_negligence: "Concentrating [PERCENTAGE]% of assets in [INVESTMENT] violated prudent investor standards."
    },
    distribution_disputes: {
      ambiguity: "The term '[PHRASE]' in Article [NUMBER] creates interpretive uncertainty regarding [ASSET].",
      ademption: "The specific bequest of [ITEM] was sold before death, requiring [REMEDY] under [STATE] law."
    }
  }
};

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