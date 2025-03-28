# DeepSeek API Integration

This README provides information on how to use the DeepSeek API integration in your project. The integration allows you to analyze form data and compare it against reference datasets using DeepSeek's AI capabilities.

## Setup

1. **Installation**:
   The necessary packages have been installed:
   - `axios` for making HTTP requests
   - `dotenv` for loading environment variables

2. **Environment Variables**:
   Create a `.env.local` file in the root of your project with the following variables:
   ```
   DEEPSEEK_API_KEY=your_api_key_here
   DEEPSEEK_API_URL=https://api.deepseek.com/v1
   ```
   
   Replace `your_api_key_here` with your actual DeepSeek API key.

3. **Testing**:
   You can test the integration by running the demo page:
   ```
   npm run dev
   ```
   
   Then navigate to: `http://localhost:3000/analyzer-demo`

## Components and Files

1. **API Utility (`src/utils/deepseekApi.ts`)**:
   This file contains the main DeepSeek API integration logic. It exports:
   - `DeepSeekAPI` class: Handles communication with the DeepSeek API
   - `deepseekApi` singleton: A pre-instantiated instance of the DeepSeekAPI class
   - Types for requests and responses

2. **Form Analyzer Component (`src/components/FormAnalyzer.tsx`)**:
   A reusable React component that:
   - Displays form data
   - Allows selecting different analysis types
   - Sends data to the DeepSeek API
   - Displays the analysis results

3. **Demo Page (`src/pages/analyzer-demo.tsx`)**:
   A sample page demonstrating how to use the Form Analyzer component with:
   - Sample form data
   - Sample reference dataset

4. **Config File (`src/config/api-config.ts`)**:
   Contains configuration options for the DeepSeek API and other related settings.

## Usage in Your Code

### Basic Usage

```tsx
import { deepseekApi } from '../utils/deepseekApi';

// Example form data
const formData = {
  name: 'John Doe',
  email: 'john@example.com',
  // ... other form fields
};

// Optional reference dataset
const dataset = {
  // Your reference data
};

// Analyze the data
async function analyzeMyData() {
  try {
    const result = await deepseekApi.analyzeData({
      formData,
      dataset,
      analysisType: 'summary'
    });
    
    console.log(result);
  } catch (error) {
    console.error('Analysis failed:', error);
  }
}
```

### Using the FormAnalyzer Component

```tsx
import FormAnalyzer from '../components/FormAnalyzer';

function MyPage() {
  // Your form data
  const myFormData = {
    // ... form fields
  };
  
  // Your reference dataset
  const myDataset = {
    // ... dataset information
  };
  
  return (
    <div>
      <h1>My Analysis Page</h1>
      <FormAnalyzer 
        initialFormData={myFormData}
        referenceDataset={myDataset}
      />
    </div>
  );
}
```

## Analysis Types

The DeepSeek API integration supports the following analysis types:

1. **Sentiment Analysis** (`sentiment`):
   Analyzes the sentiment of the form data, identifying positive, negative, or neutral tones.

2. **Classification** (`classification`):
   Categorizes the form data into appropriate classes or groups.

3. **Summary** (`summary`):
   Provides a concise summary of the form data.

4. **Custom Analysis** (`custom`):
   Allows you to provide a custom prompt for specialized analysis.

## Extending the Integration

### Adding New Analysis Types

You can extend the `AnalysisRequest` interface in `src/utils/deepseekApi.ts` to include additional analysis types:

```typescript
export interface AnalysisRequest {
  formData: any;
  dataset?: any;
  analysisType: 'sentiment' | 'classification' | 'summary' | 'custom' | 'your_new_type';
  customPrompt?: string;
}
```

Then update the `analyzeData` method in the `DeepSeekAPI` class to handle the new analysis type.

### Using Different DeepSeek Models

You can modify the `model` parameter in the API request to use different DeepSeek models as they become available. Update the API call in `src/utils/deepseekApi.ts`:

```typescript
const response = await axios.post(
  `${this.apiUrl}/chat/completions`,
  {
    model: "different-deepseek-model", // Change model here
    // ... other parameters
  },
  { headers: this.getHeaders() }
);
```

## Troubleshooting

1. **API Key Issues**:
   - Ensure your DeepSeek API key is correctly set in the `.env.local` file
   - Check that the key has the necessary permissions

2. **Request Failures**:
   - Review the error message returned by the API
   - Check your DeepSeek API usage limits and quotas
   - Verify your network connection

3. **Unexpected Results**:
   - Try modifying the prompt format in the `analyzeData` method
   - Adjust the temperature parameter to control randomness in responses
   - Provide more context in your form data or dataset

## Contact and Support

For issues with the DeepSeek API itself, refer to their official documentation or contact their support team directly.

For issues with this integration, please open an issue in the project repository. 