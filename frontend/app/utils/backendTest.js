// Backend Integration Test
import { API_URLS } from './config/api';
import { HealthCheck } from './config/healthCheck';

export class BackendTest {
  static async testAllEndpoints() {
    console.log('🧪 Starting Backend Integration Tests...\n');
    
    const results = {
      health: await this.testHealthEndpoint(),
      // Add more endpoint tests as needed
    };

    console.log('\n📊 Test Results Summary:');
    Object.entries(results).forEach(([test, result]) => {
      console.log(`${result.success ? '' : '❌'} ${test}: ${result.message}`);
    });

    return results;
  }

  static async testHealthEndpoint() {
    try {
      console.log('Testing Health Endpoint...');
      const health = await HealthCheck.checkBackendHealth();
      
      if (health.isHealthy) {
        console.log(` Health Check: ${health.message}`);
        return { success: true, message: 'Backend is healthy and responding' };
      } else {
        console.log(`❌ Health Check: ${health.message}`);
        return { success: false, message: health.message };
      }
    } catch (error) {
      console.log(`❌ Health Check Error: ${error.message}`);
      return { success: false, message: `Health check failed: ${error.message}` };
    }
  }

  static async testUploadEndpoint(testFile) {
    try {
      console.log('Testing Upload Endpoint...');
      const formData = new FormData();
      formData.append('file', testFile);

      const response = await fetch(API_URLS.UPLOAD, {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        console.log(' Upload Test: File processed successfully');
        return { success: true, message: 'Upload endpoint working', data };
      } else {
        console.log('❌ Upload Test: Failed');
        return { success: false, message: `Upload failed with status ${response.status}` };
      }
    } catch (error) {
      console.log(`❌ Upload Test Error: ${error.message}`);
      return { success: false, message: `Upload test failed: ${error.message}` };
    }
  }

  static async testSummarizeEndpoint(sampleText) {
    try {
      console.log('Testing Summarize Endpoint...');
      const response = await fetch(API_URLS.SUMMARIZE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: sampleText || 'This is a test document for summarization testing.',
          prompt: 'Summarize this text briefly.',
          mode: 'Concise',
          persona: 'Developer',
          language: 'English',
          sentiment: false
        })
      });

      if (response.ok) {
        const data = await response.json();
        console.log(' Summarize Test: Summary generated successfully');
        return { success: true, message: 'Summarize endpoint working', data };
      } else {
        console.log('❌ Summarize Test: Failed');
        return { success: false, message: `Summarize failed with status ${response.status}` };
      }
    } catch (error) {
      console.log(`❌ Summarize Test Error: ${error.message}`);
      return { success: false, message: `Summarize test failed: ${error.message}` };
    }
  }
}

// Quick test function for console usage
export const quickBackendTest = async () => {
  console.log('🚀 Quick Backend Connection Test');
  console.log('Backend URL:', API_URLS.HEALTH);
  
  const health = await HealthCheck.checkBackendHealth();
  
  if (health.isHealthy) {
    console.log('🟢 Backend is connected and ready!');
    console.log('✨ All API endpoints should be working correctly.');
  } else {
    console.log('🔴 Backend connection failed:');
    console.log('Message:', health.message);
    console.log('Please check your internet connection and backend deployment.');
  }
  
  return health;
};
