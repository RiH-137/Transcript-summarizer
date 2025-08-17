import { API_ENDPOINTS } from './api';

export const checkAPIHealth = async () => {
  try {
    const response = await fetch(API_ENDPOINTS.HEALTH, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log('Backend connection successful:', data);
      return { status: 'success', data };
    } else {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Backend connection failed:', error);
    return { 
      status: 'error', 
      error: error.message,
      message: 'Unable to connect to backend server. Please check if the server is running.' 
    };
  }
};

export const API_STATUS = {
  CONNECTING: 'connecting',
  CONNECTED: 'connected',
  ERROR: 'error'
};
