import React, { useState } from 'react';
import { deepseekApi, AnalysisRequest, AnalysisResponse } from '../utils/deepseekApi';

interface FormData {
  [key: string]: string | number | boolean;
}

interface FormAnalyzerProps {
  initialFormData?: FormData;
  referenceDataset?: any;
}

const FormAnalyzer: React.FC<FormAnalyzerProps> = ({ 
  initialFormData = {}, 
  referenceDataset = null 
}) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [analysisType, setAnalysisType] = useState<'sentiment' | 'classification' | 'summary' | 'custom'>('summary');
  const [customPrompt, setCustomPrompt] = useState<string>('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' 
        ? (e.target as HTMLInputElement).checked 
        : type === 'number' 
          ? parseFloat(value) 
          : value
    }));
  };

  // Analyze the form data using DeepSeek API
  const analyzeData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const request: AnalysisRequest = {
        formData,
        dataset: referenceDataset,
        analysisType,
        customPrompt: analysisType === 'custom' ? customPrompt : undefined
      };
      
      const response: AnalysisResponse = await deepseekApi.analyzeData(request);
      setResult(response.result);
    } catch (err: any) {
      setError(err.message || 'An error occurred during analysis');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Form Data Analyzer</h2>
      
      {/* Form Fields */}
      <div className="space-y-4 mb-6">
        {Object.keys(initialFormData).map((key) => (
          <div key={key} className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700">
              {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
            </label>
            <input
              type={typeof initialFormData[key] === 'number' ? 'number' : 'text'}
              name={key}
              value={formData[key] as string | number}
              onChange={handleInputChange}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}
      </div>

      {/* Analysis Options */}
      <div className="mb-6">
        <label className="block mb-2 font-medium text-gray-700">Analysis Type</label>
        <select
          value={analysisType}
          onChange={(e) => setAnalysisType(e.target.value as any)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="sentiment">Sentiment Analysis</option>
          <option value="classification">Classification</option>
          <option value="summary">Summary</option>
          <option value="custom">Custom Analysis</option>
        </select>
        
        {analysisType === 'custom' && (
          <div className="mt-4">
            <label className="block mb-2 font-medium text-gray-700">Custom Prompt</label>
            <textarea
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              placeholder="Enter custom analysis prompt..."
            />
          </div>
        )}
      </div>

      {/* Analysis Button */}
      <button
        onClick={analyzeData}
        disabled={loading}
        className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50"
      >
        {loading ? 'Analyzing...' : 'Analyze Data'}
      </button>

      {/* Error Message */}
      {error && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {/* Analysis Results */}
      {result && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-3">Analysis Result</h3>
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-md">
            <pre className="whitespace-pre-wrap">{typeof result === 'object' ? JSON.stringify(result, null, 2) : result}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormAnalyzer; 