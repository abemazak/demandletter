import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join, dirname } from 'path';
import { mkdir } from 'fs/promises';
import deepseekApi from '@/utils/deepseekApi';

// Create a temporary uploads directory if it doesn't exist
const ensureUploadsDir = async () => {
  try {
    const uploadsDir = join(process.cwd(), 'uploads');
    await mkdir(uploadsDir, { recursive: true });
    return uploadsDir;
  } catch (error) {
    console.error('Error creating uploads directory:', error);
    // Fallback to using temp directory
    const tempDir = join(process.cwd(), 'tmp');
    try {
      await mkdir(tempDir, { recursive: true });
      return tempDir;
    } catch (innerError) {
      console.error('Error creating fallback temp directory:', innerError);
      throw new Error('Failed to create upload directory. Please try again later.');
    }
  }
};

// This is a special function to handle multipart form data
const processFormData = async (request) => {
  try {
    const formData = await request.formData();
    const files = formData.getAll('files');
    const docTypes = formData.getAll('docTypes');
    
    if (!files || files.length === 0) {
      throw new Error('No files received');
    }
    
    const uploadsDir = await ensureUploadsDir();
    const savedFiles = [];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const docType = docTypes[i] || 'unknown';
      
      // Skip non-file entries
      if (!(file instanceof Blob)) continue;
      
      // Generate a safe filename
      const uniqueId = Date.now().toString(36) + Math.random().toString(36).substring(2);
      const fileName = `${uniqueId}-${file.name.replace(/[^a-zA-Z0-9-.]/g, '_')}`;
      const filePath = join(uploadsDir, fileName);
      
      try {
        // Convert file to ArrayBuffer and save it
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        await writeFile(filePath, buffer);
        
        savedFiles.push({
          originalName: file.name,
          savedPath: filePath,
          type: file.type,
          size: file.size,
          docType: docType
        });
      } catch (fileError) {
        console.error(`Error saving file ${file.name}:`, fileError);
        // Continue with other files even if one fails
      }
    }
    
    if (savedFiles.length === 0) {
      throw new Error('Could not save any of the uploaded files');
    }
    
    return savedFiles;
  } catch (error) {
    console.error('Error processing form data:', error);
    throw error;
  }
};

// Parse document content based on document type
const parseDocumentContent = async (savedFiles) => {
  const parsedData = {};
  
  for (const file of savedFiles) {
    let promptText = '';
    
    switch (file.docType) {
      case 'medical':
        promptText = `Extract the following information from this medical record:
          1. Patient name
          2. Date of examination/treatment
          3. Medical provider name
          4. Diagnosis (with ICD codes if available)
          5. Treatment plan
          6. Recommendations
          7. Any notable findings

          Format as structured data in JSON. Return ONLY the JSON object without any additional explanation.`;
        break;
        
      case 'billing':
        promptText = `Extract the following information from this medical bill:
          1. Healthcare provider name
          2. Patient name
          3. Date of service
          4. Total billed amount
          5. Insurance coverage amount (if present)
          6. Patient responsibility amount
          7. Itemized charges (if available)
          8. CPT/procedure codes (if available)

          Format as structured data in JSON. Return ONLY the JSON object without any additional explanation.`;
        break;
        
      case 'insurance':
        promptText = `Extract the following information from this insurance document:
          1. Insurance company name
          2. Policy number
          3. Insured person's name
          4. Coverage period
          5. Coverage limits
          6. Any claim information (dates, amounts, decision)
          7. Important coverage exclusions

          Format as structured data in JSON. Return ONLY the JSON object without any additional explanation.`;
        break;
        
      case 'police':
        promptText = `Extract the following information from this police report:
          1. Report number
          2. Date of incident
          3. Location of incident
          4. Involved parties with details
          5. Officer's description of the incident
          6. Any determinations of fault
          7. Witness information

          Format as structured data in JSON. Return ONLY the JSON object without any additional explanation.`;
        break;
        
      case 'employment':
        promptText = `Extract the following information from this employment/wage document:
          1. Employee name
          2. Employer name
          3. Employment period
          4. Wage/salary information
          5. Hours worked
          6. Any lost wages information
          7. Employment status

          Format as structured data in JSON. Return ONLY the JSON object without any additional explanation.`;
        break;
        
      case 'photos':
        promptText = `Describe this image in detail, focusing on:
          1. What is shown in the image
          2. Any visible injuries or damages
          3. Context clues about the accident/incident
          4. Lighting and visibility conditions
          5. Any visible environmental factors

          Format as structured data in JSON. Return ONLY the JSON object without any additional explanation.`;
        break;
        
      default:
        promptText = `Extract all relevant information from this document that could be useful for a legal case or insurance claim. 
          Format as structured data in JSON. Return ONLY the JSON object without any additional explanation.`;
    }

    try {
      // Since we can't actually do OCR in this implementation,
      // we'll provide mock data for testing purposes
      const mockData = getMockDataForDocType(file.docType, file.originalName);
      
      // In a real scenario, we would use the API like this:
      // const analysisResponse = await deepseekApi.analyzeData({
      //   formData: { 
      //     filePath: file.savedPath, 
      //     fileName: file.originalName, 
      //     fileType: file.type,
      //     documentType: file.docType
      //   },
      //   analysisType: 'custom',
      //   customPrompt: promptText
      // });
      
      // Store the parsed data for this file
      parsedData[file.originalName] = {
        docType: file.docType,
        extractedData: mockData,
        confidence: 0.85 // Placeholder confidence score
      };
      
    } catch (error) {
      console.error(`Error parsing document ${file.originalName}:`, error);
      parsedData[file.originalName] = {
        docType: file.docType,
        error: 'Failed to parse document content',
        errorDetails: error.message
      };
    }
  }
  
  return parsedData;
};

