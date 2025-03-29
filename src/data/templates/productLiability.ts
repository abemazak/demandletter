export const productLiabilityTemplate = {
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
  ],
  injury_descriptions: {
    burns: "The malfunctioning product caused [DEGREE] degree burns covering [PERCENTAGE]% of the victim's [BODY_PART].",
    lacerations: "The defective component fractured during normal use, causing deep lacerations requiring [NUMBER] stitches.",
    toxic_exposure: "Exposure to [CHEMICAL] leaking from the product resulted in respiratory damage confirmed by pulmonology testing."
  },
  warranty_claims: [
    "Your client's express warranty guaranteed [CLAIM], which was materially false regarding this product's safety.",
    "The product's dangerous condition breached the implied warranty of merchantability under UCC §2-314."
  ],
  expert_analysis: {
    engineer: "Forensic engineer [NAME] from [INSTITUTION] has documented the specific failure mechanism as [DESCRIPTION].",
    medical: "Medical causation is established by Dr. [NAME]'s report detailing how the [DEFECT] directly caused [INJURY]."
  },
  industry_standards: [
    "The [INDUSTRY] sets clear safety benchmarks through [STANDARD_ORGANIZATION], which your client's product fails to meet.",
    "Competitors' similar products incorporate [SAFETY_FEATURE] which would have prevented this injury."
  ],
  damages: {
    medical: "Treatment has required [PROCEDURES] totaling $[AMOUNT] to date, with projected future expenses of $[AMOUNT].",
    lost_earnings: "The injuries have resulted in [TIME_PERIOD] of work absence and permanent career limitations.",
    pain_suffering: "The victim endures ongoing [SYMPTOMS] requiring daily medication and therapy."
  },
  settlement_demand: [
    "Similar product liability cases in this jurisdiction have settled for $[AMOUNT_RANGE].",
    "We demand $[AMOUNT] in full settlement of this claim, with terms to be memorialized in a standard release."
  ],
  litigation_warning: [
    "If litigation becomes necessary, we will pursue punitive damages based on your client's conscious disregard for consumer safety.",
    "Court-mandated discovery will likely reveal additional defective products still in the marketplace."
  ]
};