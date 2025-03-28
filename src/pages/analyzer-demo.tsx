import React from 'react';
import FormAnalyzer from '../components/FormAnalyzer';

// Example form data
const sampleFormData = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  age: 35,
  occupation: 'Software Developer',
  incomeRange: '$75,000 - $100,000',
  reasonForContact: 'I need legal advice regarding a contract dispute with my former employer.',
  caseDetails: 'My employment was terminated without proper notice after 5 years of service.'
};

// Example reference dataset
const referenceDataset = {
  similarCases: [
    {
      caseId: 'CD001',
      description: 'Employment termination without notice, 3 years of service',
      outcome: 'Settlement of 3 months salary',
      relevantLaws: ['Employment Act, Section 21', 'Labor Code 44.2']
    },
    {
      caseId: 'CD002',
      description: 'Employment termination without cause, 7 years of service',
      outcome: 'Court ruled for 6 months compensation plus legal fees',
      relevantLaws: ['Employment Act, Section 21', 'Labor Code 44.5', 'Precedent Case Smith v. Acme Corp']
    },
    {
      caseId: 'CD003',
      description: 'Contract dispute regarding non-compete clause',
      outcome: 'Non-compete clause deemed too broad, ruled unenforceable',
      relevantLaws: ['Contract Law, Section 12.3', 'Precedent Case Jones v. Tech Solutions Inc']
    }
  ],
  legalGuidelines: {
    terminationNotice: 'For employees with 5+ years of service, minimum 4 weeks notice is required',
    severanceCalculation: 'Standard calculation is 2 weeks per year of service for wrongful termination',
    limitationPeriod: '2 years from termination date to file a claim'
  }
};

const AnalyzerDemo: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-12">DeepSeek API Form Analyzer Demo</h1>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">How It Works</h2>
            <p className="mb-4">
              This demo demonstrates how to use the DeepSeek API to analyze form data and compare it against a reference dataset.
              You can modify the form data below and choose different analysis types to see how the AI responds.
            </p>
            <p className="mb-4">
              The form contains sample data for a legal consultation, and the reference dataset includes similar cases and legal guidelines.
            </p>
            <p>
              <strong>Note:</strong> Make sure you have set up your DeepSeek API key in the <code>.env.local</code> file for this demo to work properly.
            </p>
          </div>
          
          <FormAnalyzer
            initialFormData={sampleFormData}
            referenceDataset={referenceDataset}
          />
        </div>
      </div>
    </div>
  );
};

export default AnalyzerDemo; 