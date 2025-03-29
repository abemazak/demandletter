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
    
    // Log the incoming data for debugging
    console.log('Received form data:', JSON.stringify({
      hasPreExisting: body.hasPreExisting,
      preExistingType: body.preExistingType,
      preExistingConditions: body.preExistingConditions?.substring(0, 30) + '...',
      preExistingDocumentation: body.preExistingDocumentation?.substring(0, 30) + '...',
      // Log if parsed documents are included
      hasParsedDocuments: !!body.documentData
    }, null, 2));
    
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
      preExistingConditions = '',
      preExistingType = '',
      preExistingDocumentation = '',
      liabilityStrength = 'clear_fault',
      calculateOnly = false,
      // Add document data parameter
      documentData = null
    } = body;
    
    // Ensure hasPreExisting is definitely a boolean
    const hasPreExistingBool = hasPreExisting === true || hasPreExisting === 'true';
    
    console.log('hasPreExisting after processing:', hasPreExistingBool);
    
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
      hasPreExistingBool
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
      hasPreExisting: hasPreExistingBool,
      preExistingConditions,
      preExistingType,
      preExistingDocumentation,
      liabilityStrength,
      jurisdictionInfo,
      carrierTactics,
      similarCases,
      // Include parsed document data
      documentData
    };

    // Modify the custom prompt to include document data if available
    let customPrompt = `Generate a professional demand letter for a ${caseType} case.

Client: ${clientName}
Insurance Company: ${insuranceCompany}
Date of Accident: ${accidentDate}
Location: ${accidentLocation}
Jurisdiction: ${jurisdiction}

Injury Description: ${injuryDescription}
Medical Treatment: ${medicalTreatment}
Medical Bills: $${medicalBillsNum.toLocaleString()}
Lost Wages: $${lostWagesNum.toLocaleString()}
Pre-existing Conditions: ${hasPreExistingBool ? 'Yes - ' + preExistingConditions : 'None'}

Demand Amount: $${suggestedDemandAmount.toLocaleString()}

Make it persuasive, well-structured, professional, and appropriate for the jurisdiction (${jurisdiction}).
Include proper formatting with date, address blocks, subject line, salutation, and signature block.
`;

    // Add document reference section if documents were uploaded and parsed
    if (documentData) {
      customPrompt += `\n\nThe following documents have been uploaded and analyzed:\n`;
      
      Object.entries(documentData).forEach(([filename, docData]: [string, any]) => {
        if (!docData.error) {
          customPrompt += `- ${filename} (${docData.docType})\n`;
        }
      });
      
      customPrompt += `\nReference these documents appropriately in the demand letter to strengthen the case.`;
    }

    // Jurisdiction-specific information
    if (jurisdictionInfo && jurisdictionInfo.length > 0) {
      customPrompt += `\n\nJurisdiction-specific considerations for ${jurisdiction}:\n`;
      jurisdictionInfo.forEach((info: any) => {
        customPrompt += `- ${info}\n`;
      });
    }

    // Insurance carrier tactics
    if (carrierTactics && carrierTactics.length > 0) {
      customPrompt += `\n\nConsider these known tactics for ${insuranceCompany}:\n`;
      carrierTactics.forEach((tactic: any) => {
        customPrompt += `- ${tactic}\n`;
      });
    }

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

    // Make sure letterContent contains proper HTML formatting
    if (letterContent) {
      // Format the letter content for HTML display
      letterContent = letterContent
        .replace(/\n/g, '<br>')
        .replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;')
        .replace(/  /g, '&nbsp;&nbsp;');
      
      console.log("Letter content length:", letterContent.length);
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
        hasPreExisting: hasPreExistingBool,
        // Type assertion to avoid TypeScript error
        ...(hasPreExistingBool ? {
          preExistingConditions,
          preExistingType,
          preExistingDocumentation,
        } : {}),
        liabilityStrength,
        letterContent,
        // Store information about uploaded documents
        hasUploadedDocuments: !!documentData
      } as any // Use 'any' type to bypass type checking for this object
    });

    return NextResponse.json({ 
      success: true, 
      letterId: savedLetter.id,
      letter: letterContent,
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