// Health Check Utility
import { API_URLS } from './api';

export class HealthCheck {
  static async checkBackendHealth() {
    try {
      const response = await fetch(API_URLS.HEALTH, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        return {
          isHealthy: true,
          status: 'Connected',
          message: data.message || 'Backend is running successfully',
          timestamp: new Date().toISOString()
        };
      } else {
        return {
          isHealthy: false,
          status: 'Error',
          message: `Backend responded with status: ${response.status}`,
          timestamp: new Date().toISOString()
        };
      }
    } catch (error) {
      return {
        isHealthy: false,
        status: 'Failed',
        message: `Cannot reach backend: ${error.message}`,
        timestamp: new Date().toISOString()
      };
    }
  }

  static async waitForBackend(maxAttempts = 5, delayMs = 2000) {
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      console.log(`Health check attempt ${attempt}/${maxAttempts}...`);
      
      const health = await this.checkBackendHealth();
      
      if (health.isHealthy) {
        console.log('✅ Backend is healthy and ready!');
        return health;
      }
      
      if (attempt < maxAttempts) {
        console.log(`❌ Backend not ready, retrying in ${delayMs}ms...`);
        await new Promise(resolve => setTimeout(resolve, delayMs));
      }
    }
    
    console.error('❌ Backend failed to become healthy after all attempts');
    return await this.checkBackendHealth();
  }
}

// Helper function to show backend status in UI
export const getBackendStatusDisplay = (healthResult) => {
  if (healthResult.isHealthy) {
    return {
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      icon: '✅',
      status: healthResult.status
    };
  } else {
    return {
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      icon: '❌',
      status: healthResult.status
    };
  }
};
