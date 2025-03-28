import axios from 'axios';

// Types
export interface AnalysisRequest {
  formData: any;  // The data collected from the form
  dataset?: any;  // Reference dataset (optional)
  analysisType: 'sentiment' | 'classification' | 'summary' | 'custom';
  customPrompt?: string;  // For custom analysis
}

export interface AnalysisResponse {
  result: any;
  confidence?: number;
  metadata?: any;
}

export class DeepSeekAPI {
  private apiKey: string;
  private apiUrl: string;

  constructor() {
    // Load from environment variables
    this.apiKey = process.env.DEEPSEEK_API_KEY || '';
    this.apiUrl = process.env.DEEPSEEK_API_URL || 'https://api.deepseek.com/v1';
    
    if (!this.apiKey) {
      console.warn('DeepSeek API key not found in environment variables');
    }
  }

  private getHeaders() {
    return {
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json'
    };
  }

  /**
   * Analyze form data using DeepSeek API
   */
  async analyzeData(request: AnalysisRequest): Promise<AnalysisResponse> {
    try {
      // Construct prompt based on analysis type
      let prompt = '';
      
      switch (request.analysisType) {
        case 'sentiment':
          prompt = `Analyze the sentiment of the following form data: ${JSON.stringify(request.formData)}`;
          break;
        case 'classification':
          prompt = `Classify the following form data into appropriate categories: ${JSON.stringify(request.formData)}`;
          break;
        case 'summary':
          prompt = `Provide a summary of the following form data: ${JSON.stringify(request.formData)}`;
          break;
        case 'custom':
          prompt = request.customPrompt || '';
          break;
        default:
          throw new Error('Invalid analysis type');
      }

      // Include dataset if provided
      if (request.dataset) {
        prompt += `\n\nReference this dataset for analysis: ${JSON.stringify(request.dataset)}`;
      }

      // Make API call to DeepSeek
      const response = await axios.post(
        `${this.apiUrl}/chat/completions`,
        {
          model: "deepseek-chat", // Use appropriate model
          messages: [
            { role: "system", content: "You are an AI assistant analyzing form data." },
            { role: "user", content: prompt }
          ],
          temperature: 0.5,
          max_tokens: 1000
        },
        { headers: this.getHeaders() }
      );

      // Extract and process the response
      const result = response.data.choices[0].message.content;
      
      return {
        result,
        metadata: {
          model: response.data.model,
          usage: response.data.usage
        }
      };
    } catch (error: any) {
      console.error('Error analyzing data with DeepSeek API:', error.message);
      throw new Error(`DeepSeek API error: ${error.message}`);
    }
  }
}

// Create a singleton instance
export const deepseekApi = new DeepSeekAPI();

export default deepseekApi; 