// This provides mock data for testing since we don't have OCR/real API access
const getMockDataForDocType = (docType, fileName) => {
  const mockData = {
    medical: {
      patientName: "John Smith",
      dateOfExamination: "2023-04-15",
      medicalProviderName: "Dr. Sarah Johnson, MD",
      diagnosis: "Lumbar sprain/strain (ICD-10: S39.012A), Cervical whiplash injury (ICD-10: S13.4XXA)",
      treatmentPlan: "Six weeks physical therapy, pain management medication, follow-up in 3 weeks",
      recommendations: "Limited lifting (under 10 lbs), avoid prolonged sitting, gentle stretching exercises",
      notableFindings: "MRI reveals mild disc bulging at L4-L5, tenderness to palpation along cervical spine"
    },
    billing: {
      healthcareProviderName: "Citywide Medical Center",
      patientName: "John Smith",
      dateOfService: "2023-04-15 to 2023-05-30",
      totalBilledAmount: "4850.75",
      insuranceCoverageAmount: "2100.00",
      patientResponsibilityAmount: "2750.75",
      itemizedCharges: [
        "Initial consultation: $375.00",
        "MRI Lumbar Spine: $1,850.00",
        "Physical Therapy (12 sessions): $2,400.00",
        "Medication: $225.75"
      ],
      cptCodes: ["99203", "72148", "97110", "97140"]
    },
    insurance: {
      insuranceCompanyName: "Safe Auto Insurance Co.",
      policyNumber: "PAP-123456789",
      insuredPersonName: "Robert Taylor",
      coveragePeriod: "01/01/2023 - 12/31/2023",
      coverageLimits: "Bodily Injury: $50,000/$100,000, Property Damage: $25,000",
      claimInformation: "Claim #INS-2023-04987, Filed: 04/16/2023, Under Review",
      coverageExclusions: "Intentional acts, racing, business use of vehicle"
    },
    police: {
      reportNumber: "PD-2023-0487",
      dateOfIncident: "2023-04-15",
      locationOfIncident: "Intersection of Main St and Oak Ave, Springfield, IL",
      involvedParties: "Vehicle 1: Robert Taylor (at-fault), Vehicle 2: John Smith (injured party)",
      officerDescription: "Vehicle 1 failed to stop at red light and collided with Vehicle 2 which was proceeding through intersection with green light. Moderate damage to both vehicles.",
      faultDetermination: "Vehicle 1 operator cited for failure to obey traffic signal. Determined to be at fault.",
      witnessInformation: "Jane Wilson, pedestrian at NE corner, witnessed Vehicle 1 running red light"
    },
    employment: {
      employeeName: "John Smith",
      employerName: "Tech Solutions Inc.",
      employmentPeriod: "January 15, 2020 - Present",
      wageSalaryInformation: "Annual Salary: $75,000 ($36.06/hour)",
      hoursWorked: "40 hours per week",
      lostWagesInformation: "3 weeks of missed work: $4,326.92",
      employmentStatus: "Full-time, currently on medical leave"
    },
    photos: {
      imageContent: "Vehicle damage photo showing significant impact to passenger side door and frame",
      visibleInjuries: "Visible bruising and laceration on right arm of victim",
      contextClues: "Scene shows intersection with traffic signal visible, skid marks approximately 15 feet in length",
      lightingVisibility: "Daylight, clear conditions with good visibility",
      environmentalFactors: "Dry road, no apparent obstructions to visibility"
    },
    unknown: {
      relevantInformation: "Document appears to contain information related to the accident on April 15, 2023",
      summary: "Additional support documentation that may be relevant to claim #INS-2023-04987"
    }
  };
  
  return JSON.stringify(mockData[docType] || mockData.unknown);
};

export async function POST(request) {
  try {
    // Process the uploaded files
    const savedFiles = await processFormData(request);
    
    // Parse the content of the saved files
    const parsedData = await parseDocumentContent(savedFiles);
    
    return NextResponse.json({
      success: true,
      message: 'Documents processed successfully',
      parsedData
    });
    
  } catch (error) {
    console.error('Error processing uploads:', error);
    
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to process uploaded documents'
    }, { status: 500 });
  }
} 