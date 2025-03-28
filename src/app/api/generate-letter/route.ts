import { NextResponse } from 'next/server';
import { 
  calculateDemandAmount,
  getInsuranceCarrierTactics,
  getJurisdictionSpecifics,
  settlementData
} from '@/data/settlementData';
import {
  generateTimelineHtml,
  generateInjurySeverityHtml,
  generateDamagesChartHtml,
  generateComparableSettlementsHtml,
  generateDocumentList
} from '@/utils/visualHelpers';
import { prisma } from '@/lib/prisma';
import deepseekApi from '@/utils/deepseekApi';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      clientName, 
      accidentDate, 
      accidentLocation, 
      injuryDescription,
      medicalTreatment, 
      medicalBills, 
      lostWages, 
      painSuffering,
      insuranceCompany,
      demandAmount,
      caseType = 'auto_accident',
      injuryType = 'soft_tissue',
      jurisdiction = '',
      includeVisuals = false,
      hasPreExisting = false,
      liabilityStrength = 'clear_fault',
      calculateOnly = false
    } = body;
    
    // Format numerical values
    const medicalBillsNum = parseFloat(medicalBills) || 0;
    const lostWagesNum = parseFloat(lostWages) || 0;
    const demandAmountNum = parseFloat(demandAmount) || 0;
    
    // Calculate a recommended demand if none provided
    const suggestedDemandAmount = demandAmount ? demandAmountNum : calculateDemandAmount(
      caseType, 
      injuryType, 
      medicalBillsNum, 
      lostWagesNum,
      jurisdiction,
      insuranceCompany,
      hasPreExisting
    );
    
    // If calculateOnly is true, just return the suggested amount
    if (calculateOnly) {
      return NextResponse.json({ 
        success: true, 
        suggestedDemandAmount
      });
    }
    
    // Find similar cases for reference
    const similarCases = settlementData
      .filter(s => s.caseType === caseType && s.injuryType === injuryType)
      .slice(0, 3);
    
    // Get insurance carrier tactics
    const carrierTactics = getInsuranceCarrierTactics(insuranceCompany);
    
    // Get jurisdiction specifics if available
    const jurisdictionInfo = jurisdiction ? getJurisdictionSpecifics(jurisdiction) : [];
    
    const currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Generate visual elements if requested
    let visualElements = '';
    
    if (includeVisuals) {
      // Timeline of events
      const timelineEvents = [
        { date: accidentDate, event: 'Date of Accident', details: 'Injury occurred at ' + accidentLocation },
        { date: new Date(new Date(accidentDate).getTime() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString(), event: 'Initial Medical Treatment', details: 'First medical evaluation' },
        { date: new Date(new Date(accidentDate).getTime() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString(), event: 'Ongoing Treatment', details: medicalTreatment },
        { date: currentDate, event: 'Demand Letter Sent', details: 'Formal demand for compensation' }
      ];
      
      const timeline = generateTimelineHtml(timelineEvents);
      
      // Injury severity scale
      const injuries = [
        { level: 3, description: 'Mild injury with minimal treatment', color: '#2ecc71' },
        { level: 5, description: 'Moderate injury requiring ongoing care', color: '#f39c12' },
        { level: 8, description: 'Severe injury with potential long-term effects', color: '#e74c3c' }
      ];
      
      const severityScale = generateInjurySeverityHtml(injuries);
      
      // Damages breakdown
      const painSufferingValue = parseFloat(painSuffering as string) || medicalBillsNum * 2;
      const damagesChart = generateDamagesChartHtml(medicalBillsNum, lostWagesNum, painSufferingValue);
      
      // Comparable settlements
      const comparables = generateComparableSettlementsHtml(similarCases);
      
      visualElements = `
${timeline}

${severityScale}

${damagesChart}

${comparables}
      `;
    }
    
    // Generate document list
    const supportingDocs = generateDocumentList([
      { title: 'Medical Records', description: 'Complete records from treating physicians' },
      { title: 'Medical Bills', description: 'Itemized billing statements totaling $' + medicalBillsNum.toLocaleString() },
      { title: 'Wage Loss Documentation', description: 'Employer verification of lost income' },
      { title: 'Photographic Evidence', description: 'Images of injuries and accident scene' }
    ]);

    // Prepare data for AI analysis
    const formData = {
      clientName,
      accidentDate,
      accidentLocation,
      injuryDescription,
      medicalTreatment,
      medicalBillsNum,
      lostWagesNum,
      painSuffering,
      insuranceCompany,
      suggestedDemandAmount,
      caseType,
      injuryType,
      jurisdiction,
      hasPreExisting,
      liabilityStrength,
      jurisdictionInfo,
      carrierTactics,
      similarCases
    };

    // Construct AI prompt for letter generation
    const customPrompt = `
You are a skilled personal injury attorney tasked with drafting a professional demand letter to an insurance company.

Use the following case information to create a personalized, compelling demand letter:
${JSON.stringify(formData, null, 2)}

The letter should include:
1. Standard header with date, insurance company, and claim details
2. Introduction stating this is a formal demand
3. Clear liability section addressing fault based on the ${liabilityStrength} situation
4. Detailed injuries and medical treatment section
5. Itemized damages section covering medical expenses, lost wages, and pain/suffering
6. Case valuation and justification for the demand amount
7. Formal demand statement with the amount of $${suggestedDemandAmount.toLocaleString()}
8. Closing with attorney information

IMPORTANT GUIDELINES:
- Use professional legal language but remain concise and direct
- Tailor arguments to the specific circumstances of this case
- Reference the jurisdiction's laws if provided
- Address any pre-existing conditions if applicable
- Match the tone to the liability strength (more assertive for clear fault)
- Format the letter properly with clear sections and headings
- Include only factual information provided in the case details
- Do not use placeholder text that requires manual filling in

Format the letter with appropriate spacing between sections.
`;

    // Use DeepSeek API to generate the letter content
    const analysisResponse = await deepseekApi.analyzeData({
      formData,
      analysisType: 'custom',
      customPrompt
    });

    // Get the AI-generated letter content
    let letterContent = analysisResponse.result;

    // Add visual elements if requested
    if (includeVisuals) {
      letterContent += `\n\n${visualElements}`;
    }

    // Add supporting documents section if not included by AI
    if (!letterContent.includes('SUPPORTING DOCUMENTATION')) {
      letterContent += `\n\nSUPPORTING DOCUMENTATION\n\n${supportingDocs}`;
    }

    // Save the generated letter to the database
    const savedLetter = await prisma.handyLaw.create({
      data: {
        clientName,
        insuranceCompany,
        accidentDate,
        accidentLocation,
        injuryDescription,
        medicalTreatment,
        medicalBills: medicalBillsNum,
        lostWages: lostWagesNum,
        painSuffering,
        demandAmount: suggestedDemandAmount,
        caseType,
        injuryType,
        jurisdiction,
        includeVisuals,
        hasPreExisting,
        liabilityStrength,
        letterContent
      }
    });

    return NextResponse.json({ 
      success: true, 
      letterId: savedLetter.id,
      letterContent,
      suggestedDemandAmount 
    });
  } catch (error) {
    console.error('Error in generate-letter API:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
} 