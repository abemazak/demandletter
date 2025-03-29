import React, { useState } from 'react';
import { deepseekApi, AnalysisRequest, AnalysisResponse } from '../utils/deepseekApi';
import styles from '../styles/Form.module.css';

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
  const [showAdvancedOptions, setShowAdvancedOptions] = useState<boolean>(false);

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

  // Reset the form data
  const resetForm = () => {
    setFormData(initialFormData);
    setResult(null);
    setError(null);
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
    <div className={styles.formContainer}>
      <h2 className={styles.formGroup}>Form Data Analyzer</h2>
      
      {/* Form Fields */}
      <div className={styles.formGroup}>
        <h2>Input Data</h2>
        {Object.keys(initialFormData).length === 0 ? (
          <div className={styles.formRow}>
            <p>No initial form data provided. Please configure the component with form fields.</p>
          </div>
        ) : (
          <>
            <div className={styles.twoColumns}>
              {Object.keys(initialFormData).slice(0, Math.ceil(Object.keys(initialFormData).length / 2)).map((key) => (
                <div key={key} className={styles.formRow}>
                  <label>
                    {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                  </label>
                  <input
                    type={typeof initialFormData[key] === 'number' ? 'number' : 'text'}
                    name={key}
                    value={formData[key] as string | number}
                    onChange={handleInputChange}
                    placeholder={`Enter ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
                  />
                </div>
              ))}
              
              {Object.keys(initialFormData).slice(Math.ceil(Object.keys(initialFormData).length / 2)).map((key) => (
                <div key={key} className={styles.formRow}>
                  <label>
                    {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                  </label>
                  <input
                    type={typeof initialFormData[key] === 'number' ? 'number' : 'text'}
                    name={key}
                    value={formData[key] as string | number}
                    onChange={handleInputChange}
                    placeholder={`Enter ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
                  />
                </div>
              ))}
            </div>
            
            <button 
              type="button"
              className={styles.moreOptionsButton}
              onClick={resetForm}
            >
              Reset to Default Values
            </button>
          </>
        )}
      </div>

      {/* Analysis Options */}
      <div className={styles.formGroup}>
        <h2>Analysis Settings</h2>
        <div className={styles.formRow}>
          <label>Analysis Type</label>
          <select
            value={analysisType}
            onChange={(e) => setAnalysisType(e.target.value as any)}
          >
            <option value="sentiment">Sentiment Analysis</option>
            <option value="classification">Classification</option>
            <option value="summary">Summary</option>
            <option value="custom">Custom Analysis</option>
          </select>
        </div>
        
        <button 
          type="button"
          className={styles.moreOptionsButton}
          onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
        >
          {showAdvancedOptions ? 'Hide Advanced Options' : 'Show Advanced Options'}
        </button>
        
        <div className={styles.customFieldContainer} style={{ 
          height: showAdvancedOptions ? 'auto' : '0',
          opacity: showAdvancedOptions ? '1' : '0',
          padding: showAdvancedOptions ? '20px 0 0' : '0'
        }}>
          {analysisType === 'custom' && (
            <div className={styles.formRow}>
              <label>Custom Prompt</label>
              <textarea
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                rows={4}
                placeholder="Enter custom analysis prompt..."
              />
            </div>
          )}
          
          <div className={styles.formRow}>
            <div className={styles.checkbox}>
              <input 
                type="checkbox" 
                id="includeDataset" 
                checked={!!referenceDataset}
                readOnly
              />
              <span>Include reference dataset in analysis</span>
            </div>
          </div>
        </div>
      </div>

      {/* Analysis Button */}
      <div className={styles.actionButtons}>
        <button
          onClick={analyzeData}
          disabled={loading}
          className={styles.submitButton}
        >
          {loading ? 'Analyzing...' : 'Analyze Data'}
        </button>
        
        {result && (
          <button
            onClick={resetForm}
            className={styles.backButton}
          >
            Start New Analysis
          </button>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className={styles.error}>
          {error}
        </div>
      )}

      {/* Analysis Results */}
      {result && (
        <div className={styles.resultContainer}>
          <div className={styles.resultHeader}>
            <h3>Analysis Result</h3>
          </div>
          <div className={styles.letterContent}>
            <pre className="whitespace-pre-wrap">{typeof result === 'object' ? JSON.stringify(result, null, 2) : result}</pre>
          </div>
          
          <div className={styles.actionButtons}>
            <button 
              className={styles.copyButton}
              onClick={() => {
                navigator.clipboard.writeText(typeof result === 'object' ? JSON.stringify(result, null, 2) : result);
                alert('Result copied to clipboard!');
              }}
            >
              Copy to Clipboard
            </button>
            
            <button 
              className={styles.downloadButton}
              onClick={() => {
                const blob = new Blob([typeof result === 'object' ? JSON.stringify(result, null, 2) : result], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `analysis-result-${new Date().toISOString().slice(0, 10)}.txt`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
              }}
            >
              Download Result
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormAnalyzer; 