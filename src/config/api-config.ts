/**
 * Configuration for DeepSeek API and other third-party services
 * You can extend this file with additional configurations as needed
 */

export const apiConfig = {
  // DeepSeek API configuration
  deepseek: {
    // Default API URL if environment variable is not set
    apiUrl: process.env.DEEPSEEK_API_URL || 'https://api.deepseek.com/v1',
    
    // Available models
    models: {
      chat: 'deepseek-chat',
      coder: 'deepseek-coder',
      // Add more models as they become available
    },
    
    // Default parameters
    defaultParams: {
      temperature: 0.5,
      max_tokens: 1000,
      top_p: 0.95,
      frequency_penalty: 0,
      presence_penalty: 0,
    }
  },
  
  // You can add more API configurations here
  // For example, if you're using other services alongside DeepSeek
  
  // Local data storage configuration
  localStorage: {
    // Keys for storing data in localStorage
    keys: {
      analysisHistory: 'deepseek_analysis_history',
      userPreferences: 'deepseek_user_preferences',
    },
    
    // Maximum number of analysis results to keep in history
    maxHistoryItems: 10
  }
};

export default apiConfig; 